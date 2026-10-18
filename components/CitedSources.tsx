import type { ReactNode } from 'react';

export type Source = { label: string; url: string; note?: string };

/** 已实测 HTTP 200 且标题已核对的权威来源（白名单：arxiv / doi / acm / .gov / .edu / wikipedia） */
export const SOURCES = {
  geoPaper: {
    label: 'Aggarwal et al., 《GEO: Generative Engine Optimization》, KDD 2024',
    url: 'https://arxiv.org/abs/2311.09735',
    note: '首个把 GEO 形式化的论文，提出 GEO-bench',
  },
  geoDoi: {
    label: 'DOI 10.1145/3637528.3671900（KDD 2024 正式版）',
    url: 'https://doi.org/10.1145/3637528.3671900',
  },
  longContext: {
    label: 'Liu et al., 《Lost in the Middle: How Language Models Use Long Contexts》, TACL 2024',
    url: 'https://arxiv.org/abs/2307.03172',
    note: '解释为何「关键结论要放前面」',
  },
  rag: {
    label: 'Lewis et al., 《Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks》, NeurIPS 2020',
    url: 'https://arxiv.org/abs/2005.11401',
    note: '生成式引擎检索增强的原始论文',
  },
  cacAiRule: {
    label: '《生成式人工智能服务管理暂行办法》（国家网信办等，2023-07-13 公布，2023-08-15 施行）',
    url: 'https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm',
  },
  stanfordAiIndex: {
    label: 'Stanford HAI, 《The 2025 AI Index Report》',
    url: 'https://hai.stanford.edu/ai-index/2025-ai-index-report',
  },
  samr: {
    label: '国家市场监督管理总局',
    url: 'https://www.samr.gov.cn/',
    note: '企业主体与经营资质查询入口',
  },
  miit: {
    label: '工业和信息化部（ICP 备案主管部门）',
    url: 'https://www.miit.gov.cn/',
  },
  rfc9309: {
    label: 'RFC 9309 — Robots Exclusion Protocol（IETF）',
    url: 'https://www.rfc-editor.org/rfc/rfc9309.html',
    note: 'robots.txt 的现行规范',
  },
  w3cJsonLd: {
    label: 'W3C JSON-LD 1.1 规范',
    url: 'https://www.w3.org/TR/json-ld11/',
  },
  llmsTxt: {
    label: 'llms.txt 社区提案（llmstxt.org）',
    url: 'https://www.llmstxt.org/',
    note: '当前 llms.txt 的唯一事实标准来源',
  },
  googleStructuredData: {
    label: 'Google Search Central — 结构化数据官方文档',
    url: 'https://developers.google.com/search/docs/appearance/structured-data',
  },
  openaiBots: {
    label: 'OpenAI 爬虫与机器人文档（GPTBot / OAI-SearchBot / ChatGPT-User）',
    url: 'https://developers.openai.com/api/docs/bots',
    note: '浏览器可访问；curl 会返回 403',
  },
  appleBot: {
    label: 'Applebot 与 Applebot-Extended 说明（Apple）',
    url: 'https://support.apple.com/en-us/119829',
  },
  anthropicBot: {
    label: 'Anthropic 抓取与屏蔽说明（ClaudeBot）',
    url: 'https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler',
  },
  ccbot: {
    label: 'Common Crawl 的 CCBot',
    url: 'https://commoncrawl.org/ccbot',
  },
} as const;

export function CitedSources({
  items,
  title = '参考来源',
  lead,
  id = 'sources',
}: {
  items: Source[];
  title?: string;
  /** 佐证段正文：传入时与引用源列表合并进同一个 section，排版对标 RelatedLinks。
   *  用 ReactNode 而非 string —— /about、/cases 的原佐证段含权威外链，降级成纯文本会丢链接。 */
  lead?: ReactNode;
  id?: string;
}) {
  const headingId = `${id}-heading`;
  return (
    <section aria-labelledby={headingId} className="mx-auto w-full max-w-4xl px-5 py-8 lg:px-8">
      <h2 id={headingId} className="text-xl font-semibold text-gray-900">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 leading-relaxed text-gray-700">{lead}</p>
      ) : null}
      <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
        {items.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 underline underline-offset-2 hover:text-brand-700"
            >
              {s.label}
            </a>
            {s.note ? <span className="text-gray-500">：{s.note}</span> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CitedSources;
