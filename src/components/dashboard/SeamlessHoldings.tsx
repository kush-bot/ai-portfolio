'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpRight, TrendingUp } from 'lucide-react';

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
    sector: 'Oil & Gas / Energy',
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
    sector: 'Banking & Financials',
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
    sector: 'Banking & Financials',
    category: 'Equity',
    qty: 110,
    avgPrice: 1050.0,
    currentPrice: 1230.0,
    dayChangePct: 1.4,
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
    sector: 'Mutual Funds',
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
    sector: 'Gold Commodities',
    category: 'Gold/ETF',
    qty: 25,
    avgPrice: 5800.0,
    currentPrice: 7150.0,
    dayChangePct: 0.1,
  },
];

export function SeamlessHoldings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Equity', 'Mutual Fund', 'Gold/ETF'];

  const filteredHoldings = holdingsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sector.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="w-full bg-white py-6 space-y-6">
      {/* Table Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-950 font-sans tracking-tight">
            Portfolio Holdings ({holdingsData.length})
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Synced live from connected broker • Instant valuation updates
          </p>
        </div>

        {/* Category Pills & Search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search holding or sector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100/70 border-none rounded-full pl-9 pr-3 py-1.5 text-xs text-slate-950 placeholder:text-slate-400 focus:outline-none focus:bg-slate-100"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-full text-xs font-semibold">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-950 text-white'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Borderless Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-100 pb-3">
              <th className="py-3 px-2">Asset / Symbol</th>
              <th className="py-3 px-2">Sector</th>
              <th className="py-3 px-2 text-right">Qty</th>
              <th className="py-3 px-2 text-right">Avg Buy Price</th>
              <th className="py-3 px-2 text-right">LTP (NSE)</th>
              <th className="py-3 px-2 text-right">Current Value</th>
              <th className="py-3 px-2 text-right">Total P&L</th>
              <th className="py-3 px-2 text-right">1D Change</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100/80 bg-white">
            {filteredHoldings.map((item) => {
              const invested = item.qty * item.avgPrice;
              const currentVal = item.qty * item.currentPrice;
              const pnlVal = currentVal - invested;
              const pnlPct = (pnlVal / invested) * 100;
              const isProfit = pnlVal >= 0;

              return (
                <tr
                  key={item.symbol}
                  className="hover:bg-slate-50/70 transition-colors font-mono"
                >
                  {/* Stock Symbol */}
                  <td className="py-4 px-2 font-sans">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-950 text-white font-mono font-bold text-xs flex items-center justify-center">
                        {item.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-950 flex items-center gap-1.5">
                          {item.symbol}
                          <span className="text-[10px] font-bold text-slate-500">
                            {item.exchange}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans truncate max-w-[160px]">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Sector */}
                  <td className="py-4 px-2 font-sans">
                    <span className="text-[11px] text-slate-600 font-medium bg-slate-100/80 px-2.5 py-1 rounded-full">
                      {item.sector}
                    </span>
                  </td>

                  {/* Qty */}
                  <td className="py-4 px-2 text-right font-bold text-slate-950">
                    {item.qty.toLocaleString('en-IN')}
                  </td>

                  {/* Avg Price */}
                  <td className="py-4 px-2 text-right text-slate-500">
                    ₹{item.avgPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>

                  {/* LTP */}
                  <td className="py-4 px-2 text-right font-bold text-slate-950">
                    ₹{item.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>

                  {/* Current Value */}
                  <td className="py-4 px-2 text-right font-bold text-slate-950">
                    ₹{currentVal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>

                  {/* Total P&L */}
                  <td className="py-4 px-2 text-right">
                    <div
                      className={`font-bold ${
                        isProfit ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isProfit ? '+' : ''}₹
                      {pnlVal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`text-[10px] font-bold ${
                        isProfit ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isProfit ? '+' : ''}
                      {pnlPct.toFixed(2)}%
                    </div>
                  </td>

                  {/* 1D Change */}
                  <td className="py-4 px-2 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full font-bold text-[11px] ${
                        item.dayChangePct >= 0
                          ? 'text-emerald-700 bg-emerald-50'
                          : 'text-rose-700 bg-rose-50'
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
