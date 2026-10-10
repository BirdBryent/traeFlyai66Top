// 占位：后续可引入 next-mdx-remote/rsc 做 MDX 远端编译
// 目前 Phase 1-2 采用 @next/mdx 原生 App Router 方式（app/**/page.mdx）
export async function loadMdxSource(raw: string) {
  return { content: null, frontmatter: {}, raw };
}
