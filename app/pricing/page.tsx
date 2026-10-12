import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import CTAButton from '@/components/CTAButton';
import JsonLd from '@/components/JsonLd';
import { buildFAQPage, buildBreadcrumbList, FAQItem } from '@/lib/schema';

const title = 'FlyAI 定价 — 启动版 · 专业版 · 企业版 三档订阅方案';
const description =
  'FlyAI 提供按月订阅的透明定价：启动版适合 3 人以内内容团队试水 GEO；专业版适合 10-50 人市场/增长团队规模化运行；企业版适合 50+ 人或多品牌集团客户定制私有部署、SLA 保障与专属 CSM 服务。所有套餐价格以联系销售后的正式报价单为准，页面不展示任何虚假金额。';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/pricing' },
  openGraph: {
    title,
    description,
    url: 'https://flyai66.top/pricing',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-default.jpg'] },
  robots: { index: true, follow: true },
};

const faqItems: FAQItem[] = [
  {
    question: '可以先免费试用再付费吗？',
    answer:
      '可以。FlyAI 为所有新客户提供 [免费 AI 搜索可见性诊断](/contact)（提交 ≤ 500 个 URL，2 个工作日内交付 100+ 维度报告），以及启动版 14 天功能试用（不含企业版私有部署与专属 CSM）。试用期间产生的诊断报告、Schema 生成结果与引用监测基线数据均归客户所有，不要求绑定支付方式。试用结束后可选择任一付费套餐继续使用，数据无缝保留。具体试用范围以 [联系销售](/contact) 出具的试用协议为准。',
  },
  {
    question: '诊断额度当月用不完可以结转到下个月吗？',
    answer:
      '诊断额度按自然月计费，当月未使用的额度原则上不结转。FlyAI 采用「用则扣、不用则废」的配额机制，与主流 SaaS 订阅模式一致。企业版客户可在合同中与销售协商额度结转条款（通常按合同金额的一定比例结转，最长不超过 3 个月）。详细配额规则请 [联系销售](/contact) 获取最新版《FlyAI 计费与配额说明》。',
  },
  {
    question: '企业版的私有部署支持哪些云？',
    answer:
      '企业版私有部署支持以下云环境（以正式合同为准）：① 阿里云（华东 1/2、华北 2 等地域）；② 腾讯云（广州、上海、北京等地域）；③ 华为云（北京四、上海一等）；④ AWS（us-east-1、ap-southeast-1 等）；⑤ 自建 IDC / OpenStack。私有部署需要客户提供 Kubernetes 集群（v1.22+）与对象存储（S3 兼容或阿里云 OSS / 腾讯云 COS），FlyAI 提供部署文档与 8 小时远程实施支持。若需专属实施工程师驻场，可在合同中单独约定。',
  },
  {
    question: '是否支持年付折扣？',
    answer:
      '支持年付，年付客户可享受一定比例的订阅费用折扣（具体折扣比例以 [联系销售](/contact) 出具的正式报价单为准）。年付客户还可获得：① 额外诊断额度（按月度额度的 10% 叠加）；② 优先接入新功能内测；③ 专属客户成功经理（CSM）季度复盘。年付与月付可随时切换，已支付的月付费用按比例抵扣年付金额。',
  },
  {
    question: '从启动版升级到专业版需要做数据迁移吗？',
    answer:
      '不需要手动迁移。FlyAI 所有套餐共享同一套账户体系与数据存储，升级时只需在控制台「套餐管理」中切换，历史诊断报告、Schema 项目、llms.txt 版本、引用监测快照与团队成员账号均自动保留，无任何数据丢失。升级立即生效，新额度按剩余天数比例折算。降级同理（从专业版降到启动版），超出启动版配额的功能将在降级后只读，不删除数据。',
  },
  {
    question: '如果对服务效果不满意可以退款吗？',
    answer:
      'FlyAI 提供「首月不满意全额退款」承诺：订阅生效后 30 自然日内，若客户认为诊断报告或服务未达到 [联系销售](/contact) 出具的《服务计划说明书》中约定的交付标准，可书面提出退款申请，FlyAI 将在 5 个工作日内退还已支付的首月订阅费用。退款不影响客户已获得的诊断报告与数据所有权。该承诺不适用于：① 因客户未提供必要 URL 清单或访问权限导致服务无法交付的情况；② 客户主动要求的定制开发费用；③ 企业版合同中另行约定的 SLA 条款。',
  },
];

const crumbs = [
  { label: '首页', href: '/' },
  { label: '定价', href: '/pricing' },
];

const plans = [
  {
    name: '启动版',
    tagline: '适合 3 人以内内容团队试水 GEO',
    features: [
      '每月诊断额度：[联系销售获取报价] URL',
      '内容结构化编辑器：[联系销售获取报价] 篇/月',
      'Schema 与 llms.txt 生成器：站点数 [联系销售获取报价]',
      '引用与提及监测：关键词 [联系销售获取报价] 个',
      '支持引擎：国内 5 + 海外 5',
      '刷新频率：日频',
      '团队成员：[联系销售获取报价] 个席位',
      '技术支持：工单（48 小时响应）',
    ],
  },
  {
    name: '专业版',
    tagline: '适合 10-50 人市场/增长团队规模化运行',
    features: [
      '每月诊断额度：[联系销售获取报价] URL',
      '内容结构化编辑器：[联系销售获取报价] 篇/月',
      'Schema 与 llms.txt 生成器：站点数 [联系销售获取报价]',
      '引用与提及监测：关键词 [联系销售获取报价] 个',
      '支持引擎：国内 8 + 海外 12+（实时监测可选）',
      '刷新频率：日频 + 周频',
      '团队成员：[联系销售获取报价] 个席位',
      '技术支持：工单 + 在线聊天（8 小时响应）',
      'API 访问：REST + SDK',
      '专属 CSM：季度复盘',
    ],
  },
  {
    name: '企业版',
    tagline: '适合 50+ 人或多品牌集团定制私有部署',
    features: [
      '诊断额度：按合同约定（不限量可议）',
      '内容结构化编辑器：不限量',
      'Schema 与 llms.txt 生成器：站点数不限',
      '引用与提及监测：关键词不限',
      '支持引擎：全量 12+ 引擎 + 自定义',
      '刷新频率：实时 / 日频 / 周频',
      '团队成员：不限席位',
      '技术支持：7×24 专属客服 + SLA',
      'API 访问：REST + SDK + Webhook',
      '专属 CSM + 解决方案工程师',
      '私有部署（阿里云/腾讯云/AWS/IDC）',
      '定制开发（数据看板、SSO、审计日志）',
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="text-gray-900">
      <Breadcrumb items={crumbs} jsonLdOnly />

      <PageHero
        eyebrow="定价方案"
        h1={title}
        lead={description}
        ctaPrimary={{ text: '联系销售', href: '/contact' }}
        ctaSecondary={{ text: '预约演示', href: '/contact' }}
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">三档透明定价，按需选择</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600">
          所有套餐按月订阅，可随时升级或降级。表格中所有额度与价格以「[联系销售获取报价]」占位，避免展示任何未经确认的金额；最终以 FlyAI 销售团队出具的正式报价单与合同为准。
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={
                'flex flex-col rounded-3xl border p-8 shadow-sm ' +
                (idx === 1
                  ? 'border-brand-600 ring-2 ring-brand-600'
                  : 'border-gray-200')
              }
            >
              {idx === 1 && (
                <span className="mb-4 inline-block w-fit rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                  推荐
                </span>
              )}
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{plan.tagline}</p>
              <div className="my-6">
                <span className="text-3xl font-bold">[联系销售获取报价]</span>
                <span className="text-gray-500"> / 月</span>
              </div>
              <ul className="flex-1 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-brand-600">✓</span>
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <CTAButton
                href="/contact"
                size="lg"
                variant={idx === 1 ? 'primary' : 'secondary'}
                className="mt-8 w-full"
              >
                联系销售
              </CTAButton>
            </div>
          ))}
        </div>

        <div className="mt-12 overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 font-semibold">对比项</th>
                <th className="px-4 py-3 font-semibold">启动版</th>
                <th className="px-4 py-3 font-semibold">专业版</th>
                <th className="px-4 py-3 font-semibold">企业版</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['目标团队规模', '3 人以内', '10-50 人', '50+ 人 / 多品牌'],
                ['每月诊断 URL 额度', '[联系销售获取报价]', '[联系销售获取报价]', '按合同约定'],
                ['内容结构化编辑器额度', '[联系销售获取报价] 篇/月', '[联系销售获取报价] 篇/月', '不限量'],
                ['Schema / llms.txt 站点数', '[联系销售获取报价]', '[联系销售获取报价]', '不限'],
                ['引用监测关键词数', '[联系销售获取报价]', '[联系销售获取报价]', '不限'],
                ['支持引擎数量', '国内 5 + 海外 5', '国内 8 + 海外 12+', '全量 12+ + 自定义'],
                ['API 与 SDK', '不支持', '支持', '支持 + Webhook'],
                ['私有部署', '不支持', '不支持', '支持（阿里云/腾讯云/AWS/IDC）'],
                ['技术支持响应', '工单 48h', '工单+在线 8h', '7×24 + SLA'],
                ['专属 CSM', '不支持', '季度复盘', '常驻 + 解决方案工程师'],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-gray-100 last:border-0">
                  {row.map((cell, i) => (
                    <td key={i} className={'px-4 py-3 ' + (i === 0 ? 'font-medium' : 'text-gray-600')}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          注：表格中所有「[联系销售获取报价]」均为占位符，不代表任何具体金额；实际额度与价格请 [联系销售](/contact) 获取正式报价单。FlyAI 不展示任何未经确认的数字，所有合同以书面签署版本为准。
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">计费规则与常见口径</h2>
        <ul className="mt-6 list-disc space-y-3 pl-5 text-gray-700">
          <li><strong>计费周期：</strong>自然月（每月 1 日 00:00 至月末 23:59，GMT+8），按订阅生效日起算首月费用。</li>
          <li><strong>支付方式：</strong>支持对公转账、支付宝企业版、微信支付企业版、信用卡（Visa/Mastercard）。发票类型为增值税专用发票或普通发票。</li>
          <li><strong>升级与降级：</strong>随时可在控制台切换，立即生效；已支付费用按剩余天数比例折算，多退少补。</li>
          <li><strong>取消订阅：</strong>可在套餐到期前随时取消，取消后服务持续到当期结束，不自动续费。</li>
          <li><strong>数据所有权：</strong>客户提交的 URL 清单、诊断报告、Schema 项目、引用监测数据均归客户所有，FlyAI 不用于训练第三方模型，合同终止后 30 天内可导出全部数据。</li>
          <li><strong>合规：</strong>FlyAI 数据处理遵循《个人信息保护法》与 GDPR，企业版可签署 DPA（数据处理协议）与 SLA（服务等级协议）。</li>
        </ul>
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

      <FAQSection title="关于 FlyAI 定价与计费的常见问题" items={faqItems} />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-3xl font-bold md:text-4xl">不确定选哪个套餐？联系销售获取定制方案</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            FlyAI 销售团队将在 1 个工作日内根据你的团队规模、行业与 GEO 目标，推荐最合适的套餐与额度，并出具正式报价单。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/contact" size="lg" variant="primary" className="!bg-white !text-brand-800 hover:!bg-white/90">
              联系销售
            </CTAButton>
            <CTAButton href="/product" size="lg" variant="ghost" className="!bg-white/10 !text-white ring-1 ring-white/30 hover:!bg-white/20">
              查看产品
            </CTAButton>
          </div>
        </div>
      </section>

      <JsonLd data={[buildBreadcrumbList(crumbs), buildFAQPage(faqItems)]} />
    </div>
  );
}
