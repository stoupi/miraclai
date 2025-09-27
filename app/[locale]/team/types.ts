import type { LucideIcon } from 'lucide-react';

export type HeroAction = {
  href: string;
  label: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  locale: string;
  partnersTitle: string;
  actions: HeroAction[];
};

export type MissionKey = 'ecosystem' | 'support' | 'collaborate' | 'inclusion';

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
