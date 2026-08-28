'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import DestinationForm from '@/components/admin/DestinationForm';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { Destination } from '@/types';
import { Edit, RefreshCw } from 'lucide-react';

export default function EditDestinationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated' || (status === 'authenticated' && (session?.user as any)?.role !== 'admin')) {
      router.push('/home');
      return;
    }

    if (id) {
      fetch(`/api/destinations/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && !data.error) {
            setDestination(data);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id, status, session]);

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col bg-[#fbf8f3]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-forest-600 animate-spin mx-auto" />
            <p className="text-xs font-semibold text-forest-700">Loading Destination Details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fbf8f3]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-red-600">Destination not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f3]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
            <Edit className="w-3.5 h-3.5" />
            <span>Editing &quot;{destination.name}&quot;</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
            Edit Destination Itinerary
          </h1>
        </div>

        <DestinationForm initialData={destination} isEditing={true} />
      </main>
    </div>
  );
}
