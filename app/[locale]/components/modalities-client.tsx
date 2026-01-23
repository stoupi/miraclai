'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const imagingModalities = [
  { src: '/assets/images_hero/mri.png', alt: 'IRM', labelKey: 'mri' },
  { src: '/assets/images_hero/ct.png', alt: 'Scanner', labelKey: 'ct' },
  { src: '/assets/images_hero/echo.png', alt: 'Échographie', labelKey: 'echo' },
  { src: '/assets/images_hero/angio.png', alt: 'Coronarographie', labelKey: 'angio' },
  { src: '/assets/images_hero/oct.png', alt: 'OCT/IVUS', labelKey: 'oct' },
  { src: '/assets/images_hero/ecg.jpg', alt: 'ECG', labelKey: 'ecg' },
  { src: '/assets/images_hero/nuclear.png', alt: 'Imagerie nucléaire', labelKey: 'nuclear' },
];

type Labels = {
  title: ReactNode;
  mri: string;
  ct: string;
  echo: string;
  angio: string;
  oct: string;
  ecg: string;
  nuclear: string;
};

export function ModalitiesClient({ labels }: { labels: Labels }) {
  return (
    <section className="relative w-full py-12 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-center text-2xl md:text-3xl lg:text-4xl font-medium text-[#061024] mb-10 md:mb-12"
          style={{ fontFamily: 'var(--font-calistoga), serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          {labels.title}
        </motion.h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto px-4">
          {imagingModalities.map((modality, index) => (
            <motion.div
              key={modality.labelKey}
              className="flex flex-col items-center group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut'
              }}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-white shadow-lg bg-[#061024] transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:border-[#00B4D8]">
                <Image
                  src={modality.src}
                  alt={modality.alt}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-3 px-2.5 py-1.5 rounded-full bg-[#00B4D8]/10 text-[10px] sm:text-xs md:text-sm font-semibold text-[#061024]/70 uppercase tracking-wide text-center">
                {labels[modality.labelKey as keyof Omit<Labels, 'title'>]}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
