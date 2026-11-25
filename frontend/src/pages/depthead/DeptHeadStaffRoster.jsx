import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';
import { Users, UserPlus, Calendar, Key } from 'lucide-react';

export const DeptHeadStaffRoster = () => {
  const { user } = useAuth();
  const [staffList, setStaffList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    username: '',
    email: '',
    fullName: '',
    phone: '',
    defaultPassword: 'MITS@123',
    departmentId: user?.departmentId || '',
  });

  const loadData = () => {
    if (user?.departmentId) {
      axiosClient.get(`/users/department/${user.departmentId}/staff`).then(setStaffList).catch(console.error);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('/users/create-staff', {
        ...form,
        role: 'ROLE_STAFF',
        departmentId: user.departmentId,
      });
      alert(`Staff member created under your department! Default password: ${form.defaultPassword}`);
      setModalOpen(false);
      setForm({ username: '', email: '', fullName: '', phone: '', defaultPassword: 'MITS@123', departmentId: user?.departmentId || '' });
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to create staff member');
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* 3D Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 p-6 sm:p-7 rounded-3xl text-white shadow-xl border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-black uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Staff Administration</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Technician Shift & Duty Roster</h2>
          <p className="text-xs text-indigo-100/90 font-medium">Manage shift schedules, duty availability, and create new department staff members</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-black shadow-xl shadow-indigo-600/40 flex items-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-95 border border-white/20"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Technician / Staff</span>
        </button>
      </div>

      <div className="card-3d bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Roster Capacity ({staffList.length} Technicians)</h3>
          <span className="text-[11px] font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">Live Active</span>
        </div>
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50/80 border-b border-slate-200 font-extrabold text-slate-700">
            <tr>
              <th className="px-5 py-3.5">Technician Name</th>
              <th className="px-5 py-3.5">Username & Email</th>
              <th className="px-5 py-3.5">Duty Shift</th>
              <th className="px-5 py-3.5">Max Ticket Capacity</th>
              <th className="px-5 py-3.5">Current Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {staffList.map((s) => (
              <tr key={s.id} className="hover:bg-indigo-50/20 transition-colors">
                <td className="px-5 py-3.5 font-black text-slate-900">{s.fullName}</td>
                <td className="px-5 py-3.5 text-slate-600 font-mono text-[11px]">
                  @{s.username} <span className="text-slate-400">({s.email})</span>
                </td>
                <td className="px-5 py-3.5 font-bold text-slate-700">Morning Shift (08:00 - 17:00)</td>
                <td className="px-5 py-3.5 font-black text-indigo-600">
                  <span className="bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">5 Max Concurrent</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border shadow-2xs ${s.active ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'}`}>
                    {s.active ? 'On Duty (Available)' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Staff Modal for Dept Head */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800">Add New Technician to Department</h3>
            <form onSubmit={handleCreateStaff} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Suresh V"
                  className="w-full text-xs border rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Username</label>
                  <input
                    type="text"
                    required
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    placeholder="e.g. suresh_tech"
                    className="w-full text-xs border rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Default Password</label>
                  <input
                    type="text"
                    value={form.defaultPassword}
                    onChange={(e) => setForm({ ...form, defaultPassword: e.target.value })}
                    className="w-full text-xs border rounded-xl p-2.5 font-mono bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="suresh@mits.ac.in"
                  className="w-full text-xs border rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="9876543210"
                  className="w-full text-xs border rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">
                  Create Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
