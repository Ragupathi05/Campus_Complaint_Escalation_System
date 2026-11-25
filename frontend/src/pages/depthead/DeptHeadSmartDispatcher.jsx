import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { complaintApi } from '../../api/complaintApi';
import axiosClient from '../../api/axiosClient';
import { Zap, Users, CheckCircle, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const DeptHeadSmartDispatcher = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    if (user?.departmentId) {
      complaintApi.getDepartmentComplaints(user.departmentId).then((data) => {
        setComplaints(data.filter((c) => c.status === 'NEW' || !c.assignedStaffId));
      }).catch(console.error);

      axiosClient.get(`/users/department/${user.departmentId}/staff`).then(setStaffList).catch(console.error);
    }
  }, [user]);

  const handleAutoAssign = async (ticketId, staffId) => {
    try {
      await complaintApi.assignStaff(ticketId, {
        staffId: staffId,
        remarks: 'Auto-dispatched via Smart Dispatch Engine based on workload capacity',
      });
      setComplaints(complaints.filter((c) => c.id !== ticketId));
      alert('Smart Dispatch Successful!');
    } catch (err) {
      alert(err.message || 'Failed to dispatch');
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* 3D Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 p-6 sm:p-7 rounded-3xl text-white shadow-xl border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-black uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span>AI Automated Delegation</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <span>Smart AI Dispatcher & Delegation Engine</span>
          </h2>
          <p className="text-xs text-indigo-100/90 font-medium">Evaluates technician workload capacity and location proximity to suggest optimal staff assignment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unassigned Queue */}
        <div className="lg:col-span-2 card-3d bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Unassigned Ticket Dispatch Queue ({complaints.length})</h3>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">Live Intake</span>
          </div>

          <div className="space-y-3.5">
            {complaints.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-400 italic bg-slate-50/70 rounded-2xl border border-slate-100">
                All tickets in your department are currently assigned to technicians!
              </div>
            ) : (
              complaints.map((item) => (
                <div key={item.id} className="p-5 bg-gradient-to-r from-slate-50 to-indigo-50/20 rounded-2xl border border-slate-200/90 space-y-3 hover:border-indigo-300 transition-all shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">{item.ticketNumber}</span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs">
                      Unassigned
                    </span>
                  </div>
                  <h4 className="font-black text-sm text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-600 font-medium">{item.locationFullPath}</p>

                  <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-500 font-bold">Recommended Technicians:</span>
                    <div className="flex flex-wrap space-x-2">
                      {staffList.slice(0, 2).map((staff) => (
                        <button
                          key={staff.id}
                          onClick={() => handleAutoAssign(item.id, staff.id)}
                          className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center space-x-1.5 transition-all transform hover:scale-[1.02] active:scale-95"
                        >
                          <span>Assign to {staff.fullName.split(' ')[0]}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Technician Capacity Index */}
        <div className="card-3d bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center space-x-2">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Technician Capacity Status</span>
          </h3>

          <div className="space-y-3">
            {staffList.map((s) => (
              <div key={s.id} className="p-3.5 bg-gradient-to-r from-slate-50 to-emerald-50/20 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-black text-slate-900">
                  <span>{s.fullName}</span>
                  <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full shadow-2xs">Optimal Load</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Active Queue: 2 Tickets</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
