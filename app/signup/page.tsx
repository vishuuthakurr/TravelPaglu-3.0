'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Compass,
  Lock,
  Mail,
  User,
  MapPin,
  Tag,
  ArrowRight,
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { validatePasswordStrength } from '@/lib/security';

const AVAILABLE_INTERESTS = [
  'Mountains',
  'Spiritual',
  'Budget',
  'Offbeat',
  'Treks',
  'Heritage',
  'Forests',
  'Beaches',
];

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [homeCity, setHomeCity] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Budget', 'Mountains']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleInterest = (tag: string) => {
    if (selectedInterests.includes(tag)) {
      setSelectedInterests(selectedInterests.filter((t) => t !== tag));
    } else {
      setSelectedInterests([...selectedInterests, tag]);
    }
  };

  const passValidation = validatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!passValidation.isValid) {
      setError(passValidation.message || 'Password must be at least 8 characters with a number or symbol.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          homeCity,
          interests: selectedInterests,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Redirect to verification page
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f3]">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-lg space-y-6">
          
          <div className="bg-white rounded-3xl p-8 shadow-clay border border-forest-100 space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-forest-700 to-terracotta-500 flex items-center justify-center text-white mx-auto shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
                Join TravelPaglu
              </h2>
              <p className="text-xs sm:text-sm text-forest-600">
                Start discovering first-hand student travel diaries and itemized budgets.
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
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priyanshu / Aarav"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:outline-none"
                  />
                  <User className="w-4 h-4 text-forest-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

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
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-forest-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
                  Password (min 8 characters)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters with numbers"
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:outline-none"
                  />
                  <Lock className="w-4 h-4 text-forest-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password.length > 0 && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-forest-100 rounded-full overflow-hidden flex gap-0.5">
                      <div
                        className={`h-full ${
                          passValidation.score >= 1
                            ? passValidation.score >= 3
                              ? 'bg-emerald-500 w-full'
                              : passValidation.score >= 2
                              ? 'bg-amber-500 w-2/3'
                              : 'bg-red-500 w-1/3'
                            : 'w-0'
                        } transition-all duration-300`}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-forest-600">
                      {passValidation.score >= 3 ? 'Strong' : passValidation.score >= 2 ? 'Medium' : 'Weak'}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
                  Home City <span className="text-forest-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={homeCity}
                    onChange={(e) => setHomeCity(e.target.value)}
                    placeholder="e.g. Delhi, Lucknow, Kanpur, Jaipur"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:outline-none"
                  />
                  <MapPin className="w-4 h-4 text-forest-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Travel Interests Tag Picker */}
              <div>
                <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-2">
                  Your Travel Vibe / Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_INTERESTS.map((tag) => {
                    const isSelected = selectedInterests.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => toggleInterest(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
                          isSelected
                            ? 'bg-forest-700 text-white shadow-xs'
                            : 'bg-forest-50 text-forest-700 hover:bg-forest-100 border border-forest-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 mt-4"
              >
                <span>{loading ? 'Securing Account...' : 'Create Account & Explore'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-xs text-forest-600">
                Already have an account?{' '}
                <Link href="/login" className="font-bold text-forest-800 hover:underline">
                  Log in
                </Link>
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
