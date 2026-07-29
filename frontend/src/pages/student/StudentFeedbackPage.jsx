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
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">My Ratings & Feedback Hub</h2>
          <p className="text-xs text-slate-500">History of your service reviews and ratings submitted for resolved maintenance tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Total Reviews Given</p>
            <h3 className="text-2xl font-bold text-slate-800">{complaints.length}</h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Average Rating Given</p>
            <h3 className="text-2xl font-bold text-amber-500">{averageRating} / 5.0</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
            <Star className="w-6 h-6 fill-amber-500" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Service Status</p>
            <h3 className="text-sm font-bold text-emerald-600">Active Evaluator</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
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
