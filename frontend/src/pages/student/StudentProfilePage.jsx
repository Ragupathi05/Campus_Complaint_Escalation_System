import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Building, Shield, Bell } from 'lucide-react';

export const StudentProfilePage = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="w-full space-y-6">
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 p-6 sm:p-7 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-indigo-400/20">
        <div>
          <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">
            <User className="w-4 h-4 text-indigo-300" />
            <span>MITS Campus Profile</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">My Student Profile</h2>
          <p className="text-xs text-indigo-200/90 font-medium">Verified credentials, institutional department, and notification settings</p>
        </div>
      </div>

      <div className="card-3d bg-white p-7 rounded-3xl border border-slate-200/90 shadow-md space-y-6">
        <div className="flex items-center space-x-5 pb-6 border-b border-slate-100">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl flex items-center justify-center font-black text-3xl shadow-xl shadow-indigo-600/30 ring-4 ring-indigo-50">
            {user.fullName ? user.fullName.charAt(0) : 'S'}
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{user.fullName}</h3>
            <p className="text-xs text-slate-500 font-mono font-semibold">@{user.username}</p>
            <span className="inline-block text-[11px] font-black bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100 mt-2 shadow-2xs">
              {user.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/70 space-y-1 shadow-2xs">
            <span className="text-slate-500 font-bold flex items-center space-x-1.5 uppercase tracking-wider text-[10px]">
              <Mail className="w-3.5 h-3.5 text-indigo-600" />
              <span>Email Address</span>
            </span>
            <p className="font-extrabold text-slate-900 text-sm">{user.email}</p>
          </div>

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/70 space-y-1 shadow-2xs">
            <span className="text-slate-500 font-bold flex items-center space-x-1.5 uppercase tracking-wider text-[10px]">
              <Phone className="w-3.5 h-3.5 text-indigo-600" />
              <span>Phone Number</span>
            </span>
            <p className="font-extrabold text-slate-900 text-sm">+91 98765 43210</p>
          </div>

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/70 space-y-1 shadow-2xs">
            <span className="text-slate-500 font-bold flex items-center space-x-1.5 uppercase tracking-wider text-[10px]">
              <Building className="w-3.5 h-3.5 text-indigo-600" />
              <span>Department</span>
            </span>
            <p className="font-extrabold text-slate-900 text-sm">{user.departmentName || 'Computer Science & Engineering'}</p>
          </div>

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/70 space-y-1 shadow-2xs">
            <span className="text-slate-500 font-bold flex items-center space-x-1.5 uppercase tracking-wider text-[10px]">
              <Shield className="w-3.5 h-3.5 text-indigo-600" />
              <span>Account Status</span>
            </span>
            <p className="font-extrabold text-emerald-600 text-sm">Active & Verified Student</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center space-x-2">
            <Bell className="w-4 h-4 text-indigo-600" />
            <span>Notification Preferences</span>
          </h4>

          <div className="space-y-2 text-xs">
            <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 cursor-pointer shadow-2xs">
              <span className="text-slate-700 font-bold">SLA Resolution Status SMS Alerts</span>
              <input type="checkbox" defaultChecked className="rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4" />
            </label>
            <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 cursor-pointer shadow-2xs">
              <span className="text-slate-700 font-bold">Staff Reassignment Email Notifications</span>
              <input type="checkbox" defaultChecked className="rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
