import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Building, ShieldCheck, Wrench } from 'lucide-react';

export const StaffProfilePage = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Staff Workstation Profile</h2>
        <p className="text-xs text-slate-500">MITS maintenance technician account and department assignment</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center space-x-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-purple-600/30">
            {user.fullName ? user.fullName.charAt(0) : 'T'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">{user.fullName}</h3>
            <p className="text-xs text-slate-500 font-mono">@{user.username}</p>
            <span className="inline-block text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded mt-1">
              {user.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-slate-400 font-medium flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-purple-600" />
              <span>Email</span>
            </span>
            <p className="font-semibold text-slate-800">{user.email}</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-slate-400 font-medium flex items-center space-x-1.5">
              <Building className="w-3.5 h-3.5 text-purple-600" />
              <span>Department</span>
            </span>
            <p className="font-semibold text-slate-800">{user.departmentName || 'Electrical & Maintenance'}</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-slate-400 font-medium flex items-center space-x-1.5">
              <Wrench className="w-3.5 h-3.5 text-purple-600" />
              <span>Skill Specialization</span>
            </span>
            <p className="font-semibold text-slate-800">Power Systems & Air Conditioning</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-slate-400 font-medium flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Duty Status</span>
            </span>
            <p className="font-semibold text-emerald-600">On Duty (Active Queue)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
