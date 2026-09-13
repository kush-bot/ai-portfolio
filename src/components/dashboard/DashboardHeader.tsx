'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import {
  LayoutDashboard,
  PieChart,
  Sparkles,
  TrendingUp,
  Settings,
  PlusCircle,
  LogOut,
  User,
} from 'lucide-react';

interface DashboardHeaderProps {
  activeTab?: string;
  connectedBroker?: string;
}

export function DashboardHeader({
  activeTab = 'overview',
  connectedBroker = 'Zerodha',
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center">
            <Logo />
          </Link>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Overview
            </Link>

            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'holdings'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" />
              Holdings
            </Link>

            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'ai'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              AI Insights
            </Link>

            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'nse'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              NSE Live
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/connect-broker"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-foreground bg-card hover:bg-muted border border-border rounded-xl transition-all shadow-2xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Broker Accounts
          </Link>

          <div className="w-8 h-8 rounded-full bg-primary/10 border border-border flex items-center justify-center font-bold text-xs text-foreground">
            KN
          </div>
        </div>
      </div>
    </header>
  );
}
