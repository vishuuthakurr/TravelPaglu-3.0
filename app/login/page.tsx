'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Compass,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  ShieldAlert,
} from 'lucide-react';
import Navbar from '@/components/Navbar';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/home';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: email.trim(),
        password,
      });

      if (res?.error) {
        if (res.error === 'unverified') {
          setError('Your email is not verified. Please check your inbox for the OTP.');
          // Redirect them to verification page
          setTimeout(() => {
            router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`);
          }, 2000);
        } else {
          setError(res.error || 'Invalid email or password');
        }
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-clay border border-forest-100 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-forest-700 to-terracotta-500 flex items-center justify-center text-white mx-auto shadow-md">
          <Compass className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
          Sign In to TravelPaglu
        </h2>
        <p className="text-xs sm:text-sm text-forest-600">
          Access verified itineraries, bookmarks, and travel diaries.
        </p>
      </div>

      {searchParams.get('verified') === 'true' && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">Email verified successfully! You can now log in.</div>
        </div>
      )}

      {/* Security Error Alert */}
      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">{error}</div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:outline-none"
            />
            <Mail className="w-4 h-4 text-forest-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:outline-none"
            />
            <Lock className="w-4 h-4 text-forest-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-700 p-0.5"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          <span>{loading ? 'Verifying Credentials...' : 'Sign In Securely'}</span>
        </button>
      </form>

      {/* Security Disclaimer & Signup Link */}
      <div className="text-center pt-2 space-y-2 mt-4">
        <p className="text-xs text-forest-600">
          New to TravelPaglu?{' '}
          <Link href="/signup" className="font-bold text-terracotta-600 hover:underline">
            Create an account
          </Link>
        </p>
        <p className="text-[10px] text-forest-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>Protected by Bcrypt encryption & brute-force rate limiter</span>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f3]">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <Suspense
            fallback={
              <div className="p-8 bg-white rounded-3xl text-center space-y-2">
                <Loader2 className="w-6 h-6 animate-spin mx-auto text-forest-600" />
                <p className="text-xs text-forest-600">Loading sign in...</p>
              </div>
            }
          >
            <LoginFormContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
