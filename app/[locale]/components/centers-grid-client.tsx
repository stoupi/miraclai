'use client';

import Image from 'next/image';
import { Link } from '@/app/i18n/navigation';
import { ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

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

type Translations = {
  roleScientificDirector: string;
  roleMethodologyLead: string;
  roleScientificCoordinator: string;
  roleRadiologyLead: string;
  roleDepartmentHead: string;
  specialtyCardio: string;
  specialtyRadio: string;
  specialtyEngineer: string;
};

function formatNameWithUppercaseLastName(fullName: string): string {
  const parts = fullName.split(' ');
  if (parts.length < 2) return fullName;

  const lastName = parts[parts.length - 1].toUpperCase();
  const rest = parts.slice(0, -1).join(' ');
  return `${rest} ${lastName}`;
}

function MemberPlaceholder({ member, translations }: { member: TeamMember; translations: Translations }) {
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
      ? translations.specialtyCardio
      : member.specialty === 'radio'
        ? translations.specialtyRadio
        : member.specialty === 'other' && !member.miraclRole
          ? translations.specialtyEngineer
          : '';

  const translatedRole = member.miraclRole
    ? translations[member.miraclRole as keyof Translations] || member.miraclRole
    : '';

  const specialtyColorClass = 'text-[#061024]';

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
        {translatedRole && (
          <p className="text-[#00B4D8] font-bold text-sm leading-tight mt-1">{translatedRole}</p>
        )}
        {baseSpecialtyLabel && (
          <p className={`font-bold text-sm leading-tight mt-1 ${specialtyColorClass}`}>
            {baseSpecialtyLabel}
          </p>
        )}
        {member.isChefDeService && (
          <p className={`font-bold text-sm leading-tight mt-0.5 ${specialtyColorClass}`}>
            {translations.roleDepartmentHead}
          </p>
        )}
      </div>
    </div>
  );
}

function CenterCard({ center, discoverLabel, index, translations }: { center: Center; discoverLabel: string; index: number; translations: Translations }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateX(0)';
            }, index * 100);
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [index]);

  const logoSizeClass =
    center.logoScale === 'large'
      ? 'max-h-16 md:max-h-20 max-w-full'
      : center.logoScale === 'medium'
        ? 'max-h-14 md:max-h-16 max-w-[85%]'
        : 'max-h-12 md:max-h-14 max-w-[75%]';

  return (
    <div
      ref={cardRef}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 border-l-4 border-l-[#00B4D8] overflow-hidden"
      style={{
        opacity: 0,
        transform: 'translateX(-40px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
      }}
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

        <div className="h-20 md:h-24 w-px flex-shrink-0 bg-[#00B4D8]/30" />

        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex items-start gap-4 md:gap-6">
            {center.members.map((member) => (
              <MemberPlaceholder key={member.name} member={member} translations={translations} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CentersGridClient({ centers, discoverLabel, translations }: { centers: Center[]; discoverLabel: string; translations: Translations }) {
  return (
    <div className="grid gap-3 md:gap-4 max-w-5xl mx-auto">
      {centers.map((center, index) => (
        <CenterCard key={center.id} center={center} discoverLabel={discoverLabel} index={index} translations={translations} />
      ))}
    </div>
  );
}
