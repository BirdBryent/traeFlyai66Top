import { buildMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';
import JsonLd from '@/components/JsonLd';
import { buildWebPage, buildBreadcrumbList } from '@/lib/schema';
import { toAbsolute } from '@/lib/related-links';

const title = '隐私政策';
const description =
  'FlyAI（广州飞爱智能科技有限公司）尊重并保护你的隐私。我们仅在提供服务所必需的范围内收集与使用数据。';

export const metadata = buildMetadata({ title, description, path: '/privacy' });

const crumbs = [
  { label: '首页', href: '/' },
  { label: '隐私政策', href: '/privacy' },
];

const sections = [
  {
    heading: '我们收集的信息',
    body: '包括访问日志、设备与浏览器信息、页面交互数据（如点击与浏览记录）。',
  },
  {
    heading: '信息用途',
    body: '用于改进内容与体验、分析访问趋势、防止滥用与保障服务安全。',
  },
  {
    heading: 'Cookie 与分析工具',
    body: '我们可能使用 Cookie 与第三方分析工具以统计访问数据，你可以在浏览器中管理相关设置。',
  },
];

export default function PrivacyPage() {
  return (
    <div className="text-gray-900">
      <Breadcrumb items={crumbs} jsonLdOnly />

      <PageHero
        center
        eyebrow="隐私政策"
        h1={title}
        lead={description}
        bgImage={{
          src: '/images/home-hero-bg.png',
          alt: 'FlyAI 页面主视觉：蓝紫色科技渐变背景，象征生成式引擎优化的 AI 智能网格',
        }}
      />

      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <p className="text-sm text-gray-500">最后更新：2025-03-01</p>

        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {s.heading}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-gray-700">{s.body}</p>
            </div>
          ))}

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">联系我们</h2>
            <p className="mt-3 text-lg leading-relaxed text-gray-700">
              若你对隐私政策有疑问，请通过
              <a
                href={toAbsolute('/contact')}
                className="text-brand-600 underline underline-offset-2 hover:text-brand-700"
              >
                站内联系方式
              </a>
              与我们沟通。
            </p>
          </div>
        </div>
      </section>

      <RelatedLinks path="/privacy" />

      <JsonLd
        data={[
          buildWebPage({ url: '/privacy', name: '隐私政策', description }),
          buildBreadcrumbList(crumbs),
        ]}
      />
    </div>
  );
}
