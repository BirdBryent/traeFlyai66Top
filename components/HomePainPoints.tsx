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

/** 与 /solutions 前三类客户一一对应（外贸 → 工业制造 → ToB SaaS），改分类时两边同步 */
const PAINS: PainCase[] = [
  {
    id: 'a',
    category: '外贸与跨境出口企业',
    title: '海外买家在 AI 里搜不到你的工厂',
    icon: '🌏',
    symptom: '搜「XX manufacturer / supplier」，答案里全是平台页和同行目录站。',
    fix: '跨语言 Manufacturer / Supplier 实体基线 + 多语言 llms.txt + hreflang',
    cta: { text: '查看外贸跨境方案', href: '/solutions#overseas' },
  },
  {
    id: 'b',
    category: '工业制造与 B2B 供应商',
    title: '型号参数锁在 PDF 里，AI 引用不到',
    icon: '🏭',
    symptom: '采购问「XX 材质哪家能做」，答案被贸易商截流，官网不在候选。',
    fix: '型号 Product + additionalProperty 结构化 + 供应商推荐类问答监测',
    cta: { text: '查看工业制造方案', href: '/solutions#manufacturing' },
  },
  {
    id: 'c',
    category: 'ToB SaaS 与科技服务',
    title: 'AI 推荐工具时，候选列表里没有你',
    icon: '⚙️',
    symptom: '问「有什么 GEO / 协同工具类产品」，被列为候选的是竞品。',
    fix: 'SoftwareApplication Schema + 功能对比页首段直答 + 竞品同框监测',
    cta: { text: '查看 ToB SaaS 方案', href: '/solutions#b2b-saas' },
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
          典型客户困境，各有对应解法
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
          搜索引擎排名靠前，DeepSeek / 千问 / Google AIO 却不引用你——这是启用 FlyAI 前最常见的真实处境。
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {PAINS.map((c) => (
          <article
            key={c.id}
            className="flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition hover:border-brand-200"
          >
            <h3 className="flex items-center gap-1.5 text-base font-semibold text-gray-900">
              <span aria-hidden="true">{c.icon}</span>
              {c.category}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              困境：{c.title}，{c.symptom}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">解法：{c.fix}</p>
            <Link
              href={c.cta.href}
              className="mt-auto pt-4 text-sm font-medium text-brand-700 underline underline-offset-2 transition hover:text-brand-900"
            >
              {c.cta.text} →
            </Link>
          </article>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-gray-600">
        FlyAI GEO 共覆盖五类客户：外贸与跨境出口 · 工业制造与 B2B 供应商 · ToB SaaS
        与科技服务 · 本地服务与连锁门店 · 渠道伙伴（代理商 / 代运营）
        <Link
          href="/solutions"
          className="ml-1 font-medium text-brand-700 underline underline-offset-2 transition hover:text-brand-900"
        >
          查看全部方案 →
        </Link>
      </p>
    </section>
  );
}

export default HomePainPoints;
