'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  AlertTriangle,
  Zap,
  ShieldCheck,
  PieChart,
  History,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
} from 'lucide-react';

export function UpstoxSidebarPanels() {
  const assetClasses = [
    { name: 'Equities (NSE)', value: '₹13.28L', pct: 72, color: 'bg-emerald-600' },
    { name: 'Mutual Funds', value: '₹3.32L', pct: 18, color: 'bg-indigo-600' },
    { name: 'Gold / SGB', value: '₹1.47L', pct: 8, color: 'bg-amber-500' },
    { name: 'Cash Margin', value: '₹0.36L', pct: 2, color: 'bg-slate-400' },
  ];

  const recentActivity = [
    {
      type: 'BUY',
      symbol: 'RELIANCE',
      qty: '10 Qty @ ₹2,980.50',
      time: 'Today, 11:30 AM',
      status: 'Executed (Zerodha)',
      isBuy: true,
    },
    {
      type: 'DIVIDEND',
      symbol: 'TCS',
      qty: '₹1,250.00 Credited',
      time: 'Yesterday',
      status: 'Bank Credit',
      isBuy: true,
    },
    {
      type: 'SIP',
      symbol: 'PPFCF',
      qty: '₹10,000.00 Invested',
      time: 'Sep 10',
      status: 'Auto Debited',
      isBuy: true,
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Panel 1: AI Diagnostics Card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-sans">
              AI Diagnostics
            </h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
            3 Recommendations
          </span>
        </div>

        <div className="p-4 space-y-3">
          {/* Diagnostic Item 1 */}
          <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Sector Concentration
              </span>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-mono">
                38% Banking
              </span>
            </div>
            <p className="text-[11px] text-amber-800 leading-normal">
              High exposure to Banking (HDFC & ICICI). Rebalance 8% into IT or Pharma to lower drawdowns.
            </p>
          </div>

          {/* Diagnostic Item 2 */}
          <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                Tax Loss Harvesting
              </span>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-mono">
                Save ₹18,200
              </span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-normal">
              Harvest short-term losses to offset realized capital gains before FY end.
            </p>
          </div>

          {/* Diagnostic Item 3 */}
          <div className="p-3 rounded-lg bg-indigo-50/70 border border-indigo-200 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-900">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                NSE Beta Protection
              </span>
              <span className="text-[10px] bg-indigo-200 text-indigo-900 px-1.5 py-0.5 rounded font-mono">
                Beta: 0.92
              </span>
            </div>
            <p className="text-[11px] text-indigo-800 leading-normal">
              Your portfolio captures 118% of market ups while limiting drawdowns on market drops.
            </p>
          </div>
        </div>
      </div>

      {/* Panel 2: Asset Allocation Breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900 font-sans">
              Asset Distribution
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-slate-700">100% Total</span>
        </div>

        <div className="p-4 space-y-3">
          {/* Progress stack */}
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
            {assetClasses.map((ac) => (
              <div
                key={ac.name}
                style={{ width: `${ac.pct}%` }}
                className={`${ac.color} h-full border-r border-white/30`}
              />
            ))}
          </div>

          {/* Asset legend items */}
          <div className="space-y-2 pt-1">
            {assetClasses.map((ac) => (
              <div key={ac.name} className="flex items-center justify-between text-xs border-b border-slate-100 pb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-sm ${ac.color}`} />
                  <span className="font-semibold text-slate-800">{ac.name}</span>
                </div>
                <div className="font-mono text-slate-900 font-bold">
                  {ac.pct}% <span className="text-slate-400 font-normal">({ac.value})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel 3: Recent Activity & Orders */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900 font-sans">
              Recent Synced Activity
            </h3>
          </div>
          <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
            Live Stream
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {recentActivity.map((act, idx) => (
            <div key={idx} className="p-3 hover:bg-slate-50 transition-colors flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-mono font-bold text-emerald-600">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    {act.symbol}
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-1 rounded">
                      {act.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">{act.qty}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] font-semibold text-slate-700">{act.time}</div>
                <div className="text-[10px] text-emerald-600 font-mono">{act.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
