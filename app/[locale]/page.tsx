import { Hero } from './components/hero';
import { CentersGrid } from './components/centers-grid';
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
      <CentersGrid locale={locale} />
      <CentersSection locale={locale} />
      <PartnersSection locale={locale} />
      <ResearchSection locale={locale} />
      <NewsSection locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
