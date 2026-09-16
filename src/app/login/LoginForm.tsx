'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { loginUser } from './store/authThunk'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/store/store';


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};







function GoogleIcon({ className = 'w-5 h-5' }: { className?: string }) {

  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function LoginForm() {


  const dispatch = useDispatch<AppDispatch>();

  const handleGooogleLogin = () => {
    dispatch(loginUser());
  }
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-start justify-center pt-24 pb-16 px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center max-w-md w-full"
        >
          {/* Icon */}
          <motion.div
            variants={item}
            className="mb-8 p-3 rounded-2xl bg-card border border-border shadow-sm"
          >
            <Sparkles className="w-6 h-6 text-foreground" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2"
          >
            Log in to your account
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="text-base text-muted-foreground mb-10"
          >
            Access your unified portfolio dashboard.
          </motion.p>

          {/* Google Button */}
          <motion.div variants={item} className="w-full max-w-sm">
            <button onClick={handleGooogleLogin} className="w-full inline-flex items-center justify-center gap-3 h-12 px-6 rounded-full bg-primary text-primary-foreground font-medium transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] cursor-pointer">
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>
          </motion.div>

          {/* Info Text */}
          <motion.p
            variants={item}
            className="mt-8 text-sm text-muted-foreground leading-relaxed max-w-sm"
          >
            After signing in, you will be prompted to connect your{' '}
            <Link href="#" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
              Zerodha
            </Link>
            ,{' '}
            <Link href="#" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
              Upstox
            </Link>
            , or{' '}
            <Link href="#" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
              Angel One
            </Link>{' '}
            account to sync your holdings.
          </motion.p>

          {/* Create Account */}
          <motion.p variants={item} className="mt-8 text-sm text-muted-foreground">
            New here?{' '}
            <Link
              href="/signup"
              className="font-semibold text-foreground underline underline-offset-2 hover:text-primary transition-colors"
            >
              Create an account
            </Link>
          </motion.p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
