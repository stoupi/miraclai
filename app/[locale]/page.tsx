import { Hero } from './components/hero';
import { ModalitiesSection } from './components/modalities-section';
import { CentersGrid } from './components/centers-grid';
import { ServicesSection } from './components/services-section';
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
      <Footer locale={locale} />
    </>
  );
}
