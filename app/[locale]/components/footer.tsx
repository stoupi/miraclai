import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/app/i18n/navigation';

const CONTACT_EMAIL = 'contact@miracl-ai.com';
const LINKEDIN_URL = 'https://www.linkedin.com/company/miracl-ai';

const navigationRoutes = [
  { key: 'home', href: '/' },
  { key: 'team', href: '/team' },
  { key: 'services', href: '/services' },
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
      <div className="container relative mx-auto px-4 py-12 md:py-14">
        <div className="pointer-events-none absolute -left-64 bottom-0 hidden select-none translate-y-[280px] md:block md:translate-y-[320px] lg:-left-52 lg:translate-y-[360px] xl:translate-y-[380px]">
          <Image
            src="/assets/coeur_hero.svg"
            alt={tHome('heartImageAlt')}
            width={520}
            height={520}
            className="w-[400px] max-w-none lg:w-[460px] xl:w-[520px]"
          />
        </div>
        <div className="grid gap-10 md:grid-cols-[260px_1fr_1fr] md:gap-14 md:pl-[200px] lg:grid-cols-[280px_1fr_1fr] lg:pl-[220px] xl:grid-cols-[320px_1fr_1fr] xl:gap-16 xl:pl-[260px]">
          <div className="flex flex-col gap-5 md:min-h-[240px] md:justify-start md:-mt-2 lg:-mt-4 xl:-mt-6">
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
              <div>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-white/80 transition-colors hover:text-white"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-[#00B4D8]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="text-xs">{tFooter('linkedinFollow')}</span>
              </a>
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
        <div className="container mx-auto px-4">
          <div className="text-xs text-white/50 text-center md:grid md:grid-cols-[260px_1fr_1fr] md:gap-14 md:pl-[200px] lg:grid-cols-[280px_1fr_1fr] lg:pl-[220px] xl:grid-cols-[320px_1fr_1fr] xl:gap-16 xl:pl-[260px]">
            <div className="hidden md:block" />
            <div className="hidden md:block" />
            <div className="md:text-left">
              © {currentYear} {tFooter('copyrightSuffix')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
