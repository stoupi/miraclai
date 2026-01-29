import { NextRequest, NextResponse } from 'next/server';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { prisma } from '@/lib/prisma';

const ADMIN_SECRET = process.env.ADMIN_EXPORT_SECRET || 'miraclai-admin-2026';

type Recipient = {
  name: string;
  email: string;
  gender: 'M' | 'F';
};

const stripTitle = (name: string): string => {
  return name.replace(/^(Mme|Mlle|M\.|Mr|Pr|Dr|Professeur|Docteur)\s+/i, '').trim();
};

const getInvitationHtml = (recipientName: string, gender: 'M' | 'F') => {
  const nameWithoutTitle = stripTitle(recipientName);
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#f4f4f4" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; width: 100%; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.15);">

          <!-- Header -->
          <tr>
            <td bgcolor="#061024" style="background: linear-gradient(135deg, #061024 0%, #0a1a3a 50%, #0d2347 100%); background-color: #061024; padding: 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 40px 40px 30px 40px; text-align: center;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td style="padding-bottom: 10px;">
                          <img src="https://www.miracl-ai.com/assets/logo_miracl_blanc_V2.png" alt="MIRACL.ai" width="180" style="display: block; margin: 0 auto;" />
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 25px;">
                        </td>
                      </tr>
                    </table>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td bgcolor="#3d1520" style="background-color: #3d1520; border: 1px solid #6b2030; border-radius: 50px; padding: 8px 20px;">
                          <span style="color: #F33349; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">Invitation personnelle</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Personal greeting -->
          <tr>
            <td bgcolor="#ffffff" style="background-color: #ffffff; padding: 40px 40px 0 40px;">
              <p style="margin: 0 0 20px 0; color: #061024; font-size: 15px; line-height: 1.7;">
                ${gender === 'F' ? 'Chère' : 'Cher'} <strong>${nameWithoutTitle}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; color: #333; font-size: 15px; line-height: 1.7;">
                C'est avec un réel plaisir que nous vous convions à la <strong style="color: #061024;">première Journée Scientifique MIRACL.ai</strong>, un événement exclusif qui marquera le lancement officiel de notre plateforme.
              </p>
              <p style="margin: 0 0 25px 0; color: #333; font-size: 15px; line-height: 1.7;">
                Votre parcours et votre engagement font de vous un acteur clé de notre écosystème. <strong style="color: #00B4D8;">Votre présence à nos côtés</strong> contribuerait à la richesse des échanges de cette journée.
              </p>
            </td>
          </tr>

          <!-- Event details -->
          <tr>
            <td bgcolor="#ffffff" style="background-color: #ffffff; padding: 0 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#061024" style="background: linear-gradient(135deg, #061024 0%, #0a1a3a 100%); background-color: #061024; border-radius: 16px; overflow: hidden;">
                <tr>
                  <td bgcolor="#061024" style="background-color: #061024; padding: 30px; text-align: center;">
                    <p style="margin: 0 0 5px 0; color: #b3b3b3; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Première édition</p>
                    <h2 style="margin: 0 0 5px 0; color: #ffffff; font-size: 28px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      Journée Scientifique
                    </h2>
                    <p style="margin: 0 0 20px 0; color: #00B4D8; font-size: 14px; font-weight: 500; letter-spacing: 1px;">
                      LANCEMENT OFFICIEL MIRACL.ai
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td style="padding: 0 15px; border-right: 1px solid #333d4d;">
                          <p style="margin: 0; color: #00B4D8; font-size: 24px; font-weight: 700;">8 Avril</p>
                          <p style="margin: 0; color: #b3b3b3; font-size: 13px;">2026</p>
                        </td>
                        <td style="padding: 0 15px; border-right: 1px solid #333d4d;">
                          <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: 600;">9h30 - 16h00</p>
                        </td>
                        <td style="padding: 0 15px;">
                          <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: 600;">Auditorium Guy Meyer</p>
                          <p style="margin: 0; color: #b3b3b3; font-size: 13px;">HEGP, Paris</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Why attend -->
          <tr>
            <td bgcolor="#ffffff" style="background-color: #ffffff; padding: 30px 40px;">
              <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.7;">
                Cette journée sera l'occasion de vous présenter notre plateforme, son équipe et ses services, d'échanger sur les enjeux actuels de l'imagerie cardiovasculaire et de l'intelligence artificielle, et de rencontrer les acteurs académiques et industriels qui façonnent l'avenir de notre discipline.
              </p>
            </td>
          </tr>

          <!-- Limited seats warning -->
          <tr>
            <td bgcolor="#ffffff" style="background-color: #ffffff; padding: 0 40px 30px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#FEF3F4" style="background-color: #FEF3F4; border-radius: 12px; border-left: 4px solid #F33349;">
                <tr>
                  <td style="padding: 15px 20px;">
                    <p style="margin: 0; color: #061024; font-size: 14px; line-height: 1.5;">
                      <strong style="color: #F33349;">Places limitées</strong> — Seuls 150 participants pourront être accueillis. Nous vous invitons à confirmer votre présence rapidement.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td bgcolor="#ffffff" style="background-color: #ffffff; padding: 0 40px 40px 40px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                <tr>
                  <td bgcolor="#F33349" style="border-radius: 50px; background-color: #F33349;">
                    <a href="https://www.miracl-ai.com/fr/journeescientifique#registration-section" target="_blank" style="display: inline-block; padding: 18px 45px; color: #ffffff; font-size: 16px; font-weight: 700; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">
                      Confirmer ma présence
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 20px 0 0 0;">
                <a href="https://www.miracl-ai.com/fr/journeescientifique" target="_blank" style="color: #00B4D8; font-size: 16px; text-decoration: underline;">
                  Découvrir le programme détaillé →
                </a>
              </p>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td bgcolor="#f8fafb" style="background-color: #f8fafb; padding: 30px 40px; border-top: 1px solid #e8f4f5;">
              <p style="margin: 0 0 20px 0; color: #333; font-size: 15px; line-height: 1.6;">
                Dans l'attente du plaisir de vous accueillir,
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-right: 15px; vertical-align: top; width: 33%;">
                    <p style="margin: 0; color: #061024; font-size: 14px; font-weight: 600;">
                      Dr Théo Pezel
                    </p>
                    <p style="margin: 0; color: #666; font-size: 12px;">
                      Référent Cardiologue
                    </p>
                  </td>
                  <td style="padding: 0 15px; vertical-align: top; width: 33%; border-left: 1px solid #e0e0e0;">
                    <p style="margin: 0; color: #061024; font-size: 14px; font-weight: 600;">
                      Pr Gilles Soulat
                    </p>
                    <p style="margin: 0; color: #666; font-size: 12px;">
                      Référent Radiologue
                    </p>
                  </td>
                  <td style="padding-left: 15px; vertical-align: top; width: 33%; border-left: 1px solid #e0e0e0;">
                    <p style="margin: 0; color: #061024; font-size: 14px; font-weight: 600;">
                      Solenn Toupin, PhD
                    </p>
                    <p style="margin: 0; color: #666; font-size: 12px;">
                      Coordinatrice scientifique
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

function parseRecipients(input: string): Recipient[] {
  const lines = input.split('\n').filter((line) => line.trim().length > 0);
  const recipients: Recipient[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Extract gender prefix (M or F at the beginning)
    const genderMatch = trimmedLine.match(/^([MF])\s*[,;]\s*(.+)$/i);
    const gender: 'M' | 'F' = genderMatch ? (genderMatch[1].toUpperCase() as 'M' | 'F') : 'M';
    const restOfLine = genderMatch ? genderMatch[2].trim() : trimmedLine;

    // Format: "Prénom Nom <email@example.com>"
    const angleMatch = restOfLine.match(/^(.+?)\s*<([^>]+)>$/);
    if (angleMatch) {
      recipients.push({
        name: angleMatch[1].trim(),
        email: angleMatch[2].trim(),
        gender,
      });
      continue;
    }

    // Format: "Prénom Nom, email@example.com" or "Prénom Nom; email@example.com"
    const separatorMatch = restOfLine.match(/^(.+?)[,;]\s*([^\s,;]+@[^\s,;]+)$/);
    if (separatorMatch) {
      recipients.push({
        name: separatorMatch[1].trim(),
        email: separatorMatch[2].trim(),
        gender,
      });
      continue;
    }

    // Format: just email (fallback - use email as name)
    if (restOfLine.includes('@')) {
      const email = restOfLine.split(/[,;\s]/)[0];
      if (email.includes('@')) {
        recipients.push({
          name: email.split('@')[0],
          email: email,
          gender,
        });
      }
    }
  }

  return recipients.filter((r) => r.email.includes('@'));
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const format = request.nextUrl.searchParams.get('format');

  const invitations = await prisma.sentInvitation.findMany({
    orderBy: { sentAt: 'desc' },
  });

  const registrations = await prisma.eventRegistration.findMany({
    where: { eventSlug: 'journee-scientifique-2026' },
    select: { email: true },
  });
  const registeredEmails = new Set(registrations.map((registration) => registration.email.toLowerCase()));

  const invitationsWithStatus = invitations.map((invitation) => ({
    id: invitation.id,
    name: invitation.name,
    email: invitation.email,
    sentAt: invitation.sentAt.toISOString(),
    isRegistered: registeredEmails.has(invitation.email.toLowerCase()),
  }));

  if (format === 'csv') {
    const csvHeader = 'Nom,Email,Date envoi,Inscrit';
    const csvRows = invitationsWithStatus.map((invitation) =>
      `"${invitation.name}","${invitation.email}","${new Date(invitation.sentAt).toLocaleDateString('fr-FR')}","${invitation.isRegistered ? 'Oui' : 'Non'}"`
    );
    const csvContent = [csvHeader, ...csvRows].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="invitations-miracl.csv"',
      },
    });
  }

  const totalInvited = invitationsWithStatus.length;
  const totalRegistered = invitationsWithStatus.filter((invitation) => invitation.isRegistered).length;

  return NextResponse.json({
    totalInvited,
    totalRegistered,
    invitations: invitationsWithStatus,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { emails, secret } = body;

    if (secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const recipients = parseRecipients(emails as string);

    if (recipients.length === 0) {
      return NextResponse.json({ error: 'No valid recipients provided' }, { status: 400 });
    }

    const recipientEmails = recipients.map((recipient) => recipient.email.toLowerCase());
    const alreadySent = await prisma.sentInvitation.findMany({
      where: { email: { in: recipientEmails } },
      select: { email: true, sentAt: true },
    });
    const alreadySentEmails = new Set(alreadySent.map((record) => record.email.toLowerCase()));

    const results: { email: string; name: string; success: boolean; error?: string; alreadySent?: boolean }[] = [];

    for (const recipient of recipients) {
      const emailLower = recipient.email.toLowerCase();

      if (alreadySentEmails.has(emailLower)) {
        const sentRecord = alreadySent.find((record) => record.email.toLowerCase() === emailLower);
        results.push({
          email: recipient.email,
          name: recipient.name,
          success: false,
          alreadySent: true,
          error: `Invitation déjà envoyée le ${sentRecord?.sentAt.toLocaleDateString('fr-FR')}`,
        });
        continue;
      }

      try {
        const { error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: recipient.email,
          subject: `${recipient.name}, vous êtes ${recipient.gender === 'F' ? 'invitée' : 'invité'} à la 1ère Journée Scientifique MIRACL.ai`,
          html: getInvitationHtml(recipient.name, recipient.gender),
        });

        if (error) {
          results.push({ email: recipient.email, name: recipient.name, success: false, error: error.message });
        } else {
          await prisma.sentInvitation.create({
            data: { email: emailLower, name: recipient.name },
          });
          results.push({ email: recipient.email, name: recipient.name, success: true });
        }
      } catch (err) {
        results.push({ email: recipient.email, name: recipient.name, success: false, error: String(err) });
      }

      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    const successCount = results.filter((result) => result.success).length;
    const failedCount = results.filter((result) => !result.success && !result.alreadySent).length;
    const skippedCount = results.filter((result) => result.alreadySent).length;

    return NextResponse.json({
      totalSent: successCount,
      totalFailed: failedCount,
      totalSkipped: skippedCount,
      results,
    });
  } catch (error) {
    console.error('Error sending invitations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
