import { Link } from '@/app/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

type Props = { locale: string };

const cardKeys = ['card1', 'card2', 'card3'] as const;
type CardKey = (typeof cardKeys)[number];

type CardImageConfig = {
  src: string;
  altKey: string;
  width: number;
  height: number;
  className?: string;
};

const cardMediaByKey: Record<CardKey, CardImageConfig[]> = {
  card1: [
    {
      src: '/assets/ct.svg',
      altKey: 'cards.card1.imageAltPrimary',
      width: 100,
      height: 100,
      className: 'h-64 w-64' // taille plus grande pour le CT
    }
  ],
  card2: [
    {
      src: '/assets/accompagnement.svg',
      altKey: 'cards.card2.imageAltPrimary',
      width: 48,
      height: 48,
      className: 'h-42 w-42' // petite taille
    }
  ],
  card3: [
    {
      src: '/assets/ai.svg',
      altKey: 'cards.card3.imageAltPrimary',
      width: 48,
      height: 48,
      className: 'h-42 w-42' // petite taille
    }
  ]
};

export async function ResearchSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'research' });

  const services = cardKeys.map((cardKey) => ({
    key: cardKey,
    title: t(`cards.${cardKey}.title`),
    description: t(`cards.${cardKey}.description`),
    images: cardMediaByKey[cardKey].map(({ altKey, ...config }) => ({
      ...config,
      alt: t(altKey)
    }))
  }));

  return (
    <section className="bg-[#061024] py-24 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-3">
          {services.map(({ key, title, description, images }) => (
            <article
              key={key}
              className="service-card group flex h-full flex-col items-center border border-black/5 bg-white px-10 py-14 text-center text-[#061024] shadow-[0_35px_90px_rgba(6,16,36,0.18)] transition-transform duration-200 hover:-translate-y-1"
            >
              <div
                className={`flex h-36 items-center justify-center ${images.length > 1 ? 'gap-6' : ''}`}
              >
                {images.map(({ src, alt, width, height, className }) => (
                  <Image
                    key={src}
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className={className}
                    priority={key === 'card1'}
                  />
                ))}
              </div>
              <h3 className="relative mt-8 inline-block text-2xl font-extrabold leading-snug text-[#061024]">
                <span className="highlight-diagonal">{title}</span>
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#061024]/75">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full bg-[#F33349] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white hover:text-[#F33349]"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
