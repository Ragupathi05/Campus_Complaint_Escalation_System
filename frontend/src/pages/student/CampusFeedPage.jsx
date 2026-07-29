import React, { useState, useEffect } from 'react';
import { complaintApi } from '../../api/complaintApi';
import { StatusBadge } from '../../components/StatusBadge';
import { ThumbsUp, Flame, Search, MapPin, Clock, ArrowUpDown, MessageSquare, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CampusFeedPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('upvotes'); // 'upvotes' or 'latest'
  const [loading, setLoading] = useState(true);

  const loadFeed = () => {
    complaintApi.getPublicFeed()
      .then((data) => {
        setComplaints(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const handleUpvote = async (id) => {
    try {
      await complaintApi.upvote(id);
      loadFeed();
    } catch (err) {
      alert(err.message || 'Failed to upvote ticket.');
    }
  };

  const filtered = complaints
    .filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
      c.locationFullPath?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'upvotes') {
        return (b.upvoteCount || 0) - (a.upvoteCount || 0);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
            <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
            <span>MITS Campus Community Feed & Upvote Hub</span>
          </h2>
          <p className="text-xs text-slate-500">
            See issues reported by fellow students across campus. Upvote shared problems to auto-escalate priority!
          </p>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search campus issues (e.g. Wi-Fi, Water, Hostel)..."
            className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-medium">Sort by:</span>
          <button
            onClick={() => setSortBy('upvotes')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              sortBy === 'upvotes'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Most Upvoted</span>
          </button>
          <button
            onClick={() => setSortBy('latest')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              sortBy === 'latest'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Latest</span>
          </button>
        </div>
      </div>

      {/* Community Feed Cards */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading campus feed...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
            No public campus complaints found matching your query.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-white p-5 rounded-2xl border transition-all hover:shadow-md space-y-3 ${
                item.priority === 'CRITICAL'
                  ? 'border-rose-200 bg-gradient-to-r from-rose-50/20 to-white'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-indigo-600">{item.ticketNumber}</span>
                    <StatusBadge status={item.status} />
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {item.categoryName}
                    </span>
                    {item.upvoteCount >= 5 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 flex items-center space-x-1">
                        <Flame className="w-3 h-3 text-amber-600 fill-amber-600" />
                        <span>High Priority Escalated</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-800">{item.title}</h3>
                </div>

                {/* Upvote Button */}
                <button
                  onClick={() => handleUpvote(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                    item.hasUpvoted
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${item.hasUpvoted ? 'fill-white' : ''}`} />
                  <span>{item.hasUpvoted ? 'Upvoted' : 'Me Too (+1)'}</span>
                  <span className="bg-amber-900/20 px-1.5 py-0.5 rounded text-[11px]">{item.upvoteCount || 0}</span>
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{item.description}</p>

              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500 gap-2">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="truncate max-w-xs">{item.locationFullPath}</span>
                  </span>
                  <span>Reported by: <strong className="text-slate-700">{item.studentName}</strong></span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                  <Link
                    to={`/complaints/${item.id}`}
                    className="text-indigo-600 font-semibold flex items-center space-x-1 hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>View Thread & Proofs &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
