import React, { useState, useEffect } from 'react';
import { complaintApi } from '../../api/complaintApi';
import { StatusBadge } from '../../components/StatusBadge';
import { AlertOctagon, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExecutiveAuditPage = () => {
  const [escalated, setEscalated] = useState([]);

  useEffect(() => {
    complaintApi.getEscalated().then(setEscalated).catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">MITS Executive Audit Ledger</h2>
          <p className="text-xs text-slate-500">Read-only audit ledger of severe SLA timeout breaches for Principal & Vice Principal review</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
            <tr>
              <th className="px-4 py-3">Ticket #</th>
              <th className="px-4 py-3">Title & Dept</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">SLA Due Date</th>
              <th className="px-4 py-3 text-right">Audit Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {escalated.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-mono font-bold text-rose-600">{item.ticketNumber}</td>
                <td className="px-4 py-3 font-semibold text-slate-800">{item.title}</td>
                <td className="px-4 py-3">{item.locationFullPath}</td>
                <td className="px-4 py-3 text-slate-700">{item.studentName}</td>
                <td className="px-4 py-3 text-rose-600 font-semibold">{new Date(item.slaDueDate).toLocaleString()}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    to={`/complaints/${item.id}`}
                    className="px-3 py-1 bg-slate-800 text-white rounded-md text-[11px] font-medium"
                  >
                    Audit Record
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
