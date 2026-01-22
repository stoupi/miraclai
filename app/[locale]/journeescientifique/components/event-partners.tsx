import Image from 'next/image';
import type { EventPartnersContent, EventFooterContent } from '../types';

type EventPartnersProps = {
  partners: EventPartnersContent;
  footer: EventFooterContent;
};

export function EventPartners({ partners, footer }: EventPartnersProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-[#F0F9FA]/30 to-white">
      <div className="container mx-auto px-4">
        <h3
          className="text-2xl font-bold text-[#061024] text-center mb-10"
          style={{ fontFamily: 'var(--font-calistoga), serif' }}
        >
          {partners.title}
        </h3>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-4xl mx-auto">
          {partners.partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <span className="text-lg font-semibold text-[#061024]/60">{partner.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-16 pt-12 border-t border-[#061024]/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center md:text-left">
            <div>
              <h4 className="font-bold text-[#061024] mb-3">{footer.organizerTitle}</h4>
              <p className="text-[#061024]/60 text-sm">{footer.organizerName}</p>
            </div>
            <div>
              <h4 className="font-bold text-[#061024] mb-3">{footer.partnersTitle}</h4>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {partners.partners.slice(0, 4).map((partner, index) => (
                  <span key={index} className="text-[#061024]/60 text-sm">
                    {partner.name}
                    {index < 3 && ' •'}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-[#061024] mb-3">{footer.contactTitle}</h4>
              <p className="text-[#061024]/60 text-sm">{footer.contactText}</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#061024]/5 text-center">
            <p className="text-sm text-[#061024]/50">
              © {new Date().getFullYear()} MIRACL.ai - Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
