import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { complaintApi } from '../api/complaintApi';
import { analyticsApi } from '../api/analyticsApi';
import { StatusBadge, PriorityBadge } from '../components/StatusBadge';
import { StatCard } from '../components/StatCard';
import { UserCheck, AlertTriangle, Users, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

export const DeptHeadDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [workload, setWorkload] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [assignModalTask, setAssignModalTask] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [assignRemarks, setAssignRemarks] = useState('');

  const loadData = () => {
    if (user?.departmentId) {
      complaintApi.getDepartmentComplaints(user.departmentId).then(setComplaints).catch(console.error);
      analyticsApi.getDepartmentWorkload(user.departmentId).then(setWorkload).catch(console.error);
      axiosClient.get(`/users/department/${user.departmentId}/staff`).then(setStaffList).catch(console.error);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!assignModalTask || !selectedStaffId) return;

    try {
      await complaintApi.assignStaff(assignModalTask.id, {
        staffId: parseInt(selectedStaffId, 10),
        remarks: assignRemarks,
      });
      setAssignModalTask(null);
      setSelectedStaffId('');
      setAssignRemarks('');
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to assign staff.');
    }
  };

  const total = complaints.length;
  const unassigned = complaints.filter((c) => c.status === 'NEW').length;
  const activeWork = complaints.filter((c) => ['ACCEPTED', 'IN_PROGRESS', 'WAITING_PARTS'].includes(c.status)).length;
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
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950/90 to-purple-950/80 z-10" />
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl z-10 pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-64 h-64 bg-blue-600/30 rounded-full blur-2xl z-10 pointer-events-none" />

        <div className="relative z-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-cyan-300 backdrop-blur-md border border-white/20 shadow-lg flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Service Supervisor Portal</span>
              </span>
              <span className="text-xs text-indigo-200 font-semibold">• {user?.departmentName || 'Facility Department'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
              {user?.departmentName || 'Facility'} Triage & Dispatch 🤖
            </h1>

            <p className="text-xs text-indigo-100/90 font-medium leading-relaxed">
              Monitor technician workload capacity, delegate incoming maintenance issues, and enforce SLA targets in real time.
            </p>
          </div>

          <div className="flex items-center space-x-3.5 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl relative z-20">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm font-black text-white block">98.4% SLA Compliance</span>
              <span className="text-[11px] text-indigo-200 font-semibold">Department Health Index</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Department Tickets" value={total} subtitle="Total tickets received" icon={Users} color="blue" />
        <StatCard title="Unassigned Queue" value={unassigned} subtitle="Awaiting technician dispatch" icon={Clock} color="cyan" />
        <StatCard title="In Active Repair" value={activeWork} subtitle="Technicians in field" icon={UserCheck} color="indigo" />
        <StatCard title="SLA Escalations" value={escalated} subtitle="Critical SLA breaches" icon={AlertTriangle} color="rose" />
      </div>

      {/* Technician Utilization Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Technician Workload Capacity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workload.map((staff) => (
            <div key={staff.staffId} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">{staff.staffName}</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
                  {staff.staffEmail}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-blue-50 p-2 rounded-xl border border-blue-100">
                  <p className="text-[10px] text-blue-600 font-semibold">Assigned</p>
                  <p className="font-bold text-blue-700 text-sm">{staff.assignedCount}</p>
                </div>
                <div className="bg-cyan-50 p-2 rounded-xl border border-cyan-100">
                  <p className="text-[10px] text-cyan-700 font-semibold">In Work</p>
                  <p className="font-bold text-cyan-800 text-sm">{staff.inProgressCount}</p>
                </div>
                <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                  <p className="text-[10px] text-emerald-600 font-semibold">Resolved</p>
                  <p className="font-bold text-emerald-700 text-sm">{staff.resolvedCount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Triage Complaints Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
        <div className="p-4 border-b border-slate-100 font-bold text-slate-900 text-xs uppercase tracking-wider bg-slate-50/50 flex items-center justify-between">
          <span>Incoming Department Complaint Queue</span>
          <span className="text-slate-400 text-[11px] normal-case font-medium">Click Assign to delegate to technician</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
              <tr>
                <th className="px-4 py-3">Ticket</th>
                <th className="px-4 py-3">Student & Problem</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Assigned Staff</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {complaints.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-blue-600">{item.ticketNumber}</td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="text-[11px] text-slate-400">By: {item.studentName}</p>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">{item.locationFullPath}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{item.assignedStaffName || 'Unassigned'}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3 text-right space-x-1.5">
                    <Link
                      to={`/complaints/${item.id}`}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[11px] font-semibold"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => setAssignModalTask(item)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] font-bold shadow-sm"
                    >
                      {item.assignedStaffId ? 'Reassign' : 'Assign'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Staff Modal */}
      {assignModalTask && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Assign Technician to Ticket</h3>
            <p className="text-xs text-slate-500">
              Ticket: <span className="font-mono font-bold text-blue-600">{assignModalTask.ticketNumber}</span>
            </p>

            <form onSubmit={handleAssignSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Select Department Technician</label>
                <select
                  required
                  value={selectedStaffId}
                  onChange={(e) => setSelectedStaffId(e.target.value)}
                  className="w-full text-xs border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white"
                >
                  <option value="">-- Select Technician --</option>
                  {staffList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.fullName} ({s.username})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Assignment Remarks</label>
                <textarea
                  rows={3}
                  value={assignRemarks}
                  onChange={(e) => setAssignRemarks(e.target.value)}
                  placeholder="Priority task instructions..."
                  className="w-full text-xs border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAssignModalTask(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/30"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
