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
  { src: '/assets/images_hero/echo.png', alt: 'Échographie', label: 'Écho', scale: 'scale-100' },
  { src: '/assets/images_hero/angio.png', alt: 'Coronarographie', label: 'Angio', scale: 'scale-100' },
  { src: '/assets/images_hero/oct.png', alt: 'OCT/IVUS', label: 'OCT', scale: 'scale-100' },
  { src: '/assets/images_hero/ecg.jpg', alt: 'ECG', label: 'ECG', scale: 'scale-100' },
  { src: '/assets/images_hero/nuclear.png', alt: 'Imagerie nucléaire', label: 'Nucléaire', scale: 'scale-100' },
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
            <h1 className="text-balance text-4xl leading-tight tracking-tight text-[#061024] sm:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-calistoga), serif' }}>
              {t.rich('olvaHeadline', {
                highlight: (chunks) => (
                  <span className="hero-highlight">{chunks}</span>
                )
              })}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#061024]/70 sm:text-lg">
              {t('olvaDescription')}
            </p>
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
          <div className="relative w-[280px] sm:w-[320px] lg:w-[380px] xl:w-[420px]">
            <Image
              src="/assets/coeur_hero.svg"
              alt={t('heartImageAlt')}
              width={420}
              height={420}
              className="heart-hover w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(0,180,216,0.2)]"
              priority
            />
          </div>
        </div>
      </div>

      <div className="w-full -mt-12 md:-mt-16 pb-4">
        <div className="w-full flex justify-end pr-4 md:pr-8 lg:pr-16">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            {imagingModalities.map((modality, index) => (
              <div
                key={modality.label}
                className="group flex flex-col items-center animate-slide-in"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-white shadow-lg bg-[#061024] transition-all duration-300 hover:scale-110 hover:shadow-xl hover:border-[#00B4D8]">
                  <Image
                    src={modality.src}
                    alt={modality.alt}
                    fill
                    className={`object-cover ${modality.scale}`}
                    sizes="80px"
                  />
                </div>
                <span className="mt-2 text-[10px] sm:text-xs font-medium text-[#061024]/60 transition-colors group-hover:text-[#00B4D8]">
                  {modality.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
