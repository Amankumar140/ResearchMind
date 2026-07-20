import React from 'react';
import { Search, FileText, PenTool, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function ProgressTimeline({ currentStep = 0, status = 'pending', error = null }) {
  const steps = [
    { num: '01', title: 'Search Agent', desc: 'Gathers recent web search results via Tavily API', icon: Search },
    { num: '02', title: 'Reader Agent', desc: 'Scrapes & parses top source content via BeautifulSoup', icon: FileText },
    { num: '03', title: 'Writer Chain', desc: 'Synthesizes gathered findings into structured report', icon: PenTool },
    { num: '04', title: 'Critic Chain', desc: 'Reviews report quality, score & recommendations', icon: CheckCircle2 },
  ];

  const getStepStatus = (index) => {
    const stepNum = index + 1;
    if (status === 'failed' && currentStep === stepNum) return 'error';
    if (currentStep > stepNum || status === 'completed') return 'done';
    if (currentStep === stepNum) return 'running';
    return 'waiting';
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="font-syne font-bold text-lg text-[#f0ebe0] mb-2 flex items-center justify-between">
        <span>Execution Pipeline Progress</span>
        {status === 'completed' && (
          <span className="font-mono text-xs text-[#50c878] bg-[#50c878]/10 border border-[#50c878]/30 px-3 py-1 rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Pipeline Complete
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {steps.map((step, idx) => {
          const stepStatus = getStepStatus(idx);
          const Icon = step.icon;

          return (
            <div
              key={step.num}
              className={`p-4 rounded-xl border relative transition-all duration-300 ${
                stepStatus === 'running'
                  ? 'bg-[#ff8c32]/10 border-[#ff8c32] shadow-lg shadow-[#ff8c32]/10'
                  : stepStatus === 'done'
                  ? 'bg-[#50c878]/10 border-[#50c878]/40'
                  : stepStatus === 'error'
                  ? 'bg-red-500/10 border-red-500'
                  : 'bg-white/[0.02] border-white/10 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-semibold text-[#ff8c32]">
                  STEP {step.num}
                </span>
                {stepStatus === 'running' && (
                  <Loader2 className="w-4 h-4 text-[#ff8c32] animate-spin" />
                )}
                {stepStatus === 'done' && (
                  <CheckCircle2 className="w-4 h-4 text-[#50c878]" />
                )}
                {stepStatus === 'error' && (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
              </div>

              <div className="font-syne font-bold text-sm text-[#f0ebe0] mb-1 flex items-center gap-2">
                <Icon className="w-4 h-4 text-[#ff8c32]" />
                {step.title}
              </div>
              <p className="text-xs text-[#a09890] font-sans leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
