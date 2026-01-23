'use server';

import { z } from 'zod';
import { unauthenticatedAction } from './safe-action';
import { resend, FROM_EMAIL } from '../resend';

const sendInvitationSchema = z.object({
  emails: z.string().min(1, 'At least one email is required'),
  secret: z.string().min(1, 'Secret is required'),
});

const ADMIN_SECRET = process.env.ADMIN_EXPORT_SECRET || 'miraclai-admin-2026';

const getInvitationHtml = () => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Invitation - Journée Scientifique MIRACL.ai</title>
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
                        <td style="padding-bottom: 30px;">
                          <img src="https://www.miracl-ai.com/assets/logo_miracl_blanc_V2.png" alt="MIRACL.ai" width="200" style="display: block; margin: 0 auto;" />
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td style="background-color: rgba(0, 180, 216, 0.15); border: 1px solid rgba(0, 180, 216, 0.3); border-radius: 50px; padding: 8px 20px;">
                          <span style="color: #00B4D8; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Première édition</span>
                        </td>
                      </tr>
                    </table>

                    <h1 style="margin: 25px 0 15px 0; padding: 0; color: #ffffff; font-size: 36px; font-weight: 700; line-height: 1.2; text-transform: uppercase; letter-spacing: 2px;">
                      Journée<br/>Scientifique
                    </h1>

                    <p style="margin: 0 0 25px 0; color: #00B4D8; font-size: 16px; font-weight: 500; letter-spacing: 1px;">
                      LANCEMENT OFFICIEL
                    </p>

                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td style="width: 60px; height: 3px; background: linear-gradient(90deg, transparent, #00B4D8, transparent);"></td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="background-color: #ffffff; padding: 40px;">

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <h2 style="margin: 0 0 5px 0; color: #00B4D8; font-size: 32px; font-weight: 700;">
                      8 Avril 2026
                    </h2>
                    <p style="margin: 0 0 25px 0; color: #061024; font-size: 18px; font-weight: 500;">
                      De 9h30 à 16h00
                    </p>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                <tr>
                  <td width="48%" valign="top">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafb; border-radius: 12px; border: 1px solid #e8f4f5;">
                      <tr>
                        <td style="padding: 20px; text-align: center;">
                          <div style="width: 40px; height: 40px; background-color: #00B4D8; border-radius: 50%; margin: 0 auto 12px auto; line-height: 40px; text-align: center;">
                            <span style="color: white; font-size: 18px;">📍</span>
                          </div>
                          <p style="margin: 0; color: #061024; font-size: 14px; line-height: 1.5;">
                            <strong>Auditorium Guy Meyer</strong><br/>
                            Hôpital Européen<br/>
                            Georges Pompidou<br/>
                            <span style="color: #666;">Paris</span>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" valign="top">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafb; border-radius: 12px; border: 1px solid #e8f4f5;">
                      <tr>
                        <td style="padding: 20px; text-align: center;">
                          <div style="width: 40px; height: 40px; background-color: #00B4D8; border-radius: 50%; margin: 0 auto 12px auto; line-height: 40px; text-align: center;">
                            <span style="color: white; font-size: 18px;">👥</span>
                          </div>
                          <p style="margin: 0; color: #061024; font-size: 14px; line-height: 1.5;">
                            <strong>Places limitées</strong><br/>
                            150 participants<br/>
                            maximum<br/>
                            <span style="color: #F33349; font-weight: 600;">Inscrivez-vous vite !</span>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 0 0 30px 0;">
                    <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.7; text-align: center;">
                      Rejoignez-nous pour un <strong style="color: #061024;">échange unique</strong> dédié aux acteurs
                      académiques et industriels engagés aux côtés de la recherche et de la clinique
                      pour faire avancer l'<strong style="color: #00B4D8;">imagerie cardiovasculaire</strong>
                      et l'<strong style="color: #00B4D8;">intelligence artificielle</strong>.
                    </p>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                <tr>
                  <td style="border-radius: 50px; background: linear-gradient(135deg, #F33349 0%, #e02a3f 100%); box-shadow: 0 4px 15px rgba(243, 51, 73, 0.35);">
                    <a href="https://www.miracl-ai.com/fr/journeescientifique#registration-section" target="_blank" style="display: inline-block; padding: 18px 45px; color: #ffffff; font-size: 16px; font-weight: 700; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">
                      Je m'inscris
                    </a>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-top: 20px;">
                <tr>
                  <td>
                    <a href="https://www.miracl-ai.com/fr/journeescientifique" target="_blank" style="color: #00B4D8; font-size: 14px; text-decoration: underline;">
                      Voir le programme complet →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #061024; padding: 30px 40px;">

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <p style="margin: 0 0 15px 0; color: rgba(255,255,255,0.6); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                      Organisé par
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td style="padding: 0 15px;">
                          <img src="https://www.miracl-ai.com/assets/partners/aphp.png" alt="AP-HP" height="40" style="display: block; filter: brightness(0) invert(1); opacity: 0.8;" />
                        </td>
                        <td style="padding: 0 15px;">
                          <img src="https://www.miracl-ai.com/assets/partners/carnot.png" alt="Carnot" height="40" style="display: block; filter: brightness(0) invert(1); opacity: 0.8;" />
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 12px; line-height: 1.6;">
                      Une question ? Contactez-nous à<br/>
                      <a href="mailto:contact@miracl-ai.com" style="color: #00B4D8; text-decoration: none;">contact@miracl-ai.com</a>
                    </p>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0;">
                <tr>
                  <td style="height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);"></td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <p style="margin: 0; color: rgba(255,255,255,0.4); font-size: 11px;">
                      © 2026 MIRACL.ai - Le Core Lab académique de référence<br/>
                      en imagerie cardiovasculaire multimodale
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

export const sendInvitationEmail = unauthenticatedAction
  .schema(sendInvitationSchema)
  .action(async ({ parsedInput }) => {
    const { emails, secret } = parsedInput;

    if (secret !== ADMIN_SECRET) {
      throw new Error('Unauthorized');
    }

    // Parse emails (comma or newline separated)
    const emailList = emails
      .split(/[,\n]/)
      .map((email) => email.trim())
      .filter((email) => email.length > 0 && email.includes('@'));

    if (emailList.length === 0) {
      throw new Error('No valid emails provided');
    }

    const results: { email: string; success: boolean; error?: string }[] = [];

    // Send emails one by one (Resend free tier has limits)
    for (const email of emailList) {
      try {
        const { error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: 'Invitation - 1ère Journée Scientifique MIRACL.ai | 8 Avril 2026',
          html: getInvitationHtml(),
        });

        if (error) {
          results.push({ email, success: false, error: error.message });
        } else {
          results.push({ email, success: true });
        }
      } catch (err) {
        results.push({ email, success: false, error: String(err) });
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    const successCount = results.filter((r) => r.success).length;
    const failedCount = results.filter((r) => !r.success).length;

    return {
      success: true,
      totalSent: successCount,
      totalFailed: failedCount,
      results,
    };
  });
