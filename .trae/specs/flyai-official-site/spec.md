# FlyAI 企业官网 - 产品需求文档 (PRD)

## Overview
- **Summary**: 为 FlyAI（广州飞爱智能科技有限公司）搭建苹果官网风格的企业官网，面向企业市场/增长/内容团队，展示 GEO（生成式引擎优化）服务能力：AI 搜索可见性诊断、内容结构化、结构化数据生成与引用监测。
- **Purpose**: 让生成式引擎（DeepSeek、豆包、千问、Google AIO 等）能稳定抓取、正确理解 FlyAI 实体、并愿意引用本站页面作为权威答案来源。
- **Target Users**:
  - 企业市场团队负责人（VP Marketing / CMO）
  - 增长团队（Growth / SEO Manager）
  - 内容团队负责人（Content Director）
  - 代理商与合作伙伴
  - 生成式 AI 搜索爬虫与索引器

## Goals
- **GEO 优化目标（加权评分 ≥ 85/100）**: 结构化数据 30% + 内容结构 30% + 元信息 20% + 引用信任 20%，四维度综合达标
- **内容覆盖目标**: 11 个核心页面 + 3 个站点级文件全部产出，每页严格满足内容结构阈值
- **技术实现目标**: Next.js 14 App Router + 静态生成（SSG），关键内容出现在初始 HTML，LCP < 2.5s
- **交付验证目标**: 交付时输出自查表，逐项打勾并给出量化数据

## Non-Goals
- 不实现真实用户登录、支付、订阅流转（仅展示定价表单与预约 CTA）
- 不实现后端 API（文档 API 为静态 MDX 示例，非真实接口）
- 不编写真实客户案例数据（用「待补充」占位，禁止编造）
- 不实现英文版完整翻译（仅预留 i18n 结构与 URL 前缀路径）
- 不接入真实 CRM 或表单提交服务（用 mailto: 或占位提示）

## Background & Context
- FlyAI 是一家提供 GEO 服务的软件公司，核心客户痛点：企业在传统 SEO 做了大量投入，但 AI 搜索答案中品牌不被引用、实体被混淆、结构化数据不被理解。
- 行业参考：生成式搜索引擎（RAG / SGE / AIO）抓取路径为「llms.txt → 结构化数据 Schema → Markdown 正文 → 引用来源可信度」，与传统 SEO 爬虫不同。
- 视觉参考：Apple.com 极简风格，大留白、大字号、高对比图、层级清晰的 Hero + Feature 模块。
- 技术栈选择：Next.js 14 App Router（支持 SSG/ISR、MDX、next/image、Metadata API），部署至 Vercel 可自然获得边缘 SSR 能力。

## Functional Requirements

### FR-1: 11 个核心页面全部可访问（路由如下）
- `/` 首页：价值主张 + 直达答案 + 能力概览 + 客户问题 + FAQ + CTA
- `/product` 产品功能：AI 可见性诊断 / 内容结构化 / Schema 与 llms.txt 生成 / 引用监测，每项「问题-做法-结果」
- `/solutions` 方案页：按行业/角色切分（B2B SaaS / 出海品牌 / 内容团队 / 代理商）
- `/pricing` 定价：套餐对比表格 + 计费 FAQ
- `/cases` 案例列表：每条含背景、动作、可量化结果占位
- `/docs` 产品文档：接入步骤、API 说明、字段字典（MDX）
- `/glossary` 术语表：GEO、生成式引擎优化、AI 搜索可见性、llms.txt、结构化数据等，每术语 2-3 句可引用定义
- `/blog` 文章列表 + 详情页（Article Schema）
- `/about` 关于我们：团队、方法论、公司信息、联系主体
- `/contact` 联系我们：表单 + 邮箱 + 电话 + 响应时效
- `/faq` 汇总常见问题（20+ 问答，分类）

### FR-2: 3 个站点级文件
- `/robots.txt`: 允许 GPTBot、ClaudeBot、PerplexityBot、Bytespider、Googlebot、Bingbot、DuckDuckBot，禁止 /api、/private、/*?draft=
- `/sitemap.xml`: 自动生成，包含全部 11 页及所有 /blog、/docs、/glossary 条目，带 lastmod
- `/llms.txt`: 按指定结构手写：站点摘要（≤40字）+ 重要页面（URL+说明）+ AI Reading Notes（3-5 条事实）+ 限制说明

### FR-2.5: 部署与自动发布（Vercel + Git 推送自动更新）
- 使用 Vercel 作为生产部署平台，关联 GitHub 仓库 `BirdBryent/traeFlyai66Top`
- 推送 main 分支 → Vercel 自动触发 Production 构建并部署到 `flyai66.top`（或 Vercel 默认子域名）
- 提交非 main 分支 → Vercel 自动触发 Preview 部署，返回预览 URL
- 部署配置包含：Next.js App Router build command / output directory 默认 / 环境变量 NEXT_TELEMETRY_DISABLED=1 / 自定义域名 flyai66.top（或绑定）
- 提供 `vercel.json`（可选，用于重写、headers），并确保 `next.config.ts` 与 Vercel 兼容

### FR-3: 每页内容结构硬性达标（每页都要过）
- 唯一一个 `<h1>`，表达页面主题
- 至少 2 个 `<h2>`，形成清晰层级（H1 → H2 → H3）
- 首段直达答案，正文长度 > 80 字符，不铺垫背景
- 正文去空白字符 > 800
- 所有 `<img>` 必须带 alt（覆盖率 ≥ 100%，阈值 60%）
- 每页至少 1 个 FAQ 区块（小标题含「常见问题」或「FAQ」），3-6 个问答
- 至少 2 处列表或表格
- CTA 文案使用「免费诊断 / 预约演示 / 联系销售 / 查看定价」

### FR-4: 结构化数据 JSON-LD（写在 `<head>`）
- 命中 5 类：Organization、WebSite、FAQPage、Article、BreadcrumbList
- Organization：name、url、description、logo、sameAs（社交/GitHub）、contactPoint；再加 SoftwareApplication（applicationCategory、offers、featureList）
- Blog 详情页加 Article：headline、datePublished、dateModified、author、publisher
- 所有内页加 BreadcrumbList
- JSON 语法合法，可通过 https://validator.schema.org/ 解析

### FR-5: 元信息每页独立达标
- `<title>`：品牌名 + 页面主题，中文
- `meta description`：150-160 字符，含核心关键词
- `<link rel="canonical">`、`meta robots`（index,follow）、`viewport`、`<html lang="zh-CN">`、favicon
- Open Graph 五件套：og:title / og:description / og:image（1200×630）/ og:type / og:locale（zh_CN）
- Twitter Card：twitter:card=summary_large_image + twitter:image

### FR-6: 引用与信任信号
- 每页外链 ≥ 3 条，其中权威来源 ≥ 2 条（arxiv、doi、IEEE、ACM、Nature、Wikipedia、.gov、.edu）
- 站内链接 ≥ 12 条，形成清晰的信息架构（面包屑 + 侧边栏 + 页脚导航 + 正文内链）
- 页脚放公司与主体信息：公司全称、地址、邮箱、电话、社交主页
- 关键事实（数据、结论、方法论）标注来源与更新时间
- 品牌名「FlyAI」写法在标题、摘要、正文中完全一致

### FR-7: 可复用组件与内容管理
- `<JsonLd data={...} />` 组件：自动生成 `<script type="application/ld+json">`
- 内容用 MDX 管理（/blog、/docs、/glossary）
- sitemap 自动从 MDX 与路由生成

## Non-Functional Requirements
- **NFR-1 渲染方式**: 关键页使用 SSG（generateStaticParams），初始 HTML 中可见标题、正文、FAQ、结构化数据；不得依赖客户端 JS 注入
- **NFR-2 首屏性能**: LCP < 2.5s（本地 Lighthouse 跑），图片使用 next/image 并带 alt，启用 responsive
- **NFR-3 语义化标签**: header / nav / main / article / section / footer，H 不跳级（H1→H2→H3）
- **NFR-4 语言与 i18n**: 中文为主（zh-CN），预留 `/en` 路由前缀结构但不填充内容
- **NFR-5 移动优先**: 触控目标 ≥ 44×44px，375px 宽不出现横向滚动
- **NFR-6 禁止事项**: 不使用 lorem ipsum，不编造客户名/价格/数据，不做多 H1/关键词堆砌/隐藏文字，不把 FAQ/正文做成图片

## Constraints
- **Technical**: Next.js 14 App Router + React 18 + TypeScript + TailwindCSS；MDX 使用官方 @next/mdx；图片使用 text_to_image API 生成占位，正式图后续替换
- **Business**: 禁止编造任何可验证数据，案例与数据统一用「[待补充：真实 XX 数据]」占位；FAQ 可以基于行业公开知识编写
- **Dependencies**: supabase（无，本次不需要）、stripe（无）、LLM（仅 text_to_image 用于占位图）

## Assumptions
- 公司全称：广州飞爱智能科技有限公司（用户已确认）
- 联系信息：地址=「广州市天河区珠江新城 [待补充]」，邮箱=contact@flyai66.top，电话=+86-20-0000-0000，后续可替换；官网域名=https://flyai66.top
- 社交链接 sameAs：GitHub=https://github.com/FlyAI、微博=https://weibo.com/flyai、知乎=https://zhihu.com/org/flyai、LinkedIn=https://linkedin.com/company/flyai
- 图片全部由 text_to_image 生成占位（蓝紫色科技风、苹果官网风 Hero、产品流程图等）

## Acceptance Criteria

### AC-1: 11 个核心页面路由可达且 SSG 输出静态 HTML
- **Type**: `rule`
- **Given**: Next.js 构建完成
- **When**: 执行 `next build && next export` 或 `next build` 后在 .next/server/app 下检查
- **Then**: 11 个路由 HTML 全存在，且 curl 下来的首 HTML 中包含 h1、首段、FAQ 文本
- **Pass Condition**: 11/11 页面存在，首 HTML 有 H1/首段/FAQ，非客户端 hydration 注入
- **Evidence**: `ls .next/server/app/**/*.html` + `curl -s http://localhost:3000/<page> | grep -E '<h1|<p|<details'` 输出

### AC-2: 每页内容结构全部达标（内容结构 30%）
- **Type**: `rule`
- **Given**: 11 个页面 + blog/docs/glossary 示例页
- **When**: 对每个页面运行 DOM 检查与字数统计
- **Then**: 每页 H1=1，H2≥2，首段>80 字符，正文去空白>800，img alt 覆盖率 100%，FAQ 存在（3-6 问答），列表/表格≥2，CTA 使用指定文案
- **Pass Condition**: 所有页面 8 项检查全部通过
- **Evidence**: 自查表中每页的 8 项量化数据

### AC-3: 结构化数据命中 5 类且 JSON-LD 合法（结构化数据 30%）
- **Type**: `rule`
- **Given**: 构建后每页 `<head>` 输出
- **When**: 抽取所有 `script[type="application/ld+json"]`，使用 schema.org validator 规则校验
- **Then**: 全站命中 5 类（Organization、WebSite、FAQPage、Article、BreadcrumbList）；Organization 含 SoftwareApplication；Blog 详情含 Article；内页含 BreadcrumbList；JSON parse 无错误
- **Pass Condition**: 5 类 Schema 至少各出现 1 次，所有 JSON-LD 片段可通过 JSON.parse()，必填字段齐全
- **Evidence**: Schema 类型清单 + JSON.parse 校验输出

### AC-4: 元信息每页独立达标（元信息 20%）
- **Type**: `rule`
- **Given**: 每个页面 <head>
- **When**: 提取 title / description / canonical / robots / lang / favicon / OG 5 件 / Twitter Card
- **Then**: 每页 title 唯一；description 150-160 字符；canonical 存在；robots=index,follow；html lang=zh-CN；favicon 存在；OG 5 件齐全；twitter card=summary_large_image
- **Pass Condition**: 所有页面上述检查通过，title 与 description 长度在阈值内
- **Evidence**: 自查表每页 title 长度、description 长度数据

### AC-5: 引用与信任信号达标（引用信任 20%）
- **Type**: `rule`
- **Given**: 全站页面
- **When**: 统计外链、权威外链、站内链接、页脚信息完整性
- **Then**: 每页外链≥3 其中权威≥2；每页站内链接≥12；页脚含公司全称/地址/邮箱/电话/社交；关键事实标注来源与更新时间；「FlyAI」拼写一致
- **Pass Condition**: 所有页面链接数量达标，页脚信息齐全，品牌名拼写一致
- **Evidence**: 自查表每页外链数、权威引用数、站内链接数

### AC-6: 综合加权分 ≥ 85/100
- **Type**: `rubric`
- **Dimension**: GEO 四维综合评分
- **Scale**: 0-100
- **Anchors**: 0 = 多数硬性项未达标；60 = 四维中三项过阈值、一项接近；85 = 所有硬性项过阈值 + 弹性项 70%+ 满足；100 = 所有项超阈值 + 引用来源权威且高相关
- **Pass Threshold**: >= 85
- **Evidence**: 自查表汇总 = 结构化数据 30%×得分率 + 内容结构 30%×得分率 + 元信息 20%×得分率 + 引用信任 20%×得分率

### AC-7: 站点级文件齐全（robots / sitemap / llms.txt）
- **Type**: `rule`
- **Given**: 构建产物 public 目录或 Next.js API routes
- **When**: 访问 `/robots.txt` `/sitemap.xml` `/llms.txt`
- **Then**: 三个文件 200 返回，内容结构符合用户指定格式，sitemap 列出全部 URL
- **Pass Condition**: 三个文件存在且内容结构正确
- **Evidence**: 三个文件内容片段 + curl 状态码

### AC-8: 页面性能 LCP < 2.5s 与移动可用性
- **Type**: `rubric`
- **Dimension**: Lighthouse Performance + Accessibility 得分
- **Scale**: 0-100
- **Anchors**: 1 = LCP>6s 或 Lighthouse<50；3 = LCP<4s 分数 70+；5 = LCP<2.5s 分数 90+，触控 44px+，375px 无横向滚动
- **Pass Threshold**: >= 4（即 LCP<3s + Lighthouse Performance >= 85）
- **Evidence**: `npx lighthouse http://localhost:3000/ --output=json` 的 performance/lcp 数值

### AC-9: 无禁止项触发
- **Type**: `rule`
- **Given**: 全站源码与构建产物
- **When**: 搜索 lorem ipsum、编造的公司/价格/数据名、多 H1、`visibility:hidden`、FAQ 写在 img 内
- **Then**: 零匹配；图片 alt 100% 覆盖；品牌「FlyAI」无变体
- **Pass Condition**: 禁止项 grep 全部零命中
- **Evidence**: grep 扫描输出

### AC-10: 部署到 Vercel + Git 推送自动更新站点
- **Type**: `rule`
- **Given**: GitHub 仓库 BirdBryent/traeFlyai66Top 与 Vercel 项目已关联；当前 main 分支代码可构建
- **When**: 本地执行 `git push origin main` 提交一次新改动
- **Then**: Vercel 自动触发 Production 部署并返回成功部署状态，线上站点（flyai66.top 或 *.vercel.app）内容同步更新；Preview 分支推送自动返回 Preview 链接
- **Pass Condition**: 至少一次 push → Vercel deploy 成功、构建日志无 ERROR、访问线上 URL 页面 200 OK、内容与本地最新提交一致
- **Evidence**: Vercel 部署日志截图/链接 + `curl -I https://.../` 200 + 首页 H1 文本与最新提交一致

## Open Questions
- [x] 公司全称：广州飞爱智能科技有限公司（用户已确认）
- [x] 联系信息：全部用占位符（用户已确认）
- [x] 社交链接：用常见占位链接（用户已确认）
- [x] 图片资源：先用 text_to_image 生成示意图（用户已确认）
- [ ] Blog 文章列表与详情示例的篇数：默认 3 篇示例是否可？
- [ ] Docs 文档示例章节数：默认「快速开始 / API 参考 / 字段字典」3 章是否可？
- [ ] Glossary 术语数：默认 10 条是否可？
