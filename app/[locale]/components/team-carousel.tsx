'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type TeamMember = {
  name: string;
  role: string;
  specialty: 'cardio' | 'radio' | 'other';
  center: string;
  centerLogo: string;
};

const allMembers: TeamMember[] = [
  { name: 'Dr Théo Pezel', role: 'Directeur scientifique', specialty: 'cardio', center: 'Lariboisière', centerLogo: '/assets/logo_centres/logo_larib.png' },
  { name: 'Pr Gilles Soulat', role: 'Référent Radiologie', specialty: 'radio', center: 'HEGP', centerLogo: '/assets/logo_centres/logo_HEGP.png' },
  { name: 'Pr Eric Vicaut', role: 'Référent Méthodologie', specialty: 'other', center: 'Lariboisière', centerLogo: '/assets/logo_centres/logo_larib.png' },
  { name: 'Solenn Toupin', role: 'Coordinatrice scientifique', specialty: 'other', center: 'Lariboisière', centerLogo: '/assets/logo_centres/logo_larib.png' },
  { name: 'Pr Valérie Bousson', role: 'Radiologue', specialty: 'radio', center: 'Lariboisière', centerLogo: '/assets/logo_centres/logo_larib.png' },
  { name: 'Pr Jean-Sébastien Hulot', role: 'Cardiologue', specialty: 'cardio', center: 'HEGP', centerLogo: '/assets/logo_centres/logo_HEGP.png' },
  { name: 'Pr Elie Mousseaux', role: 'Radiologue', specialty: 'radio', center: 'HEGP', centerLogo: '/assets/logo_centres/logo_HEGP.png' },
  { name: 'Dr Charles Fauvel', role: 'Cardiologue', specialty: 'cardio', center: 'CHU Rouen', centerLogo: '/assets/logo_centres/logo_chu_rouen.png' },
  { name: 'Pr Jean-Nicolas Dacher', role: 'Radiologue', specialty: 'radio', center: 'CHU Rouen', centerLogo: '/assets/logo_centres/logo_chu_rouen.png' },
  { name: 'Dr Yohann Bohbot', role: 'Cardiologue', specialty: 'cardio', center: 'CHU Amiens', centerLogo: '/assets/logo_centres/logo_amiens.jpg' },
  { name: 'Dr Cédric Renard', role: 'Radiologue', specialty: 'radio', center: 'CHU Amiens', centerLogo: '/assets/logo_centres/logo_amiens.jpg' },
  { name: 'Pr Olivier Huttin', role: 'Cardiologue', specialty: 'cardio', center: 'CHRU Nancy', centerLogo: '/assets/logo_centres/logo_nancy.png' },
  { name: 'Pr Christian De Chillou', role: 'Cardiologue', specialty: 'cardio', center: 'CHRU Nancy', centerLogo: '/assets/logo_centres/logo_nancy.png' },
  { name: 'Marine Beaumont', role: 'Cardiologue', specialty: 'cardio', center: 'CHRU Nancy', centerLogo: '/assets/logo_centres/logo_nancy.png' },
  { name: 'Pr Augustin Coisne', role: 'Cardiologue', specialty: 'cardio', center: 'CHU Lille', centerLogo: '/assets/logo_centres/logo_lille.png' },
  { name: 'Pr François Pontana', role: 'Radiologue', specialty: 'radio', center: 'CHU Lille', centerLogo: '/assets/logo_centres/logo_lille.png' },
  { name: 'Pr Jérôme Garot', role: 'Cardiologue', specialty: 'cardio', center: 'ICPS', centerLogo: '/assets/logo_centres/logo_icps.png' },
  { name: 'Dr Béatrice Daoud', role: 'Radiologue', specialty: 'radio', center: 'ICPS', centerLogo: '/assets/logo_centres/logo_icps.png' },
];

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="group relative w-44 aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex-shrink-0">
      <div className={`absolute inset-0 flex items-center justify-center ${
        member.specialty === 'cardio'
          ? 'bg-gradient-to-br from-[#00B4D8] to-[#0077B6]'
          : member.specialty === 'radio'
          ? 'bg-gradient-to-br from-[#E879A9] to-[#C44569]'
          : 'bg-gradient-to-br from-[#6B7280] to-[#374151]'
      }`}>
        <span className="text-white font-bold text-2xl sm:text-3xl opacity-30">
          {member.name.split(' ').filter(n => n.length > 2).map(n => n[0]).join('')}
        </span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white font-semibold text-sm leading-tight">{member.name}</p>
        <p className="text-white/80 text-xs mt-0.5">{member.role}</p>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-5 h-5 bg-white rounded-full p-0.5 flex items-center justify-center">
            <Image
              src={member.centerLogo}
              alt={member.center}
              width={16}
              height={16}
              className="object-contain"
            />
          </div>
          <span className="text-white/70 text-[10px]">{member.center}</span>
        </div>
      </div>
    </div>
  );
}

export function TeamCarousel() {
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 200; // 176px card + 24px gap
  const SPEED = 50;
  const TOTAL_CARDS = 18;

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPaused) {
        setOffset(prev => prev + (SPEED * delta / 1000));
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const shift = Math.floor(offset / CARD_WIDTH);
  const subOffset = offset % CARD_WIDTH;

  const getRow1Cards = () => {
    const cards: TeamMember[] = [];
    for (let i = -2; i < 12; i++) {
      const index = ((shift + i) % TOTAL_CARDS + TOTAL_CARDS) % TOTAL_CARDS;
      cards.push(allMembers[index]);
    }
    return cards;
  };

  const getRow2Cards = () => {
    const cards: TeamMember[] = [];
    for (let i = -2; i < 12; i++) {
      const index = ((shift + 17 - i) % TOTAL_CARDS + TOTAL_CARDS) % TOTAL_CARDS;
      cards.push(allMembers[index]);
    }
    return cards;
  };

  const row1Cards = getRow1Cards();
  const row2Cards = getRow2Cards();

  return (
    <div
      ref={containerRef}
      className="w-screen relative left-1/2 right-1/2 -mx-[50vw] space-y-4 md:space-y-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex gap-6"
          style={{
            transform: `translateX(${-subOffset - CARD_WIDTH * 2}px)`,
            width: 'max-content'
          }}
        >
          {row1Cards.map((member, index) => (
            <MemberCard key={`row1-${index}-${member.name}-${shift}`} member={member} />
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-6"
          style={{
            transform: `translateX(${subOffset - CARD_WIDTH * 3}px)`,
            width: 'max-content'
          }}
        >
          {row2Cards.map((member, index) => (
            <MemberCard key={`row2-${index}-${member.name}-${shift}`} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
