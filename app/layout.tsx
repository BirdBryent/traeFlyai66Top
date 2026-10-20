import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/site.config';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import JsonLd from '@/components/JsonLd';
import { buildGlobalJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `FlyAI GEO｜生成式引擎优化（GEO）平台，让 AI 答案优先引用你的品牌 — ${siteConfig.name}`,
    template: `%s — ${siteConfig.name}`,
  },
  // 描述统一取 siteConfig.description（单一事实源：含「公司 → 旗下首个产品 FlyAI GEO」实体层级）
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.fullCompanyName, url: siteConfig.url }],
  creator: siteConfig.fullCompanyName,
  publisher: siteConfig.fullCompanyName,
  applicationName: siteConfig.name,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'FlyAI GEO｜生成式引擎优化（GEO）平台，让 AI 答案优先引用你的品牌',
    description: siteConfig.description,
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} 官网主视觉`,
      },
    ],
  },
  twitter: {
    card: siteConfig.twitter.card as
      | 'summary_large_image'
      | 'summary'
      | 'player'
      | 'app',
    title: 'FlyAI GEO｜生成式引擎优化（GEO）平台',
    description: siteConfig.description,
    images: ['/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/icon.svg' }],
  },
  manifest: undefined,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1d1d1f' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={siteConfig.lang} suppressHydrationWarning>
      <head>
        <JsonLd data={buildGlobalJsonLd()} />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          跳转到主内容
        </a>
        <SiteHeader />
        {/* page-rails 挂在 main 上而非各页面 root div：一次挂载全站生效，新增页面无需记得加。
            伪元素是 fixed + pointer-events:none，不参与布局、不拦截点击。 */}
        <main id="main" role="main" className="page-rails min-h-[60vh] pt-11">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
