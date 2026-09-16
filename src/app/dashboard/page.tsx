'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { SeamlessHeader } from '@/components/dashboard/SeamlessHeader';
import { MarketTicker } from '@/components/dashboard/MarketTicker';
import { SeamlessMetrics } from '@/components/dashboard/SeamlessMetrics';
import { SeamlessChart } from '@/components/dashboard/SeamlessChart';
import { TradingViewChart } from '@/components/dashboard/TradingViewChart';
import { SeamlessAIInsights } from '@/components/dashboard/SeamlessAIInsights';
import { SeamlessHoldings } from '@/components/dashboard/SeamlessHoldings';
import { Footer } from '@/components/layout/Footer';
import { CheckCircle2, Sparkles, TrendingUp, BarChart2 } from 'lucide-react';

type ChartTab = 'PORTFOLIO' | 'TRADINGVIEW';

function DashboardContent() {
  const searchParams = useSearchParams();
  const connectedBroker = searchParams.get('connected') || 'zerodha';
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeChartTab, setActiveChartTab] = useState<ChartTab>('PORTFOLIO');


  
useEffect(() => {
    const getHoldings = async () => {
        try {
            const response = await fetch(
                "http://localhost:4000/broker/get-holding",
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            const data = await response.json();

            console.log("Holdings:", data);
        } catch (error) {
            console.error("Failed to fetch holdings:", error);
        }
    };

    getHoldings();
}, []);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1000);
  };


  
  const formatBrokerName = (id: string) => {
    if (id === 'upstox') return 'Upstox';
    if (id === 'angel-one') return 'Angel One';
    return 'Zerodha';
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 font-sans selection:bg-slate-950 selection:text-white">
      <SeamlessHeader
        connectedBroker={connectedBroker}
        onSync={handleSync}
        isSyncing={isSyncing}
      />

      <MarketTicker />

      {/* Main Borderless Container */}
      <main className="flex-1 w-full max-w-[1650px] mx-auto px-6 lg:px-10 py-6 space-y-8 bg-white">
        {/* Connection Success Toast */}
        {searchParams.get('connected') && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 text-emerald-950"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">
                  Successfully linked {formatBrokerName(connectedBroker)}!
                </h4>
                <p className="text-xs text-emerald-800">
                  Your portfolio holdings, cost basis, and orders are live synced via read-only API.
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold bg-emerald-600 text-white px-3.5 py-1.5 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Sync Active
            </div>
          </motion.div>
        )}

        {/* Hero Borderless Metrics Section */}
        <section>
          <SeamlessMetrics connectedBroker={connectedBroker} />
        </section>

        {/* Chart Engine Switcher Tabs */}
        <section className="w-full space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Chart Engine
              </span>
            </div>

            <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-full text-xs font-semibold">
              <button
                onClick={() => setActiveChartTab('PORTFOLIO')}
                className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeChartTab === 'PORTFOLIO'
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Portfolio vs NSE Benchmark
              </button>

              <button
                onClick={() => setActiveChartTab('TRADINGVIEW')}
                className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeChartTab === 'TRADINGVIEW'
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
                TradingView Technical Engine
              </button>
            </div>
          </div>

          {/* Active Chart Component */}
          {activeChartTab === 'PORTFOLIO' ? (
            <SeamlessChart />
          ) : (
            <TradingViewChart />
          )}
        </section>

        {/* AI Diagnostics Callouts */}
        <section>
          <SeamlessAIInsights />
        </section>

        {/* Borderless Holdings Table */}
        <section>
          <SeamlessHoldings />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="flex items-center gap-2 text-sm text-slate-500 animate-pulse font-sans">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            Loading Portfolio AI Dashboard...
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
