import { buildMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import RelatedLinks from '@/components/RelatedLinks';
import CitedSources, { SOURCES } from '@/components/CitedSources';
import CTAButton from '@/components/CTAButton';
import JsonLd from '@/components/JsonLd';
import { buildBreadcrumbList, FAQItem, buildWebPage } from '@/lib/schema';

const title = 'FlyAI GEO 定价 — 启动版 · 专业版 · 企业版 三档订阅方案';
/** H1 展示用：单行；title 字符串仍原样喂给 metadata，不动 SEO */
const h1 = 'FlyAI GEO 定价';
/** 首屏 lead：与 description 分开，前者是页面首段文案，后者仍是 metadata 用的完整描述 */
const lead =
  'FlyAI GEO 按站点数、监测关键词数与月度诊断 URL 数分档定价，所有套餐支持对公转账、微信支付、支付宝，可开具增值税专用发票，按年付享 8 折。';
const description =
  'FlyAI GEO 按站点数、监测关键词数与月度诊断 URL 数分档定价：启动版 ¥999/月（1 站点 · 50 关键词 · 500 URL/月），专业版 ¥2,999/月（5 站点 · 300 关键词 · 1,500 URL/月，按启动版单价折算价值 ¥5,690/月，套餐省 47%），企业版联系销售（站点与关键词不限、支持私有部署与 SLA）。支持对公转账、微信支付、支付宝，可开具增值税专用发票，按年付享 8 折。';

export const metadata = buildMetadata({ title, description, path: '/pricing' });

const faqItems: FAQItem[] = [
  {
    question: '可以先免费试用再付费吗？',
    answer:
      '可以。FlyAI GEO 为所有新客户提供 [免费 AI 搜索可见性诊断](/contact)（提交 ≤ 500 个 URL，2 个工作日内交付 100+ 维度报告），以及启动版 14 天功能试用（不含企业版私有部署与专属 CSM）。试用期间产生的诊断报告、Schema 生成结果与引用监测基线数据均归客户所有，不要求绑定支付方式。试用结束后可选择任一付费套餐继续使用，数据无缝保留。具体试用范围以 [联系销售](/contact) 出具的试用协议为准。',
  },
  {
    question: '诊断额度当月用不完可以结转到下个月吗？',
    answer:
      '诊断额度按自然月计费，当月未使用的额度原则上不结转。FlyAI GEO 采用「用则扣、不用则废」的配额机制，与主流 SaaS 订阅模式一致。企业版客户可在合同中与销售协商额度结转条款（通常按合同金额的一定比例结转，最长不超过 3 个月）。详细配额规则请 [联系销售](/contact) 获取最新版《FlyAI GEO 计费与配额说明》。',
  },
  {
    question: '企业版的私有部署支持哪些云？',
    answer:
      '企业版私有部署支持以下云环境（以正式合同为准）：① 阿里云（华东 1/2、华北 2 等地域）；② 腾讯云（广州、上海、北京等地域）；③ 华为云（北京四、上海一等）；④ AWS（us-east-1、ap-southeast-1 等）；⑤ 自建 IDC / OpenStack。私有部署需要客户提供 Kubernetes 集群（v1.22+）与对象存储（S3 兼容或阿里云 OSS / 腾讯云 COS），FlyAI GEO 提供部署文档与 8 小时远程实施支持。若需专属实施工程师驻场，可在合同中单独约定。',
  },
  {
    question: '是否支持年付折扣？',
    answer:
      '支持。按年付费统一享 8 折：启动版 ¥9,590/年（折合 ¥799/月，较月付省下 2.4 个月费用）、专业版 ¥28,790/年（折合 ¥2,399/月）。年付客户还可获得：① 额外诊断额度（按月度额度的 10% 叠加）；② 优先接入新功能内测；③ 专属客户成功经理（CSM）季度复盘。年付与月付可随时切换，已支付的月付费用按比例抵扣年付金额，差额按剩余天数折算。企业版年付折扣与 SLA 一并写入合同，请 [联系销售](/contact) 定制。',
  },
  {
    question: '从启动版升级到专业版需要做数据迁移吗？',
    answer:
      '不需要手动迁移。FlyAI GEO 所有套餐共享同一套账户体系与数据存储，升级时只需在控制台「套餐管理」中切换，历史诊断报告、Schema 项目、llms.txt 版本、引用监测快照与团队成员账号均自动保留，无任何数据丢失。升级立即生效，新额度按剩余天数比例折算。降级同理（从专业版降到启动版），超出启动版配额的功能将在降级后只读，不删除数据。',
  },
  {
    question: '如果对服务效果不满意可以退款吗？',
    answer:
      'FlyAI GEO 提供「首月不满意全额退款」承诺：订阅生效后 30 自然日内，若客户认为诊断报告或服务未达到 [联系销售](/contact) 出具的《服务计划说明书》中约定的交付标准，可书面提出退款申请，FlyAI GEO 将在 5 个工作日内退还已支付的首月订阅费用。退款不影响客户已获得的诊断报告与数据所有权。该承诺不适用于：① 因客户未提供必要 URL 清单或访问权限导致服务无法交付的情况；② 客户主动要求的定制开发费用；③ 企业版合同中另行约定的 SLA 条款。',
  },
];

const crumbs = [
  { label: '首页', href: '/' },
  { label: '定价', href: '/pricing' },
];

const plans = [
  {
    name: '启动版',
    price: '¥999',
    unit: '/ 月',
    yearly: '年付 ¥9,590／年（8 折，折合 ¥799/月）',
    tagline: '适合单站点起步验证：1 个站点 · 50 个关键词',
    features: [
      '站点数：1 个',
      '监测关键词数：50 个',
      '月度诊断 URL 数：500 个',
      '内容结构化编辑器：30 篇/月',
      '支持引擎：国内 5 + 海外 5',
      '刷新频率：日频',
      '团队成员：3 个席位',
      '技术支持：工单（48 小时响应）',
    ],
  },
  {
    name: '专业版',
    price: '¥2,999',
    unit: '/ 月',
    yearly: '年付 ¥28,790／年（8 折，折合 ¥2,399/月）',
    tagline: '适合多站点规模化监测：5 个站点 · 300 个关键词',
    features: [
      '站点数：5 个',
      '监测关键词数：300 个',
      '月度诊断 URL 数：1,500 个',
      '内容结构化编辑器：300 篇/月',
      '支持引擎：国内 8 + 海外 12+（实时监测可选）',
      '刷新频率：日频 + 周频',
      '团队成员：20 个席位',
      '技术支持：工单 + 在线聊天（8 小时响应）',
      'API 访问：REST + SDK',
      '专属 CSM：季度复盘',
    ],
  },
  {
    name: '企业版',
    price: '联系销售',
    unit: '',
    yearly: '按合同约定，含私有部署与 SLA',
    tagline: '适合多品牌集团：站点不限、支持私有部署',
    features: [
      '站点数：不限',
      '监测关键词数：不限',
      '月度诊断 URL 数：按合同约定（不限量可议）',
      '内容结构化编辑器：不限量',
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
        center
        eyebrow="定价方案"
        h1={h1}
        lead={lead}
        bgImage={{
          src: '/images/home-hero-bg.png',
          alt: 'FlyAI 页面主视觉：蓝紫色科技渐变背景，象征生成式引擎优化的 AI 智能网格',
        }}
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
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
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                {idx === 1 && (
                  <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                    推荐
                  </span>
                )}
              </div>
              <p className="mt-2 min-h-[2.5rem] text-sm text-gray-500">{plan.tagline}</p>
              <div className="my-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.unit && <span className="text-gray-500"> {plan.unit}</span>}
                <p className="mt-2 min-h-[1rem] text-xs text-gray-500">{plan.yearly}</p>
              </div>
              <CTAButton
                href="/contact"
                size="lg"
                variant={idx === 1 ? 'primary' : 'soft'}
                className="w-full"
              >
                {idx === 2 ? '联系销售' : '订阅'}
              </CTAButton>
              <p className="mt-6 text-sm font-semibold text-gray-900">包含：</p>
              <ul className="mt-3 flex-1 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-brand-600">✓</span>
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
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
                ['站点数', '1 个', '5 个', '不限'],
                ['监测关键词数', '50 个', '300 个', '不限'],
                ['月度诊断 URL 数', '500 个', '1,500 个', '按合同约定（不限量可议）'],
                ['内容结构化编辑器额度', '30 篇/月', '300 篇/月', '不限量'],
                ['月付价格', '¥999 / 月', '¥2,999 / 月', '联系销售'],
                ['年付价格（8 折）', '¥9,590 / 年', '¥28,790 / 年', '联系销售'],
                ['按单项单价折算价值', '¥999 / 月', '¥5,690 / 月', '按合同约定'],
                ['套餐折扣', '标准价', '5.3 折（省 47%）', '议价'],
                ['团队成员席位', '3 个', '20 个', '不限'],
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
          注：启动版 ¥999/月、专业版 ¥2,999/月为中文站公开标准价，自 2026 年 10 月起生效；年付按 8 折计算（启动版 ¥9,590/年、专业版 ¥28,790/年）。「按单项单价折算价值」= 用启动版 ¥999 分摊出的单价（诊断 URL ¥0.70/个、监测关键词 ¥5/个、内容结构化 ¥6.8/篇、站点 ¥120/个、席位 ¥25/个）乘以各档配额得出，用于说明套餐打包的折扣幅度，非单独售价。企业版额度与价格按合同约定，请 [联系销售](/contact) 获取正式报价单。
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center">计费规则与常见口径</h2>
        <ul className="mt-6 list-disc space-y-3 pl-5 text-gray-700">
          <li><strong>计费周期：</strong>自然月（每月 1 日 00:00 至月末 23:59，GMT+8），按订阅生效日起算首月费用。</li>
          <li><strong>支付方式：</strong>支持对公转账（企业银行账户）、微信支付、支付宝；可开具<strong>增值税专用发票</strong>（服务类，税率 6%，可用于进项抵扣），也可开具增值税普通发票。开票信息在控制台「账户设置」中提交，发票于到账后 5 个工作日内开出。</li>
          <li><strong>年付折扣：</strong>按年付费享 <strong>8 折</strong>——启动版 ¥9,590/年（折合 ¥799/月）、专业版 ¥28,790/年（折合 ¥2,399/月），相当于每年省下 2.4 个月费用；年付与月付可随时切换，差额按剩余天数折算。</li>
          <li><strong>套餐折扣口径：</strong>各档配额若按启动版的单项单价（诊断 URL ¥0.70/个、监测关键词 ¥5/个、内容结构化 ¥6.8/篇、站点 ¥120/个、席位 ¥25/个）单独折算，专业版价值为 ¥5,690/月；套餐打包价 ¥2,999/月，相当于 <strong>5.3 折</strong>，配额越大单价越低。</li>
          <li><strong>升级与降级：</strong>随时可在控制台切换，立即生效；已支付费用按剩余天数比例折算，多退少补。</li>
          <li><strong>取消订阅：</strong>可在套餐到期前随时取消，取消后服务持续到当期结束，不自动续费。</li>
          <li><strong>数据所有权：</strong>客户提交的 URL 清单、诊断报告、Schema 项目、引用监测数据均归客户所有，FlyAI 不用于训练第三方模型，合同终止后 30 天内可导出全部数据。</li>
          <li><strong>合规：</strong>FlyAI 数据处理遵循《个人信息保护法》与 GDPR，企业版可签署 DPA（数据处理协议）与 SLA（服务等级协议）。</li>
        </ul>
      </section>

      <p className="mx-auto max-w-4xl px-5 text-base leading-relaxed text-gray-700 lg:px-8">
        FlyAI GEO 三档定价按站点数、监测关键词数与月度诊断 URL 数划分，对应不同阶段的 GEO 投入规模：启动版适合单站点验证，专业版覆盖多站点规模化监测，企业版面向多品牌集团与私有部署。定价模型参考了<a href={SOURCES.cacAiRule.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">《生成式人工智能服务管理暂行办法》</a> 对生成式 AI 服务提供者的合规义务界定，以及<a href={SOURCES.stanfordAiIndex.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">Stanford 2025 AI Index Report</a> 中企业 AI 采纳率的行业基准。
      </p>
      <CitedSources
        title="方法论实证依据"
        items={[SOURCES.cacAiRule, SOURCES.stanfordAiIndex, SOURCES.geoDoi, SOURCES.miit]}
      />
      <RelatedLinks path="/pricing" />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-3xl font-bold md:text-4xl">不确定选哪个套餐？联系销售获取定制方案</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            FlyAI 销售团队将在 1 个工作日内根据你的站点数量、监测关键词规模、行业与 GEO 目标，推荐最合适的套餐与额度，并出具正式报价单。
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
      <FAQSection title="关于 FlyAI GEO 定价与计费的常见问题" items={faqItems} />

      <JsonLd data={[buildWebPage({ url: '/pricing', name: 'FlyAI GEO 定价与计费', aboutProduct: true }),
          buildBreadcrumbList(crumbs)]} />
    </div>
  );
}
