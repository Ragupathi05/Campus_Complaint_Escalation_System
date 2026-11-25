import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, PlusCircle, History, Star, User, AlertTriangle, Users, Building,
  AlertOctagon, CheckCircle2, Flame, Wrench, Package, Calendar, Award, Zap, Clock,
  MapPin, ShieldCheck, BarChart3, TrendingUp, Activity, FileText, PhoneCall
} from 'lucide-react';

export const Sidebar = () => {
  const { user } = useAuth();
  if (!user) return null;

  const role = user.role;
  const links = [];

  if (role === 'ROLE_STUDENT' || role === 'ROLE_FACULTY') {
    links.push({ to: '/dashboard/student', label: 'Overview Dashboard', icon: LayoutDashboard, badgeColor: 'text-indigo-600' });
    links.push({ to: '/dashboard/student/feed', label: 'Campus Feed & Upvote', icon: Flame, badgeColor: 'text-cyan-500' });
    links.push({ to: '/dashboard/student/raise', label: 'Raise New Complaint', icon: PlusCircle, badgeColor: 'text-emerald-600' });
    links.push({ to: '/dashboard/student/history', label: 'Complaint History', icon: History, badgeColor: 'text-purple-600' });
    links.push({ to: '/dashboard/student/feedback', label: 'Ratings & Reviews', icon: Star, badgeColor: 'text-indigo-500' });
    links.push({ to: '/dashboard/student/profile', label: 'My Profile', icon: User, badgeColor: 'text-blue-600' });
  } else if (role === 'ROLE_STAFF') {
    links.push({ to: '/dashboard/staff/workstation', label: 'Interactive Workstation', icon: Wrench, badgeColor: 'text-blue-600' });
    links.push({ to: '/dashboard/staff/inventory', label: 'Spare Parts Requisition', icon: Package, badgeColor: 'text-purple-600' });
    links.push({ to: '/dashboard/staff/schedule', label: 'Daily Shift Route', icon: Calendar, badgeColor: 'text-emerald-600' });
    links.push({ to: '/dashboard/staff/performance', label: 'Performance Scorecard', icon: Award, badgeColor: 'text-cyan-500' });
  } else if (role === 'ROLE_DEPT_HEAD') {
    links.push({ to: '/dashboard/dept-head/dispatcher', label: 'AI Smart Dispatcher', icon: Zap, badgeColor: 'text-blue-500' });
    links.push({ to: '/dashboard/dept-head/triage', label: 'Complaint Triage Queue', icon: AlertTriangle, badgeColor: 'text-rose-600' });
    links.push({ to: '/dashboard/dept-head/staff', label: 'Staff Workload Matrix', icon: Users, badgeColor: 'text-blue-600' });
    links.push({ to: '/dashboard/dept-head/sla-editor', label: 'Category SLA Config', icon: Clock, badgeColor: 'text-indigo-600' });
    links.push({ to: '/dashboard/dept-head/roster', label: 'Technician Shift Roster', icon: Calendar, badgeColor: 'text-purple-600' });
    links.push({ to: '/dashboard/dept-head/analytics', label: 'Bottleneck Analytics', icon: TrendingUp, badgeColor: 'text-emerald-600' });
  } else if (role === 'ROLE_ADMIN') {
    links.push({ to: '/dashboard/admin', label: 'Executive Analytics', icon: LayoutDashboard, badgeColor: 'text-blue-600' });
    links.push({ to: '/dashboard/admin/locations', label: 'Location Tree Builder', icon: MapPin, badgeColor: 'text-emerald-600' });
    links.push({ to: '/dashboard/admin/departments', label: 'Departments & SLA', icon: Building, badgeColor: 'text-purple-600' });
    links.push({ to: '/dashboard/admin/users', label: 'User Directory', icon: Users, badgeColor: 'text-indigo-600' });
    links.push({ to: '/dashboard/admin/audit', label: 'Security Audit Ledger', icon: FileText, badgeColor: 'text-purple-500' });
  } else if (role === 'ROLE_HIGHER_OFFICIAL') {
    links.push({ to: '/dashboard/higher-official/breaches', label: 'SLA Failure Audit', icon: AlertOctagon, badgeColor: 'text-rose-600' });
    links.push({ to: '/dashboard/higher-official/leaderboard', label: 'Department Leaderboard', icon: Award, badgeColor: 'text-blue-500' });
    links.push({ to: '/dashboard/higher-official/infrastructure', label: 'Facility Health Map', icon: Activity, badgeColor: 'text-emerald-600' });
  }

  return (
    <aside className="w-64 bg-white/95 backdrop-blur-md text-slate-700 min-h-[calc(100vh-4rem)] p-4 border-r border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="space-y-1.5">
        <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-indigo-100/80 mb-3">
          <p className="text-[10px] font-black uppercase tracking-wider text-indigo-700">
            {role === 'ROLE_DEPT_HEAD' ? 'SUPERVISOR' : role.replace('ROLE_', '')} PORTAL
          </p>
          <p className="text-[11px] text-slate-500 font-medium truncate">{user.fullName}</p>
        </div>

        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30 font-extrabold translate-x-1'
                    : 'text-slate-600 hover:bg-slate-100/90 hover:text-slate-900 font-semibold'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{link.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Emergency Quick Contact Widget */}
      <div className="pt-4 border-t border-slate-200/80">
        <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/80 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
            <span>Facility Emergency</span>
          </div>
          <p className="text-[10px] text-emerald-800 font-medium">24/7 Power Outage & Water Leak Helpdesk</p>
          <a
            href="tel:+918571280255"
            className="block text-center w-full py-1.5 bg-emerald-600 text-white rounded-xl text-[11px] font-extrabold shadow-2xs hover:bg-emerald-700 transition-colors"
          >
            Call +91 85712 80255
          </a>
        </div>
      </div>
    </aside>
  );
};
