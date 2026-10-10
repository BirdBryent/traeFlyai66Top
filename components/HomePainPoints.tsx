'use client';

import { useState } from 'react';
import clsx from './clsx';
import CTAButton from './CTAButton';

type PainCase = {
  id: 'a' | 'b' | 'c';
  kindTitle: string;
  category: string;
  who: string;
  symptom: string;
  fix: string[];
  ability: string;
  cta: { text: string; href: string };
  preview: string[];
};

const PAINS: PainCase[] = [
  {
    id: 'a',
    category: '困境 A · B2B SaaS',
    kindTitle: '品牌在 AI 答案中被张冠李戴',
    who: 'B2B SaaS 团队：年 ARR 5000 万-5 亿，传统品牌 SEO 做得不错',
    symptom:
      '客户用「XX 品类 + 软件推荐」去搜 AI，答案前 3 位里都没有你的品牌，甚至把你的核心功能和公司说成是竞品的。官网排名不错，但 Google AIO 的 Sources 里 10 次只有 1 次出现你。',
    fix: [
      '① 在 关于页 定义实体官方基线（名称 / 总部 / 成立年份 / 核心品类），并与 llms.txt、Organization JSON-LD 三者 100% 对齐；',
      '② 针对 Top 10 品类关键词 × 5 个引擎建立每周引用准确率基线，发现张冠李戴 48h 内用定向实体锚点改写修复；',
      '③ 在权威外链层面布局 10-20 条第三方 .gov / .edu / 行业媒体的实体锚点。',
    ],
    ability: '① + ② + ④（诊断 + 结构化 + 引用监测）',
    cta: { text: '查看 B2B SaaS 方案', href: '/solutions' },
    preview: [
      '典型客户：B2B SaaS、年 ARR 5000 万以上、品牌 SEO 已经做过一轮',
      '核心症状：AI 答案里把你的功能说成竞品的，张冠李戴频发',
      'FlyAI 解法：建立跨 Organization/llms.txt/JSON-LD 的实体官方基线',
    ],
  },
  {
    id: 'b',
    category: '困境 B · 出海品牌',
    kindTitle: '多语言 AI 答案中实体不一致',
    who: '跨境品牌 / 多语言站点：SKU 级内容矩阵，英 / 日 / 西 / 阿语至少 2 种',
    symptom:
      '中文站品牌被正确引用，但英文站在 Perplexity / ChatGPT Browse 搜索时经常被说成是中国制造工厂、或把你的系列名与子品牌混为一谈。多站点 schema 各写各的，没有统一 Organization 基类。',
    fix: [
      '① 为每个品牌建立跨语言一致的 Organization 与 Product 父类 Schema，按 Google Developer 多语言站点指南 建立 hreflang + alternate 映射；',
      '② 每个语言站点单独一份 llms.txt（通过不同子域名或子路径访问），明确写出实体别名、禁止混淆的竞对名单；',
      '③ 出海核心关键词的 12+ 引擎引用率每周观测，重大事件（如融资 / 产品发布）后 72 小时内刷新全站实体锚点。',
    ],
    ability: '① + ② + ③（诊断 + 结构化 + Schema/llms 生成）',
    cta: { text: '联系销售定制方案', href: '/contact' },
    preview: [
      '典型客户：出海品牌、跨境电商、SKU 级内容矩阵、至少 2 种语言',
      '核心症状：中文站 OK，英文/日文站实体被混为一谈或被说错工厂来源',
      'FlyAI 解法：跨站点一致的 Organization 基类 + 多语言 llms.txt + hreflang 映射',
    ],
  },
  {
    id: 'c',
    category: '困境 C · 内容团队',
    kindTitle: '投入巨大但 AI 引用 0 提升',
    who: '内容 / 增长团队：每周 5-10 篇高质量原创内容，CMS 体系完备',
    symptom:
      '团队按传统 SEO best practice 写了半年，总字数几十万；但用品牌词 + 品类词搜 AI 时，答案引用的还是 3-4 年前的旧博客，新内容几乎没有被 AI 端检索器作为高权重来源召回。',
    fix: [
      '① 先做「内容存量结构化改造」：按 FlyAI 三句首段直答模板 + FAQ 抽取 + 要点表格化 3 步法翻新核心 30 篇高意图内容，增量内容再遵循统一模板；',
      '② 为 术语表 建立全站最权威的 10 个核心概念定义页，每个定义页配 1+ 权威来源，并把所有正文锚点指向这些定义页（作为 Entity Linking 的站内权威）；',
      '③ 通过 FlyAI 博客中心 的「GEO 研究报告」系列持续累积引用可信度：每篇研究至少引用 3 条权威来源，并在发布后 30 天内完成第三方行业媒体的反向锚点布局。',
    ],
    ability: '② + ③ + ④（结构化 + Schema/llms + 引用监测）',
    cta: { text: '申请内容诊断', href: '/contact' },
    preview: [
      '典型客户：内容团队/增长团队，每周 5-10 篇原创、CMS 体系完备',
      '核心症状：写了半年几十万字，但 AI 引用的还是 3-4 年前的旧内容',
      'FlyAI 解法：存量 30 篇高意图内容翻新 + 全站 Entity Linking 定义页体系 + 研究报告引用可信度',
    ],
  },
];

export function HomePainPoints() {
  const [openId, setOpenId] = useState<PainCase['id'] | null>(null);

  return (
    <section id="pain-points" aria-labelledby="pain-heading" className="bg-gradient-to-b from-gray-50 via-white to-white">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2
            id="pain-heading"
            className="whitespace-nowrap text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.5rem]"
          >
            三类客户最常见的 AI 引用困境——FlyAI 的对应解法
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
            我们服务 B2B SaaS、出海品牌、独立内容团队与代理商四种典型客户。他们在决定启用 FlyAI
            之前，通常都遇到过下列三类「我的网站在 Google 排名挺靠前，但 DeepSeek / 千问 / AIO
            就是不引用我」的真实困境。
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {PAINS.map((c) => {
            const open = openId === c.id;
            return (
              <article
                key={c.id}
                className={clsx(
                  'flex flex-col rounded-3xl border bg-white p-7 shadow-sm transition-all duration-300',
                  open ? 'border-brand-300 ring-1 ring-brand-200' : 'border-gray-200 hover:border-brand-200',
                )}
              >
                <button
                  type="button"
                  className="group flex w-full flex-col items-start gap-3 text-left touch-target min-h-[44px]"
                  aria-expanded={open}
                  aria-controls={`pain-detail-${c.id}`}
                  onClick={() => setOpenId((cur) => (cur === c.id ? null : c.id))}
                >
                  <div className="flex w-full items-start gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                        {c.category}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-gray-900">{c.kindTitle}</h3>
                    </div>
                    <span
                      aria-hidden="true"
                      className={clsx(
                        'mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition group-hover:border-brand-300 group-hover:text-brand-700',
                        open && 'rotate-180 border-brand-300 text-brand-700',
                      )}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <ul className="mt-2 w-full space-y-2 text-[0.95rem] leading-relaxed text-gray-700">
                    {c.preview.map((s, i) => (
                      <li
                        key={i}
                        className={clsx(
                          'relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand-500',
                          !open && 'line-clamp-1',
                        )}
                      >
                        {s}
                      </li>
                    ))}
                    <li
                      className={clsx(
                        'relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand-500',
                        !open && 'line-clamp-1',
                      )}
                    >
                      典型画像：{c.who}
                    </li>
                    <li
                      className={clsx(
                        'relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand-500',
                        !open && 'line-clamp-2',
                      )}
                    >
                      困境症状：{c.symptom}
                    </li>
                  </ul>
                </button>

                <div
                  id={`pain-detail-${c.id}`}
                  role="region"
                  aria-labelledby={c.id + '-heading'}
                  className={clsx(
                    'grid transition-all duration-300 ease-out',
                    open ? 'mt-7 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:pt-4 lg:border-t lg:border-gray-100 lg:pt-5">
                      <dl className="space-y-5 text-gray-700">
                        <div>
                          <dt className="font-medium text-gray-800">典型客户画像</dt>
                          <dd className="mt-1 leading-relaxed">{c.who}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-800">困境症状</dt>
                          <dd className="mt-1 leading-relaxed">{c.symptom}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-800">FlyAI 建议三步法</dt>
                          <dd className="mt-1">
                            <ul className="space-y-1.5 pl-4">
                              {c.fix.map((f, i) => (
                                <li
                                  key={i}
                                  className="relative pl-5 leading-relaxed before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand-500"
                                >
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      </dl>
                      <div className="flex flex-col justify-between gap-6 rounded-2xl border border-brand-100 bg-brand-50/40 p-6">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                            对应 FlyAI 核心能力
                          </p>
                          <p className="mt-2 text-base font-medium text-brand-900">{c.ability}</p>
                        </div>
                        <div>
                          <CTAButton href={c.cta.href} variant="primary" size="md">
                            {c.cta.text}
                          </CTAButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-gray-500 leading-relaxed">
          权威引用来源说明：本页在描述 GEO 方法论与结构化数据实践时，优先引用{' '}
          <a
            href="https://schema.org/docs/gs.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-700 underline underline-offset-2 hover:text-brand-900"
          >
            schema.org 官方 Getting Started
          </a>
          、
          <a
            href="https://en.wikipedia.org/wiki/Search_engine_optimization"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-700 underline underline-offset-2 hover:text-brand-900"
          >
            Wikipedia · SEO 词条
          </a>
          、与
          <a
            href="https://developers.google.com/search/docs/appearance/structured-data"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-700 underline underline-offset-2 hover:text-brand-900"
          >
            Google Search Central 结构化数据指南
          </a>{' '}
          三份公开文档作为事实性参考依据；所有引用均为公开资料，不代表任何商业背书。
        </p>
      </div>
    </section>
  );
}

export default HomePainPoints;
