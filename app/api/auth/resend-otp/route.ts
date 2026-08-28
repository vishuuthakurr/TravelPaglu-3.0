import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, setVerificationOTP } from '@/lib/storage';
import { sendVerificationEmail } from '@/lib/mailer';

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      // Don't leak if email exists or not
      return NextResponse.json({ message: 'If account exists, an OTP was sent.' }, { status: 200 });
    }

    if (user.isVerified) {
      return NextResponse.json({ error: 'Account is already verified' }, { status: 400 });
    }

    const otp = generateOTP();
    await setVerificationOTP(user.email, otp);
    await sendVerificationEmail(user.email, otp);

    return NextResponse.json({ message: 'A new OTP has been sent to your email.' }, { status: 200 });
  } catch (error: any) {
    console.error('Resend OTP error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
