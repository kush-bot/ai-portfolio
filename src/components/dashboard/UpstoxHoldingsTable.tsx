'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink,
  ChevronDown,
  PieChart,
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

export function UpstoxHoldingsTable() {
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

  const totalCurrentValue = holdingsData.reduce((acc, h) => acc + h.qty * h.currentPrice, 0);
  const totalInvestedValue = holdingsData.reduce((acc, h) => acc + h.qty * h.avgPrice, 0);
  const totalPnL = totalCurrentValue - totalInvestedValue;

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden space-y-0">
      {/* Table Toolbar Header */}
      <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 font-sans">
              Portfolio Holdings ({holdingsData.length})
            </h3>
            <span className="text-xs font-bold text-slate-700 bg-slate-200 border border-slate-300 px-2 py-0.5 rounded">
              NSE Live Quotes
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Synced from broker • Total Current: <span className="font-bold text-slate-900 font-mono">₹{totalCurrentValue.toLocaleString('en-IN')}</span> (P&L: <span className="font-bold text-emerald-600 font-mono">+₹{totalPnL.toLocaleString('en-IN')}</span>)
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search box */}
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search symbol or sector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex bg-white border border-slate-200 p-0.5 rounded-lg text-xs font-semibold shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Upstox Full Width Table with Strict Borders */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/90 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4 border-r border-slate-200/80">Asset / Stock</th>
              <th className="py-3 px-4 border-r border-slate-200/80">Sector</th>
              <th className="py-3 px-4 text-right border-r border-slate-200/80">Qty</th>
              <th className="py-3 px-4 text-right border-r border-slate-200/80">Avg Buy</th>
              <th className="py-3 px-4 text-right border-r border-slate-200/80">LTP (NSE)</th>
              <th className="py-3 px-4 text-right border-r border-slate-200/80">Invested</th>
              <th className="py-3 px-4 text-right border-r border-slate-200/80">Current Value</th>
              <th className="py-3 px-4 text-right border-r border-slate-200/80">Total P&L</th>
              <th className="py-3 px-4 text-right">1D Change</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {filteredHoldings.map((item) => {
              const invested = item.qty * item.avgPrice;
              const currentVal = item.qty * item.currentPrice;
              const pnlVal = currentVal - invested;
              const pnlPct = (pnlVal / invested) * 100;
              const isProfit = pnlVal >= 0;

              return (
                <tr
                  key={item.symbol}
                  className="hover:bg-slate-50/90 transition-colors font-mono"
                >
                  {/* Stock Symbol & Name */}
                  <td className="py-3 px-4 font-sans border-r border-slate-200/80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {item.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          {item.symbol}
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-1 rounded font-mono">
                            {item.exchange}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-sans truncate max-w-[160px]">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Sector */}
                  <td className="py-3 px-4 font-sans border-r border-slate-200/80">
                    <span className="inline-block text-[11px] text-slate-700 font-medium bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {item.sector}
                    </span>
                  </td>

                  {/* Qty */}
                  <td className="py-3 px-4 text-right font-bold text-slate-900 border-r border-slate-200/80">
                    {item.qty.toLocaleString('en-IN')}
                  </td>

                  {/* Avg Price */}
                  <td className="py-3 px-4 text-right text-slate-600 border-r border-slate-200/80">
                    ₹{item.avgPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>

                  {/* LTP */}
                  <td className="py-3 px-4 text-right font-bold text-slate-900 border-r border-slate-200/80">
                    ₹{item.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>

                  {/* Invested */}
                  <td className="py-3 px-4 text-right text-slate-600 border-r border-slate-200/80">
                    ₹{invested.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>

                  {/* Current Value */}
                  <td className="py-3 px-4 text-right font-bold text-slate-900 border-r border-slate-200/80">
                    ₹{currentVal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>

                  {/* Total P&L */}
                  <td className="py-3 px-4 text-right border-r border-slate-200/80">
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
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded font-bold text-[11px] ${
                        item.dayChangePct >= 0
                          ? 'text-emerald-800 bg-emerald-100 border border-emerald-300'
                          : 'text-rose-800 bg-rose-100 border border-rose-300'
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
