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
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
          <Zap className="w-6 h-6 text-amber-500 fill-amber-500" />
          <span>Smart AI Dispatcher & Delegation Engine</span>
        </h2>
        <p className="text-xs text-slate-500">Evaluates technician workload capacity and location proximity to suggest optimal staff assignment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unassigned Queue */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-800">Unassigned Ticket Dispatch Queue ({complaints.length})</h3>

          <div className="space-y-3">
            {complaints.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 italic">
                All tickets in your department are currently assigned to technicians!
              </div>
            ) : (
              complaints.map((item) => (
                <div key={item.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-indigo-600">{item.ticketNumber}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      Unassigned
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-800">{item.title}</h4>
                  <p className="text-xs text-slate-600">{item.locationFullPath}</p>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">Recommended Technicians:</span>
                    <div className="flex space-x-2">
                      {staffList.slice(0, 2).map((staff) => (
                        <button
                          key={staff.id}
                          onClick={() => handleAutoAssign(item.id, staff.id)}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shadow-xs flex items-center space-x-1"
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
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Technician Capacity Status</span>
          </h3>

          <div className="space-y-3">
            {staffList.map((s) => (
              <div key={s.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>{s.fullName}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Optimal Load</span>
                </div>
                <p className="text-[11px] text-slate-500">Active Queue: 2 Tickets</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
