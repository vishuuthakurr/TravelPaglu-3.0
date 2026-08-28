'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Destination } from '@/types';
import {
  ShieldCheck,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  MapPin,
  IndianRupee,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/admin');
    } else if (status === 'authenticated') {
      if ((session?.user as any)?.role !== 'admin') {
        router.push('/home');
      } else {
        loadDestinations();
      }
    }
  }, [status, session]);

  const loadDestinations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/destinations');
      const data = await res.json();
      if (Array.isArray(data)) {
        setDestinations(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/destinations/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDestinations(destinations.filter((d) => d._id !== id && d.id !== id && d.slug !== id));
      } else {
        alert('Failed to delete destination');
      }
    } catch (err) {
      alert('Error deleting destination');
    } finally {
      setDeletingId(null);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fbf8f3]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-forest-600 animate-spin mx-auto" />
            <p className="text-xs font-semibold text-forest-700">Loading Creator Admin CMS...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f3]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Top Header Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-forest-900 via-forest-800 to-forest-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-500/30 border border-terracotta-400/40 text-xs font-semibold text-earth-200">
              <ShieldCheck className="w-4 h-4 text-terracotta-400" />
              Creator CMS Dashboard
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth-50">
              Manage Travel Itineraries
            </h1>
            <p className="text-xs sm:text-sm text-forest-200">
              Publish new first-hand diaries, edit costs, update photos, and add pins to the India Map.
            </p>
          </div>

          <Link
            href="/admin/new"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-bold text-sm shadow-lg shadow-terracotta-600/30 hover:scale-105 transition-all shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Destination</span>
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-forest-100 shadow-clay">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-500">Live Destinations</span>
            <div className="text-3xl font-extrabold text-forest-900 font-serif mt-1">{destinations.length}</div>
            <span className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> All pinned on 2.5D Map
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-forest-100 shadow-clay">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-500">Creator Role</span>
            <div className="text-2xl font-bold text-terracotta-600 font-serif mt-1">Super Admin</div>
            <span className="text-xs text-forest-600 mt-1 block truncate">
              {session?.user?.email}
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-forest-100 shadow-clay">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-500">Fast Publishing</span>
            <div className="text-sm font-semibold text-forest-800 mt-2">
              Add How-To-Reach, Stays, Food, Pro Tips & Photos in one form.
            </div>
          </div>
        </div>

        {/* Destinations Table */}
        <div className="p-6 rounded-3xl bg-white border border-forest-100 shadow-clay space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-forest-900">Published Travel Guides</h3>
            <button
              onClick={loadDestinations}
              className="text-xs font-semibold text-forest-600 hover:text-forest-900 flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh List
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-forest-100 text-xs uppercase font-semibold text-forest-500 tracking-wider">
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4">Map Coordinates</th>
                  <th className="py-3 px-4">Total Cost</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-50 text-sm">
                {destinations.map((dest) => (
                  <tr key={dest.slug || dest._id} className="hover:bg-forest-50/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-forest-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-forest-900">{dest.name}</div>
                          <div className="text-xs text-forest-500 font-mono">/destination/{dest.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-forest-800">{dest.state}</td>
                    <td className="py-4 px-4 font-mono text-xs text-forest-600">
                      X: {dest.mapCoordinates?.x || 50}%, Y: {dest.mapCoordinates?.y || 50}%
                    </td>
                    <td className="py-4 px-4 font-bold text-terracotta-600">
                      ₹{dest.totalPerPerson?.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <Link
                        href={`/destination/${dest.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 p-2 rounded-lg bg-forest-50 text-forest-700 hover:bg-forest-100 text-xs font-semibold"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/admin/edit/${dest.slug}`}
                        className="inline-flex items-center gap-1 p-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-semibold"
                        title="Edit Destination"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDelete(dest.slug, dest.name)}
                        disabled={deletingId === dest.slug}
                        className="inline-flex items-center gap-1 p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold"
                        title="Delete Destination"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
