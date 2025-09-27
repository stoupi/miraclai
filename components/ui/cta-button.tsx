import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CtaButtonProps = ButtonProps;

export function CtaButton({ className, size = 'lg', ...props }: CtaButtonProps) {
  return (
    <Button
      size={size}
      className={cn(
        'cursor-pointer rounded-full bg-[#F33349] px-7 py-2.5 text-base font-semibold text-white md:text-lg border-2 border-[#F33349] transition-colors hover:bg-white hover:text-[#F33349] hover:border-[#F33349]',
        className
      )}
      {...props}
    />
  );
}
