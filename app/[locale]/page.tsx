import { Hero } from './components/hero';
import { NewsSection } from './components/news-section';
import { PartnersMarquee } from './components/partners-marquee';
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
      <PartnersMarquee locale={locale} />
      <ResearchSection locale={locale} />
      <NewsSection locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
