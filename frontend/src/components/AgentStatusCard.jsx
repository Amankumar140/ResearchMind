import React from 'react';
import { Bot, ChevronDown, ChevronUp } from 'lucide-react';

export default function AgentStatusCard({ title, agentType, content, isExpandable = true }) {
  const [expanded, setExpanded] = React.useState(false);

  if (!content) return null;

  return (
    <div className="glass-panel p-5 border border-white/10 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#ff8c32]/10 border border-[#ff8c32]/30 flex items-center justify-center">
            <Bot className="w-4 h-4 text-[#ff8c32]" />
          </div>
          <div>
            <h4 className="font-syne font-bold text-sm text-[#f0ebe0]">{title}</h4>
            <span className="font-mono text-[10px] text-[#a09890] uppercase tracking-wider">
              {agentType}
            </span>
          </div>
        </div>

        {isExpandable && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-mono text-[#ff8c32] hover:underline"
          >
            {expanded ? 'Hide Trace' : 'View Raw Output'}
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {expanded && (
        <div className="mt-4 p-4 rounded-lg bg-[#0a0a0f] border border-white/10 font-mono text-xs text-[#a09890] overflow-x-auto whitespace-pre-wrap max-h-96">
          {content}
        </div>
      )}
    </div>
  );
}
