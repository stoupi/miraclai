import { getTranslations } from 'next-intl/server';
import { PartnersMarquee } from '@/components/ui/partners-marquee';
import { getPartnerLogos } from '@/lib/services/partners';
import { CentersGridClient } from './centers-grid-client';

type TeamMember = {
  name: string;
  miraclRole: string;
  degree: 'MD, PhD' | 'MD' | 'PhD' | '';
  specialty: 'cardio' | 'radio' | 'other';
  isChefDeService?: boolean;
  photo?: string;
  photoScale?: number;
  photoOffsetX?: string;
  photoOffsetY?: string;
};

type Center = {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  href: string;
  members: TeamMember[];
  dominantSpecialty: 'cardio' | 'radio' | 'mixed';
  logoScale: 'small' | 'medium' | 'large';
};


const centersData: Center[] = [
  {
    id: 'lariboisiere',
    name: 'Hôpital Lariboisière',
    shortName: 'Lariboisière',
    logo: '/assets/logo_centres/logo_larib.png',
    href: '/lariboisiere',
    dominantSpecialty: 'mixed',
    logoScale: 'large',
    members: [
      { name: 'Dr Théo Pezel', miraclRole: 'roleScientificDirector', degree: 'MD, PhD', specialty: 'cardio', photo: '/assets/team/pezel.jpg' },
      { name: 'Pr Eric Vicaut', miraclRole: 'roleMethodologyLead', degree: 'MD, PhD', specialty: 'other', photo: '/assets/team/vicaut.jpg' },
      { name: 'Solenn Toupin', miraclRole: 'roleScientificCoordinator', degree: 'PhD', specialty: 'other', photo: '/assets/team/toupin.jpg', photoScale: 1.15, photoOffsetX: '30%', photoOffsetY: '-10%' },
      { name: 'Pr Valérie Bousson', miraclRole: '', degree: 'MD, PhD', specialty: 'radio', isChefDeService: true, photo: '/assets/team/bousson.jpg' },
    ],
  },
  {
    id: 'hegp',
    name: 'Hôpital Européen Georges-Pompidou',
    shortName: 'HEGP',
    logo: '/assets/logo_centres/logo_HEGP.png',
    href: '/hegp',
    dominantSpecialty: 'radio',
    logoScale: 'large',
    members: [
      { name: 'Pr Gilles Soulat', miraclRole: 'roleRadiologyLead', degree: 'MD, PhD', specialty: 'radio', photo: '/assets/team/soulat.jpg' },
      { name: 'Pr Elie Mousseaux', miraclRole: '', degree: 'MD, PhD', specialty: 'radio', photo: '/assets/team/mousseaux.jpg' },
      { name: 'Pr Jean-Sébastien Hulot', miraclRole: '', degree: 'MD, PhD', specialty: 'cardio', photo: '/assets/team/hulot.png' },
    ],
  },
  {
    id: 'amiens',
    name: 'CHU Amiens Picardie',
    shortName: 'CHU Amiens',
    logo: '/assets/logo_centres/logo_amiens.jpg',
    href: '/amiens',
    dominantSpecialty: 'mixed',
    logoScale: 'small',
    members: [
      { name: 'Pr Yohann Bohbot', miraclRole: '', degree: 'MD, PhD', specialty: 'cardio', photo: '/assets/team/bohbot.jpg' },
      { name: 'Dr Cédric Renard', miraclRole: '', degree: 'MD', specialty: 'radio', photo: '/assets/team/renard.jpg' },
    ],
  },
  {
    id: 'icps',
    name: 'Institut Cardiovasculaire Paris Sud',
    shortName: 'ICPS',
    logo: '/assets/logo_centres/logo_icps.png',
    href: '/icps',
    dominantSpecialty: 'mixed',
    logoScale: 'large',
    members: [
      { name: 'Pr Jérôme Garot', miraclRole: '', degree: 'MD, PhD', specialty: 'cardio', photo: '/assets/team/garot.jpeg' },
      { name: 'Dr Béatrice Daoud', miraclRole: '', degree: 'MD', specialty: 'radio', photo: '/assets/team/daoud.jpg' },
    ],
  },
  {
    id: 'lille',
    name: 'CHU Lille',
    shortName: 'CHU Lille',
    logo: '/assets/logo_centres/logo_lille.png',
    href: '/lille',
    dominantSpecialty: 'mixed',
    logoScale: 'small',
    members: [
      { name: 'Pr Augustin Coisne', miraclRole: '', degree: 'MD, PhD', specialty: 'cardio', photo: '/assets/team/coisne.jpg' },
      { name: 'Pr François Pontana', miraclRole: '', degree: 'MD, PhD', specialty: 'radio', isChefDeService: true, photo: '/assets/team/pontana.jpg' },
    ],
  },
  {
    id: 'nancy',
    name: 'CHRU Nancy',
    shortName: 'CHRU Nancy',
    logo: '/assets/logo_centres/logo_nancy.png',
    href: '/nancy',
    dominantSpecialty: 'cardio',
    logoScale: 'medium',
    members: [
      { name: 'Pr Olivier Huttin', miraclRole: '', degree: 'MD, PhD', specialty: 'cardio', photo: '/assets/team/huttin.jpg' },
      { name: 'Pr Christian De Chillou', miraclRole: '', degree: 'MD, PhD', specialty: 'cardio', photo: '/assets/team/chillou.jpg' },
      { name: 'Marine Beaumont', miraclRole: '', degree: 'PhD', specialty: 'other', photo: '/assets/team/beaumont.jpg' },
    ],
  },
  {
    id: 'rouen',
    name: 'CHU Rouen Normandie',
    shortName: 'CHU Rouen',
    logo: '/assets/logo_centres/logo_chu_rouen.png',
    href: '/rouen',
    dominantSpecialty: 'mixed',
    logoScale: 'small',
    members: [
      { name: 'Pr Jean-Nicolas Dacher', miraclRole: '', degree: 'MD, PhD', specialty: 'radio', isChefDeService: true, photo: '/assets/team/dacher.jpg' },
      { name: 'Dr Charles Fauvel', miraclRole: '', degree: 'MD, PhD', specialty: 'cardio', photo: '/assets/team/fauvel.jpg' },
    ],
  },
];

export async function CentersGrid({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'centersGrid' });
  const logos = await getPartnerLogos();

  return (
    <section id="centers-section" className="relative w-full py-16 md:py-24 bg-[#F5F7FA] scroll-mt-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="max-w-4xl mx-auto">
            <span
              className="block text-3xl md:text-4xl lg:text-5xl font-medium text-[#061024] leading-tight"
              style={{ fontFamily: 'var(--font-calistoga), serif' }}
            >
              {t('titleBig')}
            </span>
            <span className="block mt-2 font-medium">
              {t.rich('titleSmall', {
                highlight: (chunks) => (
                  <span
                    className="text-2xl md:text-3xl lg:text-4xl text-[#00B4D8]"
                    style={{ fontFamily: 'var(--font-dm-serif), serif', fontStyle: 'italic' }}
                  >
                    {chunks}
                  </span>
                ),
                small: (chunks) => (
                  <span
                    className="text-lg md:text-xl lg:text-2xl text-[#061024]/80"
                    style={{ fontFamily: 'var(--font-calistoga), serif' }}
                  >
                    {chunks}
                  </span>
                ),
                nowrap: (chunks) => (
                  <span className="whitespace-nowrap">{chunks}</span>
                )
              })}
            </span>
          </h2>
        </div>

      </div>
      <div className="w-full mb-12 md:mb-16">
        <PartnersMarquee
          logos={[...logos, ...logos, ...logos].map(logo => {
            if (logo.src.includes('larib')) return { ...logo, scale: 1.0 };
            if (logo.src.includes('HEGP')) return { ...logo, scale: 0.95 };
            if (logo.src.includes('icps')) return { ...logo, scale: 0.85 };
            return { ...logo, scale: 1 };
          })}
          className="py-2"
          trackClassName="gap-14 pr-14 !animate-[marquee_60s_linear_infinite]"
          itemClassName="h-10 md:h-12 opacity-100 grayscale-0 hover:scale-110"
        />
      </div>
      <div className="container mx-auto px-4">
        <CentersGridClient
          centers={centersData}
          discoverLabel={t('discover')}
          translations={{
            roleScientificDirector: t('roleScientificDirector'),
            roleMethodologyLead: t('roleMethodologyLead'),
            roleScientificCoordinator: t('roleScientificCoordinator'),
            roleRadiologyLead: t('roleRadiologyLead'),
            roleDepartmentHead: t('roleDepartmentHead'),
            specialtyCardio: t('specialtyCardio'),
            specialtyRadio: t('specialtyRadio'),
            specialtyEngineer: t('specialtyEngineer'),
          }}
        />
      </div>
    </section>
  );
}
