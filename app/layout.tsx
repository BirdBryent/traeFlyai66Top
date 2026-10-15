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
    default: `${siteConfig.name} 生成式引擎优化（GEO）——让 AI 答案优先引用你的品牌 — ${siteConfig.name}`,
    template: `%s — ${siteConfig.name}`,
  },
  description:
    'FlyAI（广州飞爱智能科技有限公司）专注 GEO 生成式引擎优化：AI 搜索可见性诊断、内容结构化、Schema 与 llms.txt 生成、引用监测，帮助企业在 DeepSeek、豆包、千问、Google AIO 答案中被稳定引用，解决传统 SEO 做得好但 AI 搜不到的增长缺口。',
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
    title: `${siteConfig.name} 生成式引擎优化（GEO）——让 AI 答案优先引用你的品牌`,
    description:
      'FlyAI 专注 GEO 生成式引擎优化：AI 可见性诊断、内容结构化、Schema 与 llms.txt 生成、引用监测，帮助企业市场增长内容团队在 AI 答案中获得稳定高权重引用。',
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
    title: `${siteConfig.name} 生成式引擎优化（GEO）`,
    description:
      'FlyAI 提供 GEO 生成式引擎优化服务：AI 搜索可见性诊断、内容结构化、Schema/llms.txt 生成、引用监测。',
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
        <main id="main" role="main" className="min-h-[60vh] pt-11">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
