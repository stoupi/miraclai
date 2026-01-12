export type LariboisiereHeroContent = {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type LariboisiereAboutContent = {
  title: string;
  paragraphs: string[];
};

export type LariboisiereGalleryItem = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export type LariboisiereTeamMember = {
  name: string;
  role: string;
  description: string;
  avatarInitials: string;
};

export type LariboisiereTeamContent = {
  title: string;
  members: LariboisiereTeamMember[];
};

export type LariboisierePageContent = {
  hero: LariboisiereHeroContent;
  about: LariboisiereAboutContent;
  gallery: LariboisiereGalleryItem[];
  team: LariboisiereTeamContent;
};
