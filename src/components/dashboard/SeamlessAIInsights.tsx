'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle, Zap, ShieldCheck } from 'lucide-react';

export function SeamlessAIInsights() {
  return (
    <div className="w-full bg-white py-6 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold text-slate-950 font-sans tracking-tight">
            AI Portfolio Diagnostics
          </h2>
        </div>
        <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
          Real-time Engine
        </span>
      </div>

      {/* Borderless Floating Callout Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Item 1 */}
        <div className="p-5 rounded-2xl bg-amber-50/60 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Sector Concentration Notice
          </div>
          <p className="text-xs text-amber-900/80 leading-relaxed">
            38% allocation in Banking & Financials (HDFC Bank & ICICI Bank). Rebalance 8% into IT or Healthcare to optimize volatility.
          </p>
        </div>

        {/* Item 2 */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
            <Zap className="w-4 h-4 text-emerald-600" />
            Tax Loss Harvesting Opportunity
          </div>
          <p className="text-xs text-emerald-900/80 leading-relaxed">
            ₹18,200 available in short-term tax loss harvesting before FY end to offset capital gain taxes.
          </p>
        </div>

        {/* Item 3 */}
        <div className="p-5 rounded-2xl bg-indigo-50/60 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            NSE Beta & Volatility Protection
          </div>
          <p className="text-xs text-indigo-900/80 leading-relaxed">
            Portfolio Beta is 0.92 vs NIFTY 50. Captured 118% upside of market surges while limiting drawdowns on dips.
          </p>
        </div>
      </div>
    </div>
  );
}
