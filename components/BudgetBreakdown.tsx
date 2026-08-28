'use client';

import React from 'react';
import { BudgetItem, BudgetCategory } from '@/types';
import { IndianRupee, Wallet, Tag, Info, CheckCircle2 } from 'lucide-react';

interface BudgetBreakdownProps {
  items: BudgetItem[];
  totalPerPerson: number;
  destinationName: string;
}

const CATEGORY_STYLES: Record<BudgetCategory, { bg: string; text: string; border: string }> = {
  Travel: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Stay: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  Food: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  'Local Transport': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Misc: { bg: 'bg-stone-100', text: 'text-stone-700', border: 'border-stone-200' },
};

export default function BudgetBreakdown({ items, totalPerPerson, destinationName }: BudgetBreakdownProps) {
  return (
    <div className="rounded-3xl bg-white border border-forest-100 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-forest-800 via-forest-700 to-forest-900 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/60 border border-forest-600 text-xs font-semibold text-earth-300">
              <Wallet className="w-3.5 h-3.5 text-terracotta-400" />
              Transparent Trip Economics
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-earth-50">
              Real Budget Breakdown for {destinationName}
            </h3>
            <p className="text-xs sm:text-sm text-forest-200">
              Every single rupee accounted for based on actual on-the-ground expenses.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-forest-950/80 border border-forest-600/50 backdrop-blur-md text-right shrink-0">
            <span className="text-[11px] font-semibold text-earth-300 uppercase tracking-wider block">
              Grand Total Per Person
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-earth-50 flex items-center justify-end font-serif mt-0.5">
              <IndianRupee className="w-7 h-7 -mr-1" />
              {totalPerPerson.toLocaleString()}
            </div>
            <span className="text-[10px] text-forest-300 mt-1 block">
              Inclusive of return transit + stay + food
            </span>
          </div>
        </div>
      </div>

      {/* Itemized Table */}
      <div className="p-6 sm:p-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-forest-100 text-xs uppercase font-semibold text-forest-500 tracking-wider">
                <th className="py-3 px-4">Expense Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Approx Cost (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-50 text-sm font-medium text-forest-900">
              {items.map((item, idx) => {
                const style = CATEGORY_STYLES[item.category] || CATEGORY_STYLES.Misc;
                return (
                  <tr key={idx} className="hover:bg-forest-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-forest-950 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-forest-500 shrink-0" />
                      {item.label}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border}`}
                      >
                        <Tag className="w-3 h-3" />
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-forest-900">
                      ₹{item.amount.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-forest-200 bg-forest-50/80 font-bold text-forest-950">
                <td colSpan={2} className="py-4 px-4 text-base">
                  Estimated Total per Traveler
                </td>
                <td className="py-4 px-4 text-right text-lg text-terracotta-600 font-extrabold font-serif">
                  ₹{totalPerPerson.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Budget Travel Tip Box */}
        <div className="mt-6 p-4 rounded-2xl bg-earth-50 border border-earth-200 flex items-start gap-3 text-xs sm:text-sm text-earth-900">
          <Info className="w-5 h-5 text-earth-700 shrink-0 mt-0.5" />
          <p>
            <strong>TravelPaglu Guarantee:</strong> This budget is realistic for students sharing hostel dorms or homestay rooms and eating at local food stalls. If you travel with a friend or group of 2-4, local transport and stay costs can decrease by another 10-15%.
          </p>
        </div>
      </div>
    </div>
  );
}
