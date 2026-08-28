import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, homeCity, interests } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required.' }, { status: 400 });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    const newUser = await createUser({
      name,
      email,
      password,
      homeCity,
      interests,
      role: 'user',
    });

    return NextResponse.json({ message: 'User registered successfully!', user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create user' }, { status: 500 });
  }
}
