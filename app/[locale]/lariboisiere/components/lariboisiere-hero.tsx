import Image from 'next/image';

import type { LariboisiereHeroContent } from '../types';

type LariboisiereHeroProps = {
  content: LariboisiereHeroContent;
};

export function LariboisiereHero({ content }: LariboisiereHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <div className="relative h-[320px] w-full md:h-[420px] lg:h-[520px]">
        <Image
          src={content.imageSrc}
          alt={content.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#061024]/55 to-[#061024]" />
      </div>
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-6 pb-8 md:pb-12 lg:pb-16">
          <div className="max-w-3xl space-y-4">
            {content.subtitle ? (
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                {content.subtitle}
              </p>
            ) : null}
            <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {content.title}
            </h1>
            <p className="text-sm font-semibold uppercase tracking-[0.45em] text-white/85 md:text-base">
              2 Rue Ambroise Paré, 75010 Paris
            </p>
            {content.description ? (
              <p className="text-base font-medium text-white/90 md:text-lg">
                {content.description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
