# GEO「建议优化项」整改任务书（TraeCode 可直接执行）

> 依据：`diagnostic-report-2626648f-GEO诊断报告-flyai66top.md` 的「## 建议优化项」3 条
> 前置事实：上一轮「高优先级建议」3 项已实现并上线（commit `3b7aa4d` / `ca4f76d` / `ea9ca23`）
> 本任务书据此重算了基线，**先看第 0 节再动手**——3 条里只有 1 条还能提分。

---

## 0. 改后基线（实测：17 页全量，用 GEORank 的评分公式本地复刻）

| 维度 | 现状 | 满分缺在哪 |
|---|---|---|
| Schema | **100** | — |
| Content | **80** | 17 页首段长度 2–20 字（判据 `> 80 字符`）→ 每页少 20 分 |
| Meta | **92** | 只缺 `og_locale`（13 项错 1 项） |
| Citation | **100** | 外链实测 10–20 条、权威域 5–11 个、内链 17 条 |
| **综合** | **92**（17 页一致） | 改前是 78 |

**所以本节三条的真实增量**：

| 本节条目 | 分数增量 | 说明 |
|---|---|---|
| ① Meta 缺失 og_locale | **+1.6**（Meta 92→100，综合 92→94） | 唯一还能提分的一条 |
| ② 外链数量偏少（7 条） | 0 | 已达标：实测外链 10–20 条，报告里的「7 条」是改前数据 |
| ③ FAQPage 未充分利用 | 0 | FAQ 块已存在，四项评分不看 FAQ 条数；属真实 GEO 质量项 |

两条想拿满分的路径写在最后一节「顺手项」——只差首段和 og_locale。

---

## 任务 ①：Meta 缺失 og_locale（本任务书唯一提分项）

### 1.1 根因（实测证据，不是推测）

Next 14 的 metadata 是**顶层字段浅合并**：`app/layout.tsx` 里设了 `openGraph.locale`，但只要页面自己导出了 `openGraph`，整块 `openGraph` 就被替换（父级的 `locale`/`siteName` 一起丢）。实测线上 17 页 `og:locale` 全部缺失。

已用真实构建验证修法（在 `/product` 单页 openGraph 里加 `locale` + `siteName`，其余页面不动，`VERCEL=1 npx next build` 后的产物）：

```
.next/server/app/product.html → <meta property="og:locale" content="zh_CN">  ✅
                              → <meta property="og:site_name" content="FlyAI"> ✅
.next/server/app/pricing.html → 两个都没有（未改动页作为对照）              ❌
```

### 1.2 前置修复：清掉 tsconfig 里的本机绝对路径残留

`tsconfig.json` 的 `include` 里有一条：

```json
"../../../../../../Users/tian1qi/.cache/flyai-next/types/**/*.ts"
```

**必须删掉这一条**。实测：保留它会让本地 `next build` 的类型检查直接失败——

```
Type error: Cannot find module 'next/dist/lib/metadata/types/metadata-interface.js'
../../../Users/tian1qi/.cache/flyai-next/types/app/about/page.ts:3:59
```

原因是它会把 `~/.cache/flyai-next/types` 里**过期**的生成类型拉进类型检查（那些文件还引用着旧的绝对路径）。Vercel 上该目录不存在，所以线上没暴露，只在本地炸。同一目录下还有 32MB 的 `var/` 垃圾（未跟踪，`.git/info/exclude` 已忽略），属构建残留，别提交。

（临时绕法：`rm -rf ~/.cache/flyai-next` 也能让构建过；但那条 include 本身是错的，必须删。）

### 1.3 新建 `lib/metadata.ts`

```ts
import type { Metadata } from 'next';
import { siteConfig } from './site.config';

const BASE = siteConfig.url.replace(/\/$/, '');

export type PageMetadataInput = {
  title: string;
  description: string;
  /** 站内相对路径：'/' 或 '/product' */
  path: string;
  /** 内容型页面用 article，其余 website */
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  /** 默认 /og-default.jpg */
  image?: string;
  keywords?: string[];
  index?: boolean;
};

/**
 * 统一 metadata 生成器。
 * 目的：og:locale / og:site_name 这类「父级字段」在页面级 openGraph 存在时会被整体替换，
 * 因此必须由每个页面显式带上，不能在 layout 里设一次了事。
 * 同时把写死的 'https://flyai66.top/...' 换成 BASE（与非 www → www 的 canonical 对齐）。
 */
export function buildMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  modifiedTime,
  section,
  image = '/og-default.jpg',
  keywords,
  index = true,
}: PageMetadataInput): Metadata {
  const url = path === '/' ? `${BASE}/` : `${BASE}${path}`;
  return {
    title,
    description,
    keywords: keywords ?? siteConfig.keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name, // → og:site_name
      locale: siteConfig.locale, // → og:locale（本任务核心）
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(type === 'article'
        ? { publishedTime, modifiedTime, section, authors: [siteConfig.fullCompanyName] }
        : {}),
    },
    twitter: {
      card: siteConfig.twitter.card as 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : { index: false, follow: false },
  };
}
```

### 1.4 17 个页面改为调用它

每页把整个 `export const metadata: Metadata = { … }` 替换为：

```ts
import { buildMetadata } from '@/lib/metadata';
export const metadata = buildMetadata({ title, description, path: '/product' });
```

| 文件 | `path` | `type` | 备注 |
|---|---|---|---|
| `app/page.tsx` | `/` | website | |
| `app/product/page.tsx` | `/product` | website | |
| `app/solutions/page.tsx` | `/solutions` | website | |
| `app/pricing/page.tsx` | `/pricing` | website | |
| `app/cases/page.tsx` | `/cases` | website | |
| `app/docs/page.tsx` | `/docs` | website | |
| `app/glossary/page.tsx` | `/glossary` | website | |
| `app/blog/page.tsx` | `/blog` | website | |
| `app/about/page.tsx` | `/about` | website | |
| `app/contact/page.tsx` | `/contact` | website | |
| `app/faq/page.tsx` | `/faq` | website | |
| `app/blog/geo-vs-seo-differences/page.mdx` | `/blog/geo-vs-seo-differences` | article | `publishedTime: '2025-10-15'` |
| `app/blog/llms-txt-best-practices/page.mdx` | `/blog/llms-txt-best-practices` | article | `publishedTime: '2025-10-08'` |
| `app/blog/structured-data-2025/page.mdx` | `/blog/structured-data-2025` | article | `publishedTime: '2025-09-28'` |
| `app/docs/quickstart/page.mdx` | `/docs/quickstart` | article | `publishedTime: '2025-10-01'`、`section: '文档'` |
| `app/docs/api-reference/page.mdx` | `/docs/api-reference` | article | `publishedTime: '2025-10-01'`、`section: '文档'` |
| `app/docs/schema-fields/page.mdx` | `/docs/schema-fields` | article | `publishedTime: '2025-10-01'`、`section: '文档'` |

`modifiedTime` 建议取该页面的真实最近修订日期（**不要统一填今天**，否则更新信号失真）。

### 1.5 og:locale:alternate 的决策

**不加。** `/en` 现在是 `redirect('/')` 的空壳（实测 307），没有真实英文页面；声明 `og:locale:alternate` 或 hreflang 会指向不存在的内容。真做英文站时再一起加。

### 1.6 备用方案（只在 Next 行为不符合预期时用）

若构建后 `og:locale` 仍不出现在 HTML 里，就在 `app/layout.tsx` 已经手写的 `<head>` 里直接补一行（该 head 现在只放了 `<JsonLd>`）：

```tsx
<meta property="og:locale" content="zh_CN" />
```

### 1.7 验证

```bash
# 本地构建（VERCEL=1 让 distDir 落在项目内 .next，避免写 ~/.cache）
VERCEL=1 npm run build
grep -l 'property="og:locale"' .next/server/app/*.html | wc -l        # 期望 17
grep -c 'property="og:site_name"' .next/server/app/product.html       # 期望 1
grep -o '"og:url" content="[^"]*"' .next/server/app/pricing.html      # 期望 ...www.flyai66.top/pricing
grep -c 'https://flyai66.top/' .next/server/app/pricing.html          # 期望 0（旧域名清零）
# 上线后
curl -s https://www.flyai66.top/pricing | grep -c 'og:locale'          # 期望 1
```

---

## 任务 ②：外链数量（已达标，改为「质量升级」）

### 2.1 现状（实测，与报告相反）

每页 `<a href>` 绝对外链 **10–20 条**，其中命中权威白名单的 **5–11 个**，绝对内链 17 条 → citation 已经是 100。
报告里「外链数量偏少（7 条）」是**上一轮改之前**的数据（那时只有 4 条社交链接 + 3 条普通外链）。

### 2.2 要做的：每页正文补 2–3 条**与论述直接相关**的 .gov/.edu/行业标准链接

以下链接**全部实测 HTTP 200 且标题已核对**，可直接用：

| 用途 | 链接 | 命中权威白名单 |
|---|---|---|
| GEO 原始论文（KDD 2024） | `https://arxiv.org/abs/2311.09735` | ✅ arxiv.org |
| GEO 论文正式版 | `https://doi.org/10.1145/3637528.3671900` | ✅ doi.org |
| 长上下文与信息位置（TACL 2024） | `https://arxiv.org/abs/2307.03172` | ✅ arxiv.org |
| RAG 原始论文（NeurIPS 2020） | `https://arxiv.org/abs/2005.11401` | ✅ arxiv.org |
| 《生成式人工智能服务管理暂行办法》 | `https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm` | ✅ 含 gov |
| 国家市场监督管理总局 | `https://www.samr.gov.cn/` | ✅ 含 gov |
| 工业和信息化部（备案主管） | `https://www.miit.gov.cn/` | ✅ 含 gov |
| Stanford HAI《2025 AI Index Report》 | `https://hai.stanford.edu/ai-index/2025-ai-index-report` | ✅ 含 edu |
| 清华大学 | `https://www.tsinghua.edu.cn/` | ✅ 含 edu |
| 北京大学 | `https://www.pku.edu.cn/` | ✅ 含 edu |
| RFC 9309 Robots Exclusion Protocol | `https://www.rfc-editor.org/rfc/rfc9309.html` | ❌ 行业标准（IETF） |
| W3C JSON-LD 1.1 规范 | `https://www.w3.org/TR/json-ld11/` | ❌ 行业标准（W3C） |
| llms.txt 社区提案 | `https://www.llmstxt.org/` | ❌ 但其为当前唯一事实标准来源 |
| Google 结构化数据官方文档 | `https://developers.google.com/search/docs/appearance/structured-data` | ❌ 但流量/可信度头部 |

**GEO 爬虫官方文档（2026-10-13 实测）**

| 用途 | 链接 | 实测 |
|---|---|---|
| OpenAI GPTBot / OAI-SearchBot 文档（**OpenAI 现行地址**） | `https://developers.openai.com/api/docs/bots` | 浏览器可开（旧地址 `platform.openai.com/docs/gptbot` 会自动跳到这里）；**CLI 一律 403**，见下方说明 |
| Apple 爬虫（Applebot / Applebot-Extended） | `https://support.apple.com/en-us/119829` | ✅ 200 |
| Anthropic ClaudeBot 抓取说明 | `https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler` | ✅ 200 |
| Common Crawl CCBot | `https://commoncrawl.org/ccbot` | ✅ 200 |

**两类「打不开」要分清，别误判**：

- **真的别用**（实测 5xx / 连接失败）：`beian.miit.gov.cn`（521）、`gsxt.gov.cn`（521）、`caict.ac.cn`（412）、`www.perplexity.ai/hub/faq/*`（连接被重置）。
- **curl 403 但浏览器能开**（Cloudflare / 边缘机器人管理）：`platform.openai.com/*`、`developers.openai.com/*`、`cloudflare.com/learning/*`。实测换 Googlebot / bingbot UA、补满浏览器请求头、走 HTTP/1.1 **仍然是 403**（拦的是 TLS 指纹与 JS 挑战，不是 UA），所以**这类链接永远别用 curl 判定存活**，验收口径写「浏览器打开确认」。其中 `platform.openai.com/docs/gptbot` 已被 OpenAI 迁走，引用时用新地址 `developers.openai.com/api/docs/bots`。

建议落点：`/blog/llms-txt-best-practices` 加 RFC 9309 + llmstxt.org；`/blog/structured-data-2025` 加 W3C JSON-LD 1.1 + Google 结构化数据文档；`/docs/schema-fields` 加 W3C JSON-LD 1.1；`/docs` 与 `/faq` 的「AI 爬虫 UA」相关问答加 `developers.openai.com/api/docs/bots` + `support.apple.com/en-us/119829` + `support.anthropic.com/.../8896518` + `commoncrawl.org/ccbot`；`/about` 加 samr.gov.cn + miit.gov.cn；`/solutions` 加 cac.gov.cn + hai.stanford.edu；`/cases` 加 hai.stanford.edu。

**别把两套「权威」混为一谈**：站点自己的 `lib/schema.ts:27` 的 `AUTHORITY_DOMAINS` 里有 `openai.com` / `anthropic.com`（那是站内渲染用的列表），而 GEORank 的计分白名单只有 arxiv / scholar.google / pubmed / doi / ieee / acm / nature / science / wikipedia / 含 gov / 含 edu。所以 `developers.openai.com` 这类链接**只算普通外链（有助于外链数），不计权威引用分**。

### 2.3 rel 策略修正（现网需要改一处）

`components/CitedSources.tsx:46` 现在是：

```tsx
rel="noopener noreferrer nofollow"
```

**引用型外链应去掉 `nofollow`**，保留 `noopener noreferrer`：

```tsx
rel="noopener noreferrer"
```

理由：`nofollow` 是给不可信内容/UGC 用的标记，权威来源引用用 followed 链接才是自然的引用信号；对 GEORank 分数无影响（它只数 `<a href>`），但影响搜索引擎对引用关系的判断。

### 2.4 禁止

- 不要为了凑数链无关站点；每条外链必须与所在段落论述相关。
- 不要与低质站/互链农场互换链接。
- 不要用 `rel="nofollow"` 或 JS 跳转包裹引用链接。
- 不要写打不开的域名（见上面黑名单）。

---

## 任务 ③：FAQPage 扩展至 5–8 条

### 3.1 现状条数（实测）

| 页面 | 现有 | 目标 |
|---|---|---|
| `/cases`、3 篇 blog、3 篇 docs | 3 | 6 |
| `/product`、`/solutions`、`/docs`、`/glossary`、`/blog`、`/about` | 4 | 6 |
| `/`、`/contact` | 5 | 6 |
| `/pricing` | 6 | 保持 |
| `/faq` | 24 | 保持 |

### 3.2 可见性要求（先确认再动手）

- 问答必须**在页面可见**：现有 `FAQSection` 用 `<details>` 折叠，内容仍在初始 HTML 里，AI 抓取器能读到，**不需要改交互**。
- `FAQPage.mainEntity` 的条数必须与页面可见问答**一一对应**，不要只加 Schema 不加可见问答（反之亦然）。
- 用用户口语提问（「怎么…」「能不能…」「为什么…」），答案 40–80 字、首句给结论、自包含不依赖上文。
- **凡涉及价格、客户数、效果周期、接口配额的答案，若站点没有既定口径，标 `【待确认】` 等你填真值——不许编造**（AI 会把编造的数字当事实复述）。

### 3.3 新增问答（草稿，直接可用）

**`/cases`（+3）**
1. 问：GEO 的效果一般多久能在 AI 答案里观察到？答：分三步：先被抓取（站点出现在 GPTBot/ClaudeBot 等爬虫日志里，通常 1–2 周），再进入答案样本池（2–4 周），稳定引用通常需 1–3 个月持续更新同一主题域；新域名的权威度累积明显更慢。
2. 问：案例里的效果数据是怎么统计出来的？答：以「AI 答案中是否出现品牌名或域名」为基线，结合爬虫日志识别与人工复核。样本量、统计周期与检索词清单在交付报告中标注。【待确认：是否公开统计口径与样本量】
3. 问：只有公众号或小红书，没有独立官网，能做 GEO 吗？答：可以，但第三方平台的内容与结构不可控。建议至少有一个自有域名作为实体锚点（承接 Organization Schema 与 llms.txt），再把第三方平台内容作为分发渠道。

**`/product`（+2）**
1. 问：诊断报告里的「站内链接」为什么会显示为 0？答：诊断工具只统计带完整域名的链接（如 https://www.flyai66.top/product），相对路径（`href="/product"`）不计入；站点导航多用相对路径时就会显示为 0，这是统计口径，不代表页面没有内链。
2. 问：注入结构化数据会影响页面渲染或现有 SEO 吗？答：不会。JSON-LD 是 `<script type="application/ld+json">` 数据块，不参与渲染、不改变视觉样式；回滚只需删除该 script 块。

**`/solutions`（+2）**
1. 问：出海品牌和国内站的 GEO 做法有什么不同？答：目标引擎与合规要求不同。出海站主要覆盖 Google AI 概览、Perplexity、ChatGPT 类答案，要注意语言与 hreflang 正确性；国内站以 DeepSeek、豆包、千问等为主，同时要符合生成式 AI 服务的合规要求。
2. 问：内容团队没有开发资源，可以只交付内容吗？答：可以。结构化数据与 llms.txt 都能以文件形式交付（JSON-LD 片段、llms.txt、Markdown），由内容团队贴入 CMS，或由开发一次性注入，不需要持续改造代码。

**`/docs`（+2）**
1. 问：怎么确认站点已经被 AI 爬虫抓取过？答：看服务器或 CDN 访问日志里的 UA：GPTBot、OAI-SearchBot、ChatGPT-User、ClaudeBot、PerplexityBot、Bytespider、Google-Extended、CCBot 等。若长期没有这些 UA，先检查 robots.txt 是否误拦。各爬虫的官方说明见 OpenAI 机器人文档、Apple 爬虫说明、Anthropic 抓取说明与 Common Crawl 的 CCBot 页面（本章节末尾附链接）。
2. 问：文档里的示例可以直接用于生产吗？答：示例用于说明请求结构与字段含义，请替换成真实 API Key 与真实域名，并先在沙箱环境验证通过再用于生产。

> `/docs` 页面底部新增一段「AI 爬虫官方说明」引用块（放在 `CitedSources` 或正文结尾）：
>
> ```mdx
> - [OpenAI 爬虫与机器人文档](https://developers.openai.com/api/docs/bots)（GPTBot / OAI-SearchBot / ChatGPT-User）
> - [Applebot 与 Applebot-Extended 说明](https://support.apple.com/en-us/119829)
> - [Anthropic 抓取与屏蔽说明](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)（ClaudeBot）
> - [Common Crawl 的 CCBot](https://commoncrawl.org/ccbot)
> ```
>
> 注意：OpenAI 那条在**浏览器**打开正常，`curl` 会返回 403（Cloudflare 机器人管理），别把它当成死链删掉。

**`/glossary`（+2）**
1. 问：GEO-bench 是什么？答：GEO 论文（KDD 2024）配套的评测基准，包含约一万条跨领域查询，用于衡量内容在生成式引擎答案中的可见度，是「GEO 可被度量」的学术依据。
2. 问：为什么关键结论要写在首段？答：生成式引擎倾向截取文档开头与段落首句作为答案素材；长上下文研究（arXiv:2307.03172）也表明信息位置越靠前，被模型利用的概率越高，因此首段直达答案能显著提高被引用概率。

**`/blog`（+2）**
1. 问：博客文章会更新吗？答：会。每篇文章标注发布日期与最后更新时间；涉及规范变化（如 schema.org、llms.txt 生态）的条目会随规范修订，并在页面标注新的更新日期。
2. 问：可以转载 FlyAI 的博客内容吗？答：允许在标注来源与原文链接的前提下引用；禁止整站镜像，以及用于训练闭源商业模型而不注明来源。

**`/about`（+2）**
1. 问：FlyAI 的服务边界是什么？答：交付内容与 GEO 配置（诊断、结构化数据、llms.txt、引用监测）；不承诺具体排名或引用率，也不代替客户做网站发布与运维决策。【待确认：与合同/服务条款表述保持一致】
2. 问：怎么核实 FlyAI 的公司主体信息？答：可在国家企业信用信息公示系统与市场监管总局官网按主体名称查询工商登记信息（`https://www.samr.gov.cn/`）。

**`/blog/geo-vs-seo-differences`（+3）**
1. 问：GEO 会取代 SEO 吗？答：不会。传统搜索仍有独立流量，GEO 处理的是「答案式检索」这一增量场景。两者共用同一套站点基础（可抓取、结构清晰、内容可信），差别在优化目标与内容写法。
2. 问：已经有 SEO 团队，GEO 该由谁负责？答：通常由 SEO/内容团队承接，因为工作重心从「关键词排名」转为「实体对齐与可引用段落」；开发只需一次性配合结构化数据与 robots.txt。
3. 问：GEO 能保证被 AI 引用吗？答：不能。引用取决于引擎的检索与生成策略、域名权威、内容时效等多因素；GEO 做的是提高被检索、被抽取、被正确引用的概率。

**`/blog/llms-txt-best-practices`（+3）**
1. 问：llms.txt 应该放在哪里？答：放在域名根目录，即 `https://域名/llms.txt`，与 robots.txt 同级；放到子目录不会被常规抓取约定识别。
2. 问：多个子域或多语言站怎么配置？答：每个独立主机名各自放一份 llms.txt，只列该主机名下的重要页面；多语言建议在「重要页面」段按语言分组。
3. 问：llms.txt 有官方校验工具吗？答：没有官方规范也没有官方校验器（它是社区提案，见 `https://www.llmstxt.org/`）。自检要点是四段结构（标题 / 摘要 / 重要页面 / 备注）完整、链接全部可访问。

**`/blog/structured-data-2025`（+3）**
1. 问：JSON-LD、Microdata、RDFa 该选哪个？答：优先 JSON-LD。它是 schema.org 与 Google 推荐格式（规范见 `https://www.w3.org/TR/json-ld11/`），与页面结构解耦、易维护，也不影响渲染。
2. 问：结构化数据写错会被惩罚吗？答：不会直接惩罚，但无效字段会被忽略；若声明与页面可见内容不一致（例如标注了页面上并不存在的评分），可能被判定为垃圾结构化数据。
3. 问：一个页面可以放几组 JSON-LD？答：可以放多组，建议用 `@graph` 合并并用 `@id` 互引；同一实体不要重复声明——重复的 FAQPage 或 BreadcrumbList 会在校验器里出现重复节点。

**`/docs/quickstart`（+3）**
1. 问：首次调用诊断接口前要准备什么？答：一个可公开访问的 URL、一个 API Key，以及可访问外网的执行环境；若站点有登录墙或强反爬，请先放行诊断请求的 UA。
2. 问：返回 401 或 429 怎么排查？答：401 多为 Key 缺失、被掩码复制或环境不匹配；429 表示触发限流，应退避重试并降低并发。【待确认：限流阈值与重试建议】
3. 问：诊断结果是实时抓取吗？答：是。诊断按请求抓取当时的页面内容与结构化数据，因此站点改动后重新诊断即可对比前后差异。

**`/docs/api-reference`（+3）**
1. 问：接口是同步还是异步？答：提交类接口（诊断、生成）返回任务或记录标识，结果需另行查询；读取类接口同步返回结果。【待确认：各接口的字段名】
2. 问：接口有幂等性保证吗？答：以任务/记录 ID 为准。【待确认：重复提交是新建记录还是复用，请按实际实现填写】
3. 问：错误码怎么读？答：4xx 多为请求参数或鉴权问题，5xx 为服务侧问题；响应体中的 message 字段说明具体原因。

**`/docs/schema-fields`（+3）**
1. 问：必填字段缺失会怎样？答：JSON 仍可解析，但校验器会报错，引擎可能忽略整个节点。上线前用 validator.schema.org 校验到 0 error。
2. 问：offers 里的 price 可以写「联系销售」吗？答：schema.org 允许 price 为文本，但 Google 的结构化数据解析要求数值，写文字会导致该项校验失败；价格未公开时改用 priceSpecification 描述区间，或省略 price。
3. 问：dateModified 和 datePublished 要一样吗？答：不一样。datePublished 是首次发布时间，dateModified 是最近一次实质性修订时间；两者都写才便于引擎判断时效。

### 3.4 验收

```bash
# 每页 FAQPage 的 mainEntity 条数应在 5–8（/faq 允许更多）
python3 tmp/geo_recommended_check.py https://www.flyai66.top
```

---

## 顺手项（不在本节范围，但只差两步就满分）

1. **首段 ≥80 字符**：实测 17 页首段只有 2–20 字 → content 恒为 80。把 `components/PageHero.tsx` 的摘要段改成 80–160 字的「直达答案段」（含品牌 + 服务 + 适用对象），content → 100（**+6 综合**）。改完 `og:locale` 与首段两项，综合 = 100。
2. **`og-default.jpg` 是生成占位图（状态：待定，本轮不做）** —— 2026-10-13 决定：等这 3 篇文章的内容后续更新时**一起改图**，本轮不单独动。
   - 到时一次改完：`public/og-default.jpg` 换成真正的 1200×630（保持文件名不变）＋ 3 篇 blog 的封面图（`app/blog/*/page.mdx:71-75`）改成各篇专属配图 ＋ 对应 `alt` 改到与图一致 ＋ `Article`/`Organization` 的 `image` 与 `ImageObject` 尺寸声明同步。
   - 现场可见位置：**只有 3 篇博客文章页**把这张图渲染在正文里——`app/blog/*/page.mdx:71-75`，位于正文开头「发布于 … · 约 N 分钟阅读」下方，`className="mt-6 w-full rounded-2xl"`，因原图是 1832×1832 方图 + `w-full`，实际渲染成一个约 768×768 的大方块。
     - https://www.flyai66.top/blog/geo-vs-seo-differences
     - https://www.flyai66.top/blog/llms-txt-best-practices
     - https://www.flyai66.top/blog/structured-data-2025
   - **顺带一个必须一起修的问题**：这 3 处的 `alt` 都写着具体的图内容描述（如「SEO 与 GEO 的对比示意图：左侧为传统搜索引擎结果页…」），但实际图是英文占位图——alt 与实际内容不符，对无障碍与 AI 理解都是错误信息。换图时要么让新图真的对得上 alt，要么把 alt 改成与新图一致的描述。

   - 验收：`sips -g pixelWidth -g pixelHeight public/og-default.jpg` → 1200 / 630；`curl -sI https://www.flyai66.top/og-default.jpg | grep -i content-type` → `image/jpeg`；再用浏览器打开确认不是占位图。
   - 换图后社交平台有缓存：X/Twitter 用 Card Validator 重新抓取，微信需重新分享一次才会更新卡片。
   - 可选进阶：`app/opengraph-image.tsx` + `next/og` 的 `ImageResponse` 做每页动态 OG 卡片（Next 14 支持，Vercel 可跑）；但**中文必须内嵌字体文件**，否则中文会渲染成空白/豆腐块，不想处理字体就先用静态图方案。

---

## 验收脚本 `tmp/geo_recommended_check.py`

```python
#!/usr/bin/env python3
"""GEO「建议优化项」验收：og_locale / og:url / 外链与权威域 / FAQ 条数。
用法: python3 tmp/geo_recommended_check.py https://www.flyai66.top
"""
import gzip, json, re, sys, urllib.parse, urllib.request
from html.parser import HTMLParser

BASE = (sys.argv[1] if len(sys.argv) > 1 else "https://www.flyai66.top").rstrip("/")
HOST = urllib.parse.urlparse(BASE).netloc
ROUTES = ["/", "/product", "/solutions", "/pricing", "/cases", "/docs", "/glossary", "/blog",
          "/blog/geo-vs-seo-differences", "/blog/llms-txt-best-practices", "/blog/structured-data-2025",
          "/about", "/contact", "/faq", "/docs/quickstart", "/docs/api-reference", "/docs/schema-fields"]
AUTHORITY = ("arxiv.org", "scholar.google.com", "pubmed.ncbi.nlm.nih.gov", "doi.org", "ieee.org",
             "acm.org", "nature.com", "science.org", "wikipedia.org", "gov", "edu")
FAQ_MIN, FAQ_MAX, FAQ_INDEX_MAX = 5, 8, 30   # /faq 是汇总页，放宽

def get(u):
    r = urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"}), timeout=30)
    b = r.read()
    if r.headers.get("Content-Encoding") == "gzip":
        b = gzip.decompress(b)
    return b.decode("utf-8", "replace")

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.metas, self.a, self.ld = {}, [], []
        self.in_ld = False; self.buf = []
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "meta":
            k = d.get("property") or d.get("name")
            if k: self.metas.setdefault(k, d.get("content", ""))
        elif tag == "a" and d.get("href"): self.a.append(d["href"])
        elif tag == "script" and d.get("type") == "application/ld+json":
            self.in_ld = True; self.buf = []
    def handle_endtag(self, tag):
        if tag == "script" and self.in_ld:
            self.ld.append("".join(self.buf)); self.in_ld = False
    def handle_data(self, d):
        if self.in_ld: self.buf.append(d)

fails = []
for r in ROUTES:
    p = P(); p.feed(get(BASE + r))
    ext = [h for h in p.a if (lambda u: u.scheme in ("http", "https") and u.netloc and HOST not in u.netloc)(urllib.parse.urlparse(h))]
    auth = [h for h in ext if any(x in urllib.parse.urlparse(h).netloc for x in AUTHORITY)]
    faq_counts, nofollow_cites = [], 0
    for blk in p.ld:
        try:
            d = json.loads(blk)
        except Exception:
            fails.append(f"{r}: JSON-LD 解析失败"); continue
        for n in (d if isinstance(d, list) else [d]):
            if isinstance(n, dict) and "FAQPage" in (n.get("@type") if isinstance(n.get("@type"), list) else [n.get("@type")]):
                faq_counts.append(len(n.get("mainEntity") or []))
    if not p.metas.get("og:locale"):
        fails.append(f"{r}: 缺 og:locale")
    if p.metas.get("og:site_name") != "FlyAI":
        fails.append(f"{r}: 缺 og:site_name")
    ogurl = p.metas.get("og:url", "")
    if not ogurl.startswith(BASE):
        fails.append(f"{r}: og:url={ogurl} 与站点域名不一致")
    if len(ext) < 10:
        fails.append(f"{r}: 外链 {len(ext)} < 10")
    if len(auth) < 2:
        fails.append(f"{r}: 权威引用 {len(auth)} < 2")
    top = max(faq_counts) if faq_counts else 0
    hi = FAQ_INDEX_MAX if r == "/faq" else FAQ_MAX
    if not (FAQ_MIN <= top <= hi):
        fails.append(f"{r}: FAQPage 条数 {top}，期望 {FAQ_MIN}–{hi}")
    print(f"{r:34} og:locale={'✓' if p.metas.get('og:locale') else '✗'} 外链={len(ext):3} 权威={len(auth):3} FAQ={top}")

print()
if fails:
    print("❌ 未通过：")
    for f in fails: print("  -", f)
    sys.exit(1)
print("✅ 建议优化项全部通过")
```

---

## 提交与回滚

- 建议 3 个独立 commit：`fix(meta): 统一 metadata 生成器，补齐 og:locale/og:site_name 并对齐 og:url 域名` / `chore(build): 清理 tsconfig 中的本机绝对路径残留` / `feat(faq): 各页 FAQ 扩充至 6 条并新增高质量参考外链`
- 提交前：`npx tsc --noEmit` + `VERCEL=1 npm run build`（本地类型检查现在是好的——先做 §1.2 那一步）
- 提交前扫密钥形态：`git diff --cached | grep -iE 'sk-|sk_live_|ghp_|AKIA|AIza|xoxb-|Bearer '`（GitHub Push Protection 会拦）
- 回滚：`git revert <sha>`，无数据库/构建产物副作用
- 上线后：跑 §验收脚本 + GEORank 诊断复跑同一 URL，附前/后对比（预期：Meta 100、综合 94；若顺手项也做，综合 100）
