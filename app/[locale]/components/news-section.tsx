import { Link } from '@/app/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

const cardKeys = ['card1', 'card2', 'card3', 'card4'] as const;
type CardKey = (typeof cardKeys)[number];

type NewsCard = {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  cta: string;
  imageAlt: string;
  image: string;
};

type NewsSectionProps = { locale: string };

const imageByCard: Record<CardKey, string> = {
  card1: '/assets/nouveaularib.jpg',
  card2: '/assets/equipe.jpeg',
  card3: '/assets/hand-drawn-heart.svg',
  card4: '/assets/coeur_miracl_netb.svg'
};

export async function NewsSection({ locale }: NewsSectionProps) {
  const t = await getTranslations({ locale, namespace: 'news' });

  const cards: NewsCard[] = cardKeys.map((key) => ({
    date: t(`cards.${key}.date`),
    category: t(`cards.${key}.category`),
    title: t(`cards.${key}.title`),
    excerpt: t(`cards.${key}.excerpt`),
    cta: t(`cards.${key}.cta`),
    imageAlt: t(`cards.${key}.imageAlt`),
    image: imageByCard[key]
  }));

  return (
    <section
      id="news-section"
      className="py-24 text-[#061024]"
      style={{ backgroundColor: '#F9F9F9' }}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-[#061024] sm:text-5xl">
            {t('sectionTitle')}
          </h2>
          <p className="mt-4 text-base text-[#061024]/70 sm:text-lg">
            {t('sectionSubtitle')}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Card
              key={card.title}
              className="flex h-full flex-col overflow-hidden border-white/40 bg-white p-0 text-[#061024] shadow-xl rounded-none"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
              <CardContent className="flex flex-1 flex-col gap-4 pb-4 pt-4">
                <div className="flex items-center justify-between text-base font-medium text-[#061024]/70">
                  <span>{card.date}</span>
                  <Badge className="rounded-full bg-[#2FE0EA] px-3 py-1 text-sm font-semibold uppercase tracking-wide text-white">
                    {card.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold leading-tight text-[#061024]">
                  {card.title}
                </CardTitle>
                <p className="text-sm text-[#061024]/75">
                  {card.excerpt}
                </p>
              </CardContent>
              <CardFooter className="mt-auto justify-end px-6 pb-4 pt-0">
                <Link
                  href="/news"
                  aria-label={card.cta}
                  className="text-sm font-semibold text-[#061024] transition-colors hover:text-[#05112b] hover:underline"
                >
                  {t('readMore')}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button
            asChild
            className="rounded-full border-2 border-[#061024] bg-[#061024] px-8 py-2.5 text-base font-semibold text-white transition-colors hover:bg-white hover:text-[#061024]"
          >
            <Link href="/news">{t('ctaLabel')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
