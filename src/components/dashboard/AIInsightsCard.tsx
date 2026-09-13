'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle, ShieldCheck, Zap, ArrowRight, TrendingUp } from 'lucide-react';

export function AIInsightsCard() {
  return (
    <div className="w-full bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">AI Portfolio Intelligence</h3>
            <p className="text-xs text-muted-foreground">Automated health check & risk diagnostics</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
          Live Analysis
        </span>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Insight 1 */}
        <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Sector Concentration Alert
          </div>
          <p className="text-xs text-amber-900/80 leading-relaxed">
            Your portfolio has <strong>38%</strong> exposure to Banking & Financials (HDFC & ICICI). Consider rebalancing 8% into Healthcare/Pharma to reduce sector volatility.
          </p>
        </div>

        {/* Insight 2 */}
        <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <Zap className="w-4 h-4 text-emerald-600" />
            Tax Harvesting Opportunity
          </div>
          <p className="text-xs text-emerald-900/80 leading-relaxed">
            You have <strong>₹18,200</strong> in short-term tax loss harvesting opportunities that can offset realized capital gains before the financial year end.
          </p>
        </div>

        {/* Insight 3 */}
        <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-200/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-800">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            NIFTY Beta & Volatility
          </div>
          <p className="text-xs text-indigo-900/80 leading-relaxed">
            Portfolio Beta is <strong>0.92</strong> vs NIFTY 50. Your portfolio captured 118% of market ups while limiting drawdowns during market corrections.
          </p>
        </div>
      </div>
    </div>
  );
}
