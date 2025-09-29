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

export type LariboisiereLocationContent = {
  title: string;
  contactTitle: string;
  addressLabel: string;
  address: string;
  phoneLabel: string;
  phoneNumber: string;
  emergencyLabel: string;
  emergencyAvailability: string;
  mapTitle: string;
  mapDescription: string;
  mapHint: string;
  mapCtaLabel: string;
  mapCtaAria: string;
  mapCtaHref: string;
};

export type LariboisierePageContent = {
  hero: LariboisiereHeroContent;
  about: LariboisiereAboutContent;
  location: LariboisiereLocationContent;
};
