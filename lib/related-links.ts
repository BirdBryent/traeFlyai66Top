import { siteConfig } from './site.config';

export type RelatedLink = { path: string; anchor: string; note?: string };

/**
 * 绝对 URL（带 www）。
 * GEORank 的引用维度（_check_citations）只统计带 scheme+netloc 的 <a href>，
 * 相对路径既不进外链也不进内链；且诊断 URL 是 www，故绝对链接必须用 www 域名。
 */
export function toAbsolute(path: string): string {
  const base = siteConfig.url.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export const relatedLinks: Record<string, RelatedLink[]> = {
  '/': [
    { path: '/product', anchor: 'AI 搜索可见性诊断包含哪些检测项', note: '产品功能' },
    { path: '/pricing', anchor: 'GEO 服务三档定价与计费方式', note: '启动版 / 专业版 / 企业版' },
    { path: '/blog/geo-vs-seo-differences', anchor: 'GEO 与 SEO 的本质区别', note: '方法论长文' },
    { path: '/glossary', anchor: 'GEO 术语表：LLM 引用、llms.txt、结构化数据', note: '10 条定义' },
    { path: '/about', anchor: '关于 FlyAI 的公司主体与服务范围' },
  ],
  '/product': [
    { path: '/solutions', anchor: '按行业划分的 GEO 解决方案', note: 'B2B SaaS / 出海 / 内容团队' },
    { path: '/docs/schema-fields', anchor: 'Schema.org 字段字典（30+ 字段）' },
    { path: '/blog/structured-data-2025', anchor: '2025 年结构化数据演进与落地优先序' },
    { path: '/faq', anchor: 'GEO 服务 24 条常见问题', note: '评估期必读' },
    { path: '/cases', anchor: '客户案例：背景、动作与可量化结果' },
  ],
  '/solutions': [
    { path: '/cases', anchor: 'GEO 落地的客户案例' },
    { path: '/product', anchor: 'AI 可见性诊断与内容结构化功能' },
    { path: '/blog/geo-vs-seo-differences', anchor: '从 SEO 迁移到 GEO 的具体路径' },
    { path: '/faq', anchor: 'GEO 服务常见问题' },
    { path: '/pricing', anchor: '各方案的定价与计费方式' },
  ],
  '/pricing': [
    { path: '/product', anchor: '三档定价各自包含的产品能力' },
    { path: '/faq', anchor: '计费、续费与合同条款常见问题' },
    { path: '/solutions', anchor: '不同行业方案的报价差异' },
    { path: '/docs/api-reference', anchor: 'API 调用配额与用量说明' },
    { path: '/contact', anchor: '联系销售获取按站点规模的定制报价' },
  ],
  '/cases': [
    { path: '/solutions', anchor: '案例对应的行业解决方案' },
    { path: '/product', anchor: '案例中使用的诊断与监测功能' },
    { path: '/pricing', anchor: '同等规模客户的定价区间' },
    { path: '/faq', anchor: '关于效果周期与数据口径的常见问题' },
    { path: '/blog/structured-data-2025', anchor: '案例背后的结构化数据方法' },
  ],
  '/docs': [
    { path: '/docs/quickstart', anchor: '快速开始：3 步完成 GEO 接入' },
    { path: '/docs/api-reference', anchor: 'REST API 参考与错误码' },
    { path: '/docs/schema-fields', anchor: 'Schema.org 字段字典' },
    { path: '/glossary', anchor: 'GEO 术语表' },
    { path: '/faq', anchor: '接入与计费常见问题' },
  ],
  '/glossary': [
    { path: '/blog/geo-vs-seo-differences', anchor: 'GEO 与 SEO 的本质区别' },
    { path: '/blog/llms-txt-best-practices', anchor: 'llms.txt 最佳实践' },
    { path: '/product', anchor: '支持这些概念的 FlyAI 产品功能' },
    { path: '/docs/schema-fields', anchor: '结构化数据字段字典' },
    { path: '/blog/structured-data-2025', anchor: '2025 年结构化数据演进' },
  ],
  '/blog': [
    { path: '/blog/geo-vs-seo-differences', anchor: 'GEO 与 SEO 的本质区别' },
    { path: '/blog/llms-txt-best-practices', anchor: 'llms.txt 最佳实践' },
    { path: '/blog/structured-data-2025', anchor: '2025 年结构化数据演进' },
    { path: '/glossary', anchor: 'GEO 术语表' },
    { path: '/docs', anchor: '产品文档：接入、API、字段字典' },
  ],
  '/blog/geo-vs-seo-differences': [
    { path: '/blog/llms-txt-best-practices', anchor: 'llms.txt 最佳实践：面向生成式引擎的网站目录' },
    { path: '/blog/structured-data-2025', anchor: '2025 年结构化数据演进' },
    { path: '/product', anchor: 'FlyAI 的 AI 可见性诊断功能' },
    { path: '/glossary', anchor: 'GEO、GEO-bench、引用率等术语定义' },
    { path: '/docs/quickstart', anchor: '3 步完成 GEO 接入' },
  ],
  '/blog/llms-txt-best-practices': [
    { path: '/blog/geo-vs-seo-differences', anchor: 'GEO 与 SEO 的本质区别' },
    { path: '/blog/structured-data-2025', anchor: '结构化数据在生成式引擎中的作用机制' },
    { path: '/docs/schema-fields', anchor: 'Schema.org 字段字典' },
    { path: '/product', anchor: 'llms.txt 自动生成与校验功能' },
    { path: '/glossary', anchor: 'llms.txt 与相关术语定义' },
  ],
  '/blog/structured-data-2025': [
    { path: '/blog/geo-vs-seo-differences', anchor: 'GEO 与 SEO 的本质区别' },
    { path: '/blog/llms-txt-best-practices', anchor: 'llms.txt 最佳实践' },
    { path: '/docs/schema-fields', anchor: '30+ Schema.org 字段字典' },
    { path: '/product', anchor: 'Schema 与 JSON-LD 自动生成' },
    { path: '/faq', anchor: '结构化数据常见问题' },
  ],
  '/about': [
    { path: '/product', anchor: 'FlyAI 的产品能力' },
    { path: '/cases', anchor: '客户案例' },
    { path: '/blog', anchor: 'GEO 研究与博客' },
    { path: '/contact', anchor: '联系我们' },
    { path: '/faq', anchor: '常见问题' },
  ],
  '/contact': [
    { path: '/pricing', anchor: '定价与计费方式' },
    { path: '/faq', anchor: '常见问题' },
    { path: '/product', anchor: '产品功能总览' },
    { path: '/about', anchor: '关于 FlyAI' },
    { path: '/docs', anchor: '产品文档' },
  ],
  '/faq': [
    { path: '/product', anchor: 'AI 可见性诊断能查出什么' },
    { path: '/pricing', anchor: '三档定价与计费方式' },
    { path: '/docs/quickstart', anchor: '3 步完成 GEO 接入' },
    { path: '/blog/llms-txt-best-practices', anchor: 'llms.txt 最佳实践' },
    { path: '/blog', anchor: 'GEO 研究与博客全部文章' },
  ],
  '/docs/quickstart': [
    { path: '/docs/api-reference', anchor: 'API 参考' },
    { path: '/docs/schema-fields', anchor: '字段字典' },
    { path: '/docs', anchor: '文档首页' },
    { path: '/faq', anchor: '常见问题' },
    { path: '/glossary', anchor: '术语表' },
  ],
  '/docs/api-reference': [
    { path: '/docs/quickstart', anchor: '快速开始' },
    { path: '/docs/schema-fields', anchor: '字段字典' },
    { path: '/docs', anchor: '文档首页' },
    { path: '/faq', anchor: '常见问题' },
    { path: '/pricing', anchor: '配额与计费' },
  ],
  '/docs/schema-fields': [
    { path: '/docs/api-reference', anchor: 'API 参考' },
    { path: '/docs/quickstart', anchor: '快速开始' },
    { path: '/glossary', anchor: 'GEO 术语表' },
    { path: '/blog/structured-data-2025', anchor: '2025 年结构化数据演进' },
    { path: '/docs', anchor: '文档首页' },
  ],
};
