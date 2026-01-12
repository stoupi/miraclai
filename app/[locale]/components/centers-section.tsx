import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/app/i18n/navigation';
import { Button } from '@/components/ui/button';

type CenterMember = {
  name: string;
  role: string;
  image: string;
};

type Center = {
  id: string;
  name: string;
  logo: string;
  href: string;
  members: CenterMember[];
};

const centers: Center[] = [
  {
    id: 'lariboisiere',
    name: 'Hôpital Lariboisière',
    logo: '/assets/logo_centres/logo_larib.png',
    href: '/lariboisiere',
    members: [
      { name: 'Dr Théo Pezel', role: 'Cardiologue', image: '/assets/team/pezel.jpg' },
      { name: 'Solenn Toupin', role: 'Coordinatrice', image: '/assets/team/toupin.jpg' },
      { name: 'Prof. Eric Vicaut', role: 'Méthodologie', image: '/assets/team/vicaut.jpg' },
    ],
  },
  {
    id: 'hegp',
    name: 'Hôpital Européen Georges-Pompidou',
    logo: '/assets/logo_centres/logo_HEGP.png',
    href: '/hegp',
    members: [
      { name: 'Prof. Gilles Soulat', role: 'Radiologue', image: '/assets/team/soulat.jpg' },
      { name: 'Dr Anne Leclerc', role: 'Cardiologue', image: '/assets/team/leclerc.jpg' },
    ],
  },
  {
    id: 'rouen',
    name: 'CHU de Rouen',
    logo: '/assets/logo_centres/logo_chu_rouen.png',
    href: '/rouen',
    members: [
      { name: 'Dr Martin Dupont', role: 'Cardiologue', image: '/assets/team/dupont.jpg' },
      { name: 'Dr Claire Bernard', role: 'Radiologue', image: '/assets/team/bernard.jpg' },
    ],
  },
  {
    id: 'nancy',
    name: 'CHU de Nancy',
    logo: '/assets/logo_centres/logo_nancy.png',
    href: '/nancy',
    members: [
      { name: 'Prof. Paul Roche', role: 'Imagerie', image: '/assets/team/roche.jpg' },
      { name: 'Dr Sophie Martin', role: 'Cardiologue', image: '/assets/team/martin.jpg' },
      { name: 'Dr Lucas Perrin', role: 'IA', image: '/assets/team/perrin.jpg' },
    ],
  },
  {
    id: 'amiens',
    name: 'CHU Amiens-Picardie',
    logo: '/assets/logo_centres/logo_amiens.jpg',
    href: '/amiens',
    members: [
      { name: 'Dr Hugo Lemaire', role: 'Cardiologue', image: '/assets/team/lemaire.jpg' },
      { name: 'Dr Emma Renard', role: 'Recherche', image: '/assets/team/renard.jpg' },
    ],
  },
  {
    id: 'icps',
    name: 'Institut Cardiovasculaire Paris Sud',
    logo: '/assets/logo_centres/logo_icps.png',
    href: '/icps',
    members: [
      { name: 'Dr Louis Bernard', role: 'Directeur', image: '/assets/team/lbernard.jpg' },
      { name: 'Dr Inès Morel', role: 'Coordination', image: '/assets/team/morel.jpg' },
      { name: 'Dr Cédric Lambert', role: 'Digital', image: '/assets/team/lambert.jpg' },
    ],
  },
  {
    id: 'roche',
    name: 'BF-Roche',
    logo: '/assets/logo_centres/BF-Roche.png',
    href: '/roche',
    members: [
      { name: 'Dr Amélie Girard', role: 'Data', image: '/assets/team/girard.jpg' },
      { name: 'Dr Antoine Lefèvre', role: 'Stratégie', image: '/assets/team/lefevre.jpg' },
    ],
  },
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

        <div className="space-y-6">
          {centers.map((center, index) => (
            <div
              key={center.id}
              className="group relative bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-[#061024]/5 hover:shadow-lg hover:border-[#00B4D8]/20 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center justify-center md:w-32 lg:w-40 flex-shrink-0">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-2xl bg-white p-3 flex items-center justify-center overflow-hidden shadow-sm border border-[#061024]/5 group-hover:shadow-md group-hover:border-[#00B4D8]/20 transition-all duration-300">
                    <Image
                      src={center.logo}
                      alt={center.name}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex-1 flex items-center gap-4 md:gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {center.members.map((member, memberIndex) => (
                    <div
                      key={member.name}
                      className="flex flex-col items-center flex-shrink-0 group/member animate-fade-in-up"
                      style={{ animationDelay: `${(index * 0.08) + (memberIndex * 0.1)}s` }}
                    >
                      <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-2xl overflow-hidden shadow-md border-2 border-white group-hover/member:shadow-xl group-hover/member:scale-105 group-hover/member:border-[#00B4D8] transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00B4D8] to-[#0063AF] flex items-center justify-center">
                          <span className="text-white font-bold text-2xl md:text-3xl">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-sm md:text-base font-semibold text-[#061024] truncate max-w-[100px] md:max-w-[120px] lg:max-w-[140px]">
                          {member.name}
                        </p>
                        <p className="text-xs md:text-sm text-[#061024]/50">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex-shrink-0 md:ml-4">
                  <Link href={center.href}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-[#061024]/20 text-[#061024] hover:bg-[#00B4D8] hover:text-white hover:border-[#00B4D8] transition-all duration-300 whitespace-nowrap"
                    >
                      {t('discoverButton')}
                      <svg className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
