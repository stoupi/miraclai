'use client';

import { Link } from '@/app/i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const t = useTranslations('navigation');

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
        </div>
      </div>
    </nav>
  );
}
