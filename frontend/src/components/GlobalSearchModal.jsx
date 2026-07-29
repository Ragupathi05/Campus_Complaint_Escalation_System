import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Ticket, Building2, User, ChevronRight } from 'lucide-react';
import { complaintApi } from '../api/complaintApi';

export const GlobalSearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ complaints: [], departments: [], users: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults({ complaints: [], departments: [], users: [] });
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ complaints: [], departments: [], users: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await complaintApi.getMyComplaints(); // Search within accessible complaints
        const q = query.toLowerCase();
        const filtered = (res || []).filter(
          (c) =>
            c.ticketNumber?.toLowerCase().includes(q) ||
            c.title?.toLowerCase().includes(q) ||
            c.categoryName?.toLowerCase().includes(q) ||
            c.locationName?.toLowerCase().includes(q)
        );
        setResults({ complaints: filtered.slice(0, 5), departments: [], users: [] });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-950/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center space-x-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tickets (e.g. MITS-2026), issues, locations..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {loading && (
            <div className="py-8 text-center text-xs text-slate-400 animate-pulse">Searching CampusCare Database...</div>
          )}

          {!loading && query && results.complaints.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-500">No matching tickets or complaints found.</div>
          )}

          {!loading && results.complaints.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Matching Complaints</span>
              {results.complaints.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onClose();
                    navigate(`/complaints/${item.id}`);
                  }}
                  className="p-3 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/40 cursor-pointer flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-blue-100/70 text-blue-600 mt-0.5">
                      <Ticket className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-blue-600">{item.ticketNumber}</span>
                        <span className="text-xs font-semibold text-slate-800">{item.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {item.categoryName} • {item.locationName}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
              ))}
            </div>
          )}

          {!query && (
            <div className="py-6 text-center text-xs text-slate-400 space-y-2">
              <p>Type to search complaints, rooms, categories, or staff.</p>
              <div className="flex items-center justify-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-500">Esc</span>
                <span>to close</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
