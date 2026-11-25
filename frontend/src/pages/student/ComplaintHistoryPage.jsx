import React, { useState, useEffect } from 'react';
import { complaintApi } from '../../api/complaintApi';
import { StatusBadge } from '../../components/StatusBadge';
import { StarRating } from '../../components/StarRating';
import { Search, Filter, History, CheckCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ComplaintHistoryPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [verifyModalTask, setVerifyModalTask] = useState(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [reopenModalTask, setReopenModalTask] = useState(null);
  const [reopenRemarks, setReopenRemarks] = useState('');

  const loadData = () => {
    complaintApi.getMyComplaints().then(setComplaints).catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    if (!verifyModalTask) return;
    try {
      await complaintApi.verify(verifyModalTask.id, { rating, feedback });
      setVerifyModalTask(null);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to verify complaint.');
    }
  };

  const handleReopenSubmit = async (e) => {
    e.preventDefault();
    if (!reopenModalTask || !reopenRemarks.trim()) return;
    try {
      await complaintApi.reopen(reopenModalTask.id, reopenRemarks);
      setReopenModalTask(null);
      setReopenRemarks('');
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to reopen ticket.');
    }
  };

  const filtered = complaints.filter((c) => {
    const matchesSearch =
      c.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.categoryName?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = selectedStatus === 'ALL' || c.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full space-y-6">
      {/* 3D Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 p-6 sm:p-7 rounded-3xl text-white shadow-xl border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-black uppercase tracking-wider mb-1">
            <History className="w-4 h-4 text-cyan-400" />
            <span>Complaint Records</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">My Complaint History</h2>
          <p className="text-xs text-indigo-100/90 font-medium">Track and filter all your submitted campus issues & resolution ratings</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card-3d bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ticket # or title..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 font-medium transition-all"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['ALL', 'NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'ESCALATED'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all shadow-2xs ${
                selectedStatus === status
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card-3d bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50/80 border-b border-slate-200 font-extrabold text-slate-700">
            <tr>
              <th className="px-5 py-3.5">Ticket #</th>
              <th className="px-5 py-3.5">Title & Category</th>
              <th className="px-5 py-3.5">Location</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">SLA Due Date</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-5 py-12 text-center text-slate-400 italic">
                  No complaint tickets found matching your query.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-indigo-50/20 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-black text-indigo-600">
                    <span className="bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">{item.ticketNumber}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-black text-slate-900">{item.title}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{item.categoryName}</p>
                  </td>
                  <td className="px-5 py-3.5 max-w-xs truncate text-slate-700">{item.locationFullPath}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={item.status} /></td>
                  <td className="px-5 py-3.5 text-[11px] text-slate-500 font-bold">{new Date(item.slaDueDate).toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-right space-x-2">
                    <Link
                      to={`/complaints/${item.id}`}
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors shadow-2xs"
                    >
                      Details
                    </Link>

                    {item.status === 'RESOLVED' && (
                      <>
                        <button
                          onClick={() => setVerifyModalTask(item)}
                          className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 hover:from-emerald-500 hover:to-teal-500 transition-all"
                        >
                          Verify & Rate
                        </button>
                        <button
                          onClick={() => setReopenModalTask(item)}
                          className="px-3 py-1.5 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/20 hover:from-rose-500 hover:to-red-500 transition-all"
                        >
                          Reopen
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Verify & Rating Modal */}
      {verifyModalTask && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800">Verify Resolution & Feedback</h3>
            <p className="text-xs text-slate-500">Rate the staff repair work for ticket <span className="font-mono font-bold">{verifyModalTask.ticketNumber}</span></p>

            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Star Rating</label>
                <StarRating value={rating} onChange={setRating} />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Feedback Comments</label>
                <textarea
                  rows="3"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="The issue was fixed promptly..."
                  className="w-full text-xs rounded-xl border p-2.5"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setVerifyModalTask(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
                >
                  Confirm & Close Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reopen Modal */}
      {reopenModalTask && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800">Reopen Complaint Ticket</h3>
            <p className="text-xs text-slate-500">Provide reason why repair work was unsatisfactory for ticket <span className="font-mono font-bold">{reopenModalTask.ticketNumber}</span></p>

            <form onSubmit={handleReopenSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Reopen Reason</label>
                <textarea
                  required
                  rows="3"
                  value={reopenRemarks}
                  onChange={(e) => setReopenRemarks(e.target.value)}
                  placeholder="Equipment broke down again within 24 hours..."
                  className="w-full text-xs rounded-xl border p-2.5"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setReopenModalTask(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold"
                >
                  Submit Reopen Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
