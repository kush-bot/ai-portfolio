'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import {
  Search,
  RefreshCw,
  Bell,
  SlidersHorizontal,
  ChevronDown,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface HeaderProps {
  connectedBroker?: string;
  onSync?: () => void;
  isSyncing?: boolean;
}

export function UpstoxDashboardHeader({
  connectedBroker = 'Zerodha',
  onSync,
  isSyncing = false,
}: HeaderProps) {
  const getBrokerBadge = (broker: string) => {
    switch (broker.toLowerCase()) {
      case 'zerodha':
        return { name: 'Zerodha', color: 'bg-red-50 text-red-600 border-red-200' };
      case 'upstox':
        return { name: 'Upstox', color: 'bg-purple-50 text-purple-600 border-purple-200' };
      case 'angel-one':
        return { name: 'Angel One', color: 'bg-orange-50 text-orange-600 border-orange-200' };
      default:
        return { name: 'Zerodha', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' };
    }
  };

  const badge = getBrokerBadge(connectedBroker);

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Brand + Search */}
        <div className="flex items-center gap-6 flex-1">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo />
            <span className="hidden sm:inline-block text-[11px] font-bold tracking-wider uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-300">
              PRO
            </span>
          </Link>

          {/* Quick NSE Search Bar */}
          <div className="relative max-w-md w-full hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search NSE stocks, indices, ETFs (e.g. RELIANCE, NIFTY 50)..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
            />
            <span className="absolute right-3 top-2 text-[10px] font-mono text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 bg-white">
              ⌘K
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 font-sans text-xs font-semibold">
          <Link
            href="/dashboard"
            className="px-3.5 py-2 text-slate-900 bg-slate-100 rounded-lg border border-slate-200 shadow-2xs"
          >
            Portfolio
          </Link>
          <Link
            href="/dashboard"
            className="px-3.5 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            NSE Watchlist
          </Link>
          <Link
            href="/dashboard"
            className="px-3.5 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            AI Diagnostics
          </Link>
          <Link
            href="/dashboard"
            className="px-3.5 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Orders & History
          </Link>
        </nav>

        {/* Right Actions & Broker Pill */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Broker Synced Pill */}
          <div className={`hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border ${badge.color}`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{badge.name} Synced</span>
          </div>

          {/* Refresh / Sync Holdings button */}
          <button
            onClick={onSync}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-all cursor-pointer disabled:opacity-50"
            title="Refresh Holdings from Broker API"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Sync'}</span>
          </button>

          <Link
            href="/connect-broker"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all shadow-xs"
          >
            + Connect Broker
          </Link>

          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center border border-slate-800">
            KN
          </div>
        </div>
      </div>
    </header>
  );
}
