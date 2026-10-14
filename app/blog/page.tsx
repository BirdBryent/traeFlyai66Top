import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import RelatedLinks from '@/components/RelatedLinks';
import CTAButton from '@/components/CTAButton';
import JsonLd from '@/components/JsonLd';
import { buildFAQPage, buildBreadcrumbList, FAQItem, buildWebPage, buildCollectionPage } from '@/lib/schema';

const title = 'FlyAI 博客 — GEO 方法论 · 结构化数据 · llms.txt 最佳实践';
const description =
  'FlyAI 博客分享生成式引擎优化（GEO）的深度实践：GEO 与 SEO 的本质区别、llms.txt 最佳实践、2025 年结构化数据演进趋势等。所有文章通过 MDX 静态渲染，含首段直答、结构化数据与权威外链。';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/blog' },
  openGraph: {
    title,
    description,
    url: 'https://flyai66.top/blog',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-default.jpg'] },
  robots: { index: true, follow: true },
};

const faqItems: FAQItem[] = [
  {
    question: 'FlyAI 博客文章的更新频率是多少？',
    answer:
      'FlyAI 博客每两周发布一篇深度文章，聚焦 GEO 方法论、结构化数据最佳实践、llms.txt 规范演进、生成式引擎算法变化等主题。所有文章由 FlyAI GEO 策略团队撰写，经过内部评审后发布，确保内容的准确性与可操作性。',
  },
  {
    question: '可以转载 FlyAI 博客文章吗？',
    answer:
      'FlyAI 博客文章采用 CC BY-NC-SA 4.0 许可证，允许非商业用途的转载与改编，但需注明出处（原文链接）且以相同许可证发布。商业转载需联系 FlyAI 商务团队获取书面授权。文章中的代码示例采用 MIT 许可证，可自由使用。',
  },
  {
    question: 'FlyAI 博客文章的数据来源是什么？',
    answer:
      'FlyAI 博客文章中的数据来自三个渠道：① FlyAI 监测平台对 12+ 生成式引擎的真实引用数据（脱敏后）；② 公开学术论文与行业报告（均标注来源链接）；③ FlyAI 客户案例（经客户签署 MAA 后方可引用）。所有数据均标注来源，不编造未经验证的数字。',
  },
  {
    question: '如何订阅 FlyAI 博客更新？',
    answer:
      '可通过以下方式订阅：① 订阅 FlyAI 邮件通讯（在首页底部输入邮箱）；② 关注 FlyAI 微信公众号「[待补充：真实公众号名]」；③ 关注 FlyAI GitHub 博客仓库（https://github.com/FlyAI/blog）获取 RSS。订阅渠道上线前请以官网博客页手动查看为准。',
  },
];

const crumbs = [
  { label: '首页', href: '/' },
  { label: '博客', href: '/blog' },
];

const posts = [
  {
    href: '/blog/geo-vs-seo-differences',
    title: 'GEO 与 SEO 的本质区别：从「被搜到」到「被引用」',
    excerpt:
      '2025 年生成式引擎的崛起正在重塑内容优化逻辑。本文从优化对象、核心指标、关键手段三个维度，系统对比 GEO（生成式引擎优化）与 SEO（搜索引擎优化）的本质区别，并给出企业从 SEO 向 GEO 迁移的具体路径。',
    date: '2025-10-15',
    readTime: '约 12 分钟',
    tag: 'GEO 方法论',
  },
  {
    href: '/blog/llms-txt-best-practices',
    title: 'llms.txt 最佳实践：面向生成式引擎的网站目录',
    excerpt:
      'llms.txt 是 2025 年新兴的面向 LLM 爬虫的网站目录文件。本文详解 llms.txt 的语法规范、必填字段、与 robots.txt 的协作方式，并给出 FlyAI 客户的实测引用率提升数据。',
    date: '2025-10-08',
    readTime: '约 10 分钟',
    tag: '技术规范',
  },
  {
    href: '/blog/structured-data-2025',
    title: '2025 年结构化数据演进：从搜索引擎到生成式引擎',
    excerpt:
      '结构化数据不再只是搜索引擎的排名信号，正在成为生成式引擎理解实体的基础设施。本文梳理 2025 年 Schema.org 的关键更新、JSON-LD 在 AI 答案生成中的作用机制，以及企业应优先落地的 6 种 Schema 类型。',
    date: '2025-09-28',
    readTime: '约 14 分钟',
    tag: '结构化数据',
  },
];

export default function BlogListPage() {
  return (
    <div className="text-gray-900">
      <Breadcrumb items={crumbs} jsonLdOnly />

      <PageHero
        eyebrow="博客"
        h1={title}
        lead={description}
        ctaPrimary={{ text: '阅读最新文章', href: '/blog/geo-vs-seo-differences' }}
        ctaSecondary={{ text: '联系销售', href: '/contact' }}
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">最新文章</h2>
        <p className="mt-4 text-lg text-gray-600">
          FlyAI 博客聚焦 GEO 方法论、结构化数据、llms.txt 等生成式引擎优化核心议题，所有文章经团队评审确保准确可操作。
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex flex-col rounded-3xl border border-gray-200 p-8 transition hover:border-brand-400 hover:shadow-md"
            >
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="rounded-full bg-brand-100 px-3 py-1 font-semibold text-brand-700">
                  {p.tag}
                </span>
                <span>{p.readTime}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-brand-700">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 text-sm text-gray-600">{p.excerpt}</p>
              <p className="mt-6 text-xs text-gray-400">发布于 {p.date}</p>
            </Link>
          ))}
        </div>
      </section>

      <RelatedLinks path="/blog" />
      <FAQSection title="博客常见问题" items={faqItems} />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-3xl font-bold md:text-4xl">将 GEO 方法论落地到你的业务</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            从博客了解方法论，到 FlyAI 工具链落地实践，只需一次演示。
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

      <JsonLd data={[buildWebPage({ url: '/blog', name: 'FlyAI GEO 研究博客' }),
          buildCollectionPage('/blog', 'FlyAI GEO 研究文章集合'),
          buildBreadcrumbList(crumbs), buildFAQPage(faqItems)]} />
    </div>
  );
}
