import { buildMetadata } from '@/lib/metadata';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import RelatedLinks from '@/components/RelatedLinks';
import CitedSources, { SOURCES } from '@/components/CitedSources';
import CTAButton from '@/components/CTAButton';
import JsonLd from '@/components/JsonLd';
import { buildBreadcrumbList, FAQItem, buildWebPage } from '@/lib/schema';

const title = 'FlyAI GEO 解决方案 — 外贸跨境 · 工业制造 · ToB SaaS · 本地服务 · 渠道伙伴';
/** H1 展示用：单行；title 字符串仍原样喂给 metadata，不动 SEO */
const h1 = 'FlyAI GEO 解决方案';
/** 首屏 lead：点名五类客户与其抓手；description 仍原样喂 metadata */
const lead =
  'FlyAI GEO 面向外贸与跨境出口企业、工业制造与 B2B 供应商、ToB SaaS 与科技服务、本地服务与连锁门店、渠道伙伴五类客户，分别给出对应的实体基线做法——多语言 llms.txt 与 hreflang、产品型号参数 Schema、SoftwareApplication Schema、LocalBusiness Schema、以及渠道白标交付模板。';
const description =
  'FlyAI GEO 按五类客户给出不同的 GEO 落地方案：外贸与跨境出口企业（让海外买家在 AI 搜索里找到你的工厂/产品，靠多语言 llms.txt 与 hreflang）、工业制造与 B2B 供应商（产品型号参数结构化进 AI 答案）、ToB SaaS 与科技服务（工具推荐场景引用，SoftwareApplication Schema）、本地服务与连锁门店（「附近+推荐」类问答，LocalBusiness Schema）、渠道伙伴（返利与白标 OEM）。每类按「典型痛点 → FlyAI GEO 做法 → 交付物清单」三段式呈现。';

export const metadata = buildMetadata({ title, description, path: '/solutions' });

const faqItems: FAQItem[] = [
  {
    question: 'ToB SaaS 和工业制造企业的 GEO 策略差异在哪？',
    answer:
      'ToB SaaS 的 GEO 重点在「工具推荐」场景：当用户问「有什么 GEO 工具？」时，产品要被作为工具实体准确引用，侧重 SoftwareApplication Schema、功能对比表、术语定义页。工业制造企业的 GEO 重点在「供应商/厂家实体」：当采购方问「XX 材质的厂家有哪些？」时，要被作为可选供应商引用，侧重 Product + additionalProperty（材质、规格、公差、认证、MOQ、交期）、资质与检测报告作为权威外链锚点。两类客户的共性是首段直答与实体一致性，差异在 Schema 类型选择与关键词维度。',
  },
  {
    question: '外贸工厂和做国内站相比，GEO 做法有什么不同？',
    answer:
      '目标引擎与合规要求不同。外贸站主要覆盖 Google AI 概览、Bing Copilot、Perplexity、ChatGPT 类答案，必须先把「Manufacturer / Supplier」做成官方实体基线（Organization + Product 的跨语言同一实体，sameAs 指向官网与阿里国际站、Made-in-China 等平台），并保证每种语言一份 llms.txt、hreflang 标注正确；国内站以 DeepSeek、豆包、千问等为主，还要符合生成式 AI 服务的合规要求。相同点是首段直答与引用监测。',
  },
  {
    question: '多语言站点需要多套 llms.txt 吗？',
    answer:
      '建议为每种语言维护一份独立的 llms.txt，放在对应语言子目录根路径（如 /en/llms.txt、/ja/llms.txt），根目录 llms.txt 作为主索引指向各语言版本。FlyAI GEO 生成器支持多语言模板，自动为 zh-CN、en-US、ja-JP 等生成对应 llms.txt，并在「重要页面」段分别列出各语言核心页面 URL。详见 [产品文档多语言 GEO 指南](/docs/schema-fields)。',
  },
  {
    question: '产品型号很多，怎么能进到 AI 的答案里？',
    answer:
      '核心是把型号参数从 PDF 目录、ERP 里解放成结构化可被抽取的形式：① 每个主推型号一个 Product 页面，含型号名、品类、主参数、适用场景；② 用 additionalProperty 承载材质、规格、公差、认证、MOQ、交期等字段；③ 同一型号在官网、阿里/Made-in-China 店铺、目录 PDF 上的写法保持一致（同一实体同一型号名）；④ 针对「XX 材质/规格哪家能做」「recommended XX supplier」类问法做引用监测。做完这四步，引擎在回答型号级问题时才有可引用的一手数据源，而不是只能引用平台通稿。详见 [产品接入文档](/docs/quickstart)。',
  },
  {
    question: '连锁门店很多，Schema 要每个店做一份吗？',
    answer:
      '需要按门店各做一份 LocalBusiness，并用组织层级把它们串起来：① 门店页各一份 LocalBusiness，含 address、geo 经纬度、telephone、openingHours、areaServed、priceRange；② 总部用 Organization + subOrganization 关联所有门店，避免各店互相稀释实体权重；③ 服务与常见问题用 Service / FAQPage 结构化；④ 每家店针对「XX 附近 + 品类」类问法单独监测引用。FlyAI GEO 提供门店模板，可按 Excel 门店清单批量生成 JSON-LD，具体字段口径见 [字段字典](/docs/schema-fields)。',
  },
  {
    question: '没有专门的开发人员，这些结构化数据能落地吗？',
    answer:
      '可以。结构化数据与 llms.txt 都能以文件形式交付（JSON-LD 片段、llms.txt、Markdown），由市场或运营同学贴入 CMS，或由开发一次性注入流水线，不需要持续改造代码。工厂与门店类客户最常见的做法是：先由 FlyAI GEO 导出模板，门店/产品清单填表后批量生成，再由现有官网维护方一次性上线。',
  },
  {
    question: '代理商有返利或贴牌（OEM）模式吗？',
    answer:
      '有。FlyAI GEO 为代理商提供两种合作模式：① 渠道返利模式：代理商以折扣价采购 FlyAI GEO 套餐加价转售，FlyAI GEO 提供产品、技术支持与品牌物料；② 贴牌（OEM）模式：代理商可使用自有品牌包装 FlyAI GEO 产品，在企业版私有部署基础上替换 Logo、域名与文档。两种模式均需签署渠道合作协议，具体返利比例与 OEM 授权费请 [联系渠道合作团队](mailto:partner@flyai66.top) 获取渠道手册。',
  },
];

const crumbs = [
  { label: '首页', href: '/' },
  { label: '解决方案', href: '/solutions' },
];

const solutions = [
  {
    name: '外贸与跨境出口企业',
    anchor: 'overseas',
    icon: '🌏',
    pain: '面向沿海产业带外贸厂与工贸一体企业：海外买家在 Google AIO、Bing Copilot、ChatGPT 里搜「XX manufacturer / supplier / 工厂」时，答案里出现的是平台页与竞品目录站，自己的工厂官网不被引用；中英文站的公司名、产品名、认证各写一套，引擎无法判定是同一实体；英/西/阿语站缺 llms.txt、hreflang 缺失；投流越来越贵，询盘却越来越多地由 AI 搜索决定。',
    solution: [
      'Manufacturer / Supplier 官方基线：以 Organization + Product 的跨语言同一实体落地（sameAs 指向官网、阿里国际站、Made-in-China、社媒主页）',
      '按买家语种自动生成多语言 llms.txt（zh-CN / en-US / es / ar 等），在「重要页面」段声明主推品类、认证、MOQ、交期',
      'hreflang 标注检查与修复，避免多语言页面互相抢引用',
      '针对「recommended XX manufacturer / supplier」类英文问答做海外引擎引用监测（Google AIO / Bing Copilot / Perplexity / ChatGPT）',
    ],
    deliverables: [
      '中英双语（可扩展多语）llms.txt 各一份',
      '跨语言同一实体映射表（公司名 / 工厂名 / 商标的多语写法）',
      'hreflang 标注修复方案',
      '主推产品 Product Schema（型号、参数、认证、MOQ、交期）',
      '海外引擎引用监测报告（月度）',
    ],
  },
  {
    name: '工业制造与 B2B 供应商',
    anchor: 'manufacturing',
    icon: '🏭',
    pain: '机械、建材、化工、电子元器件类制造企业：型号与参数锁在 PDF 目录和 ERP 里，AI 搜到只能给出泛泛介绍；「XX 材质/公差哪家能做」这类采购问法里被贸易商截流官方不被点名；资质、检测报告、专利散落各处没变成可验证的实体证据；平台店铺与官网写法不一致，同一型号被当成两个产品。',
    solution: [
      '主推型号逐条 Product + additionalProperty 结构化（材质、规格、公差、认证、MOQ、交期）',
      '官网与 B2B 平台（阿里巴巴、慧聪、Made-in-China）之间的实体与型号一致性治理',
      '资质 / 检测报告 / 专利作为权威锚点聚拢到自有页面并建立反向佐证',
      '「XX 供应商 / 厂家推荐」类关键词池建设与引用监测',
      '产品页与询盘页首段直答改造（参数前置，3 句内说清能做什么）',
    ],
    deliverables: [
      '产品型号参数 Schema（按 SKU 批量生成）',
      '「XX 供应商 / 厂家」关键词池与引用监测配置',
      '站内 ↔ B2B 平台实体一致性扫描报告',
      '产品页 / 询盘页首段直答改写清单',
      '产品参数被 AI 引用的准确度月报',
    ],
  },
  {
    name: 'ToB SaaS 与科技服务',
    anchor: 'b2b-saas',
    icon: '⚙️',
    pain: 'ToB SaaS 与科技服务企业：用户在 AI 里问「有什么 GEO / 数据分析 / 协同工具类产品推荐？」时，答案里被列为候选的是竞品，自己的产品不在候选列表；产品页首段是品牌套话，引擎抽不出「能做什么、和谁不一样」；SoftwareApplication Schema 缺失，应用类别、价格、版本、部署方式等结构化字段为空；官网、帮助中心与更新日志对同一功能的说法不统一，品牌与品类实体绑定不上。',
    solution: [
      'SoftwareApplication + Product Schema 自动生成与字段填充（应用类别、操作系统、价格、版本、部署方式）',
      '功能对比页首段直答改造（产品名 + 品类 + 核心差异化 3 要素前置）',
      '术语定义页建设，让引擎把品牌与所在品类实体绑定（与本术语表同套口径）',
      '帮助中心 / 更新日志 / API 文档的结构化与实体一致性治理',
      '「XX 工具推荐」「XX 软件哪个好用」类关键词引用监测（含竞品同框率）',
    ],
    deliverables: [
      'SoftwareApplication / Product JSON-LD（全产品页覆盖）',
      '功能对比表（Before/After 结构化表格）',
      '术语定义页（GEO / AI 搜索可见性等 10+ 术语）',
      '帮助中心与更新日志结构化改造清单',
      '「工具推荐」关键词引用监测报告（月度，含竞品同框率）',
      '首段直答改写建议（按页）',
    ],
  },
  {
    name: '本地服务与连锁门店',
    anchor: 'local-business',
    icon: '📍',
    pain: '装修、口腔、教培、法律、招商加盟类客户：用户问「附近靠谱的口腔诊所 / 装修公司」时，AI 只推荐点评与地图榜单，门店自身页面没有 LocalBusiness Schema，地址、电话、营业时间、覆盖范围不结构化；评价与资质散落在第三方平台；连锁门店之间互相稀释实体，总部与分店在 AI 眼里是两个不相关的主体。',
    solution: [
      '每家门店一份 LocalBusiness（address、geo 经纬度、telephone、openingHours、areaServed、priceRange）',
      '连锁用 Organization + subOrganization 串起总部与全部分店',
      '服务与常见问题用 Service / FAQPage 结构化',
      '把第三方平台的评价、资质反向落到自有页面形成可验证证据',
      '按「XX 附近 + 品类」问法做门店级引用监测',
    ],
    deliverables: [
      'LocalBusiness JSON-LD（按门店，含 geo 与营业时间）',
      '连锁组织层级 Schema（总部 - 分店 parentOrganization）',
      '「XX 附近推荐」关键词群与引用监测配置',
      'Service / FAQPage Schema 与首段直答改写清单',
      '门店级引用基线快照（月度）',
    ],
  },
];

/**
 * 渠道伙伴不参与上方四张「技术交付方案」卡片：
 * 它讲的是合作模式而非 GEO 做法，抽成通栏条后正文四卡 2 列可对齐。
 * anchor 沿用 agency，保证旧链接 /solutions#agency 不失效。
 */
const channel = {
  anchor: 'agency',
  icon: '🤝',
  name: '渠道伙伴（代理商 / 代运营）',
  intro:
    '面向 SEO 服务商、代运营公司与行业代理商：这不是一套技术交付方案，而是把 GEO 打包进你现有客户服务套餐的合作模式。你负责客户关系与交付，FlyAI GEO 提供底层诊断、结构化与监测能力。',
  models: [
    {
      label: '渠道返利',
      text: '以折扣价采购 FlyAI GEO 套餐后加价转售，FlyAI 提供产品、技术支持与品牌物料；折扣按年度采购量阶梯。',
    },
    {
      label: '贴牌 OEM',
      text: '在企业版私有部署基础上使用自有品牌包装，替换 Logo、域名与交付文档，客户侧报告可白标导出。',
    },
  ],
  enablement: [
    '标准化交付物模板库（诊断报告 / Schema / llms.txt）',
    '客户侧报告白标导出',
    '代理商认证培训（季度）',
    '专属渠道经理对接',
  ],
};

/** 决策表：客户类型锚点回跳上方卡片，推荐套餐跳转到定价页 / 联系页 */
const decisionRows = [
  {
    name: '外贸与跨境出口企业',
    anchor: 'overseas',
    goal: '海外买家在 AI 搜索里找到工厂/产品',
    plan: '专业版 / 企业版',
    planHref: '/pricing',
    key: '多语言 llms.txt + hreflang + 跨语言 Organization',
  },
  {
    name: '工业制造与 B2B 供应商',
    anchor: 'manufacturing',
    goal: '型号参数被 AI 准确引用',
    plan: '专业版 / 企业版',
    planHref: '/pricing',
    key: '型号参数 Product Schema + 供应商推荐监测',
  },
  {
    name: 'ToB SaaS 与科技服务',
    anchor: 'b2b-saas',
    goal: '工具推荐场景引用',
    plan: '专业版 / 企业版',
    planHref: '/pricing',
    key: 'SoftwareApplication Schema + 术语页',
  },
  {
    name: '本地服务与连锁门店',
    anchor: 'local-business',
    goal: '「附近 + 推荐」类问答被推荐',
    plan: '启动版 / 专业版',
    planHref: '/pricing',
    key: 'LocalBusiness Schema + 总部-分店组织层级',
  },
  {
    name: '渠道伙伴（代理商 / 代运营）',
    anchor: 'agency',
    goal: 'GEO 服务打包交付',
    plan: '渠道合作 / OEM',
    planHref: '/contact',
    key: '标准化模板 + 白标授权',
  },
];

export default function SolutionsPage() {
  return (
    <div className="text-gray-900">
      <Breadcrumb items={crumbs} jsonLdOnly />

      <PageHero
        center
        eyebrow="解决方案"
        h1={h1}
        lead={lead}
        ctaPrimary={{ text: '联系销售', href: '/contact' }}
        ctaSecondary={{ text: '查看产品', href: '/product' }}
        bgImage={{
          src: '/images/home-hero-bg.png',
          alt: 'FlyAI 页面主视觉：蓝紫色科技渐变背景，象征生成式引擎优化的 AI 智能网格',
        }}
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center">五类典型客户的 GEO 解决方案</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-gray-600">
          前四类为技术交付方案，按「典型痛点 → FlyAI GEO 做法 → 交付物清单」三段式呈现；渠道伙伴为合作模式，单独列在下方。可直接点击分类跳转。
        </p>

        <nav aria-label="方案分类导航" className="mt-6 flex flex-wrap justify-center gap-2">
          {[...solutions, channel].map((s) => (
            <a
              key={s.anchor}
              href={`#${s.anchor}`}
              className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            >
              <span aria-hidden="true" className="mr-1">
                {s.icon}
              </span>
              {s.name}
            </a>
          ))}
        </nav>

        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-2">
          {solutions.map((s) => (
            <article key={s.name} id={s.anchor} className="scroll-mt-24 flex flex-col rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold">
                <span className="mr-2" aria-hidden="true">{s.icon}</span>
                {s.name}
              </h3>
              <div className="mt-6 flex-1 space-y-6">
                <div>
                  <h4 className="font-semibold text-amber-700">典型痛点</h4>
                  <p className="mt-2 text-gray-700">{s.pain}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-brand-700">FlyAI GEO 做法</h4>
                  <ol className="mt-2 list-decimal space-y-2 pl-6 text-gray-700">
                    {s.solution.map((item) => (
                      <li key={item} className="pl-1">{item}</li>
                    ))}
                  </ol>
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

      {/* 渠道伙伴：合作模式而非技术交付方案，通栏呈现，正文四卡回归 2 列对齐 */}
      <section id={channel.anchor} className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-12 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-gray-50/70 p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-bold">
              <span className="mr-2" aria-hidden="true">{channel.icon}</span>
              {channel.name}
            </h3>
            <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
              合作模式 · 非技术交付
            </span>
          </div>
          <p className="mt-4 max-w-4xl text-gray-700">{channel.intro}</p>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <h4 className="font-semibold text-brand-700">两种合作模式</h4>
              <ul className="mt-3 space-y-3">
                {channel.models.map((m) => (
                  <li key={m.label} className="rounded-2xl border border-gray-200 bg-white p-4">
                    <p className="font-semibold text-gray-900">{m.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-700">{m.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">渠道赋能清单</h4>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
                {channel.enablement.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-4">
                <CTAButton href="/contact" size="md" variant="primary">
                  联系销售
                </CTAButton>
                <CTAButton href="/pricing" size="md" variant="soft">
                  查看定价
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center">方案选择决策表</h2>
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
              {decisionRows.map((r, idx) => (
                <tr
                  key={r.name}
                  className={idx === decisionRows.length - 1 ? '' : 'border-b border-gray-100'}
                >
                  <td className="px-4 py-3 font-medium">
                    <a
                      href={`#${r.anchor}`}
                      className="text-gray-900 underline decoration-gray-300 underline-offset-2 hover:text-brand-700 hover:decoration-brand-400"
                    >
                      {r.name}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{r.goal}</td>
                  <td className="px-4 py-3 text-gray-600">
                    <Link
                      href={r.planHref}
                      className="text-gray-900 underline decoration-gray-300 underline-offset-2 hover:text-brand-700 hover:decoration-brand-400"
                    >
                      {r.plan}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{r.key}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CitedSources
        title="方法论实证依据"
        lead={
          <>
            外贸、工业制造、ToB SaaS 与本地服务落地 GEO 的路径差异显著，但底层逻辑一致：让生成式引擎在检索阶段召回你的实体，在综合阶段准确描述你的品牌。{' '}
            <a href={SOURCES.geoPaper.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">GEO 论文</a> 提出的「来源引用」手法与{' '}
            <a href={SOURCES.cacAiRule.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">《生成式人工智能服务管理暂行办法》</a> 对内容合规的要求，共同决定了方案的设计边界。
          </>
        }
        items={[SOURCES.geoPaper, SOURCES.cacAiRule, SOURCES.rag, SOURCES.geoDoi]}
      />
      <RelatedLinks path="/solutions" />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-3xl font-bold md:text-4xl">没找到你的行业？联系销售评估适配方案</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            FlyAI GEO 解决方案专家将在 1 个工作日内根据你的行业、团队规模与 GEO 目标，推荐最合适的方案与套餐组合。
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

      <FAQSection title="关于 FlyAI GEO 解决方案的常见问题" items={faqItems} />

      <JsonLd data={[buildWebPage({ url: '/solutions', name: 'FlyAI GEO 行业解决方案', aboutProduct: true }),
          buildBreadcrumbList(crumbs)]} />
    </div>
  );
}
