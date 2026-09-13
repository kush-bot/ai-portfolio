import React from 'react';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 font-bold text-xl tracking-tight text-foreground ${className}`}>
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-foreground text-background">
        <Sparkles className="w-5 h-5" />
      </div>
      <span>Portfolio AI</span>
    </div>
  );
}
