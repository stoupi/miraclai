import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { DataCircuitClient } from './data-circuit-client';

type ServiceItem = {
  titleKey: string;
  descKey: string;
};

const serviceItems: ServiceItem[] = [
  { titleKey: 'service1Title', descKey: 'service1Desc' },
  { titleKey: 'service2Title', descKey: 'service2Desc' },
  { titleKey: 'service3Title', descKey: 'service3Desc' },
  { titleKey: 'service4Title', descKey: 'service4Desc' },
  { titleKey: 'service5Title', descKey: 'service5Desc' },
];

export async function ServicesSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'servicesSection' });

  return (
    <section id="services-section" className="relative w-full py-16 md:py-24 bg-[#FAFBFC] scroll-mt-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left side - Content */}
          <div className="flex flex-col">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#061024] leading-tight"
              style={{ fontFamily: 'var(--font-calistoga), serif' }}
            >
              {t.rich('title', {
                highlight: (chunks) => (
                  <span>{chunks}</span>
                )
              })}
            </h2>
            <p className="mt-3">
              {t.rich('subtitle', {
                highlight: (chunks) => (
                  <span
                    className="text-xl md:text-2xl lg:text-3xl text-[#00B4D8]"
                    style={{ fontFamily: 'var(--font-dm-serif), serif', fontStyle: 'italic' }}
                  >
                    {chunks}
                  </span>
                ),
                br: () => <br />
              })}
            </p>

            <div className="w-full h-px bg-[#061024]/20 my-6" />

            <div className="space-y-3 text-[#061024]/80 text-sm md:text-base leading-relaxed">
              <p>
                {t.rich('intro1', {
                  bold: (chunks) => (
                    <span className="font-bold text-[#061024]">{chunks}</span>
                  )
                })}
              </p>
              <p>{t('intro2')}</p>
              <p className="font-medium text-[#061024]">{t('intro3')}</p>
            </div>

            <div className="mt-6 space-y-4">
              {serviceItems.map((item) => (
                <div key={item.titleKey} className="flex gap-2">
                  <span className="text-base flex-shrink-0">✅</span>
                  <div className="text-sm md:text-base leading-relaxed">
                    <p className="font-bold text-[#061024]">{t(item.titleKey)}</p>
                    <p className="text-[#061024]/80">{t(item.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image/Illustration */}
          <div className="hidden md:flex items-center justify-center lg:sticky lg:top-32">
            <div className="relative w-full max-w-md">
              <Image
                src="/assets/coeur_hero.svg"
                alt="Illustration MIRACL.ai"
                width={400}
                height={400}
                className="w-full h-auto drop-shadow-[0_8px_24px_rgba(0,180,216,0.15)]"
              />
            </div>
          </div>
        </div>

        {/* Data Circuit */}
        <div className="mt-16 md:mt-24">
          <DataCircuitClient />
        </div>
      </div>
    </section>
  );
}
