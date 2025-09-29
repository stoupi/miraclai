import { getTranslations } from 'next-intl/server';

import { Footer } from '../components/footer';
import { LariboisiereHero } from './components/lariboisiere-hero';
import { LariboisiereInformation } from './components/lariboisiere-information';
import type { LariboisierePageContent } from './types';

type Params = {
  params: Promise<{ locale: string }>;
};

const mapUrl =
  'https://www.google.com/maps/search/?api=1&query=H%C3%B4pital+Lariboisi%C3%A8re+2+Rue+Ambroise+Par%C3%A9+75010+Paris';

export default async function LariboisierePage({ params }: Params) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'lariboisierePage' });

  const paragraphs = t('about.description').split('\n\n').map((entry) => entry.trim()).filter(Boolean);

  const content: LariboisierePageContent = {
    hero: {
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      description: t('hero.description'),
      imageSrc: '/assets/lariboisiere/hero.jpg',
      imageAlt: t('hero.imageAlt')
    },
    about: {
      title: t('about.title'),
      paragraphs
    },
    location: {
      title: t('location.title'),
      contactTitle: t('location.contactTitle'),
      addressLabel: t('location.addressLabel'),
      address: t('location.address'),
      phoneLabel: t('location.phoneLabel'),
      phoneNumber: t('location.phoneNumber'),
      emergencyLabel: t('location.emergencyLabel'),
      emergencyAvailability: t('location.emergencyAvailability'),
      mapTitle: t('location.mapTitle'),
      mapDescription: t('location.mapDescription'),
      mapHint: t('location.mapHint'),
      mapCtaLabel: t('location.mapCtaLabel'),
      mapCtaAria: t('location.mapCtaAria'),
      mapCtaHref: mapUrl
    }
  };

  return (
    <>
      <LariboisiereHero content={content.hero} />
      <LariboisiereInformation about={content.about} location={content.location} />
      <Footer locale={locale} />
    </>
  );
}
