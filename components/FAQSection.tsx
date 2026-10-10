import { buildFAQPage, FAQItem } from '@/lib/schema';
import JsonLd from './JsonLd';

type FAQSectionProps = {
  title?: string;
  items: FAQItem[];
  id?: string;
};

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
              {it.answer}
            </div>
          </details>
        ))}
      </div>
      <JsonLd data={buildFAQPage(items)} />
    </section>
  );
}

export default FAQSection;
