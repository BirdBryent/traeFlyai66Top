import { buildMetadata } from '@/lib/metadata';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import RelatedLinks from '@/components/RelatedLinks';
import CitedSources, { SOURCES } from '@/components/CitedSources';
import CTAButton from '@/components/CTAButton';
import JsonLd from '@/components/JsonLd';
import {
  buildBreadcrumbList,
  isAuthorityLink,
  FAQItem,
  buildWebPage,
} from '@/lib/schema';

const title = 'FlyAI GEO 产品功能 — AI 搜索可见性诊断 · 内容结构化 · Schema 与 llms.txt 生成 · 引用监测';
/** H1 展示用：单行；title 字符串仍原样喂给 metadata，不动 SEO */
const h1 = 'FlyAI GEO 产品功能';
const description =
  'FlyAI GEO 是 FlyAI（广州飞爱智能科技有限公司）旗下首个产品，覆盖 GEO 全流程：AI 搜索可见性诊断引擎 5 分钟扫描全站抓取漏洞；内容结构化编辑器将 Markdown/富文本转为引擎友好实体标注；Schema 与 llms.txt 生成器一键对齐 schema.org 与 LLM 抓取协议；引用与提及监测面板实时追踪品牌在 12+ 生成式引擎中的被引用次数与准确度。';

export const metadata = buildMetadata({ title, description, path: '/product' });

const faqItems: FAQItem[] = [
  {
    question: 'FlyAI 的 AI 搜索可见性诊断报告具体包含哪些指标？',
    answer:
      '诊断报告按 6 大类输出共 100+ 维度：①抓取可达性（robots/sitemap/llms.txt 是否齐备、抓取状态码、首字节 TTFB、渲染后 DOM 的 H1/H2 数量）；②首段直达答案（首段字符数、是否在 3 句内出现品牌+品类实体、是否含营销套话扣分）；③结构化数据完整性（FAQPage/Article/BreadcrumbList/Product 等类型覆盖率、字段填充率、JSON.parse 通过率）；④实体一致性（品牌名/产品名/域名/CEO/公司全称在站内与外部引用的一致率）；⑤权威外链（.gov/.edu/arXiv/ACM/Nature 等域名的外链数与锚文本分布）；⑥引用基线（在 DeepSeek/Google AIO/豆包/千问等 5 个目标引擎中，针对 10 个核心关键词的当前答案引用情况快照）。每项指标给出严重程度（阻断/高/中/低）与可操作修复建议，并附优先级排序。具体指标口径以 [联系销售](/contact) 出具的最新版说明书为准。',
  },
  {
    question: 'FlyAI 生成的 Schema.org JSON-LD 如何注入到现有网站？',
    answer:
      'FlyAI 提供三种注入路径，可按你的技术栈选择：① SaaS 控制台导出 JSON-LD 片段，由内容或前端同学复制粘贴到对应页面的 <head> 中，适合无工程资源的小团队；② 通过 FlyAI REST API（详见 [产品文档 API 参考](/docs/api-reference)）在内容发布流水线中自动生成并写入 CMS 字段，适合有工程团队的客户；③ 对使用 Next.js / Nuxt / Astro 等现代框架的站点，提供 SDK 在服务端渲染阶段注入，确保首 HTML 即包含结构化数据。所有生成的 JSON-LD 均通过 [schema.org 官方校验器](https://validator.schema.org/) 与 [Google 富结果测试](https://search.google.com/test/rich-results) 在线校验，不会破坏页面渲染。',
  },
  {
    question: 'llms.txt 和 robots.txt 同时配置会冲突吗？',
    answer:
      '不会冲突，二者职责互补。robots.txt 是面向传统爬虫（Googlebot/Baiduspider 等）的抓取许可协议，控制「是否允许抓取某路径」；llms.txt 是面向生成式引擎与大语言模型的站点说明文件，用于声明「哪些页面可以被作为训练/检索语料、重要页面清单、实体属性、AI 阅读注意事项」。FlyAI 生成的 llms.txt 会自动引用 sitemap.xml 中的 URL，并在「限制说明」段明确标注不允许被 LLM 抓取的路径（与 robots.txt 的 Disallow 保持一致，避免信息差）。你可以在 [产品文档 llms.txt 字段说明](/docs/schema-fields) 查看完整字段定义与冲突处理规则。',
  },
  {
    question: '引用与提及监测面板的数据多久刷新一次？',
    answer:
      'FlyAI 引用与提及监测面板提供三档刷新频率：①实时监测（每 15 分钟抓取一次 12+ 引擎的目标关键词答案，用于上线首周的密集观测）；②日频监测（每日 02:00 GMT+8 全量抓取，日常运营默认档位）；③周频监测（每周一全量抓取，用于季度复盘）。每次抓取记录答案原文、是否引用品牌、引用位置（首段/中段/尾段）、引用链接是否为官方域名、品牌实体是否被张冠李戴。所有历史快照可按周/月导出 CSV，用于向管理层汇报 GEO 提升曲线。具体配额与刷新档位以 [查看定价](/pricing) 的套餐说明为准。',
  },
  {
    question: '诊断报告里的「站内链接」为什么会显示为 0？',
    answer:
      '诊断工具只统计带完整域名的链接（如 https://www.flyai66.top/product），相对路径（`href="/product"`）不计入；站点导航多用相对路径时就会显示为 0，这是统计口径，不代表页面没有内链。',
  },
  {
    question: '注入结构化数据会影响页面渲染或现有 SEO 吗？',
    answer:
      '不会。JSON-LD 是 `<script type="application/ld+json">` 数据块，不参与渲染、不改变视觉样式；回滚只需删除该 script 块。',
  },
];

const crumbs = [
  { label: '首页', href: '/' },
  { label: 'FlyAI GEO 产品', href: '/product' },
];

export default function ProductPage() {
  return (
    <div className="text-gray-900">
      <Breadcrumb items={crumbs} jsonLdOnly />

      <PageHero
        center
        eyebrow="产品功能"
        h1={h1}
        lead={description}
        ctaPrimary={{ text: '预约演示', href: '/contact' }}
        ctaSecondary={{ text: '查看定价', href: '/pricing' }}
        bgImage={{
          src: '/images/home-hero-bg.png',
          alt: 'FlyAI 页面主视觉：蓝紫色科技渐变背景，象征生成式引擎优化的 AI 智能网格',
        }}
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center">FlyAI GEO 四项核心产品能力</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-gray-600">
          覆盖生成式引擎优化从「发现问题」到「持续追踪」的完整闭环：每一项能力均按「典型问题 → FlyAI GEO 做法 → 可量化结果」三段式呈现，便于团队快速评估投入产出。
        </p>
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-gray-500">
          FlyAI GEO 由{' '}
          <Link href="/about" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">
            FlyAI（广州飞爱智能科技有限公司）
          </Link>{' '}
          研发与运营，是 FlyAI 旗下首个产品。
        </p>

        <div className="mt-12 space-y-16">
          {/* 能力 1 */}
          <article id="visibility-diagnosis" className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8" aria-labelledby="cap-1">
            <h3 id="cap-1" className="text-2xl font-bold">1. AI 搜索可见性诊断引擎</h3>
            <div className="mt-6 grid gap-8 md:grid-cols-3">
              <div>
                <h4 className="font-semibold text-brand-700">典型问题</h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                  <li>不确定站点在 DeepSeek / Google AIO 的答案中是否被正确引用</li>
                  <li>SEO 团队交付了排名提升，但 AI 搜索结果里品牌名被张冠李戴</li>
                  <li>首段充斥营销套话，生成式引擎综合时跳过不引用</li>
                  <li>不确定哪些页面缺 JSON-LD、缺 llms.txt、缺 canonical</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-brand-700">FlyAI GEO 做法</h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                  <li>输入 ≤ 500 个 URL 清单，5 分钟内完成全站扫描</li>
                  <li>模拟 12+ 生成式引擎的抓取与综合路径</li>
                  <li>输出 100+ 维度诊断报告 + 修复优先级排序</li>
                  <li>对照 [schema.org 官方校验器](https://validator.schema.org/) 自动校验结构化数据</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-brand-700">可量化结果</h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                  <li>1 份结构化诊断报告（PDF + Markdown）</li>
                  <li>阻断级问题清单（通常 3-8 项）+ 修复工时估算</li>
                  <li>当前 AI 答案引用基线快照（10 关键词 × 5 引擎）</li>
                  <li>1 小时解决方案工程师 1v1 报告讲解</li>
                </ul>
              </div>
            </div>
          </article>

          {/* 能力 2 */}
          <article id="content-structuring" className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8" aria-labelledby="cap-2">
            <h3 id="cap-2" className="text-2xl font-bold">2. 内容结构化编辑器</h3>
            <div className="mt-6 grid gap-8 md:grid-cols-3">
              <div>
                <h4 className="font-semibold text-brand-700">典型问题</h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                  <li>已有大量 Markdown / 富文本内容，但首段非直答、实体未标注</li>
                  <li>内容团队不懂 JSON-LD 字段，写出的 FAQ 无法被引擎抽取</li>
                  <li>同一实体在不同页面命名不一致（FlyAI / 飞爱 / flyai66）</li>
                  <li>内链锚文本无关键词，引擎无法建立实体关联</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-brand-700">FlyAI GEO 做法</h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                  <li>导入 Markdown / 富文本，一键生成首段直答改写建议</li>
                  <li>实体命名一致性检查 + 全站批量替换建议</li>
                  <li>FAQ 自动抽取为 FAQPage JSON-LD</li>
                  <li>内链锚文本实体化建议（锚文本 = 目标页 H1 关键词）</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-brand-700">可量化结果</h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                  <li>首段直答覆盖率从基线提升到目标值（按套餐配额）</li>
                  <li>实体命名一致率 ≥ 95%</li>
                  <li>FAQPage JSON-LD 覆盖率 ≥ 90%</li>
                  <li>内链锚文本实体化率 ≥ 80%</li>
                </ul>
              </div>
            </div>
          </article>

          {/* 能力 3 */}
          <article id="schema-llms" className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8" aria-labelledby="cap-3">
            <h3 id="cap-3" className="text-2xl font-bold">3. Schema.org 与 llms.txt 生成器</h3>
            <div className="mt-6 grid gap-8 md:grid-cols-3">
              <div>
                <h4 className="font-semibold text-brand-700">典型问题</h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                  <li>不知道该用哪些 Schema 类型，字段填不全</li>
                  <li>llms.txt 听说过但不知道怎么写、放哪</li>
                  <li>生成的 JSON-LD 上线后被校验器报错</li>
                  <li>多语言站点的 llms.txt 与 robots 不一致</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-brand-700">FlyAI GEO 做法</h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                  <li>支持 5+1 类 Schema：Organization / WebSite / SoftwareApplication / FAQPage / BreadcrumbList / Article</li>
                  <li>一键生成符合 [Google 结构化数据规范](https://developers.google.com/search/docs/appearance/structured-data) 的 JSON-LD</li>
                  <li>llms.txt 四段式模板自动填充（摘要 / 重要页面 / AI 阅读笔记 / 限制说明）</li>
                  <li>多语言站点自动生成 zh-CN / en 双份 llms.txt</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-brand-700">可量化结果</h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                  <li>JSON-LD 校验通过率 100%（schema.org + Google 双校验）</li>
                  <li>llms.txt 自动同步 sitemap URL 清单</li>
                  <li>Schema 类型覆盖率按页面类型达标</li>
                  <li>上线后 [Google Search Console](https://search.google.com/search-console) 增强报告可观测</li>
                </ul>
              </div>
            </div>
          </article>

          {/* 能力 4 */}
          <article id="citation-monitoring" className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8" aria-labelledby="cap-4">
            <h3 id="cap-4" className="text-2xl font-bold">4. 引用与提及监测面板</h3>
            <div className="mt-6 grid gap-8 md:grid-cols-3">
              <div>
                <h4 className="font-semibold text-brand-700">典型问题</h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                  <li>不知道 AI 答案里有没有提到我们的品牌</li>
                  <li>竞品被引用、我们没被引用，但说不出差距在哪</li>
                  <li>改造后效果无法量化，老板问 ROI 答不上</li>
                  <li>某个关键词的 AI 答案突然把品牌名写错了，没人发现</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-brand-700">FlyAI GEO 做法</h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                  <li>覆盖 12+ 生成式引擎（DeepSeek/豆包/千问/Google AIO/Perplexity 等）</li>
                  <li>按关键词、按页面记录答案原文与引用位置</li>
                  <li>品牌实体张冠李戴自动告警</li>
                  <li>引用率、引用位置、引用域名三维仪表盘</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-brand-700">可量化结果</h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                  <li>AI 答案引用率趋势曲线（按周/月）</li>
                  <li>品牌实体错误率告警（≤ 5% 目标）</li>
                  <li>竞品引用对比矩阵</li>
                  <li>可导出 CSV / PDF 用于管理层汇报</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 能力对比表 */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center">四项能力 Before / After 对比</h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 font-semibold">能力模块</th>
                <th className="px-4 py-3 font-semibold">Before（接入 FlyAI 前）</th>
                <th className="px-4 py-3 font-semibold">After（接入 FlyAI 后）</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium">可见性诊断</td>
                <td className="px-4 py-3 text-gray-600">人工逐页检查，无统一口径</td>
                <td className="px-4 py-3 text-gray-600">5 分钟 100+ 维度自动扫描</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium">内容结构化</td>
                <td className="px-4 py-3 text-gray-600">首段套话、实体命名混乱</td>
                <td className="px-4 py-3 text-gray-600">首段直答 + 实体一致率 ≥ 95%</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium">Schema / llms.txt</td>
                <td className="px-4 py-3 text-gray-600">类型缺失、字段报错</td>
                <td className="px-4 py-3 text-gray-600">双校验 100% 通过、自动同步 sitemap</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">引用监测</td>
                <td className="px-4 py-3 text-gray-600">不知道 AI 是否引用了品牌</td>
                <td className="px-4 py-3 text-gray-600">12+ 引擎实时引用率趋势 + 告警</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <CitedSources
        title="方法论实证依据"
        lead={
          <>
            FlyAI GEO 的产品设计以生成式引擎的检索与综合机制为基础。{' '}
            <a href={SOURCES.rag.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">《Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks》</a> 系统阐述了 RAG 的检索-综合两阶段架构，而{' '}
            <a href={SOURCES.longContext.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">《Lost in the Middle》</a> 则解释了为何首段直达答案对被引用至关重要。
          </>
        }
        items={[SOURCES.geoPaper, SOURCES.rag, SOURCES.longContext, SOURCES.geoDoi, SOURCES.googleStructuredData, SOURCES.w3cJsonLd]}
      />
      <RelatedLinks path="/product" />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-3xl font-bold md:text-4xl">预约产品演示，30 分钟看清楚 GEO 全流程</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            FlyAI GEO 解决方案工程师将基于你的站点 URL 清单，现场演示诊断报告、内容结构化编辑器、Schema 生成器与引用监测面板的真实操作。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/contact" size="lg" variant="primary" className="!bg-white !text-brand-800 hover:!bg-white/90">
              预约演示
            </CTAButton>
            <CTAButton href="/pricing" size="lg" variant="ghost" className="!bg-white/10 !text-white ring-1 ring-white/30 hover:!bg-white/20">
              查看定价
            </CTAButton>
          </div>
        </div>
      </section>

      <FAQSection title="关于 FlyAI GEO 产品功能的常见问题" items={faqItems} />

      <JsonLd data={[buildWebPage({ url: '/product', name: 'FlyAI GEO 产品功能', aboutProduct: true }),
          buildBreadcrumbList(crumbs)]} />
    </div>
  );
}
