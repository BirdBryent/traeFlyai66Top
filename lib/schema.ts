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

/** 空值 / 占位文本一律不写进结构化数据，避免向 AI 引擎暴露「待补充」类脏数据 */
function isFilled(value?: string): value is string {
  return Boolean(
    value && value.trim() && !value.includes('待补充') && !value.includes('0000-0000'),
  );
}

function buildContactPoint() {
  const { email, phone, address } = siteConfig.contact;
  const point: Record<string, unknown> = {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email,
    areaServed: ['CN', 'Global'],
    availableLanguage: ['zh-CN', 'en'],
  };
  if (isFilled(phone)) point.telephone = phone;
  if (isFilled(address)) {
    point.address = {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
      addressLocality: 'Guangzhou',
      streetAddress: address,
    };
  }
  return point;
}

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
    contactPoint: [buildContactPoint()],
    foundDate: '[待补充：真实成立年份]',
    // 公司 → 产品的实体关联：FlyAI GEO 是 FlyAI 旗下首个产品。
    // 与 buildProduct() 的 manufacturer 形成双向引用，便于生成式引擎建立实体层级。
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        '@id': `${siteConfig.url}/#product-geo`,
        name: siteConfig.softwareApplication.name,
      },
    },
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

/**
 * 产品实体：FlyAI GEO（FlyAI 旗下首个产品）。
 * 用 Product + SoftwareApplication 双类型，避免同一产品在结构化数据里出现两个同名实体；
 * 通过 manufacturer 指向 Organization @id，与 Organization.makesOffer 形成双向关联。
 */
export function buildProduct() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Product', 'SoftwareApplication'],
    '@id': `${siteConfig.url}/#product-geo`,
    name: siteConfig.softwareApplication.name,
    alternateName: siteConfig.softwareApplication.alternateName,
    description:
      'FlyAI GEO 是 FlyAI（广州飞爱智能科技有限公司）旗下首个产品，面向企业市场、增长与内容团队提供生成式引擎优化（GEO）平台：AI 搜索可见性诊断、内容结构化、Schema 与 llms.txt 生成、12+ 生成式引擎引用与提及监测。',
    category: '生成式引擎优化（GEO）平台',
    applicationCategory: siteConfig.softwareApplication.applicationCategory,
    operatingSystem: siteConfig.softwareApplication.operatingSystem,
    featureList: siteConfig.softwareApplication.featureList.join(', '),
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    manufacturer: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
    },
    url: `${siteConfig.url}/product`,
    inLanguage: siteConfig.lang,
    // 只有公开标准价的两档输出 price（必须是数字字符串，否则富结果校验报错）；
    // 企业版无公开价格，不写 price，只保留联系入口，避免输出占位文本。
    offers: [
      {
        '@type': 'Offer',
        name: '启动版',
        description: '1 个站点 · 50 个监测关键词 · 500 个月度诊断 URL',
        price: '999',
        priceCurrency: 'CNY',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${siteConfig.url}/pricing`,
      },
      {
        '@type': 'Offer',
        name: '专业版',
        description: '5 个站点 · 300 个监测关键词 · 1,500 个月度诊断 URL',
        price: '2999',
        priceCurrency: 'CNY',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${siteConfig.url}/pricing`,
      },
      {
        '@type': 'Offer',
        name: '企业版',
        description: '站点与关键词不限，支持私有部署与 SLA；价格按合同约定',
        availability: 'https://schema.org/InStock',
        url: `${siteConfig.url}/contact`,
      },
    ],
  };
}

/** 兼容旧调用名：产品实体统一由 buildProduct() 产出，避免出现两个同名实体 */
export const buildSoftwareApplication = buildProduct;

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

export function buildWebPage({
  url,
  name,
  description,
  aboutProduct,
}: {
  url: string;
  name: string;
  description?: string;
  /** 传 true 时 about 同时指向公司(#organization)与产品(#product-geo)，用于产品相关页面 */
  aboutProduct?: boolean;
}) {
  const u = `${siteConfig.url.replace(/\/$/, '')}${url}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${u}#webpage`,
    url: u,
    name,
    description,
    isPartOf: { '@id': `${siteConfig.url.replace(/\/$/, '')}/#website` },
    about: aboutProduct
      ? [
          { '@id': `${siteConfig.url.replace(/\/$/, '')}/#organization` },
          { '@id': `${siteConfig.url.replace(/\/$/, '')}/#product-geo` },
        ]
      : { '@id': `${siteConfig.url.replace(/\/$/, '')}/#organization` },
    inLanguage: siteConfig.lang,
  };
}

/** 服务实体：仅用于确实在描述"服务"的场景；定价/案例/方案等页面请改用 buildProduct 或 buildWebPage */
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
  // 三个实体：公司(#organization) → 产品(#product-geo) → 站点(#website)
  return [buildOrganization(), buildWebSite(), buildProduct()];
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
