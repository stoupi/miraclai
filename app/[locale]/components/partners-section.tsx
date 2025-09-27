import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/app/i18n/navigation';
import { Button } from '@/components/ui/button';
import { PartnersMarquee } from '@/components/ui/partners-marquee';
import { getPartnerLogos } from '@/lib/services/partners';

const highlightClass = 'relative inline-block pb-[0.25rem]';
const highlightAccentClass =
  'pointer-events-none absolute -left-2 -right-2 bottom-0 h-2 bg-[#F33349]';

export async function PartnersSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const logos = await getPartnerLogos();

  const title: ReactNode = t.rich('partnersTitle', {
    highlight: (chunks) => (
      <span className={highlightClass}>
        <span className="relative z-10">{chunks}</span>
        <span aria-hidden className={highlightAccentClass} />
      </span>
    )
  });

  return (
    <section id="partners-section" className="relative w-full bg-white py-32">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-2xl font-bold text-black sm:text-3xl md:text-4xl">
          {title}
        </h2>
        <p className="mb-10 text-center text-sm text-[#061024]/70 sm:text-base md:mb-14">
          {t('partnersInstructions')}
        </p>
        <PartnersMarquee
          logos={logos}
          className="py-4 md:py-6"
          trackClassName="gap-16 pr-16"
          itemClassName="h-14 cursor-pointer hover:opacity-100 hover:grayscale-0 md:h-16"
        />
      </div>
      <div className="mt-16 flex justify-center md:mt-20">
        <Link href="/team">
          <Button className="cursor-pointer rounded-full border-2 border-[#F33349] bg-[#F33349] px-7 py-2.5 text-base font-semibold text-white transition-colors hover:bg-white hover:text-[#F33349] hover:border-[#F33349] md:text-lg" size="lg">
            {t('partnersCtaTeam')}
          </Button>
        </Link>
      </div>
    </section>
  );
}
