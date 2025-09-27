import Image from 'next/image';
import { Link } from '@/app/i18n/navigation';
import { Button } from '@/components/ui/button';
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
      <div className="container relative z-10 mx-auto px-6 py-24 text-center md:py-28 lg:py-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {content.eyebrow ? (
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#061024]/70">
              {content.eyebrow}
            </span>
          ) : null}
          <h1 className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-7xl">
            {highlightedTitle}
          </h1>
          <p className="mt-6 text-lg font-medium text-gray-800">
            {content.introLead}
          </p>
          <p className="mt-2 text-base text-gray-600">
            {content.partnersInstructions}
          </p>
          {content.partnersTitle ? (
            <div className="mt-10 text-sm font-semibold uppercase tracking-[0.3em] text-[#061024]/60">
              {content.partnersTitle}
            </div>
          ) : null}
          <div className="mt-10 flex flex-wrap justify-center gap-10 grayscale transition hover:grayscale-0">
            {logos.map((logo) => {
              const scale = logo.scale ?? 1;

              return (
                <div
                  key={logo.src}
                  className="flex h-16 w-40 items-center justify-center transition duration-300 ease-out hover:scale-105"
                >
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={
                      scale === 1
                        ? undefined
                        : { transform: `scale(${scale})`, transformOrigin: 'center' }
                    }
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={160}
                      height={64}
                      className="h-full w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {content.actions.map((action, index) => (
              <Button
                key={action.href}
                asChild
                size="lg"
                variant={index === 0 ? 'default' : 'outline'}
                className={
                  index === 0
                    ? 'rounded-full border-2 border-[#F33349] bg-[#F33349] px-7 py-2.5 text-base font-semibold text-white transition-colors hover:bg-white hover:text-[#F33349] hover:border-[#F33349] md:text-lg'
                    : 'rounded-full border-2 border-[#F33349] px-7 py-2.5 text-base font-semibold text-[#F33349] transition-colors hover:bg-[#F33349] hover:text-white md:text-lg'
                }
              >
                <Link href={action.href}>{action.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
