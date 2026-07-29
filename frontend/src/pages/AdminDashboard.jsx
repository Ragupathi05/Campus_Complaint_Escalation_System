import React, { useState, useEffect } from 'react';
import { analyticsApi } from '../api/analyticsApi';
import { complaintApi } from '../api/complaintApi';
import { StatCard } from '../components/StatCard';
import { StatusBadge, PriorityBadge } from '../components/StatusBadge';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ShieldAlert, AlertTriangle, CheckCircle2, Clock, Activity, Building2 } from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [escalatedList, setEscalatedList] = useState([]);

  useEffect(() => {
    analyticsApi.getGlobal().then(setStats).catch(console.error);
    complaintApi.getEscalated().then(setEscalatedList).catch(console.error);
  }, []);

  if (!stats) return <div className="p-8 text-slate-500 text-xs">Loading CampusCare analytics...</div>;

  const categoryChartData = Object.entries(stats.complaintsByCategory || {}).map(([key, val]) => ({ name: key, count: val }));
  const priorityChartData = Object.entries(stats.complaintsByPriority || {}).map(([key, val]) => ({ name: key, count: val }));

  const COLORS = ['#2563eb', '#f59e0b', '#22c55e', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6 pb-12">
      {/* 3D Futuristic Hero Banner with Campus Image Backdrop */}
      <div className="relative rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden bg-slate-950 border border-indigo-500/20 group">
        {/* Futuristic 3D Campus Image Background */}
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity scale-105 group-hover:scale-100 transition-transform duration-1000">
          <img
            src="/campus_care_hero.png"
            alt="Campus Care 3D Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950/90 to-purple-950/80 z-10" />
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl z-10 pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-64 h-64 bg-blue-600/30 rounded-full blur-2xl z-10 pointer-events-none" />

        <div className="relative z-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-amber-300 backdrop-blur-md border border-white/20 shadow-lg flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span>System Administration</span>
              </span>
              <span className="text-xs text-indigo-200 font-semibold">• MITS Campus Control Center</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
              CampusCare Executive Analytics 📊
            </h1>

            <p className="text-xs text-indigo-100/90 font-medium leading-relaxed">
              Real-time SLA breach audit, department resolution velocity, and campus facility health metrics.
            </p>
          </div>

          <div className="flex items-center space-x-3.5 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl relative z-20">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm font-black text-white block">Campus Health: 96%</span>
              <span className="text-[11px] text-indigo-200 font-semibold">Operational Efficiency Metric</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Stat Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard title="Total Tickets" value={stats.totalComplaints} subtitle="Lifetime submissions" icon={Building2} color="blue" />
        <StatCard title="In Progress" value={stats.inProgressComplaints} subtitle="Under repair care" icon={Clock} color="amber" />
        <StatCard title="Resolved" value={stats.resolvedComplaints} subtitle="Technician completed" icon={CheckCircle2} color="emerald" />
        <StatCard title="SLA Escalated" value={stats.escalatedComplaints} subtitle="Overdue SLA breaches" icon={AlertTriangle} color="rose" />
        <StatCard title="Closed Tickets" value={stats.closedComplaints} subtitle="Archived tickets" icon={ShieldAlert} color="indigo" />
      </div>

      {/* Recharts Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Tickets Breakdown by Issue Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Priority Level Allocation</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={priorityChartData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {priorityChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Escalated Tickets Audit */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>SLA Timeout Escalated Audit Queue</span>
          </h3>
          <span className="text-xs text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full font-bold border border-rose-200">
            {escalatedList.length} Active SLA Breaches
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
              <tr>
                <th className="px-4 py-3">Ticket</th>
                <th className="px-4 py-3">Department & Category</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">SLA Due Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {escalatedList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-rose-600">{item.ticketNumber}</td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="text-[11px] text-slate-400">{item.departmentName}</p>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">{item.locationFullPath}</td>
                  <td className="px-4 py-3 text-rose-600 font-bold">{new Date(item.slaDueDate).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
