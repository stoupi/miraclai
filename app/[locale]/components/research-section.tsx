import { getTranslations } from 'next-intl/server';
import { Link } from '@/app/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = { locale: string };

const cardKeys = ['card1', 'card2', 'card3'] as const;

export async function ResearchSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'research' });

  const services = cardKeys.map((cardKey) => ({
    key: cardKey,
    title: t(`cards.${cardKey}.title`),
    description: t(`cards.${cardKey}.description`)
  }));

  return (
    <section className="bg-[#061024] py-24 text-white">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold text-white/70">
          {t('strapline')}
        </p>
        <h2 className="mt-4 text-center text-4xl font-extrabold leading-tight sm:text-5xl">
          {t('headline2')},<br className="hidden sm:block" /> {t('headline3')}.
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-center text-white/80">
          {t('description')}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {services.map(({ key, title, description }) => (
            <Card
              key={key}
              className="border-white/10 bg-white/5 text-left text-white shadow-lg"
            >
              <CardHeader className="space-y-3 px-6 pt-6">
                <CardTitle className="text-2xl font-semibold text-white">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-white/75 text-base">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link href="/services">
            <Button className="rounded-full bg-[#F33349] px-7 py-2.5 text-base md:text-lg font-semibold text-white border-2 border-[#F33349] transition-colors hover:bg-white hover:text-[#F33349] hover:border-white">
              {t('cta')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
