import type { LucideIcon } from 'lucide-react';

export type HeroAction = {
  href: string;
  label: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  introLead: string;
  locale: string;
  partnersTitle: string;
  partnersInstructions: string;
  actions: HeroAction[];
};

export type MissionKey = 'platform' | 'analysis' | 'projects' | 'community';

export type MissionItem = {
  key: MissionKey;
  title: string;
  description: string;
  iconLabel: string;
};

export type MissionItemWithIcon = MissionItem & {
  Icon: LucideIcon;
};

export type Member = {
  key: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export type PeopleSectionTone = 'bright' | 'muted';
