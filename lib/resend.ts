import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const CONTACT_RECIPIENTS = [
  'theo.pezelccf@gmail.com',
  'solenn.toupin@gmail.com'
];

export const FROM_EMAIL = 'MIRACL.ai <onboarding@resend.dev>';
