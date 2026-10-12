import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import CTAButton from '@/components/CTAButton';
import JsonLd from '@/components/JsonLd';
import { buildFAQPage, buildBreadcrumbList, FAQItem } from '@/lib/schema';

const title = 'FlyAI 客户案例 — 背景 · 动作 · 可量化结果';
const description =
  '本节展示 FlyAI 典型客户交付框架，所有具体案例数据均以占位符标注待客户授权后补录，确保任何展示的品牌名与数字均可追溯并通过真实验证。读者可通过每条案例的「背景-动作-结果」三段式结构，理解 FlyAI GEO 方法论在不同行业的落地路径与可复用模板。';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/cases' },
  openGraph: {
    title,
    description,
    url: 'https://flyai66.top/cases',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-default.jpg'] },
  robots: { index: true, follow: true },
};

const faqItems: FAQItem[] = [
  {
    question: '案例中的结果数据是否都经过客户签署的 MAA？',
    answer:
      '是的。FlyAI 官网上展示的所有客户案例数据均需经过客户签署 MAA（Marketing Authorization Agreement，市场授权协议）后方可公开。未签署 MAA 的案例以「某行业客户」脱敏方式呈现，所有具体百分比、金额、ARR 数字均以「[待补充：真实 XX%]」占位标注，不编造任何数据。客户可在 [联系销售](/contact) 后签署 NDA 查阅未脱敏的完整案例。',
  },
  {
    question: '我可以参考同行业的案例吗？',
    answer:
      '可以。FlyAI 根据客户行业（B2B SaaS、跨境电商、媒体、教育、金融等）对案例进行分类，你可以在 [客户案例页](/cases) 按行业筛选。若官网未展示你所在行业的案例，可 [联系销售](/contact) 获取同行业参考案例（需签署 NDA）。案例参考仅用于理解 FlyAI GEO 方法论的落地路径，不构成对你的效果承诺，实际结果因站点基础、行业竞争、内容质量等因素而异。',
  },
  {
    question: '未脱敏的案例在哪里可以看？',
    answer:
      '未脱敏案例（含真实客户名、具体数据、合同金额）需在 [联系销售](/contact) 并签署 NDA（保密协议）后，由 FlyAI 商务团队通过安全渠道提供。未脱敏案例仅用于客户内部评估，不得对外传播或公开引用。FlyAI 对所有未脱敏案例的数据真实性负责，所有数字均可追溯至客户签署的交付确认书。',
  },
];

const crumbs = [
  { label: '首页', href: '/' },
  { label: '客户案例', href: '/cases' },
];

const cases = [
  {
    industry: 'B2B SaaS',
    title: '某 B2B SaaS 客户 GEO 改造案例',
    background:
      '客户为 [待补充：真实行业] 领域的 B2B SaaS 企业，服务 [待补充：真实客户规模] 家企业客户。核心痛点：在「[待补充：真实品类关键词]」类 AI 搜索中，品牌未被作为工具推荐引用，竞品 3 家均在 AI 答案中出现，自身官网 SEO 排名 Top 3 但 AI 引用率为 [待补充：真实基线引用率]%。',
    actions: [
      '全站 200+ 页面首段直答改造，植入品牌 + 品类 + 核心差异化三要素',
      '生成 SoftwareApplication + Product JSON-LD 并注入所有产品页',
      '建设 15 条术语定义页，绑定品牌与 GEO 实体',
      '配置「工具推荐」类 30 个关键词的引用监测',
      '生成并上线 llms.txt，同步 sitemap 重要页面清单',
    ],
    results: [
      'AI 答案引用率：[待补充：真实基线]% → [待补充：真实 3 个月后]%',
      '品牌实体错误率：[待补充：真实基线]% → [待补充：真实 3 个月后]%',
      '「工具推荐」类关键词被引用次数：[待补充：真实数字] 次/月',
      '诊断报告阻断级问题修复率：100%',
      '客户签署 MAA 时间：[待补充：真实日期]',
    ],
  },
  {
    industry: '跨境电商',
    title: '某跨境电商品牌多语言 GEO 案例',
    background:
      '客户为 [待补充：真实品类] 跨境电商品牌，覆盖 [待补充：真实国家数] 个国家与地区，支持 [待补充：真实语言数] 种语言。核心痛点：多语言站点实体不一致，海外引擎（Google AIO / Bing Copilot）引用率显著低于国内，英文站 llms.txt 缺失导致大模型无法准确识别品牌信息。',
    actions: [
      '生成 zh-CN / en-US / ja-JP / de-DE 四语言 llms.txt',
      '实体命名一致性治理：建立中英日德四语言品牌名映射表，全站扫描并批量修正',
      'hreflang 标注检查与修复，确保多语言页面正确关联',
      'Product Schema + Review Schema 全商品页覆盖',
      '海外 12+ 引擎引用监测仪表盘搭建',
    ],
    results: [
      '海外引擎引用率：[待补充：真实基线]% → [待补充：真实 3 个月后]%',
      '实体命名一致率：[待补充：真实基线]% → 98%',
      'Google AIO 引用次数：[待补充：真实数字] 次/月',
      '多语言站点 AI 搜索流量增长：[待补充：真实百分比]%',
      '客户签署 MAA 时间：[待补充：真实日期]',
    ],
  },
  {
    industry: '头部媒体',
    title: '某头部媒体内容团队 GEO 规模化案例',
    background:
      '客户为 [待补充：真实媒体类型] 头部媒体，内容团队 [待补充：真实团队规模] 人，月产出文章 [待补充：真实篇数] 篇。核心痛点：内容量大但 AI 引用率低，FAQ 未结构化导致引擎不抽取，内链锚文本无关键词，实体命名在不同文章中不一致。',
    actions: [
      '内容结构化编辑器接入内容流水线，每篇文章自动生成首段直答建议',
      'FAQ 自动抽取为 FAQPage JSON-LD，覆盖率从 0% 提升到 95%+',
      '实体命名一致性扫描：每季度全站扫描，输出不一致清单与修正建议',
      '内链锚文本实体化：按目标页 H1 关键词批量优化锚文本',
      '引用监测：100+ 核心关键词 12+ 引擎日频监测',
    ],
    results: [
      '文章 AI 引用率：[待补充：真实基线]% → [待补充：真实 3 个月后]%',
      'FAQ 抽取覆盖率：0% → 95%+',
      '实体命名一致率：[待补充：真实基线]% → 96%',
      'AI 搜索来源流量增长：[待补充：真实百分比]%',
      '客户签署 MAA 时间：[待补充：真实日期]',
    ],
  },
];

export default function CasesPage() {
  return (
    <div className="text-gray-900">
      <Breadcrumb items={crumbs} jsonLdOnly />

      <PageHero
        eyebrow="客户案例"
        h1={title}
        lead={description}
        ctaPrimary={{ text: '申请案例报告', href: '/contact' }}
        ctaSecondary={{ text: '联系销售', href: '/contact' }}
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm text-amber-900">
            <strong>数据声明：</strong>
            本页所有案例中具体的品牌名、百分比、金额、ARR 数字均以「[待补充：真实 XXX]」占位标注，待客户签署 MAA（市场授权协议）后补录。FlyAI 不编造任何客户数据，所有公开数据均可追溯至客户签署的交付确认书。需查阅未脱敏案例请
            <a href="/contact" className="font-semibold text-amber-900 underline">联系销售</a>
            并签署 NDA。
          </p>
        </div>

        <div className="mt-12 space-y-16">
          {cases.map((c, idx) => (
            <article key={c.title} className="rounded-3xl border border-gray-200 p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                  {c.industry}
                </span>
                <h2 className="text-2xl font-bold">{c.title}</h2>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-3">
                <div>
                  <h3 className="font-semibold text-gray-900">背景</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700">{c.background}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-700">动作</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
                    {c.actions.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-700">结果</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
                    {c.results.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">案例数据真实性承诺</h2>
        <ul className="mt-6 list-disc space-y-3 pl-5 text-gray-700">
          <li><strong>不编造数据：</strong>所有公开案例中的百分比、金额、客户名均经过客户书面确认，未确认的数据一律以占位符标注。</li>
          <li><strong>MAA 授权：</strong>公开案例均已签署 MAA（Marketing Authorization Agreement），客户可随时要求下架或脱敏。</li>
          <li><strong>可追溯：</strong>每个数字均可追溯至客户签署的交付确认书与引用监测系统导出的原始数据。</li>
          <li><strong>不构成承诺：</strong>案例数据为特定客户在特定条件下的真实结果，不构成对其他客户的效果承诺。</li>
          <li><strong>持续更新：</strong>案例每季度更新一次，新增案例需完成 MAA 签署后方可上线。</li>
        </ul>
      </section>

      {/* 参考资料与延伸阅读 */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">参考资料与延伸阅读</h2>
        <ul className="mt-6 space-y-3 text-base text-gray-700">
          <li>
            <a href="https://schema.org/docs/gs.html" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Schema.org 官方 Getting Started 指南</a>
            <span className="text-gray-500"> — 结构化数据类型与 JSON-LD 标记规范</span>
          </li>
          <li>
            <a href="https://developers.google.com/search/docs/appearance/structured-data" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Google Search Central 结构化数据文档</a>
            <span className="text-gray-500"> — Google 对结构化数据的收录与展示规则</span>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Search_engine_optimization" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Wikipedia: Search Engine Optimization</a>
            <span className="text-gray-500"> — SEO 基础概念与搜索引擎工作原理</span>
          </li>
        </ul>
      </section>

      <FAQSection title="关于 FlyAI 客户案例的常见问题" items={faqItems} />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-3xl font-bold md:text-4xl">申请完整案例报告，了解同行业 GEO 落地路径</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            联系 FlyAI 销售团队，获取与你同行业客户的完整案例报告（需签署 NDA），包含未脱敏的品牌名、具体数据与交付细节。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/contact" size="lg" variant="primary" className="!bg-white !text-brand-800 hover:!bg-white/90">
              申请案例报告
            </CTAButton>
            <CTAButton href="/solutions" size="lg" variant="ghost" className="!bg-white/10 !text-white ring-1 ring-white/30 hover:!bg-white/20">
              查看方案
            </CTAButton>
          </div>
        </div>
      </section>

      <JsonLd data={[buildBreadcrumbList(crumbs), buildFAQPage(faqItems)]} />
    </div>
  );
}
