import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import RelatedLinks from '@/components/RelatedLinks';
import CTAButton from '@/components/CTAButton';
import JsonLd from '@/components/JsonLd';
import { buildFAQPage, buildBreadcrumbList, FAQItem, buildWebPage, buildService } from '@/lib/schema';

const title = 'FlyAI 解决方案 — B2B SaaS · 出海品牌 · 内容团队 · 代理商';
const description =
  '针对 B2B SaaS 客户需要在 AI 答案中被作为工具推荐准确引用、出海品牌需要在多语言生成式引擎中维持实体一致性、内容团队需要规模化产出高引用内容、代理商需要将 GEO 打包进客户服务套餐四类典型场景，FlyAI 提供模块化组合方案与对应的诊断模板、数据接入方式、交付物清单。';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/solutions' },
  openGraph: {
    title,
    description,
    url: 'https://flyai66.top/solutions',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-default.jpg'] },
  robots: { index: true, follow: true },
};

const faqItems: FAQItem[] = [
  {
    question: 'B2B SaaS 和电商客户的 GEO 策略差异在哪？',
    answer:
      'B2B SaaS 的 GEO 重点在于「工具推荐」场景：当用户在 AI 中提问「有什么 GEO 工具？」时，产品需要被作为工具实体准确引用，侧重 Product/SoftwareApplication Schema、功能对比表、术语定义页。电商客户的 GEO 重点在「商品/品牌实体」，需要 Product Schema、Review、品牌故事页。两类客户共性是首段直答与实体一致性，差异在 Schema 类型选择与关键词维度。详细对比见 [解决方案页](/solutions) 各方案卡片。',
  },
  {
    question: '出海多语言站点需要多套 llms.txt 吗？',
    answer:
      '建议为每种语言维护一份独立的 llms.txt，放在对应语言子目录根路径（如 /en/llms.txt、/ja/llms.txt），根目录 llms.txt 作为主索引指向各语言版本。FlyAI 生成器支持多语言模板，自动为 zh-CN、en-US、ja-JP 等生成对应 llms.txt，并在「重要页面」段分别列出各语言核心页面 URL。详见 [产品文档多语言 GEO 指南](/docs/schema-fields)。',
  },
  {
    question: '内容团队 10 人规模大概需要什么套餐？',
    answer:
      '10 人规模的内容团队通常适用专业版，提供 [联系销售获取报价] 篇/月内容结构化编辑器额度、[联系销售获取报价] 个引用监测关键词、REST API 与 SDK 接入、专属 CSM 季度复盘。若同时负责多个品牌或多语言站点且需私有部署，建议升级企业版。可 [联系销售](/contact) 说明团队规模、站点数量与月内容产出量获取套餐建议。',
  },
  {
    question: '代理商有返利或贴牌（OEM）模式吗？',
    answer:
      '有。FlyAI 为代理商提供两种合作模式：① 渠道返利模式：代理商以折扣价采购 FlyAI 套餐加价转售，FlyAI 提供产品、技术支持与品牌物料；② 贴牌（OEM）模式：代理商可使用自有品牌包装 FlyAI 产品，在企业版私有部署基础上替换 Logo、域名与文档。两种模式均需签署渠道合作协议，具体返利比例与 OEM 授权费请 [联系渠道合作团队](mailto:partner@flyai66.top) 获取渠道手册。',
  },
];

const crumbs = [
  { label: '首页', href: '/' },
  { label: '解决方案', href: '/solutions' },
];

const solutions = [
  {
    name: 'B2B SaaS',
    icon: '⚙️',
    pain: 'AI 答案中工具推荐场景下品牌被竞品替代，潜在客户搜索「XX 工具推荐」时找不到自己的产品不在候选列表，产品页首段套话导致引擎不引用，SoftwareApplication Schema 缺失。',
    solution:
      'FlyAI 为 B2B SaaS 客户提供：① SoftwareApplication + Product Schema 自动生成与字段填充；② 功能对比页首段直答改造（产品名 + 品类 + 核心差异化 3 要素）；③ 术语定义页建设（让引擎把品牌与 GEO 实体绑定）；④ 「工具推荐」类关键词引用监测。',
    deliverables: [
      'SoftwareApplication / Product JSON-LD（全产品页覆盖）',
      '功能对比表（Before/After 结构化表格）',
      '术语定义页（GEO / AI 搜索可见性等 10+ 术语）',
      '「工具推荐」关键词引用监测报告（月度）',
      '首段直答改写建议（按页）',
    ],
  },
  {
    name: '出海品牌',
    icon: '🌏',
    pain: '多语言站点实体不一致（中文叫「飞爱」英文叫「FlyAI」但引擎无法关联，hreflang 标注缺失，各语言 llms.txt 未配置，海外引擎引用率低于国内。',
    solution:
      'FlyAI 为出海品牌提供：① 多语言 llms.txt 自动生成（zh-CN / en-US / ja-JP 等）；② 实体命名一致性治理（中英日多语言品牌名映射表）；③ hreflang 标注检查与修复；④ Google AIO / Bing Copilot / Perplexity 海外引擎引用监测。',
    deliverables: [
      '多语言 llms.txt（每语言一份）',
      '实体命名一致性映射表 + 全站扫描报告',
      'hreflang 标注修复方案',
      '海外引擎引用监测仪表盘（12+ 引擎）',
      '多语言首段直答本地化建议',
    ],
  },
  {
    name: '内容团队',
    icon: '✍️',
    pain: '内容产出量大但 AI 引用率低，FAQ 未结构化导致引擎不抽取，内链锚文本无关键词，实体命名在不同文章中不一致。',
    solution:
      'FlyAI 为内容团队提供：① 内容结构化编辑器（Markdown/富文本一键转引擎友好格式）；② FAQ 自动抽取为 FAQPage JSON-LD；③ 实体命名一致性检查（全站批量扫描）；④ 内链锚文本实体化建议。',
    deliverables: [
      '内容结构化编辑器额度（按月）',
      'FAQ 抽取工具（自动 JSON-LD）',
      '实体命名一致性扫描报告（季度）',
      '内链锚文本优化建议',
      '内容团队 GEO 培训（2 次/年）',
    ],
  },
  {
    name: '代理商',
    icon: '🤝',
    pain: '客户要求 GEO 服务但自身无技术能力，需将 GEO 打包进 SEO 服务套餐，需贴牌交付物标准化交付效率低。',
    solution:
      'FlyAI 为代理商提供：① 渠道返利模式（折扣价采购加价转售）；② 贴牌 OEM 模式（自有品牌包装）；③ 标准化交付物模板（诊断报告 / Schema / llms.txt）；④ 代理商培训与认证体系。',
    deliverables: [
      '渠道折扣价（按年度采购量阶梯）',
      '白标 OEM 授权（企业版私有部署）',
      '标准化交付物模板库',
      '代理商认证培训（季度）',
      '专属渠道经理对接',
    ],
  },
];

export default function SolutionsPage() {
  return (
    <div className="text-gray-900">
      <Breadcrumb items={crumbs} jsonLdOnly />

      <PageHero
        eyebrow="解决方案"
        h1={title}
        lead={description}
        ctaPrimary={{ text: '联系销售', href: '/contact' }}
        ctaSecondary={{ text: '查看产品', href: '/product' }}
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">四类典型场景的 GEO 解决方案</h2>
        <p className="mt-4 text-lg text-gray-600">
          FlyAI 针对不同客户类型提供模块化组合方案，每个方案均按「典型痛点 → FlyAI 做法 → 交付物清单」三段式呈现，便于快速评估适配性。
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {solutions.map((s) => (
            <article key={s.name} className="rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold">
                <span className="mr-2" aria-hidden="true">{s.icon}</span>
                {s.name}
              </h3>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-red-600">典型痛点</h4>
                  <p className="mt-2 text-gray-700">{s.pain}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-brand-700">FlyAI 做法</h4>
                  <p className="mt-2 text-gray-700">{s.solution}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">交付物清单</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                    {s.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">方案选择决策表</h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 font-semibold">客户类型</th>
                <th className="px-4 py-3 font-semibold">核心目标</th>
                <th className="px-4 py-3 font-semibold">推荐套餐</th>
                <th className="px-4 py-3 font-semibold">关键交付物</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium">B2B SaaS</td>
                <td className="px-4 py-3 text-gray-600">工具推荐场景引用</td>
                <td className="px-4 py-3 text-gray-600">专业版 / 企业版</td>
                <td className="px-4 py-3 text-gray-600">SoftwareApplication Schema + 术语页</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium">出海品牌</td>
                <td className="px-4 py-3 text-gray-600">多语言实体一致性</td>
                <td className="px-4 py-3 text-gray-600">企业版</td>
                <td className="px-4 py-3 text-gray-600">多语言 llms.txt + hreflang</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium">内容团队</td>
                <td className="px-4 py-3 text-gray-600">规模化高引用内容</td>
                <td className="px-4 py-3 text-gray-600">专业版</td>
                <td className="px-4 py-3 text-gray-600">结构化编辑器 + FAQ 抽取</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">代理商</td>
                <td className="px-4 py-3 text-gray-600">GEO 服务打包交付</td>
                <td className="px-4 py-3 text-gray-600">渠道合作 / OEM</td>
                <td className="px-4 py-3 text-gray-600">标准化模板 + 白标授权</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <RelatedLinks path="/solutions" />
      <FAQSection title="关于 FlyAI 解决方案的常见问题" items={faqItems} />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-3xl font-bold md:text-4xl">不确定你的场景适合哪种方案？联系销售获取定制建议</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            FlyAI 解决方案专家将在 1 个工作日内根据你的行业、团队规模与 GEO 目标，推荐最合适的方案与套餐组合。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/contact" size="lg" variant="primary" className="!bg-white !text-brand-800 hover:!bg-white/90">
              联系销售
            </CTAButton>
            <CTAButton href="/cases" size="lg" variant="ghost" className="!bg-white/10 !text-white ring-1 ring-white/30 hover:!bg-white/20">
              查看案例
            </CTAButton>
          </div>
        </div>
      </section>

      <JsonLd data={[buildWebPage({ url: '/solutions', name: 'FlyAI 行业解决方案' }),
          buildService('FlyAI 行业 GEO 方案', '按 B2B SaaS、出海品牌、内容团队、代理商划分的 GEO 解决方案'),
          buildBreadcrumbList(crumbs), buildFAQPage(faqItems)]} />
    </div>
  );
}
