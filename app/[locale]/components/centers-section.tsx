import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/app/i18n/navigation';
import { TeamCarousel } from './team-carousel';

type Center = {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  href: string;
};

const centers: Center[] = [
  { id: 'lariboisiere', name: 'Hôpital Lariboisière Fernand-Widal AP-HP', shortName: 'Lariboisière', logo: '/assets/logo_centres/logo_larib.png', href: '/lariboisiere' },
  { id: 'hegp', name: 'Hôpital Européen Georges-Pompidou AP-HP', shortName: 'HEGP', logo: '/assets/logo_centres/logo_HEGP.png', href: '/hegp' },
  { id: 'rouen', name: 'CHU Rouen Normandie', shortName: 'CHU Rouen', logo: '/assets/logo_centres/logo_chu_rouen.png', href: '/rouen' },
  { id: 'amiens', name: 'CHU Amiens Picardie', shortName: 'CHU Amiens', logo: '/assets/logo_centres/logo_amiens.jpg', href: '/amiens' },
  { id: 'nancy', name: 'CHRU Nancy', shortName: 'CHRU Nancy', logo: '/assets/logo_centres/logo_nancy.png', href: '/nancy' },
  { id: 'lille', name: 'CHU Lille', shortName: 'CHU Lille', logo: '/assets/logo_centres/logo_lille.png', href: '/lille' },
  { id: 'icps', name: 'Institut Cardiovasculaire Paris Sud', shortName: 'ICPS', logo: '/assets/logo_centres/logo_icps.png', href: '/icps' },
];

export async function CentersSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'centers' });

  return (
    <section className="relative w-full bg-gradient-to-b from-[#E8F6F7] to-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#061024] mb-4" style={{ fontFamily: 'var(--font-calistoga), serif' }}>
            {t('title')}
          </h2>
          <p className="max-w-2xl mx-auto text-[#061024]/70 text-base md:text-lg">
            {t('subtitle')}
          </p>
        </div>

        <TeamCarousel />

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
            {centers.map((center) => (
              <Link
                key={center.id}
                href={center.href}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/50 transition-colors duration-200"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <Image
                    src={center.logo}
                    alt={center.name}
                    width={80}
                    height={80}
                    className="object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <p className="text-xs text-center font-medium text-[#061024]/70 group-hover:text-[#00B4D8] transition-colors">
                  {center.shortName}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
