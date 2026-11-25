import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { complaintApi } from '../../api/complaintApi';
import { StatusBadge } from '../../components/StatusBadge';
import { UserCheck, AlertTriangle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

export const DeptHeadTriagePage = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [assignModalTask, setAssignModalTask] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [assignRemarks, setAssignRemarks] = useState('');

  const loadData = () => {
    if (user?.departmentId) {
      complaintApi.getDepartmentComplaints(user.departmentId).then(setComplaints).catch(console.error);
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

  return (
    <div className="w-full space-y-6">
      {/* 3D Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 p-6 sm:p-7 rounded-3xl text-white shadow-xl border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-black uppercase tracking-wider mb-1">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span>Service Supervisor Console</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Department Complaint Triage Queue</h2>
          <p className="text-xs text-indigo-100/90 font-medium">Triage incoming tickets and assign staff technicians with optimal turnaround</p>
        </div>
      </div>

      <div className="card-3d bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Department Active Tickets ({complaints.length})</h3>
          <span className="text-[11px] font-bold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">Live Queue</span>
        </div>
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50/80 border-b border-slate-200 font-extrabold text-slate-700">
            <tr>
              <th className="px-5 py-3.5">Ticket #</th>
              <th className="px-5 py-3.5">Student & Issue</th>
              <th className="px-5 py-3.5">Location</th>
              <th className="px-5 py-3.5">Assigned Technician</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-5 py-12 text-center text-slate-400 italic">
                  No complaint tickets in your department triage queue.
                </td>
              </tr>
            ) : (
              complaints.map((item) => (
                <tr key={item.id} className="hover:bg-indigo-50/20 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-black text-indigo-600">
                    <span className="bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{item.ticketNumber}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-black text-slate-900">{item.title}</p>
                    <p className="text-[11px] text-slate-400 font-medium">By: {item.studentName}</p>
                  </td>
                  <td className="px-5 py-3.5 max-w-xs truncate text-slate-700">{item.locationFullPath}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${item.assignedStaffName ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-sky-50 text-sky-800 border border-sky-200'}`}>
                      {item.assignedStaffName || 'Unassigned'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={item.status} /></td>
                  <td className="px-5 py-3.5 text-right space-x-2">
                    <Link
                      to={`/complaints/${item.id}`}
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors shadow-2xs"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => setAssignModalTask(item)}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all transform hover:scale-[1.02] active:scale-95"
                    >
                      {item.assignedStaffId ? 'Reassign' : 'Assign Staff'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {assignModalTask && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800">Assign Staff to Ticket</h3>
            <p className="text-xs text-slate-500">Ticket: <span className="font-mono font-bold">{assignModalTask.ticketNumber}</span></p>

            <form onSubmit={handleAssignSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Select Technician</label>
                <select
                  required
                  value={selectedStaffId}
                  onChange={(e) => setSelectedStaffId(e.target.value)}
                  className="w-full text-xs border rounded-xl p-2.5"
                >
                  <option value="">-- Select Staff Member --</option>
                  {staffList.map((s) => (
                    <option key={s.id} value={s.id}>{s.fullName} ({s.username})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Assignment Remarks</label>
                <textarea
                  rows="3"
                  value={assignRemarks}
                  onChange={(e) => setAssignRemarks(e.target.value)}
                  placeholder="Priority task for Block A room..."
                  className="w-full text-xs border rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setAssignModalTask(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
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
