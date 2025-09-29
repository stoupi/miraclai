import Image from 'next/image';
import type { CSSProperties } from 'react';

import { Link } from '@/app/i18n/navigation';

import type { PartnerLogo } from '@/types/partners';
import { cn } from '@/lib/utils';

type PartnersMarqueeProps = {
  logos: PartnerLogo[];
  className?: string;
  trackClassName?: string;
  itemClassName?: string;
  pauseOnHover?: boolean;
};

const baseTrackClass = 'flex w-max flex-nowrap items-center gap-16 pr-16 animate-[marquee_20s_linear_infinite]';
const baseItemClass =
  'relative flex h-14 shrink-0 items-center justify-center overflow-visible cursor-pointer opacity-80 grayscale transition-transform duration-300 ease-out hover:scale-105 hover:opacity-100 hover:grayscale-0';

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
    <div className={cn('relative w-full overflow-hidden', className)}>
      <div
        className={cn(
          baseTrackClass,
          pauseOnHover ? 'hover:[animation-play-state:paused]' : '',
          trackClassName
        )}
        style={{ willChange: 'transform' }}
      >
        {sequence.map((logo, index) => {
          const isDuplicate = index >= logos.length;
          const scale = logo.scale ?? 1;
          const wrapperStyle: CSSProperties | undefined =
            scale === 1
              ? undefined
              : { transform: `scale(${scale})`, transformOrigin: 'center' };
          const imageStyle: CSSProperties = { height: '100%', width: 'auto' };

          const commonProps = {
            className: cn(baseItemClass, itemClassName),
            style: wrapperStyle,
            'aria-hidden': isDuplicate || undefined
          };

          const image = (
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
          );

          if (logo.href) {
            return (
              <Link
                key={`${logo.src}-${index}`}
                href={logo.href}
                aria-label={isDuplicate ? undefined : logo.alt}
                tabIndex={isDuplicate ? -1 : undefined}
                prefetch={false}
                {...commonProps}
              >
                {image}
              </Link>
            );
          }

          return (
            <div key={`${logo.src}-${index}`} {...commonProps}>
              {image}
            </div>
          );
        })}
      </div>
    </div>
  );
}
