'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  BarChart2,
  Calendar,
  Layers,
  Maximize2,
  Minimize2,
  Sliders,
  Download,
  Eye,
  RefreshCw,
  Zap,
  Activity,
  CandlestickChart,
  LineChart,
} from 'lucide-react';

type TimeFrame = '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y' | 'ALL';
type ViewMode = 'BENCHMARK' | 'VALUE' | 'NSE_ONLY';
type ChartStyle = 'AREA' | 'CANDLE' | 'LINE';

interface CandlestickData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  niftyClose: number;
  portfolioPct: number;
  niftyPct: number;
  vol: number;
  isBull: boolean;
}

const timeframeCandles: Record<TimeFrame, CandlestickData[]> = {
  '1D': [
    { date: '09:15', open: 1830000, high: 1833000, low: 1828000, close: 1831500, niftyClose: 24750, portfolioPct: 0.08, niftyPct: 0.01, vol: 145, isBull: true },
    { date: '10:00', open: 1831500, high: 1836000, low: 1830000, close: 1834200, niftyClose: 24785, portfolioPct: 0.23, niftyPct: 0.15, vol: 210, isBull: true },
    { date: '11:00', open: 1834200, high: 1835000, low: 1830500, close: 1832100, niftyClose: 24760, portfolioPct: 0.11, niftyPct: 0.05, vol: 130, isBull: false },
    { date: '12:00', open: 1832100, high: 1838000, low: 1831800, close: 1836500, niftyClose: 24795, portfolioPct: 0.35, niftyPct: 0.19, vol: 260, isBull: true },
    { date: '13:00', open: 1836500, high: 1841000, low: 1836000, close: 1839800, niftyClose: 24820, portfolioPct: 0.53, niftyPct: 0.29, vol: 310, isBull: true },
    { date: '14:00', open: 1839800, high: 1843500, low: 1838500, close: 1842300, niftyClose: 24835, portfolioPct: 0.67, niftyPct: 0.35, vol: 390, isBull: true },
    { date: '15:00', open: 1842300, high: 1845800, low: 1841500, close: 1844500, niftyClose: 24845, portfolioPct: 0.77, niftyPct: 0.39, vol: 450, isBull: true },
    { date: '15:30', open: 1844500, high: 1846500, low: 1843000, close: 1845280, niftyClose: 24852, portfolioPct: 0.81, niftyPct: 0.42, vol: 520, isBull: true },
  ],
  '1W': [
    { date: 'Mon', open: 1812000, high: 1823000, low: 1809000, close: 1821500, niftyClose: 24680, portfolioPct: 0.52, niftyPct: 0.32, vol: 620, isBull: true },
    { date: 'Tue', open: 1821500, high: 1825000, low: 1815000, close: 1818000, niftyClose: 24650, portfolioPct: 0.33, niftyPct: 0.2, vol: 480, isBull: false },
    { date: 'Wed', open: 1818000, high: 1832000, low: 1816000, close: 1829000, niftyClose: 24720, portfolioPct: 0.94, niftyPct: 0.49, vol: 710, isBull: true },
    { date: 'Thu', open: 1829000, high: 1838000, low: 1827000, close: 1835000, niftyClose: 24790, portfolioPct: 1.27, niftyPct: 0.77, vol: 850, isBull: true },
    { date: 'Fri', open: 1835000, high: 1848000, low: 1834000, close: 1845280, niftyClose: 24852, portfolioPct: 1.84, niftyPct: 1.02, vol: 980, isBull: true },
  ],
  '1M': [
    { date: 'Aug 12', open: 1765000, high: 1775000, low: 1758000, close: 1772000, niftyClose: 24210, portfolioPct: 0.4, niftyPct: 0.25, vol: 1400, isBull: true },
    { date: 'Aug 16', open: 1772000, high: 1785000, low: 1768000, close: 1782000, niftyClose: 24300, portfolioPct: 0.96, niftyPct: 0.62, vol: 1650, isBull: true },
    { date: 'Aug 20', open: 1782000, high: 1788000, low: 1765000, close: 1770000, niftyClose: 24180, portfolioPct: 0.28, niftyPct: 0.12, vol: 1200, isBull: false },
    { date: 'Aug 26', open: 1770000, high: 1780000, low: 1762000, close: 1775000, niftyClose: 24220, portfolioPct: 0.57, niftyPct: 0.29, vol: 1350, isBull: true },
    { date: 'Aug 30', open: 1775000, high: 1805000, low: 1772000, close: 1798000, niftyClose: 24450, portfolioPct: 1.87, niftyPct: 1.24, vol: 1900, isBull: true },
    { date: 'Sep 03', open: 1798000, high: 1822000, low: 1795000, close: 1815000, niftyClose: 24600, portfolioPct: 2.83, niftyPct: 1.86, vol: 2100, isBull: true },
    { date: 'Sep 06', open: 1815000, high: 1828000, low: 1808000, close: 1822000, niftyClose: 24680, portfolioPct: 3.23, niftyPct: 2.19, vol: 1750, isBull: true },
    { date: 'Sep 09', open: 1822000, high: 1836000, low: 1819000, close: 1832000, niftyClose: 24780, portfolioPct: 3.8, niftyPct: 2.6, vol: 2300, isBull: true },
    { date: 'Sep 12', open: 1832000, high: 1848500, low: 1830000, close: 1845280, niftyClose: 24852, portfolioPct: 4.55, niftyPct: 2.91, vol: 2800, isBull: true },
  ],
  '3M': [
    { date: 'Jun 15', open: 1680000, high: 1700000, low: 1672000, close: 1695000, niftyClose: 23550, portfolioPct: 0.89, niftyPct: 0.64, vol: 2400, isBull: true },
    { date: 'Jul 01', open: 1695000, high: 1732000, low: 1690000, close: 1725000, niftyClose: 23900, portfolioPct: 2.68, niftyPct: 2.14, vol: 2800, isBull: true },
    { date: 'Jul 15', open: 1725000, high: 1758000, low: 1720000, close: 1750000, niftyClose: 24100, portfolioPct: 4.17, niftyPct: 2.99, vol: 3100, isBull: true },
    { date: 'Aug 01', open: 1750000, high: 1752000, low: 1728000, close: 1735000, niftyClose: 23950, portfolioPct: 3.27, niftyPct: 2.35, vol: 2300, isBull: false },
    { date: 'Aug 15', open: 1735000, high: 1788000, low: 1730000, close: 1780000, niftyClose: 24350, portfolioPct: 5.95, niftyPct: 4.06, vol: 3400, isBull: true },
    { date: 'Sep 01', open: 1780000, high: 1828000, low: 1775000, close: 1820000, niftyClose: 24650, portfolioPct: 8.33, niftyPct: 5.34, vol: 3900, isBull: true },
    { date: 'Sep 12', open: 1820000, high: 1848500, low: 1818000, close: 1845280, niftyClose: 24852, portfolioPct: 9.84, niftyPct: 6.2, vol: 4200, isBull: true },
  ],
  '1Y': [
    { date: 'Sep 23', open: 1520000, high: 1550000, low: 1510000, close: 1542000, niftyClose: 21600, portfolioPct: 1.45, niftyPct: 1.03, vol: 4500, isBull: true },
    { date: 'Nov 23', open: 1542000, high: 1585000, low: 1538000, close: 1575000, niftyClose: 21950, portfolioPct: 3.62, niftyPct: 2.67, vol: 5200, isBull: true },
    { date: 'Jan 24', open: 1575000, high: 1655000, low: 1570000, close: 1640000, niftyClose: 22600, portfolioPct: 7.89, niftyPct: 5.71, vol: 6100, isBull: true },
    { date: 'Mar 24', open: 1640000, high: 1645000, low: 1598000, close: 1610000, niftyClose: 22350, portfolioPct: 5.92, niftyPct: 4.54, vol: 4900, isBull: false },
    { date: 'May 24', open: 1610000, high: 1720000, low: 1605000, close: 1710000, niftyClose: 23100, portfolioPct: 12.5, niftyPct: 8.04, vol: 6800, isBull: true },
    { date: 'Jul 24', open: 1710000, high: 1795000, low: 1702000, close: 1785000, niftyClose: 24100, portfolioPct: 17.43, niftyPct: 12.72, vol: 7400, isBull: true },
    { date: 'Sep 24', open: 1785000, high: 1848500, low: 1780000, close: 1845280, niftyClose: 24852, portfolioPct: 21.4, niftyPct: 16.24, vol: 8500, isBull: true },
  ],
  '5Y': [
    { date: '2020', open: 980000, high: 1120000, low: 850000, close: 1080000, niftyClose: 13980, portfolioPct: 10.2, niftyPct: 8.5, vol: 9000, isBull: true },
    { date: '2021', open: 1080000, high: 1320000, low: 1060000, close: 1280000, niftyClose: 17350, portfolioPct: 30.6, niftyPct: 24.8, vol: 11500, isBull: true },
    { date: '2022', open: 1280000, high: 1420000, low: 1210000, close: 1380000, niftyClose: 18100, portfolioPct: 40.8, niftyPct: 30.2, vol: 10200, isBull: true },
    { date: '2023', open: 1380000, high: 1620000, low: 1360000, close: 1580000, niftyClose: 21730, portfolioPct: 61.2, niftyPct: 45.4, vol: 14000, isBull: true },
    { date: '2024', open: 1580000, high: 1848500, low: 1560000, close: 1845280, niftyClose: 24852, portfolioPct: 88.3, niftyPct: 66.5, vol: 18500, isBull: true },
  ],
  'ALL': [
    { date: '2019', open: 750000, high: 880000, low: 720000, close: 850000, niftyClose: 12150, portfolioPct: 0.0, niftyPct: 0.0, vol: 7000, isBull: true },
    { date: '2021', open: 850000, high: 1320000, low: 820000, close: 1280000, niftyClose: 17350, portfolioPct: 50.5, niftyPct: 42.8, vol: 13000, isBull: true },
    { date: '2023', open: 1280000, high: 1620000, low: 1240000, close: 1580000, niftyClose: 21730, portfolioPct: 85.8, niftyPct: 78.8, vol: 16000, isBull: true },
    { date: '2024', open: 1580000, high: 1848500, low: 1560000, close: 1845280, niftyClose: 24852, portfolioPct: 117.0, niftyPct: 104.5, vol: 22000, isBull: true },
  ],
};

export function UpstoxProChart() {
  const [timeframe, setTimeframe] = useState<TimeFrame>('1M');
  const [viewMode, setViewMode] = useState<ViewMode>('BENCHMARK');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('AREA');
  const [showMA50, setShowMA50] = useState(true);
  const [showNiftyLine, setShowNiftyLine] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isFullWidth, setIsFullWidth] = useState(false);

  const data = timeframeCandles[timeframe];
  const activePt = hoveredIdx !== null ? data[hoveredIdx] : data[data.length - 1];

  // Large Pro dimensions
  const width = 1200;
  const height = 520;
  const paddingX = 55;
  const paddingY = 35;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2 - 60; // 60px reserved for volume histogram

  const getValues = (type: 'portfolio' | 'nifty') => {
    if (viewMode === 'VALUE') return data.map((d) => d.close);
    if (viewMode === 'NSE_ONLY') return data.map((d) => d.niftyClose);
    return type === 'portfolio' ? data.map((d) => d.portfolioPct) : data.map((d) => d.niftyPct);
  };

  const pVals = getValues('portfolio');
  const nVals = getValues('nifty');

  // Also include high/low for candlestick bounds
  const highVals = viewMode === 'VALUE' ? data.map((d) => d.high) : pVals;
  const lowVals = viewMode === 'VALUE' ? data.map((d) => d.low) : pVals;
  const allVals = viewMode === 'NSE_ONLY' ? nVals : [...pVals, ...nVals, ...highVals, ...lowVals];

  const minV = Math.min(...allVals);
  const maxV = Math.max(...allVals);
  const rangeV = maxV - minV || 1;

  const getPoints = (vals: number[]) => {
    return vals.map((val, i) => {
      const x = paddingX + (i / (vals.length - 1)) * chartW;
      const y = height - paddingY - 60 - ((val - minV) / rangeV) * chartH;
      return { x, y };
    });
  };

  const pPts = getPoints(pVals);
  const nPts = getPoints(nVals);

  // Moving Average 50 calculation (Simulated simple 3-point rolling average)
  const ma50Vals = pVals.map((v, i) => {
    const start = Math.max(0, i - 2);
    const slice = pVals.slice(start, i + 1);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });
  const ma50Pts = getPoints(ma50Vals);

  const makePath = (pts: { x: number; y: number }[]) => {
    if (!pts.length) return '';
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const curr = pts[i];
      const next = pts[i + 1];
      const mx = (curr.x + next.x) / 2;
      d += ` C ${mx},${curr.y} ${mx},${next.y} ${next.x},${next.y}`;
    }
    return d;
  };

  const pPath = makePath(pPts);
  const nPath = makePath(nPts);
  const ma50Path = makePath(ma50Pts);
  const pArea = `${pPath} L ${pPts[pPts.length - 1].x},${height - paddingY - 60} L ${pPts[0].x},${height - paddingY - 60} Z`;

  const maxVol = Math.max(...data.map((d) => d.vol));

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden font-sans">
      {/* Upstox Pro Widescreen Toolbar */}
      <div className="p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
        {/* Title + Status */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-emerald-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold tracking-tight text-white font-sans">
                NSE Benchmark & Portfolio Command Chart
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded">
                LIVE PRO HUD
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              High-resolution 70% canvas with interactive indicators & candles
            </p>
          </div>
        </div>

        {/* Pro Toolbar Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Chart Style Switcher */}
          <div className="flex bg-slate-800 border border-slate-700 p-0.5 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setChartStyle('AREA')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                chartStyle === 'AREA'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <LineChart className="w-3.5 h-3.5" />
              Area Curve
            </button>
            <button
              onClick={() => setChartStyle('CANDLE')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                chartStyle === 'CANDLE'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <CandlestickChart className="w-3.5 h-3.5" />
              Candlesticks
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-slate-800 border border-slate-700 p-0.5 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setViewMode('BENCHMARK')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'BENCHMARK'
                  ? 'bg-white text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              vs NIFTY %
            </button>
            <button
              onClick={() => setViewMode('VALUE')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'VALUE'
                  ? 'bg-white text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Portfolio Value (₹)
            </button>
          </div>

          {/* Timeframe Selector */}
          <div className="flex bg-slate-800 border border-slate-700 p-0.5 rounded-xl text-xs font-mono font-bold">
            {(['1D', '1W', '1M', '3M', '1Y', '5Y', 'ALL'] as TimeFrame[]).map((tf) => (
              <button
                key={tf}
                onClick={() => {
                  setTimeframe(tf);
                  setHoveredIdx(null);
                }}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeframe === tf
                    ? 'bg-emerald-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Indicators Toggle */}
          <button
            onClick={() => setShowMA50(!showMA50)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              showMA50
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            50-MA Line
          </button>
        </div>
      </div>

      {/* Pro HUD Crosshair Data Header */}
      <div className="px-6 py-3 bg-slate-950 text-white border-b border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-4">
          <span className="text-slate-400 font-sans">PERIOD:</span>
          <span className="font-bold text-amber-400">{activePt.date}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 font-sans">OPEN:</span>
          <span className="text-white font-bold">₹{activePt.open.toLocaleString('en-IN')}</span>
          <span className="text-slate-400 font-sans">HIGH:</span>
          <span className="text-emerald-400 font-bold">₹{activePt.high.toLocaleString('en-IN')}</span>
          <span className="text-slate-400 font-sans">LOW:</span>
          <span className="text-rose-400 font-bold">₹{activePt.low.toLocaleString('en-IN')}</span>
          <span className="text-slate-400 font-sans">CLOSE:</span>
          <span className="text-white font-bold">₹{activePt.close.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-slate-400 font-sans">Portfolio Return:</span>
            <span className="font-bold text-emerald-400">+{activePt.portfolioPct}%</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span className="text-slate-400 font-sans">NSE NIFTY 50:</span>
            <span className="font-bold text-indigo-400">
              {activePt.niftyClose.toLocaleString('en-IN')} (+{activePt.niftyPct}%)
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-sans font-bold text-slate-950 bg-emerald-400 px-2.5 py-0.5 rounded shadow-xs">
            <TrendingUp className="w-3.5 h-3.5" />
            Alpha: +{(activePt.portfolioPct - activePt.niftyPct).toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Large 70% Screen Height Interactive Chart SVG Canvas */}
      <div className="p-6 bg-slate-950 relative min-h-[500px] sm:min-h-[560px] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full min-h-[480px] select-none overflow-visible"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id="proAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines with precise Y-axis values */}
          {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
            const y = height - paddingY - 60 - ratio * chartH;
            const gridVal = minV + ratio * rangeV;
            return (
              <g key={ratio}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 10}
                  y={y + 4}
                  fill="#64748b"
                  fontSize="11"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {viewMode === 'VALUE' ? `₹${(gridVal / 1000).toFixed(0)}k` : `${gridVal.toFixed(1)}%`}
                </text>
              </g>
            );
          })}

          {/* Area Chart Gradient Fill */}
          {chartStyle === 'AREA' && viewMode !== 'NSE_ONLY' && (
            <path d={pArea} fill="url(#proAreaGrad)" />
          )}

          {/* NIFTY 50 Benchmark Line (Indigo Dashed with Glow) */}
          {showNiftyLine && viewMode !== 'VALUE' && (
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7 }}
              d={nPath}
              fill="none"
              stroke="#6366f1"
              strokeWidth="2.5"
              strokeDasharray="6 5"
            />
          )}

          {/* 50-Day Moving Average Line (Amber Solid) */}
          {showMA50 && viewMode !== 'NSE_ONLY' && (
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
              d={ma50Path}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.8"
              strokeDasharray="3 3"
              opacity={0.85}
            />
          )}

          {/* Portfolio Smooth Line Curve */}
          {chartStyle === 'AREA' && viewMode !== 'NSE_ONLY' && (
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
              d={pPath}
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#glowGreen)"
            />
          )}

          {/* Candlesticks View Mode */}
          {chartStyle === 'CANDLE' &&
            data.map((d, i) => {
              const x = pPts[i].x;
              const candleW = Math.max(12, chartW / (data.length * 2.2));

              // Y coordinate mapping for Open, High, Low, Close
              const getY = (val: number) => height - paddingY - 60 - ((val - minV) / rangeV) * chartH;
              const openY = getY(d.open);
              const closeY = getY(d.close);
              const highY = getY(d.high);
              const lowY = getY(d.low);

              const candleTop = Math.min(openY, closeY);
              const candleHeight = Math.max(3, Math.abs(closeY - openY));
              const isBull = d.close >= d.open;
              const color = isBull ? '#10b981' : '#f43f5e';

              return (
                <g key={i}>
                  {/* High-Low Wick */}
                  <line
                    x1={x}
                    y1={highY}
                    x2={x}
                    y2={lowY}
                    stroke={color}
                    strokeWidth="1.8"
                  />
                  {/* Candle Body */}
                  <rect
                    x={x - candleW / 2}
                    y={candleTop}
                    width={candleW}
                    height={candleHeight}
                    fill={color}
                    rx={1.5}
                  />
                </g>
              );
            })}

          {/* Volume Histogram Bars at Bottom */}
          {data.map((d, i) => {
            const x = pPts[i].x;
            const barH = (d.vol / maxVol) * 45;
            const y = height - paddingY - barH;
            const isBull = d.isBull;
            return (
              <rect
                key={i}
                x={x - 10}
                y={y}
                width={20}
                height={barH}
                fill={isBull ? '#10b981' : '#f43f5e'}
                opacity={hoveredIdx === i ? 0.7 : 0.25}
                rx={1.5}
              />
            );
          })}

          {/* Crosshair & Interactive Hover Targets */}
          {data.map((_, i) => {
            const x = pPts[i].x;
            const pY = pPts[i].y;
            const nY = nPts[i].y;
            const isH = hoveredIdx === i;

            return (
              <g key={i} onMouseEnter={() => setHoveredIdx(i)} className="cursor-pointer">
                {isH && (
                  <>
                    {/* Vertical Crosshair */}
                    <line
                      x1={x}
                      y1={paddingY}
                      x2={x}
                      y2={height - paddingY}
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    {/* Horizontal Crosshair */}
                    <line
                      x1={paddingX}
                      y1={pY}
                      x2={width - paddingX}
                      y2={pY}
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                  </>
                )}

                {chartStyle === 'AREA' && viewMode !== 'NSE_ONLY' && (
                  <circle
                    cx={x}
                    cy={pY}
                    r={isH ? 7 : 4.5}
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                  />
                )}

                {showNiftyLine && viewMode !== 'VALUE' && (
                  <circle
                    cx={x}
                    cy={nY}
                    r={isH ? 6 : 4}
                    fill="#6366f1"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                )}

                {/* Target Hover Area */}
                <rect
                  x={x - chartW / (data.length * 2)}
                  y={paddingY}
                  width={chartW / data.length}
                  height={chartH + 60}
                  fill="transparent"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Upstox Command Bottom Analytics Strip */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 grid grid-cols-2 md:grid-cols-5 gap-3 text-xs font-sans">
        <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/80">
          <div className="text-slate-400 text-[11px]">52-Wk High Portfolio</div>
          <div className="text-sm font-bold text-white font-mono mt-0.5">₹18,45,280.50</div>
        </div>
        <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/80">
          <div className="text-slate-400 text-[11px]">NSE Beta Score</div>
          <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">0.92 (Moderate Risk)</div>
        </div>
        <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/80">
          <div className="text-slate-400 text-[11px]">Sharpe Ratio</div>
          <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">1.84 (Outperforming)</div>
        </div>
        <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/80">
          <div className="text-slate-400 text-[11px]">Max Drawdown (1Y)</div>
          <div className="text-sm font-bold text-rose-400 font-mono mt-0.5">-4.20%</div>
        </div>
        <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/80">
          <div className="text-slate-400 text-[11px]">NSE Market Correlation</div>
          <div className="text-sm font-bold text-indigo-400 font-mono mt-0.5">94.5% Index Sync</div>
        </div>
      </div>
    </div>
  );
}
