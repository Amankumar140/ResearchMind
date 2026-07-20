import React from 'react';
import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {children}
      </main>
      <footer className="border-t border-white/10 py-6 text-center text-xs font-mono text-[#706860]">
        ResearchMind · Powered by FastAPI & React Multi-Agent Infrastructure
      </footer>
    </div>
  );
}
