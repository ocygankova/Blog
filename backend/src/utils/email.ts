import { createTransport } from 'nodemailer';
import env from '../env';

const transporter = createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

export async function sendVerificationCode(
  toEmail: string,
  verificationCode: string
) {
  await transporter.sendMail({
    from: env.SMTP_USER,
    to: toEmail,
    subject: '[Blog]: Please verify your email address',
    html: `<p>Hello,</p>
           <p>Somebody just used this email address to sign up at Blog.</p>
           <p>If this was you, here is your verification code. It will expire in 10 minutes</p>
           <p><strong>${verificationCode}</strong></p>
           <p>If this was not you, please ignore this email.</p>`,
  });
}

export async function sendPasswordResetCode(
  toEmail: string,
  verificationCode: string
) {
  await transporter.sendMail({
    from: env.SMTP_USER,
    to: toEmail,
    subject: '[Blog]: Reset your password',
    html: `<p>A password reset has been requested for this account.</p>
           <p>Use this verification code to reset your password. It will expire in 10 minutes</p>
           <p><strong>${verificationCode}</strong></p>
           <p>If you did not request a password reset, please ignore this email.</p>`,
  });
}
