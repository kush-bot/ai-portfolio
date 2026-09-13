'use client';

import React from 'react';
import { Logo } from '../ui/Logo';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full border-b border-slate-100 bg-background/90 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/dashboard" className="text-slate-900 font-bold hover:text-emerald-600 transition-colors">
            Dashboard
          </Link>
          <Link href="/connect-broker" className="text-muted-foreground hover:text-foreground transition-colors">
            Connect Broker
          </Link>
          <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
            Log in
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
