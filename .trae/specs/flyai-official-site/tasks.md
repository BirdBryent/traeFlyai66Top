# FlyAI 企业官网 - 实现计划 (tasks.md)

本实现计划严格按照 spec.md 的 AC 分解。每个任务标注关联 AC 与本地 TR（rule/rubric）。

***

## Phase 1: 项目骨架与基础设施

### Task 1: 初始化 Next.js 14 App Router 项目 + TailwindCSS + TypeScript

### Task 2: 构建通用可复用组件层（JsonLd / Layout / FAQ / CTA / Breadcrumb / PageHero）

### Task 3: 站点级文件（robots.txt / sitemap.xml / llms.txt / Favicon / OG 图）

***

## Phase 2: 首页 MVP + Vercel 部署自动更新打通

> **Phase 2 目标（用户指定）**: 先完成 Task 4 首页 + Task 17 Vercel 部署与 Git 自动推送更新，尽早看到可访问的线上效果。其余 10 个内容页面 + 验证 + 自查表归入 Phase 3。

### Task 4: 首页 `/` page.tsx

### Task 17: 部署到 Vercel 并打通 Git 推送自动更新（在 Phase 2 先做首次 MVP 部署，Phase3 完成后验证最终版）

***

## Phase 3: 其余 10 个内容页面（产品/方案/定价/案例/文档/术语/博客/关于/联系/汇总FAQ）Task 5-14

**通用 Page Template（所有 Phase 3 内容页复用）**：每个页面文件 `app/<route>/page.tsx` 由以下部分组成：

### Task 5: 产品功能 `/product`

### Task 6: 解决方案 `/solutions`

### Task 7: 定价 `/pricing`

### Task 8: 案例 `/cases`

### Task 9: 产品文档 `/docs`（列表 + 详情页，MDX）

### Task 10: 术语表 `/glossary`（MDX）

### Task 11: 博客 `/blog`（列表 + 详情页 3 篇示例，MDX）

### Task 12: 关于我们 `/about`

### Task 13: 联系我们 `/contact`

### Task 14: 汇总 FAQ `/faq`（20+ 问答，分类）

***

## Phase 4: 构建验证、性能测试、自查表与最终部署验证（Task 15-17 最终验证）

### Task 15: 完整构建验证 + Lighthouse 性能跑数

### Task 16: 生成自查表与综合打分

***

## 任务总览与 AC 覆盖矩阵

| 任务                          | 优先级 | 覆盖的主要 AC                |
| --------------------------- | --- | ----------------------- |
| Task 1 项目初始化                | 高   | AC-1, AC-8, AC-9        |
| Task 2 通用组件层                | 高   | AC-2, AC-3, AC-8        |
| Task 3 站点级文件                | 高   | AC-4, AC-7              |
| Task 4 首页 /                 | 高   | AC-1,2,3,4,5,6          |
| Task 5 产品 /product          | 高   | AC-2,3,4,5              |
| Task 6 方案 /solutions        | 中   | AC-2,3,4,5              |
| Task 7 定价 /pricing          | 高   | AC-2,3,4,5, AC-9（无编造价）  |
| Task 8 案例 /cases            | 中   | AC-2,3,4,5, AC-9（无编造客户） |
| Task 9 文档 /docs             | 中   | AC-1,3（Article）,7       |
| Task 10 术语 /glossary        | 中   | AC-2,3,4,5              |
| Task 11 博客 /blog            | 中   | AC-1,3（Article）,9       |
| Task 12 关于 /about           | 中   | AC-2,3,4,5,9            |
| Task 13 联系 /contact         | 高   | AC-2,3,4,5,8            |
| Task 14 汇总 FAQ /faq         | 高   | AC-2,3（FAQPage 24条）,4,5 |
| Task 15 构建+性能验证             | 高   | AC-1,7,8,9              |
| Task 16 自查表输出               | 高   | AC-6                    |
| Task 17 Vercel 部署与 Git 自动更新 | 高   | AC-10（新增）               |

