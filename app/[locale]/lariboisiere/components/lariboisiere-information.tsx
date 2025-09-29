import { MapPin, Phone, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import type {
  LariboisiereAboutContent,
  LariboisiereLocationContent
} from '../types';

type LariboisiereInformationProps = {
  about: LariboisiereAboutContent;
  location: LariboisiereLocationContent;
};

const contactIconClass = 'text-primary';

export function LariboisiereInformation({ about, location }: LariboisiereInformationProps) {
  const contactItems = [
    {
      label: location.addressLabel,
      value: location.address,
      Icon: MapPin,
      href: undefined
    },
    {
      label: location.phoneLabel,
      value: location.phoneNumber,
      Icon: Phone,
      href: `tel:${location.phoneNumber.replace(/[^+\d]/g, '')}`
    },
    {
      label: location.emergencyLabel,
      value: location.emergencyAvailability,
      Icon: Clock,
      href: undefined
    }
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-8 md:order-1">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#061024] md:text-3xl">
                {location.title}
              </h2>
            </div>
            <Card className="border-[#E3E8EF]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#061024]">
                  {location.contactTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactItems.map(({ label, value, Icon, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <Icon aria-hidden className={`size-5 shrink-0 ${contactIconClass}`} />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#061024]/80">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="text-base font-medium text-[#061024] underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-base font-medium text-[#061024]">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-dashed border-[#CBD2D9] bg-slate-50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#061024]">
                  {location.mapTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <p className="text-base text-[#061024]/80">{location.mapDescription}</p>
                <div className="flex flex-col gap-3 rounded-xl bg-white/80 p-6 text-center text-sm text-[#061024]/70 shadow-inner">
                  <MapPin aria-hidden className="mx-auto size-6 text-primary" />
                  <p className="text-base font-semibold text-[#061024]">{location.mapHint}</p>
                </div>
                <Button asChild variant="outline">
                  <a
                    href={location.mapCtaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={location.mapCtaAria}
                  >
                    {location.mapCtaLabel}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6 md:order-2">
            <h2 className="text-2xl font-semibold text-[#061024] md:text-3xl">
              {about.title}
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-[#061024]/85 md:text-lg">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 20)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
