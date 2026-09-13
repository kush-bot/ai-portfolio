'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="w-full py-12 border-t border-border mt-20"
    >
      <div className="container mx-auto px-4 max-w-6xl flex flex-col items-center">
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <span>&middot;</span>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          <span>&middot;</span>
          <Link href="/security" className="hover:text-foreground transition-colors">Security</Link>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Portfolio AI Inc.
        </p>
      </div>
    </motion.footer>
  );
}
