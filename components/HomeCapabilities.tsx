'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from './clsx';

type Capability = {
  id: string;
  title: string;
  icon: { src: string; alt: string; emoji?: string };
  summary: string[];
  details: {
    intro: string;
    bullets: string[];
    footnote?: string;
  };
};

const CAPABILITIES: Capability[] = [
  {
    id: 'diagnose',
    title: '① AI 搜索可见性诊断（GEO Health Scan）',
    icon: {
      src: '/images/icon-diagnose.png',
      alt: 'FlyAI AI 搜索可见性诊断模块图标：同心圆与十字靶心，象征全站扫描与精准定位',
    },
    summary: [
      '100+ 维度 GEO 健康度扫描，按 P0 / P1 / P2 / P3 输出修复优先级',
      '覆盖站点说明文件、结构化数据、首段直答、内链锚点、引用可信度 5 大类',
    ],
    details: {
      intro:
        '从 100+ 维度评估当前站点的 GEO 健康度，按严重等级（P0 / P1 / P2 / P3）输出可操作的修复清单与优先级建议。诊断覆盖以下五类典型问题：',
      bullets: [
        '站点说明文件层：是否缺失 llms.txt、robots.txt、sitemap.xml 中的任一份？是否对主流 AI Bot（GPTBot / ClaudeBot / PerplexityBot / Bytespider 等）开放了根路径抓取？',
        '结构化数据层：FAQPage / Article / BreadcrumbList / Organization / SoftwareApplication 五类 JSON-LD 的完整性、一致性与可通过 validator.schema.org 的合规性。',
        '首段直达答案层：核心 10 页面首段是否「3 句话内直达核心结论」？是否存在空洞营销套话被生成式引擎作为噪声段落过滤的风险？',
        '内链与锚点层：内部链接的锚文本是否实体化（指向 GEO 术语中定义的核心词），而不是模糊的「点击这里」？',
        '引用可信度层：权威外链（.gov / .edu / arXiv / ACM / IEEE / Nature / Google 官方开发者文档）的数量、锚点分布与新鲜度——引用可信度是 GEO 区别于传统 SEO 的关键指标。',
      ],
      footnote: '详细诊断项清单：请参考 产品文档 / 快速开始 中的「GEO Health Scan 100+ 维度解释表」。',
    },
  },
  {
    id: 'structure',
    title: '② 内容结构化与首段直答改造',
    icon: {
      src: '/images/icon-structure.png',
      alt: 'FlyAI 内容结构化模块图标：网格化方块与亮色白边，象征实体对齐与结构化切片',
    },
    summary: [
      '首段三句直达答案 + FAQ 自动抽取 + 要点表格化「三件套」翻新存量内容',
      '对齐生成式检索器的段落切片策略，减少噪声与「答案综合张冠李戴」概率',
    ],
    details: {
      intro:
        '生成式引擎的检索器（Retriever）在抓取页面后，会按 128 / 256 / 512 token 固定窗口切片并做向量召回。FlyAI 内容结构化改造的核心，就是让你的核心结论出现在**每个高意图切片的第一句**，从而在综合阶段被优先引用。下面是典型的 3 步法交付内容：',
      bullets: [
        '首段直达答案改造：把「在这个数字化时代……」一类套话全部删掉，用 3 句话完成「你是谁 / 解决什么问题 / 和竞品有什么不同」的实体基线输出。',
        'FAQ 自动抽取与结构化：从现有博客 / 帮助中心 / 产品白皮书里，自动聚类出用户高频提问的 20-30 条 FAQ，并统一以 FAQPage JSON-LD 输出到对应页面头部。',
        '要点表格化与可引用块：对定价对比、功能对比、交付物清单、接口字段四类高意图内容，用 <table> / <ol> 的原生结构输出可直接被引用的原子化段落。',
        '存量翻新流程：先锁定 Top 30 高意图页（按品牌词 / 品类词 / 解决方案词排序），用「三件套」模板一周内完成改造，之后新增内容自动套用模板流水线。',
      ],
      footnote: '落地流程与交付物样例：可在 产品功能 页查看完整的结构化改造路线图。',
    },
  },
  {
    id: 'schema',
    title: '③ Schema.org JSON-LD 与 llms.txt 自动生成',
    icon: {
      emoji: '🧩',
      src: '/images/icon-diagnose.png',
      alt: 'FlyAI Schema 与 llms.txt 生成图标：拼图与代码碎片，象征结构化标准对齐',
    },
    summary: [
      '6 类 JSON-LD（Org / WebSite / FAQPage / BreadcrumbList / Article / SoftwareApp）全站自动输出',
      'llms.txt 四段式（摘要/重要 URL/Reading Notes/限制）规范，覆盖 12+ 主流大模型的抓取约定',
    ],
    details: {
      intro:
        '结构化数据是 GEO 的「机器端沟通语言」。FlyAI 按 schema.org 官方维护的 6 类核心类型与 llms.txt 社区约定的四段格式，分别对应生成式引擎「抓取 → 解析 → 建立实体知识库」三个阶段的标准输入：',
      bullets: [
        'Organization + WebSite 基类：统一输出公司官方实体基线（name / url / logo / sameAs / contactPoint / address），跨页 100% 一致，避免引擎在组织层产生歧义。',
        'FAQPage + Article + BreadcrumbList 内容页三件套：FAQPage 对应答区可直接被 DeepSeek / 豆包等模型作为引用来源；Article 的 headline + dateModified + author + publisher 五字段是 AIO / Perplexity 选择引用源的重要权重信号；BreadcrumbList 让引擎理解站点的层级信息架构。',
        'SoftwareApplication 产品与定价：输出 featureList + applicationCategory + operatingSystem + offers 四件套，配合产品与定价页面，让引擎在回答「XX 软件有哪些功能 / 怎么收费」时优先输出 FlyAI 客户的官方口径。',
        'llms.txt 四段式：① 1 段品牌与品类摘要；② 8 条优先抓取的高意图 URL；③ 5 条 AI Reading Notes（事实 + 来源双列）；④ 抓取与引用限制说明——一次性写清给 12+ 模型的站点规则。',
      ],
      footnote: '字段级对照与在线校验方式：请参考下方 Schema 类型对照表，或访问 schema.org 官方 Getting Started 指南。',
    },
  },
  {
    id: 'monitor',
    title: '④ 12+ 生成式引擎引用与提及监测',
    icon: {
      emoji: '📈',
      src: '/images/icon-structure.png',
      alt: 'FlyAI 引用监测模块图标：曲线与柱状图，象征持续追踪与归因',
    },
    summary: [
      '每周采集 12+ 引擎 × 品牌词 / 品类词 / 竞对词的组合搜索结果',
      '输出答案覆盖度 / 引用链接率 / 实体描述准确率 / Top 答案顺位 4 条核心指标',
    ],
    details: {
      intro:
        'GEO 无法提升你无法衡量的东西。FlyAI 引用与提及监测面板每周在 12+ 生成式引擎上采集你的品牌 + 核心关键词的组合搜索，输出四条关键指标，并给出环比变化与归因（对应哪一项站内改造动作）：',
      bullets: [
        '答案覆盖度：同一次搜索中，品牌 / 产品被作为答案段落提及的比例。',
        '引用链接率：答案下方「引用来源 / Sources」区块里，官网链接出现的次数与顺位。',
        '实体描述准确率：是否存在张冠李戴（例如你的产品被说成是另一家公司做的）或功能描述严重偏离官网口径的情况——这是 GEO 最危险的 P0 级问题，需要 48 小时内响应处理。',
        'Top 答案顺位：当综合答案被引擎按 bullet / 编号列出多个品牌或方案时，你的品牌排在第几位，第一次出现在第几位？',
      ],
      footnote: '具体指标口径与交付示例：请 预约演示 由 FlyAI 解决方案工程师结合你的行业场景做 30 分钟带 Demo 的说明。',
    },
  },
];

export function HomeCapabilities() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="mx-auto max-w-7xl px-5 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2
          id="capabilities-heading"
          className="whitespace-nowrap text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.5rem]"
        >
          FlyAI 四项核心能力，覆盖生成式引擎优化完整闭环
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
          生成式引擎的答案生成链路分四步：抓取 → 召回 → 综合 → 引用。FlyAI 的四项能力分别对应链路上的四个阶段，任何一个环节的结构性问题都会直接影响你的品牌在 AI 答案中的出现概率与权重。下面是{' '}
          <Link href="/product" className="text-brand-700 underline underline-offset-2 hover:text-brand-900">
            产品功能总览
          </Link>{' '}
          中最常被客户问到的四项核心能力拆解：
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {CAPABILITIES.map((c) => {
          const open = openId === c.id;
          return (
            <article
              key={c.id}
              className={clsx(
                'flex flex-col gap-5 rounded-3xl border bg-white p-7 shadow-sm transition-all duration-300',
                open ? 'border-brand-300 ring-1 ring-brand-200' : 'border-gray-200 hover:border-brand-200',
              )}
            >
              <button
                type="button"
                className="group flex items-start gap-4 text-left touch-target min-h-[44px]"
                aria-expanded={open}
                aria-controls={`cap-detail-${c.id}`}
                onClick={() => setOpenId((cur) => (cur === c.id ? null : c.id))}
              >
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-50 ring-1 ring-brand-200">
                  {c.icon.emoji ? (
                    <span className="text-2xl" aria-hidden="true">
                      {c.icon.emoji}
                    </span>
                  ) : (
                    <Image src={c.icon.src} alt={c.icon.alt} width={56} height={56} />
                  )}
                </div>
                <div className="min-w-0 flex-1 pt-2">
                  <h3 className="text-xl font-semibold text-gray-900">{c.title}</h3>
                  <div className="mt-3 space-y-1.5 text-sm leading-relaxed text-gray-600">
                    {c.summary.map((s, i) => (
                      <p key={i} className="line-clamp-1 text-[0.95rem]">
                        {s}
                      </p>
                    ))}
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className={clsx(
                    'mt-3 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition group-hover:border-brand-300 group-hover:text-brand-700',
                    open && 'rotate-180 border-brand-300 text-brand-700',
                  )}
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>

              <div
                id={`cap-detail-${c.id}`}
                role="region"
                aria-labelledby={c.id + '-heading'}
                className={clsx(
                  'grid transition-all duration-300 ease-out',
                  open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <div className="pt-2 text-gray-700">
                    <p className="leading-relaxed">{c.details.intro}</p>
                    <ul className="mt-4 list-disc space-y-2 pl-6">
                      {c.details.bullets.map((b, i) => (
                        <li key={i} className="leading-relaxed">
                          {b}
                        </li>
                      ))}
                    </ul>
                    {c.details.footnote && (
                      <p className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-500">
                        {c.details.footnote}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default HomeCapabilities;
