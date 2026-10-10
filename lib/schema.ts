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
  description?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
  keywords?: string[];
};

export function buildArticle(params: ArticleParams) {
  const {
    headline,
    description,
    datePublished,
    dateModified,
    authorName = 'FlyAI 内容研究团队',
    image = `${siteConfig.url}/og-default.jpg`,
    keywords,
  } = params;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description: description ?? siteConfig.description,
    image,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.fullCompanyName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': siteConfig.url,
    },
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
