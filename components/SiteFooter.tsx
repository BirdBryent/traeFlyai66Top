import Link from 'next/link';
import { siteConfig } from '@/lib/site.config';
import { toAbsolute } from '@/lib/related-links';

/** 空值或占位文本不渲染，避免线上出现「[待补充]」「0000-0000」这类未完成信息 */
function isFilled(value?: string): value is string {
  return Boolean(
    value && value.trim() && !value.includes('待补充') && !value.includes('0000-0000'),
  );
}

export function SiteFooter() {
  const { phone, address } = siteConfig.contact;

  return (
    <footer className="mt-24 border-t border-gray-200 bg-white text-sm text-gray-600">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <a
              href={toAbsolute('/')}
              aria-label="FlyAI 首页"
              className="inline-flex items-center gap-2 text-xl font-bold text-gray-900 transition hover:text-brand-600"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 via-brand-400 to-brand-600 text-white"
              >
                F
              </span>
              <span>FlyAI</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-600">
              {siteConfig.fullCompanyName}
            </p>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-gray-500">
              FlyAI 专注 AI 搜索可见性，旗下首个产品 FlyAI GEO 是生成式引擎优化（GEO）平台，
              让 AI 正确理解并稳定引用你的品牌。
            </p>

            {/* 三行标签固定保留（地址 / 邮箱 / 电话），值留空时只显示标签，不显示「待补充」等占位文案 */}
            <div className="mt-5 space-y-1.5 text-[13px] text-gray-500">
              <div>
                <span className="text-gray-600">地址：</span>
                {isFilled(address) && address}
              </div>
              <div>
                {/* 邮箱按用户要求与地址、电话保持一致：只留标签、值暂不展示。
                    siteConfig.contact.email 仍保留，JSON-LD 与 /contact 页照常使用；
                    要恢复展示，把 {isFilled(email) && <a href={`mailto:${email}`}>{email}</a>} 放回来即可。 */}
                <span className="text-gray-600">邮箱：</span>
              </div>
              <div>
                <span className="text-gray-600">电话：</span>
                {isFilled(phone) ? (
                  <a className="transition hover:text-brand-600" href={`tel:${phone}`}>
                    {phone}
                  </a>
                ) : null}
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
                  className="inline-flex h-8 items-center px-0 text-[13px] text-gray-500 transition hover:text-brand-600"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <nav
            aria-label="页脚导航"
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:col-span-3 md:grid-cols-3"
          >
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900">产品</h3>
              <ul className="space-y-2 list-none pl-0 text-left">
                <li>
                  {/* 产品实体名兼作 /product 入口：放进列表首行，与其余两列的首链接同高（h-8），
                      四列横向对齐；改回标题下的段落会让整列下移一行，别再改回去。
                      「（旗下首个产品）」后缀已按用户要求去掉，层级关系由品牌描述段承担。 */}
                  <a
                    href={toAbsolute('/product')}
                    className="inline-flex h-8 items-center text-gray-600 transition hover:text-brand-600"
                  >
                    FlyAI GEO
                  </a>
                </li>
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
              <h3 className="mb-4 text-sm font-semibold text-gray-900">公司</h3>
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
          </nav>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-gray-500 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            © {new Date().getFullYear()} {siteConfig.fullCompanyName}。版权所有。
            {isFilled(siteConfig.icp) && <span className="ml-1">{siteConfig.icp}</span>}
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <a href={toAbsolute('/privacy')} className="text-gray-500 hover:text-brand-600">
              隐私政策
            </a>
            <span className="text-gray-300">·</span>
            <a href={toAbsolute('/terms')} className="text-gray-500 hover:text-brand-600">
              服务条款
            </a>
            <span className="text-gray-300">·</span>
            <a
              href={toAbsolute('/sitemap.xml')}
              className="text-gray-500 hover:text-brand-600"
            >
              站点地图
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
