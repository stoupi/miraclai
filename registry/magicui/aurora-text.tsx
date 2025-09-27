import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type AuroraTextProps = HTMLAttributes<HTMLSpanElement> & {
  colors?: string;
};

export function AuroraText({ className, colors, ...props }: AuroraTextProps) {
  return (
    <span
      {...props}
      className={cn(
        'inline-flex bg-[length:200%_200%] bg-clip-text text-transparent animate-aurora-text',
        colors ?? 'bg-gradient-to-r from-[#64c0c9] via-[#a855f7] to-[#f97316]',
        className
      )}
    />
  );
}
