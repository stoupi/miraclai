'use client';

import { Link, useRouter } from '@/app/i18n/navigation';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export function Navbar() {
  const t = useTranslations('navigation');
  const router = useRouter();
  const locale = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en';
    const currentPath = window.location.pathname.replace(`/${locale}`, '');
    router.push(currentPath || '/', { locale: newLocale });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/assets/logo.png" alt={t('logoAlt')} width={38} height={38} className="h-[38px] w-[38px] rounded-lg" />
          <div className="leading-tight w-max">
            <div className="text-sm font-medium tracking-[0.08em] text-[#0063AF]">{t('service')}</div>
            <div className="my-0.5 h-[2px] w-full bg-[#0063AF]" />
            <div className="text-sm font-bold uppercase tracking-wide text-[#0063AF]">{t('hospital')}</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-base">
          <Link href="/patients" className="nav-anim text-[#0063AF] hover:text-[#0063AF]">{t('patients')}</Link>
          <Link href="/services" className="nav-anim text-[#0063AF] hover:text-[#0063AF]">{t('care')}</Link>
          <Link href="/team" className="nav-anim text-[#0063AF] hover:text-[#0063AF]">{t('team')}</Link>
          <Link href="/news" className="nav-anim text-[#0063AF] hover:text-[#0063AF]">{t('news')}</Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-base text-[#0063AF] hover:bg-[#eef5fc]"
            title={locale === 'en' ? 'Passer en FR' : 'Switch to EN'}
          >
            {locale === 'fr' ? 'FR' : 'EN'} <span>▾</span>
          </button>
          <Link
            href="/donate"
            className="group rounded-full bg-[#F05A7A] px-4 py-2 text-sm font-medium text-white hover:bg-[#E44F70]"
          >
            <span className="inline-flex items-center gap-2">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 text-white transition-transform group-hover:animate-heartbeat"
                fill="currentColor"
              >
                <path d="M12 21s-6.716-4.21-9.193-7.476C.47 10.81 2.01 6.75 5.6 6.1c2.012-.36 3.814.57 4.9 2.13 1.086-1.56 2.888-2.49 4.9-2.13 3.59.65 5.13 4.71 2.793 7.424C18.716 16.79 12 21 12 21z"/>
              </svg>
              {t('donate')}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
