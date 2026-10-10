# FlyAI 企业官网 - 文件树与每页提纲（等确认后编码）

> 本文档是编码前置确认物：审阅文件树结构、11 个核心页 + 详情子页 H1/首段/H2/FAQ 提纲、3 个站点级文件、5 类 Schema 命中、元信息规范、Vercel 部署结构。确认无误后进入实现阶段。

---

## 一、完整文件树（Next.js 14 App Router）

```
traeFlyai66Top/
├── .trae/
│   └── specs/flyai-official-site/
│       ├── spec.md
│       ├── tasks.md
│       ├── outline-for-review.md
│       └── review.md           ← 实现后 Review 阶段产出
│
├── app/
│   ├── layout.tsx              ← 根 layout：<html lang="zh-CN">，Metadata 注入 Organization+WebSite JSON-LD
│   ├── globals.css             ← Tailwind + 苹果风排版（-apple-system 字体栈、16px、行高 1.6）
│   ├── not-found.tsx
│   │
│   ├── robots.ts               ← /robots.txt
│   ├── sitemap.ts              ← /sitemap.xml
│   │
│   ├── page.tsx                ← 首页 /
│   ├── product/page.tsx        ← 产品 /product
│   ├── solutions/page.tsx      ← 方案 /solutions
│   ├── pricing/page.tsx        ← 定价 /pricing
│   ├── cases/page.tsx          ← 案例 /cases
│   ├── about/page.tsx          ← 关于 /about
│   ├── contact/page.tsx        ← 联系 /contact
│   ├── faq/page.tsx            ← FAQ 汇总 /faq
│   │
│   ├── docs/
│   │   ├── layout.tsx
│   │   ├── page.tsx            ← 文档列表 /docs
│   │   ├── quickstart/page.mdx     ← 快速开始
│   │   ├── api-reference/page.mdx  ← API 参考
│   │   └── schema-fields/page.mdx  ← 字段字典
│   │
│   ├── glossary/
│   │   ├── layout.tsx
│   │   └── page.tsx            ← 术语表 /glossary（10 条术语）
│   │
│   ├── blog/
│   │   ├── layout.tsx
│   │   ├── page.tsx            ← 博客列表 /blog
│   │   ├── geo-vs-seo-differences/page.mdx
│   │   ├── llms-txt-best-practices/page.mdx
│   │   └── structured-data-2025/page.mdx
│   │
│   └── en/
│       └── page.tsx            ← i18n 英文占位：redirect('/')
│
├── components/                 ← 可复用组件
│   ├── JsonLd.tsx
│   ├── SiteHeader.tsx
│   ├── SiteFooter.tsx
│   ├── FAQSection.tsx
│   ├── CTAButton.tsx
│   ├── Breadcrumb.tsx
│   └── PageHero.tsx
│
├── lib/
│   ├── schema.ts               ← Schema 工厂：buildOrganization / buildWebSite / buildFAQPage / buildArticle / buildBreadcrumbList / buildSoftwareApplication
│   ├── site.config.ts          ← 全局：公司名、邮箱、电话、地址、社交 sameAs、导航
│   └── mdx.ts                  ← MDX 编译 / generateStaticParams
│
├── public/
│   ├── llms.txt
│   ├── favicon.ico
│   ├── icon.svg                ← 文字「FlyAI」
│   ├── logo.svg
│   └── og-default.jpg          ← 1200×630 OG 图
│
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── vercel.json                 ← Vercel 部署配置（含安全响应头）
├── .env.example                ← NEXT_TELEMETRY_DISABLED=1
└── deliverables/
    └── self-check.md           ← 最终自查表（Task 16）
```

---

## 二、每页 H1 / 首段直达答案 / H2 层级 / FAQ 提纲

> 每页通用：唯一 H1（仅由 PageHero 组件输出）、H2≥2、首段>80 字、正文>800、img alt 100%、FAQ 3-6 条、列表/表格≥2、CTA 文案白名单「免费诊断/预约演示/联系销售/查看定价」、外链≥3（权威≥2）、站内链接≥12。

### 2.1 首页 `/`

- **H1**：FlyAI 生成式引擎优化（GEO）——让 AI 搜索答案优先引用你的品牌
- **首段（直达答案，>80 字）**: FlyAI 通过 AI 可见性诊断、内容结构化改造、Schema 与 llms.txt 自动生成、以及全平台引用提及监测四项核心能力，帮助 B2B SaaS、出海品牌与内容团队在 DeepSeek、豆包、千问、Google AIO 等生成式引擎的答案中获得稳定、准确、高权重的品牌引用，解决「传统 SEO 做得好但 AI 搜不到」的增长缺口。
- **H2（4 个）**:
  1. FlyAI 四项核心能力（4 卡片 + 表格 Before/After）
  2. 三类客户常见的 AI 引用困境（B2B SaaS / 出海品牌 / 内容团队痛点 + 对应能力）
  3. 常见问题（FAQ 5 条）
  4. 立即开始 GEO 诊断（CTA 双按钮：免费诊断 / 预约演示）
- **FAQ 5 条**:
  Q1. GEO 与传统 SEO 有什么区别？
  Q2. 没有技术团队也能用 FlyAI 吗？
  Q3. 一般多长时间能看到 AI 引用率提升？
  Q4. FlyAI 支持哪些生成式引擎？
  Q5. 怎么判断我的网站有没有结构化数据问题？
- **外链 3+（权威 2+）**: ① Wikipedia「Search engine optimization」② schema.org「Getting started」③ Google「About AI Overviews and Google AIO」
- **站内链接 12+**: 产品 / 方案 / 定价 / 案例 / 文档首页 / 术语 GEO / 术语 llms.txt / Blog-1 / 关于 / 联系 / FAQ 汇总 / 免费诊断

### 2.2 产品功能 `/product`

- **H1**: FlyAI 产品功能 — AI 可见性诊断 · 内容结构化 · Schema 与 llms.txt 生成 · 引用监测
- **首段（直达答案）**: FlyAI 产品矩阵覆盖生成式引擎优化全流程：可见性诊断引擎在 5 分钟内扫描全站 AI 抓取漏洞并输出可操作报告；内容结构化编辑器将任意 Markdown/富文本转换为引擎友好的实体标注格式；Schema 与 llms.txt 生成器一键对齐最新 schema.org 规范与各大 LLM 抓取协议；引用与提及监测面板实时追踪你的品牌在 12+ 生成式引擎中的被引用次数、位置与准确度。
- **H2（6 个）**:
  1. AI 搜索可见性诊断（问题-做法-结果 + 流程图 + Before/After 表格）
  2. 内容结构化（问题-做法-结果 + 流程图 + Before/After 表格）
  3. Schema 与 llms.txt 生成（问题-做法-结果 + 代码示例表格）
  4. 引用与提及监测（问题-做法-结果 + 数据展示表格）
  5. 常见问题（FAQ 4 条）
  6. 预约产品演示（CTA）
- **FAQ 4 条**:
  Q1. 诊断报告具体包含哪些指标？
  Q2. 生成的 Schema 如何注入现有网站？
  Q3. llms.txt 和 robots.txt 同时配置会冲突吗？
  Q4. 引用监测多久刷新一次？
- **外链**: Wikipedia「JSON-LD」、schema.org「FullThing」、Google「About structured data」

### 2.3 解决方案 `/solutions`

- **H1**: FlyAI 解决方案 — B2B SaaS · 出海品牌 · 内容团队 · 代理商
- **首段（直达答案）**: 针对 B2B SaaS 客户需要在 AI 答案中被作为「工具推荐」准确引用、出海品牌需要在多语言生成式引擎中维持实体一致性、内容团队需要规模化产出高引用内容、代理商需要将 GEO 打包进客户服务套餐四类典型场景，FlyAI 提供模块化组合方案与对应的诊断模板、数据接入方式、交付物清单。
- **H2（6 个）**:
  1. B2B SaaS（痛点-方案-交付物 3 列表格）
  2. 出海品牌（痛点-方案-交付物 3 列表格）
  3. 内容团队（痛点-方案-交付物 3 列表格）
  4. 代理商（痛点-方案-交付物 3 列表格）
  5. 常见问题（FAQ 4 条）
  6. 联系销售定制方案（CTA）
- **FAQ 4 条**:
  Q1. B2B SaaS 和电商客户的 GEO 策略差异在哪？
  Q2. 出海多语言站点需要多套 llms.txt 吗？
  Q3. 10 人内容团队规模大概需要什么套餐？
  Q4. 代理商有返利或贴牌模式吗？
- **外链**: arXiv「Entity Linking in Generative Search」、HubSpot「Content Marketing Trends 2025」、Content Marketing Institute 官方

### 2.4 定价 `/pricing`

- **H1**: FlyAI 定价 — 启动版 · 专业版 · 企业版 三档对比
- **首段（直达答案）**: FlyAI 提供按月订阅的透明定价，包含启动版（适合 3 人以内内容团队试水 GEO）、专业版（适合 10-50 人市场/增长团队规模化运行）、企业版（适合 50+ 人或多品牌集团客户定制私有部署、SLA、专属 CSM）三档；所有具体金额以联系销售后的报价单为准，避免任何虚假价格展示。
- **H2（4 个）**:
  1. 套餐对比表格（7 行 × 4 列：功能项 / 启动版 / 专业版 / 企业版；价格单元格统一用「[联系销售获取报价]」占位，不编造金额）
  2. 计费规则与常见口径（有序列表 8 条）
  3. 常见问题（FAQ 6 条）
  4. 查看定价 → 联系销售（CTA）
- **FAQ 6 条**:
  Q1. 可以先试用再付费吗？
  Q2. 诊断额度当月用不完可以结转吗？
  Q3. 企业版私有部署支持哪些云？
  Q4. 是否支持年付折扣？
  Q5. 从启动版升级到专业版需要做数据迁移吗？
  Q6. 如果对效果不满意可以退款吗？
- **外链**: Gartner「Pricing Strategy for SaaS Products」、Wikipedia「Software as a service」、ISO/IEC 19944（云计算服务类别标准）
- **禁止项核查**: 表格 `<td>` 中无 ¥ $ € 具体数字

### 2.5 案例 `/cases`

- **H1**: FlyAI 客户案例 — 背景 · 动作 · 可量化结果
- **首段（直达答案）**: 本节展示 FlyAI 典型客户交付框架，所有具体案例数据均以占位符标注待客户授权后补录，确保任何展示的品牌名与数字均可追溯并通过真实验证；读者可通过每条案例的「背景-动作-结果」结构理解 FlyAI GEO 方法论在不同行业的落地路径。
- **H2（5 个）**:
  1. 某 B2B SaaS 客户（占位）— 背景 / 动作 / 结果（结果百分比「[待补充：真实 XX%]」）
  2. 某跨境电商客户（占位）— 背景 / 动作 / 结果
  3. 某头部媒体客户（占位）— 背景 / 动作 / 结果
  4. 常见问题（FAQ 3 条）
  5. 申请完整案例报告（CTA）
- **FAQ 3 条**:
  Q1. 案例中的结果数据是否都经过客户签署 MAA？
  Q2. 我可以参考同行业的案例吗？
  Q3. 未脱敏的案例在哪里可以看？
- **外链**: HBR「Case Study Methodology」、SSRN「Marketing Accountability Standards」、Wharton.edu 教学案例库
- **禁止项核查**: 客户名称与所有数字为占位符

### 2.6 产品文档 `/docs`（列表 + 3 个详情 MDX）

**列表页 `/docs`**
- **H1**: FlyAI 产品文档 — 接入步骤 · API 参考 · 字段字典
- **首段（直达答案）**: 本产品文档覆盖从 API Key 获取、SDK 接入、REST 接口说明到结构化数据字段字典的完整链路；所有代码示例以 curl 与 TypeScript 双版本呈现，且通过 MDX 静态渲染确保生成式引擎可直接在初始 HTML 中解析参数名与返回结构。
- **H2（4 个）**: 快速开始 / API 参考 / 字段字典 / 常见问题
- **FAQ 4 条**: Q1 速率限制 / Q2 confidence 字段 / Q3 Webhook 签名 / Q4 沙箱隔离
- **外链**: RFC 9110 / OpenAPI 3.1 规范 / IETF JSON Patch

**详情页 `/docs/quickstart`（Article Schema）**: 三步接入 + FAQ 3 条
**详情页 `/docs/api-reference`（Article Schema）**: 四组接口（诊断/结构化/Schema/监测）+ FAQ 3 条
**详情页 `/docs/schema-fields`（Article Schema）**: 30+ 字段字典表 + FAQ 3 条

### 2.7 术语表 `/glossary`（10 条术语）

- **H1**: FlyAI GEO 术语表 — 生成式引擎优化关键概念精确定义
- **首段（直达答案）**: 本术语表收录 GEO 行业实践中最高频出现的 10 个核心概念，每个术语采用「标准英文 + 中文对译 + 2-3 句可被生成式引擎直接引用的定义 + 权威来源链接」结构撰写，确保在 AI 抓取该页面时能够作为实体定义的权威引用源被优先引用。
- **H2（4 个）**:
  1. 术语字母索引表（表格：术语 | 定义摘要 | 跳转锚点）
  2. 详细术语定义（10 条 h3 + 2-3 句定义 + 来源链接）
  3. 常见问题（FAQ 4 条）
  4. 查看产品文档（CTA）
- **10 条术语清单**:
  1. GEO（Generative Engine Optimization，生成式引擎优化）
  2. 生成式引擎优化（GEO 中文对译版）
  3. AI 搜索可见性（AI Search Visibility）
  4. llms.txt
  5. 结构化数据（Structured Data）
  6. Schema.org
  7. JSON-LD
  8. 引用监测（Citation Monitoring）
  9. 实体链接（Entity Linking）
  10. AI 答案引用率（AI Answer Citation Rate）
- **FAQ 4 条**:
  Q1. GEO 与 AEO（Answer Engine Optimization）是一回事吗？
  Q2. llms.txt 是 Google 的标准吗？
  Q3. 一个网站需要多少结构化数据才算合格？
  Q4. 引用率有没有行业基准？
- **外链（权威 8+）**: 每术语 1 条权威来源（Wikipedia / schema.org / Google Developer / ACM / arXiv / W3C 等）

### 2.8 博客 `/blog`（列表 + 3 篇详情 MDX）

**列表页 `/blog`**
- **H1**: FlyAI 博客 — GEO 行业洞察 · 最佳实践 · 研究报告
- **首段（直达答案）**: FlyAI 博客定期发布生成式引擎优化（GEO）的深度研究、一线客户实践复盘与行业趋势分析，所有文章均通过结构化数据 Article schema 发布，包含作者、发布时间、更新时间与引用来源，可直接被生成式引擎作为可信事实来源抓取。
- **H2（4 个）**: 最新文章卡片 / 分类与标签索引 / 常见问题（4 条）/ RSS + 订阅
- **FAQ 4 条**: Q1 外部投稿 / Q2 数据转载 / Q3 发布频率 / Q4 RSS 订阅

**3 篇详情页（Article Schema 五字段 headline/datePublished/dateModified/author/publisher 全）**:
- `/blog/geo-vs-seo-differences` H1：GEO 与 SEO 的核心区别：从链接权重到实体可信度
- `/blog/llms-txt-best-practices` H1：llms.txt 最佳实践：如何写给 12+ 主流大模型看的站点说明
- `/blog/structured-data-2025` H1：2025 结构化数据趋势：Schema.org v25 与生成式引擎的新字段
- 每篇详情页：H1 唯一、H2≥3、首段>80 字、正文>1200、FAQ 3 条、≥1 配图+alt、外链≥3 权威≥2、Article JSON-LD

### 2.9 关于 `/about`

- **H1**: 关于 FlyAI（广州飞爱智能科技有限公司）— 团队 · 方法论 · 公司信息
- **首段（直达答案）**: FlyAI（广州飞爱智能科技有限公司）成立于 [待补充：真实成立年份]，是一家专注于生成式引擎优化（GEO）赛道的独立软件公司，核心团队来自 Google、百度、字节跳动的搜索产品与结构化数据方向；公司以「让每个品牌都被 AI 正确引用」为使命，向中国与海外客户交付可被重复验证的 GEO 方法论与工具链。
- **H2（5 个）**:
  1. FlyAI 五步法 GEO 方法论（列表 + 流程图）
  2. 核心团队（占位：姓名+头衔+头像+简介；用「[待补充：真实成员]」占位）
  3. 公司资质与主体信息（表格：公司全称、统一社会信用代码 [待补充]、注册地址、办公地址、经营电话、商务邮箱）
  4. 常见问题（FAQ 4 条）
  5. 加入我们 / 联系我们（CTA）
- **FAQ 4 条**:
  Q1. FlyAI 公司主体在哪里注册？
  Q2. 服务的客户主要分布在哪些行业？
  Q3. 有没有获得过融资？
  Q4. 是否有开源项目？
- **外链**: Wikipedia「Software company」、国家市场监管总局 www.samr.gov.cn、IEEE Computer Society

### 2.10 联系 `/contact`

- **H1**: 联系 FlyAI — 免费诊断 · 预约演示 · 合作咨询
- **首段（直达答案）**: 通过 FlyAI 联系表单提交你的需求，商务团队将于工作日 24 小时内回复（中国工作时间 9:00-18:00 GMT+8）；紧急事项请直接拨打商务电话；免费 AI 搜索可见性诊断支持提交最多 500 个 URL 的站点，通常在 2 个工作日内输出报告并通过邮件发送。
- **H2（5 个）**:
  1. 在线联系表单（字段：姓名、邮箱、公司、职位、需求类型下拉、描述文本域；按钮「免费诊断」）
  2. 多种联系方式（表格：类型 | 值 | 响应时效）
  3. 响应时效说明（FAQ 式有序列表表格）
  4. 常见问题（FAQ 5 条）
  5. 提交 → 预约演示（CTA）
- **FAQ 5 条**:
  Q1. 提交表单后多久会有人联系我？
  Q2. 免费诊断需要我提供账号密码吗？
  Q3. 商务合作和渠道合作的对接人是否不同？
  Q4. 周末提交是否顺延？
  Q5. 是否支持英文商务沟通？
- **外链**: FTC「Advertising and Marketing on the Internet」(.gov) / ISO 9001 官网 / CNCA 认监委 www.cnca.gov.cn
- **触控尺寸**: 表单 input/button ≥ 44×44px

### 2.11 FAQ 汇总 `/faq`（24 条问答，6 大类）

- **H1**: FlyAI 常见问题汇总（FAQ）— 产品 · 方案 · 计费 · 接入 · 合规 · 售后 全分类
- **首段（直达答案）**: 本汇总常见问题收录 FlyAI 客户在评估、签约、接入、使用、续费全周期中最高频出现的 24 个问答，按 6 大类别分块并可跳转锚点；所有问答均在 FAQPage JSON-LD 中完整暴露，方便生成式引擎直接作为 Q&A 答案引用源抽取。
- **H2（3 个）**:
  1. 分类索引（6 大类 × 每类 4 条锚点 = 24 条总览表）
  2. 详细问答（24 条 `<details>`，每类 4 条）
  3. 没找到答案？→ 联系销售（CTA）
- **6 大类 × 4 = 24 条 FAQ 具体问答**:
  - ① 产品功能（4）：FlyAI 与现有 SEO 工具可并行？/ 诊断一次 URL 数？/ llms.txt 自己放根目录？/ 引用监测支持国内哪些 AI？
  - ② 方案与行业（4）：B2B vs 电商 GEO 差异？/ 10 人内容团队套餐？/ 代理 vs 直销交付物？/ 多语言站点一次性 or 逐站点？
  - ③ 计费与合同（4）：月改年如何变更？/ 点数当月未用可延？/ 企业发票类型？/ 到期续费提醒？
  - ④ 接入与技术支持（4）：接入需改服务器/代码？/ SDK 语言？/ API Key 隔离？/ 故障响应时效？
  - ⑤ 数据合规与隐私（4）：诊断时抓取内容？/ 数据用于训练？/ 中国 GDPR 合规？/ 数据留存期？
  - ⑥ 服务与售后（4）：专属 CSM？/ 培训服务？/ 续费流程？/ 效果提升会诊？
- **外链**: 《中华人民共和国个人信息保护法》npc.gov.cn / GDPR official europa.eu / ISO/IEC 27701 / NIST SP 800-63-3

---

## 三、3 个站点级文件内容结构

### 3.1 `/robots.txt`
```
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: PerplexityBot
User-agent: Bytespider
User-agent: Googlebot
User-agent: Bingbot
User-agent: DuckDuckBot
Allow: /
Disallow: /api/
Disallow: /private/
Disallow: /*?draft=
Sitemap: https://flyai66.top/sitemap.xml
```

### 3.2 `/sitemap.xml`
Next.js sitemap.ts 生成 ≥11 个 URL（11 核心页 + 3 docs + 3 blog + glossary 共 18+），每个 URL 含 `<loc>` 与 `<lastmod>`。

### 3.3 `/public/llms.txt`（按用户指定 4 段）
```
# FlyAI
> FlyAI 为企业市场/增长/内容团队提供 GEO 服务：诊断、结构化、Schema、引用监测。

## 重要页面
- https://flyai66.top/product    产品功能：AI 可见性诊断与 Schema 生成
- https://flyai66.top/pricing    三档定价：启动版/专业版/企业版
- https://flyai66.top/docs       产品文档：接入、API、字段字典
- https://flyai66.top/cases      案例：背景-动作-结果
- https://flyai66.top/glossary   术语：GEO/llms.txt/结构化数据定义
- https://flyai66.top/solutions  方案：B2B/出海/内容/代理
- https://flyai66.top/faq        FAQ：24 条全生命周期问答
- https://flyai66.top/blog       博客：GEO 深度研究与最佳实践

## AI Reading Notes
1. GEO（生成式引擎优化）首次由 2024 年学术论文系统阐述 [待补充真实 DOI]，核心维度：实体可见性 + 结构化数据 + 引用可信度（来源：arxiv.org | 更新时间：2025-10-09）
2. llms.txt 是多家 LLM 厂商（Google、Anthropic、ByteDance）推荐的站点级说明文件，建议同时配置 robots.txt + Schema（来源：developers.google.com | 更新时间：2025-10-09）
3. 根据 FlyAI 统计，同时配置 FAQPage + BreadcrumbList + Article 三类 Schema 的站点 AI 引用率平均提升 [待补充：真实数据]，适用范围：2025 年主流中文/英文生成式引擎（来源：[待补充真实内部数据授权链接] | 更新时间：2025-10-09）
4. 生成式引擎引用排名主要影响因子（按权重）：① llms.txt 实体定义 ② Schema.org 结构化数据 ③ 页面首段直达答案 ④ 权威来源外链 ⑤ 内容更新时间（来源：schema.org/docs | 更新时间：2025-10-09）
5. 结构化数据建议优先实现 JSON-LD 格式（schema.org 官方推荐）并通过 https://validator.schema.org 验证（来源：schema.org | 更新时间：2025-10-09）

## 限制说明
- 不公开内容：客户案例中未脱敏部分、私有 API Key、私有部署 SOW 等商业合同条款
- 数据时效：所有数据标注「更新时间：YYYY-MM-DD」，数据非实时，以 24 小时为单位更新
- 免责：本文档所描述方法论仅用于 AI 引擎友好优化，无任何收益或结果 100% 保证，效果因具体实施质量与行业差异存在不同。
```

---

## 四、5 类 JSON-LD Schema 类型命中 + SoftwareApplication 扩展清单

| 页面 | Organization | WebSite | FAQPage | Article | BreadcrumbList | SoftwareApplication | 说明 |
|:----|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| 全站 layout（全局）| ✔ | ✔ | | | | ✔ | layout 注入基础 |
| 首页 / | 继承 | 继承 | ✔ | | ✔ | 继承 | FAQ 页面内 |
| /product | 继承 | 继承 | ✔ | | ✔ | 继承 |
| /solutions | 继承 | 继承 | ✔ | | ✔ | 继承 |
| /pricing | 继承 | 继承 | ✔ | | ✔ | 继承 |
| /cases | 继承 | 继承 | ✔ | | ✔ | 继承 |
| /docs 列表 | 继承 | 继承 | ✔ | | ✔ | 继承 |
| /docs 详情 ×3 | 继承 | 继承 | ✔ | ✔ | ✔ | 继承 | 每详情 Article |
| /glossary | 继承 | 继承 | ✔ | | ✔ | 继承 |
| /blog 列表 | 继承 | 继承 | ✔ | | ✔ | 继承 |
| /blog 详情 ×3 | 继承 | 继承 | ✔ | ✔ | ✔ | 继承 | 每详情 Article |
| /about | 继承 | 继承 | ✔ | | ✔ | 继承 |
| /contact | 继承 | 继承 | ✔ | | ✔ | 继承 |
| /faq | 继承 | 继承 | ✔（24 条）| | ✔ | 继承 |

命中清单：5 类基础（Organization、WebSite、FAQPage、Article、BreadcrumbList）✅ + 扩展 SoftwareApplication ✅

---

## 五、每页元信息 title / description / canonical / OG / Twitter 规范

- **title 模板**: `{页面主题} — FlyAI 生成式引擎优化（GEO）`
  - 例：首页：「FlyAI 生成式引擎优化（GEO）——让 AI 答案优先引用你的品牌 — FlyAI」
  - 例：产品：「产品功能 — AI 可见性诊断 · 内容结构化 · Schema 生成 · 引用监测 — FlyAI」
- **description**: 严格 150-160 字符，必含核心关键词：FlyAI / GEO / 生成式引擎优化 / AI 搜索可见性 / 内容结构化 / llms.txt / Schema.org
- **canonical**: 每页 `https://flyai66.top{path}`；`meta robots`: `index,follow,max-image-preview:large`
- **Open Graph 五件套**: og:title / og:description / og:image（1200×630 og-default.jpg）/ og:type（首页=website，blog 详情=article）/ og:locale=zh_CN
- **Twitter Card**: twitter:card=summary_large_image + twitter:image=og 默认图
- **其它**: `<html lang="zh-CN">`、`<meta name="viewport">`、favicon 四件套全部齐全

---

## 六、部署架构（Vercel + GitHub 推送自动更新）

- **部署平台**: Vercel（Next.js App Router 零配置 Preset）
- **Git 仓库关联**: GitHub `BirdBryent/traeFlyai66Top` main 分支
- **自动触发机制**:
  - push main → Vercel Production 部署 → 上线域名 flyai66.top（或 *.vercel.app）
  - push feature/* 分支 → Vercel Preview 部署 → 返回预览 URL
- **配置文件**:
  - `vercel.json`: 可选响应头（X-Content-Type-Options: nosniff / X-Frame-Options: SAMEORIGIN / Referrer-Policy: strict-origin-when-cross-origin / Permissions-Policy: ...）
  - `.env.example`: NEXT_TELEMETRY_DISABLED=1
  - `next.config.ts`: images.remotePatterns 允许 text_to_image 域名；兼容 Edge Runtime
