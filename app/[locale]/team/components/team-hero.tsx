import { Fragment } from 'react';

import { Link } from '@/app/i18n/navigation';
import { CtaButton } from '@/components/ui/cta-button';
import { PartnersMarquee } from '@/components/ui/partners-marquee';
import { AuroraText } from '@/registry/magicui/aurora-text';
import type { PartnerLogo } from '@/types/partners';

import type { HeroContent } from '../types';

type TeamHeroProps = {
  content: HeroContent;
  logos: PartnerLogo[];
};

export function TeamHero({ content, logos }: TeamHeroProps) {
  const highlightLabel = 'force collective';
  const highlightSegments = content.title.split(highlightLabel);
  const highlightedTitle =
    highlightSegments.length === 1
      ? content.title
      : highlightSegments.map((segment, index) => (
          <Fragment key={`${segment}-${index}`}>
            {segment}
            {index < highlightSegments.length - 1 ? (
              <AuroraText>{highlightLabel}</AuroraText>
            ) : null}
          </Fragment>
        ));

  return (
    <section
      id="hero-section"
      className="relative isolate overflow-hidden bg-white text-[#061024]"
    >
      <div className="container relative z-10 mx-auto flex flex-col items-center gap-8 px-6 py-24 text-center md:py-28 lg:py-32">
        {content.eyebrow ? (
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#061024]/70">
            {content.eyebrow}
          </span>
        ) : null}
        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-7xl">
          {highlightedTitle}
        </h1>
        {content.subtitle ? (
          <p className="max-w-3xl text-base text-[#061024]/80 sm:text-lg md:text-xl">
            {content.subtitle}
          </p>
        ) : null}
        <div className="flex w-full flex-col items-center gap-6 py-6">
          {content.partnersTitle ? (
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[#061024]/60">
              {content.partnersTitle}
            </div>
          ) : null}
          {content.partnersInstructions ? (
            <p className="text-sm text-[#061024]/70">{content.partnersInstructions}</p>
          ) : null}
          <PartnersMarquee
            logos={logos}
            className="py-2"
            trackClassName="gap-12 pr-12"
            itemClassName="h-10 hover:opacity-100 hover:grayscale-0 md:h-12"
          />
        </div>
        <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:gap-6">
          {content.actions.map((action) => (
            <CtaButton key={action.href} asChild>
              <Link href={action.href}>{action.label}</Link>
            </CtaButton>
          ))}
        </div>
      </div>
    </section>
  );
}
