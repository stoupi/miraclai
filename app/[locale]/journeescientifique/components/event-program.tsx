import { Clock, Coffee, UtensilsCrossed, User, MessageCircle, Gift } from 'lucide-react';
import Image from 'next/image';
import type { EventProgramContent, ProgramSession } from '../types';

type EventProgramProps = {
  content: EventProgramContent;
};

type SpeakerPhotoConfig = {
  src: string;
  scale?: number;
  offsetX?: string;
  offsetY?: string;
};

const speakerPhotos: Record<string, SpeakerPhotoConfig> = {
  'Gilles Soulat': { src: '/assets/team/soulat.jpg' },
  'Théo Pezel': { src: '/assets/team/pezel.jpg' },
  'Solenn Toupin': { src: '/assets/team/toupin.jpg', scale: 1.15, offsetX: '30%', offsetY: '-10%' },
  'Marine Beaumont': { src: '/assets/team/beaumont.jpg' },
  'Éric Vicaut': { src: '/assets/team/vicaut.jpg' },
  'Gabriel Steg': { src: '/steg.jpeg' },
  'Milan Lazarevic': { src: '/lazerevic.jpeg' },
  'Quentin Demanet': { src: '/demanet.jpeg' },
  'François Pontana': { src: '/assets/team/pontana.jpg' },
  'Jérôme Garot': { src: '/assets/team/garot.jpeg' },
  'Yohann Bohbot': { src: '/assets/team/bohbot.jpg' },
  'Augustin Coisne': { src: '/assets/team/coisne.jpg' },
  'Olivier Huttin': { src: '/assets/team/huttin.jpg' },
  'Fabien Hyafil': { src: '/assets/team/hyafil.jpeg' },
  'Christian de Chillou': { src: '/assets/team/chillou.jpg' },
  'Jean-Nicolas Dacher': { src: '/assets/team/dacher.jpg' },
  'Allyre Lohier': { src: '/lohier.jpeg' },
  'Charles Fauvel': { src: '/assets/team/fauvel.jpg' },
  'Jean-Sebastien Hulot': { src: '/assets/team/hulot.png' },
  'Karim Wahbi': { src: '/whabi.jpeg' },
  'Mathieu Kerneis': { src: '/kerneis.png' },
  'Léa Cymes': { src: '/cymes.jpeg', offsetY: '40%' },
  'Jeremy Florence': { src: '/florence.jpeg' },
  'Alexandre Unger': { src: '/a-unger.jpg' },
  'Julien Hudelo': { src: '/hudelo.jpeg' },
  'Jean-Guillaume Dillinger': { src: '/dillinger.jpeg' },
  'Sofiane Sifaoui': { src: '/sifaoui.jpeg' },
};

function getSpeakerPhoto(fullName: string): SpeakerPhotoConfig | null {
  for (const [name, config] of Object.entries(speakerPhotos)) {
    if (fullName.includes(name)) {
      return config;
    }
  }
  return null;
}

function extractSpeakers(speakerString: string): string[] {
  return speakerString
    .split(/[,&]/)
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
}

function SpeakerAvatar({ name }: { name: string }) {
  const photoConfig = getSpeakerPhoto(name);

  if (photoConfig) {
    const imageStyle: React.CSSProperties = {
      objectFit: 'cover',
      transform: photoConfig.scale ? `scale(${photoConfig.scale})` : undefined,
      objectPosition: photoConfig.offsetX || photoConfig.offsetY
        ? `${photoConfig.offsetX || '50%'} ${photoConfig.offsetY || '50%'}`
        : undefined,
    };

    return (
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
        <Image
          src={photoConfig.src}
          alt={name}
          width={56}
          height={56}
          className="w-full h-full"
          style={imageStyle}
        />
      </div>
    );
  }

  return (
    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#061024] to-[#0a1a3a] border-2 border-white shadow-md flex items-center justify-center flex-shrink-0">
      <User className="w-6 h-6 text-white/60" />
    </div>
  );
}

function SessionCard({ session, isLast }: { session: ProgramSession; isLast: boolean }) {
  if (session.isBreak) {
    const BreakIcon = session.breakIcon === 'lunch' ? UtensilsCrossed : Coffee;
    return (
      <div className="relative pl-14 pb-6">
        {!isLast && (
          <div className="absolute left-[19px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-[#F33349]/30 to-transparent" />
        )}
        <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#F33349]/10 border border-[#F33349]/20 flex items-center justify-center">
          <BreakIcon className="w-5 h-5 text-[#F33349]" />
        </div>
        <div className="py-3 px-4 bg-[#F33349]/5 rounded-xl border border-[#F33349]/10">
          <div className={session.breakIcon === 'lunch' ? 'flex flex-col md:flex-row gap-4' : ''}>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-[#F33349] font-semibold">{session.time}</span>
                <span className="text-[#061024]/70 font-medium">{session.title}</span>
              </div>
              {session.description && (
                <p className="mt-2 text-sm text-[#061024]/60 italic">{session.description}</p>
              )}
            </div>
            {session.breakIcon === 'lunch' && (
              <div className="w-full md:w-56 h-40 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src="/hegp.jpg"
                  alt="HEGP"
                  width={224}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pl-14 pb-6">
      {!isLast && (
        <div className="absolute left-[19px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-[#00B4D8]/30 to-transparent" />
      )}
      <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#00B4D8] to-[#00B4D8]/80 flex items-center justify-center shadow-sm">
        <Clock className="w-5 h-5 text-white" />
      </div>
      <div className="p-5 bg-white rounded-xl border border-[#061024]/10 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="text-[#00B4D8] font-bold text-lg">{session.time}</span>
        </div>
        <h4 className="text-[#061024] font-bold text-base">{session.title}</h4>
        {session.subtitle && (
          <p className="text-[#061024]/50 text-sm italic mb-4">{session.subtitle}</p>
        )}
        {!session.subtitle && <div className="mb-4" />}
        {session.speakers && session.speakers.length > 0 && (
          <div className="space-y-4">
            {session.speakers.map((speaker, speakerIndex) => {
              const speakerNames = extractSpeakers(speaker.name);
              return (
                <div key={speakerIndex} className="flex items-start justify-between gap-3 p-3 rounded-lg bg-[#F0F9FA]/50 hover:bg-[#F0F9FA] transition-colors">
                  <div className="flex-1 min-w-0">
                    {speaker.topic && (
                      <p className="text-[#00B4D8] text-sm font-medium mb-1">{speaker.topic}</p>
                    )}
                    <p className="font-semibold text-[#061024] text-sm">{speaker.name}</p>
                    {speaker.affiliation && (
                      <p className="text-[#061024]/50 text-xs">{speaker.affiliation}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {speakerNames.map((name, nameIndex) => (
                      <SpeakerAvatar key={nameIndex} name={name} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {session.qaText && (
          <div className="mt-4 flex items-start gap-3 p-3 rounded-lg bg-[#F0F9FA]/50">
            <MessageCircle className="w-5 h-5 text-[#00B4D8] flex-shrink-0 mt-0.5" />
            <p className="text-[#061024]/70 text-sm font-medium">{session.qaText}</p>
          </div>
        )}
        {session.description && (
          <div className="mt-4 py-3 px-4 bg-[#F33349]/5 rounded-xl border border-[#F33349]/10">
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-[#F33349] flex-shrink-0" />
              <span className="text-[#061024]/70 font-medium text-sm">{session.description}</span>
            </div>
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

        <div className="max-w-4xl mx-auto space-y-6">
          {content.blocks.map((block, blockIndex) => (
            <div key={blockIndex}>
              <div className="mb-6">
                <span className="inline-block px-2 py-0.5 bg-[#00B4D8]/10 text-[#00B4D8] font-semibold text-sm border-l-3 border-[#00B4D8]">
                  {block.blockTitle}
                </span>
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
