'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Destination } from '@/types';
import { Search, IndianRupee, MapPin, Tag, ArrowRight, Compass, Sparkles, Filter, X } from 'lucide-react';
import SaveDestinationButton from '@/components/SaveDestinationButton';

const FILTER_BUDGETS = [
  { label: 'All Budgets', max: undefined },
  { label: 'Under ₹3,500', max: 3500 },
  { label: 'Under ₹5,000', max: 5000 },
  { label: 'Under ₹10,000', max: 10000 },
];

const FILTER_TAGS = ['All', 'Mountains', 'Spiritual', 'Budget', 'Treks', 'Heritage', 'Offbeat'];

export default function DestinationsCatalogPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [search, setSearch] = useState('');
  const [selectedBudget, setSelectedBudget] = useState<number | undefined>(undefined);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, [search, selectedBudget, selectedTag]);

  const fetchDestinations = async () => {
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.append('search', search.trim());
      if (selectedBudget) params.append('maxBudget', selectedBudget.toString());
      if (selectedTag && selectedTag !== 'All') params.append('tag', selectedTag);

      const res = await fetch(`/api/destinations?${params.toString()}`);
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

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f3]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-terracotta-500" />
            <span>Curated First-Hand Catalog</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
            All First-Hand Itineraries
          </h1>
          <p className="text-xs sm:text-base text-forest-700 max-w-2xl">
            Filter by your available budget, preferred travel vibe, or state to discover real itineraries designed for students.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-6 rounded-3xl bg-white border border-forest-100 shadow-clay space-y-5">
          
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by city (Manali, Banaras), state, or keyword..."
              className="w-full pl-11 pr-10 py-3 text-sm bg-forest-50/40 border border-forest-200 rounded-2xl focus:ring-2 focus:ring-forest-500 focus:outline-none placeholder:text-forest-400"
            />
            <Search className="w-5 h-5 text-forest-500 absolute left-4 top-1/2 -translate-y-1/2" />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Chips (Budget & Tags) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-forest-100">
            {/* Budget Presets */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-700 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5" />
                Budget Ceiling
              </span>
              <div className="flex flex-wrap gap-2">
                {FILTER_BUDGETS.map((b, idx) => {
                  const isActive = selectedBudget === b.max;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedBudget(b.max)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? 'bg-forest-700 text-white shadow-xs'
                          : 'bg-forest-50 text-forest-800 hover:bg-forest-100 border border-forest-200'
                      }`}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Travel Vibe Tags */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-700 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                Travel Vibe
              </span>
              <div className="flex flex-wrap gap-1.5">
                {FILTER_TAGS.map((tag) => {
                  const isActive = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? 'bg-terracotta-600 text-white shadow-xs'
                          : 'bg-terracotta-50/70 text-terracotta-800 hover:bg-terracotta-100 border border-terracotta-200'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Results Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-forest-700 uppercase tracking-wider">
            <span>Showing {destinations.length} Verified Diaries</span>
          </div>

          {destinations.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-forest-200 space-y-3">
              <Compass className="w-10 h-10 text-forest-400 mx-auto animate-bounce" />
              <h3 className="font-serif text-xl font-bold text-forest-900">No destinations found</h3>
              <p className="text-xs text-forest-600">Try adjusting your budget or search filter terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest) => (
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
                      <SaveDestinationButton destinationId={dest.slug} />
                    </div>

                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md text-forest-900 text-xs font-extrabold flex items-center shadow-md">
                      <IndianRupee className="w-3.5 h-3.5 text-terracotta-500" />
                      <span>₹{dest.totalPerPerson?.toLocaleString()} Per Person</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-forest-950 group-hover:text-terracotta-600 transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-forest-600 line-clamp-2 italic">
                        &quot;{dest.quote}&quot;
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {dest.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-700 text-[10px] font-semibold border border-forest-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/destination/${dest.slug}`}
                      className="w-full py-2.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>Read Verified Diary</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
