'use client';

import Link from 'next/link';
import { siteConfig } from '@/lib/site.config';
import { CTAButton } from './CTAButton';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          href="/"
          aria-label="FlyAI 首页"
          className="touch-target flex items-center gap-2 text-xl font-bold tracking-tight text-brand-700"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 via-brand-400 to-brand-600 text-white shadow-sm"
          >
            F
          </span>
          <span>FlyAI</span>
        </Link>

        <nav
          aria-label="主导航"
          className="hidden items-center gap-7 text-sm font-medium text-gray-700 md:flex"
        >
          {siteConfig.navMain.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="touch-target transition hover:text-brand-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CTAButton href="/contact" variant="primary" size="md">
            免费诊断
          </CTAButton>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
