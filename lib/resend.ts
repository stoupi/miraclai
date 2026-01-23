import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const CONTACT_RECIPIENTS = [
  'theo.pezelccf@gmail.com',
  'solenn.toupin@gmail.com'
];

export const FROM_EMAIL = process.env.RESEND_FROM
  ? `MIRACL.ai <${process.env.RESEND_FROM}>`
  : 'MIRACL.ai <noreply@cardiolarib-research.com>';
