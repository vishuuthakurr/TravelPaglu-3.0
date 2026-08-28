'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SaveDestinationButtonProps {
  destinationId: string;
  initialSaved?: boolean;
}

export default function SaveDestinationButton({ destinationId, initialSaved = false }: SaveDestinationButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      fetch('/api/user/wishlist')
        .then((res) => res.json())
        .then((data) => {
          if (data.savedIds && Array.isArray(data.savedIds)) {
            setSaved(data.savedIds.includes(destinationId));
          }
        })
        .catch(() => {});
    }
  }, [session, destinationId]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      router.push('/login');
      return;
    }

    setLoading(true);
    const newSaved = !saved;
    setSaved(newSaved); // optimistic update

    try {
      const res = await fetch('/api/user/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destinationId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaved(!newSaved); // rollback
      }
    } catch (err) {
      setSaved(!newSaved);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm ${
        saved
          ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
          : 'bg-white/90 text-forest-800 border border-forest-200 hover:bg-forest-50 hover:text-rose-600'
      }`}
      title={saved ? 'Saved in your wishlist' : 'Save to wishlist'}
    >
      <Heart className={`w-4 h-4 transition-transform active:scale-125 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
      <span>{saved ? 'Saved in Wishlist' : 'Save Itinerary'}</span>
    </button>
  );
}
