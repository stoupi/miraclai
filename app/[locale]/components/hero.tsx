import { getTranslations } from 'next-intl/server';
import { getHeroImageUrl } from '@/lib/services/settings';
import { getSetting } from '@/lib/services/settings';
import Image from 'next/image';
import { Link } from '@/app/i18n/navigation';
import { Button } from '@/components/ui/button';

type HeroProps = {
  locale: string;
};

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: 'home' });
  let dbUrl: string | null = null;
  try {
    dbUrl = await getHeroImageUrl();
  } catch {
    dbUrl = null;
  }
  const imageUrl = dbUrl ?? process.env.NEXT_PUBLIC_HERO_IMAGE_URL ?? '/assets/nouveaularib.jpg';
  let teamUrl: string | null = null;
  try {
    teamUrl = await getSetting('HERO_TEAM_IMAGE_URL');
  } catch {
    teamUrl = null;
  }
  const teamImageUrl = teamUrl ?? process.env.NEXT_PUBLIC_HERO_TEAM_IMAGE_URL ?? '/assets/team.png';

  return (
    <section className="relative overflow-hidden">
      {/* Background image layer */}
      <div
        className="absolute inset-0 -z-10 bg-center bg-cover"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-hidden
      />
      {/* Blue overlay to create the tinted transparency */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#2F6FB7]/70 to-[#2A66A6]/70" />

      <div className="relative container mx-auto flex flex-col items-center gap-8 px-4 py-28 text-center sm:py-36">
        <div className="flex w-full max-w-6xl items-center justify-center gap-6 sm:gap-8">
          <h1 className="flex-1 text-balance text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)] sm:text-6xl">
            {t('heroTitle')}
          </h1>
          <div className="hidden md:block">
            <Image
              src={teamImageUrl}
              alt={t('teamImageAlt')}
              width={220}
              height={220}
              className="h-[220px] w-[220px] rounded-lg object-cover shadow-sm"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="max-w-3xl text-pretty text-[#E6F0FA] sm:text-xl">
            {t('heroSubtitle')}
          </p>
          <p className="text-[#E6F0FA] sm:text-xl">{t('chief')}</p>
        </div>
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <Link href="/appointments">
            <Button size="lg" className="rounded-[14px] bg-white px-8 text-[#1F6DB2] shadow-sm hover:bg-[#F6FBFF]">
              {t('primaryCta')}
            </Button>
          </Link>
          <Link href="/patients">
            <Button size="lg" variant="outline" className="rounded-[14px] border-2 border-white bg-transparent px-8 text-white hover:bg-white/10">
              {t('secondaryCta')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
