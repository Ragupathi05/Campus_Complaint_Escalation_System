import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { complaintApi } from '../../api/complaintApi';
import { BarChart2, AlertTriangle, MapPin, TrendingUp } from 'lucide-react';

export const DeptHeadAnalyticsDeepDive = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (user?.departmentId) {
      complaintApi.getDepartmentComplaints(user.departmentId).then(setComplaints).catch(console.error);
    }
  }, [user]);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Department Bottleneck & Root-Cause Analytics</h2>
        <p className="text-xs text-slate-500">Identifies campus locations and equipment categories with recurring failures</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Recurring Breakdown Hotspots</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Block A (EB Block) - 2nd Floor AC Units</p>
                <p className="text-[11px] text-slate-400">3 breakdown tickets this month</p>
              </div>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">High Frequency</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Main Library Reading Hall B Lighting</p>
                <p className="text-[11px] text-slate-400">2 breakdown tickets this month</p>
              </div>
              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">Moderate</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Resolution Velocity Insights</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 space-y-1">
              <span className="text-emerald-800 font-bold block">Average Triage Time</span>
              <p className="text-slate-600">Tickets are assigned to staff within 28 minutes of submission.</p>
            </div>

            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 space-y-1">
              <span className="text-indigo-800 font-bold block">Parts Replacement Bottleneck</span>
              <p className="text-slate-600">Waiting parts adds an average of 4.2 hours to total resolution time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
