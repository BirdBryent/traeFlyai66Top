import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import RelatedLinks from '@/components/RelatedLinks';
import CitedSources, { SOURCES } from '@/components/CitedSources';
import CTAButton from '@/components/CTAButton';
import JsonLd from '@/components/JsonLd';
import HomeCapabilities from '@/components/HomeCapabilities';
import HomePainPoints from '@/components/HomePainPoints';
import {
  buildFAQPage,
  buildBreadcrumbList,
  isAuthorityLink,
  FAQItem,
  buildWebPage,
  buildService,
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
      <Breadcrumb items={[{ label: '首页', href: '/' }]} jsonLdOnly />

      <PageHero
        center
        h1={[
          'FlyAI 生成式引擎优化（GEO）',
          '让 AI 搜索答案优先引用你的品牌',
        ] as const}
        lead="FlyAI 通过 AI 可见性诊断、内容结构化改造、Schema.org JSON-LD 与 llms.txt 自动生成、以及全平台引用提及监测四项核心能力，帮助 B2B SaaS、出海品牌与内容团队在 DeepSeek、豆包、千问、Google AIO 等生成式引擎的答案中获得稳定、准确、高权重的品牌引用，解决「传统 SEO 做得再好但 AI 搜不到、搜不到完整信息、品牌被张冠李戴」的增长缺口。FlyAI 服务覆盖从首屏首段直达答案改造、FAQ 抽取、实体命名一致性治理，到 12+ 生成式引擎引用持续追踪的完整闭环，让你的每一页内容都能被 AI 正确理解、作为事实来源稳定引用。"
        ctaPrimary={{ text: '免费诊断', href: '/contact' }}
        ctaSecondary={{ text: '查看产品', href: '/product' }}
        bgImage={{
          src: '/images/home-hero-bg.png',
          alt: 'FlyAI 首页主视觉：蓝紫色科技渐变背景，象征生成式引擎优化的 AI 智能网格',
        }}
      />

      <HomeCapabilities />

      <HomePainPoints />

      <p className="mx-auto max-w-4xl px-5 text-base leading-relaxed text-gray-700 lg:px-8">
        生成式引擎优化的实证依据来自 KDD 2024 论文 <a href={SOURCES.geoPaper.url} target="_blank" rel="noopener noreferrer nofollow" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">《GEO: Generative Engine Optimization》</a>：其中「引文添加」「统计数据添加」「来源引用」三种改写手法在 GEO-bench 上分别带来约 41%、37%、30% 的可信度/可见度提升，而关键词堆砌无效。
      </p>
      <CitedSources items={[SOURCES.geoPaper, SOURCES.cacAiRule, SOURCES.stanfordAiIndex]} />
      <RelatedLinks path="/" />
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
          buildWebPage({ url: '/', name: 'FlyAI 官网首页' }),
          buildService('FlyAI GEO 服务', 'AI 搜索可见性诊断、内容结构化、Schema 与 llms.txt 生成、引用与提及监测'),
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
