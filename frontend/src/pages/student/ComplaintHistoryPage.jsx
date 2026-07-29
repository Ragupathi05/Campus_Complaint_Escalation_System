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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">My Complaint History</h2>
          <p className="text-xs text-slate-500">Track and filter all your submitted campus issues & resolution ratings</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ticket # or title..."
            className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto">
          {['ALL', 'NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'ESCALATED'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStatus === status
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
            <tr>
              <th className="px-4 py-3">Ticket #</th>
              <th className="px-4 py-3">Title & Category</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">SLA Due Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-slate-400 italic">
                  No complaint tickets found matching your query.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-indigo-600">{item.ticketNumber}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <p className="text-[11px] text-slate-400">{item.categoryName}</p>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">{item.locationFullPath}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3 text-[11px] text-slate-500">{new Date(item.slaDueDate).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Link
                      to={`/complaints/${item.id}`}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium hover:bg-slate-200"
                    >
                      Details
                    </Link>

                    {item.status === 'RESOLVED' && (
                      <>
                        <button
                          onClick={() => setVerifyModalTask(item)}
                          className="px-2.5 py-1 bg-emerald-600 text-white rounded-md text-[11px] font-semibold hover:bg-emerald-500"
                        >
                          Verify & Rate
                        </button>
                        <button
                          onClick={() => setReopenModalTask(item)}
                          className="px-2.5 py-1 bg-rose-600 text-white rounded-md text-[11px] font-semibold hover:bg-rose-500"
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
