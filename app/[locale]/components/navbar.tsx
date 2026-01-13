'use client';

import { Link, useRouter, usePathname } from '@/app/i18n/navigation';
import { CtaButton } from '@/components/ui/cta-button';
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

  const palette: PaletteState = 'dark';
  const normalizedPath = pathname.replace(/^\/(en|fr)(?=\/|$)/, '') || '/';

  const getNavLinkClasses = (href: string) => {
    const baseClasses = `relative inline-block font-medium uppercase transform-gpu transition-colors transition-transform duration-150 hover:scale-105 ${
      palette === 'light' ? 'text-white/70 hover:text-white' : 'text-[#061024] hover:text-[#05112b]'
    }`;
    const isActive = normalizedPath === href || normalizedPath.startsWith(`${href}/`);

    if (!isActive) return baseClasses;

    const activeUnderlineBase = "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:rounded-full after:content-['']";
    const activeUnderlineColor = palette === 'light' ? 'after:bg-white' : 'after:bg-[#061024]';
    const activeTextColor = palette === 'light' ? 'text-white' : 'text-[#05112b]';

    return `${baseClasses} ${activeTextColor} ${activeUnderlineBase} ${activeUnderlineColor}`;
  };

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
        scrolled ? 'backdrop-blur-md bg-white/80 border-b border-[#061024]/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-28 items-center justify-between px-5">
        <Link href="/" className="flex flex-col items-start">
          <div className="relative" style={{ width: 260, height: 64 }}>
            <Image
              src="/assets/logo_miracl_blanc_V2.svg"
              alt={t('logoAlt')}
              width={260}
              height={64}
              priority
              className={`absolute inset-0 transition-opacity duration-300 ${
                palette === 'light' ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <Image
              src="/assets/logo_miracl_noir_V2.svg"
              alt=""
              aria-hidden
              width={260}
              height={64}
              priority
              className={`absolute inset-0 transition-opacity duration-300 ${
                palette === 'light' ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </div>
          <span className="-mt-3 ml-[88px] text-[9px] md:text-[10px] font-semibold text-[#00B4D8] uppercase tracking-[0.15em]">
            Une plateforme de l'AP-HP
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-base">
          <Link href="/team" className={getNavLinkClasses('/team')}>
            {t('menuTeam')}
          </Link>
          <Link href="/services" className={getNavLinkClasses('/services')}>
            {t('menuServices')}
          </Link>
          <div className={`ml-2 flex items-center rounded-full border ${localeWrapperBorder} px-1.5 py-1`}>
            <button
              onClick={() => switchLocale('fr')}
              className={`cursor-pointer px-3 py-1 text-xs font-medium rounded-full ${
                locale === 'fr' ? localeButtonActive : localeButtonInactive
              }`}
            >
              FR
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`cursor-pointer px-3 py-1 text-xs font-medium rounded-full ${
                locale === 'en' ? localeButtonActive : localeButtonInactive
              }`}
            >
              EN
            </button>
          </div>
          <CtaButton asChild className="ml-6 text-xs md:text-sm h-9 md:h-10">
            <Link href="/contact" className="uppercase">
              {t('ctaPrimary')}
            </Link>
          </CtaButton>
        </div>
      </div>
    </nav>
  );
}
