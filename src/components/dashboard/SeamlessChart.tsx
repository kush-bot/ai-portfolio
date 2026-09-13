'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Activity } from 'lucide-react';

type TimeFrame = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';
type ViewMode = 'BENCHMARK' | 'VALUE';

interface ChartPoint {
  date: string;
  portfolioVal: number;
  portfolioPct: number;
  niftyVal: number;
  niftyPct: number;
}

const timeframeData: Record<TimeFrame, ChartPoint[]> = {
  '1D': [
    { date: '09:15 AM', portfolioVal: 1830460, portfolioPct: 0.0, niftyVal: 24748, niftyPct: 0.0 },
    { date: '10:30 AM', portfolioVal: 1834200, portfolioPct: 0.2, niftyVal: 24785, niftyPct: 0.15 },
    { date: '11:45 AM', portfolioVal: 1832100, portfolioPct: 0.09, niftyVal: 24760, niftyPct: 0.05 },
    { date: '01:00 PM', portfolioVal: 1839800, portfolioPct: 0.51, niftyVal: 24820, niftyPct: 0.29 },
    { date: '02:15 PM', portfolioVal: 1842300, portfolioPct: 0.65, niftyVal: 24835, niftyPct: 0.35 },
    { date: '03:30 PM', portfolioVal: 1845280, portfolioPct: 0.81, niftyVal: 24852, niftyPct: 0.42 },
  ],
  '1W': [
    { date: 'Mon', portfolioVal: 1812000, portfolioPct: 0.0, niftyVal: 24600, niftyPct: 0.0 },
    { date: 'Tue', portfolioVal: 1821500, portfolioPct: 0.52, niftyVal: 24680, niftyPct: 0.32 },
    { date: 'Wed', portfolioVal: 1818000, portfolioPct: 0.33, niftyVal: 24650, niftyPct: 0.2 },
    { date: 'Thu', portfolioVal: 1835000, portfolioPct: 1.27, niftyVal: 24790, niftyPct: 0.77 },
    { date: 'Fri', portfolioVal: 1845280, portfolioPct: 1.84, niftyVal: 24852, niftyPct: 1.02 },
  ],
  '1M': [
    { date: 'Aug 12', portfolioVal: 1765000, portfolioPct: 0.0, niftyVal: 24150, niftyPct: 0.0 },
    { date: 'Aug 19', portfolioVal: 1782000, portfolioPct: 0.96, niftyVal: 24300, niftyPct: 0.62 },
    { date: 'Aug 26', portfolioVal: 1775000, portfolioPct: 0.57, niftyVal: 24220, niftyPct: 0.29 },
    { date: 'Sep 02', portfolioVal: 1815000, portfolioPct: 2.83, niftyVal: 24600, niftyPct: 1.86 },
    { date: 'Sep 09', portfolioVal: 1832000, portfolioPct: 3.8, niftyVal: 24780, niftyPct: 2.6 },
    { date: 'Sep 12', portfolioVal: 1845280, portfolioPct: 4.55, niftyVal: 24852, niftyPct: 2.91 },
  ],
  '3M': [
    { date: 'Jun 15', portfolioVal: 1680000, portfolioPct: 0.0, niftyVal: 23400, niftyPct: 0.0 },
    { date: 'Jul 01', portfolioVal: 1725000, portfolioPct: 2.68, niftyVal: 23900, niftyPct: 2.14 },
    { date: 'Jul 15', portfolioVal: 1750000, portfolioPct: 4.17, niftyVal: 24100, niftyPct: 2.99 },
    { date: 'Aug 01', portfolioVal: 1735000, portfolioPct: 3.27, niftyVal: 23950, niftyPct: 2.35 },
    { date: 'Aug 15', portfolioVal: 1780000, portfolioPct: 5.95, niftyVal: 24350, niftyPct: 4.06 },
    { date: 'Sep 01', portfolioVal: 1820000, portfolioPct: 8.33, niftyVal: 24650, niftyPct: 5.34 },
    { date: 'Sep 12', portfolioVal: 1845280, portfolioPct: 9.84, niftyVal: 24852, niftyPct: 6.2 },
  ],
  '1Y': [
    { date: 'Sep 23', portfolioVal: 1520000, portfolioPct: 0.0, niftyVal: 21380, niftyPct: 0.0 },
    { date: 'Nov 23', portfolioVal: 1575000, portfolioPct: 3.62, niftyVal: 21950, niftyPct: 2.67 },
    { date: 'Jan 24', portfolioVal: 1640000, portfolioPct: 7.89, niftyVal: 22600, niftyPct: 5.71 },
    { date: 'Mar 24', portfolioVal: 1610000, portfolioPct: 5.92, niftyVal: 22350, niftyPct: 4.54 },
    { date: 'May 24', portfolioVal: 1710000, portfolioPct: 12.5, niftyVal: 23100, niftyPct: 8.04 },
    { date: 'Jul 24', portfolioVal: 1785000, portfolioPct: 17.43, niftyVal: 24100, niftyPct: 12.72 },
    { date: 'Sep 24', portfolioVal: 1845280, portfolioPct: 21.4, niftyVal: 24852, niftyPct: 16.24 },
  ],
  'ALL': [
    { date: '2022', portfolioVal: 1200000, portfolioPct: 0.0, niftyVal: 18100, niftyPct: 0.0 },
    { date: '2023', portfolioVal: 1450000, portfolioPct: 20.83, niftyVal: 21200, niftyPct: 17.13 },
    { date: '2024', portfolioVal: 1845280, portfolioPct: 53.77, niftyVal: 24852, niftyPct: 37.3 },
  ],
};

export function SeamlessChart() {
  const [timeframe, setTimeframe] = useState<TimeFrame>('1M');
  const [viewMode, setViewMode] = useState<ViewMode>('BENCHMARK');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const data = timeframeData[timeframe];
  const activePt = hoveredIdx !== null ? data[hoveredIdx] : data[data.length - 1];

  // SVG Chart dimensions
  const width = 1200;
  const height = 500;
  const paddingX = 40;
  const paddingY = 40;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  const getValues = (type: 'portfolio' | 'nifty') => {
    if (viewMode === 'VALUE') return data.map((d) => d.portfolioVal);
    return type === 'portfolio' ? data.map((d) => d.portfolioPct) : data.map((d) => d.niftyPct);
  };

  const pVals = getValues('portfolio');
  const nVals = getValues('nifty');
  const allVals = [...pVals, ...nVals];

  const minV = Math.min(...allVals);
  const maxV = Math.max(...allVals);
  const rangeV = maxV - minV || 1;

  const getPoints = (vals: number[]) => {
    return vals.map((val, i) => {
      const x = paddingX + (i / (vals.length - 1)) * chartW;
      const y = height - paddingY - ((val - minV) / rangeV) * chartH;
      return { x, y };
    });
  };

  const pPts = getPoints(pVals);
  const nPts = getPoints(nVals);

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
  const pArea = `${pPath} L ${pPts[pPts.length - 1].x},${height - paddingY} L ${pPts[0].x},${height - paddingY} Z`;

  return (
    <div className="w-full bg-white py-6 space-y-4">
      {/* Header Toolbar - Pure White & Borderless */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-950 font-sans tracking-tight">
            Portfolio Growth Trajectory
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Seamless benchmark performance compared with NSE NIFTY 50 Index
          </p>
        </div>

        {/* Timeframe & View Mode selectors - Borderless */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-full text-xs font-semibold">
            <button
              onClick={() => setViewMode('BENCHMARK')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewMode === 'BENCHMARK'
                  ? 'bg-slate-950 text-white'
                  : 'text-slate-500 hover:text-slate-950'
              }`}
            >
              vs NIFTY %
            </button>
            <button
              onClick={() => setViewMode('VALUE')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewMode === 'VALUE'
                  ? 'bg-slate-950 text-white'
                  : 'text-slate-500 hover:text-slate-950'
              }`}
            >
              Portfolio Value (₹)
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-full text-xs font-mono font-bold">
            {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as TimeFrame[]).map((tf) => (
              <button
                key={tf}
                onClick={() => {
                  setTimeframe(tf);
                  setHoveredIdx(null);
                }}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  timeframe === tf
                    ? 'bg-emerald-500 text-slate-950 shadow-xs'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Seamless HUD Line Callout */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-600 pt-1">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-950 font-sans">{activePt.date}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-sans text-slate-400">Portfolio:</span>
            <span className="font-bold text-slate-950">
              {viewMode === 'VALUE'
                ? `₹${activePt.portfolioVal.toLocaleString('en-IN')}`
                : `+${activePt.portfolioPct}%`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span className="font-sans text-slate-400">NIFTY 50:</span>
            <span className="font-bold text-indigo-600">
              {activePt.niftyVal.toLocaleString('en-IN')} (+{activePt.niftyPct}%)
            </span>
          </div>

          <div className="flex items-center gap-1 font-sans font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            Alpha: +{(activePt.portfolioPct - activePt.niftyPct).toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Pure White Borderless SVG Canvas */}
      <div className="w-full relative min-h-[480px] sm:min-h-[520px] bg-white pt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full min-h-[460px] select-none overflow-visible"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id="seamlessGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Subtlest grid lines */}
          {[0.25, 0.5, 0.75].map((r) => {
            const y = height - paddingY - r * chartH;
            return (
              <line
                key={r}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            );
          })}

          {/* Gradient Area Wash */}
          <path d={pArea} fill="url(#seamlessGrad)" />

          {/* NIFTY 50 Line */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
            d={nPath}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity={0.8}
          />

          {/* Portfolio Smooth Line */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
            d={pPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Interactive Dots & Crosshair */}
          {data.map((_, i) => {
            const x = pPts[i].x;
            const pY = pPts[i].y;
            const nY = nPts[i].y;
            const isH = hoveredIdx === i;

            return (
              <g key={i} onMouseEnter={() => setHoveredIdx(i)} className="cursor-pointer">
                {isH && (
                  <line
                    x1={x}
                    y1={paddingY}
                    x2={x}
                    y2={height - paddingY}
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}

                <circle
                  cx={x}
                  cy={pY}
                  r={isH ? 7 : 4.5}
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />

                <circle
                  cx={x}
                  cy={nY}
                  r={isH ? 5.5 : 3.5}
                  fill="#6366f1"
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                <rect
                  x={x - chartW / (data.length * 2)}
                  y={paddingY}
                  width={chartW / data.length}
                  height={chartH}
                  fill="transparent"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
