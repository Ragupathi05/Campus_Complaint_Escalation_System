import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { complaintApi } from '../api/complaintApi';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Clock,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  PhoneCall,
  Megaphone,
  ArrowRight,
  Sparkles,
  MapPin,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    complaintApi
      .getMyComplaints()
      .then((res) => {
        setComplaints(res || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const total = complaints.length;
  const pending = complaints.filter(
    (c) => c.status === 'NEW' || c.status === 'ASSIGNED' || c.status === 'IN_PROGRESS'
  ).length;
  const resolved = complaints.filter((c) => c.status === 'REPAIR_COMPLETED' || c.status === 'VERIFIED').length;
  const escalated = complaints.filter((c) => c.status === 'ESCALATED').length;

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
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950/90 to-blue-950/80 z-10" />
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl z-10 pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-64 h-64 bg-indigo-600/30 rounded-full blur-2xl z-10 pointer-events-none" />

        <div className="relative z-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-cyan-300 backdrop-blur-md border border-white/20 shadow-lg flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-300" />
                <span>Student Portal</span>
              </span>
              <span className="text-xs text-indigo-200 font-semibold">• Academic Branch {user?.departmentName || 'CSE'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
              Welcome back, {user?.fullName || 'Student'} 👋
            </h1>

            <p className="text-xs text-indigo-100/90 font-medium leading-relaxed">
              Track real-time maintenance complaints, SLA countdown timers, technician assignments, and service verification.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 relative z-20">
            <Link
              to="/dashboard/student/raise"
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-black shadow-xl shadow-indigo-600/40 flex items-center space-x-2 transition-all transform hover:scale-[1.03] active:scale-95 border border-white/20"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>Raise New Complaint</span>
            </Link>
            <a
              href="tel:+918571280255"
              className="px-4.5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-extrabold border border-white/20 backdrop-blur-md flex items-center space-x-2 transition-all shadow-lg"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Emergency Helpdesk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Metrics Row - Multi-Color Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Reported" value={total} subtitle="Lifetime tickets raised" icon={Wrench} color="blue" />
        <StatCard title="Active In Repair" value={pending} subtitle="Under technician care" icon={Clock} color="cyan" />
        <StatCard title="Resolved & Closed" value={resolved} subtitle="Verified by student" icon={CheckCircle2} color="emerald" />
        <StatCard title="SLA Escalated" value={escalated} subtitle="Overdue ticket escalation" icon={AlertTriangle} color="rose" />
      </div>

      {/* Main Grid: Activity Feed & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Complaints Ledger */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">My Active Complaints Ledger</h2>
            </div>
            <Link to="/dashboard/student/history" className="text-xs font-extrabold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center space-x-1">
              <span>View Full History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-slate-400 animate-pulse font-medium">Loading active tickets...</div>
          ) : complaints.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 space-y-2 bg-slate-50/70 rounded-2xl border border-slate-100">
              <Sparkles className="w-8 h-8 text-indigo-400 mx-auto" />
              <p className="font-extrabold text-slate-800 text-sm">No active complaints found</p>
              <p className="text-slate-500">Everything in your academic block is running smoothly.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {complaints.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl border border-slate-200/90 hover:border-indigo-300 bg-gradient-to-r from-slate-50/80 to-indigo-50/30 hover:from-white hover:to-indigo-50/50 transition-all flex items-center justify-between shadow-2xs group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                        {c.ticketNumber}
                      </span>
                      <StatusBadge status={c.status} />
                    </div>
                    <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">{c.title}</h3>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-semibold">
                      <span className="bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded-md text-[10px] font-bold">{c.categoryName}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{c.locationName}</span>
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/complaints/${c.id}`}
                    className="p-2.5 rounded-2xl bg-white group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 transition-all border border-slate-200/80 shadow-2xs"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Announcements & Emergency Contacts */}
        <div className="space-y-6">
          {/* Campus Announcements Widget */}
          <div className="bg-gradient-to-br from-indigo-50/90 via-slate-50 to-blue-50/80 rounded-3xl p-6 border border-indigo-100 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-xs font-black text-indigo-950 uppercase tracking-wider">
              <Megaphone className="w-4 h-4 text-indigo-600" />
              <span>Campus Maintenance Notice</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 border border-indigo-100 space-y-1 text-xs shadow-2xs">
              <span className="font-extrabold text-indigo-950 block">Block A Power Transformer Audit</span>
              <p className="text-slate-600 text-[11px] leading-relaxed font-medium">
                Scheduled electrical audit on Saturday from 2:00 PM to 4:00 PM. Backup generators will supply AC labs.
              </p>
            </div>
          </div>

          {/* Emergency Helpline Contacts Widget */}
          <div className="bg-gradient-to-br from-emerald-50/90 via-slate-50 to-teal-50/80 rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-3">
            <h3 className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Emergency Help Desk</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-100 flex items-center justify-between shadow-2xs">
                <div>
                  <span className="font-extrabold text-slate-900 block">Electrical Emergency</span>
                  <span className="text-[10px] text-slate-500 font-semibold">24/7 Power Outage Desk</span>
                </div>
                <a href="tel:+918571280255" className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-xl font-extrabold text-[10px] shadow-xs hover:bg-emerald-700 transition-colors">
                  Call
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-100 flex items-center justify-between shadow-2xs">
                <div>
                  <span className="font-extrabold text-slate-900 block">IT & Wi-Fi Support Desk</span>
                  <span className="text-[10px] text-slate-500 font-semibold">Lab & Network Support</span>
                </div>
                <a href="tel:+918571280255" className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-xl font-extrabold text-[10px] shadow-xs hover:bg-indigo-700 transition-colors">
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
