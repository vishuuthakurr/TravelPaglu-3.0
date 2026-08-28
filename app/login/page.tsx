'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Compass, Lock, Mail, ArrowRight, ShieldCheck, GraduationCap, AlertCircle, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/home';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error || 'Invalid email or password');
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

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-clay border border-forest-100 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-forest-700 to-terracotta-500 flex items-center justify-center text-white mx-auto shadow-md">
          <Compass className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
          Welcome Back
        </h2>
        <p className="text-xs sm:text-sm text-forest-600">
          Log in to access verified itineraries and your saved wishlist.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
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
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:outline-none"
            />
            <Lock className="w-4 h-4 text-forest-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          <span>{loading ? 'Logging In...' : 'Log In'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* 1-Click Demo Accounts */}
      <div className="pt-4 border-t border-forest-100 space-y-3">
        <span className="text-[11px] font-bold text-forest-500 uppercase tracking-wider block text-center">
          Or 1-Click Demo Accounts:
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickLogin('student@travelpaglu.com', 'student123')}
            className="p-2.5 rounded-xl border border-forest-200 bg-forest-50/70 hover:bg-forest-100 text-forest-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition text-left"
          >
            <GraduationCap className="w-4 h-4 text-forest-600" />
            <span>Student Demo</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin('admin@travelpaglu.com', 'admin123')}
            className="p-2.5 rounded-xl border border-terracotta-200 bg-terracotta-50/70 hover:bg-terracotta-100 text-terracotta-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition text-left"
          >
            <ShieldCheck className="w-4 h-4 text-terracotta-600" />
            <span>Admin Demo</span>
          </button>
        </div>
      </div>

      {/* Signup Link */}
      <div className="text-center pt-2">
        <p className="text-xs text-forest-600">
          New to TravelPaglu?{' '}
          <Link href="/signup" className="font-bold text-terracotta-600 hover:underline">
            Create an account
          </Link>
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
                <p className="text-xs text-forest-600">Loading login...</p>
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
