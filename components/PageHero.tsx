import clsx from './clsx';
import Image from 'next/image';
import { CTAButton } from './CTAButton';

type PageHeroH1 = string | readonly [string, string];

type PageHeroProps = {
  eyebrow?: string;
  h1: PageHeroH1;
  lead: string;
  ctaPrimary?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  bgImage?: { src: string; alt: string };
  /** 是否隐藏眉题小标题（首页要精简排版时使用） */
  hideEyebrow?: boolean;
  /** 是否居中对齐（首页 Hero 使用） */
  center?: boolean;
};

function renderH1(h1: PageHeroH1) {
  if (typeof h1 === 'string') return h1;
  return (
    <>
      <span className="block">{h1[0]}</span>
      <span className="block text-gray-600">{h1[1]}</span>
    </>
  );
}

export function PageHero({
  eyebrow = 'FlyAI · 生成式引擎优化（GEO）',
  h1,
  lead,
  ctaPrimary,
  ctaSecondary,
  bgImage,
  hideEyebrow = false,
  center = false,
}: PageHeroProps) {
  return (
    <header className="relative isolate overflow-hidden">
      {bgImage && (
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* 与 .page-rails 的两侧竖线对齐：同为 max-w-7xl 居中容器，
              <1280px 时竖线隐藏，此处也自然退化为通栏 */}
          <div className="relative mx-auto h-full w-full max-w-7xl">
            <Image
              src={bgImage.src}
              alt={bgImage.alt}
              fill
              priority
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/95" />
        </div>
      )}
      <div
        className={clsx(
          'mx-auto max-w-7xl px-5 pb-12 pt-8 lg:px-8 lg:pb-16 lg:pt-12',
          center && 'flex justify-center',
        )}
      >
        <div
          className={clsx(
            'max-w-5xl',
            center && 'w-full max-w-5xl',
          )}
        >
          {!hideEyebrow && (
            <div
              className={clsx(
                'mb-5 text-sm font-semibold uppercase tracking-wider text-brand-600',
              )}
            >
              {eyebrow}
            </div>
          )}
          <h1
            className={clsx(
              'text-4xl font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl',
              center && 'text-center',
            )}
          >
            {renderH1(h1)}
          </h1>
          <p
            className={clsx(
              'lead mt-8 text-xl leading-relaxed text-gray-600 md:text-2xl',
              center && 'mx-auto text-center',
            )}
          >
            {lead}
          </p>
          <div
            className={clsx(
              'mt-10 flex flex-wrap items-center gap-4',
              center && 'justify-center',
            )}
          >
            {ctaPrimary && (
              <CTAButton href={ctaPrimary.href} size="lg" variant="primary">
                {ctaPrimary.text}
              </CTAButton>
            )}
            {ctaSecondary && (
              <CTAButton href={ctaSecondary.href} size="lg" variant="ghost">
                {ctaSecondary.text}
              </CTAButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default PageHero;
