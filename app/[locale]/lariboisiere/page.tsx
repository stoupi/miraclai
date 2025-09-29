import { getTranslations } from 'next-intl/server';

import { Footer } from '../components/footer';
import { LariboisiereHero } from './components/lariboisiere-hero';
import { LariboisiereInformation } from './components/lariboisiere-information';
import type { LariboisierePageContent } from './types';

type Params = {
  params: Promise<{ locale: string }>;
};

export default async function LariboisierePage({ params }: Params) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'lariboisierePage' });

  const paragraphs = t('about.description').split('\n\n').map((entry) => entry.trim()).filter(Boolean);
  const galleryPositions: Array<'center' | 'left center' | 'right center' | 'center bottom'> = [
    'center',
    'left center',
    'center bottom',
    'right center'
  ];
  const galleryKeys = ['facade', 'team', 'innovation', 'care'] as const;

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
    gallery: galleryKeys.map((key, index) => ({
      src: `/assets/lariboisiere/gallery-${index + 1}.jpg`,
      alt: t(`gallery.items.${key}`),
      objectPosition: galleryPositions[index]
    }))
  };

  return (
    <>
      <LariboisiereHero content={content.hero} />
      <LariboisiereInformation about={content.about} gallery={content.gallery} />
      <Footer locale={locale} />
    </>
  );
}
