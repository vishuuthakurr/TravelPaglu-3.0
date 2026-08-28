'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Destination } from '@/types';
import { MapPin, Sparkles, ArrowUpRight, IndianRupee, Compass } from 'lucide-react';
import Image from 'next/image';

interface IndiaMapProps {
  destinations: Destination[];
  activeFilter?: string;
  onSelectDestination?: (dest: Destination) => void;
}

export default function IndiaMap({ destinations, activeFilter, onSelectDestination }: IndiaMapProps) {
  const router = useRouter();
  const [hoveredDest, setHoveredDest] = useState<Destination | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handlePinClick = (dest: Destination) => {
    if (onSelectDestination) {
      onSelectDestination(dest);
    } else {
      router.push(`/destination/${dest.slug}`);
    }
  };

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] max-w-2xl mx-auto flex items-center justify-center p-2 select-none">
      
      {/* Background ambient glowing gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-100/40 via-earth-100/30 to-terracotta-100/20 rounded-3xl blur-2xl -z-10" />

      {/* 2.5D Map Container with depth transform */}
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Stylized SVG Map of India with 2.5D Layering & State Silhouettes */}
        <svg
          viewBox="0 0 800 950"
          className="w-full h-full filter drop-shadow-[0_25px_35px_rgba(31,66,55,0.22)] transition-transform duration-500 hover:scale-[1.01]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="indiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#244f41" />
              <stop offset="35%" stopColor="#327b62" />
              <stop offset="70%" stopColor="#449779" />
              <stop offset="100%" stopColor="#2a624f" />
            </linearGradient>

            <linearGradient id="stateHoverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f45834" />
              <stop offset="100%" stopColor="#bc2d10" />
            </linearGradient>

            <filter id="map3dGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="8" stdDeviation="6" floodColor="#0e241e" floodOpacity="0.35" />
            </filter>

            <pattern id="topoGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Semi-3D Base Shadow Path */}
          <path
            d="M 300 60 C 270 90, 220 150, 190 200 C 150 260, 120 340, 110 400 C 100 480, 120 540, 150 600 C 200 700, 300 820, 400 910 C 420 890, 500 760, 540 680 C 600 580, 680 480, 690 380 C 700 300, 620 220, 560 170 C 500 120, 440 80, 380 50 Z"
            fill="#0e241e"
            opacity="0.15"
            transform="translate(14, 24)"
          />

          {/* India Main Landmass Silhouette Geometry */}
          <g filter="url(#map3dGlow)">
            {/* Main Landform (Accurate Stylized Geo Polygons) */}
            <path
              id="india-main"
              d="M 310 50 
                 L 350 40 L 375 70 L 400 110 L 415 140 
                 L 460 160 L 510 165 L 560 180 L 610 195 
                 L 660 190 L 720 205 L 750 240 L 770 270 
                 L 750 310 L 720 325 L 690 310 L 670 335 
                 L 640 330 L 620 360 L 630 400 L 600 420 
                 L 570 410 L 550 435 L 540 480 L 560 520 
                 L 540 580 L 510 640 L 470 710 L 430 780 
                 L 400 850 L 390 880 L 380 850 L 340 760 
                 L 310 690 L 290 620 L 270 560 L 250 510 
                 L 220 480 L 170 470 L 130 440 L 100 400 
                 L 90 350 L 110 320 L 160 300 L 190 280 
                 L 220 230 L 240 170 L 270 120 L 290 80 Z"
              fill="url(#indiaGrad)"
              stroke="#67b395"
              strokeWidth="2.5"
              className="transition-all duration-300"
            />

            {/* Topography Mesh Overlay */}
            <path
              d="M 310 50 
                 L 350 40 L 375 70 L 400 110 L 415 140 
                 L 460 160 L 510 165 L 560 180 L 610 195 
                 L 660 190 L 720 205 L 750 240 L 770 270 
                 L 750 310 L 720 325 L 690 310 L 670 335 
                 L 640 330 L 620 360 L 630 400 L 600 420 
                 L 570 410 L 550 435 L 540 480 L 560 520 
                 L 540 580 L 510 640 L 470 710 L 430 780 
                 L 400 850 L 390 880 L 380 850 L 340 760 
                 L 310 690 L 290 620 L 270 560 L 250 510 
                 L 220 480 L 170 470 L 130 440 L 100 400 
                 L 90 350 L 110 320 L 160 300 L 190 280 
                 L 220 230 L 240 170 L 270 120 L 290 80 Z"
              fill="url(#topoGrid)"
              pointerEvents="none"
            />

            {/* Regional State Division Boundaries (Subtle Light Lines) */}
            <g stroke="#99d0b8" strokeWidth="1" opacity="0.45" fill="none">
              {/* Northern Ridge / Himachal / Ladakh */}
              <path d="M 270 120 Q 320 135 375 140 Q 410 150 440 155" />
              <path d="M 290 170 Q 330 190 390 195" />
              
              {/* Gangetic Plains / UP / Bihar */}
              <path d="M 240 240 Q 360 270 470 290 Q 560 305 630 330" />
              <path d="M 330 280 Q 420 340 540 370" />

              {/* Western / Rajasthan / Gujarat */}
              <path d="M 190 280 Q 240 330 260 410" />
              <path d="M 100 400 Q 160 385 220 430" />

              {/* Central Deccan / Maharashtra / MP */}
              <path d="M 250 440 Q 380 460 510 440" />
              <path d="M 220 480 Q 330 520 440 530" />

              {/* Southern Peninsula / Karnataka / Tamil Nadu / Kerala */}
              <path d="M 270 560 Q 350 600 420 620" />
              <path d="M 310 690 Q 370 700 420 730" />
              <path d="M 340 760 Q 380 770 400 820" />
              
              {/* North-East Corridor */}
              <path d="M 600 290 Q 640 295 680 305" />
              <path d="M 670 270 Q 720 280 745 285" />
            </g>
          </g>

          {/* Coastal Wave Ripples around Indian Ocean & Bay of Bengal */}
          <path
            d="M 80 430 Q 180 570 380 910 Q 580 570 710 390"
            fill="none"
            stroke="#99d0b8"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            opacity="0.3"
          />
        </svg>

        {/* Dynamic Pins Overlay (Positioned in percentage terms on the map) */}
        {destinations.map((dest) => {
          const isHovered = hoveredDest?.slug === dest.slug;
          
          return (
            <div
              key={dest.slug || dest._id}
              className="absolute z-20"
              style={{
                left: `${dest.mapCoordinates?.x || 50}%`,
                top: `${dest.mapCoordinates?.y || 50}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Glowing Pulse Ring */}
              <div
                onClick={() => handlePinClick(dest)}
                onMouseEnter={() => setHoveredDest(dest)}
                onMouseLeave={() => setHoveredDest(null)}
                className="relative cursor-pointer group"
              >
                {/* Ping wave */}
                <div className="absolute -inset-2.5 rounded-full bg-terracotta-500/40 animate-ping" />
                
                {/* Glow Core */}
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-terracotta-600 to-terracotta-400 border-2 border-white shadow-clay flex items-center justify-center text-white group-hover:scale-125 transition-transform duration-300">
                  <MapPin className="w-4 h-4 fill-white text-terracotta-600" />
                </div>

                {/* Always-visible Name Badge */}
                <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-forest-950/85 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 shadow-md flex items-center gap-1 group-hover:bg-terracotta-600 transition-colors">
                  <span>{dest.name}</span>
                  <span className="text-[9px] text-earth-300 font-normal">₹{dest.totalPerPerson?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Hover Tooltip / Floating Card Preview */}
        <AnimatePresence>
          {hoveredDest && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-72 sm:w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-forest-100 p-3.5 pointer-events-auto"
            >
              <div className="flex gap-3 items-center">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-forest-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={hoveredDest.heroImage}
                    alt={hoveredDest.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-serif font-bold text-forest-900 text-base truncate">
                      {hoveredDest.name}
                    </h4>
                    <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-forest-100 text-forest-800 shrink-0">
                      {hoveredDest.state}
                    </span>
                  </div>
                  <p className="text-xs text-forest-600 line-clamp-1 italic mt-0.5">
                    &quot;{hoveredDest.quote}&quot;
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-terracotta-600 flex items-center">
                      <IndianRupee className="w-3 h-3" />
                      {hoveredDest.totalPerPerson?.toLocaleString()} Total
                    </span>
                    <button
                      onClick={() => handlePinClick(hoveredDest)}
                      className="text-[11px] font-bold text-forest-700 hover:text-terracotta-600 flex items-center gap-0.5"
                    >
                      View Diary <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Map Helper Badge / Legend */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/85 backdrop-blur-md border border-forest-100 text-[11px] font-medium text-forest-800 shadow-xs">
        <Compass className="w-3.5 h-3.5 text-forest-600 animate-spin-slow" />
        <span>Click pins to view authentic diaries</span>
      </div>

    </div>
  );
}
