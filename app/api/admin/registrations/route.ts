import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const ADMIN_SECRET = process.env.ADMIN_EXPORT_SECRET || 'miraclai-admin-2026';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const format = searchParams.get('format') || 'csv';

  // Simple secret-based authentication
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const registrations = await prisma.eventRegistration.findMany({
    where: {
      eventSlug: 'journee-scientifique-2026',
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (format === 'json') {
    return NextResponse.json(registrations);
  }

  // Generate CSV
  const headers = ['Prénom', 'Nom', 'Email', 'Profession', 'Institution', 'Date d\'inscription'];
  const rows = registrations.map((registration) => [
    registration.firstName,
    registration.lastName,
    registration.email,
    registration.profession,
    registration.institution,
    registration.createdAt.toLocaleString('fr-FR'),
  ]);

  const csvContent = [
    headers.join(';'),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(';')),
  ].join('\n');

  // Add BOM for Excel compatibility with UTF-8
  const bom = '\uFEFF';
  const csvWithBom = bom + csvContent;

  return new NextResponse(csvWithBom, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="inscriptions-journee-scientifique-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}
