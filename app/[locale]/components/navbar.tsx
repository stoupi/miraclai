'use client';

import { Link } from '@/app/i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function Navbar() {
  const t = useTranslations('navigation');

  return (
    <nav className="absolute top-0 z-50 w-full bg-transparent">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image src="/assets/logo_miracl_blanc_V2.svg" alt={t('logoAlt')} width={160} height={40} priority />
        </Link>

        <div className="hidden md:flex items-center gap-10 text-base">
          <Link href="/why-now" className="text-slate-200 transition-colors hover:text-white">{t('whyNow')}</Link>
          <Link href="/solution" className="text-slate-200 transition-colors hover:text-white">{t('solution')}</Link>
          <Link href="/benefits" className="text-slate-200 transition-colors hover:text-white">{t('benefits')}</Link>
          <Link href="/team" className="text-slate-200 transition-colors hover:text-white">{t('ourTeam')}</Link>
          <Link href="/careers" className="text-slate-200 transition-colors hover:text-white">{t('careers')}</Link>
        </div>
      </div>
    </nav>
  );
}
