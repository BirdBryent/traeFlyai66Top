export const siteConfig = {
  name: 'FlyAI',
  fullCompanyName: '广州飞爱智能科技有限公司',
  description:
    'FlyAI（广州飞爱智能科技有限公司）专注 GEO 生成式引擎优化服务：AI 搜索可见性诊断、内容结构化、Schema 与 llms.txt 生成、引用与提及监测，帮助企业市场/增长/内容团队在 DeepSeek、豆包、千问、Google AIO 等生成式引擎答案中获得稳定引用。',
  url: 'https://flyai66.top',
  ogImage: '/og-default.jpg',
  locale: 'zh_CN',
  lang: 'zh-CN',
  twitter: {
    card: 'summary_large_image',
  },
  keywords: [
    'FlyAI',
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
    phone: '+86-20-0000-0000',
    address: '广州市天河区珠江新城 [待补充]',
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
  navMain: [
    { label: '首页', href: '/' },
    { label: '产品', href: '/product' },
    { label: '方案', href: '/solutions' },
    { label: '定价', href: '/pricing' },
    { label: '案例', href: '/cases' },
    { label: '文档', href: '/docs' },
    { label: '术语', href: '/glossary' },
    { label: '博客', href: '/blog' },
    { label: '关于', href: '/about' },
  ],
  navFooter: {
    product: [
      { label: 'AI 可见性诊断', href: '/product#diagnosis' },
      { label: '内容结构化', href: '/product#structure' },
      { label: 'Schema 与 llms.txt 生成', href: '/product#schema' },
      { label: '引用与提及监测', href: '/product#monitor' },
    ],
    resources: [
      { label: '产品文档', href: '/docs' },
      { label: 'GEO 术语表', href: '/glossary' },
      { label: '博客与研究', href: '/blog' },
      { label: 'FAQ 汇总', href: '/faq' },
    ],
    company: [
      { label: '关于我们', href: '/about' },
      { label: '客户案例', href: '/cases' },
      { label: '解决方案', href: '/solutions' },
      { label: '联系我们', href: '/contact' },
    ],
    legal: [
      { label: '隐私政策', href: '/#privacy' },
      { label: '服务条款', href: '/#terms' },
      { label: '合规说明', href: '/about#compliance' },
    ],
  },
  softwareApplication: {
    name: 'FlyAI GEO Platform',
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
