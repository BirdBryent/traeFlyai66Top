import Link from 'next/link';

type PainCase = {
  id: string;
  category: string;
  title: string;
  icon: string;
  symptom: string;
  fix: string;
  cta: { text: string; href: string };
};

const PAINS: PainCase[] = [
  {
    id: 'a',
    category: 'B2B SaaS',
    title: '品牌在 AI 答案中被张冠李戴',
    icon: '⚙️',
    symptom: 'AI 答案前 3 位没有你，甚至把核心功能说成竞品的。',
    fix: '实体官方基线 + 引用准确率监测 + 权威外链锚点',
    cta: { text: '查看 B2B SaaS 方案', href: '/solutions#b2b-saas' },
  },
  {
    id: 'b',
    category: '出海品牌',
    title: '多语言 AI 答案中实体不一致',
    icon: '🌏',
    symptom: '中文站被正确引用，英文/日文站却被说成别家公司。',
    fix: '跨语言 Organization 基类 + 多语言 llms.txt + hreflang',
    cta: { text: '查看 出海品牌 方案', href: '/solutions#overseas' },
  },
  {
    id: 'c',
    category: '内容团队',
    title: '投入巨大但 AI 引用 0 提升',
    icon: '✍️',
    symptom: '半年几十万字原创内容，AI 引用的还是三四年前的旧文。',
    fix: '存量高意图内容翻新 + Entity Linking 定义页体系',
    cta: { text: '查看 内容团队 方案', href: '/solutions#content-team' },
  },
];

export function HomePainPoints() {
  return (
    <section
      id="pain-points"
      aria-labelledby="pain-heading"
      className="mx-auto max-w-7xl px-5 py-16 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="pain-heading"
          className="text-3xl font-bold tracking-tight md:text-4xl"
        >
          三类典型客户困境，各有对应解法
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
          搜索引擎排名靠前，DeepSeek / 千问 / Google AIO 却不引用你——这是启用 FlyAI 前最常见的真实处境。
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {PAINS.map((c) => (
          <article
            key={c.id}
            className="flex flex-col items-center gap-3 rounded-3xl border border-gray-200 bg-white p-7 text-center shadow-sm transition hover:border-brand-200"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              {c.category}
            </p>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <span aria-hidden="true" className="text-base">
                {c.icon}
              </span>
              {c.title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600">{c.symptom}</p>
            <p className="rounded-lg bg-brand-50 px-4 py-2.5 text-sm leading-relaxed text-brand-900">
              <span className="font-semibold">解法：</span>
              {c.fix}
            </p>
            <Link
              href={c.cta.href}
              className="mt-auto pt-2 text-sm font-medium text-brand-700 underline underline-offset-2 transition hover:text-brand-900"
            >
              {c.cta.text} →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HomePainPoints;
