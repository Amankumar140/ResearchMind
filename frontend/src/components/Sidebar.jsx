import React from 'react';
import { Sparkles, Terminal, FileText, Cpu } from 'lucide-react';

export default function Sidebar({ onSelectTopic }) {
  const exampleTopics = [
    'LLM Agent Frameworks in 2025',
    'CRISPR Gene Editing Milestones',
    'Commercial Fusion Energy Progress',
    'Quantum Computing Breakthroughs',
  ];

  return (
    <aside className="w-full lg:w-64 glass-panel p-5 flex flex-col gap-6">
      {/* Topology Summary */}
      <div>
        <div className="flex items-center gap-2 text-[#ff8c32] font-mono text-xs uppercase tracking-widest mb-3">
          <Cpu className="w-4 h-4" />
          Pipeline Architecture
        </div>
        <ul className="space-y-2 text-xs font-mono text-[#a09890]">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c32]" />
            1. Search Agent (Tavily)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c32]" />
            2. Reader Agent (BS4)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c32]" />
            3. Writer Chain (LCEL)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#50c878]" />
            4. Critic Chain (LCEL)
          </li>
        </ul>
      </div>

      <div className="h-px bg-white/10" />

      {/* Suggested Prompts */}
      <div>
        <div className="flex items-center gap-2 text-[#ff8c32] font-mono text-xs uppercase tracking-widest mb-3">
          <Sparkles className="w-4 h-4" />
          Suggested Prompts
        </div>
        <div className="flex flex-col gap-2">
          {exampleTopics.map((topic, idx) => (
            <button
              key={idx}
              onClick={() => onSelectTopic && onSelectTopic(topic)}
              className="text-left text-xs font-sans text-[#a09890] hover:text-[#e8e4dc] bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-lg p-2.5 transition-all flex items-center justify-between group"
            >
              <span className="truncate">{topic}</span>
              <Terminal className="w-3 h-3 text-[#ff8c32] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
