import React, { useState, useEffect } from 'react';
import { analyticsApi } from '../../api/analyticsApi';
import { Award, CheckCircle, AlertOctagon, TrendingUp } from 'lucide-react';

export const ExecutiveReportsPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    analyticsApi.getGlobal().then(setStats).catch(console.error);
  }, []);

  if (!stats) return <div className="p-6 text-slate-500 text-xs">Loading campus performance reports...</div>;

  const resolutionRate = stats.totalComplaints > 0
    ? ((stats.resolvedComplaints / stats.totalComplaints) * 100).toFixed(1)
    : '100.0';

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Campus Facility Maintenance Executive Report</h2>
        <p className="text-xs text-slate-500">MITS official campus infrastructure performance and SLA compliance scorecard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-xs font-medium text-slate-500">Overall Resolution Rate</p>
          <h3 className="text-3xl font-bold text-emerald-600">{resolutionRate}%</h3>
          <p className="text-[11px] text-slate-400">Total Solved Maintenance Tickets</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-xs font-medium text-slate-500">SLA Breach Index</p>
          <h3 className="text-3xl font-bold text-rose-600">{stats.escalatedComplaints}</h3>
          <p className="text-[11px] text-slate-400">Tickets Requiring Penalty Triage</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-xs font-medium text-slate-500">Infrastructure Health</p>
          <h3 className="text-3xl font-bold text-indigo-600">Optimal</h3>
          <p className="text-[11px] text-slate-400">Active Campus Triage Engine</p>
        </div>
      </div>
    </div>
  );
};
