import Link from 'next/link';
import { BreadcrumbItem, buildBreadcrumbList } from '@/lib/schema';
import JsonLd from './JsonLd';

type Props = { items: BreadcrumbItem[] };

export function Breadcrumb({ items }: Props) {
  if (!items?.length) return null;
  return (
    <>
      <nav aria-label="面包屑" className="mx-auto w-full max-w-7xl px-5 pt-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
          {items.map((it, idx) => {
          const last = idx === items.length - 1;
          const cls =
            'touch-target rounded px-1 py-1 transition hover:text-brand-600';
          return (
            <li key={it.label + idx} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className={cls + ' text-gray-900'}>
                  {it.label}
                </span>
              ) : it.href ? (
                <Link href={it.href} className={cls}>
                  {it.label}
                </Link>
              ) : (
                <span className={cls}>{it.label}</span>
              )}
              {!last && (
                <span aria-hidden="true" className="mx-1 text-gray-300">
                  /
                </span>
              )}
            </li>
          );
        })}
        </ol>
      </nav>
      <JsonLd data={buildBreadcrumbList(items)} />
    </>
  );
}

export default Breadcrumb;
