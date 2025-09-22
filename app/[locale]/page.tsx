import { Hero } from './components/hero';
import { PartnersMarquee } from './components/partners-marquee';

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
    </>
  );
}
