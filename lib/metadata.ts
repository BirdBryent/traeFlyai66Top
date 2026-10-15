import type { Metadata } from 'next';
import { siteConfig } from './site.config';

const BASE = siteConfig.url.replace(/\/$/, '');

export type PageMetadataInput = {
  title: string;
  description: string;
  /** 站内相对路径：'/' 或 '/product' */
  path: string;
  /** 内容型页面用 article，其余 website */
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  /** 默认 /og-default.jpg */
  image?: string;
  keywords?: string[];
  index?: boolean;
};

/**
 * 统一 metadata 生成器。
 * 目的：og:locale / og:site_name 这类「父级字段」在页面级 openGraph 存在时会被整体替换，
 * 因此必须由每个页面显式带上，不能在 layout 里设一次了事。
 * 同时把写死的 'https://flyai66.top/...' 换成 BASE（与非 www → www 的 canonical 对齐）。
 */
export function buildMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  modifiedTime,
  section,
  image = '/og-default.jpg',
  keywords,
  index = true,
}: PageMetadataInput): Metadata {
  const url = path === '/' ? `${BASE}/` : `${BASE}${path}`;
  return {
    title,
    description,
    keywords: keywords ?? siteConfig.keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name, // → og:site_name
      locale: siteConfig.locale, // → og:locale（本任务核心）
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(type === 'article'
        ? { publishedTime, modifiedTime, section, authors: [siteConfig.fullCompanyName] }
        : {}),
    },
    twitter: {
      card: siteConfig.twitter.card as 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : { index: false, follow: false },
  };
}
