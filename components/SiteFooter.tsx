import Link from 'next/link';
import { siteConfig } from '@/lib/site.config';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-gray-50/60 text-sm text-gray-600">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 via-brand-400 to-brand-600 text-white"
              >
                F
              </span>
              <span>FlyAI</span>
            </div>
            <p className="mt-4 max-w-sm text-gray-600 leading-relaxed">
              {siteConfig.fullCompanyName}
            </p>
            <address className="mt-5 not-italic space-y-1.5">
              <div>
                <span className="font-medium text-gray-700">地址：</span>
                {siteConfig.contact.address}
              </div>
              <div>
                <span className="font-medium text-gray-700">邮箱：</span>
                <a
                  className="hover:text-brand-600"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div>
                <span className="font-medium text-gray-700">电话：</span>
                <a
                  className="hover:text-brand-600"
                  href={`tel:${siteConfig.contact.phone}`}
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </address>
            <div className="mt-5 flex flex-wrap gap-3">
              {siteConfig.social.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 transition hover:border-brand-300 hover:text-brand-600"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">产品</h3>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.navFooter.product.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="touch-target hover:text-brand-600"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">资源</h3>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.navFooter.resources.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="touch-target hover:text-brand-600"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">公司</h3>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.navFooter.company.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="touch-target hover:text-brand-600"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-gray-900">法律</h3>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.navFooter.legal.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="touch-target hover:text-brand-600"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-gray-200 pt-6 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} {siteConfig.fullCompanyName}。版权所有。
          </div>
          <div>
            本站致力于生成式引擎优化（GEO），并通过 schema.org 结构化数据与 llms.txt
            提升 AI 引用准确度。
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
