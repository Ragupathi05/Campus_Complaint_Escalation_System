import React, { useState, useEffect } from 'react';
import { complaintApi } from '../../api/complaintApi';
import { StarRating } from '../../components/StarRating';
import { Star, MessageSquare, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentFeedbackPage = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    complaintApi.getMyComplaints().then((data) => {
      setComplaints(data.filter((c) => c.rating != null));
    }).catch(console.error);
  }, []);

  const averageRating = complaints.length > 0
    ? (complaints.reduce((acc, curr) => acc + curr.rating, 0) / complaints.length).toFixed(1)
    : '5.0';

  return (
    <div className="w-full space-y-6">
      <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-emerald-950 p-6 sm:p-7 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-teal-500/20">
        <div>
          <div className="flex items-center space-x-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4 text-teal-300" />
            <span>Service Evaluation Hub</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">My Ratings & Feedback Hub</h2>
          <p className="text-xs text-teal-100/90 font-medium">History of your service reviews and ratings submitted for resolved maintenance tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="card-3d bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Reviews Given</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{complaints.length}</h3>
          </div>
          <div className="p-3.5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-md shadow-indigo-600/25">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Average Rating Given</p>
            <h3 className="text-3xl font-black text-blue-600 mt-1">{averageRating} / 5.0</h3>
          </div>
          <div className="p-3.5 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl shadow-md shadow-indigo-600/25">
            <Star className="w-6 h-6 fill-white" />
          </div>
        </div>

        <div className="card-3d bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Service Status</p>
            <h3 className="text-xl font-black text-emerald-600 mt-1">Active Evaluator</h3>
          </div>
          <div className="p-3.5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md shadow-emerald-600/25">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {complaints.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
            You have not submitted feedback for any resolved complaints yet.
          </div>
        ) : (
          complaints.map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-600">{c.ticketNumber}</span>
                  <h4 className="text-sm font-bold text-slate-800">{c.title}</h4>
                </div>
                <StarRating value={c.rating} readOnly />
              </div>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                "{c.feedback || 'No comments provided.'}"
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Resolved by: {c.assignedStaffName || 'Staff Member'}</span>
                <Link to={`/complaints/${c.id}`} className="text-indigo-600 font-semibold hover:underline">
                  View Complaint Proofs &rarr;
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
