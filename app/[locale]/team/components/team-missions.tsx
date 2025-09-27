import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { MissionItemWithIcon } from '../types';

type TeamMissionsProps = {
  id: string;
  title: string;
  description: string;
  items: MissionItemWithIcon[];
};

export function TeamMissions({ id, title, description, items }: TeamMissionsProps) {
  return (
    <section id={id} className="bg-[#0A0F2E] py-20 text-white">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            <span className="relative inline-block">
              <span>{title}</span>
              <span className="absolute left-1/2 top-full mt-3 h-1 w-16 -translate-x-1/2 rounded-full bg-[#F33349]" />
            </span>
          </h2>
          <p className="mt-6 text-base text-white/80 sm:text-lg">{description}</p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {items.map(({ key, title: itemTitle, description: itemDescription, iconLabel, Icon }) => (
            <Card
              key={key}
              className="h-full border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F33349] text-white">
                  <Icon aria-hidden className="h-6 w-6" />
                  <span className="sr-only">{iconLabel}</span>
                </div>
                <CardTitle className="text-xl font-semibold">{itemTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-white/80">{itemDescription}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
