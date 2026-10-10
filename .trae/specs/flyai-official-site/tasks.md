# FlyAI 企业官网 - 实现计划 (tasks.md)

本实现计划严格按照 spec.md 的 AC 分解。每个任务标注关联 AC 与本地 TR（rule/rubric）。

---

## Phase 1: 项目骨架与基础设施

### Task 1: 初始化 Next.js 14 App Router 项目 + TailwindCSS + TypeScript
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - 安装 `next@14 react react-dom typescript @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer`
  - 配置 `next.config.ts`（启用 MDX 支持、images 允许 text_to_image 域名、output 可选）
  - 初始化 `app/` 目录，创建 `layout.tsx`（含 html lang=zh-CN、favicon 占位）、`globals.css`（Tailwind 引入 + 苹果风基础排版：-apple-system 字体栈、16px base、行高 1.6）
  - 创建 `app/[lang]/` 中间结构，中文默认根路径，`/en/*` 预留（重定向或空内容）
  - 配置 `tsconfig.json` 开启 strict: true，paths 别名 @/
- **Acceptance Criteria Addressed**: AC-1（SSG 基础）, AC-8（性能基础）, AC-9（i18n 结构）
- **Test Requirements**:
  - `rule` TR-1.1: `npm run build` 成功退出码 0；生成 .next 目录
  - `rule` TR-1.2: curl 根路径首 HTML 含 `<!doctype html><html lang="zh-CN">` 无控制台错误
  - `rule` TR-1.3: 375px 视口 body 无横向溢出（`window.scrollMaxX === 0`）
- **Notes**: 依赖安装后务必验证 `next info` 输出正常

### Task 2: 构建通用可复用组件层（JsonLd / Layout / FAQ / CTA / Breadcrumb / PageHero）
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - `components/JsonLd.tsx`: 接收 `data: Record<string, any> | Record<string, any>[]`，输出单/多段 `<script type="application/ld+json">`（JSON.stringify 保证合法）
  - `components/SiteHeader.tsx` + `components/SiteFooter.tsx`: Header 带 Logo + 9 项导航（首页/产品/方案/定价/案例/文档/术语/博客/关于 + 联系 CTA）；Footer 含公司全称、地址、邮箱、电话、4 条社交 sameAs 链接、底部导航矩阵（按 4 列：产品 / 资源 / 公司 / 法律）
  - `components/FAQSection.tsx`: props: `title="常见问题" items: {q:string,a:string}[]` → 渲染 `<h2>常见问题</h2>` + `<details>` 列表 3-6 条；同时输出 FAQPage JSON-LD（通过 JsonLd 组件）
  - `components/CTAButton.tsx`: 限定文案白名单「免费诊断 / 预约演示 / 联系销售 / 查看定价」，尺寸 ≥ 44×44px
  - `components/Breadcrumb.tsx`: props `items: {label:string,href?:string}[]` → 渲染 `<nav aria-label="面包屑">` + `<ol>`；同时输出 BreadcrumbList JSON-LD
  - `components/PageHero.tsx`: props `h1 / lead（首段>80字）/ ctaText / ctaHref / bgImage` → 语义化 `<header>` + `<h1>` + `<p class="lead">`，保证全局唯一 H1 由该组件输出（其他页面禁用 H1）
  - `lib/schema.ts`: 封装生成 5 类 Schema 的工厂函数（buildOrganization, buildWebSite, buildFAQPage, buildArticle, buildBreadcrumbList, buildSoftwareApplication）
- **Acceptance Criteria Addressed**: AC-2（H1 唯一性、FAQ 结构）, AC-3（JsonLd 组件与 5 类 Schema）, AC-8（触控尺寸）
- **Test Requirements**:
  - `rule` TR-2.1: JsonLd 组件传 5 种数据后，页面 `<script>` 中 JSON.parse 均不抛异常
  - `rule` TR-2.2: 全站只用 PageHero 输出 H1，grep 源码其他组件 `<h1` 0 命中
  - `rule` TR-2.3: FAQSection 至少渲染 1 个 h2「常见问题」+ 3 条 `<details>`
  - `rule` TR-2.4: CTAButton 的 children 白名单正则匹配不通过时抛类型错误或 console.warn
  - `rule` TR-2.5: SiteFooter 文本包含「广州飞爱智能科技有限公司」+ 邮箱 + 电话 + 4 条社交链接
- **Notes**: Schema 工厂函数字段严格对齐 spec.md FR-4 要求

### Task 3: 站点级文件（robots.txt / sitemap.xml / llms.txt / Favicon / OG 图）
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - `app/robots.ts`: Next.js 原生，allow GPTBot/ClaudeBot/PerplexityBot/Bytespider/Googlebot/Bingbot/DuckDuckBot，disallow /api /private /*?draft=，Sitemap: https://flyai66.top/sitemap.xml
  - `app/sitemap.ts`: 基于静态路由数组 + MDX 列表（blog/docs/glossary），输出 lastmod 用当前日期
  - `public/llms.txt`: 严格按用户给定结构手写 4 段：# FlyAI 摘要（≤40字）/ ## 重要页面（产品/定价/文档/案例 8 条 URL+说明）/ ## AI Reading Notes（3-5 条事实，如「GEO 概念首次发表年份 [来源：待补充]」）/ ## 限制说明（不公开内容、数据时效、免责）
  - 生成占位图：`public/logo.svg`（文字 Logo「FlyAI」），OG 图用 text_to_image 生成「FlyAI 企业官网主视觉 蓝紫色科技感渐变 白色标题」尺寸 1200×630 存 `public/og-default.jpg`；Favicon 用文字 SVG `public/favicon.ico` 与 `public/icon.svg`
- **Acceptance Criteria Addressed**: AC-7, AC-4（favicon/OG）
- **Test Requirements**:
  - `rule` TR-3.1: `/robots.txt` 200，内容含 `Allow: /GPTBot` 与 `Sitemap:`
  - `rule` TR-3.2: `/sitemap.xml` 200，XPath `count(//url)` ≥ 11，每个含 `<loc>` 与 `<lastmod>`
  - `rule` TR-3.3: `/llms.txt` 200，含 4 个指定段落标题（# FlyAI / ## 重要页面 / ## AI Reading Notes / ## 限制说明）
  - `rule` TR-3.4: og-default.jpg 存在且尺寸为 1200×630
- **Notes**: llms.txt 中 3-5 条 AI Reading Notes 可引用公开发表的 GEO/SEO 标准文档作为外链

---

## Phase 2: 首页 MVP + Vercel 部署自动更新打通

> **Phase 2 目标（用户指定）**: 先完成 Task 4 首页 + Task 17 Vercel 部署与 Git 自动推送更新，尽早看到可访问的线上效果。其余 10 个内容页面 + 验证 + 自查表归入 Phase 3。

### Task 4: 首页 `/` page.tsx
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2, Task 3
- **H1 提纲**: FlyAI 生成式引擎优化（GEO）——让 AI 搜索答案优先引用你的品牌
- **首段提纲（>80 字直达答案）**: FlyAI 通过 AI 可见性诊断、内容结构化改造、Schema 与 llms.txt 自动生成、以及全平台引用提及监测四项核心能力，帮助 B2B SaaS、出海品牌与内容团队在 DeepSeek、豆包、千问、Google AIO 等生成式引擎的答案中获得稳定、准确、高权重的品牌引用，解决「传统 SEO 做得好但 AI 搜不到」的增长缺口。
- **结构（≥2 H2）**: H2-1「FlyAI 四项核心能力」(4 卡片)；H2-2「三类客户常见的 AI 引用困境」(3 痛点 + 对应能力)；H2-3「常见问题」(FAQ)；H2-4「立即开始 GEO 诊断」(CTA 区块)
- **FAQ 提纲（5 条）**: Q1: GEO 与传统 SEO 有什么区别？/ Q2: 没有技术团队也能用 FlyAI 吗？/ Q3: 一般多长时间能看到 AI 引用率提升？/ Q4: FlyAI 支持哪些生成式引擎？/ Q5: 怎么判断我的网站有没有结构化数据问题？
- **外链需求**: 至少 3 条（2 条权威）→ 1. Wikipedia「Search engine optimization」；2. schema.org 官方「Getting started」；3. Google AIO 官方介绍页
- **站内链接需求**: 产品页/方案页/定价页/案例页/文档首页/术语 GEO/术语 llms.txt/Blog-1/关于/联系/FAQ汇总/免费诊断 → ≥12
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Test Requirements**:
  - `rule` TR-4.1: DOM 中 `querySelectorAll('h1').length === 1`
  - `rule` TR-4.2: `querySelectorAll('h2').length >= 4`
  - `rule` TR-4.3: 首段 `.lead` textContent length > 80
  - `rule` TR-4.4: 正文纯文本去空白字符 > 1200
  - `rule` TR-4.5: 所有 img alt 非空字符串（覆盖率 100%）
  - `rule` TR-4.6: FAQ 区块 `<details>` 元素数 ∈ [3,6]
  - `rule` TR-4.7: 页面中 `<ul> / <ol> / <table>` 合计 ≥ 2
  - `rule` TR-4.8: CTA 文案白名单命中率 100%
  - `rule` TR-4.9: metadata.title 含「FlyAI」且唯一；description length ∈ [150,160]
  - `rule` TR-4.10: JSON-LD 含 Organization + WebSite + FAQPage + BreadcrumbList；JSON.parse 通过
  - `rule` TR-4.11: 外链 ≥3 且权威（域名匹配白名单）≥ 2；站内链接 ≥12
- **Notes**: 首屏使用一张大 Hero 图（text_to_image 生成），另加 2 张能力图标

### Task 17: 部署到 Vercel 并打通 Git 推送自动更新（在 Phase 2 先做首次 MVP 部署，Phase3 完成后验证最终版）
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 4（首页 MVP 完成即可首次部署；Phase 3 Task 16 完成后执行最终 push 验证）
- **Description**:
  - 创建 `vercel.json`（零配置兼容 Next.js，可选加安全响应头 X-Content-Type-Options / X-Frame-Options / Referrer-Policy / Permissions-Policy）
  - 创建 `.env.example`：NEXT_TELEMETRY_DISABLED=1
  - `next.config.ts` images.remotePatterns 允许 text_to_image 域名；确保不使用仅 Node.js Runtime 的 API（兼容 Vercel Edge）
  - **首次部署（Phase 2 末尾）**: push main → 关联 GitHub 仓库 BirdBryent/traeFlyai66Top 到 Vercel → Next.js Preset → 触发首次 Production deploy → 得到线上 URL（*.vercel.app 或绑定 flyai66.top）
  - **Preview 验证**: 从 feature/phase2-mvp 分支 push → Vercel 返回 Preview URL 并 200 OK
  - **最终部署验证（Phase 3 末尾）**: 全部页面完成 + 自查表 PASS → 再 push main → Vercel 自动 deploy → 检查线上 H1 与本地一致
  - 绑定自定义域名 flyai66.top（若 DNS 已就绪；否则使用 Vercel 子域名，DNS 就绪后再切）
- **Acceptance Criteria Addressed**: AC-10
- **Test Requirements**:
  - `rule` TR-17.1 Phase2(首): `next build` 本地 + Vercel build exit 0；无 ERROR 日志
  - `rule` TR-17.2 Phase2(首): push main → Vercel Production deploy 成功，线上 URL 200
  - `rule` TR-17.3 Phase2(首): feature 分支 push → Preview URL 200 可访问
  - `rule` TR-17.4 Phase4(终): 最终 push 后线上首页 H1 与本地最新提交一致
- **Notes**: 本任务按两个时间点验收：Phase 2 结束先过 TR-17.1/2/3；Phase 4 结束补过 TR-17.4

---

## Phase 3: 其余 10 个内容页面（产品/方案/定价/案例/文档/术语/博客/关于/联系/汇总FAQ）Task 5-14

**通用 Page Template（所有 Phase 3 内容页复用）**：每个页面文件 `app/<route>/page.tsx` 由以下部分组成：
1. `export const metadata: Metadata`（title、description、canonical、openGraph 5 件、twitter card、robots）
2. `<JsonLd data={[... Organization(全量) + WebSite + BreadcrumbList + FAQPage + 页面特有 ...]} />`
3. `<Breadcrumb items=[{label:'首页',href:'/'},...,{label:页面名}] />`
4. `<PageHero h1=... lead=... ctaText=... ctaHref=... />` （确保 H1 唯一）
5. 能力/方案/文档正文（≥2 个 H2，若干 H3，列表/表格 ≥ 2）
6. 外链 ≥3 条（权威 ≥2），站内链接 ≥12
7. `<FAQSection items=3..6 />`
8. 关键事实后标注「来源：[URL] | 更新时间：YYYY-MM-DD」

### Task 5: 产品功能 `/product`
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 4
- **H1 提纲**: FlyAI 产品功能 — AI 可见性诊断 · 内容结构化 · Schema 与 llms.txt 生成 · 引用监测
- **首段提纲（>80 字）**: FlyAI 产品矩阵覆盖生成式引擎优化全流程：可见性诊断引擎在 5 分钟内扫描全站 AI 抓取漏洞并输出可操作报告；内容结构化编辑器将任意 Markdown/富文本转换为引擎友好的实体标注格式；Schema 与 llms.txt 生成器一键对齐最新 schema.org 规范与各大 LLM 抓取协议；引用与提及监测面板实时追踪你的品牌在 12+ 生成式引擎中的被引用次数、位置与准确度。
- **结构**: H2-1「AI 搜索可见性诊断（问题-做法-结果）」；H2-2「内容结构化（问题-做法-结果）」；H2-3「Schema 与 llms.txt 生成（问题-做法-结果）」；H2-4「引用与提及监测（问题-做法-结果）」；H2-5「常见问题」；H2-6「预约产品演示」
- **FAQ 提纲（4 条）**: Q1: 诊断报告包含哪些具体指标？/ Q2: 生成的 Schema 如何注入现有网站？/ Q3: llms.txt 和 robots.txt 同时配置会冲突吗？/ Q4: 引用监测多久刷新一次？
- **外链**: Wikipedia「JSON-LD」/ schema.org「FullThing」/ Google「About structured data」/ W3C「WebSite schema」任选 3 条
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-4, AC-5
- **Test Requirements**:
  - `rule` TR-5.1 ~ TR-5.11: 与 Task 4 的 11 项结构与 Schema 检查同口径
  - `rule` TR-5.12: 4 项功能均包含「问题」「做法」「结果」三个 H3 小标题
- **Notes**: 每个功能配一张流程图（text_to_image 生成）+ 表格（对比「Before / After」）

### Task 6: 解决方案 `/solutions`
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 5
- **H1 提纲**: FlyAI 解决方案 — B2B SaaS · 出海品牌 · 内容团队 · 代理商
- **首段提纲（>80 字）**: 针对 B2B SaaS 客户需要在 AI 答案中被作为「工具推荐」准确引用、出海品牌需要在多语言生成式引擎中维持实体一致性、内容团队需要规模化产出高引用内容、代理商需要将 GEO 打包进客户服务套餐四类典型场景，FlyAI 提供模块化组合方案与对应的诊断模板、数据接入方式、交付物清单。
- **结构**: H2-1「B2B SaaS（痛点-方案-交付物）」；H2-2「出海品牌」；H2-3「内容团队」；H2-4「代理商」；H2-5「常见问题」；H2-6「联系销售定制方案」
- **FAQ（4 条）**: Q1: B2B SaaS 和 eCom 客户的 GEO 策略差异在哪？/ Q2: 出海多语言站点需要多套 llms.txt 吗？/ Q3: 内容团队 10 人规模大概需要什么套餐？/ Q4: 代理商有返利或贴牌模式吗？
- **外链**: 任选 arXiv 一篇 GEO/Entity 相关论文、HubSpot 「Content Marketing Trends 2025」、Content Marketing Institute 官方
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-4, AC-5
- **Test Requirements**: 同 TR-5.1~5.11；额外 rule：4 个方案卡片均含痛点、方案、交付物三个小节

### Task 7: 定价 `/pricing`
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 6
- **H1 提纲**: FlyAI 定价 — 启动版 · 专业版 · 企业版 三档对比
- **首段提纲（>80 字）**: FlyAI 提供按月订阅的透明定价，包含启动版（适合 3 人以内内容团队试水 GEO）、专业版（适合 10-50 人市场/增长团队规模化运行）、企业版（适合 50+ 人或多品牌集团客户定制私有部署、SLA、专属 CSM）三档；所有数据指标仅示意，实际合同以联系销售后的报价单为准，避免任何虚假价格展示。
- **结构**: H2-1「套餐对比表格（7 行 × 4 列）」；H2-2「计费规则与常见口径」；H2-3「常见问题」；H2-4「查看定价 → 联系销售」
- **FAQ（6 条）**: Q1: 可以先试用再付费吗？/ Q2: 诊断额度当月用不完可以结转吗？/ Q3: 企业版的私有部署支持哪些云？/ Q4: 是否支持年付折扣？/ Q5: 从启动版升级到专业版需要做数据迁移吗？/ Q6: 如果对效果不满意可以退款吗？
- **外链**: 引用 Gartner「Pricing Strategy for SaaS」、维基百科「Software as a service」、ISO/IEC 19944（云计算服务类别标准）任选 3
- **特殊要求**: 表格内价格数字全部用「[联系销售获取报价]」占位，不编造具体金额
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-4, AC-5, AC-9（不编造价格）
- **Test Requirements**: 同 TR-5.1~5.11；额外 rule: grep 任何 `<td>` 中无具体货币数值（¥ $ €），仅含占位文本

### Task 8: 案例 `/cases`
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 7
- **H1 提纲**: FlyAI 客户案例 — 背景 · 动作 · 可量化结果
- **首段提纲（>80 字）**: 本节展示 FlyAI 典型客户交付框架，所有具体案例数据均以占位符标注待客户授权后补录，确保任何展示的品牌名与数字均可追溯并通过真实验证；读者可通过每条案例的「背景-动作-结果」结构理解 FlyAI GEO 方法论在不同行业的落地路径。
- **结构**: H2-1「某 B2B SaaS 客户（占位案例）」含背景 / 动作 / 结果（结果所有百分比用「[待补充：真实 XX%]」）；H2-2「某跨境电商客户（占位案例）」；H2-3「某头部媒体客户（占位案例）」；H2-4「常见问题」；H2-5「申请完整案例报告」
- **FAQ（3 条）**: Q1: 案例中的结果数据是否都经过客户签署的 MAA？/ Q2: 我可以参考同行业的案例吗？/ Q3: 未脱敏的案例在哪里可以看？
- **外链**: HBR「Case Study Methodology」、SSRN「Marketing Accountability」、任选 1 条 .edu 案例教学资源
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-4, AC-5, AC-9（不编造客户名与数据）
- **Test Requirements**: 同 TR-5.1~5.11；额外 rule: 客户名称均含「[待补充：真实客户名]」、所有具体百分比 / 金额 / ARR 数字均为占位符格式

### Task 9: 产品文档 `/docs`（列表 + 详情页，MDX）
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 2
- **H1（列表页）提纲**: FlyAI 产品文档 — 接入步骤 · API 参考 · 字段字典
- **首段提纲（列表页）**: 本产品文档覆盖从 API Key 获取、SDK 接入、REST 接口说明到结构化数据字段字典的完整链路；所有代码示例以 curl 与 TypeScript 双版本呈现，且通过 MDX 静态渲染确保生成式引擎可直接在初始 HTML 中解析参数名与返回结构。
- **结构（列表页）**: H2-1「快速开始（3 步）」；H2-2「API 参考（诊断 / 结构化 / Schema / 监测 四组接口）」；H2-3「字段字典（30+ Schema 字段解释表）」；H2-4「常见问题」
- **FAQ（4 条）**: Q1: API 速率限制是多少？/ Q2: 返回字段中的 confidence 分数字段含义？/ Q3: Webhook 签名算法？/ Q4: 沙箱环境和生产环境是否隔离？
- **外链**: RFC 9110（HTTP 语义）/ OpenAPI 3.1 规范 / IETF JSON Patch / IEEE Std 754 任选 3
- **详情页路由**: `/docs/quickstart`、`/docs/api-reference`、`/docs/schema-fields`，全部用 MDX 撰写，页面级加 BreadcrumbList + Article（文档视为 Article）
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3（Article）, AC-4, AC-5, AC-7（sitemap）
- **Test Requirements**:
  - `rule` TR-9.1: 3 个详情 MDX 页 SSG 成功，首 HTML 可 grep 到代码块中 `curl` 关键字
  - `rule` TR-9.2: 详情页 JSON-LD 包含 Article 类型，且 headline/datePublished/author/publisher 齐全
  - 其余同标准 8 项结构检查

### Task 10: 术语表 `/glossary`（MDX）
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 2
- **H1 提纲**: FlyAI GEO 术语表 — 生成式引擎优化关键概念精确定义
- **首段提纲（>80 字）**: 本术语表收录 GEO 行业实践中最高频出现的 10 个核心概念，每个术语采用「标准英文 + 中文对译 + 2-3 句可被生成式引擎直接引用的定义 + 权威来源链接」结构撰写，确保在 AI 抓取该页面时能够作为实体定义的权威引用源被优先引用。
- **术语清单（10 条，每术语 2-3 句可引用定义）**:
  1. GEO（Generative Engine Optimization，生成式引擎优化）
  2. 生成式引擎优化（与 GEO 同义，面向中文用户的解释版本）
  3. AI 搜索可见性（AI Search Visibility）
  4. llms.txt
  5. 结构化数据（Structured Data）
  6. Schema.org
  7. JSON-LD
  8. 引用监测（Citation Monitoring）
  9. 实体链接（Entity Linking）
  10. AI 答案引用率（AI Answer Citation Rate）
- **结构**: H2-1「术语按字母索引 A-Z」(表格：术语 | 定义摘要 | 跳转锚点)；H2-2「详细术语定义（10 条）」；H2-3「常见问题」；H2-4「查看产品文档」
- **FAQ（4 条）**: Q1: GEO 和 AEO（Answer Engine Optimization）是一回事吗？/ Q2: llms.txt 是 Google 的标准吗？/ Q3: 一个网站需要多少结构化数据才算合格？/ Q4: 引用率有没有行业基准？
- **外链**: 每条术语至少 1 个权威来源（Wikipedia / schema.org / Google Developer / ACM / arXiv / W3C），合计外链 ≥ 10，权威 ≥ 8
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-4, AC-5
- **Test Requirements**: 同结构 8 项；额外 rule: 10 条术语全部存在独立定义块（含 h3 锚点 + 2 句正文 + 来源链接）

### Task 11: 博客 `/blog`（列表 + 详情页 3 篇示例，MDX）
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 2
- **列表页 H1 提纲**: FlyAI 博客 — GEO 行业洞察 · 最佳实践 · 研究报告
- **首段提纲（列表页）**: FlyAI 博客定期发布生成式引擎优化（GEO）的深度研究、一线客户实践复盘与行业趋势分析，所有文章均通过结构化数据 Article schema 发布，包含作者、发布时间、更新时间与引用来源，可直接被生成式引擎作为可信事实来源抓取。
- **示例文章 3 篇（详情页路由）**:
  - `/blog/geo-vs-seo-differences` H1: GEO 与 SEO 的核心区别：从链接权重到实体可信度
  - `/blog/llms-txt-best-practices` H1: llms.txt 最佳实践：如何写给 12+ 主流大模型看的站点说明
  - `/blog/structured-data-2025` H1: 2025 结构化数据趋势：Schema.org v25 与生成式引擎的新字段
- **每篇详情内容**: H1 唯一；H2≥3；首段>80 字；正文>1200；FAQ 3 条；至少 1 张配图+alt；外链 ≥3 权威 ≥2；JSON-LD Article（headline/datePublished/dateModified/author/publisher）+ BreadcrumbList + FAQPage
- **FAQ（列表页 4 条）**: Q1: 是否接受外部作者投稿？/ Q2: 文章中的研究数据是否可以转载？/ Q3: 多久发布一次新文章？/ Q4: 有没有 RSS 订阅？
- **外链**: 3 篇详情页引用 arXiv、Nature、ACM、Google Research 等不同来源
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3（Article）, AC-4, AC-5, AC-9
- **Test Requirements**: 同结构 8 项；额外 rule: 3 个详情页 JSON-LD 均含 Article 且 5 个必填字段齐全

### Task 12: 关于我们 `/about`
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 7
- **H1 提纲**: 关于 FlyAI（广州飞爱智能科技有限公司）— 团队 · 方法论 · 公司信息
- **首段提纲（>80 字）**: FlyAI（广州飞爱智能科技有限公司）成立于 [待补充：真实成立年份]，是一家专注于生成式引擎优化（GEO）赛道的独立软件公司，核心团队来自 Google、百度、字节跳动的搜索产品与结构化数据方向；公司以「让每个品牌都被 AI 正确引用」为使命，向中国与海外客户交付可被重复验证的 GEO 方法论与工具链。
- **结构**: H2-1「FlyAI 五步法 GEO 方法论」；H2-2「核心团队（占位：姓名+头衔+头像+简介）」；H2-3「公司资质与主体信息」（含公司全称、统一社会信用代码「[待补充]」、注册地址、办公地址、经营电话、商务邮箱）；H2-4「常见问题」；H2-5「加入我们 / 联系我们」
- **FAQ（4 条）**: Q1: FlyAI 公司主体在哪里注册？/ Q2: 服务的客户主要分布在哪些行业？/ Q3: 有没有获得过融资？/ Q4: 是否有开源项目？
- **外链**: 引用 Wikipedia「Software company」、国家市场监督管理总局（.gov 域名：http://www.samr.gov.cn/）、IEEE Computer Society
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-4, AC-5, AC-9（不编造资质与成立年份）
- **Test Requirements**: 同结构 8 项；额外 rule: 涉及年份 / 信用代码 / 融资金额 / 客户数量的字段均为占位符

### Task 13: 联系我们 `/contact`
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 7
- **H1 提纲**: 联系 FlyAI — 免费诊断 · 预约演示 · 合作咨询
- **首段提纲（>80 字）**: 通过 FlyAI 联系表单提交你的需求，商务团队将于工作日 24 小时内回复（中国工作时间 9:00-18:00 GMT+8）；紧急事项请直接拨打商务电话；免费 AI 搜索可见性诊断支持提交最多 500 个 URL 的站点，通常在 2 个工作日内输出报告并通过邮件发送。
- **结构**: H2-1「在线联系表单（6 字段：姓名、邮箱、公司、职位、需求类型<下拉>、描述<文本域>、提交按钮=「免费诊断」）」；H2-2「多种联系方式（表格：类型 | 值 | 响应时效）」；H2-3「响应时效说明（FAQ 式表格）」；H2-4「常见问题」；H2-5「提交 → 预约演示 CTA」
- **FAQ（5 条）**: Q1: 提交表单后多久会有人联系我？/ Q2: 免费诊断需要我提供账号密码吗？/ Q3: 商务合作和渠道合作的对接人是否不同？/ Q4: 周末提交是否顺延？/ Q5: 是否支持英文商务沟通？
- **外链**: 引用 FTC「Advertising and Marketing」(.gov)、ISO 9001 官网、CNCA（中国国家认证认可监督管理委员会 .gov）
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-4, AC-5, AC-8（触控目标≥44px）
- **Test Requirements**: 同结构 8 项；额外 rule: 表单 input/button 元素触控尺寸 ≥ 44×44；所有表单控件均有 label（aria-label）

### Task 14: 汇总 FAQ `/faq`（20+ 问答，分类）
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 7
- **H1 提纲**: FlyAI 常见问题汇总（FAQ）— 产品 · 方案 · 计费 · 接入 · 合规 全分类
- **首段提纲（>80 字）**: 本汇总常见问题收录 FlyAI 客户在评估、签约、接入、使用、续费全周期中最高频出现的 24 个问答，按 6 大类别分块并可跳转锚点；所有问答均在 FAQPage JSON-LD 中完整暴露，方便生成式引擎直接作为 Q&A 答案引用源抽取。
- **结构**: H2-1「分类索引（6 类 × 每类 4 条 = 24 条总数；分类：产品功能 / 方案与行业 / 计费与合同 / 接入与技术支持 / 数据合规与隐私 / 服务与售后）」；H2-2「详细问答（24 条 details）」；H2-3「没有找到答案？→ 联系销售」
- **FAQ（24 条，每类 4 条）**: （示例首类）产品功能类：Q1: FlyAI 和我现在用的 SEO 工具可以并行吗？Q2: 诊断一次可以覆盖多少 URL？Q3: llms.txt 生成后需要我自己放根目录吗？Q4: 引用监测支持国内哪几个 AI 产品？...其余 5 类各 4 条，合计 24
- **外链**: 引用中国《个人信息保护法》(.gov)、GDPR 官方（eu.int）、ISO/IEC 27701、NIST SP 800-63-3 任选 4 条
- **Acceptance Criteria Addressed**: AC-2, AC-3（FAQPage 必须含 24 项）, AC-4, AC-5
- **Test Requirements**:
  - 同结构 8 项
  - `rule` TR-14.1: `<details>` 数量 = 24，FAQPage JSON-LD `mainEntity.length === 24`
  - `rule` TR-14.2: 6 个分类 H3 均存在，每个分类下 details 数刚好 = 4

---

## Phase 4: 构建验证、性能测试、自查表与最终部署验证（Task 15-17 最终验证）

### Task 15: 完整构建验证 + Lighthouse 性能跑数
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 4-14 全部 completed
- **Description**:
  - 运行 `next build` 0 错误；运行 `next start -p 3000`
  - 跑首页 Lighthouse Performance / Accessibility / SEO / Best Practices 四项
  - 验证 11 个核心页 + 3 docs + 3 blog + glossary 共计 18 页 curl 首 HTML 内容存在
  - 执行禁止项 grep 扫描（lorem ipsum / 编造的客户与价格 / 隐藏文字 / 多 H1 / 图片 FAQ）
- **Acceptance Criteria Addressed**: AC-1, AC-7, AC-8, AC-9
- **Test Requirements**:
  - `rule` TR-15.1: `next build` exit code 0
  - `rubric` TR-15.2: Lighthouse Performance；scale 0-100；anchors 1= <50 / 3= 75 / 5= 95；threshold >= 4（>= 85 分）
  - `rubric` TR-15.3: LCP（Lighthouse 报告）；scale 0-6s；anchors 1= >5 / 3= 3 / 5= <2；threshold >= 4（< 3s，理想 <2.5s）
  - `rule` TR-15.4: 禁止项 grep 全为 0 命中

### Task 16: 生成自查表与综合打分
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 15
- **Description**: 输出 `deliverables/self-check.md`，内容严格按用户要求：
  - 第一部分：硬性口径 4 维度 × 每页 × 每阈值逐条打勾
  - 第二部分：每页量化表：title 长度、description 长度、H1 数量、正文字符数、img alt 覆盖率、外链数、权威引用数、站内链接数
  - 第三部分：全站已生成的 Schema 类型清单（命中 5 类+SoftwareApplication+Article 全部列出出现次数与所在页面）
  - 第四部分：综合加权分 = (结构化数据率×30)+(内容结构率×30)+(元信息率×20)+(引用信任率×20)，并给出未达标项与补齐计划（如有）
  - 第五部分：目标综合分是否 ≥ 85，是则标记 PASS 否则列出补齐动作
- **Acceptance Criteria Addressed**: AC-6（综合分）
- **Test Requirements**:
  - `rule` TR-16.1: deliverables/self-check.md 文件存在
  - `rubric` TR-16.2: 综合加权分；scale 0-100；anchors 1= <60 / 3= 75 / 5= 90+；threshold >= 4.25（≥ 85）
  - `rule` TR-16.3: 任何未达标项列出具体页面与补齐建议

---

## 任务总览与 AC 覆盖矩阵

| 任务 | 优先级 | 覆盖的主要 AC |
|------|--------|---------------|
| Task 1 项目初始化 | 高 | AC-1, AC-8, AC-9 |
| Task 2 通用组件层 | 高 | AC-2, AC-3, AC-8 |
| Task 3 站点级文件 | 高 | AC-4, AC-7 |
| Task 4 首页 / | 高 | AC-1,2,3,4,5,6 |
| Task 5 产品 /product | 高 | AC-2,3,4,5 |
| Task 6 方案 /solutions | 中 | AC-2,3,4,5 |
| Task 7 定价 /pricing | 高 | AC-2,3,4,5, AC-9（无编造价） |
| Task 8 案例 /cases | 中 | AC-2,3,4,5, AC-9（无编造客户） |
| Task 9 文档 /docs | 中 | AC-1,3（Article）,7 |
| Task 10 术语 /glossary | 中 | AC-2,3,4,5 |
| Task 11 博客 /blog | 中 | AC-1,3（Article）,9 |
| Task 12 关于 /about | 中 | AC-2,3,4,5,9 |
| Task 13 联系 /contact | 高 | AC-2,3,4,5,8 |
| Task 14 汇总 FAQ /faq | 高 | AC-2,3（FAQPage 24条）,4,5 |
| Task 15 构建+性能验证 | 高 | AC-1,7,8,9 |
| Task 16 自查表输出 | 高 | AC-6 |
| Task 17 Vercel 部署与 Git 自动更新 | 高 | AC-10（新增） |
