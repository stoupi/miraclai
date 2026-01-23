'use server';

import { z } from 'zod';
import { unauthenticatedAction } from './safe-action';
import { resend, CONTACT_RECIPIENTS, FROM_EMAIL } from '../resend';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  organization: z.string().min(1, 'Organization is required'),
  role: z.string().optional(),
  projectType: z.string().optional(),
  hasFunding: z.string().optional(),
  fundingStatus: z.string().optional(),
  services: z.array(z.string()),
  modalities: z.array(z.string()),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export const submitContactForm = unauthenticatedAction
  .schema(contactSchema)
  .action(async ({ parsedInput }) => {
    const {
      name,
      email,
      organization,
      role,
      projectType,
      hasFunding,
      fundingStatus,
      services,
      modalities,
      subject,
      message,
    } = parsedInput;

    const roleLabels: Record<string, string> = {
      researcher: 'Chercheur',
      clinician: 'Clinicien',
      industry: 'Industriel',
      other: 'Autre',
    };

    const projectTypeLabels: Record<string, string> = {
      academic: 'Académique',
      industrial: 'Industriel',
      mixed: 'Mixte',
    };

    const fundingLabels: Record<string, string> = {
      yes: 'Oui',
      no: 'Non',
      searching: 'En recherche',
    };

    const fundingStatusLabels: Record<string, string> = {
      obtained: 'Obtenu',
      pending: 'En attente',
      submitted: 'Soumis',
    };

    const serviceLabels: Record<string, string> = {
      database: 'Constitution de bases de données',
      reading: 'Relecture centralisée',
      groundtruth: 'Ground Truth / Annotations',
      ai: 'Développement IA',
      valorization: 'Valorisation scientifique',
      other: 'Autre',
    };

    const modalityLabels: Record<string, string> = {
      mri: 'IRM',
      ct: 'Scanner',
      echo: 'Échographie',
      ecg: 'ECG',
      angio: 'Coronarographie',
      nuclear: 'Imagerie nucléaire',
      other: 'Autre',
    };

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #061024; border-bottom: 2px solid #00B4D8; padding-bottom: 10px;">
          Nouveau message de contact - MIRACL.ai
        </h1>

        <h2 style="color: #00B4D8;">Informations du contact</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Nom</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">
              <a href="mailto:${email}">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Organisation</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${organization}</td>
          </tr>
          ${role ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Rôle</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${roleLabels[role] || role}</td>
          </tr>
          ` : ''}
        </table>

        ${projectType || hasFunding ? `
        <h2 style="color: #00B4D8; margin-top: 20px;">Détails du projet</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${projectType ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Type de projet</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${projectTypeLabels[projectType] || projectType}</td>
          </tr>
          ` : ''}
          ${hasFunding ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Financement</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${fundingLabels[hasFunding] || hasFunding}</td>
          </tr>
          ` : ''}
          ${fundingStatus ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Statut du financement</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${fundingStatusLabels[fundingStatus] || fundingStatus}</td>
          </tr>
          ` : ''}
        </table>
        ` : ''}

        ${services.length > 0 ? `
        <h2 style="color: #00B4D8; margin-top: 20px;">Services souhaités</h2>
        <ul style="margin: 0; padding-left: 20px;">
          ${services.map(service => `<li>${serviceLabels[service] || service}</li>`).join('')}
        </ul>
        ` : ''}

        ${modalities.length > 0 ? `
        <h2 style="color: #00B4D8; margin-top: 20px;">Modalités d'imagerie</h2>
        <ul style="margin: 0; padding-left: 20px;">
          ${modalities.map(modality => `<li>${modalityLabels[modality] || modality}</li>`).join('')}
        </ul>
        ` : ''}

        <h2 style="color: #00B4D8; margin-top: 20px;">Message</h2>
        <p style="background: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</p>

        <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
        <p style="color: #666; font-size: 12px;">
          Ce message a été envoyé depuis le formulaire de contact de MIRACL.ai
        </p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_RECIPIENTS,
      replyTo: email,
      subject: `[MIRACL.ai Contact] ${subject}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Error sending contact email:', error);
      throw new Error('Failed to send email');
    }

    return { success: true };
  });
