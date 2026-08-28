'use client';

import React, { useState, useEffect } from 'react';
import { GalleryPhoto } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, Maximize2, Sparkles } from 'lucide-react';

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  destinationName: string;
}

export default function PhotoGallery({ photos, destinationName }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Ensure up to 9 photos
  const displayPhotos = photos.slice(0, 9);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev !== null ? (prev + 1) % displayPhotos.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev !== null ? (prev - 1 + displayPhotos.length) % displayPhotos.length : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, displayPhotos.length]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-forest-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-terracotta-600 font-semibold text-xs uppercase tracking-wider">
            <Camera className="w-4 h-4" />
            <span>Visual Travel Proof</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 mt-1">
            Real Photos from {destinationName}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-forest-600 max-w-sm">
          Authentic moments captured on the ground — genuine student adventure, real views, zero stock exaggerations.
        </p>
      </div>

      {/* 3x3 Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayPhotos.map((photo, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveIndex(idx)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-md bg-forest-900/10 border border-forest-100/80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={photo.caption || `Photo ${idx + 1} from ${destinationName}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Caption & Zoom Icon */}
            <div className="absolute inset-x-0 bottom-0 p-3.5 flex items-end justify-between gap-2 text-white">
              <p className="text-xs font-medium text-earth-100 line-clamp-2 drop-shadow-sm">
                {photo.caption || `Captured in ${destinationName}`}
              </p>
              <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-forest-950/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8"
          >
            {/* Top Bar */}
            <div className="w-full max-w-5xl flex items-center justify-between text-white py-2 z-10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-earth-300">
                <Sparkles className="w-4 h-4 text-terracotta-400" />
                <span>
                  Photo {activeIndex + 1} of {displayPhotos.length}
                </span>
              </div>
              <button
                onClick={() => setActiveIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image Container */}
            <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-auto">
              {/* Prev Button */}
              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev !== null ? (prev - 1 + displayPhotos.length) % displayPhotos.length : 0))
                }
                className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-terracotta-600 text-white transition z-20 backdrop-blur-sm shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Image */}
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative max-h-[75vh] max-w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={displayPhotos[activeIndex].url}
                  alt={displayPhotos[activeIndex].caption}
                  className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev !== null ? (prev + 1) % displayPhotos.length : 0))
                }
                className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-terracotta-600 text-white transition z-20 backdrop-blur-sm shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="w-full max-w-2xl text-center py-3">
              <p className="text-sm sm:text-base text-earth-100 font-serif italic">
                &quot;{displayPhotos[activeIndex].caption}&quot;
              </p>
              <p className="text-xs text-forest-300 mt-1">
                {destinationName} • Verified TravelPaglu Personal Trip
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
