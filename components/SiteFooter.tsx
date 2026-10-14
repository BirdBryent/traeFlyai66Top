import Link from 'next/link';
import { siteConfig } from '@/lib/site.config';
import { toAbsolute } from '@/lib/related-links';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-white text-sm text-gray-600">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 via-brand-400 to-brand-600 text-white"
              >
                F
              </span>
              <span>FlyAI</span>
            </div>
            <p className="mt-4 max-w-sm leading-relaxed text-gray-600">
              {siteConfig.fullCompanyName}
            </p>
            <p className="mt-3 max-w-sm leading-relaxed text-gray-500">
              面向 B2B SaaS、出海品牌、企业市场增长与内容团队的 GEO（生成式引擎优化）服务平台，
              让生成式引擎正确理解并稳定引用你的品牌内容。
            </p>

            <div className="mt-5 space-y-1.5 text-gray-600">
              <div>
                <span className="font-medium text-gray-700">地址：</span>
                {siteConfig.contact.address}
              </div>
              <div>
                <span className="font-medium text-gray-700">邮箱：</span>
                <a
                  className="transition hover:text-brand-600"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div>
                <span className="font-medium text-gray-700">电话：</span>
                <a
                  className="transition hover:text-brand-600"
                  href={`tel:${siteConfig.contact.phone}`}
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {siteConfig.social.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`访问 FlyAI 的${s.label}主页（在新标签页打开）`}
                  className="inline-flex h-8 items-center px-0 text-sm text-gray-500 transition hover:text-brand-600"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">产品</h3>
            <ul className="space-y-2 list-none pl-0 text-left">
              {siteConfig.navFooter.product.map((i) => (
                <li key={i.href}>
                  <a
                    href={toAbsolute(i.href)}
                    className="inline-flex h-8 items-center text-gray-600 transition hover:text-brand-600"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">资源</h3>
            <ul className="space-y-2 list-none pl-0 text-left">
              {siteConfig.navFooter.resources.map((i) => (
                <li key={i.href}>
                  <a
                    href={toAbsolute(i.href)}
                    className="inline-flex h-8 items-center text-gray-600 transition hover:text-brand-600"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">关于</h3>
            <ul className="space-y-2 list-none pl-0 text-left">
              {siteConfig.navFooter.company.map((i) => (
                <li key={i.href}>
                  <a
                    href={toAbsolute(i.href)}
                    className="inline-flex h-8 items-center text-gray-600 transition hover:text-brand-600"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-gray-500 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            © {new Date().getFullYear()} {siteConfig.fullCompanyName}。版权所有。
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/privacy" className="text-gray-500 hover:text-brand-600">
              隐私政策
            </Link>
            <span className="text-gray-300">·</span>
            <Link href="/terms" className="text-gray-500 hover:text-brand-600">
              服务条款
            </Link>
            <span className="text-gray-300">·</span>
            <Link href="/compliance" className="text-gray-500 hover:text-brand-600">
              合规说明
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
