'use client';

import { Link, useRouter, usePathname } from '@/app/i18n/navigation';
import { Button } from '@/components/ui/button';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type PaletteState = 'light' | 'dark';

type LocaleOption = 'en' | 'fr';

export function Navbar() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [partnersVisible, setPartnersVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrolled(value > 4);
  });

  useEffect(() => {
    setScrolled(scrollY.get() > 4);

    const heroElement = document.getElementById('hero-section');
    const partnersElement = document.getElementById('partners-section');

    if (!heroElement) {
      setHeroVisible(false);
    }

    const heroObserver = heroElement
      ? new IntersectionObserver(
          ([entry]) => {
            setHeroVisible(entry.isIntersecting && entry.intersectionRatio >= 0.1);
          },
          { threshold: [0, 0.1, 0.25, 0.5, 1] }
        )
      : undefined;

    if (!partnersElement) {
      setPartnersVisible(false);
    }

    const partnersObserver = partnersElement
      ? new IntersectionObserver(
          ([entry]) => {
            setPartnersVisible(entry.isIntersecting && entry.intersectionRatio >= 0.25);
          },
          { threshold: [0, 0.25, 0.5, 1] }
        )
      : undefined;

    if (heroElement && heroObserver) heroObserver.observe(heroElement);
    if (partnersElement && partnersObserver) partnersObserver.observe(partnersElement);

    return () => {
      heroObserver?.disconnect();
      partnersObserver?.disconnect();
    };
  }, [scrollY]);

  const palette: PaletteState = heroVisible && !partnersVisible ? 'light' : 'dark';

  const navLinkClasses = `inline-block font-medium transition-colors transform-gpu transition-transform duration-150 hover:scale-105 ${
    palette === 'light' ? 'text-white/70 hover:text-white' : 'text-[#061024] hover:text-[#05112b]'
  }`;

  const contactButtonClasses =
    palette === 'light'
      ? 'cursor-pointer rounded-full bg-[#F33349] px-6 py-2.5 text-base font-semibold text-white border-2 border-[#F33349] transition-colors hover:bg-white hover:text-[#F33349] hover:border-white'
      : 'cursor-pointer rounded-full bg-white px-6 py-2.5 text-base font-semibold text-[#061024] border-2 border-white transition-colors hover:bg-[#061024] hover:text-white hover:border-[#061024]';

  const localeButtonActive = palette === 'light' ? 'bg-white text-[#061024]' : 'bg-[#061024] text-white';
  const localeButtonInactive =
    palette === 'light'
      ? 'text-white/70 hover:text-white hover:underline underline-offset-4 decoration-white/80'
      : 'text-[#061024]/70 hover:text-[#061024] hover:underline underline-offset-4 decoration-[#061024]/80';
  const localeWrapperBorder = palette === 'light' ? 'border-white/30' : 'border-[#061024]/30';

  const switchLocale = (next: LocaleOption) => {
    if (next !== locale) router.push(pathname, { locale: next });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-200 ${
        scrolled ? 'backdrop-blur-md bg-white/10 border-b border-white/15' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-24 items-center justify-between px-5">
        <Link href="/" className="flex items-center">
          <div className="relative" style={{ width: 220, height: 54 }}>
            <Image
              src="/assets/logo_miracl_blanc_V2.svg"
              alt={t('logoAlt')}
              width={220}
              height={54}
              priority
              className={`absolute inset-0 transition-opacity duration-300 ${
                palette === 'light' ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <Image
              src="/assets/logo_miracl_noir_V2.svg"
              alt=""
              aria-hidden
              width={220}
              height={54}
              priority
              className={`absolute inset-0 transition-opacity duration-300 ${
                palette === 'light' ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-lg">
          <Link href="/services" className={navLinkClasses}>
            {t('menuServices')}
          </Link>
          <Link href="/catalog" className={navLinkClasses}>
            {t('menuCatalog')}
          </Link>
          <Link href="/team" className={navLinkClasses}>
            {t('menuTeam')}
          </Link>
          <Link href="/news" className={navLinkClasses}>
            {t('menuNews')}
          </Link>
          <Link href="/contact" className="ml-2">
            <Button className={contactButtonClasses}>{t('ctaPrimary')}</Button>
          </Link>
          <div className={`ml-5 flex items-center rounded-full border ${localeWrapperBorder} p-1`}>
            <button
              onClick={() => switchLocale('fr')}
              className={`cursor-pointer px-3.5 py-1.5 text-sm font-medium rounded-full ${
                locale === 'fr' ? localeButtonActive : localeButtonInactive
              }`}
            >
              FR
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`cursor-pointer px-3.5 py-1.5 text-sm font-medium rounded-full ${
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
