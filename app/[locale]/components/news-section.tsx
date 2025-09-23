import { Link } from '@/app/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

const cardKeys = ['card1', 'card2', 'card3'] as const;
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
  card3: '/assets/hand-drawn-heart.svg'
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
      className="relative isolate overflow-hidden py-24 text-[#061024]"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, #061024 0%, #061024 15%, #64C0C9 100%)'
        }}
      />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {t('sectionTitle')}
          </h2>
          <p className="mt-4 text-base text-[#061024]/80 sm:text-lg">
            {t('sectionSubtitle')}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {cards.map((card) => (
            <Card
              key={card.title}
              className="h-full overflow-hidden border-white/40 bg-white text-[#061024] shadow-xl"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
                  className={card.image.endsWith('.svg') ? 'object-contain p-6' : 'object-cover'}
                />
              </div>
              <CardContent className="space-y-4 pb-6 pt-6">
                <div className="flex items-center justify-between text-sm text-[#061024]/70">
                  <span>{card.date}</span>
                  <Badge className="rounded-full bg-[#061024]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#061024]">
                    {card.category}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-semibold leading-snug text-[#061024]">
                  {card.title}
                </CardTitle>
                <p className="text-sm text-[#061024]/75 sm:text-base">
                  {card.excerpt}
                </p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button
                  asChild
                  variant="link"
                  className="px-0 text-[#061024] underline-offset-4 hover:text-[#05112b]"
                >
                  <Link href="/news">{card.cta}</Link>
                </Button>
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
