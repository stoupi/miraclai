import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/app/i18n/navigation';
import { ChevronRight } from 'lucide-react';

type TeamMember = {
  name: string;
  miraclRole: string;
  degree: 'MD, PhD' | 'PhD' | '';
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
      { name: 'Dr Théo Pezel', miraclRole: 'Directeur scientifique', degree: 'MD, PhD', specialty: 'cardio', photo: '/assets/team/pezel.jpg' },
      { name: 'Pr Eric Vicaut', miraclRole: 'Référent Méthodologie', degree: 'MD, PhD', specialty: 'other', photo: '/assets/team/vicaut.jpg' },
      { name: 'Solenn Toupin', miraclRole: 'Coordinatrice scientifique', degree: 'PhD', specialty: 'other', photo: '/assets/team/toupin.jpg', photoScale: 1.15, photoOffsetX: '30%', photoOffsetY: '-10%' },
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
      { name: 'Pr Gilles Soulat', miraclRole: 'Référent Radiologie', degree: 'MD, PhD', specialty: 'radio', photo: '/assets/team/soulat.jpg' },
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
      { name: 'Dr Yohann Bohbot', miraclRole: '', degree: 'MD, PhD', specialty: 'cardio', photo: '/assets/team/bohbot.jpg' },
      { name: 'Dr Cédric Renard', miraclRole: '', degree: 'MD, PhD', specialty: 'radio', photo: '/assets/team/renard.jpg' },
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
      { name: 'Dr Béatrice Daoud', miraclRole: '', degree: 'MD, PhD', specialty: 'radio', photo: '/assets/team/daoud.jpg' },
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
      { name: 'Marine Beaumont', miraclRole: 'Ingénieur de recherche', degree: 'PhD', specialty: 'other', photo: '/assets/team/beaumont.jpg' },
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

function formatNameWithUppercaseLastName(fullName: string): string {
  const parts = fullName.split(' ');
  if (parts.length < 2) return fullName;

  const lastName = parts[parts.length - 1].toUpperCase();
  const rest = parts.slice(0, -1).join(' ');
  return `${rest} ${lastName}`;
}

function MemberPlaceholder({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(' ')
    .filter((word) => word.length > 2)
    .map((word) => word[0])
    .join('');

  const gradientClass =
    member.specialty === 'cardio'
      ? 'from-[#00B4D8] to-[#0077B6]'
      : member.specialty === 'radio'
        ? 'from-[#E879A9] to-[#C44569]'
        : 'from-[#64748B] to-[#475569]';

  const baseSpecialtyLabel =
    member.specialty === 'cardio'
      ? 'Cardiologue'
      : member.specialty === 'radio'
        ? 'Radiologue'
        : '';

  const specialtyLabel = member.isChefDeService && baseSpecialtyLabel
    ? `${baseSpecialtyLabel}, Chef de Service`
    : baseSpecialtyLabel;

  const specialtyColorClass =
    member.specialty === 'cardio'
      ? 'text-[#00B4D8]'
      : member.specialty === 'radio'
        ? 'text-[#E879A9]'
        : 'text-[#64748B]';

  const formattedName = formatNameWithUppercaseLastName(member.name);

  return (
    <div className="flex flex-col items-center w-36 md:w-44 flex-shrink-0">
      {member.photo ? (
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-md ring-2 ring-white">
          <Image
            src={member.photo}
            alt={member.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
            style={{
              transform: member.photoScale ? `scale(${member.photoScale})` : undefined,
              objectPosition: (member.photoOffsetX || member.photoOffsetY) ? `${member.photoOffsetX || 'center'} ${member.photoOffsetY || 'center'}` : undefined,
            }}
          />
        </div>
      ) : (
        <div
          className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-md ring-2 ring-white`}
        >
          <span className="text-white font-bold text-base md:text-lg">{initials}</span>
        </div>
      )}
      <div className="text-center mt-3 w-full">
        <p className="text-[#061024] font-bold text-sm leading-tight whitespace-nowrap">
          {formattedName}
        </p>
        {member.degree && (
          <p className="text-[#061024]/80 text-xs leading-tight mt-0.5">{member.degree}</p>
        )}
        {member.miraclRole && (
          <p className="text-[#061024] font-bold text-sm leading-tight mt-1">{member.miraclRole}</p>
        )}
        {specialtyLabel && (
          <p className={`font-bold text-sm leading-tight mt-1 ${specialtyColorClass}`}>
            {specialtyLabel}
          </p>
        )}
      </div>
    </div>
  );
}

function CenterCard({ center, discoverLabel }: { center: Center; discoverLabel: string }) {
  const logoSizeClass =
    center.logoScale === 'large'
      ? 'max-h-16 md:max-h-20 max-w-full'
      : center.logoScale === 'medium'
        ? 'max-h-14 md:max-h-16 max-w-[85%]'
        : 'max-h-12 md:max-h-14 max-w-[75%]';

  return (
    <div
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 border-l-4 border-l-[#00B4D8] overflow-hidden"
    >
      <div className="flex items-center gap-5 p-5 md:p-6">
        <div className="flex-shrink-0 flex flex-col items-center gap-3">
          <div className="w-28 md:w-36 h-16 md:h-20 flex items-center justify-center">
            <Image
              src={center.logo}
              alt={center.name}
              width={144}
              height={80}
              className={`object-contain ${logoSizeClass} group-hover:scale-105 transition-transform duration-300`}
            />
          </div>
          <Link
            href={center.href}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-xs font-semibold bg-[#F33349] hover:bg-white hover:text-[#F33349] border-2 border-[#F33349] transition-all duration-200 shadow-sm hover:shadow-md group/btn"
          >
            {discoverLabel}
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div
          className="h-20 md:h-24 w-px flex-shrink-0 bg-[#00B4D8]/30"
        />

        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex items-start gap-4 md:gap-6">
            {center.members.map((member) => (
              <MemberPlaceholder key={member.name} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function CentersGrid({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'centersGrid' });

  return (
    <section className="relative w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="max-w-4xl mx-auto">
            <span
              className="block text-3xl md:text-4xl lg:text-5xl font-medium text-[#061024] leading-tight"
              style={{ fontFamily: 'var(--font-calistoga), serif' }}
            >
              {t('titleLine1')}
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl text-[#061024]/80 mt-2 font-medium">
              {t('titleLine2')}{' '}
              <span
                className="text-[#00B4D8]"
                style={{ fontFamily: 'var(--font-dm-serif), serif', fontStyle: 'italic' }}
              >
                {t('titleHighlight')}
              </span>
            </span>
          </h2>
          <p className="text-[#061024]/60 text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-3 md:gap-4 max-w-5xl mx-auto">
          {centersData.map((center) => (
            <CenterCard key={center.id} center={center} discoverLabel={t('discover')} />
          ))}
        </div>
      </div>
    </section>
  );
}
