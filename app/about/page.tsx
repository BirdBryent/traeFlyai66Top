import { buildMetadata } from '@/lib/metadata';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import RelatedLinks from '@/components/RelatedLinks';
import CitedSources, { SOURCES } from '@/components/CitedSources';
import CTAButton from '@/components/CTAButton';
import JsonLd from '@/components/JsonLd';
import { buildBreadcrumbList, FAQItem, buildWebPage, buildAboutPage } from '@/lib/schema';

const title = '关于 FlyAI（广州飞爱智能科技有限公司）— 团队 · 方法论 · 公司信息';
/** H1 展示用：拆两行；title 字符串仍原样喂给 metadata，不动 SEO */
const h1Lines = [
  '关于 FlyAI（广州飞爱智能科技有限公司）',
  '团队 · 方法论 · 公司信息',
] as const;
const description =
  'FlyAI（广州飞爱智能科技有限公司）成立于 [待补充：真实成立年份]，是一家专注 AI 搜索可见性的独立软件公司，旗下首个产品为 FlyAI GEO——面向生成式引擎优化（GEO）的一体化平台。核心团队来自 Google、百度、字节跳动的搜索产品与结构化数据方向；公司以「让每个品牌都被 AI 正确引用」为使命，向中国与海外客户交付可被重复验证的 GEO 方法论与工具链。';

export const metadata = buildMetadata({ title, description, path: '/about' });

const faqItems: FAQItem[] = [
  {
    question: 'FlyAI 公司主体在哪里注册？',
    answer:
      'FlyAI 的运营主体为广州飞爱智能科技有限公司，注册地为中国广东省广州市。统一社会信用代码：[待补充：真实统一社会信用代码]，注册地址：广州市天河区珠江新城 [待补充：真实注册地址]，办公地址：广州市天河区珠江新城 [待补充：真实办公地址]。公司主体信息以国家企业信用信息公示系统（http://www.gsxt.gov.cn）登记信息为准，可在 [国家市场监督管理总局](http://www.samr.gov.cn/) 官网查询。',
  },
  {
    question: 'FlyAI 服务的客户主要分布在哪些行业？',
    answer:
      'FlyAI 客户主要分布在以下行业：① B2B SaaS（企业服务、垂直行业软件）；② 跨境电商与出海品牌（独立站、亚马逊卖家）；③ 内容与媒体（资讯、知识付费、教育）；④ 教育与培训机构；⑤ 金融科技（合规范围内）。截至 [待补充：真实统计时间]，FlyAI 累计服务客户数为 [待补充：真实客户数] 家，其中付费客户 [待补充：真实付费客户数] 家。所有客户数据以 FlyAI 内部 CRM 统计为准，未经客户签署 MAA 的客户名不公开。',
  },
  {
    question: 'FlyAI 有没有获得过融资？',
    answer:
      'FlyAI 的融资情况：[待补充：真实融资轮次与金额，如「种子轮 [待补充：金额] 人民币，投资方 [待补充：真实投资方]，完成时间 [待补充：真实日期]」]。如未融资，此处标注「FlyAI 目前为创始团队自筹资金运营，未接受外部投资」。融资信息以公司正式公告为准，未经确认的信息不对外披露。',
  },
  {
    question: 'FlyAI 是否有开源项目？',
    answer:
      'FlyAI 在 GitHub（https://github.com/FlyAI）维护若干开源项目，包括：① GEO 诊断工具的开源版本（轻量级 llms.txt 生成器与 Schema 校验器）；② 结构化数据最佳实践文档；③ 引用监测的开源浏览器插件。开源项目采用 MIT 或 Apache 2.0 许可证，欢迎社区贡献。具体项目列表与许可证以 GitHub 仓库为准。',
  },
  {
    question: 'FlyAI 的服务边界是什么？',
    answer:
      '交付内容与 GEO 配置（诊断、结构化数据、llms.txt、引用监测）；不承诺具体排名或引用率，也不代替客户做网站发布与运维决策。【待确认：与合同/服务条款表述保持一致】',
  },
  {
    question: '怎么核实 FlyAI 的公司主体信息？',
    answer:
      '可在国家企业信用信息公示系统与市场监管总局官网按主体名称查询工商登记信息（`https://www.samr.gov.cn/`）。',
  },
];

const crumbs = [
  { label: '首页', href: '/' },
  { label: '关于我们', href: '/about' },
];

const fiveSteps = [
  {
    step: 'Step 1',
    title: '诊断',
    desc: '全站 AI 搜索可见性扫描，输出 100+ 维度诊断报告与修复优先级，识别阻断级问题。',
  },
  {
    step: 'Step 2',
    title: '结构化改造',
    desc: '首段直答改写、FAQ 抽取、Schema 与 llms.txt 生成，实体命名一致性治理。',
  },
  {
    step: 'Step 3',
    title: '上线验证',
    desc: 'JSON-LD 双校验（schema.org + Google），首 HTML 确认，12+ 引擎引用基线快照。',
  },
  {
    step: 'Step 4',
    title: '持续监测',
    desc: '日频/周频引用监测，品牌实体错误告警，竞品引用对比矩阵。',
  },
  {
    step: 'Step 5',
    title: '优化迭代',
    desc: '基于监测数据持续优化首段、内链、权威外链，形成可追溯的提升曲线。',
  },
];

const team = [
  { name: '[待补充：真实姓名]', title: 'CEO & 联合创始人', bio: '前 Google 搜索产品团队，10+ 年搜索与结构化数据经验。' },
  { name: '[待补充：真实姓名]', title: 'CTO & 联合创始人', bio: '前字节跳动搜索架构师，主导多个搜索召回与排序系统。' },
  { name: '[待补充：真实姓名]', title: 'Head of GEO Strategy', bio: '前百度搜索产品经理，GEO 方法论体系设计者。' },
  { name: '[待补充：真实姓名]', title: 'Head of Engineering', bio: '前阿里巴巴高级工程师，大规模搜索基础设施。' },
];

export default function AboutPage() {
  return (
    <div className="text-gray-900">
      <Breadcrumb items={crumbs} jsonLdOnly />

      <PageHero
        center
        eyebrow="关于我们"
        h1={h1Lines}
        lead={description}
        ctaPrimary={{ text: '联系销售', href: '/contact' }}
        ctaSecondary={{ text: '查看产品', href: '/product' }}
        bgImage={{
          src: '/images/home-hero-bg.png',
          alt: 'FlyAI 页面主视觉：蓝紫色科技渐变背景，象征生成式引擎优化的 AI 智能网格',
        }}
      />

      {/* 实体层级锚点：FlyAI（公司）→ FlyAI GEO（旗下首个产品） */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center">FlyAI 旗下产品</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-gray-600">
          FlyAI 以公司主体运营，产品线从生成式引擎优化起步。当前已发布首个产品 FlyAI GEO，后续产品会同步更新在本页与产品页。
        </p>
        <article className="mx-auto mt-10 max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-bold">FlyAI GEO</h3>
            <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              旗下首个产品
            </span>
          </div>
          <p className="mt-3 leading-relaxed text-gray-700">
            FlyAI GEO 是面向生成式引擎优化（GEO）的一体化平台：AI 搜索可见性诊断、内容结构化改造、
            Schema 与 llms.txt 生成、12+ 生成式引擎的引用与提及监测。适用于 B2B SaaS、出海品牌、
            内容团队与代理商四类场景。
          </p>
          <p className="mt-5">
            <Link
              href="/product"
              className="inline-flex items-center text-sm font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700"
            >
              查看 FlyAI GEO 产品功能 →
            </Link>
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center">FlyAI GEO 五步法方法论</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-gray-600">
          FlyAI GEO 将生成式引擎优化拆解为五个可重复、可量化的步骤，确保每一步都有明确的输入、输出与验收标准，帮助团队从「不知道 AI 有没有引用我」到「量化 AI 引用率并持续优化」。
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-5">
          {fiveSteps.map((s) => (
            <div key={s.step} className="rounded-2xl border border-gray-200 p-6">
              <p className="text-sm font-semibold text-brand-600">{s.step}</p>
              <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
              <p className="mt-3 text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center">核心团队</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-gray-600">
          FlyAI 核心团队来自 Google、百度、字节跳动、阿里巴巴的搜索产品与结构化数据方向，平均拥有 8+ 年搜索与 AI 领域经验。以下团队成员信息待正式公开前以占位符标注，待本人确认后补录真实姓名与照片。
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm"
            >
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-200" aria-hidden="true">
              <span className="sr-only">{m.name} 头像占位</span>
            </div>
            <h3 className="mt-4 text-lg font-bold">{m.name}</h3>
            <p className="text-sm font-medium text-brand-700">{m.title}</p>
            <p className="mt-2 text-sm text-gray-600">{m.bio}</p>
          </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center">公司资质与主体信息</h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full border-collapse text-left text-sm">
            <tbody>
              {[
                ['公司全称', '广州飞爱智能科技有限公司'],
                ['统一社会信用代码', '[待补充：真实统一社会信用代码]'],
                ['注册地址', '广州市天河区珠江新城 [待补充：真实注册地址]'],
                ['办公地址', '广州市天河区珠江新城 [待补充：真实办公地址]'],
                ['经营电话', '+86-20-[待补充：真实电话]'],
                ['商务邮箱', 'contact@flyai66.top'],
                ['成立时间', '[待补充：真实成立年份] 年'],
                ['法定代表人', '[待补充：真实法定代表人]'],
                ['注册资本', '[待补充：真实注册资本] 万元人民币'],
                ['经营范围', '[待补充：真实经营范围，以工商登记为准]'],
                ['资质认证', 'ISO 27001（申请中，预计 [待补充：真实取证时间] 取证；等保三级（申请中）'],
                ['公司官网', 'https://www.flyai66.top'],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-gray-100 last:border-0">
                  <td className="w-40 px-4 py-3 font-medium text-gray-900">{row[0]}</td>
                  <td className="px-4 py-3 text-gray-600">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          以上公司主体信息以国家企业信用信息公示系统（http://www.gsxt.gov.cn）与 [国家市场监督管理总局](http://www.samr.gov.cn/) 登记信息为准。涉及统一社会信用代码、法定代表人、注册资本、成立时间等字段均为占位符，待工商登记信息确认后补录。
        </p>
      </section>

      <CitedSources
        title="方法论实证依据"
        lead={
          <>
            FlyAI 的服务范围与合规承诺遵循
            <a href={SOURCES.cacAiRule.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">《生成式人工智能服务管理暂行办法》</a>
            。GEO 方法论的学术依据见
            <a href={SOURCES.geoPaper.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">KDD 2024 GEO 论文</a>
            ，行业背景参考
            <a href={SOURCES.stanfordAiIndex.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">Stanford 2025 AI Index Report</a>
            。
          </>
        }
        items={[SOURCES.cacAiRule, SOURCES.stanfordAiIndex, SOURCES.geoPaper, SOURCES.samr, SOURCES.miit]}
      />
      <RelatedLinks path="/about" />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-3xl font-bold md:text-4xl">加入 FlyAI，一起让每个品牌都被 AI 正确引用</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            FlyAI 正在招聘搜索产品、结构化数据、前端工程、客户成功等岗位。欢迎投递简历至 hr@flyai66.top，或联系商务合作。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/contact" size="lg" variant="primary" className="!bg-white !text-brand-800 hover:!bg-white/90">
              联系我们
            </CTAButton>
            <CTAButton href="/product" size="lg" variant="ghost" className="!bg-white/10 !text-white ring-1 ring-white/30 hover:!bg-white/20">
              查看产品
            </CTAButton>
          </div>
        </div>
      </section>

      <FAQSection title="关于 FlyAI 公司与 FlyAI GEO 的常见问题" items={faqItems} />

      <JsonLd data={[buildWebPage({ url: '/about', name: '关于 FlyAI（公司）', aboutProduct: true }),
          buildAboutPage('/about', '关于 FlyAI（公司）'),
          buildBreadcrumbList(crumbs)]} />
    </div>
  );
}
