import { Clock, Coffee, UtensilsCrossed } from 'lucide-react';
import type { EventProgramContent, ProgramSession } from '../types';

type EventProgramProps = {
  content: EventProgramContent;
};

function SessionCard({ session, isLast }: { session: ProgramSession; isLast: boolean }) {
  if (session.isBreak) {
    const BreakIcon = session.breakIcon === 'lunch' ? UtensilsCrossed : Coffee;
    return (
      <div className="relative pl-8 pb-6">
        {!isLast && (
          <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-[#F33349]/30 to-transparent" />
        )}
        <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#F33349]/10 border border-[#F33349]/20 flex items-center justify-center">
          <BreakIcon className="w-3 h-3 text-[#F33349]" />
        </div>
        <div className="ml-4 py-3 px-4 bg-[#F33349]/5 rounded-xl border border-[#F33349]/10">
          <div className="flex items-center gap-3">
            <span className="text-[#F33349] font-semibold">{session.time}</span>
            <span className="text-[#061024]/70 font-medium">{session.title}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pl-8 pb-6">
      {!isLast && (
        <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-[#00B4D8]/30 to-transparent" />
      )}
      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#00B4D8] to-[#00B4D8]/80 flex items-center justify-center shadow-sm">
        <Clock className="w-3 h-3 text-white" />
      </div>
      <div className="ml-4 p-5 bg-white rounded-xl border border-[#061024]/10 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="text-[#00B4D8] font-bold text-lg">{session.time}</span>
        </div>
        <h4 className="text-[#061024] font-bold text-base mb-3">{session.title}</h4>
        {session.speakers && session.speakers.length > 0 && (
          <div className="space-y-2 border-l-2 border-[#00B4D8]/30 pl-3">
            {session.speakers.map((speaker, speakerIndex) => (
              <div key={speakerIndex} className="text-sm">
                <span className="font-semibold text-[#061024]">{speaker.name}</span>
                {speaker.affiliation && (
                  <span className="text-[#061024]/50 ml-1">({speaker.affiliation})</span>
                )}
                {speaker.topic && (
                  <p className="text-[#061024]/60 italic mt-0.5">{speaker.topic}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function EventProgram({ content }: EventProgramProps) {
  return (
    <section id="program-section" className="py-20 bg-[#F0F9FA]/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#061024] mb-4"
            style={{ fontFamily: 'var(--font-calistoga), serif' }}
          >
            {content.title}
          </h2>
          <p className="text-lg text-[#00B4D8] font-medium">{content.date}</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {content.blocks.map((block, blockIndex) => (
            <div key={blockIndex}>
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#061024] rounded-full text-white font-semibold text-sm shadow-lg">
                  {block.blockTitle}
                </div>
                {block.blockSubtitle && (
                  <h3
                    className="mt-4 text-xl md:text-2xl font-bold text-[#061024]"
                    style={{ fontFamily: 'var(--font-calistoga), serif' }}
                  >
                    {block.blockSubtitle}
                  </h3>
                )}
              </div>

              <div className="space-y-0">
                {block.sessions.map((session, sessionIndex) => (
                  <SessionCard
                    key={sessionIndex}
                    session={session}
                    isLast={sessionIndex === block.sessions.length - 1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
