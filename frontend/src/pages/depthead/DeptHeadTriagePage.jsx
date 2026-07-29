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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Department Complaint Triage Queue</h2>
          <p className="text-xs text-slate-500">Triage incoming tickets and assign staff technicians</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
            <tr>
              <th className="px-4 py-3">Ticket #</th>
              <th className="px-4 py-3">Student & Issue</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Assigned Technician</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {complaints.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-mono font-bold text-indigo-600">{item.ticketNumber}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-800">{item.title}</p>
                  <p className="text-[11px] text-slate-400">By: {item.studentName}</p>
                </td>
                <td className="px-4 py-3 max-w-xs truncate">{item.locationFullPath}</td>
                <td className="px-4 py-3 font-medium text-slate-700">{item.assignedStaffName || 'Unassigned'}</td>
                <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                <td className="px-4 py-3 text-right space-x-2">
                  <Link
                    to={`/complaints/${item.id}`}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium hover:bg-slate-200"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => setAssignModalTask(item)}
                    className="px-2.5 py-1 bg-indigo-600 text-white rounded-md text-[11px] font-semibold hover:bg-indigo-500"
                  >
                    {item.assignedStaffId ? 'Reassign' : 'Assign Staff'}
                  </button>
                </td>
              </tr>
            ))}
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
