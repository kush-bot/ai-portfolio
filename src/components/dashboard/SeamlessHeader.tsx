'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { RefreshCw, PlusCircle, Sparkles } from 'lucide-react';

interface HeaderProps {
  connectedBroker?: string;
  onSync?: () => void;
  isSyncing?: boolean;
}

export function SeamlessHeader({
  connectedBroker = 'Zerodha',
  onSync,
  isSyncing = false,
}: HeaderProps) {
  const getBrokerBadge = (broker: string) => {
    switch (broker.toLowerCase()) {
      case 'zerodha':
        return 'Zerodha';
      case 'upstox':
        return 'Upstox';
      case 'angel-one':
        return 'Angel One';
      default:
        return 'Zerodha';
    }
  };

  const brokerName = getBrokerBadge(connectedBroker);

  return (
    <header className="w-full bg-white text-slate-900 sticky top-0 z-50 py-4 transition-all">
      <div className="max-w-[1650px] mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">
        {/* Left Logo */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <Logo />
          </Link>

          {/* Minimal Borderless Nav Tabs */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/dashboard"
              className="text-slate-950 font-bold border-b-2 border-slate-950 pb-0.5"
            >
              Portfolio
            </Link>

            <Link
              href="/dashboard"
              className="text-slate-500 hover:text-slate-950 transition-colors"
            >
              Holdings
            </Link>

            <Link
              href="/dashboard"
              className="text-slate-500 hover:text-slate-950 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              AI Intelligence
            </Link>

            <Link
              href="/dashboard"
              className="text-slate-500 hover:text-slate-950 transition-colors"
            >
              NSE Market
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 text-xs font-medium">
          {/* Status Dot */}
          <div className="flex items-center gap-2 text-slate-600 bg-slate-100/70 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{brokerName} Synced</span>
          </div>

          <button
            onClick={onSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-950 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Refresh'}</span>
          </button>

          <Link
            href="/connect-broker"
            className="flex items-center gap-1.5 text-slate-950 hover:text-slate-600 transition-colors font-semibold"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Connect Broker
          </Link>

          <div className="w-8 h-8 rounded-full bg-slate-950 text-white font-mono font-bold text-xs flex items-center justify-center">
            KN
          </div>
        </div>
      </div>
    </header>
  );
}
