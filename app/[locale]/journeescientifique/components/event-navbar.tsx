'use client';

import { Link, useRouter, usePathname } from '@/app/i18n/navigation';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type LocaleOption = 'en' | 'fr';

export function EventNavbar() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrolled(value > 4);
  });

  useEffect(() => {
    setScrolled(scrollY.get() > 4);
  }, [scrollY]);

  const switchLocale = (next: LocaleOption) => {
    if (next !== locale) router.push(pathname, { locale: next });
  };

  const localeButtonActive = 'bg-[#061024] text-white';
  const localeButtonInactive =
    'text-[#061024]/70 hover:text-[#061024] hover:underline underline-offset-4 decoration-[#061024]/80';
  const localeWrapperBorder = 'border-[#061024]/30';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-200 ${
        scrolled ? 'backdrop-blur-md bg-white/80 border-b border-[#061024]/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-20 md:h-24 items-center justify-between px-5">
        <Link href="/" className="flex flex-col items-start">
          <div className="relative" style={{ width: 200, height: 50 }}>
            <Image
              src="/assets/logo_miracl_noir_V2.svg"
              alt={t('logoAlt')}
              width={200}
              height={50}
              priority
              className="absolute inset-0"
            />
          </div>
          <span className="-mt-2 ml-[68px] text-[8px] md:text-[9px] font-semibold text-[#00B4D8] uppercase tracking-[0.15em]">
            {t('platformLabel')}
          </span>
        </Link>

        <div className={`flex items-center rounded-full border ${localeWrapperBorder} px-1.5 py-1`}>
          <button
            onClick={() => switchLocale('fr')}
            className={`cursor-pointer px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              locale === 'fr' ? localeButtonActive : localeButtonInactive
            }`}
          >
            FR
          </button>
          <button
            onClick={() => switchLocale('en')}
            className={`cursor-pointer px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              locale === 'en' ? localeButtonActive : localeButtonInactive
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
}
