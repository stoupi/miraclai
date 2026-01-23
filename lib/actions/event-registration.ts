'use server';

import { z } from 'zod';
import { unauthenticatedAction } from './safe-action';
import { resend, CONTACT_RECIPIENTS, FROM_EMAIL } from '../resend';

const eventRegistrationSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email'),
  profession: z.string().min(1, 'Profession is required'),
  institution: z.string().min(2, 'Institution is required'),
});

export const submitEventRegistration = unauthenticatedAction
  .schema(eventRegistrationSchema)
  .action(async ({ parsedInput }) => {
    const { firstName, lastName, email, profession, institution } = parsedInput;

    const now = new Date();
    const formattedDate = now.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #00B4D8 0%, #0077B6 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">
            🎉 Nouvelle inscription - Journée Scientifique MIRACL.ai
          </h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">
            8 avril 2026 • Auditorium Guy Meyer, HEGP
          </p>
        </div>

        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
          <h2 style="color: #061024; margin-top: 0; border-bottom: 2px solid #00B4D8; padding-bottom: 10px;">
            Informations du participant
          </h2>

          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
            <tr>
              <td style="padding: 15px; border-bottom: 1px solid #eee; font-weight: bold; color: #061024; width: 40%;">
                👤 Prénom
              </td>
              <td style="padding: 15px; border-bottom: 1px solid #eee; color: #333;">
                ${firstName}
              </td>
            </tr>
            <tr>
              <td style="padding: 15px; border-bottom: 1px solid #eee; font-weight: bold; color: #061024;">
                👤 Nom
              </td>
              <td style="padding: 15px; border-bottom: 1px solid #eee; color: #333;">
                ${lastName}
              </td>
            </tr>
            <tr>
              <td style="padding: 15px; border-bottom: 1px solid #eee; font-weight: bold; color: #061024;">
                📧 Email
              </td>
              <td style="padding: 15px; border-bottom: 1px solid #eee;">
                <a href="mailto:${email}" style="color: #00B4D8; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 15px; border-bottom: 1px solid #eee; font-weight: bold; color: #061024;">
                💼 Profession
              </td>
              <td style="padding: 15px; border-bottom: 1px solid #eee; color: #333;">
                ${profession}
              </td>
            </tr>
            <tr>
              <td style="padding: 15px; font-weight: bold; color: #061024;">
                🏛️ Institution
              </td>
              <td style="padding: 15px; color: #333;">
                ${institution}
              </td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background: #e8f6f7; border-radius: 8px; border-left: 4px solid #00B4D8;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              📅 Inscription reçue le ${formattedDate}
            </p>
          </div>
        </div>

        <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
        <p style="color: #999; font-size: 12px; text-align: center;">
          Ce message a été généré automatiquement depuis le formulaire d'inscription de la Journée Scientifique MIRACL.ai
        </p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_RECIPIENTS,
      replyTo: email,
      subject: `[Journée Scientifique] Nouvelle inscription : ${firstName} ${lastName}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Error sending registration email:', error);
      throw new Error('Failed to send email');
    }

    return { success: true };
  });
