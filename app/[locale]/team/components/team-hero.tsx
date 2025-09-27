import Image from 'next/image';

import { Link } from '@/app/i18n/navigation';
import { Button } from '@/components/ui/button';

import type { HeroContent } from '../types';

type TeamHeroProps = {
  content: HeroContent;
};

export function TeamHero({ content }: TeamHeroProps) {
  return (
    <section
      id="team-hero"
      className="relative isolate overflow-hidden bg-[#061024] text-white"
    >
      <div className="absolute inset-0">
        <Image
          src={content.backgroundImageSrc}
          alt={content.backgroundAlt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#061024]/80" />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center gap-8 px-6 py-24 text-center md:py-28 lg:py-32">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
          {content.eyebrow}
        </span>
        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          {content.title}
        </h1>
        <p className="max-w-3xl text-base text-white/85 sm:text-lg md:text-xl">
          {content.subtitle}
        </p>
        <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:gap-6">
          {content.actions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Button
                size="lg"
                className="cursor-pointer rounded-full border-2 border-[#F33349] bg-[#F33349] px-8 py-3 text-base font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-[#F33349]"
              >
                {action.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
