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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Technician Shift & Duty Roster</h2>
          <p className="text-xs text-slate-500">Manage shift schedules, duty availability, and create new department staff members</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Technician / Staff</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
            <tr>
              <th className="px-4 py-3">Technician Name</th>
              <th className="px-4 py-3">Username & Email</th>
              <th className="px-4 py-3">Duty Shift</th>
              <th className="px-4 py-3">Max Ticket Capacity</th>
              <th className="px-4 py-3">Current Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {staffList.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-800">{s.fullName}</td>
                <td className="px-4 py-3 text-slate-500 font-mono">
                  @{s.username} ({s.email})
                </td>
                <td className="px-4 py-3 font-medium text-slate-700">Morning Shift (08:00 - 17:00)</td>
                <td className="px-4 py-3 font-bold text-indigo-600">5 Max Concurrent</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${s.active ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
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
