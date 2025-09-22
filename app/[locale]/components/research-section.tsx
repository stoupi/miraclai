import { getTranslations } from 'next-intl/server';
import { Link } from '@/app/i18n/navigation';
import { Button } from '@/components/ui/button';

type Props = { locale: string };

export async function ResearchSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'research' });

  return (
    <section className="bg-[#061024] py-24 text-white">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold text-white/70">
          {t('strapline')}
        </p>
        <h2 className="mt-4 text-center text-4xl font-extrabold leading-tight sm:text-5xl">
          {t('headline1')}<br className="hidden sm:block" /> {t('headline2')},
          <br className="hidden sm:block" /> {t('headline3')}.
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-center text-white/80">
          {t('description')}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M7 7V4h10v3" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">{t('feature1Title')}</h3>
            <p className="mt-2 text-white/75">{t('feature1Text')}</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v18M5 10l7-7 7 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">{t('feature2Title')}</h3>
            <p className="mt-2 text-white/75">{t('feature2Text')}</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12h8M12 8v8" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">{t('feature3Title')}</h3>
            <p className="mt-2 text-white/75">{t('feature3Text')}</p>
          </div>
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

