'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface IndexItem {
  name: string;
  value: string;
  change: string;
  percent: string;
  isPositive: boolean;
}

const indicesData: IndexItem[] = [
  { name: 'NIFTY 50', value: '24,852.15', change: '+104.20', percent: '+0.42%', isPositive: true },
  { name: 'BANK NIFTY', value: '51,240.80', change: '+345.10', percent: '+0.68%', isPositive: true },
  { name: 'SENSEX', value: '81,350.20', change: '+280.40', percent: '+0.35%', isPositive: true },
  { name: 'NIFTY IT', value: '42,110.50', change: '-63.40', percent: '-0.15%', isPositive: false },
  { name: 'NIFTY SMALLCAP', value: '18,420.30', change: '+185.60', percent: '+1.02%', isPositive: true },
  { name: 'INDIA VIX', value: '13.42', change: '-0.38', percent: '-2.75%', isPositive: true },
];

export function MarketTicker() {
  return (
    <div className="w-full bg-card/60 border-b border-border py-2 px-4 backdrop-blur-sm overflow-x-auto no-scrollbar">
      <div className="container mx-auto max-w-7xl flex items-center justify-between gap-6 min-w-[700px]">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          NSE LIVE
        </div>

        <div className="flex items-center gap-6 flex-1 justify-around">
          {indicesData.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2 text-xs font-mono"
            >
              <span className="font-sans font-semibold text-foreground">{item.name}</span>
              <span className="text-foreground">{item.value}</span>
              <span
                className={`inline-flex items-center gap-0.5 font-medium px-1.5 py-0.5 rounded text-[11px] ${
                  item.isPositive
                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                    : 'text-rose-700 bg-rose-50 border border-rose-200'
                }`}
              >
                {item.isPositive ? (
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-rose-600" />
                )}
                {item.percent}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
