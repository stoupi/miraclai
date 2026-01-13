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

const imagingModalities = [
  { src: '/assets/images_hero/mri.png', alt: 'IRM', label: 'IRM', scale: 'scale-100' },
  { src: '/assets/images_hero/ct.png', alt: 'Scanner', label: 'Scanner', scale: 'scale-100' },
  { src: '/assets/images_hero/echo.png', alt: 'Échographie', label: 'Échographie', scale: 'scale-100' },
  { src: '/assets/images_hero/angio.png', alt: 'Coronarographie', label: 'Coronarographie', scale: 'scale-100' },
  { src: '/assets/images_hero/oct.png', alt: 'OCT/IVUS', label: 'OCT / IVUS', scale: 'scale-100' },
  { src: '/assets/images_hero/ecg.jpg', alt: 'ECG', label: 'ECG', scale: 'scale-100' },
  { src: '/assets/images_hero/nuclear.png', alt: 'Imagerie nucléaire', label: 'Imagerie nucléaire', scale: 'scale-100' },
];

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <section id="hero-section" className="relative isolate overflow-hidden min-h-[80vh] py-6 md:py-2 lg:py-0">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, #FAFBFC 0%, #F0F9FA 50%, #E8F6F7 100%)'
        }}
      />

      <svg
        aria-hidden
        className="absolute left-0 right-0 top-20 md:top-24 w-full h-28 opacity-60 z-0"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="ecgGlowGradientTop"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="200"
            y2="0"
          >
            <stop offset="0" stopColor="#00B4D8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#00B4D8" stopOpacity="1" />
            <stop offset="1" stopColor="#00B4D8" stopOpacity="0" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-200 0"
              to="1440 0"
              dur="5s"
              repeatCount="indefinite"
            />
          </linearGradient>
          <filter id="ecgGlowTop" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
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
            stroke="#00B4D8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.25"
          />
          <path
            d={ecgPathD}
            fill="none"
            stroke="url(#ecgGlowGradientTop)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            filter="url(#ecgGlowTop)"
          />
        </g>
      </svg>

      <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 pt-12 pb-6 md:grid-cols-2 lg:pt-16 lg:pb-8">
        <div className="flex flex-col items-start w-full pt-12 md:pt-16">
          <div className="w-full max-w-xl">
            <h1 className="text-balance text-3xl leading-[1.15] tracking-tight text-[#061024] sm:text-4xl lg:text-5xl" style={{ fontFamily: 'var(--font-calistoga), serif' }}>
              {t.rich('olvaHeadline', {
                highlight: (chunks) => (
                  <span className="hero-highlight">{chunks}</span>
                ),
                nowrap: (chunks) => (
                  <span className="whitespace-nowrap">{chunks}</span>
                )
              })}
            </h1>
            <div className="mt-6 flex flex-col gap-2 text-base text-[#061024] sm:text-lg">
              <p><span className="mr-2">{t('olvaService1Emoji')}</span><span className="font-bold">{t('olvaService1Bold')}</span> {t('olvaService1Regular')}</p>
              <p><span className="mr-2">{t('olvaService2Emoji')}</span><span className="font-bold">{t('olvaService2Bold')}</span> {t('olvaService2Regular')}</p>
              <p><span className="mr-2">{t('olvaService3Emoji')}</span><span className="font-bold">{t('olvaService3Bold')}</span> {t('olvaService3Regular')}</p>
              <p><span className="mr-2">{t('olvaService4Emoji')}</span><span className="font-bold">{t('olvaService4Bold')}</span> {t('olvaService4Regular')}</p>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/services">
                <Button
                  size="lg"
                  className="cursor-pointer rounded-full border-2 border-[#F33349] bg-[#F33349] px-8 text-base md:text-lg font-semibold text-white transition-colors hover:bg-white hover:text-[#F33349]"
                >
                  {t('ctaInvest')}
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="cursor-pointer rounded-full border-2 border-[#061024] bg-transparent px-8 text-base md:text-lg font-semibold text-[#061024] transition-colors hover:bg-[#061024] hover:text-white"
                >
                  {t('ctaJoinTeam')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative w-[200px] sm:w-[260px] md:w-[320px] lg:w-[380px] xl:w-[420px] mt-8 md:mt-12 lg:mt-16">
            <Image
              src="/assets/coeur_hero.svg"
              alt={t('heartImageAlt')}
              width={420}
              height={420}
              className="heart-hover w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(0,180,216,0.2)]"
              priority
            />

            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 md:gap-2">
              <div className="flex items-start gap-3 md:gap-6">
                {imagingModalities.slice(0, 4).map((modality) => (
                  <div key={modality.label} className="flex flex-col items-center group">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-white shadow-lg bg-[#061024] transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:border-[#00B4D8]">
                      <Image
                        src={modality.src}
                        alt={modality.alt}
                        width={64}
                        height={64}
                        className={`w-full h-full object-cover ${modality.scale}`}
                      />
                    </div>
                    <span className="mt-2 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-semibold text-[#061024] uppercase tracking-[0.12em] whitespace-nowrap shadow-sm">
                      {modality.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-3 md:gap-6">
                {imagingModalities.slice(4, 7).map((modality) => (
                  <div key={modality.label} className="flex flex-col items-center group">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-white shadow-lg bg-[#061024] transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:border-[#00B4D8]">
                      <Image
                        src={modality.src}
                        alt={modality.alt}
                        width={64}
                        height={64}
                        className={`w-full h-full object-cover ${modality.scale}`}
                      />
                    </div>
                    <span className="mt-2 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-semibold text-[#061024] uppercase tracking-[0.12em] whitespace-nowrap shadow-sm">
                      {modality.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
