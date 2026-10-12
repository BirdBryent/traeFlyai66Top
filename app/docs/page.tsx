import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import CTAButton from '@/components/CTAButton';
import JsonLd from '@/components/JsonLd';
import { buildFAQPage, buildBreadcrumbList, FAQItem } from '@/lib/schema';

const title = 'FlyAI 产品文档 — 接入步骤 · API 参考 · 字段字典';
const description =
  '本产品文档覆盖从 API Key 获取、SDK 接入、REST 接口说明到结构化数据字段字典的完整链路。所有代码示例以 curl 与 TypeScript 双版本呈现，且通过 MDX 静态渲染确保生成式引擎可直接在初始 HTML 中解析参数名与返回结构，无需执行客户端 JavaScript 即可被 AI 抓取。';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/docs' },
  openGraph: {
    title,
    description,
    url: 'https://flyai66.top/docs',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-default.jpg'] },
  robots: { index: true, follow: true },
};

const faqItems: FAQItem[] = [
  {
    question: 'FlyAI API 的速率限制是多少？',
    answer:
      '按套餐不同：启动版不开放 API；专业版 REST API 默认速率为 60 次/分钟、1000 次/天；企业版可协商提升至 600 次/分钟、不限量/天。所有 API 响应头包含 X-RateLimit-Limit、X-RateLimit-Remaining、X-RateLimit-Reset 字段。详细接口规范见 [API 参考](/docs/api-reference)。',
  },
  {
    question: '返回字段中的 confidence 分数是什么含义？',
    answer:
      'confidence 是 FlyAI 诊断引擎对「该页面在生成式引擎中被正确引用的概率」的评分，取值 0-1。评分维度包括首段直答质量、结构化数据完整性、实体一致性、权威外链数量、历史引用率。≥ 0.8 良好，0.5-0.8 需优化，< 0.5 存在阻断级问题。字段定义见 [字段字典](/docs/schema-fields)。',
  },
  {
    question: 'Webhook 签名算法是什么？',
    answer:
      'FlyAI Webhook 使用 HMAC-SHA256 签名，签名密钥在控制台「Webhook 配置」中生成。请求头 X-FlyAI-Signature 格式为 sha256=<hex>，客户端需用相同密钥对 body 计算 HMAC-SHA256 比对。建议同时校验 X-FlyAI-Timestamp（5 分钟内有效）防重放。示例见 [API 参考 Webhook 章节](/docs/api-reference)。',
  },
  {
    question: '沙箱环境和生产环境是否隔离？',
    answer:
      '完全隔离。FlyAI 为每个客户提供独立的沙箱（Sandbox）与生产（Production）环境，二者数据、配额、API Key、域名物理隔离。沙箱用于开发联调，配额宽松不保证 SLA；生产用于线上业务，受 SLA 保障。沙箱 API 调用不计入生产配额。',
  },
];

const crumbs = [
  { label: '首页', href: '/' },
  { label: '产品文档', href: '/docs' },
];

const docsList = [
  {
    href: '/docs/quickstart',
    title: '快速开始',
    desc: '3 步完成 FlyAI 接入：获取 API Key、安装 SDK、调用首个诊断接口。适合首次接入的开发同学。',
    tag: '入门',
    readTime: '约 5 分钟',
  },
  {
    href: '/docs/api-reference',
    title: 'API 参考',
    desc: '诊断 / 结构化 / Schema / 监测 四组 REST 接口的完整说明，含请求参数、响应结构、错误码与 curl 示例。',
    tag: '开发',
    readTime: '约 20 分钟',
  },
  {
    href: '/docs/schema-fields',
    title: '字段字典',
    desc: '30+ Schema.org 字段解释表，覆盖 Organization / WebSite / SoftwareApplication / FAQPage / BreadcrumbList / Article 类型。',
    tag: '参考',
    readTime: '约 15 分钟',
  },
];

export default function DocsListPage() {
  return (
    <div className="text-gray-900">
      <Breadcrumb items={crumbs} jsonLdOnly />

      <PageHero
        eyebrow="产品文档"
        h1={title}
        lead={description}
        ctaPrimary={{ text: '阅读文档', href: '/docs/quickstart' }}
        ctaSecondary={{ text: '联系销售', href: '/contact' }}
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">文档导航</h2>
        <p className="mt-4 text-lg text-gray-600">
          从快速开始到 API 参考与字段字典，FlyAI 文档覆盖接入全流程。所有页面通过 MDX 静态渲染，代码示例直接出现在首 HTML 中，便于生成式引擎解析。
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {docsList.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group flex flex-col rounded-3xl border border-gray-200 p-8 transition hover:border-brand-400 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                  {d.tag}
                </span>
                <span className="text-xs text-gray-400">{d.readTime}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-brand-700">
                {d.title}
              </h3>
              <p className="mt-3 flex-1 text-sm text-gray-600">{d.desc}</p>
              <span className="mt-6 text-sm font-semibold text-brand-700">
                开始阅读 →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">快速开始 3 步概览</h2>
        <ol className="mt-8 space-y-6">
          <li className="flex gap-4">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-600 font-bold text-white">1</span>
            <div>
              <h3 className="font-semibold">获取 API Key</h3>
              <p className="mt-1 text-gray-600">登录 FlyAI 控制台，在「账户设置 → API Key」中生成生产环境密钥。妥善保管，勿提交到 Git 仓库。</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-600 font-bold text-white">2</span>
            <div>
              <h3 className="font-semibold">安装 SDK</h3>
              <p className="mt-1 text-gray-600"><code className="rounded bg-gray-100 px-2 py-0.5 text-sm">npm install @flyai/sdk</code> 或通过 REST API 直接调用。</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-600 font-bold text-white">3</span>
            <div>
              <h3 className="font-semibold">调用首个诊断接口</h3>
              <p className="mt-1 text-gray-600">传入 URL 清单，获取 100+ 维度的 AI 搜索可见性诊断报告。完整示例见 <Link href="/docs/quickstart" className="text-brand-700 underline">快速开始</Link>。</p>
            </div>
          </li>
        </ol>
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

      <FAQSection title="关于 FlyAI 产品文档的常见问题" items={faqItems} />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-3xl font-bold md:text-4xl">需要更详细的接入支持？联系技术团队</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            FlyAI 技术支持团队为专业版及以上客户提供接入指导与 1v1 技术答疑。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/docs/quickstart" size="lg" variant="primary" className="!bg-white !text-brand-800 hover:!bg-white/90">
              阅读文档
            </CTAButton>
            <CTAButton href="/contact" size="lg" variant="ghost" className="!bg-white/10 !text-white ring-1 ring-white/30 hover:!bg-white/20">
              联系销售
            </CTAButton>
          </div>
        </div>
      </section>

      <JsonLd data={[buildBreadcrumbList(crumbs), buildFAQPage(faqItems)]} />
    </div>
  );
}
