import { Hero } from './components/hero';
import { ModalitiesSection } from './components/modalities-section';
import { CentersGrid } from './components/centers-grid';
import { ServicesSection } from './components/services-section';
import { DataCircuitSection } from './components/data-circuit';
import { CentersSection } from './components/centers-section';
import { NewsSection } from './components/news-section';
import { PartnersSection } from './components/partners-section';
import { ResearchSection } from './components/research-section';
import { Footer } from './components/footer';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale} />
      <ModalitiesSection locale={locale} />
      <CentersGrid locale={locale} />
      <ServicesSection locale={locale} />
      <DataCircuitSection locale={locale} />
      <CentersSection locale={locale} />
      <PartnersSection locale={locale} />
      <ResearchSection locale={locale} />
      <NewsSection locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
