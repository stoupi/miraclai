'use client';

import { Button } from '@/components/ui/button';

type HeroCtaButtonsProps = {
  ctaInvestLabel: string;
  ctaJoinTeamLabel: string;
};

export function HeroCtaButtons({ ctaInvestLabel, ctaJoinTeamLabel }: HeroCtaButtonsProps) {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
      <Button
        size="lg"
        onClick={() => {
          document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="cursor-pointer rounded-full border-2 border-[#F33349] bg-[#F33349] px-8 text-base md:text-lg font-semibold text-white transition-colors hover:bg-white hover:text-[#F33349]"
      >
        {ctaInvestLabel}
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => {
          document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="cursor-pointer rounded-full border-2 border-[#061024] bg-transparent px-8 text-base md:text-lg font-semibold text-[#061024] transition-colors hover:bg-[#061024] hover:text-white"
      >
        {ctaJoinTeamLabel}
      </Button>
    </div>
  );
}
