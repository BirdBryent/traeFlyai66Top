export const siteConfig = {
  name: 'FlyAI',
  fullCompanyName: '广州飞爱智能科技有限公司',
  description:
    'FlyAI（广州飞爱智能科技有限公司）是一家专注 AI 搜索可见性的公司，旗下首个产品 FlyAI GEO 提供 GEO 生成式引擎优化服务：AI 搜索可见性诊断、内容结构化、Schema 与 llms.txt 生成、引用与提及监测，帮助企业市场/增长/内容团队在 DeepSeek、豆包、千问、Google AIO 等生成式引擎答案中获得稳定引用。',
  url: 'https://www.flyai66.top',
  ogImage: '/og-default.jpg',
  locale: 'zh_CN',
  lang: 'zh-CN',
  twitter: {
    card: 'summary_large_image',
  },
  keywords: [
    'FlyAI',
    'FlyAI GEO',
    'GEO',
    '生成式引擎优化',
    'AI 搜索可见性',
    '内容结构化',
    'llms.txt',
    'Schema.org',
    'JSON-LD',
    'AI 引用监测',
  ],
  contact: {
    email: 'contact@flyai66.top',
    // 地址与电话暂未对外公开，先留空占位：页脚与 JSON-LD 都会自动跳过空值，
    // 填入真实信息后无需改代码即可生效。切勿写「[待补充]」「0000-0000」这类占位文本上线。
    phone: '',
    address: '',
  },
  sameAs: [
    'https://github.com/FlyAI',
    'https://weibo.com/flyai',
    'https://zhihu.com/org/flyai',
    'https://linkedin.com/company/flyai',
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/FlyAI' },
    { label: '微博', href: 'https://weibo.com/flyai' },
    { label: '知乎', href: 'https://zhihu.com/org/flyai' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/flyai' },
  ],
  // ICP 备案号：暂无，留空占位。填入后页脚底栏会自动出现「粤 ICP 备 xxx 号」。
  icp: '',
  // 主导航只保留核心转化路径 4 项；回首页由 header logo 承担。
  // 文档 / 术语 / 博客 / 关于 一律走页脚「资源」「关于」专区（页面全部保留），不要再加回顶部导航。
  navMain: [
    { label: '产品', href: '/product' },
    { label: '方案', href: '/solutions' },
    { label: '定价', href: '/pricing' },
    { label: '案例', href: '/cases' },
  ],
  navFooter: {
    // 产品列首行「FlyAI GEO（旗下首个产品）」由 SiteFooter 固定输出并指向 /product，
    // 这里只维护其余入口：定价 / 方案 / 案例，与顶部 4 项导航一一对应。
    // 四个产品能力（诊断 / 结构化 / Schema / 监测）属于 FlyAI GEO 的子能力，深链由首页能力卡承担，
    // 且此前写的 #diagnosis 等锚点在产品页并不存在（真实 id 是 #visibility-diagnosis 等），已移除。
    product: [
      { label: '定价与套餐', href: '/pricing' },
      { label: '解决方案', href: '/solutions' },
      { label: '客户案例', href: '/cases' },
    ],
    resources: [
      { label: '产品文档', href: '/docs' },
      { label: 'GEO 术语表', href: '/glossary' },
      { label: '博客与研究', href: '/blog' },
      { label: 'FAQ 汇总', href: '/faq' },
    ],
    // 公司列只放公司级信息；解决方案 / 客户案例已移入 product 列。
    company: [
      { label: '关于我们', href: '/about' },
      { label: '联系我们', href: '/contact' },
    ],
    legal: [
      { label: '隐私政策', href: '/#privacy' },
      { label: '服务条款', href: '/#terms' },
    ],
  },
  // 产品实体：FlyAI GEO（旗下首个产品）。FlyAI 是公司名，不要用公司名指代产品。
  softwareApplication: {
    name: 'FlyAI GEO',
    alternateName: 'FlyAI GEO Platform',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    featureList: [
      'AI 搜索可见性诊断',
      '内容结构化编辑器',
      'Schema.org JSON-LD 自动生成',
      'llms.txt 自动生成与校验',
      '12+ 生成式引擎引用与提及监测',
      '团队协作与权限管理',
      '私有化部署（企业版）',
    ],
  },
};

export type SiteConfig = typeof siteConfig;
