import { Hero } from './components/hero';
import { ModalitiesSection } from './components/modalities-section';
import { CentersGrid } from './components/centers-grid';
import { ServicesSection } from './components/services-section';
import { ContactSection } from './components/contact-section';
import { Footer } from './components/footer';
import { FloatingLinkedinButton } from './components/floating-linkedin-button';

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
      <ContactSection locale={locale} />
      <Footer locale={locale} />
      <FloatingLinkedinButton />
    </>
  );
}
