import React, { useState, useEffect } from 'react';
import { complaintApi } from '../../api/complaintApi';
import { StatusBadge } from '../../components/StatusBadge';
import { StarRating } from '../../components/StarRating';
import { CheckCircle2, History, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StaffHistoryPage = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    complaintApi.getAssignedToMe().then((data) => {
      setComplaints(data.filter((c) => ['RESOLVED', 'VERIFIED', 'CLOSED'].includes(c.status)));
    }).catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">My Maintenance Completion Archive</h2>
          <p className="text-xs text-slate-500">History of all resolved tasks, before/after proof images, and student ratings</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
            <tr>
              <th className="px-4 py-3">Ticket #</th>
              <th className="px-4 py-3">Title & Student</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Rating Received</th>
              <th className="px-4 py-3 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-slate-400 italic">
                  No completed maintenance tasks in your history yet.
                </td>
              </tr>
            ) : (
              complaints.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-indigo-600">{item.ticketNumber}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <p className="text-[11px] text-slate-400">By: {item.studentName}</p>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">{item.locationFullPath}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3">
                    {item.rating ? <StarRating value={item.rating} readOnly /> : <span className="text-[10px] text-slate-400">Awaiting Feedback</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/complaints/${item.id}`}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium hover:bg-slate-200"
                    >
                      View Proofs
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
