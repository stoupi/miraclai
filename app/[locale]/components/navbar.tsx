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
          <Link href="/services" className="inline-block font-medium text-white/70 transition-colors hover:text-white transform-gpu transition-transform duration-150 hover:scale-105">{t('menuServices')}</Link>
          <Link href="/catalog" className="inline-block font-medium text-white/70 transition-colors hover:text-white transform-gpu transition-transform duration-150 hover:scale-105">{t('menuCatalog')}</Link>
          <Link href="/team" className="inline-block font-medium text-white/70 transition-colors hover:text-white transform-gpu transition-transform duration-150 hover:scale-105">{t('menuTeam')}</Link>
          <Link href="/news" className="inline-block font-medium text-white/70 transition-colors hover:text-white transform-gpu transition-transform duration-150 hover:scale-105">{t('menuNews')}</Link>
          <Link href="/contact" className="ml-2">
            <Button className="cursor-pointer rounded-full bg-[#F33349] px-6 py-2.5 text-base font-semibold text-white border-2 border-[#F33349] transition-colors hover:bg-white hover:text-[#F33349] hover:border-white">
              {t('ctaPrimary')}
            </Button>
          </Link>
          <div className="ml-5 flex items-center rounded-full border border-white/30 p-1">
            <button
              onClick={() => switchLocale('fr')}
              className={`cursor-pointer px-3.5 py-1.5 text-sm font-medium ${locale === 'fr' ? 'bg-white text-[#061024] rounded-full' : 'text-white/70 hover:text-white hover:underline underline-offset-4 decoration-white/80'}`}
            >
              FR
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`cursor-pointer px-3.5 py-1.5 text-sm font-medium ${locale === 'en' ? 'bg-white text-[#061024] rounded-full' : 'text-white/70 hover:text-white hover:underline underline-offset-4 decoration-white/80'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
