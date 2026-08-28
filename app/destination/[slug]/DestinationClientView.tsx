'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Destination } from '@/types';
import {
  Compass,
  MapPin,
  IndianRupee,
  Bus,
  Train,
  Plane,
  ChevronDown,
  BedDouble,
  Utensils,
  Car,
  Landmark,
  Lightbulb,
  Wallet,
  Sparkles,
  Camera,
  CheckCircle2,
  Clock,
  ArrowRight,
  Share2,
  Check,
} from 'lucide-react';
import BudgetBreakdown from '@/components/BudgetBreakdown';
import PhotoGallery from '@/components/PhotoGallery';
import StateMap from '@/components/StateMap';
import SaveDestinationButton from '@/components/SaveDestinationButton';

export default function DestinationClientView({ destination }: { destination: Destination }) {
  const [openRouteIdx, setOpenRouteIdx] = useState<number>(0);
  const [stayTab, setStayTab] = useState<'budget' | 'premium'>('budget');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const getTransportIcon = (mode: string) => {
    const lower = mode.toLowerCase();
    if (lower.includes('train') || lower.includes('express') || lower.includes('sleeper')) {
      return <Train className="w-5 h-5 text-blue-600" />;
    }
    if (lower.includes('flight') || lower.includes('air')) {
      return <Plane className="w-5 h-5 text-purple-600" />;
    }
    return <Bus className="w-5 h-5 text-emerald-600" />;
  };

  return (
    <div className="flex-1 space-y-16 pb-24">
      
      {/* 1. Hero Section: Full-Screen / Parallax with Overlaid Friend's Quote */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex items-end justify-center overflow-hidden">
        {/* Parallax / Scaled Hero Background */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover object-center animate-kenburns brightness-[0.7] contrast-[1.05]"
          />
          {/* Subtle multi-layer gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-black/30" />
        </div>

        {/* Hero Bottom Overlay */}
        <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 space-y-6 text-white text-center sm:text-left">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <span className="px-3.5 py-1 rounded-full bg-forest-950/80 backdrop-blur-md text-earth-300 text-xs font-bold uppercase tracking-wider border border-white/20 flex items-center gap-1.5 shadow-md">
              <MapPin className="w-3.5 h-3.5 text-terracotta-400" />
              {destination.state}
            </span>

            <span className="px-3.5 py-1 rounded-full bg-terracotta-600/90 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1 shadow-md">
              <IndianRupee className="w-3.5 h-3.5" />
              <span>₹{destination.totalPerPerson?.toLocaleString()} Total Trip</span>
            </span>

            <div className="flex items-center gap-2">
              <SaveDestinationButton destinationId={destination.slug} />
              
              <button
                onClick={handleShare}
                className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20 transition"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-earth-50 drop-shadow-lg">
              {destination.name}
            </h1>

            {/* Overlaid Personal Italic Quote */}
            <div className="p-4 sm:p-6 rounded-2xl bg-forest-950/60 backdrop-blur-md border border-white/15 max-w-3xl">
              <p className="font-serif text-lg sm:text-2xl italic text-earth-100 font-medium leading-snug drop-shadow-md">
                &quot;{destination.quote}&quot;
              </p>
              {destination.quoteAuthor && (
                <p className="text-xs sm:text-sm text-earth-300 mt-2 font-sans font-semibold">
                  — {destination.quoteAuthor}
                </p>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Main Itinerary Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 2. About Block: History, Culture, Geography */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-forest-700 font-semibold text-xs uppercase tracking-wider">
            <Landmark className="w-4 h-4 text-terracotta-600" />
            <span>Destination Context</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-forest-950">
            About {destination.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* History */}
            <div className="p-6 rounded-3xl bg-white border border-forest-100 shadow-clay space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-terracotta-500" />
                History & Origins
              </span>
              <p className="text-xs sm:text-sm text-forest-700 leading-relaxed">
                {destination.about?.history || 'Rich historic heritage and ancient travelers trading route.'}
              </p>
            </div>

            {/* Culture */}
            <div className="p-6 rounded-3xl bg-white border border-forest-100 shadow-clay space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-forest-600" />
                Living Culture
              </span>
              <p className="text-xs sm:text-sm text-forest-700 leading-relaxed">
                {destination.about?.culture || 'Vibrant rituals, mountain folklore, and warm community hospitality.'}
              </p>
            </div>

            {/* Geography */}
            <div className="p-6 rounded-3xl bg-white border border-forest-100 shadow-clay space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Geography & Terrain
              </span>
              <p className="text-xs sm:text-sm text-forest-700 leading-relaxed">
                {destination.about?.geography || 'Surrounded by pine-covered ridges, valleys, and sacred waters.'}
              </p>
            </div>
          </div>
        </section>

        {/* 3. Core Itinerary Sections IN ORDER */}

        {/* 3.1 "How to Reach?" Accordion */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-forest-700 font-semibold text-xs uppercase tracking-wider">
            <Bus className="w-4 h-4 text-emerald-600" />
            <span>Transit Directions</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-forest-950">
            How to Reach? (Step-by-Step)
          </h2>
          <p className="text-xs sm:text-sm text-forest-600">
            Tested routes with actual ticket fares and government bus timings to avoid private tourist gouging.
          </p>

          <div className="space-y-3 pt-2">
            {destination.howToReach.map((route, idx) => {
              const isOpen = openRouteIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-forest-100 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenRouteIdx(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-forest-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2.5 rounded-xl bg-forest-50 border border-forest-200 shrink-0">
                        {getTransportIcon(route.mode)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif font-bold text-forest-900 text-base sm:text-lg truncate">
                          {route.mode}
                        </h4>
                        <span className="text-xs text-forest-500">
                          Route Option {idx + 1}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="px-3 py-1 rounded-full bg-forest-100 text-forest-900 font-extrabold text-xs flex items-center">
                        ₹{route.costPerPerson} PP
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-forest-600 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-terracotta-600' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-forest-100 bg-forest-50/30 p-5 space-y-4"
                      >
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-forest-700 block mb-1">
                            Exact Directions:
                          </span>
                          <div className="p-3.5 rounded-xl bg-white border border-forest-200 text-xs sm:text-sm text-forest-900 font-medium leading-relaxed flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{route.steps}</span>
                          </div>
                        </div>

                        {route.notes && (
                          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                            <p>
                              <strong>Student Pro-Tip:</strong> {route.notes}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3.2 "Stay Options" (Budget-Friendly vs Premium / Best View) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2 text-forest-700 font-semibold text-xs uppercase tracking-wider">
                <BedDouble className="w-4 h-4 text-amber-600" />
                <span>Accommodation</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-forest-950 mt-0.5">
                Stay Options
              </h2>
            </div>

            {/* Tabs Switcher */}
            <div className="p-1 rounded-2xl bg-forest-100/80 border border-forest-200 flex gap-1">
              <button
                onClick={() => setStayTab('budget')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  stayTab === 'budget'
                    ? 'bg-white text-forest-950 shadow-sm'
                    : 'text-forest-700 hover:text-forest-950'
                }`}
              >
                🎒 Budget-Friendly (Dorms / Homestays)
              </button>
              <button
                onClick={() => setStayTab('premium')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  stayTab === 'premium'
                    ? 'bg-white text-forest-950 shadow-sm'
                    : 'text-forest-700 hover:text-forest-950'
                }`}
              >
                ✨ Premium / Best View
              </button>
            </div>
          </div>

          {/* Stay Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {(destination.stay?.[stayTab] || []).map((stay, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-forest-100 shadow-clay space-y-3 relative hover:border-forest-300 transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-forest-900">
                    {stay.name}
                  </h4>
                  <span className="px-2.5 py-1 rounded-full bg-earth-100 text-forest-900 font-bold text-xs shrink-0">
                    {stay.price}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-forest-600 leading-relaxed">
                  {stay.notes}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3.3 "Foodings" (Must-Try Local Food) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-forest-700 font-semibold text-xs uppercase tracking-wider">
            <Utensils className="w-4 h-4 text-emerald-600" />
            <span>Local Delicacies</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-forest-950">
            Foodings (Must-Try Local Feasts)
          </h2>
          <p className="text-xs sm:text-sm text-forest-600">
            Honest street spots and local mom-and-pop auntie stalls with genuine student prices.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {destination.food.map((dish, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-forest-100 shadow-clay flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif font-bold text-forest-950 text-base">
                      {dish.name}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold shrink-0 border border-emerald-200">
                      {dish.price}
                    </span>
                  </div>
                  <p className="text-xs text-forest-600 leading-relaxed">
                    {dish.notes}
                  </p>
                </div>

                <div className="pt-2 border-t border-forest-50 flex items-center gap-1.5 text-[11px] font-semibold text-forest-500">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      dish.isVeg !== false ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  <span>{dish.isVeg !== false ? 'Vegetarian' : 'Non-Vegetarian'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3.4 "Local Travelling Options" */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-forest-700 font-semibold text-xs uppercase tracking-wider">
            <Car className="w-4 h-4 text-purple-600" />
            <span>Internal Transit</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-forest-950">
            Local Travelling Options & Rates
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {destination.localTravel.map((option, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-forest-100 shadow-clay space-y-2 flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-serif font-bold text-forest-900 text-base">
                    {option.mode}
                  </h4>
                  <div className="text-sm font-extrabold text-terracotta-600 mt-1">
                    {option.price}
                  </div>
                </div>
                {option.notes && (
                  <p className="text-xs text-forest-600 leading-relaxed pt-2 border-t border-forest-50">
                    {option.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 3.5 "Where You Can Visit?" (Attractions Grid) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-forest-700 font-semibold text-xs uppercase tracking-wider">
            <Landmark className="w-4 h-4 text-forest-600" />
            <span>Nearby Sights</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-forest-950">
            Where You Can Visit?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {destination.placesToVisit.map((place, idx) => (
              <div
                key={idx}
                className="group rounded-3xl bg-white border border-forest-100 shadow-clay overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
                  <h4 className="absolute bottom-3 left-4 right-4 font-serif text-xl font-bold text-white drop-shadow">
                    {place.name}
                  </h4>
                </div>
                <div className="p-5 flex-1">
                  <p className="text-xs sm:text-sm text-forest-700 leading-relaxed">
                    {place.blurb}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3.6 "Pro Tips" (Personal Friend's Voice) */}
        <section className="space-y-4">
          <div className="p-8 rounded-3xl bg-earth-100/70 border border-earth-200 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-earth-900 font-semibold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-terracotta-600" />
              <span>Friend&apos;s Advice</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-earth-950">
              Pro Tips for {destination.name}
            </h2>
            <p className="text-xs sm:text-sm text-earth-800 italic">
              &quot;This is what I&apos;d tell my own best friend before getting on the bus:&quot;
            </p>

            <ul className="space-y-3 pt-2">
              {destination.proTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-earth-900">
                  <span className="w-5 h-5 rounded-full bg-earth-300 text-earth-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3.7 Budget Breakdown Table & Grand Total */}
        <BudgetBreakdown
          items={destination.budgetItems}
          totalPerPerson={destination.totalPerPerson}
          destinationName={destination.name}
        />

        {/* 3.8 Photo Gallery (3x3 Grid with Lightbox) */}
        <PhotoGallery
          photos={destination.gallery}
          destinationName={destination.name}
        />

        {/* 3.9 State-Level Interactive Outline Map */}
        <StateMap
          stateName={destination.state}
          stateCode={destination.stateMapHighlight}
          destinationName={destination.name}
        />

      </main>
    </div>
  );
}
