'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, ShieldCheck, Wallet } from 'lucide-react';

interface MetricsProps {
  connectedBroker?: string;
}

export function SeamlessMetrics({ connectedBroker = 'Zerodha' }: MetricsProps) {
  return (
    <div className="w-full bg-white pt-4 pb-6 space-y-6 border-b border-slate-100">
      {/* Hero Net Worth Typography */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
            <span>TOTAL PORTFOLIO NET WORTH</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-950 tracking-tight font-mono">
              ₹18,45,280<span className="text-2xl text-slate-400">.50</span>
            </h1>

            <div className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              <ArrowUpRight className="w-4 h-4" />
              +₹14,820.50 (+0.81%) Today
            </div>
          </div>
        </div>

        {/* XIRR & Alpha Highlight */}
        <div className="flex items-center gap-6 text-sm">
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Portfolio XIRR</div>
            <div className="text-lg font-bold text-slate-950 font-mono mt-0.5">24.8% p.a.</div>
          </div>

          <div className="h-8 w-px bg-slate-200" />

          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">NSE Alpha</div>
            <div className="text-lg font-bold text-emerald-600 font-mono mt-0.5">+5.2% vs NIFTY 50</div>
          </div>
        </div>
      </div>

      {/* Horizontal Stats Row - Borderless */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
        <div>
          <div className="text-xs font-medium text-slate-400">Total Returns (Unrealized)</div>
          <div className="text-lg font-bold text-emerald-600 font-mono mt-1">
            +₹3,25,280<span className="text-xs font-normal">.50</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full ml-2">
              +21.40%
            </span>
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-400">Invested Capital</div>
          <div className="text-lg font-bold text-slate-900 font-mono mt-1">
            ₹15,20,000<span className="text-xs font-normal text-slate-400">.00</span>
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-400">1-Day Change (NSE Live)</div>
          <div className="text-lg font-bold text-emerald-600 font-mono mt-1">
            +₹14,820<span className="text-xs font-normal">.50</span>
            <span className="text-xs text-slate-500 font-sans ml-2">(+0.81%)</span>
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-400">Available Cash Margin</div>
          <div className="text-lg font-bold text-slate-900 font-mono mt-1">
            ₹42,500<span className="text-xs font-normal text-slate-400">.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
