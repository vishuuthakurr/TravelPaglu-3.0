import nodemailer from 'nodemailer';

// In a real production app, use environment variables for SMTP credentials.
// For now, we'll use an Ethereal email test account (or just a dummy transport) 
// that logs the OTP securely to the server terminal.

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  auth: {
    user: process.env.EMAIL_SERVER_USER || 'travelpaglu.test@ethereal.email',
    pass: process.env.EMAIL_SERVER_PASSWORD || 'testpassword123',
  },
});

/**
 * Send a 6-digit OTP to the user's email address
 */
export async function sendVerificationEmail(toEmail: string, otpCode: string) {
  const mailOptions = {
    from: '"TravelPaglu Security" <noreply@travelpaglu.com>',
    to: toEmail,
    subject: 'TravelPaglu - Verify your email',
    html: `
      <div style="font-family: sans-serif; max-w-md; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #064e3b; margin-bottom: 16px;">Welcome to TravelPaglu! 🏕️</h2>
        <p style="color: #334155; font-size: 16px;">Your email verification code is:</p>
        <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; text-align: center; margin: 24px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #b91c1c;">${otpCode}</span>
        </div>
        <p style="color: #64748b; font-size: 14px;">This code will expire in 10 minutes.</p>
        <p style="color: #64748b; font-size: 14px; margin-top: 24px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  };

  // In development, we forcefully log it to the console so the developer can see it without needing a real SMTP server.
  if (process.env.NODE_ENV !== 'production') {
    console.log('\n=============================================');
    console.log(` 📧 DEV EMAIL INTERCEPT: OTP for ${toEmail}`);
    console.log(` 🔐 YOUR OTP CODE IS: ${otpCode}`);
    console.log('=============================================\n');
    return { success: true, message: 'Logged to console in dev mode.' };
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send email:', error);
    // Even if sending fails in dev, we return success because we printed it.
    if (process.env.NODE_ENV !== 'production') {
       return { success: true, message: 'Failed to send, but logged to console.' };
    }
    return { success: false, error };
  }
}
