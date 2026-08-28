'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Destination, StayCategory } from '@/types';
import {
  HowToReachRepeater,
  StayRepeater,
  FoodRepeater,
  LocalTravelRepeater,
  PlacesRepeater,
  ProTipsRepeater,
  BudgetRepeater,
  GalleryRepeater,
  ImageUploader,
} from './RepeatableFields';
import { Sparkles, Save, ArrowLeft, Loader2, CheckCircle2, MapPin } from 'lucide-react';
import Link from 'next/link';

interface DestinationFormProps {
  initialData?: Partial<Destination>;
  isEditing?: boolean;
}

export default function DestinationForm({ initialData, isEditing = false }: DestinationFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [state, setState] = useState(initialData?.state || '');
  const [heroImage, setHeroImage] = useState(initialData?.heroImage || '');
  const [quote, setQuote] = useState(initialData?.quote || '');
  const [quoteAuthor, setQuoteAuthor] = useState(initialData?.quoteAuthor || 'TravelPaglu Explorer');
  
  // Coordinates
  const [mapX, setMapX] = useState(initialData?.mapCoordinates?.x || 50);
  const [mapY, setMapY] = useState(initialData?.mapCoordinates?.y || 50);
  const [stateId, setStateId] = useState(initialData?.mapCoordinates?.stateId || '');

  // About
  const [aboutHistory, setAboutHistory] = useState(initialData?.about?.history || '');
  const [aboutCulture, setAboutCulture] = useState(initialData?.about?.culture || '');
  const [aboutGeography, setAboutGeography] = useState(initialData?.about?.geography || '');

  // Tags
  const [tagsInput, setTagsInput] = useState((initialData?.tags || ['Budget', 'Mountains']).join(', '));

  // Repeatable Sections
  const [howToReach, setHowToReach] = useState(
    initialData?.howToReach || [
      {
        mode: 'Direct Overnight Government Bus',
        steps: 'ISBT Bus Stand -> Overnight Express Bus -> Destination Bus Stand',
        costPerPerson: 750,
        notes: 'Book on official state transport portal.',
      },
    ]
  );

  const [stay, setStay] = useState<StayCategory>(
    initialData?.stay || {
      budget: [
        {
          name: 'Backpacker Hostel / Homestay',
          type: 'budget',
          price: '₹450 - ₹700 / night',
          notes: 'Clean dorm beds, good Wi-Fi, community bonfire.',
        },
      ],
      premium: [
        {
          name: 'Scenic Valley Cottage / Heritage Resort',
          type: 'premium',
          price: '₹3,500 - ₹5,000 / night',
          notes: 'Uninterrupted nature views and luxury amenities.',
        },
      ],
    }
  );

  const [food, setFood] = useState(
    initialData?.food || [
      {
        name: 'Local Signature Thali / Snack',
        price: '₹90 - ₹140',
        notes: 'Must-try at local market stalls.',
        isVeg: true,
      },
    ]
  );

  const [localTravel, setLocalTravel] = useState(
    initialData?.localTravel || [
      {
        mode: 'Rented Two-Wheeler / Shared Auto',
        price: '₹500/day + petrol or ₹20/ride',
        notes: 'Carry valid license or negotiate fixed auto fare.',
      },
    ]
  );

  const [placesToVisit, setPlacesToVisit] = useState(
    initialData?.placesToVisit || [
      {
        name: 'Main Scenic Attraction / Trek',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        blurb: 'A beautiful natural spot best visited during early morning golden hours.',
      },
    ]
  );

  const [proTips, setProTips] = useState<string[]>(
    initialData?.proTips || [
      'Always carry extra cash as mountain/remote ATMs often run out of power.',
      'Wake up at dawn to experience the peaceful atmosphere before crowds arrive.',
    ]
  );

  const [budgetItems, setBudgetItems] = useState(
    initialData?.budgetItems || [
      { label: 'Round-trip Bus / Train transit', amount: 1500, category: 'Travel' as const },
      { label: '2 Nights Backpacker Hostel (₹500/night)', amount: 1000, category: 'Stay' as const },
      { label: 'Local Food & Chai (3 days)', amount: 900, category: 'Food' as const },
      { label: 'Local Transport & Scooty', amount: 500, category: 'Local Transport' as const },
      { label: 'Entry passes & Misc', amount: 200, category: 'Misc' as const },
    ]
  );

  const [gallery, setGallery] = useState(
    initialData?.gallery || [
      {
        url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
        caption: 'Morning mist rolling through the hills.',
      },
      {
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        caption: 'Fresh water cascading down the forest trail.',
      },
      {
        url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
        caption: 'Traditional local wooden homes amidst apple trees.',
      },
    ]
  );

  // Auto-generate slug when name changes if not editing
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      setSlug(
        val
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !state.trim() || !heroImage.trim() || !quote.trim()) {
      alert('Please fill in Destination Name, State, Hero Image, and Quote.');
      return;
    }

    setSubmitting(true);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      state,
      mapCoordinates: {
        x: Number(mapX),
        y: Number(mapY),
        stateId: stateId || state.substring(0, 2).toUpperCase(),
      },
      heroImage,
      quote,
      quoteAuthor,
      about: {
        history: aboutHistory,
        culture: aboutCulture,
        geography: aboutGeography,
      },
      howToReach,
      stay,
      food,
      localTravel,
      placesToVisit,
      proTips,
      budgetItems,
      gallery,
      tags,
    };

    try {
      const url = isEditing ? `/api/destinations/${initialData?.slug || slug}` : '/api/destinations';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save destination');
      }

      // Success -> navigate to live page!
      router.push(`/destination/${payload.slug}`);
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Failed to save destination');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      
      {/* Top Bar with Back link & Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forest-100">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-700 hover:text-forest-950"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin CMS</span>
        </Link>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isEditing ? 'Save Changes' : 'Publish Live Destination'}</span>
        </button>
      </div>

      {/* 1. Core Header & Basic Details */}
      <div className="p-8 rounded-3xl bg-white border border-forest-100 shadow-clay space-y-6">
        <h3 className="font-serif text-xl font-bold text-forest-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-terracotta-600" />
          <span>1. Destination Core Info & Hero</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
              Destination Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Manali / Banaras / Rishikesh"
              className="w-full px-3.5 py-2 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. manali"
              className="w-full px-3.5 py-2 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500 font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
              State / UT *
            </label>
            <input
              type="text"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="e.g. Himachal Pradesh / Uttar Pradesh"
              className="w-full px-3.5 py-2 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500"
            />
          </div>
        </div>

        {/* Map Coordinates (Percentages for 2.5D SVG Map) */}
        <div className="p-4 rounded-2xl bg-forest-50/70 border border-forest-200 space-y-2">
          <span className="text-xs font-bold text-forest-800 uppercase tracking-wider">
            2.5D India Map Pin Location (% Coordinates 0 - 100)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-forest-700">Map X (Horizontal %)</label>
              <input
                type="number"
                min={5}
                max={95}
                value={mapX}
                onChange={(e) => setMapX(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-white border border-forest-200 rounded-lg"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-forest-700">Map Y (Vertical %)</label>
              <input
                type="number"
                min={5}
                max={95}
                value={mapY}
                onChange={(e) => setMapY(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-white border border-forest-200 rounded-lg"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-forest-700">State Code</label>
              <input
                type="text"
                placeholder="e.g. HP / UP / UK / RJ"
                value={stateId}
                onChange={(e) => setStateId(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-forest-200 rounded-lg uppercase"
              />
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <ImageUploader
          value={heroImage}
          onChange={(url) => setHeroImage(url)}
          label="Hero Full-Screen Image URL or File Upload *"
        />

        {/* Overlaid Quote */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
              Overlaid Friend&apos;s Personal Quote *
            </label>
            <input
              type="text"
              required
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="e.g. A quiet morning chai in Old Manali overlooking the Beas will heal things you didn't know were broken."
              className="w-full px-3.5 py-2 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500 font-serif italic"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
              Quote Author
            </label>
            <input
              type="text"
              value={quoteAuthor}
              onChange={(e) => setQuoteAuthor(e.target.value)}
              placeholder="e.g. Priyanshu (TravelPaglu Creator)"
              className="w-full px-3.5 py-2 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
            Category Tags (comma-separated)
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Mountains, Budget, Treks, Spiritual"
            className="w-full px-3.5 py-2 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500"
          />
        </div>
      </div>

      {/* 2. About Block: History, Culture, Geography */}
      <div className="p-8 rounded-3xl bg-white border border-forest-100 shadow-clay space-y-6">
        <h3 className="font-serif text-xl font-bold text-forest-900">
          2. About Block (Short, scannable paragraphs)
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
              History & Origins
            </label>
            <textarea
              rows={2}
              value={aboutHistory}
              onChange={(e) => setAboutHistory(e.target.value)}
              placeholder="Brief origin, sage/dynasty lore, trade route significance..."
              className="w-full px-3.5 py-2 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
              Living Culture
            </label>
            <textarea
              rows={2}
              value={aboutCulture}
              onChange={(e) => setAboutCulture(e.target.value)}
              placeholder="Local traditions, rituals, festivals, hospitality vibe..."
              className="w-full px-3.5 py-2 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
              Geography & Terrain
            </label>
            <textarea
              rows={2}
              value={aboutGeography}
              onChange={(e) => setAboutGeography(e.target.value)}
              placeholder="Altitude, valley layout, river banks, seasonal climate..."
              className="w-full px-3.5 py-2 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500"
            />
          </div>
        </div>
      </div>

      {/* 3. Repeatable Itinerary Sections */}
      <div className="p-8 rounded-3xl bg-white border border-forest-100 shadow-clay space-y-8">
        <h3 className="font-serif text-xl font-bold text-forest-900">
          3. Core Itinerary Modules
        </h3>

        {/* How To Reach */}
        <HowToReachRepeater items={howToReach} onChange={setHowToReach} />

        {/* Stays */}
        <StayRepeater stay={stay} onChange={setStay} />

        {/* Food */}
        <FoodRepeater items={food} onChange={setFood} />

        {/* Local Travel */}
        <LocalTravelRepeater items={localTravel} onChange={setLocalTravel} />

        {/* Places to Visit */}
        <PlacesRepeater items={placesToVisit} onChange={setPlacesToVisit} />

        {/* Pro Tips */}
        <ProTipsRepeater items={proTips} onChange={setProTips} />

        {/* Budget Breakdown with live grand total */}
        <BudgetRepeater items={budgetItems} onChange={setBudgetItems} />

        {/* Gallery (Max 9) */}
        <GalleryRepeater photos={gallery} onChange={setGallery} />
      </div>

      {/* Bottom Submit Button */}
      <div className="p-6 rounded-3xl bg-forest-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <h4 className="font-serif text-xl font-bold text-earth-100">Ready to Publish Itinerary?</h4>
          <p className="text-xs text-forest-300">
            Clicking publish will save the document to MongoDB and immediately add a pin to the India Map.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-bold text-sm shadow-md transition-all shrink-0"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isEditing ? 'Save & Update Live Page' : 'Publish New Destination'}</span>
        </button>
      </div>

    </form>
  );
}
