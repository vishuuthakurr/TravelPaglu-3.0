'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Upload, Image as ImageIcon, Check, Loader2 } from 'lucide-react';
import { HowToReachItem, StayOption, FoodItem, LocalTravelOption, PlaceToVisit, BudgetItem, GalleryPhoto, BudgetCategory } from '@/types';

// Helper image uploader component
export function ImageUploader({
  value,
  onChange,
  label = 'Image URL or Upload',
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-forest-800">{label}</label>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or upload local image"
          className="flex-1 px-3 py-1.5 text-xs bg-white border border-forest-200 rounded-lg focus:ring-2 focus:ring-forest-500 focus:outline-none"
        />
        <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-forest-100 hover:bg-forest-200 text-forest-800 text-xs font-semibold flex items-center gap-1.5 transition border border-forest-300">
          {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
          <span>{uploading ? 'Uploading...' : 'Upload'}</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>
      {value && (
        <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-forest-200 mt-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}

// 1. How To Reach Repeater
export function HowToReachRepeater({
  items,
  onChange,
}: {
  items: HowToReachItem[];
  onChange: (items: HowToReachItem[]) => void;
}) {
  const addRow = () => {
    onChange([
      ...items,
      {
        mode: '',
        steps: '',
        costPerPerson: 0,
        notes: '',
      },
    ]);
  };

  const removeRow = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: keyof HowToReachItem, val: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-lg font-bold text-forest-900">How to Reach (Transport Options)</h4>
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-forest-700 text-white hover:bg-forest-800 transition"
        >
          <Plus className="w-3.5 h-3.5" /> Add Route Mode
        </button>
      </div>

      {items.length === 0 && (
        <p className="text-xs text-forest-500 italic p-3 bg-forest-50/50 rounded-xl border border-dashed border-forest-200">
          No routes added yet. Click &quot;Add Route Mode&quot; to add bus, train, or flight steps.
        </p>
      )}

      {items.map((item, idx) => (
        <div key={idx} className="p-4 rounded-2xl bg-forest-50/60 border border-forest-200 space-y-3 relative">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-forest-700 uppercase tracking-wide">Route Option #{idx + 1}</span>
            <button
              type="button"
              onClick={() => removeRow(idx)}
              className="text-red-500 hover:text-red-700 p-1"
              title="Remove route"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-forest-800">Transport Mode Title</label>
              <input
                type="text"
                value={item.mode}
                onChange={(e) => updateRow(idx, 'mode', e.target.value)}
                placeholder="e.g. HRTC Ordinary / Volvo Bus from Delhi"
                className="w-full px-3 py-1.5 text-xs bg-white border border-forest-200 rounded-lg focus:ring-2 focus:ring-forest-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-forest-800">Cost Per Person (INR)</label>
              <input
                type="number"
                value={item.costPerPerson}
                onChange={(e) => updateRow(idx, 'costPerPerson', Number(e.target.value))}
                placeholder="850"
                className="w-full px-3 py-1.5 text-xs bg-white border border-forest-200 rounded-lg focus:ring-2 focus:ring-forest-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-forest-800">Step-by-step route directions</label>
            <textarea
              rows={2}
              value={item.steps}
              onChange={(e) => updateRow(idx, 'steps', e.target.value)}
              placeholder="e.g. Kashmiri Gate ISBT -> Overnight Bus -> Manali Private Bus Stand"
              className="w-full px-3 py-1.5 text-xs bg-white border border-forest-200 rounded-lg focus:ring-2 focus:ring-forest-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-forest-800">Booking / Safety Notes</label>
            <input
              type="text"
              value={item.notes}
              onChange={(e) => updateRow(idx, 'notes', e.target.value)}
              placeholder="e.g. Book 3 days prior on official state portal."
              className="w-full px-3 py-1.5 text-xs bg-white border border-forest-200 rounded-lg focus:ring-2 focus:ring-forest-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// 2. Stay Repeater (Budget & Premium)
export function StayRepeater({
  stay,
  onChange,
}: {
  stay: { budget: StayOption[]; premium: StayOption[] };
  onChange: (stay: { budget: StayOption[]; premium: StayOption[] }) => void;
}) {
  const addStay = (type: 'budget' | 'premium') => {
    onChange({
      ...stay,
      [type]: [...stay[type], { name: '', type, price: '', notes: '' }],
    });
  };

  const removeStay = (type: 'budget' | 'premium', index: number) => {
    onChange({
      ...stay,
      [type]: stay[type].filter((_, i) => i !== index),
    });
  };

  const updateStay = (type: 'budget' | 'premium', index: number, field: keyof StayOption, val: string) => {
    const updated = [...stay[type]];
    updated[index] = { ...updated[index], [field]: val };
    onChange({ ...stay, [type]: updated });
  };

  return (
    <div className="space-y-6">
      <h4 className="font-serif text-lg font-bold text-forest-900">Stay Options</h4>

      {/* Budget Stays */}
      <div className="space-y-3 p-4 rounded-2xl bg-amber-50/40 border border-amber-200">
        <div className="flex items-center justify-between">
          <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
            Budget-Friendly Hostels / Homestays
          </h5>
          <button
            type="button"
            onClick={() => addStay('budget')}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-700 text-white hover:bg-amber-800"
          >
            <Plus className="w-3.5 h-3.5" /> Add Budget Stay
          </button>
        </div>

        {stay.budget.map((item, idx) => (
          <div key={idx} className="p-3 bg-white rounded-xl border border-amber-200 space-y-2 relative">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-semibold text-amber-800">Budget Option #{idx + 1}</span>
              <button
                type="button"
                onClick={() => removeStay('budget', idx)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Stay Name (e.g. Zostel Old Manali)"
                value={item.name}
                onChange={(e) => updateStay('budget', idx, 'name', e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-amber-200 rounded-lg focus:ring-1 focus:ring-amber-500"
              />
              <input
                type="text"
                placeholder="Price (e.g. ₹450 - ₹700 / night)"
                value={item.price}
                onChange={(e) => updateStay('budget', idx, 'price', e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-amber-200 rounded-lg focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <input
              type="text"
              placeholder="Short note (location, vibe, Wi-Fi, bonfire)"
              value={item.notes}
              onChange={(e) => updateStay('budget', idx, 'notes', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-amber-200 rounded-lg focus:ring-1 focus:ring-amber-500"
            />
          </div>
        ))}
      </div>

      {/* Premium Stays */}
      <div className="space-y-3 p-4 rounded-2xl bg-forest-50/50 border border-forest-200">
        <div className="flex items-center justify-between">
          <h5 className="text-xs font-bold text-forest-900 uppercase tracking-wider">
            Premium / Best View Cottages & Resorts
          </h5>
          <button
            type="button"
            onClick={() => addStay('premium')}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-forest-700 text-white hover:bg-forest-800"
          >
            <Plus className="w-3.5 h-3.5" /> Add Premium Stay
          </button>
        </div>

        {stay.premium.map((item, idx) => (
          <div key={idx} className="p-3 bg-white rounded-xl border border-forest-200 space-y-2 relative">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-semibold text-forest-800">Premium Option #{idx + 1}</span>
              <button
                type="button"
                onClick={() => removeStay('premium', idx)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Resort Name"
                value={item.name}
                onChange={(e) => updateStay('premium', idx, 'name', e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-forest-200 rounded-lg focus:ring-1 focus:ring-forest-500"
              />
              <input
                type="text"
                placeholder="Price (e.g. ₹3,500 - ₹5,000 / night)"
                value={item.price}
                onChange={(e) => updateStay('premium', idx, 'price', e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-forest-200 rounded-lg focus:ring-1 focus:ring-forest-500"
              />
            </div>
            <input
              type="text"
              placeholder="Short note (mountain view, jacuzzi, luxury amenities)"
              value={item.notes}
              onChange={(e) => updateStay('premium', idx, 'notes', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-forest-200 rounded-lg focus:ring-1 focus:ring-forest-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Food Items Repeater
export function FoodRepeater({
  items,
  onChange,
}: {
  items: FoodItem[];
  onChange: (items: FoodItem[]) => void;
}) {
  const addRow = () => {
    onChange([...items, { name: '', price: '', notes: '', isVeg: true }]);
  };

  const removeRow = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: keyof FoodItem, val: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-lg font-bold text-forest-900">Foodings (Must-Try Local Food)</h4>
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800"
        >
          <Plus className="w-3.5 h-3.5" /> Add Food Item
        </button>
      </div>

      {items.map((item, idx) => (
        <div key={idx} className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-emerald-900">Dish #{idx + 1}</span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1 text-xs cursor-pointer text-emerald-900 font-medium">
                <input
                  type="checkbox"
                  checked={item.isVeg !== false}
                  onChange={(e) => updateRow(idx, 'isVeg', e.target.checked)}
                  className="rounded text-emerald-600"
                />
                Pure Veg
              </label>
              <button
                type="button"
                onClick={() => removeRow(idx)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Dish Name (e.g. Authentic Siddu with Ghee)"
              value={item.name}
              onChange={(e) => updateRow(idx, 'name', e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-white border border-emerald-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
            />
            <input
              type="text"
              placeholder="Approx Cost (e.g. ₹80 - ₹120)"
              value={item.price}
              onChange={(e) => updateRow(idx, 'price', e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-white border border-emerald-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <input
            type="text"
            placeholder="Where to eat / notes (e.g. Local auntie stall in Old Manali)"
            value={item.notes}
            onChange={(e) => updateRow(idx, 'notes', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-emerald-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      ))}
    </div>
  );
}

// 4. Local Travel Repeater
export function LocalTravelRepeater({
  items,
  onChange,
}: {
  items: LocalTravelOption[];
  onChange: (items: LocalTravelOption[]) => void;
}) {
  const addRow = () => {
    onChange([...items, { mode: '', price: '', notes: '' }]);
  };

  const removeRow = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: keyof LocalTravelOption, val: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-lg font-bold text-forest-900">Local Travelling Options</h4>
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-700 text-white hover:bg-purple-800"
        >
          <Plus className="w-3.5 h-3.5" /> Add Transport Mode
        </button>
      </div>

      {items.map((item, idx) => (
        <div key={idx} className="p-3 bg-purple-50/40 rounded-xl border border-purple-200 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-purple-900">Transport Option #{idx + 1}</span>
            <button
              type="button"
              onClick={() => removeRow(idx)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Mode (e.g. Rented Scooty / Shared E-Rickshaw)"
              value={item.mode}
              onChange={(e) => updateRow(idx, 'mode', e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-white border border-purple-200 rounded-lg focus:ring-1 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Rates (e.g. ₹500/day + petrol)"
              value={item.price}
              onChange={(e) => updateRow(idx, 'price', e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-white border border-purple-200 rounded-lg focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <input
            type="text"
            placeholder="Pro tips / negotiation notes"
            value={item.notes || ''}
            onChange={(e) => updateRow(idx, 'notes', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-purple-200 rounded-lg focus:ring-1 focus:ring-purple-500"
          />
        </div>
      ))}
    </div>
  );
}

// 5. Places to Visit Repeater
export function PlacesRepeater({
  items,
  onChange,
}: {
  items: PlaceToVisit[];
  onChange: (items: PlaceToVisit[]) => void;
}) {
  const addRow = () => {
    onChange([...items, { name: '', image: '', blurb: '' }]);
  };

  const removeRow = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: keyof PlaceToVisit, val: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-lg font-bold text-forest-900">Where You Can Visit? (Attractions)</h4>
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-forest-700 text-white hover:bg-forest-800"
        >
          <Plus className="w-3.5 h-3.5" /> Add Attraction
        </button>
      </div>

      {items.map((item, idx) => (
        <div key={idx} className="p-3 bg-forest-50/40 rounded-xl border border-forest-200 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-forest-800">Attraction #{idx + 1}</span>
            <button
              type="button"
              onClick={() => removeRow(idx)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Attraction Name (e.g. Jogini Waterfall)"
              value={item.name}
              onChange={(e) => updateRow(idx, 'name', e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-white border border-forest-200 rounded-lg focus:ring-1 focus:ring-forest-500"
            />
            <ImageUploader
              value={item.image}
              onChange={(url) => updateRow(idx, 'image', url)}
              label="Attraction Image"
            />
          </div>

          <textarea
            rows={2}
            placeholder="Short blurb / what to expect / timings..."
            value={item.blurb}
            onChange={(e) => updateRow(idx, 'blurb', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-forest-200 rounded-lg focus:ring-1 focus:ring-forest-500"
          />
        </div>
      ))}
    </div>
  );
}

// 6. Pro Tips Repeater
export function ProTipsRepeater({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const addRow = () => {
    onChange([...items, '']);
  };

  const removeRow = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, val: string) => {
    const updated = [...items];
    updated[index] = val;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-lg font-bold text-forest-900">Pro Tips (Friend&apos;s Voice)</h4>
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-forest-700 text-white hover:bg-forest-800"
        >
          <Plus className="w-3.5 h-3.5" /> Add Pro Tip
        </button>
      </div>

      {items.map((tip, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <span className="text-xs font-bold text-terracotta-600 shrink-0">#{idx + 1}</span>
          <input
            type="text"
            placeholder="e.g. Never buy tourist snow suits on Mall Road; rent only if going into deep snow."
            value={tip}
            onChange={(e) => updateRow(idx, e.target.value)}
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-forest-200 rounded-lg focus:ring-1 focus:ring-forest-500"
          />
          <button
            type="button"
            onClick={() => removeRow(idx)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

// 7. Budget Items Repeater with Live Total
export function BudgetRepeater({
  items,
  onChange,
}: {
  items: BudgetItem[];
  onChange: (items: BudgetItem[]) => void;
}) {
  const addRow = () => {
    onChange([...items, { label: '', amount: 0, category: 'Misc' }]);
  };

  const removeRow = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: keyof BudgetItem, val: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  const grandTotal = items.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-serif text-lg font-bold text-forest-900">Budget Breakdown Items</h4>
          <span className="text-xs font-extrabold text-terracotta-600">
            Live Calculated Grand Total: ₹{grandTotal.toLocaleString()} Per Person
          </span>
        </div>
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-terracotta-600 text-white hover:bg-terracotta-700"
        >
          <Plus className="w-3.5 h-3.5" /> Add Budget Item
        </button>
      </div>

      {items.map((item, idx) => (
        <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center p-2.5 bg-forest-50/50 rounded-xl border border-forest-200">
          <div className="sm:col-span-6">
            <input
              type="text"
              placeholder="Expense Label (e.g. Return HRTC Bus)"
              value={item.label}
              onChange={(e) => updateRow(idx, 'label', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-forest-200 rounded-lg"
            />
          </div>
          <div className="sm:col-span-3">
            <select
              value={item.category}
              onChange={(e) => updateRow(idx, 'category', e.target.value as BudgetCategory)}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-forest-200 rounded-lg"
            >
              <option value="Travel">Travel</option>
              <option value="Stay">Stay</option>
              <option value="Food">Food</option>
              <option value="Local Transport">Local Transport</option>
              <option value="Misc">Misc</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <input
              type="number"
              placeholder="Amount (₹)"
              value={item.amount}
              onChange={(e) => updateRow(idx, 'amount', Number(e.target.value))}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-forest-200 rounded-lg"
            />
          </div>
          <div className="sm:col-span-1 text-right">
            <button
              type="button"
              onClick={() => removeRow(idx)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// 8. Photo Gallery Repeater (up to 9 photos)
export function GalleryRepeater({
  photos,
  onChange,
}: {
  photos: GalleryPhoto[];
  onChange: (photos: GalleryPhoto[]) => void;
}) {
  const addPhoto = () => {
    if (photos.length >= 9) {
      alert('Maximum 9 photos allowed in the gallery grid.');
      return;
    }
    onChange([...photos, { url: '', caption: '' }]);
  };

  const removePhoto = (index: number) => {
    onChange(photos.filter((_, i) => i !== index));
  };

  const updatePhoto = (index: number, field: keyof GalleryPhoto, val: string) => {
    const updated = [...photos];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-serif text-lg font-bold text-forest-900">Photo Gallery (Max 9 for 3x3 Grid)</h4>
          <span className="text-xs text-forest-500">{photos.length}/9 photos added</span>
        </div>
        {photos.length < 9 && (
          <button
            type="button"
            onClick={addPhoto}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-forest-700 text-white hover:bg-forest-800"
          >
            <Plus className="w-3.5 h-3.5" /> Add Gallery Photo
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {photos.map((photo, idx) => (
          <div key={idx} className="p-3 bg-forest-50/50 rounded-xl border border-forest-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-forest-800">Photo #{idx + 1}</span>
              <button
                type="button"
                onClick={() => removePhoto(idx)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <ImageUploader
              value={photo.url}
              onChange={(url) => updatePhoto(idx, 'url', url)}
              label="Photo URL / Upload"
            />
            <input
              type="text"
              placeholder="Caption (e.g. Morning mist over Beas river)"
              value={photo.caption}
              onChange={(e) => updatePhoto(idx, 'caption', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-white border border-forest-200 rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
