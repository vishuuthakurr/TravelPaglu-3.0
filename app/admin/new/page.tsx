'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import DestinationForm from '@/components/admin/DestinationForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, PlusCircle } from 'lucide-react';

export default function NewDestinationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return null;
  }

  if (status === 'unauthenticated' || (session?.user as any)?.role !== 'admin') {
    router.push('/admin');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f3]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-50 text-terracotta-800 text-xs font-semibold border border-terracotta-200">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create New Destination Page</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
            Add New Travel Itinerary
          </h1>
          <p className="text-xs sm:text-sm text-forest-600">
            Fill in the structured fields below to generate a new live `/destination/[slug]` page with interactive map pins and repeatable sections.
          </p>
        </div>

        {/* CMS Form */}
        <DestinationForm />

      </main>
    </div>
  );
}
