import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { findUserByEmail } from './storage';
import { checkRateLimit, recordFailedAttempt, resetAttempts } from './security';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'student@travelpaglu.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }

        const email = credentials.email.toLowerCase().trim();

        // 1. Rate Limiting Check
        const rateCheck = checkRateLimit(email);
        if (!rateCheck.allowed) {
          throw new Error(
            `Account temporarily locked due to multiple failed login attempts. Please try again in ${rateCheck.retryAfterSeconds} seconds.`
          );
        }

        const user = await findUserByEmail(email);
        if (!user || !user.password) {
          const attempt = recordFailedAttempt(email);
          if (attempt.locked) {
            throw new Error(`Too many failed attempts. Account locked for 5 minutes.`);
          }
          throw new Error(`Invalid credentials. (${attempt.remainingAttempts} attempts remaining before temporary lockout)`);
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          const attempt = recordFailedAttempt(email);
          if (attempt.locked) {
            throw new Error(`Too many failed attempts. Account locked for 5 minutes.`);
          }
          throw new Error(`Invalid credentials. (${attempt.remainingAttempts} attempts remaining before temporary lockout)`);
        }

        if (user.isVerified === false) {
          throw new Error(`unverified`); // specific error code to catch in UI
        }

        // 2. Successful Login -> Reset attempts
        resetAttempts(email);

        return {
          id: user.id || user._id,
          name: user.name,
          email: user.email,
          role: user.role || 'user',
          homeCity: user.homeCity,
          interests: user.interests,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'user';
        token.homeCity = (user as any).homeCity;
        token.interests = (user as any).interests;
      }
      if (trigger === 'update' && session) {
        token.name = session.name || token.name;
        token.homeCity = session.homeCity || token.homeCity;
        token.interests = session.interests || token.interests;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = (token.role as string) || 'user';
        (session.user as any).homeCity = token.homeCity as string;
        (session.user as any).interests = token.interests as string[];
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'travelpaglu_super_secret_session_key_2026',
};
