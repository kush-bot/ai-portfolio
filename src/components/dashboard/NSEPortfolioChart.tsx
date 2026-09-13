'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, BarChart2, Activity, Info, Calendar } from 'lucide-react';

type TimeFrame = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';
type ViewMode = 'VALUE' | 'BENCHMARK' | 'NSE_ONLY';

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
    { date: 'Wed', portfolioVal: 1818000, portfolioPct: 0.33, niftyVal: 24650, niftyPct: 0.20 },
    { date: 'Thu', portfolioVal: 1835000, portfolioPct: 1.27, niftyVal: 24790, niftyPct: 0.77 },
    { date: 'Fri', portfolioVal: 1845280, portfolioPct: 1.84, niftyVal: 24852, niftyPct: 1.02 },
  ],
  '1M': [
    { date: 'Aug 12', portfolioVal: 1765000, portfolioPct: 0.0, niftyVal: 24150, niftyPct: 0.0 },
    { date: 'Aug 19', portfolioVal: 1782000, portfolioPct: 0.96, niftyVal: 24300, niftyPct: 0.62 },
    { date: 'Aug 26', portfolioVal: 1775000, portfolioPct: 0.57, niftyVal: 24220, niftyPct: 0.29 },
    { date: 'Sep 02', portfolioVal: 1815000, portfolioPct: 2.83, niftyVal: 24600, niftyPct: 1.86 },
    { date: 'Sep 09', portfolioVal: 1832000, portfolioPct: 3.80, niftyVal: 24780, niftyPct: 2.60 },
    { date: 'Sep 12', portfolioVal: 1845280, portfolioPct: 4.55, niftyVal: 24852, niftyPct: 2.91 },
  ],
  '3M': [
    { date: 'Jun 15', portfolioVal: 1680000, portfolioPct: 0.0, niftyVal: 23400, niftyPct: 0.0 },
    { date: 'Jul 01', portfolioVal: 1725000, portfolioPct: 2.68, niftyVal: 23900, niftyPct: 2.14 },
    { date: 'Jul 15', portfolioVal: 1750000, portfolioPct: 4.17, niftyVal: 24100, niftyPct: 2.99 },
    { date: 'Aug 01', portfolioVal: 1735000, portfolioPct: 3.27, niftyVal: 23950, niftyPct: 2.35 },
    { date: 'Aug 15', portfolioVal: 1780000, portfolioPct: 5.95, niftyVal: 24350, niftyPct: 4.06 },
    { date: 'Sep 01', portfolioVal: 1820000, portfolioPct: 8.33, niftyVal: 24650, niftyPct: 5.34 },
    { date: 'Sep 12', portfolioVal: 1845280, portfolioPct: 9.84, niftyVal: 24852, niftyPct: 6.20 },
  ],
  '1Y': [
    { date: 'Sep 2023', portfolioVal: 1520000, portfolioPct: 0.0, niftyVal: 21380, niftyPct: 0.0 },
    { date: 'Nov 2023', portfolioVal: 1575000, portfolioPct: 3.62, niftyVal: 21950, niftyPct: 2.67 },
    { date: 'Jan 2024', portfolioVal: 1640000, portfolioPct: 7.89, niftyVal: 22600, niftyPct: 5.71 },
    { date: 'Mar 2024', portfolioVal: 1610000, portfolioPct: 5.92, niftyVal: 22350, niftyPct: 4.54 },
    { date: 'May 2024', portfolioVal: 1710000, portfolioPct: 12.50, niftyVal: 23100, niftyPct: 8.04 },
    { date: 'Jul 2024', portfolioVal: 1785000, portfolioPct: 17.43, niftyVal: 24100, niftyPct: 12.72 },
    { date: 'Sep 2024', portfolioVal: 1845280, portfolioPct: 21.40, niftyVal: 24852, niftyPct: 16.24 },
  ],
  'ALL': [
    { date: '2022', portfolioVal: 1200000, portfolioPct: 0.0, niftyVal: 18100, niftyPct: 0.0 },
    { date: '2023', portfolioVal: 1450000, portfolioPct: 20.83, niftyVal: 21200, niftyPct: 17.13 },
    { date: '2024', portfolioVal: 1845280, portfolioPct: 53.77, niftyVal: 24852, niftyPct: 37.30 },
  ],
};

export function NSEPortfolioChart() {
  const [timeframe, setTimeframe] = useState<TimeFrame>('1M');
  const [viewMode, setViewMode] = useState<ViewMode>('BENCHMARK');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = timeframeData[timeframe];
  const activePoint = hoveredIndex !== null ? data[hoveredIndex] : data[data.length - 1];

  // SVG Chart Calculation logic
  const width = 800;
  const height = 280;
  const paddingX = 40;
  const paddingY = 30;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  // Determine min & max depending on view mode
  const getValues = (type: 'portfolio' | 'nifty') => {
    if (viewMode === 'VALUE') {
      return data.map((d) => d.portfolioVal);
    }
    if (viewMode === 'NSE_ONLY') {
      return data.map((d) => d.niftyVal);
    }
    // BENCHMARK (Percentage)
    return type === 'portfolio' ? data.map((d) => d.portfolioPct) : data.map((d) => d.niftyPct);
  };

  const pValues = getValues('portfolio');
  const nValues = getValues('nifty');
  const allVals = viewMode === 'NSE_ONLY' ? nValues : [...pValues, ...nValues];

  const minVal = Math.min(...allVals);
  const maxVal = Math.max(...allVals);
  const valRange = maxVal - minVal || 1;

  // Generate SVG Points
  const getSvgCoordinates = (values: number[]) => {
    return values.map((val, idx) => {
      const x = paddingX + (idx / (values.length - 1)) * chartW;
      const y = height - paddingY - ((val - minVal) / valRange) * chartH;
      return { x, y };
    });
  };

  const pSvgPoints = getSvgCoordinates(pValues);
  const nSvgPoints = getSvgCoordinates(nValues);

  // Convert points to smooth bezier curve string
  const createPathD = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const mx = (curr.x + next.x) / 2;
      d += ` C ${mx},${curr.y} ${mx},${next.y} ${next.x},${next.y}`;
    }
    return d;
  };

  const pPathD = createPathD(pSvgPoints);
  const nPathD = createPathD(nSvgPoints);

  // Area fill path for portfolio
  const pAreaD = `${pPathD} L ${pSvgPoints[pSvgPoints.length - 1].x},${height - paddingY} L ${pSvgPoints[0].x},${height - paddingY} Z`;

  return (
    <div className="w-full bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
      {/* Chart Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-foreground">NSE Benchmark & Growth</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200">
              NIFTY 50 Index Baseline
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Visualize your portfolio trajectory versus National Stock Exchange (NSE) benchmark
          </p>
        </div>

        {/* View Controls & Timeframe Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex bg-muted p-1 rounded-xl border border-border text-xs font-semibold">
            <button
              onClick={() => setViewMode('BENCHMARK')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'BENCHMARK'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              vs NIFTY %
            </button>
            <button
              onClick={() => setViewMode('VALUE')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'VALUE'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Portfolio (₹)
            </button>
            <button
              onClick={() => setViewMode('NSE_ONLY')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'NSE_ONLY'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              NSE Points
            </button>
          </div>

          {/* Timeframe Buttons */}
          <div className="flex bg-muted p-1 rounded-xl border border-border text-xs font-semibold">
            {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as TimeFrame[]).map((tf) => (
              <button
                key={tf}
                onClick={() => {
                  setTimeframe(tf);
                  setHoveredIndex(null);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  timeframe === tf
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Data Tooltip Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-muted/40 p-3 rounded-xl border border-border/80 text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="font-semibold text-foreground">{activePoint.date}</span>
        </div>

        <div className="flex items-center gap-6 font-mono">
          {viewMode !== 'NSE_ONLY' && (
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground font-sans">Portfolio:</span>
              <span className="font-bold text-foreground">
                {viewMode === 'VALUE'
                  ? `₹${activePoint.portfolioVal.toLocaleString('en-IN')}`
                  : `+${activePoint.portfolioPct}%`}
              </span>
            </div>
          )}

          {viewMode !== 'VALUE' && (
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span className="text-muted-foreground font-sans">NIFTY 50:</span>
              <span className="font-bold text-indigo-600">
                {viewMode === 'NSE_ONLY'
                  ? activePoint.niftyVal.toLocaleString('en-IN')
                  : `+${activePoint.niftyPct}%`}
              </span>
            </div>
          )}

          {viewMode === 'BENCHMARK' && (
            <div className="flex items-center gap-1.5 font-sans font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              <TrendingUp className="w-3 h-3" />
              Alpha: +{(activePoint.portfolioPct - activePoint.niftyPct).toFixed(2)}%
            </div>
          )}
        </div>
      </div>

      {/* SVG Interactive Chart */}
      <div className="relative w-full overflow-hidden rounded-xl border border-border bg-background p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="niftyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
            const y = height - paddingY - ratio * chartH;
            return (
              <line
                key={ratio}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="#e5e7eb"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            );
          })}

          {/* Portfolio Area Fill */}
          {viewMode !== 'NSE_ONLY' && (
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              d={pAreaD}
              fill="url(#portfolioGrad)"
            />
          )}

          {/* NIFTY 50 Benchmark Line (Indigo/Dashed) */}
          {viewMode !== 'VALUE' && (
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              d={nPathD}
              fill="none"
              stroke="#6366f1"
              strokeWidth={viewMode === 'NSE_ONLY' ? '2.5' : '1.8'}
              strokeDasharray={viewMode === 'BENCHMARK' ? '5 4' : undefined}
            />
          )}

          {/* Portfolio Growth Line (Emerald Solid) */}
          {viewMode !== 'NSE_ONLY' && (
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              d={pPathD}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          )}

          {/* Hover hitboxes & interactive dots */}
          {data.map((_, idx) => {
            const x = pSvgPoints[idx].x;
            const pY = pSvgPoints[idx].y;
            const nY = nSvgPoints[idx].y;
            const isHovered = hoveredIndex === idx;

            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="cursor-pointer"
              >
                {/* Vertical cursor guide */}
                {isHovered && (
                  <line
                    x1={x}
                    y1={paddingY}
                    x2={x}
                    y2={height - paddingY}
                    stroke="#9ca3af"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Portfolio Point Dot */}
                {viewMode !== 'NSE_ONLY' && (
                  <circle
                    cx={x}
                    cy={pY}
                    r={isHovered ? 6 : 4}
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all duration-150"
                  />
                )}

                {/* NIFTY Point Dot */}
                {viewMode !== 'VALUE' && (
                  <circle
                    cx={x}
                    cy={nY}
                    r={isHovered ? 5 : 3.5}
                    fill="#6366f1"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all duration-150"
                  />
                )}

                {/* Transparent hit target rect */}
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

      {/* Chart Footer Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
          <div className="text-[11px] font-medium text-muted-foreground uppercase">Beta vs NSE</div>
          <div className="text-sm font-bold text-foreground font-mono mt-0.5">0.92 <span className="text-xs font-normal text-muted-foreground">(Moderate)</span></div>
        </div>
        <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
          <div className="text-[11px] font-medium text-muted-foreground uppercase">Max Drawdown (1Y)</div>
          <div className="text-sm font-bold text-rose-600 font-mono mt-0.5">-4.20%</div>
        </div>
        <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
          <div className="text-[11px] font-medium text-muted-foreground uppercase">Sharpe Ratio</div>
          <div className="text-sm font-bold text-emerald-600 font-mono mt-0.5">1.84 <span className="text-xs font-normal text-muted-foreground">(High)</span></div>
        </div>
        <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
          <div className="text-[11px] font-medium text-muted-foreground uppercase">52-Wk High Portfolio</div>
          <div className="text-sm font-bold text-foreground font-mono mt-0.5">₹18,45,280.50</div>
        </div>
      </div>
    </div>
  );
}
