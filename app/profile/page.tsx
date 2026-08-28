'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Destination } from '@/types';
import Link from 'next/link';
import {
  User,
  MapPin,
  Heart,
  Tag,
  Mail,
  ShieldCheck,
  IndianRupee,
  ArrowRight,
  Compass,
  Sparkles,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import SaveDestinationButton from '@/components/SaveDestinationButton';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [wishlistDestinations, setWishlistDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/profile');
    } else if (status === 'authenticated') {
      loadWishlist();
    }
  }, [status]);

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/wishlist');
      const data = await res.json();
      if (data.destinations && Array.isArray(data.destinations)) {
        setWishlistDestinations(data.destinations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fbf8f3]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-forest-600 animate-spin mx-auto" />
            <p className="text-xs font-semibold text-forest-700">Loading your profile & saved trips...</p>
          </div>
        </div>
      </div>
    );
  }

  const user = session?.user as any;
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f3]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* User Profile Card */}
        <div className="p-8 rounded-3xl bg-white border border-forest-100 shadow-clay flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-forest-700 via-forest-600 to-terracotta-500 text-white font-serif text-3xl font-bold flex items-center justify-center shadow-md">
              {user?.name?.charAt(0) || 'U'}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
                  {user?.name}
                </h1>
                {isAdmin ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-terracotta-50 text-terracotta-700 border border-terracotta-200 text-[10px] font-bold uppercase tracking-wider">
                    Creator Admin
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-700 border border-forest-200 text-[10px] font-bold uppercase tracking-wider">
                    Student Traveler
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-forest-600">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-forest-400" />
                  {user?.email}
                </span>
                {user?.homeCity && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-forest-400" />
                    Home: {user.homeCity}
                  </span>
                )}
              </div>

              {/* Interests */}
              {user?.interests && user.interests.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {user.interests.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-700 text-[10px] font-semibold border border-forest-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {isAdmin && (
              <Link
                href="/admin"
                className="px-4 py-2.5 rounded-xl bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-800 text-xs font-bold border border-terracotta-200 transition flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-terracotta-600" />
                <span>Admin CMS</span>
              </Link>
            )}

            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold border border-red-200 transition flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Saved Destinations / Wishlist */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-terracotta-600 tracking-wider flex items-center gap-1.5">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>Personal Wishlist</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
                Your Saved Itineraries ({wishlistDestinations.length})
              </h2>
            </div>

            <Link
              href="/destinations"
              className="text-xs sm:text-sm font-bold text-forest-700 hover:text-terracotta-600 flex items-center gap-1"
            >
              <span>Explore more places</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {wishlistDestinations.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-forest-200 space-y-4">
              <Compass className="w-12 h-12 text-forest-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-forest-900">
                  No saved itineraries yet
                </h3>
                <p className="text-xs text-forest-600 max-w-sm mx-auto">
                  Browse destinations on the interactive map or catalog and click &quot;Save Itinerary&quot; to bookmark them here.
                </p>
              </div>
              <Link
                href="/home"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs shadow-md transition"
              >
                <span>Browse India Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistDestinations.map((dest) => (
                <div
                  key={dest.slug || dest._id}
                  className="group rounded-3xl bg-white border border-forest-100 shadow-clay hover:shadow-xl transition-all overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-black/20" />
                    
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-forest-950/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-white/20">
                        {dest.state}
                      </span>
                      <SaveDestinationButton destinationId={dest.slug} initialSaved={true} />
                    </div>

                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md text-forest-900 text-xs font-extrabold flex items-center shadow-md">
                      <IndianRupee className="w-3.5 h-3.5 text-terracotta-500" />
                      <span>₹{dest.totalPerPerson?.toLocaleString()} Total</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-bold text-forest-950 group-hover:text-terracotta-600 transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-forest-600 line-clamp-2 italic">
                        &quot;{dest.quote}&quot;
                      </p>
                    </div>

                    <Link
                      href={`/destination/${dest.slug}`}
                      className="w-full py-2.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>Open Travel Diary</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
