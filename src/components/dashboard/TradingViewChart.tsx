'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart2, Sparkles } from 'lucide-react';

declare global {
  interface Window {
    TradingView: any;
  }
}

interface SymbolOption {
  label: string;
  symbol: string;
  category: 'Index' | 'Stock';
}

const symbols: SymbolOption[] = [
  { label: 'NIFTY 50', symbol: 'NSE:NIFTY', category: 'Index' },
  { label: 'BANK NIFTY', symbol: 'NSE:BANKNIFTY', category: 'Index' },
  { label: 'SENSEX', symbol: 'BSE:SENSEX', category: 'Index' },
  { label: 'RELIANCE', symbol: 'NSE:RELIANCE', category: 'Stock' },
  { label: 'HDFC BANK', symbol: 'NSE:HDFCBANK', category: 'Stock' },
  { label: 'TCS', symbol: 'NSE:TCS', category: 'Stock' },
  { label: 'INFY', symbol: 'NSE:INFY', category: 'Stock' },
];

export function TradingViewChart() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('NSE:NIFTY');
  const containerId = 'tradingview_dashboard_widget';
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scriptElement: HTMLScriptElement | null = null;

    const loadWidget = () => {
      if (typeof window === 'undefined') return;

      const container = document.getElementById(containerId);
      if (!container) return;
      container.innerHTML = '';

      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: selectedSymbol,
          interval: 'D',
          timezone: 'Asia/Kolkata',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#ffffff',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: containerId,
          hide_side_toolbar: false,
          details: true,
          hotlist: true,
          calendar: true,
          studies: [
            'STD;MA%Ribbon',
            'STD;RSI',
          ],
        });
      } else {
        scriptElement = document.createElement('script');
        scriptElement.id = 'tradingview-widget-script';
        scriptElement.src = 'https://s3.tradingview.com/tv.js';
        scriptElement.async = true;
        scriptElement.onload = () => {
          if (window.TradingView) {
            new window.TradingView.widget({
              autosize: true,
              symbol: selectedSymbol,
              interval: 'D',
              timezone: 'Asia/Kolkata',
              theme: 'light',
              style: '1',
              locale: 'en',
              toolbar_bg: '#ffffff',
              enable_publishing: false,
              allow_symbol_change: true,
              container_id: containerId,
              hide_side_toolbar: false,
              details: true,
              hotlist: true,
              calendar: true,
              studies: [
                'STD;MA%Ribbon',
                'STD;RSI',
              ],
            });
          }
        };
        document.head.appendChild(scriptElement);
      }
    };

    loadWidget();

    return () => {
      const el = document.getElementById(containerId);
      if (el) el.innerHTML = '';
    };
  }, [selectedSymbol]);

  return (
    <div className="w-full bg-white py-4 space-y-4">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-950 font-sans tracking-tight">
              Live TradingView Technical Chart
            </h2>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Real-time NSE Data
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Full TradingView charting engine with technical indicators, drawing tools & NSE live feeds
          </p>
        </div>

        {/* Symbol Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/80 p-1 rounded-full text-xs font-semibold">
          {symbols.map((item) => (
            <button
              key={item.symbol}
              onClick={() => setSelectedSymbol(item.symbol)}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                selectedSymbol === item.symbol
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-950'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* TradingView Widget Container - 70% height canvas */}
      <div className="w-full h-[540px] sm:h-[580px] bg-white rounded-2xl overflow-hidden shadow-2xs">
        <div id={containerId} className="w-full h-full" ref={containerRef} />
      </div>
    </div>
  );
}
