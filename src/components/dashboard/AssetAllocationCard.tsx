'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Layers } from 'lucide-react';

export function AssetAllocationCard() {
  const assetClasses = [
    { name: 'Equities (NSE Direct)', value: '₹13,28,600', pct: 72, color: 'bg-emerald-500' },
    { name: 'Mutual Funds', value: '₹3,32,150', pct: 18, color: 'bg-indigo-500' },
    { name: 'SGB & Gold ETFs', value: '₹1,47,630', pct: 8, color: 'bg-amber-500' },
    { name: 'Cash / Margin', value: '₹36,900', pct: 2, color: 'bg-slate-400' },
  ];

  const sectors = [
    { name: 'Financial Services', pct: 35, color: 'bg-blue-600' },
    { name: 'IT & Software', pct: 25, color: 'bg-emerald-600' },
    { name: 'Oil, Gas & Energy', pct: 20, color: 'bg-amber-600' },
    { name: 'Automobile', pct: 12, color: 'bg-purple-600' },
    { name: 'Gold & Others', pct: 8, color: 'bg-slate-500' },
  ];

  return (
    <div className="w-full bg-card border border-border rounded-2xl p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-primary" />
          <h3 className="text-base font-bold text-foreground">Asset & Sector Breakdown</h3>
        </div>
        <span className="text-xs text-muted-foreground">Diversification Score: 8.4/10</span>
      </div>

      {/* Stacked Progress Bar */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex justify-between">
          <span>Asset Allocation</span>
          <span>Total: 100%</span>
        </div>
        <div className="h-3.5 w-full bg-muted rounded-full overflow-hidden flex shadow-inner">
          {assetClasses.map((item) => (
            <div
              key={item.name}
              style={{ width: `${item.pct}%` }}
              className={`${item.color} h-full border-r border-background/20 transition-all duration-500`}
              title={`${item.name}: ${item.pct}%`}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {assetClasses.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-xs">
              <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
              <div className="truncate">
                <div className="font-semibold text-foreground truncate">{item.name}</div>
                <div className="text-[11px] text-muted-foreground font-mono">
                  {item.pct}% ({item.value})
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sector Allocation Breakdown */}
      <div className="space-y-3 pt-3 border-t border-border">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex justify-between">
          <span>Sector Exposure (NSE)</span>
          <span>5 Top Sectors</span>
        </div>
        <div className="space-y-2">
          {sectors.map((sec) => (
            <div key={sec.name} className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-foreground">{sec.name}</span>
                <span className="text-muted-foreground font-mono">{sec.pct}%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  style={{ width: `${sec.pct}%` }}
                  className={`h-full ${sec.color} rounded-full transition-all duration-500`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
