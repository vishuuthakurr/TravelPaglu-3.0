'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Sparkles, MapPin, ShieldCheck, Heart, ArrowRight, IndianRupee, BookOpen, Users, Mountain } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-forest-950 text-white">
      <Navbar />

      {/* Hero Section with Full-Bleed Nature Background & Ken Burns Effect */}
      <div className="relative flex-1 min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        
        {/* Background Image with Ken Burns zoom */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=90"
            alt="Scenic Mountain Majesty in India"
            className="w-full h-full object-cover object-center animate-kenburns brightness-[0.62] contrast-[1.08]"
          />
          {/* Gradient Lighting Layers */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-forest-950/30 to-forest-950/80" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 py-16">
          
          {/* Mission Chip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-earth-200 shadow-glow-emerald"
          >
            <Sparkles className="w-4 h-4 text-terracotta-400" />
            <span>Real Trips. Real Costs. Real People.</span>
          </motion.div>

          {/* Large Centered Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-earth-50 leading-[1.1] drop-shadow-lg"
          >
            TravelPaglu <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-earth-200 via-earth-300 to-terracotta-400 font-normal italic">
              Welcomes You
            </span>
          </motion.h1>

          {/* Subtitle / Mission Statement */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-2xl mx-auto text-base sm:text-xl text-earth-100/90 font-sans font-normal leading-relaxed drop-shadow"
          >
            No sponsored luxury resorts, no confusing YouTube clickbaits. Just authentic, first-hand personal travel diaries written like a trusted friend — complete with real bus numbers, exact homestays, must-eat local food, and student-proof budgets.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              href="/home"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-bold text-base shadow-lg shadow-terracotta-600/30 hover:scale-105 transition-all"
            >
              <span>Explore Interactive India Map</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/15 hover:bg-white/25 text-earth-100 backdrop-blur-md border border-white/25 font-semibold text-base transition-all"
            >
              <Users className="w-5 h-5 text-earth-300" />
              <span>Join Student Community</span>
            </Link>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-3 max-w-xl mx-auto pt-8 border-t border-white/10 text-center gap-4"
          >
            <div>
              <div className="text-xl sm:text-2xl font-bold font-serif text-earth-200">100%</div>
              <div className="text-[11px] sm:text-xs text-forest-300">First-Hand Verified</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-serif text-terracotta-400">₹3k - ₹5k</div>
              <div className="text-[11px] sm:text-xs text-forest-300">Average Student Budget</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-serif text-earth-200">0</div>
              <div className="text-[11px] sm:text-xs text-forest-300">Sponsored Fluff</div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Feature Pillars Section */}
      <div className="relative z-10 bg-[#fbf8f3] text-forest-950 py-20 px-4 sm:px-6 lg:px-8 border-t border-forest-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold text-terracotta-600 tracking-wider">
              Why TravelPaglu?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900">
              Built to Help Young India Explore Safely on a Real Budget
            </h2>
            <p className="text-sm sm:text-base text-forest-700">
              We replace endless contradictory blogs with clear, single-scroll truth written by travelers who actually walked the steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="p-8 rounded-3xl bg-white border border-forest-100 shadow-clay hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-700 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest-900">Personal Travel Diary Tone</h3>
              <p className="text-xs sm:text-sm text-forest-600 leading-relaxed">
                Written like a friend telling you what they did yesterday — which bus gate to board, which auntie serves the best Siddu, and which tourist traps to skip.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-3xl bg-white border border-forest-100 shadow-clay hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <IndianRupee className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest-900">Itemized Student Budgets</h3>
              <p className="text-xs sm:text-sm text-forest-600 leading-relaxed">
                Clear cost summaries broken down into transit, stay, food, and local travel with grand totals per traveler so you never get caught off-guard.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-3xl bg-white border border-forest-100 shadow-clay hover:shadow-xl transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest-900">Visual Proof & Lightbox</h3>
              <p className="text-xs sm:text-sm text-forest-600 leading-relaxed">
                Every destination includes a 3x3 photo proof gallery with captions highlighting genuine cultural experiences and nature journeys.
              </p>
            </div>
          </div>

          {/* Quick Destination Teasers */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-700/80 text-earth-300 text-xs font-semibold">
                <Mountain className="w-3.5 h-3.5" /> Featured Itineraries Live Now
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-earth-50">
                Explore Manali & Banaras First-Hand
              </h3>
              <p className="text-xs sm:text-sm text-forest-200 leading-relaxed">
                From morning temple bells on the Ganga to misty pine trails in Old Manali, discover verified routes and budget breakdowns ready to copy.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/destination/manali"
                className="px-5 py-3 rounded-full bg-white text-forest-900 hover:bg-earth-100 text-xs sm:text-sm font-bold shadow-md transition"
              >
                Manali Diary (₹4,800) →
              </Link>
              <Link
                href="/destination/banaras"
                className="px-5 py-3 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs sm:text-sm font-bold shadow-md transition"
              >
                Banaras Diary (₹3,000) →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-forest-950 text-forest-300 py-10 border-t border-forest-900 text-center text-xs space-y-2">
        <p className="font-serif text-sm font-bold text-earth-100">TravelPaglu • Real First-Hand Indian Itineraries</p>
        <p>© {new Date().getFullYear()} TravelPaglu. Inspiring healthy, adventurous budget travel across India.</p>
      </footer>
    </div>
  );
}
