import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import { Bot, Search, FileText, CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const handleStartResearch = (topic) => {
    navigate('/research', { state: { topic } });
  };

  const features = [
    {
      icon: Search,
      title: '1. Autonomous Search Agent',
      desc: 'Queries Tavily API to gather live, high-precision web snippets and relevant links.',
    },
    {
      icon: FileText,
      title: '2. Deep Scraping Reader',
      desc: 'Parses raw article HTML using BeautifulSoup, stripping unwanted scripts and markup.',
    },
    {
      icon: Bot,
      title: '3. Writer Synthesis Chain',
      desc: 'Combines search findings and scraped text into a clear, structured markdown report.',
    },
    {
      icon: ShieldCheck,
      title: '4. Automated Peer Critic',
      desc: 'Evaluates the report strictly, assigning a score out of 10 with actionable feedback.',
    },
  ];

  return (
    <div className="flex flex-col gap-12 py-4">
      {/* Hero Header */}
      <section className="text-center max-w-3xl mx-auto flex flex-col gap-4">
        <div className="inline-flex items-center gap-2 self-center px-4 py-1.5 rounded-full bg-[#ff8c32]/10 border border-[#ff8c32]/30 text-[#ff8c32] font-mono text-xs uppercase tracking-widest">
          <Zap className="w-3.5 h-3.5 fill-current" /> Next-Gen AI Research Assistant
        </div>
        <h1 className="font-syne font-extrabold text-4xl md:text-6xl text-[#f0ebe0] tracking-tight leading-tight">
          Deep Research Powered by <span className="text-[#ff8c32]">Multi-Agent</span> AI
        </h1>
        <p className="font-sans text-[#a09890] text-base md:text-lg leading-relaxed">
          Four specialized AI agents collaborate sequentially — searching, scraping, writing, and critiquing — to deliver comprehensive, publication-grade research reports.
        </p>
      </section>

      {/* Main Search Input */}
      <section className="max-w-3xl mx-auto w-full">
        <SearchBox onSubmit={handleStartResearch} />
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div key={idx} className="glass-panel p-6 flex flex-col gap-3 hover:border-[#ff8c32]/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#ff8c32]/10 border border-[#ff8c32]/20 flex items-center justify-center text-[#ff8c32]">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-syne font-bold text-base text-[#f0ebe0]">{f.title}</h3>
              <p className="font-sans text-xs text-[#a09890] leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
