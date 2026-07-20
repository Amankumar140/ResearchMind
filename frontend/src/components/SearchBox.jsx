import React, { useState } from 'react';
import { Search, Zap } from 'lucide-react';

export default function SearchBox({ onSubmit, initialTopic = '', disabled = false }) {
  const [topic, setTopic] = useState(initialTopic);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim() && !disabled) {
      onSubmit(topic.trim());
    }
  };

  const sampleChips = [
    'LLM Agents 2025',
    'CRISPR Gene Editing',
    'Fusion Energy Progress',
  ];

  return (
    <div className="glass-card p-6 md:p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="font-mono text-xs text-[#ff8c32] uppercase tracking-widest font-semibold flex items-center gap-2">
          <Search className="w-4 h-4" />
          Research Topic
        </label>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Quantum computing breakthroughs in 2025"
            disabled={disabled}
            className="flex-1 bg-white/[0.05] border border-[#ff8c32]/30 rounded-xl px-4 py-3 text-[#f0ebe0] placeholder-[#706860] focus:outline-none focus:border-[#ff8c32] focus:ring-2 focus:ring-[#ff8c32]/20 font-sans transition-all text-sm md:text-base disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={disabled || !topic.trim()}
            className="bg-gradient-to-r from-[#ff8c32] to-[#ff5a1a] text-[#0a0a0f] font-syne font-bold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-[#ff8c32]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Zap className="w-4 h-4 fill-current" />
            Start Research
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 flex-wrap pt-2">
          <span className="font-mono text-[11px] text-[#706860] uppercase tracking-wider">Try:</span>
          {sampleChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setTopic(chip)}
              disabled={disabled}
              className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-md px-2.5 py-1 text-xs text-[#a09890] hover:text-[#e8e4dc] transition-all font-sans"
            >
              {chip}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
