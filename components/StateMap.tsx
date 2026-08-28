'use client';

import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface StateMapProps {
  stateName: string;
  stateCode?: string;
  destinationName: string;
}

export default function StateMap({ stateName, destinationName }: StateMapProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-forest-900 to-forest-950 text-white p-6 border border-forest-800 shadow-xl overflow-hidden relative">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-md space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800/80 border border-forest-700 text-xs font-semibold text-earth-300">
            <Navigation className="w-3.5 h-3.5 text-terracotta-400" />
            Regional State Map • {stateName}
          </div>
          <h3 className="font-serif text-2xl font-bold text-earth-50">
            Exploring {destinationName} in {stateName}
          </h3>
          <p className="text-xs sm:text-sm text-forest-200 leading-relaxed">
            All routes, stops, and transport rates in this diary are tailored for traveling within {stateName}.
          </p>
        </div>

        {/* State Outline SVG Graphic */}
        <div className="relative w-44 h-44 flex items-center justify-center bg-forest-800/40 rounded-2xl border border-forest-700/60 p-3">
          <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <defs>
              <linearGradient id="stateGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#449779" />
                <stop offset="100%" stopColor="#244f41" />
              </linearGradient>
            </defs>
            {/* Stylized State Polygon */}
            <path
              d="M 60 25 L 140 30 L 175 70 L 160 140 L 130 175 L 65 165 L 30 120 L 40 60 Z"
              fill="url(#stateGlow)"
              stroke="#99d0b8"
              strokeWidth="2"
            />
            {/* Topography contours */}
            <path
              d="M 50 60 Q 90 80 150 70 M 45 110 Q 100 130 145 125"
              fill="none"
              stroke="#ffffff33"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            {/* Pinned Destination Point */}
            <circle cx="105" cy="85" r="8" fill="#f45834" className="animate-ping opacity-75" />
            <circle cx="105" cy="85" r="5" fill="#f45834" stroke="#ffffff" strokeWidth="2" />
          </svg>

          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-forest-950/90 text-[10px] font-bold text-earth-200 border border-forest-700">
            {destinationName} Pin
          </div>
        </div>
      </div>
    </div>
  );
}
