import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type AuroraTextProps = HTMLAttributes<HTMLSpanElement>;

export function AuroraText({ className, ...props }: AuroraTextProps) {
  return (
    <span
      {...props}
      className={cn(
        'inline-flex bg-[length:200%_200%] bg-gradient-to-r from-[#64c0c9] via-[#a855f7] to-[#f97316] bg-clip-text text-transparent animate-aurora-text',
        className
      )}
    />
  );
}
