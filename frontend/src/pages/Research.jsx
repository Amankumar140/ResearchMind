import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SearchBox from '../components/SearchBox';
import ProgressTimeline from '../components/ProgressTimeline';
import AgentStatusCard from '../components/AgentStatusCard';
import MarkdownViewer from '../components/MarkdownViewer';
import DownloadButton from '../components/DownloadButton';
import ErrorBanner from '../components/ErrorBanner';
import { useResearch } from '../hooks/useResearch';
import { Sparkles, FileText, CheckCircle2, RotateCcw } from 'lucide-react';

export default function Research() {
  const location = useLocation();
  const initialTopic = location.state?.topic || '';

  const { taskData, loading, error, triggerResearch, resetResearch } = useResearch();

  useEffect(() => {
    if (initialTopic && !taskData && !loading) {
      triggerResearch(initialTopic);
    }
  }, [initialTopic]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <Sidebar onSelectTopic={(topic) => triggerResearch(topic)} />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* Search Input Box */}
        <SearchBox
          onSubmit={(topic) => triggerResearch(topic)}
          initialTopic={initialTopic}
          disabled={loading}
        />

        {/* Error Alert */}
        {error && (
          <ErrorBanner
            message={error}
            onRetry={() => taskData?.topic && triggerResearch(taskData.topic)}
          />
        )}

        {/* Live Progress Timeline */}
        {taskData && (
          <div className="glass-card p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#ff8c32] uppercase tracking-widest">Active Task</span>
                <h3 className="font-syne font-bold text-xl text-[#f0ebe0]">{taskData.topic}</h3>
              </div>
              <button
                onClick={resetResearch}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-[#a09890] hover:text-[#e8e4dc] transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Task
              </button>
            </div>

            <ProgressTimeline
              currentStep={taskData.current_step}
              status={taskData.status}
              error={taskData.error}
            />
          </div>
        )}

        {/* Intermediate Agent Trace Expanders */}
        {taskData && (taskData.search_results || taskData.scraped_content) && (
          <div className="flex flex-col gap-4">
            <h4 className="font-syne font-bold text-base text-[#f0ebe0]">Raw Agent Traces</h4>
            {taskData.search_results && (
              <AgentStatusCard
                title="Search Agent Raw Results"
                agentType="Tavily Web Search"
                content={taskData.search_results}
              />
            )}
            {taskData.scraped_content && (
              <AgentStatusCard
                title="Reader Agent Scraped Content"
                agentType="BeautifulSoup Scraper"
                content={taskData.scraped_content}
              />
            )}
          </div>
        )}

        {/* Final Markdown Report & Critic Section */}
        {taskData && taskData.report && (
          <div className="flex flex-col gap-6">
            
            {/* Final Markdown Report */}
            <div className="glass-card p-8 border border-[#ff8c32]/30 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-[#ff8c32]/20 pb-4">
                <div className="flex items-center gap-2 text-[#ff8c32] font-mono text-xs uppercase tracking-widest font-bold">
                  <FileText className="w-4 h-4" />
                  Final Research Report
                </div>
                <DownloadButton
                  reportContent={taskData.report}
                  filename={`research_report_${taskData.id.slice(0, 8)}.md`}
                />
              </div>

              <MarkdownViewer content={taskData.report} />
            </div>

            {/* Critic Feedback Panel */}
            {taskData.critic_review && (
              <div className="p-8 rounded-2xl bg-[#50c878]/5 border border-[#50c878]/30 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[#50c878] font-mono text-xs uppercase tracking-widest font-bold border-b border-[#50c878]/20 pb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  Automated Peer Review (Critic Chain)
                </div>
                <div className="font-sans text-sm text-[#cdc8bf] whitespace-pre-wrap leading-relaxed">
                  {taskData.critic_review}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
