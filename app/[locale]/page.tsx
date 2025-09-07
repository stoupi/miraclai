import { Hero } from './components/hero';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <Hero locale={locale} />
  );
}
