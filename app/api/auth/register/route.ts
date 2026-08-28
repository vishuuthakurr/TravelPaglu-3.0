import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail, setVerificationOTP } from '@/lib/storage';
import { validatePasswordStrength } from '@/lib/security';
import { sendVerificationEmail } from '@/lib/mailer';

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, homeCity, interests } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const passCheck = validatePasswordStrength(password);
    if (!passCheck.isValid) {
      return NextResponse.json({ error: passCheck.message || 'Password does not meet security requirements.' }, { status: 400 });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    const newUser = await createUser({
      name: name.trim(),
      email: email.trim(),
      password,
      homeCity: (homeCity || '').trim(),
      interests: interests || [],
      role: 'user',
    });

    // Generate and send OTP
    const otp = generateOTP();
    await setVerificationOTP(newUser.email, otp);
    await sendVerificationEmail(newUser.email, otp);

    return NextResponse.json({ message: 'User registered. Please verify your email.', user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create user' }, { status: 500 });
  }
}
