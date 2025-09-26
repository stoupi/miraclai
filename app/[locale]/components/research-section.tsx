import { getTranslations } from 'next-intl/server';
import { Link } from '@/app/i18n/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

type Props = { locale: string };

const cardKeys = ['card1', 'card2', 'card3'] as const;

export async function ResearchSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'research' });

  const services = cardKeys.map((cardKey) => ({
    key: cardKey,
    category: t(`cards.${cardKey}.category`),
    title: t(`cards.${cardKey}.title`),
    description: t(`cards.${cardKey}.description`),
    image: t(`cards.${cardKey}.image`),
    imageAlt: t(`cards.${cardKey}.imageAlt`)
  }));

  return (
    <section className="bg-[#061024] py-24 text-white">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.4em] text-white/70">
          {t('strapline')}
        </p>
        <h2 className="mt-4 text-center text-4xl font-extrabold leading-tight sm:text-5xl">
          {t('headline2')},<br className="hidden sm:block" /> {t('headline3')}.
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-center text-white/80">
          {t('description')}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {services.map(({ key, category, title, description, image, imageAlt }) => (
            <article
              key={key}
              className="relative isolate flex h-full flex-col overflow-hidden rounded-none bg-white text-[#061024] shadow-[0_20px_55px_rgba(5,16,36,0.18)]"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#03879F] via-[#039AB7] to-[#03AED3]" />
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="h-full w-full object-cover opacity-30"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between px-8 py-9">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#061024]/55">
                    {category}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold leading-snug text-[#061024]">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#061024]/75">
                    {description}
                  </p>
                </div>
                <Link
                  href="/services"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#061024] transition-transform duration-200 hover:translate-x-1 hover:text-[#04102a]"
                >
                  {t('ctaCard')}
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link href="/services">
            <Button className="rounded-full border-2 border-[#F33349] bg-[#F33349] px-9 text-base md:text-lg font-semibold text-white transition-colors hover:bg-white hover:text-[#F33349]">
              {t('cta')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
