import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { departmentApi } from '../../api/departmentApi';
import { Users, UserPlus, Key, RefreshCw, Trash2, CheckCircle, XCircle } from 'lucide-react';

export const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roleFilter, setRoleFilter] = useState('ALL');

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [reassignModalOpen, setReassignModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [createUserForm, setCreateUserForm] = useState({
    username: '',
    email: '',
    fullName: '',
    phone: '',
    defaultPassword: 'MITS@123',
    role: 'ROLE_STAFF',
    departmentId: '',
  });

  const [resetPasswordForm, setResetPasswordForm] = useState({ newPassword: '' });
  const [reassignForm, setReassignForm] = useState({ departmentId: '' });

  const loadData = () => {
    axiosClient.get('/users').then(setUsers).catch(console.error);
    departmentApi.getAll().then(setDepartments).catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const endpoint = createUserForm.role === 'ROLE_DEPT_HEAD' ? '/users/create-dept-head' : '/users/create-staff';
      await axiosClient.post(endpoint, {
        ...createUserForm,
        departmentId: createUserForm.departmentId ? parseInt(createUserForm.departmentId, 10) : null,
      });
      alert(`User account created successfully! Default password assigned: ${createUserForm.defaultPassword || 'MITS@123'}`);
      setCreateModalOpen(false);
      setCreateUserForm({
        username: '',
        email: '',
        fullName: '',
        phone: '',
        defaultPassword: 'MITS@123',
        role: 'ROLE_STAFF',
        departmentId: '',
      });
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to create user account.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/users/${selectedUser.id}/reset-password`, { newPassword: resetPasswordForm.newPassword });
      alert('Password reset successfully!');
      setResetModalOpen(false);
      setResetPasswordForm({ newPassword: '' });
    } catch (err) {
      alert(err.message || 'Failed to reset password');
    }
  };

  const handleReassignDepartment = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/users/${selectedUser.id}/reassign-department?departmentId=${reassignForm.departmentId}`);
      alert('Department reassigned successfully!');
      setReassignModalOpen(false);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to reassign department');
    }
  };

  const handleToggleStatus = async (user) => {
    try {
      await axiosClient.patch(`/users/${user.id}/status?active=${!user.active}`);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to change status');
    }
  };

  const handleDeleteUserPermanently = async (user) => {
    if (window.confirm(`Are you sure you want to PERMANENTLY delete user @${user.username} (${user.fullName}) from the database? This cannot be undone.`)) {
      try {
        await axiosClient.delete(`/users/${user.id}`);
        alert(`User @${user.username} deleted permanently!`);
        loadData();
      } catch (err) {
        alert(err.message || 'Failed to delete user account');
      }
    }
  };

  const filteredUsers = users.filter((u) => (roleFilter === 'ALL' ? true : u.role === roleFilter));

  return (
    <div className="space-y-6 pb-12 p-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 shadow-2xs">
            User Account Management
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight mt-1">Campus Account Directory</h2>
          <p className="text-xs text-blue-100/90 font-medium">Provision Staff Technicians & Service Supervisors across Facility Departments</p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2.5 bg-white text-indigo-700 hover:bg-slate-50 rounded-2xl text-xs font-extrabold shadow-lg shadow-black/10 flex items-center space-x-2 transition-all relative z-10 transform hover:-translate-y-0.5"
        >
          <UserPlus className="w-4 h-4 text-indigo-600" />
          <span>Provision Staff / Supervisor</span>
        </button>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 text-xs font-medium overflow-x-auto">
        <span className="text-slate-400 font-bold mr-2">Filter Role:</span>
        {['ALL', 'ROLE_STUDENT', 'ROLE_FACULTY', 'ROLE_STAFF', 'ROLE_DEPT_HEAD', 'ROLE_ADMIN', 'ROLE_HIGHER_OFFICIAL'].map((r) => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              roleFilter === r ? 'bg-blue-600 text-white font-bold shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {r === 'ALL' ? 'All Users' : r === 'ROLE_DEPT_HEAD' ? 'SUPERVISOR' : r.replace('ROLE_', '')}
          </button>
        ))}
      </div>

      {/* User Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
              <tr>
                <th className="px-4 py-3">Full Name & Username</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Assigned Department</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">
                    {u.fullName}
                    <span className="block text-[11px] font-mono font-normal text-slate-400">@{u.username}</span>
                  </td>
                  <td className="px-4 py-3 font-mono">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {u.role === 'ROLE_DEPT_HEAD' ? 'SUPERVISOR' : u.role.replace('ROLE_', '')}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{u.departmentName || 'N/A'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${u.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                      {u.active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-1">
                    <button
                      onClick={() => { setSelectedUser(u); setResetModalOpen(true); }}
                      title="Reset Password"
                      className="p-2 bg-amber-50 text-amber-700 rounded-xl hover:bg-amber-100 border border-amber-200 transition-colors"
                    >
                      <Key className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setSelectedUser(u); setReassignModalOpen(true); }}
                      title="Reassign Department"
                      className="p-2 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 border border-blue-200 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(u)}
                      title={u.active ? 'Disable Account' : 'Activate Account'}
                      className={`p-2 rounded-xl border transition-colors ${u.active ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-300' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200'}`}
                    >
                      {u.active ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleDeleteUserPermanently(u)}
                      title="PERMANENTLY Delete Account"
                      className="p-2 bg-rose-50 text-rose-700 rounded-xl hover:bg-rose-100 border border-rose-200 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Staff / Supervisor Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Provision Staff or Service Supervisor</h3>
            <form onSubmit={handleCreateUser} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Target Role</label>
                <select
                  value={createUserForm.role}
                  onChange={(e) => setCreateUserForm({ ...createUserForm, role: e.target.value })}
                  className="w-full text-xs border border-slate-300 rounded-xl p-2.5 bg-slate-50"
                >
                  <option value="ROLE_STAFF">Technician / Staff Member</option>
                  <option value="ROLE_DEPT_HEAD">Service Supervisor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={createUserForm.fullName}
                  onChange={(e) => setCreateUserForm({ ...createUserForm, fullName: e.target.value })}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full text-xs border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Username</label>
                  <input
                    type="text"
                    required
                    value={createUserForm.username}
                    onChange={(e) => setCreateUserForm({ ...createUserForm, username: e.target.value })}
                    placeholder="e.g. rajesh_elec"
                    className="w-full text-xs border border-slate-300 rounded-xl p-2.5 font-mono bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Default Initial Password</label>
                  <input
                    type="text"
                    value={createUserForm.defaultPassword}
                    onChange={(e) => setCreateUserForm({ ...createUserForm, defaultPassword: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded-xl p-2.5 font-mono bg-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={createUserForm.email}
                  onChange={(e) => setCreateUserForm({ ...createUserForm, email: e.target.value })}
                  placeholder="rajesh@mits.ac.in"
                  className="w-full text-xs border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Assign to Facility Department</label>
                <select
                  required
                  value={createUserForm.departmentId}
                  onChange={(e) => setCreateUserForm({ ...createUserForm, departmentId: e.target.value })}
                  className="w-full text-xs border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white font-medium"
                >
                  <option value="">-- Select Department --</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      [{d.code}] {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setCreateModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30">
                  Create User Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Reset Password for @{selectedUser?.username}</h3>
            <form onSubmit={handleResetPassword} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  minLength="6"
                  value={resetPasswordForm.newPassword}
                  onChange={(e) => setResetPasswordForm({ newPassword: e.target.value })}
                  placeholder="Enter new password (min 6 characters)"
                  className="w-full text-xs border border-slate-300 rounded-xl p-2.5 bg-slate-50"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setResetModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reassign Department Modal */}
      {reassignModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Reassign Department for {selectedUser?.fullName}</h3>
            <form onSubmit={handleReassignDepartment} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Target Department</label>
                <select
                  required
                  value={reassignForm.departmentId}
                  onChange={(e) => setReassignForm({ departmentId: e.target.value })}
                  className="w-full text-xs border border-slate-300 rounded-xl p-2.5 bg-slate-50 font-medium"
                >
                  <option value="">-- Select Department --</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      [{d.code}] {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setReassignModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30">
                  Confirm Reassignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
