import { Link } from '@/app/i18n/navigation';
import { AuroraText } from '@/registry/magicui/aurora-text';
import { PartnersMarquee } from '@/components/ui/partners-marquee';
import { CtaButton } from '@/components/ui/cta-button';
import type { PartnerLogo } from '@/types/partners';

import type { HeroContent } from '../types';

type TeamHeroProps = {
  content: HeroContent;
  logos: PartnerLogo[];
};

export function TeamHero({ content, logos }: TeamHeroProps) {
  const highlightLabel = 'force collective';
  const highlightGradient =
    'bg-gradient-to-r from-[#007AFF] via-[#F23D4C] to-[#FF80AB]';
  const highlightIndex = content.title.indexOf(highlightLabel);
  const highlightedTitle =
    highlightIndex === -1
      ? content.title
      : (() => {
          const beforeHighlight = content.title.slice(0, highlightIndex);
          const afterHighlightStart = highlightIndex + highlightLabel.length;
          const afterHighlight = content.title.slice(afterHighlightStart);
          const lineBreakPhrase = ' au service';
          const lineBreakIndex = afterHighlight.indexOf(lineBreakPhrase);

          if (lineBreakIndex === -1) {
            return (
              <>
                <span className="block">
                  {beforeHighlight}
                  <AuroraText colors={highlightGradient}>{highlightLabel}</AuroraText>
                  {afterHighlight}
                </span>
              </>
            );
          }

          const firstLineSuffix = afterHighlight.slice(0, lineBreakIndex + lineBreakPhrase.length);
          const secondLineText = afterHighlight
            .slice(lineBreakIndex + lineBreakPhrase.length)
            .trimStart();

          return (
            <>
              <span className="block leading-tight">
                {beforeHighlight}
                <AuroraText colors={highlightGradient}>{highlightLabel}</AuroraText>
                {firstLineSuffix}
              </span>
              {secondLineText.length > 0 ? (
                <span className="block -mt-2 leading-tight md:-mt-3 lg:-mt-4 md:whitespace-nowrap">
                  {secondLineText}
                </span>
              ) : null}
            </>
          );
        })();

  return (
    <section
      id="hero-section"
      className="relative isolate overflow-hidden bg-white text-[#061024]"
    >
      <div className="container relative z-10 mx-auto px-6 pt-24 pb-16 text-center md:pt-28 md:pb-20 lg:pt-32 lg:pb-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {content.eyebrow ? (
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#061024]/70">
              {content.eyebrow}
            </span>
          ) : null}
          <h1 className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-7xl">
            {highlightedTitle}
          </h1>
          {content.introLead ? (
            <p className="mt-6 text-lg font-medium text-gray-800">
              {content.introLead}
            </p>
          ) : null}
          {logos.length > 0 ? (
            <div className="mt-10 w-full">
              {content.partnersInstructions ? (
                <p className="text-base text-gray-600">
                  {content.partnersInstructions}
                </p>
              ) : null}
              {content.partnersTitle ? (
                <div className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-[#061024]/60">
                  {content.partnersTitle}
                </div>
              ) : null}
              <div className="relative mt-6 w-screen max-w-none self-center left-1/2 -translate-x-1/2">
                <PartnersMarquee
                  logos={logos}
                  className="mx-auto w-full px-6 md:px-10 lg:px-16"
                  trackClassName="gap-14 pr-14"
                  itemClassName="h-12"
                />
              </div>
            </div>
          ) : null}
          <div className="mt-16 flex flex-wrap justify-center gap-6 md:mt-20">
            {content.actions.map((action) => (
              <CtaButton key={action.href} asChild size="lg">
                <Link href={action.href}>{action.label}</Link>
              </CtaButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
