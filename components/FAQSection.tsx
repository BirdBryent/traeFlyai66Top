import Link from 'next/link';
import { buildFAQPage, FAQItem } from '@/lib/schema';
import JsonLd from './JsonLd';

type FAQSectionProps = {
  title?: string;
  items: FAQItem[];
  id?: string;
};

/** FAQ 答案里允许写 markdown 链接：[文案](/path) / [文案](https://…) / [文案](mailto:…) */
const MD_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const LINK_CLASS =
  'text-brand-600 underline underline-offset-2 hover:text-brand-700';

/**
 * 去掉 markdown 链接语法只留可读文本，供 JSON-LD 使用——
 * 否则方括号与 URL 会原样进 FAQPage，AI 引擎抽到的答案就是脏文本。
 * mailto 保留邮箱地址，站内链接保留链接文案。
 */
function stripLinks(text: string) {
  return text.replace(MD_LINK, (_full, label: string, href: string) =>
    href.startsWith('mailto:') ? href.slice(7) : label,
  );
}

/** 把答案里的 markdown 链接渲染成真链接，其余部分保持纯文本 */
function renderAnswer(text: string) {
  const nodes: React.ReactNode[] = [];
  const re = new RegExp(MD_LINK.source, 'g');
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const label = m[1];
    const href = m[2];
    const key = `md-link-${i++}`;

    if (href.startsWith('http')) {
      nodes.push(
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {label}
        </a>,
      );
    } else if (href.startsWith('mailto:')) {
      nodes.push(
        <a key={key} href={href} className={LINK_CLASS}>
          {label}
        </a>,
      );
    } else {
      nodes.push(
        <Link key={key} href={href} className={LINK_CLASS}>
          {label}
        </Link>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function FAQSection({
  title = '常见问题',
  items,
  id,
}: FAQSectionProps) {
  return (
    <section
      id={id ?? 'faq'}
      aria-labelledby="faq-heading"
      className="mx-auto w-full max-w-4xl px-5 py-16 lg:px-8"
    >
      <h2
        id="faq-heading"
        className="text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
      >
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-base text-gray-600">
        以下是客户在评估 GEO 服务时最常提出的问题；如未找到答案，可联系 FlyAI
        销售团队获得一对一解答。
      </p>
      <div className="mt-10">
        {items.map((it, idx) => (
          <details key={`q-${idx}`} className="group">
            <summary className="text-left text-gray-900">
              <span className="pr-4">{it.question}</span>
            </summary>
            <div className="faq-answer whitespace-pre-line leading-relaxed">
              {renderAnswer(it.answer)}
            </div>
          </details>
        ))}
      </div>
      {/* JSON-LD 用去链接后的纯文本，避免 [文案](URL) 原样进入 FAQPage */}
      <JsonLd
        data={buildFAQPage(
          items.map((it) => ({ ...it, answer: stripLinks(it.answer) })),
        )}
      />
    </section>
  );
}

export default FAQSection;
