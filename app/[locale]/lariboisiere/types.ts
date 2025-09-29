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

export type LariboisierePageContent = {
  hero: LariboisiereHeroContent;
  about: LariboisiereAboutContent;
  gallery: LariboisiereGalleryItem[];
};
