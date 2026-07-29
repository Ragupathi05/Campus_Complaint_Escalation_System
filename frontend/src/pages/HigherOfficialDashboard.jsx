import React, { useState, useEffect } from 'react';
import { complaintApi } from '../api/complaintApi';
import { StatusBadge, PriorityBadge } from '../components/StatusBadge';
import { StatCard } from '../components/StatCard';
import { AlertOctagon, FileText, CheckCircle2, ShieldAlert, Award, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HigherOfficialDashboard = () => {
  const [escalated, setEscalated] = useState([]);

  useEffect(() => {
    complaintApi.getEscalated().then(setEscalated).catch(console.error);
  }, []);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Executive Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Executive Management
            </span>
            <span className="text-xs text-slate-400">• Office of the Principal & Dean</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            MITS Campus Health & SLA Oversight
          </h1>
          <p className="text-xs text-slate-400">
            Read-only executive audit portal monitoring department SLA compliance, severe escalations, and campus infrastructure.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">98.2% Campus SLA Health</span>
            <span className="text-[10px] text-slate-400">Target Resolution Benchmark</span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Active Escalations" value={escalated.length} subtitle="Requires Principal oversight" icon={AlertOctagon} color="rose" />
        <StatCard title="Overall SLA Compliance" value="98.2%" subtitle="Target resolution within SLA" icon={CheckCircle2} color="emerald" />
        <StatCard title="Department Leaderboard" value="#1 Electrical" subtitle="Fastest resolution velocity" icon={Award} color="blue" />
      </div>

      {/* SLA Timeout Breached Tickets */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
            <AlertOctagon className="w-4 h-4 text-rose-600" />
            <span>Severe SLA Timeout Escalated Tickets Audit</span>
          </h3>
          <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
            {escalated.length} Active Escalations
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
              <tr>
                <th className="px-4 py-3">Ticket</th>
                <th className="px-4 py-3">Issue Title & Dept</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">SLA Due Date</th>
                <th className="px-4 py-3 text-right">Audit Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {escalated.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-12 text-center text-slate-400 italic">
                    No tickets currently breached SLA timeouts. All campus departments operating within thresholds!
                  </td>
                </tr>
              ) : (
                escalated.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-rose-600">{item.ticketNumber}</td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-900">{item.title}</p>
                      <p className="text-[11px] text-slate-400">{item.departmentName}</p>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate">{item.locationFullPath}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{item.studentName}</td>
                    <td className="px-4 py-3 text-rose-600 font-bold">{new Date(item.slaDueDate).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/complaints/${item.id}`}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[11px] font-bold transition-colors"
                      >
                        Audit Record
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
