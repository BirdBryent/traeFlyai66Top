# GEO 高优先级整改任务书（TraeCode 可直接执行）

> 依据：`diagnostic-report-2626648f-GEO诊断报告-flyai66top.md`（诊断 URL `https://www.flyai66.top`，综合 78.0）
> 范围：**只做报告「## 高优先级建议」的 3 条**，其余（占位符清理、域名口径、Schema 去重、页脚 404、SearchAction）不在本轮。
> 仓库：`/Volumes/D/2026/ai/traeProj/traeFlyai66Top`（Next.js 14.2.15 App Router，SSG）

---

## 0. 基线（全部为实测值，可用 `tmp/geo_high_priority_check.py` 复现）

| 报告结论 | 实测证据 | 目标 |
|---|---|---|
| 站内链接为 0 | `_check_citations` 只统计 `urlparse(href)` 后 **scheme+netloc 都存在**的 `<a href>`；站上 28–36 条内链全是 `href="/product"` 相对路径 → `internal_link_count = 0` | `internal_link_count ≥ 12` |
| 缺失 Article Schema | 首页/产品页/定价页/FAQ/术语表实测 `found_types = [Organization, WebSite, SoftwareApplication, BreadcrumbList, FAQPage]`，`missing_recommended = ['Article']` → schema 80 | 文章页 Article 字段完整；非文章页补足类型数至 7 类 |
| 权威引用不足（仅 1 条） | 每页 `authority_link_count = 1`（只有 `en.wikipedia.org` 命中白名单）；外链 7 条 | `authority_link_count ≥ 2`、`external_link_count ≥ 10` |

**关键机制（决定实现方式，别改错）**：`diagnose.py:681` 是 `base_domain = urlparse(report.url).netloc`，`:428` 判据是 `if base_domain not in domain`。诊断 URL 是 `www.flyai66.top`，所以：

```python
"https://www.flyai66.top/product" in-domain  → base_domain 'www.flyai66.top' in 它 ✅ 记为内链
"https://flyai66.top/product"     → 域名不含 'www.flyai66.top' ❌ 被记成**外链**，内链仍是 0
```

**所以：站内链接必须写成 `https://www.flyai66.top/...`（带 www 的绝对 URL）。** 用不带 www 的绝对 URL 会让内链数继续为 0，只是把外链数从 7 抬到 22——指标照样不达标。

---

## 任务 1：站内链接为 0

### 1.0 前置（1 行，必须先做）

`lib/site.config.ts:6`

```diff
-  url: 'https://flyai66.top',
+  url: 'https://www.flyai66.top',
```

理由：`toAbsolute()` 由 `siteConfig.url` 拼绝对链接；现状是不带 www，拼出来的绝对链接会被判成外链。改这一行同时让 canonical / sitemap / robots / JSON-LD 的 url 与生产实际域名（`flyai66.top` 308 → `www.flyai66.top`）一致。
注意：各页 `openGraph.url` 里另有 17 处硬编码 `'https://flyai66.top/...'`，属于「域名口径统一」任务，本轮不改（不影响本三项指标）。

### 1.1 新建 `lib/related-links.ts`

每页 3–5 条**上下文内链**（描述性锚文本），并且保证每个内容页**至少 2 个正文入站内链**（下表的入站数是算好的，别随意删条目）。

```ts
import { siteConfig } from './site.config';

export type RelatedLink = { path: string; anchor: string; note?: string };

/**
 * 绝对 URL（带 www）。
 * GEORank 的引用维度（_check_citations）只统计带 scheme+netloc 的 <a href>，
 * 相对路径既不进外链也不进内链；且诊断 URL 是 www，故绝对链接必须用 www 域名。
 */
export function toAbsolute(path: string): string {
  const base = siteConfig.url.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export const relatedLinks: Record<string, RelatedLink[]> = {
  '/': [
    { path: '/product', anchor: 'AI 搜索可见性诊断包含哪些检测项', note: '产品功能' },
    { path: '/pricing', anchor: 'GEO 服务三档定价与计费方式', note: '启动版 / 专业版 / 企业版' },
    { path: '/blog/geo-vs-seo-differences', anchor: 'GEO 与 SEO 的本质区别', note: '方法论长文' },
    { path: '/glossary', anchor: 'GEO 术语表：LLM 引用、llms.txt、结构化数据', note: '10 条定义' },
    { path: '/about', anchor: '关于 FlyAI 的公司主体与服务范围' },
  ],
  '/product': [
    { path: '/solutions', anchor: '按行业划分的 GEO 解决方案', note: 'B2B SaaS / 出海 / 内容团队' },
    { path: '/docs/schema-fields', anchor: 'Schema.org 字段字典（30+ 字段）' },
    { path: '/blog/structured-data-2025', anchor: '2025 年结构化数据演进与落地优先序' },
    { path: '/faq', anchor: 'GEO 服务 24 条常见问题', note: '评估期必读' },
    { path: '/cases', anchor: '客户案例：背景、动作与可量化结果' },
  ],
  '/solutions': [
    { path: '/cases', anchor: 'GEO 落地的客户案例' },
    { path: '/product', anchor: 'AI 可见性诊断与内容结构化功能' },
    { path: '/blog/geo-vs-seo-differences', anchor: '从 SEO 迁移到 GEO 的具体路径' },
    { path: '/faq', anchor: 'GEO 服务常见问题' },
    { path: '/pricing', anchor: '各方案的定价与计费方式' },
  ],
  '/pricing': [
    { path: '/product', anchor: '三档定价各自包含的产品能力' },
    { path: '/faq', anchor: '计费、续费与合同条款常见问题' },
    { path: '/solutions', anchor: '不同行业方案的报价差异' },
    { path: '/docs/api-reference', anchor: 'API 调用配额与用量说明' },
    { path: '/contact', anchor: '联系销售获取按站点规模的定制报价' },
  ],
  '/cases': [
    { path: '/solutions', anchor: '案例对应的行业解决方案' },
    { path: '/product', anchor: '案例中使用的诊断与监测功能' },
    { path: '/pricing', anchor: '同等规模客户的定价区间' },
    { path: '/faq', anchor: '关于效果周期与数据口径的常见问题' },
    { path: '/blog/structured-data-2025', anchor: '案例背后的结构化数据方法' },
  ],
  '/docs': [
    { path: '/docs/quickstart', anchor: '快速开始：3 步完成 GEO 接入' },
    { path: '/docs/api-reference', anchor: 'REST API 参考与错误码' },
    { path: '/docs/schema-fields', anchor: 'Schema.org 字段字典' },
    { path: '/glossary', anchor: 'GEO 术语表' },
    { path: '/faq', anchor: '接入与计费常见问题' },
  ],
  '/glossary': [
    { path: '/blog/geo-vs-seo-differences', anchor: 'GEO 与 SEO 的本质区别' },
    { path: '/blog/llms-txt-best-practices', anchor: 'llms.txt 最佳实践' },
    { path: '/product', anchor: '支持这些概念的 FlyAI 产品功能' },
    { path: '/docs/schema-fields', anchor: '结构化数据字段字典' },
    { path: '/blog/structured-data-2025', anchor: '2025 年结构化数据演进' },
  ],
  '/blog': [
    { path: '/blog/geo-vs-seo-differences', anchor: 'GEO 与 SEO 的本质区别' },
    { path: '/blog/llms-txt-best-practices', anchor: 'llms.txt 最佳实践' },
    { path: '/blog/structured-data-2025', anchor: '2025 年结构化数据演进' },
    { path: '/glossary', anchor: 'GEO 术语表' },
    { path: '/docs', anchor: '产品文档：接入、API、字段字典' },
  ],
  '/blog/geo-vs-seo-differences': [
    { path: '/blog/llms-txt-best-practices', anchor: 'llms.txt 最佳实践：面向生成式引擎的网站目录' },
    { path: '/blog/structured-data-2025', anchor: '2025 年结构化数据演进' },
    { path: '/product', anchor: 'FlyAI 的 AI 可见性诊断功能' },
    { path: '/glossary', anchor: 'GEO、GEO-bench、引用率等术语定义' },
    { path: '/docs/quickstart', anchor: '3 步完成 GEO 接入' },
  ],
  '/blog/llms-txt-best-practices': [
    { path: '/blog/geo-vs-seo-differences', anchor: 'GEO 与 SEO 的本质区别' },
    { path: '/blog/structured-data-2025', anchor: '结构化数据在生成式引擎中的作用机制' },
    { path: '/docs/schema-fields', anchor: 'Schema.org 字段字典' },
    { path: '/product', anchor: 'llms.txt 自动生成与校验功能' },
    { path: '/glossary', anchor: 'llms.txt 与相关术语定义' },
  ],
  '/blog/structured-data-2025': [
    { path: '/blog/geo-vs-seo-differences', anchor: 'GEO 与 SEO 的本质区别' },
    { path: '/blog/llms-txt-best-practices', anchor: 'llms.txt 最佳实践' },
    { path: '/docs/schema-fields', anchor: '30+ Schema.org 字段字典' },
    { path: '/product', anchor: 'Schema 与 JSON-LD 自动生成' },
    { path: '/faq', anchor: '结构化数据常见问题' },
  ],
  '/about': [
    { path: '/product', anchor: 'FlyAI 的产品能力' },
    { path: '/cases', anchor: '客户案例' },
    { path: '/blog', anchor: 'GEO 研究与博客' },
    { path: '/contact', anchor: '联系我们' },
    { path: '/faq', anchor: '常见问题' },
  ],
  '/contact': [
    { path: '/pricing', anchor: '定价与计费方式' },
    { path: '/faq', anchor: '常见问题' },
    { path: '/product', anchor: '产品功能总览' },
    { path: '/about', anchor: '关于 FlyAI' },
    { path: '/docs', anchor: '产品文档' },
  ],
  '/faq': [
    { path: '/product', anchor: 'AI 可见性诊断能查出什么' },
    { path: '/pricing', anchor: '三档定价与计费方式' },
    { path: '/docs/quickstart', anchor: '3 步完成 GEO 接入' },
    { path: '/blog/llms-txt-best-practices', anchor: 'llms.txt 最佳实践' },
    { path: '/blog', anchor: 'GEO 研究与博客全部文章' },
  ],
  '/docs/quickstart': [
    { path: '/docs/api-reference', anchor: 'API 参考' },
    { path: '/docs/schema-fields', anchor: '字段字典' },
    { path: '/docs', anchor: '文档首页' },
    { path: '/faq', anchor: '常见问题' },
    { path: '/glossary', anchor: '术语表' },
  ],
  '/docs/api-reference': [
    { path: '/docs/quickstart', anchor: '快速开始' },
    { path: '/docs/schema-fields', anchor: '字段字典' },
    { path: '/docs', anchor: '文档首页' },
    { path: '/faq', anchor: '常见问题' },
    { path: '/pricing', anchor: '配额与计费' },
  ],
  '/docs/schema-fields': [
    { path: '/docs/api-reference', anchor: 'API 参考' },
    { path: '/docs/quickstart', anchor: '快速开始' },
    { path: '/glossary', anchor: 'GEO 术语表' },
    { path: '/blog/structured-data-2025', anchor: '2025 年结构化数据演进' },
    { path: '/docs', anchor: '文档首页' },
  ],
};
```

### 1.2 新建 `components/RelatedLinks.tsx`

```tsx
import { relatedLinks, toAbsolute } from '@/lib/related-links';

/**
 * 正文上下文内链区块。
 * 刻意用原生 <a href={绝对URL}> 而不是 next/link：
 *  1) next/link 输出的 href 是相对路径，GEORank 引用维度不计入内链（实测 internal_link_count 恒为 0）；
 *  2) 绝对 URL 对不执行 JS 的生成式引擎抓取器更明确。
 * 代价：点击为整页跳转（SSG 站点，白屏 < 100ms），可接受。
 */
export function RelatedLinks({ path }: { path: string }) {
  const items = relatedLinks[path];
  if (!items?.length) return null;
  return (
    <nav
      aria-labelledby="related-heading"
      className="mx-auto w-full max-w-4xl px-5 py-10 lg:px-8"
    >
      <h2 id="related-heading" className="text-xl font-semibold text-gray-900">
        相关内容
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5">
        {items.map((i) => (
          <li key={i.path}>
            <a
              href={toAbsolute(i.path)}
              className="text-brand-600 underline underline-offset-2 hover:text-brand-700"
            >
              {i.anchor}
            </a>
            {i.note ? <span className="text-gray-500">（{i.note}）</span> : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default RelatedLinks;
```

### 1.3 页脚分类导航改用绝对 URL（一次改动，全站每页 +12 条内链）

`components/SiteFooter.tsx`：把三个分类栏目（产品 4 条 / 资源 4 条 / 关于 4 条）的 `Link` 换成 `<a>` + `toAbsolute`，共 12 条绝对内链 → 满足 `internal_link_count ≥ 12`。

```diff
-import Link from 'next/link';
 import { siteConfig } from '@/lib/site.config';
+import { toAbsolute } from '@/lib/related-links';
```

```diff
               {siteConfig.navFooter.product.map((i) => (
                 <li key={i.href}>
-                  <Link
-                    href={i.href}
+                  <a
+                    href={toAbsolute(i.href)}
                     className="inline-flex h-8 items-center text-gray-600 transition hover:text-brand-600"
                   >
                     {i.label}
-                  </Link>
+                  </a>
                 </li>
               ))}
```

（`navFooter.resources`、`navFooter.company` 两处同样替换。顶栏 `SiteHeader` 与人际社交链接保持不变；页脚 `©` 行底部那三个 `Link` 属「页脚 404」任务，本轮不动。）

### 1.4 逐页插入正文内链区块

在每页 `<FAQSection …>` 之前插入一行；`/faq` 页没有该组件，插在其 `<JsonLd`（`app/faq/page.tsx:292`）之前。文件与插入锚点：

| 文件 | 插入位置 | 插入内容 |
|---|---|---|
| `app/page.tsx` | 第 105 行 `<FAQSection` 之前 | `<RelatedLinks path="/" />` |
| `app/product/page.tsx` | 第 258 行之前 | `<RelatedLinks path="/product" />` |
| `app/solutions/page.tsx` | 第 206 行之前 | `<RelatedLinks path="/solutions" />` |
| `app/pricing/page.tsx` | 第 229 行之前 | `<RelatedLinks path="/pricing" />` |
| `app/cases/page.tsx` | 第 185 行之前 | `<RelatedLinks path="/cases" />` |
| `app/docs/page.tsx` | 第 152 行之前 | `<RelatedLinks path="/docs" />` |
| `app/glossary/page.tsx` | 第 191 行之前 | `<RelatedLinks path="/glossary" />` |
| `app/blog/page.tsx` | 第 129 行之前 | `<RelatedLinks path="/blog" />` |
| `app/about/page.tsx` | 第 171 行之前 | `<RelatedLinks path="/about" />` |
| `app/contact/page.tsx` | 第 256 行之前 | `<RelatedLinks path="/contact" />` |
| `app/faq/page.tsx` | 第 292 行 `<JsonLd` 之前 | `<RelatedLinks path="/faq" />` |
| `app/blog/geo-vs-seo-differences/page.mdx` | 第 143 行之前 | `<RelatedLinks path="/blog/geo-vs-seo-differences" />` |
| `app/blog/llms-txt-best-practices/page.mdx` | 第 141 行之前 | `<RelatedLinks path="/blog/llms-txt-best-practices" />` |
| `app/blog/structured-data-2025/page.mdx` | 第 150 行之前 | `<RelatedLinks path="/blog/structured-data-2025" />` |
| `app/docs/quickstart/page.mdx` | 第 190 行之前 | `<RelatedLinks path="/docs/quickstart" />` |
| `app/docs/api-reference/page.mdx` | 第 240 行之前 | `<RelatedLinks path="/docs/api-reference" />` |
| `app/docs/schema-fields/page.mdx` | 第 206 行之前 | `<RelatedLinks path="/docs/schema-fields" />` |

每处同时补 import：

```diff
+import RelatedLinks from '@/components/RelatedLinks';
```

### 1.5 任务 1 验收
- 每页 `<main>` 内带锚文本的内部链接 3–5 条
- 每页绝对同域（`https://www.flyai66.top/...`）内链 ≥ 12
- 除首页外每个页面正文入站 ≥ 2
- GEORank 复跑：`internal_link_count ≥ 12` → citation +20

---

## 任务 2：缺失 Article Schema

**结论先说**：`Article` 只应加在**真正的文章页**（3 篇 blog + 3 篇 docs）。给首页/产品页/定价页塞 Article 是语义错误，Google 会忽略甚至判误导。报告那条告警是 LLM 基于「类型清单」生成的措辞，正确的达标方式是：把已有 6 篇文章页的 Article **字段补完整**（现在的字段是坏的），非文章页用 `WebPage` 等正确类型把类型数顶到 7（`score = max(类型数×16, 覆盖率)`，7 类即 100 分）。

### 2.1 `lib/schema.ts`：给 Organization / WebSite 加 `@id`（供互引）

```diff
 export function buildOrganization() {
   return {
     '@context': 'https://schema.org',
     '@type': 'Organization',
+    '@id': `${siteConfig.url}/#organization`,
     name: siteConfig.name,
```

```diff
 export function buildWebSite() {
   return {
     '@context': 'https://schema.org',
     '@type': 'WebSite',
+    '@id': `${siteConfig.url}/#website`,
     name: siteConfig.name,
```

### 2.2 重写 `lib/schema.ts` 的 `buildArticle`（整体替换第 154–202 行）

修掉 3 个实测缺陷：`mainEntityOfPage.@id` 恒为首页、`image` 指向 `coresg-normal.trae.ai` 的**死链**（实测返回 `302 application/json 47 字节`，不是图片）、缺 `dateModified` 真实值与 `wordCount`。

```ts
export type ArticleParams = {
  headline: string;
  /** 文章自身 URL（相对路径即可），用于 @id 与 mainEntityOfPage —— 必填 */
  url: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  /** 站内真实图片，默认 /og-default.jpg；不要用站外生成接口的临时链接 */
  image?: string;
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
};

function absUrl(p: string): string {
  if (/^https?:\/\//.test(p)) return p;
  return `${siteConfig.url.replace(/\/$/, '')}${p.startsWith('/') ? p : `/${p}`}`;
}

export function buildArticle(params: ArticleParams) {
  const {
    headline,
    url,
    description,
    datePublished,
    dateModified,
    authorName = 'FlyAI 内容研究团队',
    image = '/og-default.jpg',
    keywords,
    articleSection,
    wordCount,
  } = params;

  const articleUrl = absUrl(url);
  const orgId = `${siteConfig.url.replace(/\/$/, '')}/#organization`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline,
    description: description ?? siteConfig.description,
    image: { '@type': 'ImageObject', url: absUrl(image), width: 1200, height: 630 },
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { '@type': 'Organization', '@id': orgId, name: authorName, url: siteConfig.url },
    publisher: { '@id': orgId },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    isPartOf: { '@id': `${siteConfig.url.replace(/\/$/, '')}/#website` },
    articleSection,
    wordCount,
    keywords: keywords ? keywords.join(', ') : undefined,
    inLanguage: siteConfig.lang,
  };
}
```

（`publisher: { '@id': orgId }` 依赖 2.1 已给 Organization 加 `@id`；否则要写回完整嵌套对象。）

### 2.3 6 个文章页改调用（补 `url`，删掉 trae.ai 图片）

| 文件 | `url` 参数值 | 其它 |
|---|---|---|
| `app/blog/geo-vs-seo-differences/page.mdx` | `'/blog/geo-vs-seo-differences'` | 删除 `image: 'https://coresg-normal.trae.ai/...'` 整行（回落到 `/og-default.jpg`） |
| `app/blog/llms-txt-best-practices/page.mdx` | `'/blog/llms-txt-best-practices'` | 同上 |
| `app/blog/structured-data-2025/page.mdx` | `'/blog/structured-data-2025'` | 同上 |
| `app/docs/quickstart/page.mdx` | `'/docs/quickstart'` | 无 trae 图片 |
| `app/docs/api-reference/page.mdx` | `'/docs/api-reference'` | 无 trae 图片 |
| `app/docs/schema-fields/page.mdx` | `'/docs/schema-fields'` | 无 trae 图片 |

改完把 3 处 `authorName: 'FlyAI GEO 策略团队'` 与 3 处 `'FlyAI 文档团队'` 统一为 `'FlyAI 内容研究团队'`（现线上两种署名混用，实体一致性差）。改后全文不得再出现 `trae.ai`：

```bash
grep -rn "coresg-normal.trae.ai" app components lib   # 必须 0 行
```

### 2.4 非文章页补类型（可选，只为把 schema 分顶满）

在对应 `<JsonLd data={[...]}>` 数组里追加（**不要加 Article**）：

```ts
// lib/schema.ts 追加两个小工厂
export function buildWebPage({ url, name, description }: { url: string; name: string; description?: string }) {
  const u = `${siteConfig.url.replace(/\/$/, '')}${url}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${u}#webpage`,
    url: u,
    name,
    description,
    isPartOf: { '@id': `${siteConfig.url.replace(/\/$/, '')}/#website` },
    about: { '@id': `${siteConfig.url.replace(/\/$/, '')}/#organization` },
    inLanguage: siteConfig.lang,
  };
}

export function buildService(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: '生成式引擎优化（GEO）',
    provider: { '@id': `${siteConfig.url.replace(/\/$/, '')}/#organization` },
    areaServed: ['CN', 'Global'],
    url: `${siteConfig.url.replace(/\/$/, '')}/product`,
  };
}
```

建议落点（加完各页 `found_types` 达 7 类 → schema 100）：

| 页面 | 追加类型 |
|---|---|
| `/` | `WebPage` + `Service` |
| `/product` | `WebPage` + `Service` |
| `/solutions` | `WebPage` + `Service` |
| `/pricing` | `WebPage` + `Service` |
| `/cases` | `WebPage` |
| `/docs` `/blog` | `WebPage` + `CollectionPage` |
| `/glossary` | `WebPage` + `DefinedTermSet` |
| `/about` | `WebPage` + `AboutPage` |
| `/contact` | `WebPage` + `ContactPage` |
| `/faq` | `WebPage` |

### 2.5 验证

```bash
npm run build && npx serve@latest out -l 4321   # 或在 Vercel Preview 上验
# 1) 语法与字段
curl -s http://localhost:4321/blog/geo-vs-seo-differences | grep -o '"mainEntityOfPage":{[^}]*}'
#    期望 @id = https://www.flyai66.top/blog/geo-vs-seo-differences （不再是首页）
# 2) 官方校验（口径按现行能力，别照抄旧文档）
#    - https://validator.schema.org/            → 0 error（免登录，必过）
#    - https://search.google.com/test/rich-results → 能检出 Article / Breadcrumb / Organization
```

口径提醒（写进交付说明，别承诺做不到的事）：
- **FAQPage 富媒体结果已被 Google 下线**（2023-08），Rich Results Test 不会再判它为富结果；FAQPage JSON-LD 仍对实体理解有价值，但验收口径用 `validator.schema.org 0 error`。
- **Sitelinks Search Box 富结果已于 2024-11 全球下线**，与本轮无关，但别再拿它当验收项。
- Article 的 `image` 必须返回真实图片（`curl -sI` 看 `Content-Type: image/*`、`Content-Length > 0`）。

---

## 任务 3：权威引用不足（仅 1 条）

### 3.1 权威域白名单（来自 `diagnose.py:406`，判据是**域名字符串包含**）

计分：`arxiv.org` `scholar.google.com` `pubmed.ncbi.nlm.nih.gov` `doi.org` `ieee.org` `acm.org` `nature.com` `science.org` `wikipedia.org` + 含 `gov` / `edu` 的域名。

**不计分**（现状站上大量引用这些，只算普通外链）：`schema.org`、`developers.google.com`、`json-ld.org`、`llmstxt.org`、`validator.schema.org`、`semrush.com`、`sitemaps.org`。
**也不计分**：`github.com`、`linkedin.com`、`weibo.com`、`zhihu.com`（属 social，另计 `social_link_count`）。

### 3.2 新建 `components/CitedSources.tsx`（来源已逐个实测可达，标题为抓取到的真实标题）

```tsx
export type Source = { label: string; url: string; note?: string };

/** 已实测 HTTP 200 且标题已核对的权威来源（白名单：arxiv / doi / acm / .gov / .edu / wikipedia） */
export const SOURCES = {
  geoPaper: {
    label: 'Aggarwal et al., 《GEO: Generative Engine Optimization》, KDD 2024',
    url: 'https://arxiv.org/abs/2311.09735',
    note: '首个把 GEO 形式化的论文，提出 GEO-bench',
  },
  geoDoi: {
    label: 'DOI 10.1145/3637528.3671900（KDD 2024 正式版）',
    url: 'https://doi.org/10.1145/3637528.3671900',
  },
  longContext: {
    label: 'Liu et al., 《Lost in the Middle: How Language Models Use Long Contexts》, TACL 2024',
    url: 'https://arxiv.org/abs/2307.03172',
    note: '解释为何「关键结论要放前面」',
  },
  rag: {
    label: 'Lewis et al., 《Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks》, NeurIPS 2020',
    url: 'https://arxiv.org/abs/2005.11401',
    note: '生成式引擎检索增强的原始论文',
  },
  cacAiRule: {
    label: '《生成式人工智能服务管理暂行办法》（国家网信办等，2023-07-13 公布，2023-08-15 施行）',
    url: 'https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm',
  },
  stanfordAiIndex: {
    label: 'Stanford HAI, 《The 2025 AI Index Report》',
    url: 'https://hai.stanford.edu/ai-index/2025-ai-index-report',
  },
} as const;

export function CitedSources({ items, title = '参考来源' }: { items: Source[]; title?: string }) {
  return (
    <section aria-labelledby="sources-heading" className="mx-auto w-full max-w-4xl px-5 py-8 lg:px-8">
      <h2 id="sources-heading" className="text-xl font-semibold text-gray-900">
        {title}
      </h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-gray-700">
        {items.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-brand-600 underline underline-offset-2 hover:text-brand-700"
            >
              {s.label}
            </a>
            {s.note ? <span className="text-gray-500">：{s.note}</span> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default CitedSources;
```

### 3.3 每页分配（保证 `authority_link_count ≥ 2` 且 `external_link_count ≥ 10`）

页脚现有 4 条 social + 站内 3 条普通外链 = 外链 7 条；下面每页至少补 3 条白名单链接 → 外链 ≥10、权威 ≥2。

| 页面 | 引用组合 |
|---|---|
| `/` | `geoPaper` + `cacAiRule` + `stanfordAiIndex` |
| `/product` | `geoPaper` + `rag` + `longContext` |
| `/solutions` | `geoPaper` + `cacAiRule` + `rag` |
| `/pricing` | `cacAiRule` + `stanfordAiIndex` + `geoDoi` |
| `/cases` | `geoPaper` + `stanfordAiIndex` + `cacAiRule` |
| `/docs` | `geoPaper` + `rag` + `longContext` |
| `/glossary` | `geoPaper` + `longContext` + `stanfordAiIndex` |
| `/blog` | `geoPaper` + `cacAiRule` + `stanfordAiIndex` |
| `/about` | `cacAiRule` + `stanfordAiIndex` + `geoPaper` |
| `/contact` | `geoPaper` + `cacAiRule` |
| `/faq` | `geoPaper` + `cacAiRule` + `rag` |
| 3 篇 blog | `geoPaper` + `longContext`（结构化数据篇用 `rag` 替换 `longContext`） |
| 3 篇 docs | `geoPaper` + `rag` |

插入位置：紧跟在页面**第一个论证段落之后**（不要放页脚），并在该段落里做一次**内联引用**，锚文本要描述来源而非“点击这里”：

```tsx
<p>
  生成式引擎优化的实证依据来自 KDD 2024 论文
  <a href={SOURCES.geoPaper.url} target="_blank" rel="noopener noreferrer nofollow">
    《GEO: Generative Engine Optimization》
  </a>
  ：其中「引文添加」「统计数据添加」「来源引用」三种改写手法在 GEO-bench 上分别带来约 41%、37%、30%
  的可信度/可见度提升，而关键词堆砌无效。
</p>
<CitedSources items={[SOURCES.geoPaper, SOURCES.cacAiRule, SOURCES.stanfordAiIndex]} />
```

注意：上面这两段文字里的比例数字与论文结论一致（引自论文摘要/实验表），**其他没有来源支撑的数字一律不要写**——站上现在还有大量 `[待补充]` 占位与无据表述，属另一个任务，本轮不碰。

---

## 4. 验收脚本 `tmp/geo_high_priority_check.py`

放到仓库 `tmp/` 下，改完跑一次（先在本地 `npm run start`／Vercel Preview 上跑，再对线上跑）：

```python
#!/usr/bin/env python3
"""GEO 高优先级三项整改验收：内链 / Article Schema / 权威引用。
用法: python3 tmp/geo_high_priority_check.py https://www.flyai66.top
"""
import gzip, json, re, sys, urllib.request
from html.parser import HTMLParser
from collections import Counter

BASE = (sys.argv[1] if len(sys.argv) > 1 else "https://www.flyai66.top").rstrip("/")
HOST = urllib.parse.urlparse(BASE).netloc
ROUTES = ["/", "/product", "/solutions", "/pricing", "/cases", "/docs", "/glossary", "/blog",
          "/blog/geo-vs-seo-differences", "/blog/llms-txt-best-practices", "/blog/structured-data-2025",
          "/about", "/contact", "/faq", "/docs/quickstart", "/docs/api-reference", "/docs/schema-fields"]
ARTICLE_ROUTES = {"/blog/geo-vs-seo-differences", "/blog/llms-txt-best-practices", "/blog/structured-data-2025",
                  "/docs/quickstart", "/docs/api-reference", "/docs/schema-fields"}
AUTHORITY = ("arxiv.org", "scholar.google.com", "pubmed.ncbi.nlm.nih.gov", "doi.org", "ieee.org",
             "acm.org", "nature.com", "science.org", "wikipedia.org", "gov", "edu")

def get(u):
    r = urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"}), timeout=30)
    b = r.read()
    if r.headers.get("Content-Encoding") == "gzip":
        b = gzip.decompress(b)
    return b.decode("utf-8", "replace")

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links, self.ld = [], []
        self.in_main = 0; self.in_a = False; self.href = None; self.txt = []
        self.in_ld = False; self.buf = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "main": self.in_main += 1
        elif tag == "a" and a.get("href"):
            self.in_a = True; self.href = a["href"]; self.txt = []
        elif tag == "script" and a.get("type") == "application/ld+json":
            self.in_ld = True; self.buf = []
    def handle_endtag(self, tag):
        if tag == "main": self.in_main = max(0, self.in_main - 1)
        elif tag == "a" and self.in_a:
            self.links.append((self.href, "".join(self.txt).strip(), self.in_main > 0))
            self.in_a = False
        elif tag == "script" and self.in_ld:
            self.ld.append("".join(self.buf)); self.in_ld = False
    def handle_data(self, d):
        if self.in_a: self.txt.append(d)
        if self.in_ld: self.buf.append(d)

def classify(href):
    if href.startswith(("mailto:", "tel:", "#")): return None
    if href.startswith("/"): return ("rel_int", None)          # 相对内链（不计分，仅记录）
    m = re.match(r"https?://([^/]+)", href)
    if not m: return None
    host = m.group(1)
    if host == HOST or host.endswith("." + HOST.split(".", 1)[-1]):
        return ("abs_int", host) if HOST in host else ("abs_ext_same_site", host)
    return ("ext", host)

fails, report = [], []
inbound, in_main = Counter(), Counter()
data = {}
for r in ROUTES:
    p = P(); p.feed(get(BASE + r))
    abs_int, ext, auth, anchors = 0, [], [], []
    for href, text, is_main in p.links:
        c = classify(href)
        if not c: continue
        kind = c[0]
        if kind == "abs_int":
            abs_int += 1
            if is_main and text: anchors.append((href, text)); in_main[r] += 1
        elif kind in ("ext", "abs_ext_same_site"):
            ext.append(href)
            if any(a in c[1] for a in AUTHORITY): auth.append(href)
    types, ld_errors, article = [], 0, None
    for blk in p.ld:
        try:
            d = json.loads(blk)
            for node in (d if isinstance(d, list) else [d]):
                if not isinstance(node, dict): continue
                t = node.get("@type")
                types += t if isinstance(t, list) else ([t] if t else [])
                if t == "Article" or (isinstance(t, list) and "Article" in t):
                    article = node
        except Exception:
            ld_errors += 1
    for href, _ in anchors: inbound[re.sub(r"^https?://[^/]+", "", href).rstrip("/") or "/"] += 1
    data[r] = dict(abs_int=abs_int, ext=len(ext), auth=len(auth), anchors=len(anchors),
                   types=sorted(set(types)), ld_errors=ld_errors, article=article)
    if not (3 <= len(anchors) <= 5): fails.append(f"{r}: 正文内链 {len(anchors)} 条，应 3–5")
    if abs_int < 12: fails.append(f"{r}: 绝对同域内链 {abs_int} < 12")
    if len(ext) < 10: fails.append(f"{r}: 外链 {len(ext)} < 10")
    if len(auth) < 2: fails.append(f"{r}: 权威引用 {len(auth)} < 2")
    if ld_errors: fails.append(f"{r}: JSON-LD 解析失败 {ld_errors} 处")
    if r in ARTICLE_ROUTES:
        need = ["headline", "author", "datePublished", "dateModified", "image", "mainEntityOfPage"]
        if not article: fails.append(f"{r}: 缺 Article Schema")
        else:
            miss = [k for k in need if not article.get(k)]
            if miss: fails.append(f"{r}: Article 缺字段 {miss}")
            mip = (article.get("mainEntityOfPage") or {}).get("@id", "")
            if not mip.endswith(r): fails.append(f"{r}: mainEntityOfPage={mip} 未指向自身")
            img = article.get("image")
            img_url = img.get("url") if isinstance(img, dict) else img
            if not img_url or "trae.ai" in img_url: fails.append(f"{r}: Article.image 非法 → {img_url}")
for r in ROUTES:
    if r != "/" and inbound[r] < 2: fails.append(f"{r}: 正文入站内链 {inbound[r]} < 2")

print("route                          abs_int ext auth anchors types")
for r in ROUTES:
    d = data[r]
    print(f"{r:30} {d['abs_int']:7} {d['ext']:3} {d['auth']:4} {d['anchors']:7} {','.join(d['types'])}")
print()
if fails:
    print("❌ 未通过：")
    for f in fails: print("  -", f)
    sys.exit(1)
print("✅ 三项高优先级整改全部通过")
```

（脚本里 `import urllib.parse` 请补上；`HOST in host` 这一条就是复刻 `diagnose.py:428` 的判据。）

---

## 5. 禁止项（避免 Trae 跑偏）

1. 不要给首页/产品页/定价页/案例页/关于页声明 `Article`——语义错误，不是达标手段。
2. 不要把绝对内链写成不带 www 的 `https://flyai66.top/...`：会被判成外链，内链依旧 0。
3. 不要用 `next/link` 渲染这些内链（输出相对 href，指标不计）。
4. 不要删掉现有的 `FAQPage` / `BreadcrumbList`（页面级与组件级各一份的重复问题属另一个任务，本轮保留现状）。
5. 不要为了凑数链无关站点或低质站；外链必须与正文论述相关且真实可达。
6. 不要写没有来源的百分比/数据（引文用论文原文结论）。
7. 不要动 `lib/site.config.ts` 的 `url` 之外的字段（占位电话/地址/`sameAs` 属信任整改任务）。

## 6. 交付与回滚

- 一次提交只做一件事，建议 3 个 commit：
  `feat(geo): 正文上下文内链 + 页脚分类导航绝对 URL` / `fix(schema): Article 字段修正（url/image/dateModified）` / `feat(geo): 补充权威来源引用`
- 提交前：`npm run build`（Vercel 上 `ignoreBuildErrors=false`，本地被 TS 掩盖的错误会直接让线上部署失败）+ `npx tsc --noEmit`
- 提交前扫密钥形态（GitHub Push Protection 会拦）：`git diff --cached | grep -iE 'sk-|sk_live_|ghp_|AKIA|AIza|xoxb-|Bearer '`
- 回滚：三个 commit 独立，`git revert <sha>` 即可；无数据库/构建产物副作用
- 上线后跑 §4 脚本 + GEORank 诊断复跑同一 URL，附前/后对比
