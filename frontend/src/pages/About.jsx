import React from 'react';
import { Cpu, Server, Code2, Database, ShieldCheck, Layers } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col gap-10 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <span className="font-mono text-xs text-[#ff8c32] uppercase tracking-widest flex items-center gap-1.5 mb-1">
          <Cpu className="w-4 h-4" /> System Topology
        </span>
        <h1 className="font-syne font-extrabold text-3xl md:text-4xl text-[#f0ebe0]">
          About ResearchMind Architecture
        </h1>
      </div>

      {/* Description */}
      <p className="font-sans text-[#a09890] text-base leading-relaxed">
        ResearchMind is an autonomous multi-agent research pipeline designed to replace manual web research. Built on top of LangChain 0.2+ and OpenAI GPT-4o-mini, it coordinates specialized agents and LCEL prompt chains in a deterministic sequence.
      </p>

      {/* Multi-Agent Diagram */}
      <div className="glass-card p-8 flex flex-col gap-6">
        <h3 className="font-syne font-bold text-lg text-[#f0ebe0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#ff8c32]" /> Sequential Pipeline Topology
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-2">
            <span className="text-[#ff8c32] font-bold">1. SEARCH AGENT</span>
            <span className="text-[#a09890]">Tool: Tavily API</span>
            <span className="text-[#cdc8bf]">Queries top 5 web results & snippets</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-2">
            <span className="text-[#ff8c32] font-bold">2. READER AGENT</span>
            <span className="text-[#a09890]">Tool: BeautifulSoup</span>
            <span className="text-[#cdc8bf]">Scrapes raw article HTML up to 3k chars</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-2">
            <span className="text-[#ff8c32] font-bold">3. WRITER CHAIN</span>
            <span className="text-[#a09890]">LCEL Synthesis</span>
            <span className="text-[#cdc8bf]">Drafts structured markdown report</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-2">
            <span className="text-[#50c878] font-bold">4. CRITIC CHAIN</span>
            <span className="text-[#a09890]">LCEL Evaluator</span>
            <span className="text-[#cdc8bf]">Peer-reviews quality & assigns score</span>
          </div>
        </div>
      </div>

      {/* Tech Stack Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#ff8c32] font-mono text-xs uppercase tracking-wider font-bold">
            <Server className="w-4 h-4" /> Backend Architecture
          </div>
          <ul className="space-y-2 text-xs font-mono text-[#a09890]">
            <li>• Framework: FastAPI + Uvicorn</li>
            <li>• Validation: Pydantic schemas</li>
            <li>• Storage: SQLite (`research_history.db`)</li>
            <li>• AI Framework: LangChain 0.2+ & OpenAI</li>
          </ul>
        </div>

        <div className="glass-panel p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#ff8c32] font-mono text-xs uppercase tracking-wider font-bold">
            <Code2 className="w-4 h-4" /> Frontend Architecture
          </div>
          <ul className="space-y-2 text-xs font-mono text-[#a09890]">
            <li>• Core Framework: React (JavaScript / JSX)</li>
            <li>• Build Tool: Vite</li>
            <li>• Styling: Tailwind CSS (Vanilla Glassmorphism)</li>
            <li>• HTTP Client: Axios</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
