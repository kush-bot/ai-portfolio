'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/Button';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function Hero() {
  return (
    <section className="pt-24 pb-16 px-4 flex flex-col items-center text-center max-w-4xl mx-auto">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        <motion.div variants={item} className="mb-6 p-3 rounded-2xl bg-card border border-border shadow-sm">
          <Sparkles className="w-6 h-6 text-foreground" />
        </motion.div>

        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
        >
          One login. Every broker.
          <br />
          <span className="text-muted-foreground">One clear view.</span>
        </motion.h1>

        <motion.p variants={item} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          Manage every holding in one place with AI-driven insights. Simple, fast, and secure.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/connect-broker">
            <Button size="lg" className="px-8 text-base shadow-sm cursor-pointer flex items-center gap-2">
              Get started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="px-8 text-base shadow-sm cursor-pointer">
              View Live Dashboard
            </Button>
          </Link>
        </motion.div>

        <motion.p variants={item} className="text-xs text-muted-foreground font-medium mt-4">
          Free to use for up to 3 connected portfolios
        </motion.p>
      </motion.div>
    </section>
  );
}
