import { siteConfig } from './site.config';

export const AUTHORITY_DOMAINS = [
  'arxiv.org',
  'doi.org',
  'ieee.org',
  'acm.org',
  'nature.com',
  'science.org',
  'wikipedia.org',
  'wikipedia.com',
  'schema.org',
  'w3.org',
  'ietf.org',
  'nist.gov',
  'gov.cn',
  'gov',
  'edu.cn',
  'edu',
  'europa.eu',
  'samr.gov.cn',
  'npc.gov.cn',
  'cnca.gov.cn',
  'ftc.gov',
  'google.com',
  'developers.google.com',
  'openai.com',
  'anthropic.com',
];

export function buildOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.fullCompanyName,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.svg`,
    },
    image: `${siteConfig.url}/og-default.jpg`,
    sameAs: siteConfig.sameAs,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'CN',
          addressLocality: 'Guangzhou',
          streetAddress: siteConfig.contact.address,
        },
        areaServed: ['CN', 'Global'],
        availableLanguage: ['zh-CN', 'en'],
      },
    ],
    foundDate: '[待补充：真实成立年份]',
  };
}

export function buildWebSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: `${siteConfig.name} 官网`,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.lang,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.fullCompanyName,
      url: siteConfig.url,
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: `${siteConfig.url}/faq?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    ],
  };
}

export function buildSoftwareApplication() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.softwareApplication.name,
    applicationCategory: siteConfig.softwareApplication.applicationCategory,
    operatingSystem: siteConfig.softwareApplication.operatingSystem,
    featureList: siteConfig.softwareApplication.featureList.join(', '),
    offers: [
      {
        '@type': 'Offer',
        name: '启动版',
        price: '[联系销售获取报价]',
        priceCurrency: 'CNY',
        availability: 'https://schema.org/InStock',
        url: `${siteConfig.url}/pricing`,
      },
      {
        '@type': 'Offer',
        name: '专业版',
        price: '[联系销售获取报价]',
        priceCurrency: 'CNY',
        availability: 'https://schema.org/InStock',
        url: `${siteConfig.url}/pricing`,
      },
      {
        '@type': 'Offer',
        name: '企业版',
        price: '[联系销售获取报价]',
        priceCurrency: 'CNY',
        availability: 'https://schema.org/InStock',
        url: `${siteConfig.url}/pricing`,
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '[待补充：真实评分]',
      ratingCount: '[待补充：真实评分数]',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.fullCompanyName,
    },
  };
}

export type FAQItem = { question: string; answer: string };

export function buildFAQPage(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.answer,
      },
    })),
  };
}

export type ArticleParams = {
  headline: string;
  /** 文章自身 URL（相对路径即可），用于 @id 与 mainEntityOfPage —— 必填 */
  url: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  /** 站内真实图片，默认 /og-default.jpg；不要用站外生成接口的临时链接 */
  image?: string;
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
};

function absUrl(p: string): string {
  if (/^https?:\/\//.test(p)) return p;
  return `${siteConfig.url.replace(/\/$/, '')}${p.startsWith('/') ? p : `/${p}`}`;
}

export function buildArticle(params: ArticleParams) {
  const {
    headline,
    url,
    description,
    datePublished,
    dateModified,
    authorName = 'FlyAI 内容研究团队',
    image = '/og-default.jpg',
    keywords,
    articleSection,
    wordCount,
  } = params;

  const articleUrl = absUrl(url);
  const orgId = `${siteConfig.url.replace(/\/$/, '')}/#organization`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline,
    description: description ?? siteConfig.description,
    image: { '@type': 'ImageObject', url: absUrl(image), width: 1200, height: 630 },
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { '@type': 'Organization', '@id': orgId, name: authorName, url: siteConfig.url },
    publisher: { '@id': orgId },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    isPartOf: { '@id': `${siteConfig.url.replace(/\/$/, '')}/#website` },
    articleSection,
    wordCount,
    keywords: keywords ? keywords.join(', ') : undefined,
    inLanguage: siteConfig.lang,
  };
}

export type BreadcrumbItem = { label: string; href?: string };

export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.label,
      item: it.href ? `${siteConfig.url}${it.href}` : undefined,
    })),
  };
}

export function buildWebPage({ url, name, description }: { url: string; name: string; description?: string }) {
  const u = `${siteConfig.url.replace(/\/$/, '')}${url}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${u}#webpage`,
    url: u,
    name,
    description,
    isPartOf: { '@id': `${siteConfig.url.replace(/\/$/, '')}/#website` },
    about: { '@id': `${siteConfig.url.replace(/\/$/, '')}/#organization` },
    inLanguage: siteConfig.lang,
  };
}

export function buildService(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: '生成式引擎优化（GEO）',
    provider: { '@id': `${siteConfig.url.replace(/\/$/, '')}/#organization` },
    areaServed: ['CN', 'Global'],
    url: `${siteConfig.url.replace(/\/$/, '')}/product`,
  };
}

export function buildCollectionPage(url: string, name: string) {
  const u = `${siteConfig.url.replace(/\/$/, '')}${url}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${u}#collection`,
    url: u,
    name,
    isPartOf: { '@id': `${siteConfig.url.replace(/\/$/, '')}/#website` },
    inLanguage: siteConfig.lang,
  };
}

export function buildDefinedTermSet(url: string, name: string) {
  const u = `${siteConfig.url.replace(/\/$/, '')}${url}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${u}#terms`,
    url: u,
    name,
    inLanguage: siteConfig.lang,
  };
}

export function buildAboutPage(url: string, name: string) {
  const u = `${siteConfig.url.replace(/\/$/, '')}${url}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${u}#about`,
    url: u,
    name,
    isPartOf: { '@id': `${siteConfig.url.replace(/\/$/, '')}/#website` },
    inLanguage: siteConfig.lang,
  };
}

export function buildContactPage(url: string, name: string) {
  const u = `${siteConfig.url.replace(/\/$/, '')}${url}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${u}#contact`,
    url: u,
    name,
    isPartOf: { '@id': `${siteConfig.url.replace(/\/$/, '')}/#website` },
    inLanguage: siteConfig.lang,
  };
}

export function buildGlobalJsonLd() {
  return [buildOrganization(), buildWebSite(), buildSoftwareApplication()];
}

export function isAuthorityLink(href: string): boolean {
  try {
    const host = new URL(href).hostname.replace(/^www\./, '');
    return AUTHORITY_DOMAINS.some(
      (d) => host === d || host.endsWith(`.${d}`) || host.includes(`.${d}.`),
    );
  } catch {
    return false;
  }
}
