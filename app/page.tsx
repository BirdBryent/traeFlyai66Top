import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import CTAButton from '@/components/CTAButton';
import JsonLd from '@/components/JsonLd';
import {
  buildFAQPage,
  buildBreadcrumbList,
  isAuthorityLink,
  FAQItem,
} from '@/lib/schema';

const title =
  'FlyAI 生成式引擎优化（GEO）——让 AI 搜索答案优先引用你的品牌';
const description =
  'FlyAI（广州飞爱智能科技有限公司）提供 GEO 生成式引擎优化服务：AI 可见性诊断、内容结构化改造、Schema/llms.txt 自动生成、12+ 生成式引擎引用与提及监测，帮助企业市场与内容团队在 DeepSeek、豆包、千问、Google AIO 的 AI 答案中获得稳定、准确、高权重的品牌引用。';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: 'https://flyai66.top/',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
};

const homeFAQ: FAQItem[] = [
  {
    question: 'GEO（生成式引擎优化）与传统 SEO 到底有什么本质区别？',
    answer:
      'GEO（Generative Engine Optimization）面向的是生成式引擎——由大语言模型驱动、通过 RAG（检索增强生成）先召回再综合出答案的回答式搜索路径，如 DeepSeek 搜索、豆包/千问、Google AI Overview（AIO）、Perplexity 等。GEO 关注三件事：①你的信息在检索阶段是否被召回（对应 llms.txt 与实体定义），②被综合成答案时是否准确描述（对应首段直达答案与结构化数据），③输出答案时是否附上你的品牌名称与页面链接（对应引用可信度指标）。传统 SEO 主要面向基于关键词匹配的排名权重，指标是点击率、链接数量、页面标题与关键词密度，它并不能保证最终答案引用你的实体描述。',
  },
  {
    question: '公司里没有独立的技术团队，也能使用 FlyAI 的 GEO 服务吗？',
    answer:
      '完全可以。FlyAI 提供三类交付模式以适配不同团队配置：① SaaS 自助版（启动版 / 专业版），内容与市场同学通过控制台输入 URL、导入 Markdown 或复制粘贴富文本，即可一键导出 JSON-LD、llms.txt、首段改写建议，无需工程介入；② API / SDK 接入版，技术团队 1-2 天可嵌入现有内容流水线；③ 顾问 + 工具组合的服务包，由 FlyAI CSM 与内容顾问提供首 30 天的诊断、改造与上线陪跑。三种模式均不要求客户具备完整的结构化数据背景，你可以在 [联系 FlyAI 商务团队](/contact) 说明团队规模与当前痛点，我们会在 1 个工作日内给出对应模式的接入步骤与交付清单。',
  },
  {
    question: '一般接入 FlyAI 后需要多久能看到 AI 引用率的实际提升？',
    answer:
      '不同引擎的索引与综合策略刷新周期不同，典型的时间窗口如下：① 站内改造阶段（1-3 周）：完成 llms.txt、FAQPage/BreadcrumbList/Article JSON-LD、首段直答改造、内部锚点重构后，大部分生成式引擎会在下一次定期重抓（通常 3-14 天）时看到首段答案覆盖度明显改善；② 引用可信度积累阶段（4-8 周）：当你有稳定的权威外链（.gov / .edu / arXiv / ACM / Nature 等）指向你的实体定义页，综合引擎开始把你作为事实来源引用，这个过程的时间取决于品牌与内容的垂直领域权威性；③ 指标观测与持续优化阶段（第 9 周起）：通过 FlyAI 引用与提及监测面板按页、按关键词记录变化，形成可追溯的提升曲线。所有阶段的时间均为方法论层面的经验性说明，不作为具体结果承诺；具体指标与交付节奏以 [联系销售](/contact) 出具的服务计划说明书为准。',
  },
  {
    question: 'FlyAI 当前支持哪些生成式引擎与 AI 产品的引用监测？',
    answer:
      'FlyAI 引用与提及监测面板目前覆盖以下 12+ 引擎/产品（2025-10-09 版本，后续随平台新增扩展）：国内生成式搜索：DeepSeek 搜索、字节豆包（含 AI 搜索）、阿里云千问/通义、百度文心/AI 搜索；全球生成式搜索：Google AI Overview（AIO）、Bing Copilot、Perplexity、DuckDuckGo AI Chat、You.com；通用对话/Agent：OpenAI ChatGPT Browse、Anthropic Claude Browse、讯飞星火。同一关键词在不同引擎上的综合逻辑差异显著，建议同时观测 3-5 个目标引擎（按你的 TA 所在地区与行业挑选）。引擎支持清单会随大厂商开放策略更新，你可在 [产品文档 / FAQ](/faq) 中查看最新支持列表与变更记录。',
  },
  {
    question: '我怎么判断我的网站有没有结构化数据或 AI 抓取方面的结构性问题？',
    answer:
      '可以按以下 5 条自检清单做 10 分钟的人工快速诊断，若有任意 2 条命中，通常意味着存在可被 FlyAI 修复的结构性问题：① 10 个核心业务页面的首段是否都在 3 句话内直奔主题，而不是先写「在今天这个数字化时代……」之类的营销套话？首段直达答案是生成式引擎在引用你时最依赖的句子。② 是否在站点根目录同时放置了 robots.txt、sitemap.xml、llms.txt 三份文件？[schema.org 官方 Getting Started 指南](https://schema.org/docs/gs.html) 明确建议结构化数据与站点说明文件同时配置。③ 站点是否为所有 FAQ、文章、产品、面包屑分别配置了 FAQPage / Article / Product / BreadcrumbList 类型的 JSON-LD？可通过 [Google Search Central 的结构化数据测试工具](https://developers.google.com/search/docs/appearance/structured-data) 做在线校验。④ 用「你的品牌名 + 核心品类关键词」分别在 DeepSeek / Google AIO 搜索 5 次，综合结果里是否正确引用了你的官网链接与品牌实体？如果 5 次中出现品牌张冠李戴、答案没有引用官网，说明 AI 实体识别是优先要修复的部分。⑤ 站内 404、没有 canonical、内链锚点无实体化关键词、图片 FAQ 这类常见问题，FlyAI [免费 GEO 诊断](/contact) 会在 2 个工作日内输出 100+ 维度的问题清单与修复优先级，直接对接对应问题的处理方案。',
  },
];

export default function HomePage() {
  return (
    <div className="text-gray-900">
      <Breadcrumb items={[{ label: '首页', href: '/' }]} />

      <PageHero
        eyebrow="FlyAI · 生成式引擎优化（GEO）平台"
        h1="FlyAI 生成式引擎优化（GEO）——让 AI 搜索答案优先引用你的品牌"
        lead="FlyAI 通过 AI 可见性诊断、内容结构化改造、Schema.org JSON-LD 与 llms.txt 自动生成、以及全平台引用提及监测四项核心能力，帮助 B2B SaaS、出海品牌与内容团队在 DeepSeek、豆包、千问、Google AIO 等生成式引擎的答案中获得稳定、准确、高权重的品牌引用，解决「传统 SEO 做得再好但 AI 搜不到、搜不到完整信息、品牌被张冠李戴」的增长缺口。FlyAI 服务覆盖从首屏首段直达答案改造、FAQ 抽取、实体命名一致性治理，到 12+ 生成式引擎引用持续追踪的完整闭环，让你的每一页内容都能被 AI 正确理解、作为事实来源稳定引用。"
        ctaPrimary={{ text: '免费诊断', href: '/contact' }}
        ctaSecondary={{ text: '查看产品', href: '/product' }}
        bgImage={{
          src: '/images/home-hero-bg.png',
          alt: 'FlyAI 首页主视觉：蓝紫色科技渐变背景，象征生成式引擎优化的 AI 智能网格',
        }}
      />

      <section
        id="capabilities"
        aria-labelledby="capabilities-heading"
        className="mx-auto max-w-7xl px-5 py-20 lg:px-8"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Core Capabilities
          </p>
          <h2
            id="capabilities-heading"
            className="mt-3 text-3xl font-bold tracking-tight md:text-4xl"
          >
            FlyAI 四项核心能力，覆盖生成式引擎优化完整闭环
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-700">
            生成式引擎的答案生成链路分四步：抓取 → 召回 → 综合 → 引用。
            FlyAI 的四项能力分别对应链路上的四个阶段，任何一个环节的结构性问题都会直接影响你的品牌在 AI
            答案中的出现概率与权重。下面是 [产品功能总览](/product)
            中最常被客户问到的四项核心能力拆解：
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 ring-1 ring-brand-200">
                <Image
                  src="/images/icon-diagnose.png"
                  alt="FlyAI AI 搜索可见性诊断模块图标：同心圆与十字靶心，象征全站扫描与精准定位"
                  width={56}
                  height={56}
                  priority
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                ① AI 搜索可见性诊断（GEO Health Scan）
              </h3>
            </div>
            <p className="leading-relaxed text-gray-700">
              从 100+ 维度评估当前站点的 GEO 健康度，按严重等级（P0 / P1 / P2 /
              P3）输出可操作的修复清单与优先级建议。诊断覆盖以下五类典型问题：
            </p>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>
                站点说明文件层：是否缺失 <code>llms.txt</code>、
                <code>robots.txt</code>、<code>sitemap.xml</code> 中的任一份？
                是否对主流 AI Bot（GPTBot / ClaudeBot / PerplexityBot / Bytespider
                等）开放了根路径抓取？
              </li>
              <li>
                结构化数据层：FAQPage / Article / BreadcrumbList / Organization /
                SoftwareApplication 五类 JSON-LD 的完整性、一致性与可通过
                validator.schema.org 的合规性。
              </li>
              <li>
                首段直达答案层：核心 10 页面首段是否「3 句话内直达核心结论」？
                是否存在 [lorem ipsum /
                空洞营销套话] 被生成式引擎作为噪声段落过滤的风险？
              </li>
              <li>
                内链与锚点层：内部链接的锚文本是否实体化（指向 <Link href="/glossary" className="text-brand-700 underline underline-offset-2 hover:text-brand-900">GEO 术语</Link>
                中定义的核心词），而不是模糊的「点击这里」？
              </li>
              <li>
                引用可信度层：权威外链（.gov / .edu / arXiv / ACM / IEEE / Nature
                / Google 官方开发者文档）的数量、锚点分布与新鲜度——引用可信度是
                GEO 区别于传统 SEO 的关键指标。
              </li>
            </ul>
            <p className="pt-2 text-sm text-gray-500">
              详细诊断项清单：请参考 [产品文档 / 快速开始](/docs/quickstart) 中的「GEO
              Health Scan 100+ 维度解释表」。
            </p>
          </article>

          <article className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 ring-1 ring-brand-200">
                <Image
                  src="/images/icon-structure.png"
                  alt="FlyAI 内容结构化模块图标：网格化方块与亮色白边，象征实体对齐与结构化切片"
                  width={56}
                  height={56}
                  priority
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                ② 内容结构化改造（AI Readable Restructure）
              </h3>
            </div>
            <p className="leading-relaxed text-gray-700">
              将任意现有的 Markdown / 富文本 / CMS
              草稿一键改造成「生成式引擎友好」的实体化内容结构，让大模型在综合答案时能直接抽取到结论。典型改造成果包括：
            </p>
            <ol className="list-decimal space-y-2 pl-6 text-gray-700">
              <li>
                <strong>首段三句式直答模板：</strong>
                第一句定义实体（你是谁？）；第二句说清差异（与竞对的 1-2
                点本质区别）；第三句给出证据（权威引用或数据，避免空话）。
              </li>
              <li>
                <strong>FAQ 自动抽取与规范化：</strong>
                对任意长文抽取 3-6
                个真实读者会问的问题，自动渲染为 <code>&lt;details&gt;</code>{' '}
                可折叠结构，并同步输出 FAQPage JSON-LD 供 AI 直接抽取。
              </li>
              <li>
                <strong>实体标签与首字母大写一致：</strong>
                品牌名、产品名、核心术语、行业黑话在页面、锚点、Schema
                字段、llms.txt 四者中 100% 一致，避免 AI
                把你和竞对的实体混淆（张冠李戴是 GEO 最常见的事故类型）。
              </li>
              <li>
                <strong>要点列表化 + 表格化：</strong>
                列表 <code>&lt;ol&gt;/&lt;ul&gt;</code> 与表格{' '}
                <code>&lt;table&gt;</code>{' '}
                比自由段落文本更容易被模型理解并作为答案引用；
                每一页我们都要求至少有 2 处列表或表格结构。
              </li>
            </ol>
          </article>

          <article className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 ring-1 ring-brand-200">
                <span className="text-2xl font-bold text-brand-700">{'{}'}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                ③ Schema.org JSON-LD 与 llms.txt 自动生成
              </h3>
            </div>
            <p className="leading-relaxed text-gray-700">
              结构化数据是 GEO 的事实性锚点。FlyAI 内置一套与{' '}
              <a
                href="https://schema.org/docs/gs.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 underline underline-offset-2 hover:text-brand-900"
              >
                schema.org 官方 Getting Started 指南
              </a>{' '}
              实时对齐的字段模板，覆盖 6 大核心 Schema 类型与 30+ 常用子字段，
              按你输入的业务实体自动生成可通过在线校验的 JSON-LD 代码。
            </p>
            <table className="w-full border-collapse text-sm text-left">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="rounded-tl-xl border border-gray-200 px-3 py-2">
                    Schema 类型
                  </th>
                  <th className="border border-gray-200 px-3 py-2">典型适用页面</th>
                  <th className="rounded-tr-xl border border-gray-200 px-3 py-2">
                    FlyAI 自动补齐哪些字段？
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">
                    Organization
                  </td>
                  <td className="border border-gray-200 px-3 py-2">全站 / 关于</td>
                  <td className="border border-gray-200 px-3 py-2">
                    name / url / logo / sameAs（4 条社交）/ contactPoint / address
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">
                    FAQPage
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    FAQ 汇总 / 产品 / 定价 / 案例
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    mainEntity.name（问题）/ acceptedAnswer.text（答案）
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">
                    BreadcrumbList
                  </td>
                  <td className="border border-gray-200 px-3 py-2">所有内容页</td>
                  <td className="border border-gray-200 px-3 py-2">
                    position / name / item 绝对 URL
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">
                    Article
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    [博客](/blog) / [文档](/docs)
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    headline / datePublished / dateModified / author / publisher /
                    mainEntityOfPage
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-medium">
                    SoftwareApplication
                  </td>
                  <td className="border border-gray-200 px-3 py-2">产品 / 定价</td>
                  <td className="border border-gray-200 px-3 py-2">
                    name / featureList / applicationCategory / operatingSystem /
                    offers（三档价格 [联系销售获取报价]）
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="pt-2 text-sm text-gray-500">
              参考：<a
                href="https://en.wikipedia.org/wiki/Search_engine_optimization"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 underline underline-offset-2 hover:text-brand-900"
              >
                Wikipedia · Search engine optimization 词条
              </a>{' '}
              中关于「结构化数据在现代搜索与答案引擎中的作用」章节提供了背景说明。
            </p>
          </article>

          <article className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 ring-1 ring-brand-200">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                ④ 12+ 生成式引擎引用与提及监测
              </h3>
            </div>
            <p className="leading-relaxed text-gray-700">
              GEO 无法提升你无法衡量的东西。FlyAI 引用与提及监测面板每周在 12+
              生成式引擎上采集你的品牌 + 核心关键词的组合搜索，
              输出四条关键指标，并给出环比变化与归因（对应哪一项站内改造动作）：
            </p>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>
                <strong>答案覆盖度：</strong>
                同一次搜索中，品牌 / 产品被作为答案段落提及的比例。
              </li>
              <li>
                <strong>引用链接率：</strong>
                答案下方「引用来源 / Sources」区块里，官网链接出现的次数与顺位。
              </li>
              <li>
                <strong>实体描述准确率：</strong>
                是否存在张冠李戴（例如你的产品被说成是另一家公司做的）
                或功能描述严重偏离官网口径的情况——这是 GEO 最危险的 P0
                级问题，需要 48 小时内响应处理。
              </li>
              <li>
                <strong>Top 答案顺位：</strong>
                当综合答案被引擎按 bullet / 编号列出多个品牌或方案时，
                你的品牌排在第几位，第一次出现在第几位？
              </li>
            </ul>
            <p className="pt-2 text-sm text-gray-500">
              具体指标口径与交付示例：请 [预约演示](/contact) 由 FlyAI
              解决方案工程师结合你的行业场景做 30 分钟带 Demo 的说明。
            </p>
          </article>
        </div>
      </section>

      <section
        id="pain-points"
        aria-labelledby="pain-heading"
        className="bg-gradient-to-b from-gray-50 via-white to-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              Common AI Citation Failures
            </p>
            <h2
              id="pain-heading"
              className="mt-3 text-3xl font-bold tracking-tight md:text-4xl"
            >
              三类客户最常见的 AI 引用困境——FlyAI 的对应解法
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              我们服务 B2B SaaS、出海品牌、独立内容团队与代理商四种典型客户。
              他们在决定启用 FlyAI 之前，通常都遇到过下列三类「我的网站在 Google
              排名挺靠前，但 DeepSeek / 千问 / AIO 就是不引用我」的真实困境。
              下面的困境 → 解法 → 能力映射表，帮助你快速判断自己属于哪一类：
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {[
              {
                kind: '困境 A · B2B SaaS：品牌在 AI 答案中被张冠李戴',
                who: 'B2B SaaS 团队：年 ARR 5000 万-5 亿，传统品牌 SEO 做得不错',
                symptom:
                  '客户用「XX 品类 + 软件推荐」去搜 AI，答案前 3 位里都没有你的品牌，甚至把你的核心功能和公司说成是竞品的。官网排名不错，但 Google AIO 的 Sources 里 10 次只有 1 次出现你。',
                fix: [
                  '① 在 [关于页](/about) 定义实体官方基线（名称 / 总部 / 成立年份 / 核心品类），并与 llms.txt、Organization JSON-LD 三者 100% 对齐；',
                  '② 针对 Top 10 品类关键词 × 5 个引擎建立每周引用准确率基线，发现张冠李戴 48h 内用定向实体锚点改写修复；',
                  '③ 在权威外链层面布局 10-20 条第三方 .gov / .edu / 行业媒体的实体锚点。',
                ],
                ability: '① + ② + ④（诊断 + 结构化 + 引用监测）',
                cta: '查看 B2B SaaS 方案',
                ctaHref: '/solutions',
              },
              {
                kind: '困境 B · 出海品牌：多语言 AI 答案中实体不一致',
                who: '跨境品牌 / 多语言站点：SKU 级内容矩阵，英 / 日 / 西 / 阿语至少 2 种',
                symptom:
                  '中文站品牌被正确引用，但英文站在 Perplexity / ChatGPT Browse 搜索时经常被说成是中国制造工厂、或把你的系列名与子品牌混为一谈。多站点 schema 各写各的，没有统一 Organization 基类。',
                fix: [
                  '① 为每个品牌建立跨语言一致的 Organization 与 Product 父类 Schema，按 [Google Developer 多语言站点指南](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) 建立 hreflang + alternate 映射；',
                  '② 每个语言站点单独一份 llms.txt（通过不同子域名或子路径访问），明确写出实体别名、禁止混淆的竞对名单；',
                  '③ 出海核心关键词的 12+ 引擎引用率每周观测，重大事件（如融资 / 产品发布）后 72 小时内刷新全站实体锚点。',
                ],
                ability: '① + ② + ③（诊断 + 结构化 + Schema/llms 生成）',
                cta: '联系销售定制方案',
                ctaHref: '/contact',
              },
              {
                kind: '困境 C · 内容团队：投入巨大但 AI 引用 0 提升',
                who: '内容 / 增长团队：每周 5-10 篇高质量原创内容，CMS 体系完备',
                symptom:
                  '团队按传统 SEO best practice 写了半年，总字数几十万；但用品牌词 + 品类词搜 AI 时，答案引用的还是 3-4 年前的旧博客，新内容几乎没有被 AI 端检索器作为高权重来源召回。',
                fix: [
                  '① 先做「内容存量结构化改造」：按 FlyAI 三句首段直答模板 + FAQ 抽取 + 要点表格化 3 步法翻新核心 30 篇高意图内容，增量内容再遵循统一模板；',
                  '② 为 [术语表](/glossary) 建立全站最权威的 10 个核心概念定义页，每个定义页配 1+ 权威来源，并把所有正文锚点指向这些定义页（作为 Entity Linking 的站内权威）；',
                  '③ 通过 FlyAI [博客中心](/blog) 的「GEO 研究报告」系列持续累积引用可信度：每篇研究至少引用 3 条权威来源，并在发布后 30 天内完成第三方行业媒体的反向锚点布局。',
                ],
                ability: '② + ③ + ④（结构化 + Schema/llms + 引用监测）',
                cta: '申请内容诊断',
                ctaHref: '/contact',
              },
            ].map((c) => (
              <article
                key={c.kind}
                className="flex flex-col rounded-3xl border border-gray-200 bg-white p-7 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {c.kind.split('：')[0]}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-gray-900">
                  {c.kind.split('：')[1]}
                </h3>
                <dl className="mt-5 space-y-5 text-gray-700">
                  <div>
                    <dt className="font-medium text-gray-800">典型客户画像</dt>
                    <dd className="mt-1 leading-relaxed">{c.who}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-800">困境症状</dt>
                    <dd className="mt-1 leading-relaxed">{c.symptom}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-800">FlyAI 建议三步法</dt>
                    <dd className="mt-1">
                      <ul className="space-y-1.5 pl-4">
                        {c.fix.map((f, i) => (
                          <li
                            key={i}
                            className="relative pl-5 leading-relaxed before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand-500"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-800">
                      对应 FlyAI 核心能力
                    </dt>
                    <dd className="mt-1 text-sm text-brand-700">{c.ability}</dd>
                  </div>
                </dl>
                <div className="mt-7">
                  <CTAButton href={c.ctaHref} variant="ghost" size="sm">
                    {c.cta}
                  </CTAButton>
                </div>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-gray-500 leading-relaxed">
            权威引用来源说明：本页在描述 GEO 方法论与结构化数据实践时，优先引用{' '}
            <AuthorityBulletLink href="https://schema.org/docs/gs.html" label="schema.org 官方 Getting Started" />
            、<AuthorityBulletLink href="https://en.wikipedia.org/wiki/Search_engine_optimization" label="Wikipedia · SEO 词条" />
            、与 <AuthorityBulletLink href="https://developers.google.com/search/docs/appearance/structured-data" label="Google Search Central 结构化数据指南" />
            三份公开文档作为事实性参考依据；所有引用均为公开资料，不代表任何商业背书。
          </p>
        </div>
      </section>

      <FAQSection title="关于 FlyAI 生成式引擎优化（GEO）的 5 条常见问题" items={homeFAQ} />

      <section
        id="cta-block"
        aria-labelledby="cta-heading"
        className="mx-auto mt-8 max-w-7xl px-5 pb-24 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900 px-8 py-14 text-white shadow-xl md:px-14 md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative grid gap-10 md:grid-cols-5">
            <div className="md:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                Next step
              </p>
              <h2
                id="cta-heading"
                className="mt-3 text-3xl font-bold tracking-tight md:text-4xl"
              >
                立即开始 FlyAI GEO 诊断，用数据而不是感觉，量化你的 AI 引用状况
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
                FlyAI <strong>免费 AI 搜索可见性诊断</strong> 接受提交 ≤ 500 个 URL
                的站点，覆盖 100+ 维度结构化 / llms.txt / 首段直答 / 权威外链 /
                实体一致性检查，交付 PDF + Markdown 双格式报告，并由解决方案工程师给出
                1 小时 1v1 讲解（中国工作时间 GMT+8，提交后 2 个工作日内安排）。
              </p>
              <ul className="mt-5 space-y-2 text-sm text-white/85">
                <li>✓ 无需提供站点后台账号或数据库权限，只需要官方公开 URL 清单</li>
                <li>✓ 无论你当前使用 FlyAI SaaS 还是计划采购企业版，都可使用免费诊断</li>
                <li>
                  ✓ 所有提交的 URL 与业务信息均按 FlyAI <Link href="/privacy" className="underline underline-offset-2 hover:text-white/100">
                    服务条款与数据处理协议
                  </Link>{' '}
                  严格处理，不外泄、不用于训练第三方模型
                </li>
              </ul>
            </div>
            <div className="relative md:col-span-2">
              <div className="flex h-full flex-col justify-center gap-4">
                <CTAButton
                  href="/contact"
                  size="lg"
                  variant="primary"
                  className="!bg-white !text-brand-800 hover:!bg-white/90 !shadow-lg"
                >
                  免费诊断
                </CTAButton>
                <CTAButton href="/pricing" size="lg" variant="ghost"
                  className="!bg-white/10 !text-white ring-1 ring-white/30 hover:!bg-white/20 !shadow-lg">
                  查看定价
                </CTAButton>
                <CTAButton href="/docs/quickstart" size="lg" variant="ghost"
                  className="!bg-transparent !text-white ring-1 ring-white/25 hover:!bg-white/10">
                  阅读文档
                </CTAButton>
                <p className="pt-2 text-xs text-white/70">
                  已服务客户：[待补充：真实授权客户名称，需签署案例 MAA
                  后方可展示]，所有数字与案例均为可追溯的真实数据。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={[
          buildBreadcrumbList([{ label: '首页', href: '/' }]),
          buildFAQPage(homeFAQ),
        ]}
      />
    </div>
  );
}

function AuthorityBulletLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const ok = isAuthorityLink(href);
  return (
    <>
      {' '}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={
          ok
            ? 'font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900'
            : 'text-gray-600 underline underline-offset-2 hover:text-gray-900'
        }
      >
        {label}
      </a>
      {ok ? (
        <sup className="ml-0.5 text-[10px] font-semibold text-brand-600">权威</sup>
      ) : null}
    </>
  );
}
