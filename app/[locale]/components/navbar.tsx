'use client';

import { Link, useRouter, usePathname } from '@/app/i18n/navigation';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: 'en' | 'fr') => {
    if (next !== locale) router.push(pathname, { locale: next });
  };

  return (
    <nav className="absolute top-0 z-50 w-full bg-transparent">
      <div className="container mx-auto flex h-24 items-center justify-between px-5">
        <Link href="/" className="flex items-center">
          <Image src="/assets/logo_miracl_blanc_V2.svg" alt={t('logoAlt')} width={220} height={54} priority />
        </Link>

        <div className="hidden md:flex items-center gap-10 text-lg">
          <Link href="/services" className="text-slate-200 transition-colors hover:text-white">{t('menuServices')}</Link>
          <Link href="/catalog" className="text-slate-200 transition-colors hover:text-white">{t('menuCatalog')}</Link>
          <Link href="/team" className="text-slate-200 transition-colors hover:text-white">{t('menuTeam')}</Link>
          <Link href="/news" className="text-slate-200 transition-colors hover:text-white">{t('menuNews')}</Link>
          <Link href="/contact" className="ml-2">
            <Button className="rounded-full bg-[#F33349] px-6 py-2.5 text-base font-semibold text-white hover:opacity-95">
              {t('ctaPrimary')}
            </Button>
          </Link>
          <div className="ml-5 flex items-center rounded-full border border-white/30 p-1">
            <button
              onClick={() => switchLocale('fr')}
              className={`px-3.5 py-1.5 text-sm font-medium ${locale === 'fr' ? 'bg-white text-[#061024] rounded-full' : 'text-slate-200 hover:text-white'}`}
            >
              FR
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`px-3.5 py-1.5 text-sm font-medium ${locale === 'en' ? 'bg-white text-[#061024] rounded-full' : 'text-slate-200 hover:text-white'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
