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
  const highlightGradient =
    'bg-gradient-to-r from-[#007AFF] via-[#F23D4C] to-[#FF80AB]';
  const highlightIndex = content.title.indexOf(highlightLabel);
  const partnersInstructionLines = content.partnersInstructions
    ? content.partnersInstructions
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
    : [];
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
              <span className="block">
                {beforeHighlight}
                <AuroraText colors={highlightGradient}>{highlightLabel}</AuroraText>
                {firstLineSuffix}
              </span>
              {secondLineText.length > 0 ? (
                <span className="block md:whitespace-nowrap">{secondLineText}</span>
              ) : null}
            </>
          );
        })();

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
          {partnersInstructionLines.length > 0 ? (
            <p className="text-sm font-semibold leading-relaxed text-[#061024] sm:text-base md:text-lg">
              {partnersInstructionLines.map((line, index) => (
                <span
                  key={`partners-instruction-${index}`}
                  className={index > 0 ? 'block pt-2' : 'block'}
                >
                  {line}
                </span>
              ))}
            </p>
          ) : null}
          <PartnersMarquee
            logos={logos}
            className="py-2"
            trackClassName="gap-12 pr-12"
            itemClassName="h-12 hover:opacity-100 hover:grayscale-0 md:h-16"
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
