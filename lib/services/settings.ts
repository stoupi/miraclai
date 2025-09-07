import { prisma } from '@/lib/prisma';

export async function getSetting(key: string): Promise<string | null> {
  const row = await prisma.setting.findUnique({ where: { key } });
  return row?.value ?? null;
}

export async function setSetting(key: string, value: string | null) {
  return prisma.setting.upsert({
    where: { key },
    create: { key, value: value ?? null },
    update: { value: value ?? null },
  });
}

export async function getHeroImageUrl(): Promise<string | null> {
  return getSetting('HERO_IMAGE_URL');
}

