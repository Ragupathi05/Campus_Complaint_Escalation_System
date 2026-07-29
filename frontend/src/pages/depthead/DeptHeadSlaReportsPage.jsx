import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { complaintApi } from '../../api/complaintApi';
import { StatusBadge } from '../../components/StatusBadge';
import { Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DeptHeadSlaReportsPage = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (user?.departmentId) {
      complaintApi.getDepartmentComplaints(user.departmentId).then(setComplaints).catch(console.error);
    }
  }, [user]);

  const escalated = complaints.filter((c) => c.status === 'ESCALATED');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Department SLA Risk & Timeout Audit</h2>
          <p className="text-xs text-slate-500">Monitor department tickets approaching SLA deadline or escalated to management</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 font-bold text-slate-800 text-sm flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <span>Escalated & At-Risk Tickets ({escalated.length})</span>
        </div>

        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
            <tr>
              <th className="px-4 py-3">Ticket #</th>
              <th className="px-4 py-3">Title & Category</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">SLA Due Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {escalated.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-slate-400 italic">
                  No tickets currently breached SLA timeout thresholds in your department!
                </td>
              </tr>
            ) : (
              escalated.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-rose-600">{item.ticketNumber}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{item.title}</td>
                  <td className="px-4 py-3">{item.locationFullPath}</td>
                  <td className="px-4 py-3 text-rose-600 font-semibold">{new Date(item.slaDueDate).toLocaleString()}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/complaints/${item.id}`}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium"
                    >
                      Audit
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
