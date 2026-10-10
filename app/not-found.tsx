import PageHero from '@/components/PageHero';

export default function NotFound() {
  return (
    <div>
      <PageHero
        eyebrow="404 · 页面未找到"
        h1="该页面未找到"
        lead="请检查输入的 URL 是否正确，或使用下方按钮返回 FlyAI 首页继续浏览产品、方案与文档。如果你是从第三方链接跳转到此处，可能是链接已经过期，建议通过官网主导航进入对应页面。"
        ctaPrimary={{ text: '立即开始', href: '/' }}
        ctaSecondary={{ text: '联系销售', href: '/contact' }}
      />
    </div>
  );
}

