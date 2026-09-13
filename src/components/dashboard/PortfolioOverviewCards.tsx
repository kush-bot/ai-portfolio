'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Wallet,
  ArrowUpRight,
  RefreshCw,
  Award,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface PortfolioOverviewProps {
  connectedBroker?: string;
}

export function PortfolioOverviewCards({ connectedBroker = 'Zerodha' }: PortfolioOverviewProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState('Just now');

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSynced('Just now');
    }, 1200);
  };

  const getBrokerBadge = (brokerId: string) => {
    switch (brokerId.toLowerCase()) {
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

  const brokerInfo = getBrokerBadge(connectedBroker);

  return (
    <div className="w-full space-y-4">
      {/* Top Header bar with Connection Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-card border border-border rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center border border-border">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-foreground">Equity & MF Portfolio</h2>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${brokerInfo.color}`}>
                ● {brokerInfo.name} Connected
              </span>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Read-only API access synced
              <span className="text-muted-foreground/60">•</span>
              <Clock className="w-3.5 h-3.5" />
              Last updated: {lastSynced}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-foreground bg-background hover:bg-muted border border-border rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Holdings'}
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Portfolio Value */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-2xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Portfolio Value
            </span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground font-mono tracking-tight">
              ₹18,45,280<span className="text-lg text-muted-foreground">.50</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <ArrowUpRight className="w-3 h-3" />
                +₹14,820.50 (0.81%)
              </span>
              <span className="text-[11px] text-muted-foreground">Today</span>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Invested & Total Returns */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Returns
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              +21.40%
            </span>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600 font-mono tracking-tight">
              +₹3,25,280<span className="text-lg">.50</span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/60 text-xs">
              <span className="text-muted-foreground">Invested Amount:</span>
              <span className="font-semibold text-foreground font-mono">₹15,20,000.00</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: XIRR / CAGR */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Portfolio XIRR
            </span>
            <span className="p-1.5 rounded-lg bg-primary/5 text-primary border border-border">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground font-mono tracking-tight">
              24.8% <span className="text-xs font-normal text-muted-foreground">p.a.</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-medium border border-emerald-200">
                +5.2% vs NIFTY 50
              </span>
              <span className="text-[11px] text-muted-foreground">Alpha</span>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Available Margin & Cash */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Cash & Margin
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">Uninvested</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground font-mono tracking-tight">
              ₹42,500<span className="text-lg text-muted-foreground">.00</span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/60 text-xs">
              <span className="text-muted-foreground">Dividend Yield:</span>
              <span className="font-semibold text-emerald-600 font-mono">1.48% (₹22.4k/yr)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
