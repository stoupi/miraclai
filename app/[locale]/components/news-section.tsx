import { Link } from '@/app/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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

  if (cards.length === 0) {
    return null;
  }

  const [feature, ...articles] = cards;

  return (
    <section id="news-section" className="bg-white py-24 text-[#061024]">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="relative isolate flex min-h-[520px] flex-col overflow-hidden rounded-none shadow-[0_40px_80px_rgba(6,16,36,0.22)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0D8196] via-[#00AFC4] to-[#27D0E1]" />
            <Image
              src={feature.image}
              alt={feature.imageAlt}
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover opacity-20"
              priority
            />
            <div className="pointer-events-none absolute inset-y-8 right-12 hidden flex-col justify-between lg:flex">
              <span
                className="text-[9rem] font-black uppercase tracking-tight text-white/25"
                style={{ writingMode: 'vertical-rl' }}
              >
                {t('accentLabel')}
              </span>
            </div>
            <div className="relative z-10 mt-auto w-full max-w-[520px] bg-white px-12 py-12">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#061024]/60">
                {feature.category}
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-snug text-[#061024]">
                {feature.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#061024]/75">
                {feature.excerpt}
              </p>
              <Link
                href="/news"
                className="mt-6 inline-flex items-center gap-3 text-base font-semibold text-[#061024] transition-colors hover:text-[#05112b]"
                aria-label={feature.cta}
              >
                {feature.cta}
                <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.45em] text-[#061024]/60">
                {t('sectionKicker')}
              </p>
              <h3 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-[#061024]">
                {t('sectionTitle')}
              </h3>
              <p className="mt-4 text-base text-[#061024]/70">
                {t('sectionSubtitle')}
              </p>
            </div>

            <div className="flex flex-1 flex-col gap-10">
              {articles.map((article) => (
                <div key={article.title} className="group flex flex-col border-b border-[#061024]/15 pb-8 last:border-none last:pb-0">
                  <div className="flex justify-between gap-8">
                    <div className="max-w-xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#061024]/60">
                        {article.category}
                      </p>
                      <h4 className="mt-3 text-xl font-semibold leading-snug text-[#071330] transition-colors group-hover:text-[#05112b]">
                        {article.title}
                      </h4>
                      <p className="mt-3 text-sm text-[#061024]/75">
                        {article.excerpt}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 size-6 shrink-0 text-[#061024]/40 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#061024]" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                asChild
                className="rounded-full bg-[#041CB3] px-12 text-base font-semibold text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#03158A]"
              >
                <Link href="/news">{t('ctaLabel')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
