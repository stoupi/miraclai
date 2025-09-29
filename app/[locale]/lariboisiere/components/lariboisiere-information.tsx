import Image from 'next/image';

import {
  LariboisiereAboutContent,
  LariboisiereGalleryItem
} from '../types';

type LariboisiereInformationProps = {
  about: LariboisiereAboutContent;
  gallery: LariboisiereGalleryItem[];
};

export function LariboisiereInformation({ about, gallery }: LariboisiereInformationProps) {
  const tileOffsets = ['md:-translate-y-6', 'md:translate-y-4', 'md:-translate-y-2', 'md:translate-y-8'];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-6 md:order-1 md:col-start-1">
            <h2 className="text-2xl font-semibold text-[#061024] md:text-3xl">
              {about.title}
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-[#061024]/85 md:text-lg">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 20)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="space-y-8 md:order-2 md:col-start-2">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {gallery.map((image, index) => {
                const offsetClass = tileOffsets[index] ?? '';

                return (
                  <div
                    key={`${image.src}-${index}`}
                    className={`relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5 transition-transform ${offsetClass}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1280px) 280px, (min-width: 768px) 220px, 45vw"
                      className="object-cover"
                      style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                      priority={index === 0}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
