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
    <div className="w-full space-y-6">
      {/* 3D Header Card */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-900 p-6 sm:p-7 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-indigo-500/20">
        <div>
          <div className="flex items-center space-x-2 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 text-cyan-400 fill-cyan-400 animate-pulse" />
            <span>Campus Transparency Hub</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">MITS Campus Community Feed & Upvote Hub</h2>
          <p className="text-xs text-indigo-200/90 font-medium">See issues reported by fellow students across campus. Upvote shared problems to auto-escalate priority!</p>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="card-3d bg-white p-4.5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search campus issues (e.g. Wi-Fi, Water, Hostel)..."
            className="w-full text-xs font-medium pl-10 pr-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Sort by:</span>
          <button
            onClick={() => setSortBy('upvotes')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center space-x-1.5 transition-all shadow-2xs ${
              sortBy === 'upvotes'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Most Upvoted</span>
          </button>
          <button
            onClick={() => setSortBy('latest')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center space-x-1.5 transition-all shadow-2xs ${
              sortBy === 'latest'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30'
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
          <div className="p-8 text-center text-xs text-slate-400 animate-pulse font-medium">Loading campus feed...</div>
        ) : filtered.length === 0 ? (
          <div className="card-3d bg-white p-12 rounded-3xl border border-slate-200 text-center text-xs text-slate-400">
            No public campus complaints found matching your query.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`card-3d bg-white p-6 rounded-3xl border transition-all space-y-3.5 ${
                item.priority === 'CRITICAL'
                  ? 'border-rose-300 bg-gradient-to-r from-rose-50/30 to-white'
                  : 'border-slate-200/90'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                      {item.ticketNumber}
                    </span>
                    <StatusBadge status={item.status} />
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700">
                      {item.categoryName}
                    </span>
                    {item.upvoteCount >= 5 && (
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 flex items-center space-x-1 shadow-2xs">
                        <Flame className="w-3 h-3 text-rose-600 fill-rose-600" />
                        <span>High Priority Escalated</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">{item.title}</h3>
                </div>

                {/* Upvote Button with 3D Depth */}
                <button
                  onClick={() => handleUpvote(item.id)}
                  className={`px-4.5 py-2.5 rounded-2xl text-xs font-black flex items-center space-x-2 transition-all shadow-sm ${
                    item.hasUpvoted
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200/90'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${item.hasUpvoted ? 'fill-white' : ''}`} />
                  <span>{item.hasUpvoted ? 'Upvoted' : 'Me Too (+1)'}</span>
                  <span className="bg-black/10 px-2 py-0.5 rounded-full text-[11px] font-bold">{item.upvoteCount || 0}</span>
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2">{item.description}</p>

              <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500 gap-2">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="truncate max-w-md">{item.locationFullPath}</span>
                  </span>
                  <span>Reported by: <strong className="text-slate-800 font-bold">{item.studentName}</strong></span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-slate-400 font-medium">{new Date(item.createdAt).toLocaleDateString()}</span>
                  <Link
                    to={`/complaints/${item.id}`}
                    className="text-indigo-600 font-bold flex items-center space-x-1 hover:text-indigo-700 hover:underline"
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
