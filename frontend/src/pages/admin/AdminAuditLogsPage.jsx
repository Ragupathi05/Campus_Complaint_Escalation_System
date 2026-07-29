import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { ShieldCheck, Search, FileText } from 'lucide-react';

export const AdminAuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axiosClient.get('/analytics/audit-logs').then(setLogs).catch(console.error);
  }, []);

  const filtered = logs.filter((l) =>
    (l.ticketNumber || '').toLowerCase().includes(search.toLowerCase()) ||
    (l.action || '').toLowerCase().includes(search.toLowerCase()) ||
    (l.performedBy || '').toLowerCase().includes(search.toLowerCase()) ||
    (l.details || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">System-Wide Immutable Audit Ledger</h2>
          <p className="text-xs text-slate-500">Immutable trail of ticket creations, staff assignments, status transitions, and SLA escalations</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail by ticket #, user, or action..."
            className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <span className="text-xs font-bold text-slate-500">{filtered.length} Audit Entries</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
            <tr>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Ticket #</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Performed By</th>
              <th className="px-4 py-3">Audit Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-slate-400 italic font-sans">
                  No audit log entries matching query.
                </td>
              </tr>
            ) : (
              filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-[11px] text-slate-400">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 font-bold text-indigo-600">{log.ticketNumber || 'N/A'}</td>
                  <td className="px-4 py-3 font-sans">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{log.performedBy}</td>
                  <td className="px-4 py-3 text-slate-600 font-sans max-w-md truncate">{log.details}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
