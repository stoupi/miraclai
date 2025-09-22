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
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image src="/assets/logo_miracl_blanc_V2.svg" alt={t('logoAlt')} width={160} height={40} priority />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-base">
          <Link href="/services" className="text-slate-200 transition-colors hover:text-white">{t('menuServices')}</Link>
          <Link href="/catalog" className="text-slate-200 transition-colors hover:text-white">{t('menuCatalog')}</Link>
          <Link href="/team" className="text-slate-200 transition-colors hover:text-white">{t('menuTeam')}</Link>
          <Link href="/news" className="text-slate-200 transition-colors hover:text-white">{t('menuNews')}</Link>
          <Link href="/contact" className="ml-2">
            <Button className="rounded-full bg-[#F33349] px-5 py-2 text-sm font-medium text-white hover:opacity-95">
              {t('ctaPrimary')}
            </Button>
          </Link>
          <div className="ml-4 flex items-center rounded-full border border-white/30 p-0.5">
            <button
              onClick={() => switchLocale('fr')}
              className={`px-3 py-1 text-xs font-medium ${locale === 'fr' ? 'bg-white text-[#061024] rounded-full' : 'text-slate-200 hover:text-white'}`}
            >
              FR
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`px-3 py-1 text-xs font-medium ${locale === 'en' ? 'bg-white text-[#061024] rounded-full' : 'text-slate-200 hover:text-white'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
