import Image from 'next/image';
import type { CSSProperties } from 'react';

import type { PartnerLogo } from '@/types/partners';
import { cn } from '@/lib/utils';

type PartnersMarqueeProps = {
  logos: PartnerLogo[];
  className?: string;
  trackClassName?: string;
  itemClassName?: string;
  pauseOnHover?: boolean;
};

const baseTrackClass = 'flex w-max flex-nowrap items-center gap-12 pr-12 animate-[marquee_20s_linear_infinite]';
const baseItemClass =
  'relative flex h-10 shrink-0 items-center justify-center overflow-visible opacity-80 grayscale transition group-hover:opacity-100 group-hover:grayscale-0';

export function PartnersMarquee({
  logos,
  className,
  trackClassName,
  itemClassName,
  pauseOnHover = true
}: PartnersMarqueeProps) {
  if (logos.length === 0) {
    return null;
  }

  const sequence = [...logos, ...logos];

  return (
    <div className={cn('group relative w-full overflow-hidden', className)}>
      <div
        className={cn(
          baseTrackClass,
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : '',
          trackClassName
        )}
        style={{ willChange: 'transform' }}
      >
        {sequence.map((logo, index) => {
          const isDuplicate = index >= logos.length;
          const scale = logo.scale ?? 1;
          const wrapperStyle: CSSProperties | undefined =
            scale === 1 ? undefined : { transform: `scale(${scale})`, transformOrigin: 'center' };
          const imageStyle: CSSProperties = { height: '100%', width: 'auto' };

          return (
            <div
              key={`${logo.src}-${index}`}
              className={cn(baseItemClass, itemClassName)}
              style={wrapperStyle}
            >
              <Image
                src={logo.src}
                alt={isDuplicate ? '' : logo.alt}
                aria-hidden={isDuplicate}
                draggable={false}
                loading="lazy"
                width={160}
                height={40}
                sizes="(min-width: 768px) 160px, 120px"
                className="h-full w-auto object-contain"
                style={imageStyle}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
