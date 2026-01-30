'use client';

import { useState, useEffect } from 'react';
import { Linkedin } from 'lucide-react';

const LINKEDIN_URL = 'https://www.linkedin.com/company/miracl-ai';

export function FloatingLinkedinButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-all duration-300 hover:border-[#0077B5] hover:bg-[#0077B5] hover:shadow-lg hover:text-white group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <Linkedin className="h-5 w-5 text-[#0077B5] transition-colors duration-300 group-hover:text-white" />
    </a>
  );
}
