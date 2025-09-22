import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/app/i18n/navigation';
import { Button } from '@/components/ui/button';

type HeroProps = { locale: string };

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <section id="hero-section" className="relative isolate overflow-hidden min-h-[92vh]">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, #061024 0%, #061024 15%, #64C0C9 100%)'
        }}
      />

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

      <div className="container mx-auto grid min-h-[78vh] grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 lg:min-h-[88vh] lg:py-24">
        <div className="mt-24 md:mt-36 lg:mt-44 flex flex-col items-start gap-6 w-full">
          <div className="w-full max-w-4xl">
            <div className="flex w-full items-center justify-between gap-6">
              {(() => {
                let altText: string;
                try {
                  altText = t('aphpLogoAlt');
                } catch {
                  altText = 'AP-HP logo';
                }
                return (
                  <Image
                    src="/assets/AP-HP_Logo_blanc.svg"
                    alt={altText}
                    width={220}
                    height={60}
                    className="h-10 w-auto md:h-12 lg:h-14"
                    priority
                  />
                );
              })()}
              {(() => {
                let altText: string;
                try {
                  altText = t('carnotLogoAlt');
                } catch {
                  altText = 'Carnot AP-HP logo';
                }
                return (
                  <Image
                    src="/assets/CARNOT_AP-HP-1024x414.jpg"
                    alt={altText}
                    width={200}
                    height={81}
                  className="mr-8 md:mr-12 lg:mr-16 h-10 w-auto md:h-12 lg:h-14"
                    priority
                  />
                );
              })()}
            </div>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
              {t('olvaHeadline')}
            </h1>
            <p className="mt-2 max-w-3xl text-lg text-[#D0EEF3] sm:text-xl">
              {t('olvaDescription')}
            </p>
            <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-col gap-4 sm:flex-row">
              <Link href="/invest">
                <Button
                  size="lg"
                  className="cursor-pointer rounded-full border-2 border-white bg-white px-7 text-base md:text-lg font-semibold text-[#061024] transition-colors hover:bg-[#061024] hover:text-white hover:border-[#061024]"
                >
                  {t('ctaInvest')}
                </Button>
              </Link>
              <Link href="/careers">
                <Button
                  size="lg"
                  variant="outline"
                  className="cursor-pointer rounded-full border-2 border-white bg-transparent px-7 text-base md:text-lg font-semibold text-white transition-colors hover:bg-white hover:text-[#061024] hover:border-white"
                >
                  {t('ctaJoinTeam')}
                </Button>
              </Link>
            </div>
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
