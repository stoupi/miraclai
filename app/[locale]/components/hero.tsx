import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/app/i18n/navigation';
import { Button } from '@/components/ui/button';

type HeroProps = { locale: string };

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#061024] via-[#0A3242] to-[#64C0C9]" />

      <svg
        aria-hidden
        className="absolute left-0 right-0 top-28 -z-10 h-32 w-full opacity-20"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120 L120 120 L160 30 L220 120 L360 120 L400 60 L520 60 L560 120 L720 120 L760 40 L820 120 L980 120 L1020 80 L1140 80 L1180 120 L1440 120"
          fill="none"
          stroke="#BFE8F0"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <div className="container mx-auto grid min-h-[80vh] grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 lg:min-h-[86vh] lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
            {t('olvaHeadline')}
          </h1>
          <p className="max-w-xl text-lg text-[#D0EEF3] sm:text-xl">
            {t('olvaDescription')}
          </p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row">
            <Link href="/invest">
              <Button size="lg" className="rounded-full bg-white px-7 text-base md:text-lg font-semibold text-[#1F6DB2] hover:bg-[#F6FBFF]">
                {t('ctaInvest')}
              </Button>
            </Link>
            <Link href="/careers">
              <Button size="lg" variant="outline" className="rounded-full border-2 border-white bg-transparent px-7 text-base md:text-lg font-semibold text-white hover:bg-white/10">
                {t('ctaJoinTeam')}
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -right-10 bottom-0 top-0 hidden w-[720px] sm:block">
            <Image
              src="/assets/heart.svg"
              alt={t('heartImageAlt')}
              width={720}
              height={720}
              className="h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
