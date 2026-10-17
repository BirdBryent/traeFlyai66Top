import Image from 'next/image';
import Link from 'next/link';

type Capability = {
  id: string;
  title: string;
  desc: string;
  href: string;
  icon: { src: string; alt: string; emoji?: string };
};

const CAPABILITIES: Capability[] = [
  {
    id: 'diagnose',
    title: 'AI 搜索可见性诊断',
    desc: '100+ 维度 GEO 健康度扫描，按 P0-P3 输出修复优先级',
    href: '/product#visibility-diagnosis',
    icon: {
      src: '/images/icon-diagnose.png',
      alt: 'FlyAI AI 搜索可见性诊断模块图标：同心圆与十字靶心，象征全站扫描与精准定位',
    },
  },
  {
    id: 'structure',
    title: '内容结构化与首段直答改造',
    desc: '首段三句直答 + FAQ 自动抽取 + 要点表格化',
    href: '/product#content-structuring',
    icon: {
      src: '/images/icon-structure.png',
      alt: 'FlyAI 内容结构化模块图标：网格化方块与亮色白边，象征实体对齐与结构化切片',
    },
  },
  {
    id: 'schema',
    title: 'Schema.org 与 llms.txt 自动生成',
    desc: '6 类 JSON-LD 全站输出 + llms.txt 四段式规范',
    href: '/product#schema-llms',
    icon: {
      emoji: '🧩',
      src: '/images/icon-diagnose.png',
      alt: 'FlyAI Schema 与 llms.txt 生成图标：拼图与代码碎片，象征结构化标准对齐',
    },
  },
  {
    id: 'monitor',
    title: '引用与提及监测',
    desc: '12+ 引擎引用率趋势追踪与实体错误告警',
    href: '/product#citation-monitoring',
    icon: {
      emoji: '📈',
      src: '/images/icon-structure.png',
      alt: 'FlyAI 引用监测模块图标：曲线与柱状图，象征持续追踪与归因',
    },
  },
];

export function HomeCapabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="mx-auto max-w-7xl px-5 py-16 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="capabilities-heading"
          className="text-3xl font-bold tracking-tight md:text-4xl"
        >
          四项核心能力，覆盖 GEO 完整闭环
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
          生成式引擎的答案链路分四步：抓取 → 召回 → 综合 → 引用。任一环节的结构性问题都会直接拉低你的品牌引用率。
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {CAPABILITIES.map((c) => (
          <article
            key={c.id}
            className="flex flex-col items-center gap-3 rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:border-brand-200"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-brand-200">
              {c.icon.emoji ? (
                <span className="text-xl" aria-hidden="true">
                  {c.icon.emoji}
                </span>
              ) : (
                <Image src={c.icon.src} alt={c.icon.alt} width={48} height={48} />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{c.title}</h3>
            <p className="text-sm leading-relaxed text-gray-600">{c.desc}</p>
            <Link
              href={c.href}
              className="mt-auto pt-1 text-sm font-medium text-brand-700 underline underline-offset-2 transition hover:text-brand-900"
            >
              了解详情 →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HomeCapabilities;
