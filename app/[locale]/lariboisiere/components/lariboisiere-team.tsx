import { Card, CardContent } from '@/components/ui/card';

import type { LariboisiereTeamContent } from '../types';

type LariboisiereTeamProps = {
  team: LariboisiereTeamContent;
};

export function LariboisiereTeam({ team }: LariboisiereTeamProps) {
  return (
    <section className="bg-[#050B1F] py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{team.title}</h2>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          {team.members.map((member) => {
            const roleLines = member.role
              .split('\n')
              .map((entry) => entry.trim())
              .filter((entry) => entry.length > 0);
            const locationLine = roleLines.length > 1 ? roleLines.at(-1) ?? '' : '';
            const responsibilityLines = locationLine ? roleLines.slice(0, -1) : roleLines;

            return (
              <Card
                key={member.name}
                className="group flex h-full flex-col rounded-none border border-[#121A38] bg-[#050B1F] text-white transition-transform duration-200 hover:-translate-y-1 hover:border-[#F33349]"
              >
                <div className="relative aspect-[3/2] w-full bg-[#D9DCE8]">
                  <span className="absolute inset-0 flex items-center justify-center text-4xl font-semibold uppercase text-[#0A1B3F]">
                    {member.avatarInitials}
                  </span>
                </div>
                <CardContent className="flex flex-1 flex-col items-center gap-3 px-5 py-5 text-center">
                  <div className="space-y-3">
                    <p className="text-xl font-semibold text-white">{member.name}</p>
                    <div className="flex flex-col items-center gap-1 text-sm tracking-wide text-white/70">
                      {responsibilityLines.map((line, index) => (
                        <span
                          key={`${member.name}-role-${index}`}
                          className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80"
                        >
                          {line.toUpperCase()}
                        </span>
                      ))}
                      {locationLine ? (
                        <span className="text-sm font-medium normal-case text-white/70">{locationLine}</span>
                      ) : null}
                    </div>
                  </div>
                  {member.description ? (
                    <p className="text-xs leading-relaxed text-white/80">{member.description}</p>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
