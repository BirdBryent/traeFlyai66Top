import { relatedLinks, toAbsolute } from '@/lib/related-links';

/**
 * 正文上下文内链区块。
 * 刻意用原生 <a href={绝对URL}> 而不是 next/link：
 *  1) next/link 输出的 href 是相对路径，GEORank 引用维度不计入内链（实测 internal_link_count 恒为 0）；
 *  2) 绝对 URL 对不执行 JS 的生成式引擎抓取器更明确。
 * 代价：点击为整页跳转（SSG 站点，白屏 < 100ms），可接受。
 */
export function RelatedLinks({ path }: { path: string }) {
  const items = relatedLinks[path];
  if (!items?.length) return null;
  return (
    <nav
      aria-labelledby="related-heading"
      className="mx-auto w-full max-w-4xl px-5 py-10 lg:px-8"
    >
      <h2 id="related-heading" className="text-xl font-semibold text-gray-900">
        相关内容
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5">
        {items.map((i) => (
          <li key={i.path}>
            <a
              href={toAbsolute(i.path)}
              className="text-brand-600 underline underline-offset-2 hover:text-brand-700"
            >
              {i.anchor}
            </a>
            {i.note ? <span className="text-gray-500">（{i.note}）</span> : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default RelatedLinks;
