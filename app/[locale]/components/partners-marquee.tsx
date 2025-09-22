import fs from 'fs/promises';
import path from 'path';
import { getTranslations } from 'next-intl/server';

type LogoItem = { src: string; alt: string };

async function getLogos(): Promise<LogoItem[]> {
  const dir = path.join(process.cwd(), 'public', 'assets', 'logo_centres_noir');
  const entries = await fs.readdir(dir);
  const files = entries.filter((name) => /\.(svg|png|jpe?g)$/i.test(name));
  const items = files.map((name) => ({
    src: `/assets/logo_centres_noir/${encodeURIComponent(name)}`,
    alt: name.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, '')
  }));
  return items;
}

export async function PartnersMarquee({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const logos = await getLogos();
  const sequence = [...logos, ...logos];

  return (
    <section className="relative w-full bg-white/0 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-2xl sm:text-3xl md:text-4xl font-bold text-black">
          {t('partnersTitle')}
        </h2>
        <div className="relative w-full overflow-hidden">
          <div className="group relative flex w-full items-center">
            <div className="flex shrink-0 items-center gap-12 pr-12" style={{ animation: 'marquee 30s linear infinite' }}>
              {sequence.map((item, idx) => (
                <img
                  key={`a-${idx}-${item.src}`}
                  src={item.src}
                  alt={item.alt}
                  className="h-20 w-auto opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition md:h-24"
                  height={80}
                />
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-12 pr-12" style={{ animation: 'marquee 30s linear infinite', animationDelay: '-15s' }}>
              {sequence.map((item, idx) => (
                <img
                  key={`b-${idx}-${item.src}`}
                  src={item.src}
                  alt={item.alt}
                  className="h-20 w-auto opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition md:h-24"
                  height={80}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
