'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Link2, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useDispatch } from 'react-redux';
import { ConnectToBroker } from './store/brokerThunk';
import { AppDispatch } from '@/store/store';


function ZerodhaLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="10" fill="#E8402A" />
      <path
        d="M9 10h13.5l-9 7.5H24M9 26h13.5l-9-7.5"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UpstoxLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="10" fill="#6B21E8" />
      {/* Arrow up */}
      <path
        d="M18 25V13M18 13L13 18.5M18 13L23 18.5"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dot at bottom */}
      <circle cx="18" cy="27" r="1.5" fill="white" />
    </svg>
  );
}

function AngelOneLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="10" fill="#1A1A2E" />
      {/* Halo arc */}
      <path
        d="M12 13.5 Q18 9 24 13.5"
        stroke="#F97316"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* A letter */}
      <path
        d="M13.5 26L18 16L22.5 26M15.5 22.5h5"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


const brokers = [
  {
    id: 'zerodha',
    name: 'Zerodha',
    description: 'India\'s largest stock broker',
    logo: ZerodhaLogo,
    accentColor: 'group-hover:border-[#E8402A]/30 group-hover:shadow-[#E8402A]/10',
  },
  {
    id: 'upstox',
    name: 'Upstox',
    description: 'Fast & simple investing',
    logo: UpstoxLogo,
    accentColor: 'group-hover:border-[#6B21E8]/30 group-hover:shadow-[#6B21E8]/10',
  },
  {
    id: 'angel-one',
    name: 'Angel One',
    description: 'Smart stock trading platform',
    logo: AngelOneLogo,
    accentColor: 'group-hover:border-[#F97316]/30 group-hover:shadow-[#F97316]/10',
  },
];


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
};

const brokerEndpoints:Record<string,string>={
  upstox:'/broker/upstocx/connect',
  zerodha:'/broker/upstocx/connect',
  'angel-one':'/broker/upstocx/connect'

};



import { useRouter } from 'next/navigation';

// Typed dispatch hook
const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default function ConnectBrokerPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = (id: string) => {
    setConnecting(id);
    const url = brokerEndpoints[id];
    try {
      dispatch(ConnectToBroker(url));
    } catch {
      // ignore offline error in dev
    }
    // Redirect to dashboard with connected broker state after short visual feedback
    setTimeout(() => {
      router.push(`/dashboard?connected=${id}`);
    }, 900);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-start justify-center pt-16 pb-16 px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center w-full max-w-md"
        >

          {/* Icon badge */}
          <motion.div variants={itemVariant} className="mb-7">
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
              <Link2 className="w-6 h-6 text-foreground" strokeWidth={1.75} />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariant}
            className="text-[2rem] font-bold tracking-tight text-foreground mb-3 leading-tight"
          >
            Connect your broker
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariant}
            className="text-sm text-muted-foreground leading-relaxed mb-2"
          >
            Link your accounts for AI-powered insights.
            <br />
            Access is strictly read-only for{' '}
            <span className="underline underline-offset-2">portfolio</span> data.
          </motion.p>

          {/* Security badge */}
          <motion.div variants={itemVariant} className="mb-9">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Bank-level security · Read-only access
            </span>
          </motion.div>

          {/* Broker cards */}
          <motion.div variants={itemVariant} className="w-full flex flex-col gap-3">
            {brokers.map((broker) => {
              const Logo = broker.logo;
              const isConnecting = connecting === broker.id;

              return (
                <motion.button
                  key={broker.id}
                  onClick={() => handleConnect(broker.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`group w-full flex items-center justify-between px-4 py-4 rounded-2xl border border-border bg-background hover:bg-card hover:shadow-md transition-all duration-200 cursor-pointer text-left ${broker.accentColor}`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                      <Logo size={36} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-foreground leading-tight">
                        {broker.name}
                      </span>
                      <span className="text-xs text-muted-foreground mt-0.5">
                        {broker.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isConnecting ? (
                      <span className="text-xs font-medium text-muted-foreground animate-pulse">
                        Connecting…
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        Connect
                      </span>
                    )}
                    <ChevronRight
                      className="w-4 h-4 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-150"
                      strokeWidth={2}
                    />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Divider + skip */}
          <motion.div variants={itemVariant} className="mt-8 flex flex-col items-center gap-1">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now
            </Link>
            <p className="text-xs text-muted-foreground/60">
              You can connect your broker anytime from settings
            </p>
          </motion.div>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
