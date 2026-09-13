'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight, ShieldCheck, Wallet, Activity } from 'lucide-react';

interface MetricsProps {
  connectedBroker?: string;
}

export function UpstoxProMetrics({ connectedBroker = 'Zerodha' }: MetricsProps) {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Strict Grid divided by borders */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
        {/* Metric 1: Total Net Worth */}
        <div className="p-4 flex flex-col justify-between bg-slate-50/40 hover:bg-slate-50/80 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>Portfolio Value</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tracking-tight">
              ₹18,45,280<span className="text-sm font-normal text-slate-500">.50</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +₹14,820.50 (+0.81%) Today
            </div>
          </div>
        </div>

        {/* Metric 2: Overall Returns */}
        <div className="p-4 flex flex-col justify-between hover:bg-slate-50/80 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>Overall Returns</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded border border-emerald-200">
              +21.40%
            </span>
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 tracking-tight">
              +₹3,25,280<span className="text-sm font-normal">.50</span>
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-1">
              Unrealized Capital Gains
            </div>
          </div>
        </div>

        {/* Metric 3: Today's P&L */}
        <div className="p-4 flex flex-col justify-between hover:bg-slate-50/80 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>Day's P&L</span>
            <span className="text-[10px] font-mono text-slate-400">NSE Live</span>
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 tracking-tight">
              +₹14,820<span className="text-sm font-normal">.50</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
              <span className="font-semibold text-slate-700 font-mono">+0.81%</span>
              <span>vs NIFTY +0.42%</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Total Invested */}
        <div className="p-4 flex flex-col justify-between hover:bg-slate-50/80 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>Invested Amount</span>
            <Wallet className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tracking-tight">
              ₹15,20,000<span className="text-sm font-normal text-slate-500">.00</span>
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-1">
              Across 8 Equity & MF assets
            </div>
          </div>
        </div>

        {/* Metric 5: XIRR */}
        <div className="p-4 flex flex-col justify-between hover:bg-slate-50/80 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>Portfolio XIRR</span>
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tracking-tight">
              24.8% <span className="text-xs font-normal text-slate-500">p.a.</span>
            </div>
            <div className="text-[11px] font-semibold text-emerald-600 mt-1">
              +5.2% Alpha vs NIFTY 50
            </div>
          </div>
        </div>

        {/* Metric 6: Cash & Margin */}
        <div className="p-4 flex flex-col justify-between bg-slate-50/40 hover:bg-slate-50/80 transition-colors">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>Available Margin</span>
            <span className="text-[10px] font-mono text-slate-400">Cash</span>
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tracking-tight">
              ₹42,500<span className="text-sm font-normal text-slate-500">.00</span>
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-1">
              Ready for fresh trades
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
