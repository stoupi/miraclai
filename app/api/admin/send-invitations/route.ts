import { NextRequest, NextResponse } from 'next/server';
import { resend, FROM_EMAIL } from '@/lib/resend';

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
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; width: 100%; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.15);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #061024 0%, #0a1a3a 50%, #0d2347 100%); padding: 0;">
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
                          <p style="margin: 0; color: #00B4D8; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">Une plateforme de l'AP-HP</p>
                        </td>
                      </tr>
                    </table>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td style="background-color: rgba(243, 51, 73, 0.2); border: 1px solid rgba(243, 51, 73, 0.4); border-radius: 50px; padding: 8px 20px;">
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
            <td style="background-color: #ffffff; padding: 40px 40px 0 40px;">
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
            <td style="background-color: #ffffff; padding: 0 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #061024 0%, #0a1a3a 100%); border-radius: 16px; overflow: hidden;">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <p style="margin: 0 0 5px 0; color: rgba(255,255,255,0.7); font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Première édition</p>
                    <h2 style="margin: 0 0 5px 0; color: #ffffff; font-size: 28px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      Journée Scientifique
                    </h2>
                    <p style="margin: 0 0 20px 0; color: #00B4D8; font-size: 14px; font-weight: 500; letter-spacing: 1px;">
                      LANCEMENT OFFICIEL MIRACL.ai
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td style="padding: 0 15px; border-right: 1px solid rgba(255,255,255,0.2);">
                          <p style="margin: 0; color: #00B4D8; font-size: 24px; font-weight: 700;">8 Avril</p>
                          <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 13px;">2026</p>
                        </td>
                        <td style="padding: 0 15px; border-right: 1px solid rgba(255,255,255,0.2);">
                          <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: 600;">9h30 - 16h00</p>
                        </td>
                        <td style="padding: 0 15px;">
                          <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: 600;">Auditorium Guy Meyer</p>
                          <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 13px;">HEGP, Paris</p>
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
            <td style="background-color: #ffffff; padding: 30px 40px;">
              <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.7;">
                Cette journée sera l'occasion de vous présenter notre plateforme, son équipe et ses services, d'échanger sur les enjeux actuels de l'imagerie cardiovasculaire et de l'intelligence artificielle, et de rencontrer les acteurs académiques et industriels qui façonnent l'avenir de notre discipline.
              </p>
            </td>
          </tr>

          <!-- Limited seats warning -->
          <tr>
            <td style="background-color: #ffffff; padding: 0 40px 30px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FEF3F4; border-radius: 12px; border-left: 4px solid #F33349;">
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
            <td style="background-color: #ffffff; padding: 0 40px 40px 40px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                <tr>
                  <td style="border-radius: 50px; background: linear-gradient(135deg, #F33349 0%, #e02a3f 100%); box-shadow: 0 4px 15px rgba(243, 51, 73, 0.35);">
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
            <td style="background-color: #f8fafb; padding: 30px 40px; border-top: 1px solid #e8f4f5;">
              <p style="margin: 0 0 15px 0; color: #333; font-size: 15px; line-height: 1.6;">
                Dans l'attente du plaisir de vous accueillir,
              </p>
              <p style="margin: 0; color: #061024; font-size: 15px; font-weight: 600;">
                Dr Théo Pezel
              </p>
              <p style="margin: 0; color: #666; font-size: 13px;">
                Directeur scientifique, MIRACL.ai
              </p>
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

    const results: { email: string; name: string; success: boolean; error?: string }[] = [];

    for (const recipient of recipients) {
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
          results.push({ email: recipient.email, name: recipient.name, success: true });
        }
      } catch (err) {
        results.push({ email: recipient.email, name: recipient.name, success: false, error: String(err) });
      }

      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    const successCount = results.filter((r) => r.success).length;
    const failedCount = results.filter((r) => !r.success).length;

    return NextResponse.json({
      totalSent: successCount,
      totalFailed: failedCount,
      results,
    });
  } catch (error) {
    console.error('Error sending invitations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
