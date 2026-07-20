import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Microscope, Activity, History, Info, Sparkles } from 'lucide-react';
import { checkHealth } from '../services/api';

export default function Navbar() {
  const location = useLocation();
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    checkHealth()
      .then(() => setApiStatus('online'))
      .catch(() => setApiStatus('offline'));
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Research Workspace', path: '/research', icon: Microscope },
    { name: 'History', path: '/history', icon: History },
    { name: 'About Topology', path: '/about', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0a0a0f]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff8c32] to-[#ff5a1a] flex items-center justify-center shadow-lg shadow-[#ff8c32]/20 group-hover:scale-105 transition-transform">
            <Microscope className="w-6 h-6 text-[#0a0a0f]" />
          </div>
          <div>
            <span className="font-syne font-extrabold text-xl tracking-tight text-[#f0ebe0]">
              Research<span className="text-[#ff8c32]">Mind</span>
            </span>
            <span className="block font-mono text-[10px] text-[#a09890] tracking-widest uppercase">
              Multi-Agent AI Pipeline
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full p-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ff8c32] to-[#ff5a1a] text-[#0a0a0f] font-bold shadow-md shadow-[#ff8c32]/20'
                    : 'text-[#a09890] hover:text-[#e8e4dc] hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* API Health Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono">
          <span className={`w-2 h-2 rounded-full ${
            apiStatus === 'online' ? 'bg-[#50c878] animate-pulse' : apiStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
          }`} />
          <span className="text-[#a09890] uppercase tracking-wider text-[11px]">
            API: {apiStatus}
          </span>
        </div>

      </div>
    </header>
  );
}
