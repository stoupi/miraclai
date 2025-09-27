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
const baseItemClass = 'h-10 w-auto shrink-0 opacity-80 grayscale transition group-hover:opacity-100 group-hover:grayscale-0';

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

          return (
            <img
              key={`${logo.src}-${index}`}
              src={logo.src}
              alt={isDuplicate ? '' : logo.alt}
              aria-hidden={isDuplicate}
              className={cn(baseItemClass, itemClassName)}
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          );
        })}
      </div>
    </div>
  );
}
