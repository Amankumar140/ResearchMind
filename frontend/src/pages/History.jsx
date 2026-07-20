import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory, deleteReport } from '../services/api';
import { History as HistoryIcon, Search, Eye, Trash2, Calendar, Award, Loader2 } from 'lucide-react';

export default function History() {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (err) {
      setError('Failed to fetch research history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this research report?')) {
      try {
        await deleteReport(id);
        setHistory(history.filter((item) => item.id !== id));
      } catch (err) {
        alert('Failed to delete report.');
      }
    }
  };

  const filteredHistory = history.filter((item) =>
    item.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-[#ff8c32] uppercase tracking-widest flex items-center gap-1.5">
            <HistoryIcon className="w-4 h-4" /> SQLite Archive
          </span>
          <h1 className="font-syne font-extrabold text-3xl text-[#f0ebe0]">Research Library</h1>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#706860] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search saved reports..."
            className="w-full bg-white/[0.05] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-[#f0ebe0] placeholder-[#706860] focus:outline-none focus:border-[#ff8c32]"
          />
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-[#a09890]">
          <Loader2 className="w-6 h-6 animate-spin text-[#ff8c32] mr-2" />
          Loading research library...
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-sm">
          {error}
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="glass-panel p-12 text-center text-[#a09890] flex flex-col items-center gap-3">
          <HistoryIcon className="w-10 h-10 text-[#706860]" />
          <p className="font-syne font-bold text-base text-[#f0ebe0]">No Research Reports Found</p>
          <p className="text-xs">Run a new topic in the workspace to save reports to your local SQLite database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/report/${item.id}`)}
              className="glass-panel p-6 flex flex-col justify-between gap-4 cursor-pointer hover:border-[#ff8c32]/40 transition-all hover:-translate-y-1 group"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#a09890] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#ff8c32]" /> {item.timestamp}
                  </span>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#50c878]/10 text-[#50c878] border border-[#50c878]/30 flex items-center gap-1 font-semibold">
                    <Award className="w-3 h-3" /> {item.score}
                  </span>
                </div>
                <h3 className="font-syne font-bold text-base text-[#f0ebe0] group-hover:text-[#ff8c32] transition-colors line-clamp-2">
                  {item.topic}
                </h3>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-mono text-xs text-[#ff8c32] flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> View Report
                </span>
                <button
                  onClick={(e) => handleDelete(item.id, e)}
                  className="p-1.5 rounded-lg hover:bg-red-500/20 text-[#a09890] hover:text-red-400 transition-all"
                  title="Delete report"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
