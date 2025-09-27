import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import type { Member, PeopleSectionTone } from '../types';

type TeamPeopleSectionProps = {
  id: string;
  title: string;
  description: string;
  members: Member[];
  tone: PeopleSectionTone;
};

const toneStyles: Record<PeopleSectionTone, {
  section: string;
  card: string;
  badge: string;
  role: string;
  bio: string;
}> = {
  bright: {
    section: 'bg-white text-[#061024]',
    card: 'border-[#061024]/10 bg-white/80 shadow-[0_18px_40px_-16px_rgba(6,16,36,0.18)] backdrop-blur',
    badge: 'bg-[#061024] text-white',
    role: 'text-[#0A1B3F] font-semibold',
    bio: 'text-[#061024]/70'
  },
  muted: {
    section: 'bg-[#F4F6FC] text-[#061024]',
    card: 'border-[#061024]/10 bg-white shadow-[0_16px_35px_-20px_rgba(6,16,36,0.45)]',
    badge: 'bg-[#0A1B3F] text-white',
    role: 'text-[#0A1B3F] font-semibold',
    bio: 'text-[#061024]/70'
  }
};

export function TeamPeopleSection({ id, title, description, members, tone }: TeamPeopleSectionProps) {
  const styles = toneStyles[tone];

  return (
    <section id={id} className={cn('py-20', styles.section)}>
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
          <p className="mt-6 text-base text-[#061024]/70 sm:text-lg">{description}</p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {members.map((member) => (
            <Card key={member.key} className={cn('h-full border', styles.card)}>
              <CardContent className="flex h-full flex-col gap-6 px-6 py-8">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold uppercase',
                      styles.badge
                    )}
                    aria-hidden
                  >
                    {member.initials}
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-semibold text-[#061024]">{member.name}</p>
                    <p className={styles.role}>{member.role}</p>
                  </div>
                </div>
                <p className={cn('text-sm leading-relaxed', styles.bio)}>{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
