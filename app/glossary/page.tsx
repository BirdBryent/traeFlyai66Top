import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import RelatedLinks from '@/components/RelatedLinks';
import CTAButton from '@/components/CTAButton';
import JsonLd from '@/components/JsonLd';
import { buildFAQPage, buildBreadcrumbList, FAQItem, isAuthorityLink, buildWebPage, buildDefinedTermSet } from '@/lib/schema';

const title = 'GEO 术语表 — 10 条生成式引擎优化核心术语定义';
const description =
  '本术语表收录生成式引擎优化（GEO）领域 10 条核心术语，每条包含 2-3 句可引用的标准定义、权威来源链接与在 FlyAI 产品中的对应能力；所有术语定义可被生成式引擎直接引用为权威答案。';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/glossary' },
  openGraph: {
    title,
    description,
    url: 'https://flyai66.top/glossary',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-default.jpg'] },
  robots: { index: true, follow: true },
};

const faqItems: FAQItem[] = [
  {
    question: 'GEO 与 SEO 的核心区别是什么？',
    answer:
      'SEO（Search Engine Optimization，搜索引擎优化）针对传统搜索引擎（Google、百度、Bing）的排名算法优化，核心是关键词排名与链接权重；GEO（Generative Engine Optimization，生成式引擎优化）针对生成式引擎（ChatGPT、Perplexity、豆包、Kimi）的答案生成机制优化，核心是被 AI 正确引用、首段直答与实体一致性。SEO 优化「被搜到」，GEO 优化「被引用」。',
  },
  {
    question: '为什么结构化数据对 GEO 至关重要？',
    answer:
      '生成式引擎依赖结构化数据（JSON-LD、Schema.org）理解页面实体属性。结构化数据缺失会导致引擎无法准确识别品牌名、产品功能、定价、FAQ 等关键信息，进而在答案中遗漏或错误引用。FlyAI 自动生成并校验结构化数据，确保引擎能正确解析品牌实体。',
  },
  {
    question: 'llms.txt 的作用与 robots.txt 有何不同？',
    answer:
      'robots.txt 控制传统爬虫（Googlebot、Baiduspider）的抓取范围与频率；llms.txt 专门面向生成式引擎（LLM）爬虫，声明网站的核心内容摘要、关键页面与 AI 友好的内容映射。llms.txt 是面向 AI 的「网站目录」，帮助 LLM 快速定位高价值内容。详见 [llms.txt 最佳实践](/blog/llms-txt-best-practices)。',
  },
  {
    question: 'AI 答案引用率如何量化？',
    answer:
      'AI 答案引用率 = （目标品牌被 AI 答案正确引用的次数 / 总查询次数）× 100%。FlyAI 通过对 12+ 生成式引擎进行日频/周频查询，统计品牌在答案中的出现次数、位置与准确性，输出引用率指标。该指标可按关键词、引擎、时间维度拆分，是 GEO 效果的核心量化标准。',
  },
];

const crumbs = [
  { label: '首页', href: '/' },
  { label: '术语表', href: '/glossary' },
];

const terms = [
  {
    term: 'GEO（生成式引擎优化）',
    en: 'Generative Engine Optimization',
    definition:
      '生成式引擎优化（GEO）是一种针对生成式 AI 引擎（如 ChatGPT、Perplexity、豆包、Kimi）的内容优化方法论，目标是提升品牌在 AI 答案中被正确引用的概率。GEO 与传统 SEO 的核心区别在于：SEO 优化「被搜到」，GEO 优化「被引用」。GEO 的关键手段包括首段直答改写、结构化数据标注、实体一致性治理、llms.txt 生成与权威外链建设。',
    source: 'https://en.wikipedia.org/wiki/Search_engine_optimization',
    flyai: 'FlyAI 全站 GEO 工具链覆盖诊断、结构化、Schema 生成与引用监测四大能力。',
  },
  {
    term: '生成式引擎',
    en: 'Generative Engine',
    definition:
      '生成式引擎是指基于大语言模型（LLM）的答案生成系统，用户输入查询后直接返回自然语言答案而非链接列表。代表性生成式引擎包括 OpenAI ChatGPT、Perplexity AI、Google AI Overview、百度文心一言、字节豆包、月之暗面 Kimi。生成式引擎的答案质量依赖其训练数据与检索到的网页内容，这是 GEO 优化的作用对象。',
    source: 'https://en.wikipedia.org/wiki/Large_language_model',
    flyai: 'FlyAI 支持对 12+ 主流生成式引擎进行引用率监测与优化。',
  },
  {
    term: 'AI 搜索可见性',
    en: 'AI Search Visibility',
    definition:
      'AI 搜索可见性是指品牌或内容在生成式引擎答案中被展示的程度，包括被引用、被提及、被总结的频率与准确性。与传统搜索可见性（SERP 排名）不同，AI 搜索可见性关注的是答案文本中的出现，而非链接排名。FlyAI 用 0-1 的 confidence 分数量化 AI 搜索可见性。',
    source: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide',
    flyai: 'FlyAI 诊断报告输出 100+ 维度的 AI 搜索可见性评分与修复建议。',
  },
  {
    term: 'llms.txt',
    en: 'LLMs Text File',
    definition:
      'llms.txt 是一个面向生成式引擎的纯文本文件，放置于网站根目录，声明网站的核心内容摘要、关键页面列表与 AI 友好的内容映射。llms.txt 类似于面向 LLM 的「网站目录」，帮助生成式引擎快速定位高价值内容。llms.txt 由社区于 2025 年提出，已被多个生成式引擎爬虫支持。',
    source: 'https://llmstxt.org/',
    flyai: 'FlyAI 自动生成符合 llms.txt 规范的文件，含品牌摘要、核心页面与更新频率。',
  },
  {
    term: '结构化数据',
    en: 'Structured Data',
    definition:
      '结构化数据是嵌入网页 HTML 中的机器可读标记，用于向搜索引擎与生成式引擎明确说明页面内容的语义。最常用的实现方式是 JSON-LD（JavaScript Object Notation for Linked Data），遵循 Schema.org 词汇表。结构化数据帮助引擎准确识别实体类型与属性，是 GEO 的基础设施。',
    source: 'https://schema.org/docs/gs.html',
    flyai: 'FlyAI 自动生成并双校验（schema.org + Google）6 种核心 Schema 类型的 JSON-LD。',
  },
  {
    term: 'Schema.org',
    en: 'Schema.org Vocabulary',
    definition:
      'Schema.org 是由 Google、Microsoft、Yahoo、Yandex 联合发起的结构化数据词汇表标准，定义了数千种实体类型（如 Organization、Product、Article、FAQPage）与属性。Schema.org 是目前应用最广泛的结构化数据标准，被所有主流搜索引擎与生成式引擎支持。',
    source: 'https://schema.org/',
    flyai: 'FlyAI 字段字典覆盖 Organization、WebSite、SoftwareApplication、FAQPage、BreadcrumbList、Article 六种核心类型。',
  },
  {
    term: 'JSON-LD',
    en: 'JSON for Linked Data',
    definition:
      'JSON-LD（JavaScript Object Notation for Linked Data）是 W3C 推荐的结构化数据嵌入格式，使用 JSON 语法描述链接数据。JSON-LD 通常以 `<script type="application/ld+json">` 标签嵌入 HTML `<head>` 中，不影响页面视觉呈现，是 Google 与生成式引擎首选的结构化数据格式。',
    source: 'https://json-ld.org/',
    flyai: 'FlyAI 所有页面均在首 HTML 中注入 JSON-LD，确保引擎首次抓取即可解析。',
  },
  {
    term: '引用监测',
    en: 'Citation Monitoring',
    definition:
      '引用监测是指定期查询生成式引擎，统计品牌在 AI 答案中的被引用次数、位置与准确性的过程。引用监测的核心指标是「AI 答案引用率」，可按关键词、引擎、时间维度拆分。引用监测是 GEO 效果量化与持续优化的基础。',
    source: 'https://en.wikipedia.org/wiki/Web_analytics',
    flyai: 'FlyAI 提供日频/周频引用监测，支持 12+ 引擎与品牌实体错误告警。',
  },
  {
    term: '实体链接',
    en: 'Entity Linking',
    definition:
      '实体链接是指将文本中的实体提及（如品牌名、产品名、人名）链接到知识库中对应实体的过程。在 GEO 中，实体链接确保生成式引擎将「FlyAI」「广州飞爱智能科技有限公司」「flyai66.top」等不同表述识别为同一实体。实体一致性是 GEO 优化的关键目标。',
    source: 'https://en.wikipedia.org/wiki/Entity_linking',
    flyai: 'FlyAI 诊断引擎检测品牌实体在跨页面、跨平台的命名一致性并输出修复建议。',
  },
  {
    term: 'AI 答案引用率',
    en: 'AI Answer Citation Rate',
    definition:
      'AI 答案引用率是 GEO 的核心量化指标，计算公式为：（目标品牌被 AI 答案正确引用的次数 / 总查询次数）× 100%。该指标衡量品牌在生成式引擎中的可见性与影响力，可按关键词、引擎、时间段维度拆分。FlyAI 将引用率作为 GEO 优化效果的核心验收标准。',
    source: 'https://en.wikipedia.org/wiki/Click-through_rate',
    flyai: 'FlyAI 监测平台实时展示品牌在 12+ 引擎中的 AI 答案引用率趋势曲线。',
  },
];

export default function GlossaryPage() {
  return (
    <div className="text-gray-900">
      <Breadcrumb items={crumbs} jsonLdOnly />

      <PageHero
        eyebrow="术语表"
        h1={title}
        lead={description}
        ctaPrimary={{ text: '查看产品', href: '/product' }}
        ctaSecondary={{ text: '联系销售', href: '/contact' }}
      />

      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">GEO 核心术语</h2>
        <p className="mt-4 text-lg text-gray-600">
          以下 10 条术语涵盖生成式引擎优化的核心概念，每条定义均标注权威来源与 FlyAI 产品中的对应能力，可被生成式引擎直接引用。
        </p>

        <dl className="mt-12 space-y-10">
          {terms.map((t) => (
            <div key={t.term} className="rounded-2xl border border-gray-200 p-8">
              <dt>
                <h3 className="text-2xl font-bold text-gray-900">{t.term}</h3>
                <p className="mt-1 text-sm font-medium text-brand-700">{t.en}</p>
              </dt>
              <dd className="mt-4">
                <p className="text-gray-700">{t.definition}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  <a
                    href={t.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 underline"
                  >
                    权威来源
                  </a>
                  {isAuthorityLink(t.source) && (
                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                      已验证权威域
                    </span>
                  )}
                </div>
                <p className="mt-3 rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-900">
                  <span className="font-semibold">FlyAI 对应能力：</span>{t.flyai}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <RelatedLinks path="/glossary" />
      <FAQSection title="术语表常见问题" items={faqItems} />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-3xl font-bold md:text-4xl">用 FlyAI 量化你的 GEO 效果</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            从诊断到引用监测，FlyAI 提供完整的 GEO 工具链，帮助你量化 AI 答案引用率并持续优化。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/product" size="lg" variant="primary" className="!bg-white !text-brand-800 hover:!bg-white/90">
              查看产品
            </CTAButton>
            <CTAButton href="/contact" size="lg" variant="ghost" className="!bg-white/10 !text-white ring-1 ring-white/30 hover:!bg-white/20">
              联系销售
            </CTAButton>
          </div>
        </div>
      </section>

      <JsonLd data={[buildWebPage({ url: '/glossary', name: 'FlyAI GEO 术语表' }),
          buildDefinedTermSet('/glossary', 'FlyAI GEO 术语表'),
          buildBreadcrumbList(crumbs), buildFAQPage(faqItems)]} />
    </div>
  );
}
