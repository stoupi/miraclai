import type { ReactNode } from 'react';

export type EventHeroContent = {
  badge: ReactNode;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  locationSubtitle: string;
  locationDetail: string;
  maxParticipants: string;
  ctaRegister: string;
  ctaProgram: string;
};

export type EventCountdownContent = {
  title: string;
  daysLabel: string;
  hoursLabel: string;
  minutesLabel: string;
  secondsLabel: string;
  subtitle: ReactNode;
};

export type EventFeature = {
  icon: 'heart' | 'brain' | 'users' | 'target';
  title: string;
  description: string;
};

export type EventAboutContent = {
  title: string;
  description: string;
  features: EventFeature[];
};

export type EventTheme = {
  label: string;
};

export type EventThemesContent = {
  title: string;
  themes: EventTheme[];
};

export type ProgramSpeaker = {
  name: string;
  affiliation: string;
  topic?: string;
};

export type ProgramSession = {
  time: string;
  title: string;
  speakers?: ProgramSpeaker[];
  isBreak?: boolean;
  breakIcon?: 'coffee' | 'lunch';
  qaText?: string;
  description?: string;
};

export type ProgramBlock = {
  blockTitle: string;
  blockSubtitle?: string;
  sessions: ProgramSession[];
};

export type EventProgramContent = {
  title: string;
  date: string;
  blocks: ProgramBlock[];
};

export type EventRegistrationContent = {
  title: string;
  subtitle: string;
  maxParticipants: string;
  fields: {
    firstName: string;
    firstNamePlaceholder: string;
    lastName: string;
    lastNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    profession: string;
    professionPlaceholder: string;
    professionOptions: string[];
    institution: string;
    institutionPlaceholder: string;
  };
  submitButton: string;
  consent: string;
  successMessage: string;
  errorMessage: string;
};

export type EventPartnersContent = {
  title: string;
  partners: Array<{
    name: string;
    logo?: string;
  }>;
};

export type EventFooterContent = {
  organizerTitle: string;
  organizerName: string;
  partnersTitle: string;
  contactTitle: string;
  contactText: string;
};

export type JourneeScientifiquePageContent = {
  hero: EventHeroContent;
  countdown: EventCountdownContent;
  about: EventAboutContent;
  themes: EventThemesContent;
  program: EventProgramContent;
  registration: EventRegistrationContent;
};
