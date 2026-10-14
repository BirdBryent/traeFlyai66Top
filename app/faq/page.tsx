import type { Metadata } from 'next';
import RelatedLinks from '@/components/RelatedLinks';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import CTAButton from '@/components/CTAButton';
import JsonLd from '@/components/JsonLd';
import { buildFAQPage, buildBreadcrumbList, FAQItem } from '@/lib/schema';

const title = 'FlyAI 常见问题汇总（FAQ）— 产品 · 方案 · 计费 · 接入 · 合规 全分类';
const description =
  '本 FAQ 收录 FlyAI 客户在评估、签约、接入、使用、续费全周期中最高频出现的 24 个问答，按产品功能、方案与行业、计费与合同、接入与技术支持、数据合规与隐私、服务与售后 6 大类别分块并可跳转锚点，所有问答均在 FAQPage JSON-LD 中完整暴露，供生成式引擎直接作为 Q&A 答案引用源抽取。';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/faq' },
  openGraph: {
    title,
    description,
    url: 'https://flyai66.top/faq',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-default.jpg'] },
  robots: { index: true, follow: true },
};

const crumbs = [
  { label: '首页', href: '/' },
  { label: '常见问题', href: '/faq' },
];

// 6 大类，每类 4 条 = 24 条
const faqCategories: { name: string; items: FAQItem[] }[] = [
  {
    name: '产品功能',
    items: [
      {
        question: 'FlyAI 和我现在用的 SEO 工具可以并行使用吗？',
        answer:
          '完全可以并行使用，二者优化目标不同但不冲突。传统 SEO 工具（如 Semrush、Ahrefs、5118）面向关键词排名、链接权重、SERP 点击率优化；FlyAI 面向生成式引擎的检索召回、综合准确度与引用可信度。建议并行策略：SEO 团队继续负责关键词排名与技术 SEO，市场/内容团队用 FlyAI 负责首段直答改造、FAQ 抽取、Schema 与 llms.txt、引用监测。两套数据在 [引用与提及监测面板](/product) 中可交叉对照，形成「传统排名 + AI 引用」双指标体系。',
      },
      {
        question: 'FlyAI 诊断一次可以覆盖多少 URL？',
        answer:
          '按套餐不同：启动版每月 [联系销售获取报价] URL，专业版每月 [联系销售获取报价] URL，企业版按合同约定（可支持全站不限量扫描）。单次诊断任务建议控制在 500 URL 以内以保证报告质量与交付时效（2 个工作日内）。超过 500 URL 的大站可分批提交，FlyAI 会自动合并为一份全站诊断报告并标注各批次的问题分布。如需一次性扫描超过 10,000 URL 的超大型站点，请 [联系销售](/contact) 定制扫描方案。',
      },
      {
        question: 'llms.txt 生成后需要我自己放到站点根目录吗？',
        answer:
          '取决于你的接入方式：① SaaS 自助版用户需要将 FlyAI 生成的 llms.txt 下载后自行上传到站点根目录（与 robots.txt 同级），FlyAI 控制台会提供校验链接；② API / SDK 接入用户可通过 FlyAI API 直接拉取 llms.txt 内容并在内容流水线中自动写入；③ 企业版私有部署可配置 FlyAI Agent 自动同步到客户 CDN / 对象存储。无论哪种方式，FlyAI 控制台都会在每次 llms.txt 变更后推送通知，提醒用户同步到线上。',
      },
      {
        question: '引用监测支持国内哪几个 AI 产品？',
        answer:
          'FlyAI 引用与提及监测目前覆盖国内 8+ 生成式引擎：DeepSeek 搜索、字节豆包（含 AI 搜索）、阿里云千问/通义、百度文心一言/AI 搜索、讯飞星火、360 智脑、腾讯混元、商汤日日新。海外覆盖 Google AI Overview（AIO）、Bing Copilot、Perplexity、DuckDuckGo AI Chat、You.com、ChatGPT Browse、Claude Browse 等 12+ 引擎。引擎支持清单会随大厂商开放策略每季度更新，最新清单见 [产品文档引用监测引擎支持列表](/docs/api-reference)。',
      },
    ],
  },
  {
    name: '方案与行业',
    items: [
      {
        question: 'B2B SaaS 和电商客户的 GEO 策略差异在哪？',
        answer:
          'B2B SaaS 的 GEO 重点在于「工具推荐」场景：当用户在 AI 中提问「有什么 GEO 工具？」「AI 搜索优化软件推荐」时，你的产品需要被作为工具实体准确引用。策略侧重 Product / SoftwareApplication Schema、功能对比表、术语定义页（让引擎把你的品牌与 GEO 实体绑定）。电商客户的 GEO 重点在于「商品/品牌实体」：需要 Product Schema、Review、品牌故事页，确保 AI 在回答「某品牌某型号怎么样」时正确引用你的商品页。两类客户的共性是首段直答与实体一致性，差异在 Schema 类型选择与引用监测的关键词维度。详细方案见 [解决方案页](/solutions)。',
      },
      {
        question: '出海多语言站点需要多套 llms.txt 吗？',
        answer:
          '建议为每种语言维护一份独立的 llms.txt，放在对应语言子目录的根路径（如 /en/llms.txt、/ja/llms.txt），根目录的 llms.txt 作为主索引指向各语言版本。FlyAI 生成器支持多语言模板，自动为 zh-CN、en-US、ja-JP 等语言生成对应 llms.txt，并在「重要页面」段分别列出各语言的核心页面 URL。多语言站点还需注意 hreflang 标注与各语言首段直答的语言一致性，避免引擎将中文内容综合进英文答案。详见 [产品文档多语言 GEO 指南](/docs/schema-fields)。',
      },
      {
        question: '内容团队 10 人规模大概需要什么套餐？',
        answer:
          '10 人规模的内容团队通常适用专业版。专业版提供 [联系销售获取报价] 篇/月的内容结构化编辑器额度、[联系销售获取报价] 个引用监测关键词、REST API 与 SDK 接入、专属 CSM 季度复盘。若团队同时负责多个品牌或多语言站点，且需要私有部署，则建议升级企业版。你可以 [联系销售](/contact) 说明团队规模、站点数量与月内容产出量，FlyAI 会在 1 个工作日内给出套餐建议与额度测算。',
      },
      {
        question: '代理商有返利或贴牌（OEM）模式吗？',
        answer:
          '有。FlyAI 为代理商提供两种合作模式：① 渠道返利模式：代理商以折扣价采购 FlyAI 套餐，加价转售给终端客户，FlyAI 提供产品、技术支持与品牌物料；② 贴牌（OEM）模式：代理商可使用自有品牌包装 FlyAI 产品，在企业版私有部署基础上替换 Logo、域名与文档，FlyAI 提供底层技术与白标授权。两种模式均需签署渠道合作协议，具体返利比例与 OEM 授权费请 [联系渠道合作团队](mailto:partner@flyai66.top) 获取渠道手册。',
      },
    ],
  },
  {
    name: '计费与合同',
    items: [
      {
        question: 'FlyAI 的计费周期是自然月还是订阅日起算？',
        answer:
          'FlyAI 采用自然月计费（每月 1 日 00:00 至月末 23:59，GMT+8），订阅生效日起算首月费用并按剩余天数比例折算。例如 10 月 15 日订阅专业版，首月费用为专业版月费的一半（按 10 月剩余 17 天折算），11 月 1 日起按完整月计费。年付用户按年计费，订阅日为每年续费日。所有计费规则以 [联系销售](/contact) 出具的《FlyAI 计费说明》为准。',
      },
      {
        question: '是否支持对公转账与增值税专用发票？',
        answer:
          '支持。FlyAI 接受对公转账、支付宝企业版、微信支付企业版、信用卡（Visa/Mastercard）四种支付方式。发票类型可选增值税专用发票（6% 信息技术服务）或增值税普通发票，开票主体为广州飞爱智能科技有限公司。发票在款项到账后 3 个工作日内开具并通过邮件发送电子发票，如需纸质发票请在表单中注明。企业版客户可在合同中约定账期（通常为 30 天）与发票开具节奏。',
      },
      {
        question: '合同到期后数据会被删除吗？',
        answer:
          '不会立即删除。FlyAI 为到期客户提供 30 天数据保留期，期间客户可登录控制台导出全部数据（诊断报告、Schema 项目、llms.txt 版本、引用监测快照、团队账号）。30 天后数据将进入 90 天冷备归档（不可在线访问，可申请付费恢复），90 天后彻底删除。企业版客户可在合同中约定更长的数据保留期（最长 1 年）。数据所有权始终归客户所有，FlyAI 不会在合同终止后使用客户数据训练任何模型。',
      },
      {
        question: '如果对服务效果不满意，退款流程是怎样的？',
        answer:
          'FlyAI 提供「首月不满意全额退款」承诺。订阅生效后 30 自然日内，若客户认为服务未达到 [联系销售](/contact) 出具的《服务计划说明书》中约定的交付标准，可书面（邮件）提出退款申请并附上未达标证据。FlyAI 将在 5 个工作日内审核并退还已支付的首月订阅费用，退款原路返回支付账户。该承诺不适用于：① 因客户未提供必要 URL 清单或权限导致服务无法交付；② 客户主动要求的定制开发费用；③ 企业版合同另行约定的 SLA 条款。',
      },
    ],
  },
  {
    name: '接入与技术支持',
    items: [
      {
        question: 'FlyAI 的 API 速率限制是多少？',
        answer:
          '按套餐不同：启动版不开放 API；专业版 REST API 默认速率为 60 次/分钟、1000 次/天；企业版可协商提升至 600 次/分钟、不限量/天。SDK 走与 REST API 相同的速率限制。所有 API 响应头包含 X-RateLimit-Limit、X-RateLimit-Remaining、X-RateLimit-Reset 字段，客户端可据此做退避重试。企业版客户可申请专属 API 集群与独立配额。详细接口规范见 [产品文档 API 参考](/docs/api-reference)。',
      },
      {
        question: '返回字段中的 confidence 分数是什么含义？',
        answer:
          'confidence 是 FlyAI 诊断引擎对「该页面在生成式引擎中被正确引用的概率」的评分，取值 0-1。评分维度包括：首段直答质量、结构化数据完整性、实体一致性、权威外链数量、历史引用率。confidence ≥ 0.8 表示页面引用状况良好，0.5-0.8 表示需优化，< 0.5 表示存在阻断级问题。该分数为模型推断结果，不代表引擎实际行为，仅供优化优先级参考。字段定义见 [产品文档字段字典](/docs/schema-fields)。',
      },
      {
        question: 'Webhook 签名算法是什么？',
        answer:
          'FlyAI Webhook 使用 HMAC-SHA256 签名，签名密钥在控制台「Webhook 配置」中生成。每个 Webhook 请求头包含 X-FlyAI-Signature（格式为 sha256=<hex>），客户端需使用相同密钥对请求 body 计算 HMAC-SHA256 并比对。建议客户端同时校验 X-FlyAI-Timestamp 时间戳（5 分钟内有效）以防止重放攻击。签名验证失败的请求应返回 401 并记录日志。完整算法与示例代码见 [产品文档 Webhook 安全指南](/docs/api-reference)。',
      },
      {
        question: '沙箱环境和生产环境是否隔离？',
        answer:
          '完全隔离。FlyAI 为每个客户提供独立的沙箱环境（Sandbox）与生产环境（Production），二者数据、配额、API Key、域名均物理隔离。沙箱环境用于开发联调，配额宽松但不保证 SLA；生产环境用于线上业务，受 SLA 保障。沙箱环境的 API 调用不计入生产配额，生产环境的诊断报告不会出现在沙箱。企业版私有部署客户可在自有 K8s 集群中进一步划分命名空间实现多环境隔离。',
      },
    ],
  },
  {
    name: '数据合规与隐私',
    items: [
      {
        question: 'FlyAI 如何处理客户提交的 URL 与业务数据？',
        answer:
          'FlyAI 严格遵循《中华人民共和国个人信息保护法》与 GDPR。客户提交的 URL 清单、诊断报告、Schema 项目、引用监测数据均归客户所有，FlyAI 仅在服务期间用于：① 生成诊断报告与优化建议；② 维护客户账户与账单。FlyAI 不会将客户数据用于训练任何第三方模型，不会向任何第三方出售或共享客户数据（法律要求除外）。企业版客户可签署 DPA（数据处理协议）明确数据处理边界。详见 [服务条款与隐私政策](/privacy)。',
      },
      {
        question: '数据存储在哪里？是否支持数据本地化？',
        answer:
          '标准版数据存储在阿里云（华东 2 地域）与腾讯云（广州地域）的对象存储与数据库中，符合中国数据本地化要求。企业版私有部署客户可选择数据存储在自有云环境或 IDC，FlyAI 不持有任何客户数据。出海客户可选择 AWS Singapore / ap-southeast-1 区域存储，满足 GDPR 数据驻留要求。数据传输全程 TLS 1.2+ 加密，静态数据采用 AES-256 加密。',
      },
      {
        question: '是否通过了 ISO 27001 或等保认证？',
        answer:
          'FlyAI 正在申请 ISO/IEC 27001 信息安全管理体系认证与网络安全等级保护 2.0 三级认证，预计 [待补充：真实取证时间] 取得证书。在取证完成前，FlyAI 参照 ISO 27001 与等保三级要求建立了内部安全管理制度，包括：最小权限访问、操作审计日志、漏洞扫描、渗透测试、数据备份与灾备。企业版客户可索取最新的安全白皮书与第三方渗透测试报告（需签署 NDA）。',
      },
      {
        question: '如何申请删除我的账户与全部数据？',
        answer:
          '你可以通过两种方式申请账户与数据删除：① 在控制台「账户设置 → 注销账户」中提交注销申请；② 发送邮件至 privacy@flyai66.top，邮件标题「数据删除申请」并附上账户注册邮箱。FlyAI 将在收到申请后 15 个工作日内完成数据删除并发送确认邮件。数据删除后不可恢复，请在删除前导出所需数据。根据法律要求，部分财务数据（发票、合同）需保留 10 年，不在删除范围内。',
      },
    ],
  },
  {
    name: '服务与售后',
    items: [
      {
        question: 'FlyAI 的 SLA（服务等级协议）承诺是多少？',
        answer:
          '标准版（启动版/专业版）承诺月度服务可用性 ≥ 99.5%（即每月停机不超过 3.6 小时）；企业版可在合同中约定 ≥ 99.9% 或 99.95% 的 SLA，并配套相应的赔偿条款（按停机时长抵扣订阅费用）。SLA 统计排除计划内维护（提前 7 天通知）、客户自身原因、不可抗力。若未达 SLA，客户可在次月 5 日前提交赔偿申请，FlyAI 在 10 个工作日内核实并返还抵扣额度。完整 SLA 条款见合同附件。',
      },
      {
        question: '技术支持的响应时效是怎样的？',
        answer:
          '按套餐分级：启动版工单支持，响应时效 48 小时；专业版工单 + 在线聊天，响应时效 8 小时；企业版 7×24 小时专属客服 + SLA（P0 级 1 小时响应、P1 级 4 小时响应）。所有支持请求均通过工单系统追踪，确保可追溯。企业版客户配备专属技术支持经理（TAM），提供 1v1 对接。支持渠道：工单系统、在线聊天、邮件（support@flyai66.top）、电话（企业版专属）。',
      },
      {
        question: 'FlyAI 会定期发布产品更新吗？如何获取？',
        answer:
          'FlyAI 每两周一迭代，每月发布一次版本更新说明。更新内容包括：新功能、引擎支持扩展、Schema 规范对齐、性能优化、安全修复。所有更新通过：① 控制台「更新日志」页面；② 客户邮件订阅；③ 专属 CSM 通知（企业版）三种方式推送。重大功能更新会邀请客户参与内测并提供 1 个月免费试用。更新不影响现有套餐配额与合同价格。',
      },
      {
        question: '有没有客户成功案例可以参考？',
        answer:
          'FlyAI 官网 [客户案例页](/cases) 展示了经过客户签署 MAA（案例授权协议）的脱敏案例，覆盖 B2B SaaS、跨境电商、媒体、教育等行业。每个案例按「背景-动作-结果」结构呈现，结果数据均经过客户确认。未脱敏的完整案例需在 [联系销售](/contact) 后签署 NDA 方可查阅。案例中的数据为真实交付结果，但因客户行业与站点基础不同，不构成对其他客户的效果承诺。',
      },
    ],
  },
];

const allFaqItems: FAQItem[] = faqCategories.flatMap((c) => c.items);

export default function FAQPage() {
  return (
    <div className="text-gray-900">
      <Breadcrumb items={crumbs} jsonLdOnly />

      <PageHero
        eyebrow="常见问题"
        h1={title}
        lead={description}
        ctaPrimary={{ text: '联系销售', href: '/contact' }}
        ctaSecondary={{ text: '阅读文档', href: '/docs' }}
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">分类索引</h2>
        <p className="mt-4 text-lg text-gray-600">
          共 {allFaqItems.length} 条问答，按 {faqCategories.length} 大类别分块。点击分类可跳转到对应详细问答区。
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {faqCategories.map((cat, idx) => (
            <a
              key={cat.name}
              href={`#cat-${idx + 1}`}
              className="group rounded-2xl border border-gray-200 p-6 transition hover:border-brand-400 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-700">
                  {idx + 1}. {cat.name}
                </h3>
                <span className="text-sm text-gray-400">{cat.items.length} 条</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {cat.items.map((it) => (
                  <li key={it.question} className="line-clamp-1">· {it.question}</li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">详细问答</h2>
        <div className="mt-10 space-y-12">
          {faqCategories.map((cat, idx) => (
            <div key={cat.name} id={`cat-${idx + 1}`} className="scroll-mt-24">
              <h3 className="text-2xl font-bold text-brand-700">
                {idx + 1}. {cat.name}
              </h3>
              <div className="mt-6 space-y-4">
                {cat.items.map((it, qIdx) => (
                  <details key={it.question} className="group">
                    <summary className="cursor-pointer text-left font-medium text-gray-900">
                      <span className="pr-4">
                        Q{idx * 4 + qIdx + 1}. {it.question}
                      </span>
                    </summary>
                    <div className="faq-answer mt-3 whitespace-pre-line leading-relaxed text-gray-700">
                      {it.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-3xl font-bold md:text-4xl">没有找到答案？联系销售获得一对一解答</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            FlyAI 商务团队将在工作日 24 小时内回复你的问题，或安排 30 分钟产品演示。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/contact" size="lg" variant="primary" className="!bg-white !text-brand-800 hover:!bg-white/90">
              联系销售
            </CTAButton>
            <CTAButton href="/docs" size="lg" variant="ghost" className="!bg-white/10 !text-white ring-1 ring-white/30 hover:!bg-white/20">
              阅读文档
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 参考资料与延伸阅读 */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">参考资料与延伸阅读</h2>
        <ul className="mt-6 space-y-3 text-base text-gray-700">
          <li>
            <a href="https://schema.org/docs/gs.html" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Schema.org 官方 Getting Started 指南</a>
            <span className="text-gray-500"> — 结构化数据类型与 JSON-LD 标记规范</span>
          </li>
          <li>
            <a href="https://developers.google.com/search/docs/appearance/structured-data" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Google Search Central 结构化数据文档</a>
            <span className="text-gray-500"> — Google 对结构化数据的收录与展示规则</span>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Search_engine_optimization" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Wikipedia: Search Engine Optimization</a>
            <span className="text-gray-500"> — SEO 基础概念与搜索引擎工作原理</span>
          </li>
        </ul>
      </section>

      <RelatedLinks path="/faq" />
      <JsonLd data={[buildBreadcrumbList(crumbs), buildFAQPage(allFaqItems)]} />
    </div>
  );
}
