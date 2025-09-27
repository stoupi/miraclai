import { getTranslations } from 'next-intl/server';
import { Handshake, Leaf, Rocket, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { TeamHero } from './components/team-hero';
import { TeamMissions } from './components/team-missions';
import { TeamPeopleSection } from './components/team-people-section';
import type {
  HeroContent,
  Member,
  MissionItem,
  MissionItemWithIcon,
  MissionKey
} from './types';
import { getPartnerLogos } from '@/lib/services/partners';

type Params = {
  params: Promise<{ locale: string }>;
};

const missionKeys: MissionKey[] = ['ecosystem', 'support', 'collaborate', 'inclusion'];

const missionIconMap: Record<MissionKey, LucideIcon> = {
  ecosystem: Users,
  support: Rocket,
  collaborate: Handshake,
  inclusion: Leaf
};

const teamMemberKeys = ['patrickHenry', 'claireDubois', 'alexandreMoreau'] as const;
const boardMemberKeys = ['sophieMartin', 'drissBenali', 'heleneGomez'] as const;

function buildInitials(name: string): string {
  const initials = name
    .split(' ')
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0)
    .slice(0, 2)
    .map((segment) => segment[0]?.toUpperCase() ?? '')
    .join('');

  return initials || name.slice(0, 2).toUpperCase();
}

export default async function TeamPage({ params }: Params) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'teamPage' });
  const partnerLogos = await getPartnerLogos();

  const hero: HeroContent = {
    eyebrow: t('hero.eyebrow'),
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    locale,
    partnersTitle: t('partnersTitle'),
    partnersInstructions: t('partnersInstructions'),
    actions: [
      { href: '/team#missions', label: t('hero.actions.missions') },
      { href: '/team#team', label: t('hero.actions.team') },
      { href: '/team#board', label: t('hero.actions.board') }
    ]
  };

  const missions: MissionItem[] = missionKeys.map((key) => ({
    key,
    title: t(`missions.items.${key}.title`),
    description: t(`missions.items.${key}.description`),
    iconLabel: t(`missions.items.${key}.iconAlt`)
  }));

  const missionItemsWithIcons: MissionItemWithIcon[] = missions.map((item) => ({
    ...item,
    Icon: missionIconMap[item.key]
  }));

  const teamMembers: Member[] = teamMemberKeys.map((key) => {
    const name = t(`team.members.${key}.name`);

    return {
      key,
      name,
      role: t(`team.members.${key}.role`),
      bio: t(`team.members.${key}.bio`),
      initials: buildInitials(name)
    };
  });

  const boardMembers: Member[] = boardMemberKeys.map((key) => {
    const name = t(`board.members.${key}.name`);

    return {
      key,
      name,
      role: t(`board.members.${key}.role`),
      bio: t(`board.members.${key}.bio`),
      initials: buildInitials(name)
    };
  });

  return (
    <>
      <TeamHero content={hero} logos={partnerLogos} />
      <TeamMissions
        id="missions"
        title={t('missions.title')}
        description={t('missions.description')}
        items={missionItemsWithIcons}
      />
      <TeamPeopleSection
        id="team"
        title={t('team.title')}
        description={t('team.description')}
        members={teamMembers}
        tone="bright"
      />
      <TeamPeopleSection
        id="board"
        title={t('board.title')}
        description={t('board.description')}
        members={boardMembers}
        tone="muted"
      />
    </>
  );
}
