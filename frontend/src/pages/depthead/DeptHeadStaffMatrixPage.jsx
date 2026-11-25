import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { analyticsApi } from '../../api/analyticsApi';
import { Users, CheckCircle2, Clock, Wrench } from 'lucide-react';

export const DeptHeadStaffMatrixPage = () => {
  const { user } = useAuth();
  const [workload, setWorkload] = useState([]);

  useEffect(() => {
    if (user?.departmentId) {
      analyticsApi.getDepartmentWorkload(user.departmentId).then(setWorkload).catch(console.error);
    }
  }, [user]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Department Staff Workload Capacity Matrix</h2>
          <p className="text-xs text-slate-500">Monitor active technician workload distribution and resolution metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {workload.map((staff) => (
          <div key={staff.staffId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-800">{staff.staffName}</h3>
                <p className="text-xs text-slate-400 font-mono">{staff.staffEmail}</p>
              </div>
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Users className="w-5 h-5" />
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-100">
                <p className="text-[10px] text-purple-600 font-medium">Assigned</p>
                <p className="font-bold text-purple-700 text-base">{staff.assignedCount}</p>
              </div>
              <div className="bg-cyan-50 p-2.5 rounded-xl border border-cyan-100">
                <p className="text-[10px] text-cyan-700 font-medium">In Work</p>
                <p className="font-bold text-cyan-800 text-base">{staff.inProgressCount}</p>
              </div>
              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                <p className="text-[10px] text-emerald-600 font-medium">Resolved</p>
                <p className="font-bold text-emerald-700 text-base">{staff.resolvedCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
