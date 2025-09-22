import fs from 'fs/promises';
import path from 'path';
import { getTranslations } from 'next-intl/server';

type LogoItem = { src: string; alt: string };

async function getLogos(): Promise<LogoItem[]> {
  const dir = path.join(process.cwd(), 'public', 'assets', 'logo_centres');
  const entries = await fs.readdir(dir);
  const files = entries.filter((name) => /\.(svg|png|jpe?g)$/i.test(name));
  const items = files.map((name) => ({
    src: `/assets/logo_centres/${encodeURIComponent(name)}`,
    alt: name.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, '')
  }));
  return items;
}

export async function PartnersMarquee({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const logos = await getLogos();
  const sequence = [...logos, ...logos];

  return (
    <section className="relative w-full bg-white/0 py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 md:mb-12 text-center text-2xl sm:text-3xl md:text-4xl font-bold text-black">
          {t('partnersTitle')}
        </h2>
        <div className="group relative w-full overflow-hidden">
          <div
            className="flex w-max flex-nowrap items-center gap-16 pr-16 animate-[marquee_20s_linear_infinite] group-hover:[animation-play-state:paused]"
            style={{ willChange: 'transform' }}
          >
            {sequence.map((item, idx) => (
              <img
                key={`${idx}-${item.src}`}
                src={item.src}
                alt={item.alt}
                className="h-12 w-auto shrink-0 opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition md:h-14"
                height={48}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
