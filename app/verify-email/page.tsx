'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, Mail, ArrowRight, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      setSuccess('Email verified successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login?verified=true');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to resend OTP');
      }

      setSuccess('A new 6-digit OTP has been sent to your email.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-clay border border-forest-100 space-y-6 text-center">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-forest-900">Invalid Request</h2>
        <p className="text-sm text-forest-600">No email address provided for verification.</p>
        <Link href="/signup" className="inline-block py-2 px-4 rounded-xl bg-forest-700 text-white font-bold text-sm">
          Return to Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-clay border border-forest-100 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-terracotta-500 to-terracotta-400 flex items-center justify-center text-white mx-auto shadow-md">
          <Mail className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
          Verify Your Email
        </h2>
        <p className="text-xs sm:text-sm text-forest-600">
          We've sent a 6-digit OTP to <strong>{email}</strong>
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">{error}</div>
        </div>
      )}

      {success && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">{success}</div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-center">
        <div>
          <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-2">
            Enter 6-Digit Code
          </label>
          <input
            type="text"
            required
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // only numbers
            placeholder="000000"
            className="w-full max-w-[200px] mx-auto text-center py-3 text-2xl tracking-[0.5em] font-mono bg-forest-50 border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          className="w-full py-3 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
          <span>{loading ? 'Verifying...' : 'Verify Email & Activate'}</span>
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-xs text-forest-600">
          Didn't receive the code?{' '}
          <button
            onClick={handleResend}
            disabled={resending}
            className="font-bold text-terracotta-600 hover:underline disabled:opacity-50"
          >
            {resending ? 'Resending...' : 'Resend OTP'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f3]">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <Suspense
            fallback={
              <div className="p-8 bg-white rounded-3xl text-center space-y-2">
                <Loader2 className="w-6 h-6 animate-spin mx-auto text-forest-600" />
                <p className="text-xs text-forest-600">Loading...</p>
              </div>
            }
          >
            <VerifyEmailContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
