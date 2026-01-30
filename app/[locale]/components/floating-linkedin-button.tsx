'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Linkedin } from 'lucide-react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip';

const LINKEDIN_URL = 'https://www.linkedin.com/company/miracl-ai';

export function FloatingLinkedinButton() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations('footer');

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F33349] shadow-md transition-all duration-300 hover:bg-[#d92b3f] hover:shadow-lg"
          >
            <Linkedin className="h-5 w-5" fill="white" stroke="none" />
          </a>
        </TooltipTrigger>
        <TooltipContent side="left">{t('linkedinTooltip')}</TooltipContent>
      </Tooltip>
    </div>
  );
}
