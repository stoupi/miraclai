import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/app/i18n/navigation';

const CONTACT_EMAIL = 'contact@miracl.ai';
const CONTACT_PHONE = '+33 1 70 00 00 00';

const navigationRoutes = [
  { key: 'home', href: '/' },
  { key: 'team', href: '/team' },
  { key: 'services', href: '/services' },
  { key: 'news', href: '/news' }
] as const;

type FooterProps = { locale: string };

export async function Footer({ locale }: FooterProps) {
  const [tFooter, tNavigation, tHome] = await Promise.all([
    getTranslations({ locale, namespace: 'footer' }),
    getTranslations({ locale, namespace: 'navigation' }),
    getTranslations({ locale, namespace: 'home' })
  ]);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030b1d] text-white overflow-hidden">
      <div className="container relative mx-auto px-4 py-16">
        <div className="pointer-events-none absolute -left-48 bottom-0 hidden select-none translate-y-[180px] md:block md:translate-y-[200px] lg:-left-40 lg:translate-y-[220px] xl:translate-y-[240px]">
          <Image
            src="/assets/coeur_hero.svg"
            alt={tHome('heartImageAlt')}
            width={520}
            height={520}
            className="w-[400px] max-w-none lg:w-[460px] xl:w-[520px]"
          />
        </div>
        <div className="grid gap-12 md:grid-cols-[260px_1fr_1fr] md:gap-16 md:pl-[200px] lg:grid-cols-[280px_1fr_1fr] lg:pl-[240px] xl:grid-cols-[320px_1fr_1fr] xl:gap-20 xl:pl-[280px]">
          <div className="flex flex-col gap-6 md:min-h-[280px] md:justify-center">
            <div className="flex justify-center md:hidden">
              <Image
                src="/assets/coeur_hero.svg"
                alt={tHome('heartImageAlt')}
                width={240}
                height={240}
                className="h-40 w-auto"
              />
            </div>
            <Link href="/" className="inline-flex justify-center md:justify-start">
              <Image
                src="/assets/logo_miracl_blanc_V2.svg"
                alt={tNavigation('logoAlt')}
                width={260}
                height={80}
                className="h-16 w-auto"
              />
            </Link>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
              {tFooter('navigationTitle')}
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              {navigationRoutes.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {tFooter(`links.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 text-sm text-white/80">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                {tFooter('contactTitle')}
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="block text-xs uppercase tracking-[0.2em] text-white/40">
                    {tFooter('contactEmailLabel')}
                  </span>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-white/80 transition-colors hover:text-white"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-[0.2em] text-white/40">
                    {tFooter('contactPhoneLabel')}
                  </span>
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`}
                    className="text-white/80 transition-colors hover:text-white"
                  >
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                {tFooter('addressTitle')}
              </h3>
              <p className="text-white/70">
                {tFooter('addressLine1')}
                <br />
                {tFooter('addressLine2')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 text-xs text-white/50">
          © {currentYear} {tFooter('copyrightSuffix')}
        </div>
      </div>
    </footer>
  );
}
