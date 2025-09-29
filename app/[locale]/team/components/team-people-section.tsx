import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Dribbble, Linkedin } from 'lucide-react';

import type { Member, PeopleSectionTone } from '../types';

type TeamPeopleSectionProps = {
  id: string;
  title: string;
  description: string;
  members: Member[];
  tone: PeopleSectionTone;
};

const sectionBackgrounds: Record<PeopleSectionTone, string> = {
  bright: 'bg-white text-[#061024]',
  muted: 'bg-[#F4F6FC] text-[#061024]'
};

const descriptionColors: Record<PeopleSectionTone, string> = {
  bright: 'text-[#061024]/70',
  muted: 'text-[#061024]/70'
};

export function TeamPeopleSection({ id, title, description, members, tone }: TeamPeopleSectionProps) {
  return (
    <section id={id} className={cn('py-20', sectionBackgrounds[tone])}>
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
          {description ? (
            <p className={cn('mt-6 text-base sm:text-lg', descriptionColors[tone])}>{description}</p>
          ) : null}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {members.map((member) => (
            <Card
              key={member.key}
              className="group flex h-full flex-col rounded-none border border-[#121A38] bg-[#050B1F] text-white transition-transform duration-200 hover:-translate-y-1 hover:border-[#F33349]"
            >
              <div className="relative aspect-[3/2] w-full bg-[#D9DCE8]">
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-semibold uppercase text-[#0A1B3F]">
                  {member.initials}
                </span>
              </div>
              <CardContent className="flex flex-1 flex-col items-center gap-2.5 px-5 py-5 text-center">
                <div className="space-y-1">
                  <p className="text-xl font-semibold text-white">{member.name}</p>
                  {(() => {
                    const roleLines = member.role.split('\n');
                    const locationLineRaw = roleLines.length > 1 ? roleLines.at(-1) ?? '' : '';
                    const locationLine = locationLineRaw.trim();
                    const responsibilityLines = (locationLine ? roleLines.slice(0, -1) : roleLines).filter(
                      (line) => line.trim().length > 0
                    );

                    return (
                      <div className="flex flex-col items-center gap-1 text-sm tracking-wide text-white/70">
                        {responsibilityLines.map((line, index) => (
                          <span key={`${member.key}-role-${index}`} className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                            {line.trim().toUpperCase()}
                          </span>
                        ))}
                        {locationLine ? (
                          <span className="text-sm font-medium normal-case text-white/70">
                            {locationLine}
                          </span>
                        ) : null}
                      </div>
                    );
                  })()}
                </div>
                {member.bio ? (
                  <p className="text-xs leading-relaxed text-white/80">{member.bio}</p>
                ) : null}
                <div className="mt-auto flex items-center gap-3 text-white/70">
                  <Linkedin aria-hidden className="h-4 w-4" />
                  <Dribbble aria-hidden className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
