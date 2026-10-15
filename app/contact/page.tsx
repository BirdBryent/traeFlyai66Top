import { buildMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import RelatedLinks from '@/components/RelatedLinks';
import CitedSources, { SOURCES } from '@/components/CitedSources';
import CTAButton from '@/components/CTAButton';
import JsonLd from '@/components/JsonLd';
import { buildFAQPage, buildBreadcrumbList, FAQItem, buildWebPage, buildContactPage } from '@/lib/schema';

const title = '联系 FlyAI — 免费诊断 · 预约演示 · 合作咨询';
const description =
  '通过 FlyAI 联系表单提交你的需求，商务团队将于工作日 24 小时内回复（中国工作时间 9:00-18:00 GMT+8）。免费 AI 搜索可见性诊断支持提交最多 500 个 URL，2 个工作日内输出报告并通过邮件发送。';

export const metadata = buildMetadata({ title, description, path: '/contact' });

const faqItems: FAQItem[] = [
  {
    question: '提交联系表单后多久会有人联系我？',
    answer:
      'FlyAI 商务团队承诺在工作日（周一至周五，中国法定节假日除外）24 小时内回复，工作时间为 9:00-18:00 GMT+8。若你在周末或节假日提交，回复时间将顺延至下一个工作日。紧急事项（如生产环境故障、合同签署加急）请直接拨打商务电话，电话接听时间同样为工作日 9:00-18:00 GMT+8。若超过 24 小时未收到回复，可能是邮件被拦截或表单提交失败，请重新提交或直接发送邮件至 contact@flyai66.top。',
  },
  {
    question: '申请免费 AI 搜索可见性诊断需要提供后台账号或密码吗？',
    answer:
      '不需要。FlyAI 免费诊断基于公开可访问的 URL 清单进行，不要求客户提供站点后台账号、数据库密码或服务器 SSH 权限。你只需在表单中提交：① 站点根域名（如 https://www.flyai66.top）；② 需诊断的 URL 清单（最多 500 个，可粘贴文本或上传 CSV）；③ 希望重点观测的 5-10 个核心关键词；④ 联系邮箱。FlyAI 通过模拟生成式引擎的抓取路径完成诊断，全程只读公开内容，不写入任何数据到客户站点。若后续签约后需要更深度的诊断（如登录态页面），会在合同中单独约定权限范围与数据处理协议。',
  },
  {
    question: '商务合作和渠道合作的对接人是否不同？',
    answer:
      '是的。FlyAI 将合作分为三类并由不同团队对接：①直接客户（B2B SaaS、出海品牌、内容团队）→ 由商务销售团队对接，负责套餐报价、合同签署与试用安排；②渠道/代理商 → 由渠道合作团队对接，负责返利政策、贴牌（OEM）模式、联合解决方案；③媒体/研究机构 → 由市场团队对接，负责案例授权、数据引用与联合发布。你在表单的「需求类型」下拉框中选择对应类别，系统会自动路由到相应团队，确保对接人对口。',
  },
  {
    question: '周末或节假日提交的需求会顺延吗？',
    answer:
      '会。FlyAI 商务团队工作时间为周一至周五 9:00-18:00 GMT+8（中国法定节假日除外）。周末与节假日提交的表单将在下一个工作日上班后优先处理。若你有紧急需求（如投标截止、合同签署加急），请在表单「描述」字段中注明「加急」并说明截止时间，FlyAI 会在能力范围内优先响应，但不承诺在非工作时间完成。企业版客户可在合同中约定 7×24 小时专属响应 SLA。',
  },
  {
    question: 'FlyAI 是否支持英文商务沟通？',
    answer:
      '支持。FlyAI 商务团队提供中英文双语沟通服务，适用于出海品牌客户、跨国企业与海外代理商。你可以在表单中选择沟通语言（中文 / English），对应语言的商务顾问将负责后续对接。英文合同、英文报价单与英文诊断报告均可提供，但需在表单中注明语言偏好，以便 FlyAI 安排合适的对接人与文档版本。',
  },
];

const crumbs = [
  { label: '首页', href: '/' },
  { label: '联系我们', href: '/contact' },
];

export default function ContactPage() {
  return (
    <div className="text-gray-900">
      <Breadcrumb items={crumbs} jsonLdOnly />

      <PageHero
        eyebrow="联系我们"
        h1={title}
        lead={description}
        ctaPrimary={{ text: '免费诊断', href: '#contact-form' }}
        ctaSecondary={{ text: '预约演示', href: '#contact-form' }}
      />

      <section id="contact-form" className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">在线联系表单</h2>
        <p className="mt-4 text-lg text-gray-600">
          填写以下表单提交你的需求，FlyAI 商务团队将在工作日 24 小时内回复。所有字段（除「描述」外）均为必填。
        </p>

        <form
          action="https://formspree.io/f/[待补充：真实表单端点]"
          method="POST"
          className="mt-10 space-y-6"
          noValidate
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                姓名 <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="h-12 w-full rounded-xl border border-gray-300 px-4 text-base focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400"
                placeholder="请输入你的姓名"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                邮箱 <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="h-12 w-full rounded-xl border border-gray-300 px-4 text-base focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-700">
                公司 <span className="text-red-500">*</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                autoComplete="organization"
                className="h-12 w-full rounded-xl border border-gray-300 px-4 text-base focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400"
                placeholder="公司名称"
              />
            </div>
            <div>
              <label htmlFor="role" className="mb-2 block text-sm font-medium text-gray-700">
                职位 <span className="text-red-500">*</span>
              </label>
              <input
                id="role"
                name="role"
                type="text"
                required
                autoComplete="organization-title"
                className="h-12 w-full rounded-xl border border-gray-300 px-4 text-base focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400"
                placeholder="如：市场总监 / 增长负责人"
              />
            </div>
          </div>

          <div>
            <label htmlFor="need-type" className="mb-2 block text-sm font-medium text-gray-700">
              需求类型 <span className="text-red-500">*</span>
            </label>
            <select
              id="need-type"
              name="need-type"
              required
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-base focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              <option value="">请选择需求类型</option>
              <option value="free-diagnosis">免费 AI 搜索可见性诊断</option>
              <option value="demo">预约产品演示</option>
              <option value="sales">商务合作 / 套餐咨询</option>
              <option value="channel">渠道 / 代理商合作</option>
              <option value="media">媒体 / 研究机构合作</option>
              <option value="other">其他</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
              需求描述 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400"
              placeholder="请简要描述你的需求：站点域名、希望诊断的 URL 数量、关注的生成式引擎、预期上线时间等"
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              required
              className="mt-1 h-5 w-5 rounded border-gray-300 text-brand-600 focus:ring-brand-400"
            />
            <label htmlFor="agree" className="text-sm text-gray-600">
              我已阅读并同意 FlyAI
              <a href="/privacy" className="text-brand-700 underline hover:text-brand-900">服务条款与隐私政策</a>
              ，同意 FlyAI 按表单内容联系我。提交的信息仅用于商务对接，不用于任何第三方营销。
            </label>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              className="h-14 rounded-2xl bg-brand-600 px-7 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
            >
              免费诊断
            </button>
            <button
              type="reset"
              className="h-14 rounded-2xl bg-gray-100 px-7 text-base font-semibold text-gray-900 transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
            >
              重置表单
            </button>
          </div>
          <p className="text-xs text-gray-500">
            注：当前表单端点为占位「[待补充：真实表单端点]」，上线前需替换为真实的表单服务地址（如 Formspree / 企业自建表单接收端点）。
          </p>
        </form>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">多种联系方式</h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 font-semibold">联系方式</th>
                <th className="px-4 py-3 font-semibold">值</th>
                <th className="px-4 py-3 font-semibold">响应时效</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium">商务邮箱</td>
                <td className="px-4 py-3 text-gray-600">contact@flyai66.top</td>
                <td className="px-4 py-3 text-gray-600">工作日 24 小时内</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium">商务电话</td>
                <td className="px-4 py-3 text-gray-600">+86-20-[待补充：真实电话]</td>
                <td className="px-4 py-3 text-gray-600">工作日 9:00-18:00 GMT+8</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium">办公地址</td>
                <td className="px-4 py-3 text-gray-600">广州市天河区珠江新城 [待补充：真实地址]</td>
                <td className="px-4 py-3 text-gray-600">需预约来访</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium">技术支持（付费客户）</td>
                <td className="px-4 py-3 text-gray-600">support@flyai66.top</td>
                <td className="px-4 py-3 text-gray-600">专业版 8 小时 / 企业版 SLA</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">渠道合作</td>
                <td className="px-4 py-3 text-gray-600">partner@flyai66.top</td>
                <td className="px-4 py-3 text-gray-600">工作日 24 小时内</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <p className="mx-auto max-w-4xl px-5 text-base leading-relaxed text-gray-700 lg:px-8">
        FlyAI 商务团队将在工作日 24 小时内回复。GEO 服务的方法论基础见<a href={SOURCES.geoPaper.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">KDD 2024 GEO 论文</a>，服务合规遵循<a href={SOURCES.cacAiRule.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">《生成式人工智能服务管理暂行办法》</a>。
      </p>
      <CitedSources items={[SOURCES.geoPaper, SOURCES.cacAiRule, SOURCES.stanfordAiIndex, SOURCES.geoDoi, SOURCES.miit, SOURCES.samr]} />
      <RelatedLinks path="/contact" />
      <FAQSection title="关于联系 FlyAI 的常见问题" items={faqItems} />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-3xl font-bold md:text-4xl">提交表单，立即开启免费 GEO 诊断</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            无需账号密码，仅需 URL 清单。2 个工作日内，你将收到 100+ 维度的 AI 搜索可见性诊断报告。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="#contact-form" size="lg" variant="primary" className="!bg-white !text-brand-800 hover:!bg-white/90">
              免费诊断
            </CTAButton>
            <CTAButton href="/pricing" size="lg" variant="ghost" className="!bg-white/10 !text-white ring-1 ring-white/30 hover:!bg-white/20">
              查看定价
            </CTAButton>
          </div>
        </div>
      </section>

      <JsonLd data={[buildWebPage({ url: '/contact', name: '联系 FlyAI' }),
          buildContactPage('/contact', '联系 FlyAI'),
          buildBreadcrumbList(crumbs), buildFAQPage(faqItems)]} />
    </div>
  );
}
