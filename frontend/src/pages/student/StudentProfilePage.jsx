import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Building, Shield, Bell } from 'lucide-react';

export const StudentProfilePage = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">My Student Profile</h2>
        <p className="text-xs text-slate-500">MITS Campus student profile and notification settings</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center space-x-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-indigo-600/30">
            {user.fullName ? user.fullName.charAt(0) : 'S'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">{user.fullName}</h3>
            <p className="text-xs text-slate-500 font-mono">@{user.username}</p>
            <span className="inline-block text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded mt-1">
              {user.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-slate-400 font-medium flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-600" />
              <span>Email Address</span>
            </span>
            <p className="font-semibold text-slate-800">{user.email}</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-slate-400 font-medium flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-indigo-600" />
              <span>Phone Number</span>
            </span>
            <p className="font-semibold text-slate-800">+91 98765 43210</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-slate-400 font-medium flex items-center space-x-1.5">
              <Building className="w-3.5 h-3.5 text-indigo-600" />
              <span>Department</span>
            </span>
            <p className="font-semibold text-slate-800">{user.departmentName || 'Computer Science & Engineering'}</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-slate-400 font-medium flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-indigo-600" />
              <span>Account Status</span>
            </span>
            <p className="font-semibold text-emerald-600">Active & Verified Student</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h4 className="text-xs font-bold text-slate-700 flex items-center space-x-2">
            <Bell className="w-4 h-4 text-indigo-600" />
            <span>Notification Preferences</span>
          </h4>

          <div className="space-y-2 text-xs">
            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
              <span className="text-slate-700 font-medium">SLA Resolution Status SMS Alerts</span>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
            </label>
            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
              <span className="text-slate-700 font-medium">Staff Reassignment Email Notifications</span>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
