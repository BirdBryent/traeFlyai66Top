'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/site.config';
import { CTAButton } from './CTAButton';

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 inset-x-0 z-[9999] w-full border-b border-gray-200/60 bg-white/75 text-gray-900 antialiased"
      style={{
        WebkitBackdropFilter: 'saturate(1.8) blur(20px)',
        backdropFilter: 'saturate(1.8) blur(20px)',
      }}
    >
      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          href="/"
          aria-label="FlyAI 首页"
          className="touch-target flex items-center gap-2 text-[15px] font-semibold tracking-tight text-gray-900"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 via-brand-400 to-brand-600 text-[13px] font-bold text-white"
          >
            F
          </span>
          <span>FlyAI</span>
        </Link>

        <nav
          aria-label="主导航"
          className="hidden items-center gap-6 text-[13px] font-normal tracking-wide text-gray-700 md:flex"
        >
          {siteConfig.navMain.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={
                  'touch-target transition ' +
                  (isActive
                    ? 'font-medium text-brand-600'
                    : 'text-gray-700 hover:text-gray-900')
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <CTAButton href="/contact" variant="primary" size="sm">
            免费诊断
          </CTAButton>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
