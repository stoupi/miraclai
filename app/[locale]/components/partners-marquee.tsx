import fs from 'fs/promises';
import path from 'path';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/app/i18n/navigation';
import { Button } from '@/components/ui/button';

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
    <section className="relative w-full bg-white/0 py-32">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 md:mb-16 text-center text-2xl sm:text-3xl md:text-4xl font-bold text-black">
          {t('partnersTitle')}
        </h2>
        <div className="group relative w-full overflow-hidden py-4 md:py-6">
          <div
            className="flex w-max flex-nowrap items-center gap-16 pr-16 animate-[marquee_20s_linear_infinite] group-hover:[animation-play-state:paused]"
            style={{ willChange: 'transform' }}
          >
            {sequence.map((item, idx) => (
              <img
                key={`${idx}-${item.src}`}
                src={item.src}
                alt={item.alt}
                className="h-14 w-auto shrink-0 opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition md:h-16"
                height={56}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-16 md:mt-20 flex justify-center">
        <Link href="/team">
          <Button size="lg" className="cursor-pointer rounded-full bg-[#F33349] px-7 py-2.5 text-base md:text-lg font-semibold text-white border-2 border-[#F33349] transition-colors hover:bg-[#64C0C9] hover:text-[#061024] hover:border-[#64C0C9]">
            {t('partnersCtaTeam')}
          </Button>
        </Link>
      </div>
    </section>
  );
}
