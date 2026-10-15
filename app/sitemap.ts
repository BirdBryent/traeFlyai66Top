import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site.config';

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
};

const base = siteConfig.url.replace(/\/$/, '');
const now = new Date();

const routes: Omit<SitemapEntry, 'lastModified'>[] = [
  { url: `${base}/`, priority: 1.0, changeFrequency: 'weekly' },
  { url: `${base}/product`, priority: 0.95, changeFrequency: 'weekly' },
  { url: `${base}/solutions`, priority: 0.9, changeFrequency: 'weekly' },
  { url: `${base}/pricing`, priority: 0.9, changeFrequency: 'weekly' },
  { url: `${base}/cases`, priority: 0.85, changeFrequency: 'monthly' },
  { url: `${base}/docs`, priority: 0.9, changeFrequency: 'weekly' },
  { url: `${base}/docs/quickstart`, priority: 0.85, changeFrequency: 'monthly' },
  {
    url: `${base}/docs/api-reference`,
    priority: 0.85,
    changeFrequency: 'monthly',
  },
  {
    url: `${base}/docs/schema-fields`,
    priority: 0.85,
    changeFrequency: 'monthly',
  },
  { url: `${base}/glossary`, priority: 0.9, changeFrequency: 'weekly' },
  { url: `${base}/blog`, priority: 0.85, changeFrequency: 'weekly' },
  {
    url: `${base}/blog/geo-vs-seo-differences`,
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    url: `${base}/blog/llms-txt-best-practices`,
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    url: `${base}/blog/structured-data-2025`,
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  { url: `${base}/about`, priority: 0.85, changeFrequency: 'monthly' },
  { url: `${base}/contact`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${base}/faq`, priority: 0.9, changeFrequency: 'weekly' },
  { url: `${base}/privacy`, priority: 0.3, changeFrequency: 'yearly' },
  { url: `${base}/terms`, priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: r.url,
    lastModified: now,
    changeFrequency: r.changeFrequency ?? 'weekly',
    priority: r.priority ?? 0.7,
  }));
}
