import PageHero from '@/components/PageHero';

export default function HomePlaceholder() {
  return (
    <div className="text-gray-900">
      <PageHero
        h1="FlyAI · 生成式引擎优化（GEO）平台"
        lead="FlyAI（广州飞爱智能科技有限公司）专注 GEO 生成式引擎优化：AI 搜索可见性诊断、内容结构化、Schema.org JSON-LD 与 llms.txt 自动生成、12+ 生成式引擎引用监测。我们帮助企业市场、增长与内容团队在 DeepSeek、豆包、千问、Google AIO 等答案中被稳定且高权重地引用，补上传统 SEO 做得再好但 AI 搜不到的增长缺口。"
        ctaPrimary={{ text: '免费诊断', href: '/contact' }}
        ctaSecondary={{ text: '查看产品', href: '/product' }}
      />
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: 'AI 可见性诊断',
              body: '100+ 维度 GEO 健康度评估：Schema 覆盖度、关键词在 AI 答案中的排名分布、内部链接结构、首段直达答案占比。',
            },
            {
              title: '结构化内容编辑器',
              body: '面向 AI 的写作助手：FAQ 抽取、首段直答、要点列表化、JSON-LD 实时预览，避免生成式引擎误读。',
            },
            {
              title: '引用与监测',
              body: '跨 12+ 生成式引擎持续采集品牌与关键词提及，支持按页/按关键词导出趋势。',
            },
          ].map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-gray-900">{c.title}</h2>
              <p className="mt-3 leading-relaxed text-gray-600">{c.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-16 text-center text-sm text-gray-500">
          说明：当前首页为 Phase 1 临时占位，完整首页在 Phase 2 中实现。
        </p>
      </section>
    </div>
  );
}
