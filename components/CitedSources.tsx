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
} as const;

export function CitedSources({ items, title = '参考来源' }: { items: Source[]; title?: string }) {
  return (
    <section aria-labelledby="sources-heading" className="mx-auto w-full max-w-4xl px-5 py-8 lg:px-8">
      <h2 id="sources-heading" className="text-xl font-semibold text-gray-900">
        {title}
      </h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-gray-700">
        {items.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-brand-600 underline underline-offset-2 hover:text-brand-700"
            >
              {s.label}
            </a>
            {s.note ? <span className="text-gray-500">：{s.note}</span> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default CitedSources;
