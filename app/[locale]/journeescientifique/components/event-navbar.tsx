'use client';

import { Link, useRouter, usePathname } from '@/app/i18n/navigation';
import { useMotionValueEvent, useScroll, motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

type LocaleOption = 'en' | 'fr';

export function EventNavbar() {
  const t = useTranslations('navigation');
  const tEvent = useTranslations('journeeScientifique');
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
      <div className="container mx-auto flex h-20 md:h-24 items-center justify-between px-3 md:px-5">
        <Link href="/" className="flex flex-col items-start cursor-pointer flex-shrink-0">
          <div className="relative w-[140px] h-[35px] md:w-[200px] md:h-[50px]">
            <Image
              src="/assets/logo_miracl_noir_V2.svg"
              alt={t('logoAlt')}
              fill
              priority
              className="object-contain object-left"
            />
          </div>
          <span className="-mt-2 ml-[48px] md:ml-[68px] text-[7px] md:text-[9px] font-semibold text-[#00B4D8] uppercase tracking-[0.15em]">
            {t('platformLabel')}
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/">
            <motion.div
              className="group flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-full bg-[#00B4D8] hover:bg-[#00a3c4] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
              <span className="text-[10px] md:text-xs font-semibold text-white">
                {tEvent('backToSite')}
              </span>
            </motion.div>
          </Link>

          <div className={`flex items-center rounded-full border ${localeWrapperBorder} px-1 md:px-1.5 py-0.5 md:py-1 flex-shrink-0`}>
            <button
              onClick={() => switchLocale('fr')}
              className={`cursor-pointer px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-medium rounded-full transition-colors ${
                locale === 'fr' ? localeButtonActive : localeButtonInactive
              }`}
            >
              FR
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`cursor-pointer px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-medium rounded-full transition-colors ${
                locale === 'en' ? localeButtonActive : localeButtonInactive
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
