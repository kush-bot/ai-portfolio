'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  ExternalLink,
  PieChart,
  Layers,
} from 'lucide-react';

export interface HoldingItem {
  symbol: string;
  name: string;
  exchange: 'NSE' | 'BSE';
  sector: string;
  category: 'Equity' | 'Mutual Fund' | 'Gold/ETF';
  qty: number;
  avgPrice: number;
  currentPrice: number;
  dayChangePct: number;
}

const holdingsData: HoldingItem[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    exchange: 'NSE',
    sector: 'Oil & Gas / Digital',
    category: 'Equity',
    qty: 85,
    avgPrice: 2740.0,
    currentPrice: 2980.5,
    dayChangePct: 1.25,
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    exchange: 'NSE',
    sector: 'Financial Services',
    category: 'Equity',
    qty: 150,
    avgPrice: 1520.0,
    currentPrice: 1645.2,
    dayChangePct: 0.85,
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    exchange: 'NSE',
    sector: 'IT & Software',
    category: 'Equity',
    qty: 45,
    avgPrice: 3850.0,
    currentPrice: 4210.0,
    dayChangePct: -0.45,
  },
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    exchange: 'NSE',
    sector: 'IT & Software',
    category: 'Equity',
    qty: 70,
    avgPrice: 1680.0,
    currentPrice: 1890.0,
    dayChangePct: 0.95,
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd.',
    exchange: 'NSE',
    sector: 'Financial Services',
    category: 'Equity',
    qty: 110,
    avgPrice: 1050.0,
    currentPrice: 1230.0,
    dayChangePct: 1.40,
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd.',
    exchange: 'NSE',
    sector: 'Automobile',
    category: 'Equity',
    qty: 120,
    avgPrice: 840.0,
    currentPrice: 1020.0,
    dayChangePct: 2.15,
  },
  {
    symbol: 'PPFCF',
    name: 'Parag Parikh Flexi Cap Fund',
    exchange: 'NSE',
    sector: 'Flexi Cap MF',
    category: 'Mutual Fund',
    qty: 1200,
    avgPrice: 58.2,
    currentPrice: 74.8,
    dayChangePct: 0.55,
  },
  {
    symbol: 'SGB2030',
    name: 'Sovereign Gold Bond 2030',
    exchange: 'NSE',
    sector: 'Commodity Gold',
    category: 'Gold/ETF',
    qty: 25,
    avgPrice: 5800.0,
    currentPrice: 7150.0,
    dayChangePct: 0.10,
  },
];

export function HoldingsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'value' | 'pnl' | 'name'>('value');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const categories = ['All', 'Equity', 'Mutual Fund', 'Gold/ETF'];

  const filteredHoldings = holdingsData
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sector.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    })
    .sort((a, b) => {
      const valA = a.qty * a.currentPrice;
      const valB = b.qty * b.currentPrice;
      const pnlA = (a.currentPrice - a.avgPrice) * a.qty;
      const pnlB = (b.currentPrice - b.avgPrice) * b.qty;

      if (sortBy === 'value') {
        return sortOrder === 'desc' ? valB - valA : valA - valB;
      }
      if (sortBy === 'pnl') {
        return sortOrder === 'desc' ? pnlB - pnlA : pnlA - pnlB;
      }
      return sortOrder === 'desc'
        ? b.symbol.localeCompare(a.symbol)
        : a.symbol.localeCompare(b.symbol);
    });

  return (
    <div className="w-full bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-foreground">User Holdings</h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-foreground border border-border">
              {holdingsData.length} Assets Synced
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Individual stock holdings, mutual funds, and bonds imported from your connected broker
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search box */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search symbol or sector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex bg-muted p-1 rounded-xl border border-border text-xs font-semibold">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-border bg-background">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 border-b border-border font-semibold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Instrument</th>
              <th className="py-3 px-4">Sector</th>
              <th className="py-3 px-4 text-right">Qty</th>
              <th className="py-3 px-4 text-right">Avg Price</th>
              <th className="py-3 px-4 text-right">LTP (NSE)</th>
              <th className="py-3 px-4 text-right">Current Value</th>
              <th className="py-3 px-4 text-right">Total P&L</th>
              <th className="py-3 px-4 text-right">1D Change</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border/60">
            {filteredHoldings.map((item) => {
              const invested = item.qty * item.avgPrice;
              const currentVal = item.qty * item.currentPrice;
              const pnlVal = currentVal - invested;
              const pnlPct = (pnlVal / invested) * 100;
              const isProfit = pnlVal >= 0;

              return (
                <tr
                  key={item.symbol}
                  className="hover:bg-card/70 transition-colors font-mono"
                >
                  {/* Symbol & Name */}
                  <td className="py-3 px-4 font-sans">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center font-bold text-xs text-primary font-mono shadow-2xs">
                        {item.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-foreground flex items-center gap-1">
                          {item.symbol}
                          <span className="text-[10px] font-normal text-muted-foreground border border-border/80 px-1 rounded">
                            {item.exchange}
                          </span>
                        </div>
                        <div className="text-[11px] text-muted-foreground truncate max-w-[140px]">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Sector */}
                  <td className="py-3 px-4 font-sans">
                    <span className="inline-block text-[11px] text-muted-foreground bg-muted/60 px-2 py-0.5 rounded">
                      {item.sector}
                    </span>
                  </td>

                  {/* Qty */}
                  <td className="py-3 px-4 text-right font-semibold text-foreground">
                    {item.qty.toLocaleString('en-IN')}
                  </td>

                  {/* Avg Price */}
                  <td className="py-3 px-4 text-right text-muted-foreground">
                    ₹{item.avgPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>

                  {/* LTP */}
                  <td className="py-3 px-4 text-right font-semibold text-foreground">
                    ₹{item.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>

                  {/* Current Value */}
                  <td className="py-3 px-4 text-right font-bold text-foreground">
                    ₹{currentVal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>

                  {/* Total P&L */}
                  <td className="py-3 px-4 text-right">
                    <div
                      className={`font-bold ${
                        isProfit ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isProfit ? '+' : ''}₹
                      {pnlVal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`text-[10px] font-semibold ${
                        isProfit ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isProfit ? '+' : ''}
                      {pnlPct.toFixed(2)}%
                    </div>
                  </td>

                  {/* 1D Change */}
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded font-semibold text-[11px] ${
                        item.dayChangePct >= 0
                          ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                          : 'text-rose-700 bg-rose-50 border border-rose-200'
                      }`}
                    >
                      {item.dayChangePct >= 0 ? '+' : ''}
                      {item.dayChangePct.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
