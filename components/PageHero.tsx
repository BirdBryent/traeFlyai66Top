import Image from 'next/image';
import { CTAButton } from './CTAButton';

type PageHeroProps = {
  eyebrow?: string;
  h1: string;
  lead: string;
  ctaPrimary?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  bgImage?: { src: string; alt: string };
};

export function PageHero({
  eyebrow = 'FlyAI · 生成式引擎优化（GEO）',
  h1,
  lead,
  ctaPrimary,
  ctaSecondary,
  bgImage,
}: PageHeroProps) {
  return (
    <header className="relative overflow-hidden">
      {bgImage && (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={bgImage.src}
            alt={bgImage.alt}
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/95" />
        </div>
      )}
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-16 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-brand-600">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
            {h1}
          </h1>
          <p className="lead mt-8 max-w-3xl text-xl leading-relaxed text-gray-700 md:text-2xl">
            {lead}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
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
