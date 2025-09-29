import fs from 'fs/promises';
import path from 'path';

import type { PartnerLogo } from '@/types/partners';

const logoDirectory = path.join(process.cwd(), 'public', 'assets', 'logo_centres');
const imagePattern = /\.(svg|png|jpe?g)$/i;
const logoScaleOverrides: Record<string, number> = {
  'logo_amiens.jpg': 0.9,
  'logo_HEGP.png': 1.2
};

const logoLinkOverrides: Record<string, string> = {
  logo_larib: '/lariboisiere'
};

const logoAltOverrides: Record<string, string> = {
  logo_larib: 'Logo Hôpital Lariboisière'
};

export async function getPartnerLogos(): Promise<PartnerLogo[]> {
  const entries = await fs.readdir(logoDirectory);
  const files = entries.filter((name) => imagePattern.test(name));

  return files.map((name) => {
    const identifier = name.replace(/\.[^.]+$/, '');

    return {
      src: `/assets/logo_centres/${encodeURIComponent(name)}`,
      alt:
        logoAltOverrides[identifier] ??
        name.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, ''),
      scale: logoScaleOverrides[name] ?? undefined,
      href: logoLinkOverrides[identifier]
    } satisfies PartnerLogo;
  });
}
