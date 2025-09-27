import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/app/i18n/navigation';
import { Button } from '@/components/ui/button';

const baselineY = 80;
const baseCyclePath =
  'M0 80 L120 80 L140 70 L160 80 L200 80 L220 130 L240 20 L260 130 L280 80 L320 80 L340 60 L360 80';

const ecgPathSegments = [0, 360, 720].map((offset) =>
  baseCyclePath.replace(/(M|L)(\d+)/g, (match, command, value) => {
    const numericValue = Number(value) + offset;
    return `${command}${numericValue}`;
  })
);

const ecgPathD = ecgPathSegments
  .map((segment, index) => (index === 0 ? segment : segment.replace(/^M/, 'L')))
  .join(' ');

const horizontalScale = 1440 / 1080;
const verticalScale = 1.5;
const ecgTransform = `translate(0, ${baselineY}) scale(${horizontalScale}, ${verticalScale}) translate(0, -${baselineY})`;
const waveformOffsetY = 12;

type HeroProps = { locale: string };

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <section id="hero-section" className="relative isolate overflow-hidden min-h-[80vh] py-6 md:py-2 lg:py-0">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, #061024 0%, #061024 15%, #64C0C9 100%)'
        }}
      />

      <svg
        aria-hidden
        className="absolute left-0 right-0 top-16 md:top-20 -z-10 h-32 w-full opacity-20"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="ecgGlowGradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="200"
            y2="0"
          >
            <stop offset="0" stopColor="#00E0FF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#00E0FF" stopOpacity="1" />
            <stop offset="1" stopColor="#00E0FF" stopOpacity="0" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-200 0"
              to="1440 0"
              dur="7s"
              repeatCount="indefinite"
            />
          </linearGradient>
          <filter id="ecgGlow" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g transform={`translate(0, ${waveformOffsetY}) ${ecgTransform}`}>
          <path
            d={ecgPathD}
            fill="none"
            stroke="#66E0FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.4"
          />
          <path
            d={ecgPathD}
            fill="none"
            stroke="url(#ecgGlowGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            filter="url(#ecgGlow)"
          />
        </g>
      </svg>

      <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 pt-14 pb-10 md:grid-cols-2 lg:pt-12 lg:pb-12">
        <div className="flex flex-col items-start gap-6 w-full">
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
            <h1 className="mt-2 text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {t.rich('olvaHeadline', {
                highlight: (chunks) => (
                  <span className="hero-highlight">{chunks}</span>
                )
              })}
            </h1>
            <p className="mt-4 max-w-3xl text-base text-[#D0EEF3] sm:text-lg">
              {t('olvaDescription')}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row">
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
                  className="cursor-pointer rounded-full border-2 border-white bg-transparent px-7 text-base md:text-lg font-semibold text-white transition-colors hover:bg-[#061024] hover:text-white hover:border-[#061024]"
                >
                  {t('ctaJoinTeam')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative w-[380px] sm:w-[420px] lg:w-[500px] xl:w-[560px] translate-y-10 md:translate-y-16">
            <Image
              src="/assets/coeur_hero.svg"
              alt={t('heartImageAlt')}
              width={560}
              height={560}
              className="heart-hover h-full w-full object-contain drop-shadow-[0_24px_60px_rgba(6,16,36,0.35)] pointer-events-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
