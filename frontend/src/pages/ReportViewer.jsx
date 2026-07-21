import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReportDetail } from '../services/api';
import MarkdownViewer from '../components/MarkdownViewer';
import CriticReview from '../components/CriticReview';
import DownloadButton from '../components/DownloadButton';
import AgentStatusCard from '../components/AgentStatusCard';
import { ArrowLeft, Calendar, FileText, CheckCircle2, Loader2 } from 'lucide-react';

export default function ReportViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        const data = await getReportDetail(id);
        setReportData(data);
      } catch (err) {
        setError('Report not found or failed to load.');
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-[#a09890]">
        <Loader2 className="w-6 h-6 animate-spin text-[#ff8c32] mr-2" />
        Loading report detail...
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-sm">
          {error || 'Report not found.'}
        </div>
        <button
          onClick={() => navigate('/history')}
          className="flex items-center gap-2 text-xs font-mono text-[#ff8c32] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to History
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6">
        <button
          onClick={() => navigate('/history')}
          className="flex items-center gap-2 text-xs font-mono text-[#a09890] hover:text-[#ff8c32] transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" /> Back to History Library
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-[#a09890] flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#ff8c32]" /> Archived on {reportData.timestamp}
            </span>
            <h1 className="font-syne font-extrabold text-2xl md:text-3xl text-[#f0ebe0]">
              {reportData.topic}
            </h1>
          </div>

          <DownloadButton
            reportContent={reportData.report}
            filename={`report_${id.slice(0, 8)}.md`}
          />
        </div>
      </div>

      {/* Main Markdown Report */}
      <div className="glass-card p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2 text-[#ff8c32] font-mono text-xs uppercase tracking-widest font-bold border-b border-[#ff8c32]/20 pb-3">
          <FileText className="w-4 h-4" />
          Research Report
        </div>
        <MarkdownViewer content={reportData.report} />
      </div>

      {/* Critic Feedback */}
      {reportData.critic_review && (
        <CriticReview reviewText={reportData.critic_review} />
      )}

      {/* Raw Traces */}
      {(reportData.search_results || reportData.scraped_content) && (
        <div className="flex flex-col gap-4">
          <h4 className="font-syne font-bold text-base text-[#f0ebe0]">Raw Execution Traces</h4>
          {reportData.search_results && (
            <AgentStatusCard
              title="Search Agent Raw Results"
              agentType="Tavily Search API"
              content={reportData.search_results}
            />
          )}
          {reportData.scraped_content && (
            <AgentStatusCard
              title="Reader Agent Scraped Content"
              agentType="BeautifulSoup HTML Parser"
              content={reportData.scraped_content}
            />
          )}
        </div>
      )}
    </div>
  );
}
