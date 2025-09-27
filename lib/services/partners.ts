import fs from 'fs/promises';
import path from 'path';

import type { PartnerLogo } from '@/types/partners';

const logoDirectory = path.join(process.cwd(), 'public', 'assets', 'logo_centres');
const imagePattern = /\.(svg|png|jpe?g)$/i;
const logoScaleOverrides: Record<string, number> = {
  'logo_amiens.jpg': 1.2
};

export async function getPartnerLogos(): Promise<PartnerLogo[]> {
  const entries = await fs.readdir(logoDirectory);
  const files = entries.filter((name) => imagePattern.test(name));

  return files.map((name) => ({
    src: `/assets/logo_centres/${encodeURIComponent(name)}`,
    alt: name.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, ''),
    scale: logoScaleOverrides[name] ?? undefined
  }));
}
