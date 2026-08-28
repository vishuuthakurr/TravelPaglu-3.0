import React from 'react';
import Navbar from '@/components/Navbar';
import IndiaMap from '@/components/IndiaMap';
import { getAllDestinations } from '@/lib/storage';
import Link from 'next/link';
import { Compass, Sparkles, MapPin, IndianRupee, ArrowRight, ShieldCheck, Heart, Flame, SunMedium, BookOpen, Mountain, Award } from 'lucide-react';
import SaveDestinationButton from '@/components/SaveDestinationButton';

export const revalidate = 0; // Dynamic server rendering

export default async function HomePage() {
  const destinations = await getAllDestinations();

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f3]">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Top Welcome & Interactive Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
            <span>Interactive 2.5D Experience</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest-950">
            Explore India Through Real Eyes
          </h1>
          <p className="text-xs sm:text-base text-forest-700 leading-relaxed">
            Hover over the map pins to preview student trip budgets, or dive into full personal travel diaries with step-by-step route directions.
          </p>
        </div>

        {/* 3-Column Layout: Left Rail | 2.5D India Map | Right Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Editorial Rail: Soul of India & Cultural Wisdom */}
          <aside className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            <div className="p-5 rounded-3xl bg-white border border-forest-100 shadow-clay space-y-3">
              <div className="flex items-center gap-2 text-forest-800 font-serif font-bold text-base">
                <SunMedium className="w-5 h-5 text-amber-600" />
                <span>The Spirit of the Journey</span>
              </div>
              <p className="text-xs text-forest-600 leading-relaxed">
                Traveling across India at a young age teaches adaptability, gratitude, and independence that no classroom or screen can replicate.
              </p>
              <div className="pt-2 border-t border-forest-50 text-[11px] text-forest-500 italic">
                &quot;The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.&quot;
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-gradient-to-br from-forest-800 to-forest-950 text-white shadow-clay space-y-3">
              <div className="flex items-center gap-2 text-earth-300 font-serif font-bold text-base">
                <Mountain className="w-5 h-5 text-terracotta-400" />
                <span>Respect the Mountains</span>
              </div>
              <p className="text-xs text-forest-200 leading-relaxed">
                TravelPaglu advocates for leave-no-trace journeys. Carry your trash back, support family-run homestays, and keep music off quiet trails.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-earth-50 border border-earth-200 space-y-3">
              <div className="flex items-center gap-2 text-earth-900 font-serif font-bold text-base">
                <Flame className="w-5 h-5 text-terracotta-600" />
                <span>Student Travel Rule</span>
              </div>
              <p className="text-xs text-earth-800 leading-relaxed">
                Always pre-book state government transport (HRTC, UPSRTC) over commercial tourist cabs to save up to 65% on inter-city transit.
              </p>
            </div>
          </aside>

          {/* Center Column: 2.5D India Map Canvas */}
          <div className="lg:col-span-6 order-1 lg:order-2 bg-white/70 backdrop-blur-md rounded-3xl p-4 sm:p-6 border border-forest-100 shadow-clay flex flex-col items-center">
            <div className="w-full flex items-center justify-between border-b border-forest-100 pb-3 mb-2 px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-terracotta-500" />
                <span>Interactive Destination Canvas</span>
              </span>
              <span className="text-[11px] font-semibold text-forest-500">
                {destinations.length} Verified Itineraries
              </span>
            </div>

            <IndiaMap destinations={destinations} />
          </div>

          {/* Right Editorial Rail: Heritage & Practical Tips */}
          <aside className="lg:col-span-3 space-y-6 order-3">
            <div className="p-5 rounded-3xl bg-white border border-forest-100 shadow-clay space-y-3">
              <div className="flex items-center gap-2 text-forest-800 font-serif font-bold text-base">
                <Award className="w-5 h-5 text-forest-600" />
                <span>No Influencer Fluff</span>
              </div>
              <p className="text-xs text-forest-600 leading-relaxed">
                Every price on TravelPaglu has been personally verified on ground. We don&apos;t accept free luxury stays in exchange for biased reviews.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-base">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <span>Living History</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                From the 3,000-year-old Ghats of Banaras to ancient wood-carved temples in Kullu, our guides reveal the living heritage behind every stop.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-forest-100 shadow-clay space-y-3">
              <div className="flex items-center gap-2 text-forest-800 font-serif font-bold text-base">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Safe First Solo Trips</span>
              </div>
              <p className="text-xs text-forest-600 leading-relaxed">
                Hostels with high security ratings, active student communities, and verified shared transit paths curated for first-time solo explorers.
              </p>
            </div>
          </aside>

        </div>

        {/* Quick Destination Cards Grid */}
        <section className="space-y-6 pt-6 border-t border-forest-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs uppercase font-bold text-terracotta-600 tracking-wider">
                Featured Guides
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 mt-0.5">
                Handcrafted First-Person Diaries
              </h2>
            </div>
            <Link
              href="/destinations"
              className="text-xs sm:text-sm font-bold text-forest-700 hover:text-terracotta-600 flex items-center gap-1 transition"
            >
              <span>View all destinations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <div
                key={dest.slug || dest._id}
                className="group rounded-3xl bg-white border border-forest-100 shadow-clay hover:shadow-xl transition-all overflow-hidden flex flex-col"
              >
                {/* Hero Image Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-black/20" />
                  
                  {/* State & Save Button */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-forest-950/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-white/20">
                      {dest.state}
                    </span>
                    <SaveDestinationButton destinationId={dest.slug} />
                  </div>

                  {/* Budget Badge */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md text-forest-900 text-xs font-extrabold flex items-center shadow-md">
                    <IndianRupee className="w-3.5 h-3.5 text-terracotta-500" />
                    <span>{dest.totalPerPerson?.toLocaleString()} Total Trip</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-forest-950 group-hover:text-terracotta-600 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-forest-600 line-clamp-2 italic">
                      &quot;{dest.quote}&quot;
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {dest.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-700 text-[10px] font-semibold border border-forest-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Action Link */}
                  <Link
                    href={`/destination/${dest.slug}`}
                    className="w-full py-2.5 rounded-xl bg-forest-50 hover:bg-forest-700 text-forest-800 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-forest-200 hover:border-transparent mt-2"
                  >
                    <span>Read Full Friend&apos;s Diary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
