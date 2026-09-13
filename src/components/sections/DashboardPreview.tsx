'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function DashboardPreview() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto px-4 my-12"
    >
      <Link href="/dashboard" className="block group cursor-pointer">
        <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden aspect-[16/9] flex flex-col group-hover:border-slate-400 transition-all duration-300">
          {/* Header Mockup */}
          <div className="h-14 border-b border-border flex items-center px-6 justify-between bg-slate-50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs group-hover:bg-slate-900 group-hover:text-white transition-colors">
              Click to Open Live Dashboard →
            </div>
          </div>
          
          {/* Dashboard Content Mockup */}
          <div className="flex-1 p-8 grid grid-cols-3 gap-6 bg-background">
            <div className="col-span-2 flex flex-col gap-6">
              {/* Chart Area */}
              <div className="flex-1 rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-24 h-5 bg-slate-200 rounded-md" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <div className="w-16 h-4 bg-emerald-100 rounded-md" />
                  </div>
                </div>
                <div className="flex-1 flex items-end gap-2 pt-4">
                  {[40, 60, 45, 80, 55, 90, 75, 100].map((height, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-emerald-500/20 group-hover:bg-emerald-500/40 rounded-t-sm transition-colors"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Side Panel Area */}
            <div className="flex flex-col gap-4">
              <div className="h-32 rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
                <div className="w-20 h-4 bg-slate-200 rounded-md" />
                <div className="w-3/4 h-8 bg-emerald-100 rounded-md" />
              </div>
              <div className="flex-1 rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
                <div className="w-24 h-4 bg-slate-200 rounded-md mb-2" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-slate-200" />
                      <div className="w-16 h-3 bg-slate-200 rounded-md" />
                    </div>
                    <div className="w-10 h-3 bg-slate-200 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.section>
  );
}
