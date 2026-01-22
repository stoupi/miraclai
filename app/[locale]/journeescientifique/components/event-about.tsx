import { Heart, Brain, Users, Target } from 'lucide-react';
import type { EventAboutContent, EventThemesContent } from '../types';

type EventAboutProps = {
  about: EventAboutContent;
  themes: EventThemesContent;
};

const iconMap = {
  heart: Heart,
  brain: Brain,
  users: Users,
  target: Target
};

export function EventAbout({ about, themes }: EventAboutProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F0F9FA]/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#061024] mb-6"
            style={{ fontFamily: 'var(--font-calistoga), serif' }}
          >
            {about.title}
          </h2>
          <p className="text-lg text-[#061024]/70 max-w-3xl mx-auto leading-relaxed">
            {about.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {about.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <div
                key={index}
                className="group relative p-6 bg-white rounded-2xl border border-[#061024]/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#00B4D8]/10 to-[#00B4D8]/20 border border-[#00B4D8]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-[#00B4D8]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#061024] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[#061024]/60 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-[#061024] to-[#0a1a3a] rounded-3xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B4D8]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00B4D8]/5 rounded-full blur-2xl" />
          <h3
            className="text-xl md:text-2xl font-bold text-white text-center mb-8 relative z-10"
            style={{ fontFamily: 'var(--font-calistoga), serif' }}
          >
            {themes.title}
          </h3>
          <div className="flex flex-wrap justify-center gap-3 relative z-10">
            {themes.themes.map((theme, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#00B4D8]/10 backdrop-blur-sm border border-[#00B4D8]/30 rounded-full text-white text-sm font-medium hover:bg-[#00B4D8]/20 transition-colors cursor-default"
              >
                {theme.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
