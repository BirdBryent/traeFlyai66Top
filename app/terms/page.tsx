import { buildMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';
import JsonLd from '@/components/JsonLd';
import { buildWebPage, buildBreadcrumbList } from '@/lib/schema';

const title = '服务条款';
const description = '欢迎使用 FlyAI。访问与使用本站即表示你同意以下条款。';

export const metadata = buildMetadata({ title, description, path: '/terms' });

const crumbs = [
  { label: '首页', href: '/' },
  { label: '服务条款', href: '/terms' },
];

const sections = [
  {
    heading: '服务说明',
    body: '本站提供AI模型与资源相关的信息、榜单与工具，内容仅供参考。',
  },
  {
    heading: '使用规范',
    body: '请勿以任何方式破坏服务稳定性或从事违法违规活动。',
  },
  {
    heading: '内容与版权',
    body: '本站内容受版权保护，转载或引用请遵循相关标注要求。',
  },
  {
    heading: '免责声明',
    body: '我们尽力保持信息准确，但不对内容的完整性或适用性作出保证。',
  },
];

export default function TermsPage() {
  return (
    <div className="text-gray-900">
      <Breadcrumb items={crumbs} jsonLdOnly />

      <PageHero eyebrow="服务条款" h1={title} lead={description} />

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
        </div>
      </section>

      <RelatedLinks path="/terms" />

      <JsonLd
        data={[
          buildWebPage({ url: '/terms', name: '服务条款', description }),
          buildBreadcrumbList(crumbs),
        ]}
      />
    </div>
  );
}
