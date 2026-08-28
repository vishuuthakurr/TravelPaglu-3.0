import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    const isValid = await verifyOTP(email, otp);

    if (isValid) {
      return NextResponse.json({ message: 'Email verified successfully!' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('OTP verification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
