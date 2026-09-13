import React from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { DashboardPreview } from '@/components/sections/DashboardPreview';
import { Footer } from '@/components/layout/Footer';


export default function Home() {


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <DashboardPreview />
      </main>
      <Footer />
    </div>
  );
}
