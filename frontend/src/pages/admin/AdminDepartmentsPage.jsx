import React, { useState, useEffect } from 'react';
import { departmentApi } from '../../api/departmentApi';
import axiosClient from '../../api/axiosClient';
import { Building, Plus, Clock, UserCheck, UserX, Edit, Trash2 } from 'lucide-react';

export const AdminDepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [headModalOpen, setHeadModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);

  const [form, setForm] = useState({ name: '', code: '', description: '' });
  const [headForm, setHeadForm] = useState({ username: '' });

  // Academic department codes & terms to filter out from facility maintenance management
  const academicCodes = ['CSE', 'CSM', 'AIDS', 'ECE', 'EEE', 'MECH', 'CIVIL_ACAD'];

  const loadData = () => {
    departmentApi.getAll().then((data) => {
      // Filter ONLY Facility Maintenance Departments
      const facilityOnly = data.filter((d) => {
        const codeUpper = (d.code || '').toUpperCase();
        const nameLower = (d.name || '').toLowerCase();
        const descLower = (d.description || '').toLowerCase();

        const isAcademic = academicCodes.includes(codeUpper) ||
          descLower.startsWith('academic dept') ||
          nameLower.includes('computer science') ||
          nameLower.includes('artificial intelligence') ||
          nameLower.includes('electronics & communication') ||
          nameLower.includes('electrical & electronics') ||
          nameLower.includes('mechanical engineering') ||
          nameLower.includes('civil engineering') ||
          nameLower.includes('(csm)') ||
          nameLower.includes('(aids)') ||
          nameLower.includes('(ece)') ||
          nameLower.includes('(cse)');

        return !isAcademic;
      });
      setDepartments(facilityOnly);
    }).catch(console.error);

    departmentApi.getAllCategories().then(setCategories).catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateDept = async (e) => {
    e.preventDefault();
    try {
      if (selectedDept) {
        await axiosClient.put(`/departments/${selectedDept.id}`, form);
      } else {
        await departmentApi.create(form);
      }
      setForm({ name: '', code: '', description: '' });
      setSelectedDept(null);
      setModalOpen(false);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to save department');
    }
  };

  const handleAssignHead = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/departments/${selectedDept.id}/head-username?username=${headForm.username}`);
      setHeadForm({ username: '' });
      setSelectedDept(null);
      setHeadModalOpen(false);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to assign supervisor');
    }
  };

  const handleUnassignHead = async (dept) => {
    if (window.confirm(`Are you sure you want to remove the Service Supervisor for ${dept.name}? The supervisor slot will become empty/unassigned.`)) {
      try {
        await departmentApi.unassignHead(dept.id);
        loadData();
      } catch (err) {
        alert(err.message || 'Failed to unassign supervisor');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to deactivate this facility department?')) {
      try {
        await axiosClient.delete(`/departments/${id}`);
        loadData();
      } catch (err) {
        alert(err.message || 'Failed to delete department');
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Campus Facility Maintenance Departments & SLA Targets</h2>
          <p className="text-xs text-slate-500">Manage facility maintenance units (Electrical, Plumbing, Housekeeping, IT, Infrastructure, etc.), assign/remove supervisors, and edit SLA targets</p>
        </div>
        <button
          onClick={() => { setSelectedDept(null); setForm({ name: '', code: '', description: '' }); setModalOpen(true); }}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Facility Department</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
            <Building className="w-4 h-4 text-indigo-600" />
            <span>Active Facility Maintenance Units ({departments.length})</span>
          </h3>

          <div className="space-y-3">
            {departments.map((dept) => (
              <div key={dept.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800">{dept.name} ({dept.code})</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${dept.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                    {dept.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Service Supervisor: </span>
                  {dept.deptHeadName ? (
                    <span className="text-indigo-600 font-bold">{dept.deptHeadName}</span>
                  ) : (
                    <span className="text-amber-600 italic">Unassigned (Empty)</span>
                  )}
                </p>
                <p className="text-xs text-slate-600">{dept.description || 'No description'}</p>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-end space-x-2 text-xs">
                  <button
                    onClick={() => { setSelectedDept(dept); setHeadModalOpen(true); }}
                    className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg font-bold flex items-center space-x-1"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Assign Supervisor</span>
                  </button>

                  {dept.deptHeadName && (
                    <button
                      onClick={() => handleUnassignHead(dept)}
                      title="Remove Supervisor & Make Empty"
                      className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-bold flex items-center space-x-1 border border-rose-200"
                    >
                      <UserX className="w-3.5 h-3.5" />
                      <span>Remove Supervisor</span>
                    </button>
                  )}

                  <button
                    onClick={() => { setSelectedDept(dept); setForm({ name: dept.name, code: dept.code, description: dept.description || '' }); setModalOpen(true); }}
                    className="p-1.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(dept.id)}
                    className="p-1.5 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories & SLA Rules */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>Complaint Categories & SLA Targets ({categories.length})</span>
          </h3>

          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-800">{cat.name}</h4>
                  <p className="text-[11px] text-slate-500">Facility Dept: {cat.departmentName}</p>
                </div>
                <div className="text-right space-y-1">
                  <span className="text-xs font-bold text-indigo-600 block">{cat.slaHours} Hrs SLA</span>
                  <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-mono font-semibold">
                    {cat.defaultPriority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create / Edit Department Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800">{selectedDept ? 'Edit Department' : 'Create Facility Department'}</h3>
            <form onSubmit={handleCreateDept} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Department Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Electrical Maintenance / Plumbing & Water"
                  className="w-full text-xs border rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Department Short Code</label>
                <input
                  type="text"
                  required
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. ELEC / PLUMB / HOUSE"
                  className="w-full text-xs border rounded-xl p-2.5 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe maintenance scope of work"
                  className="w-full text-xs border rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Supervisor Modal */}
      {headModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800">Assign Service Supervisor ({selectedDept?.name})</h3>
            <form onSubmit={handleAssignHead} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Username or Email of User</label>
                <input
                  type="text"
                  required
                  value={headForm.username}
                  onChange={(e) => setHeadForm({ username: e.target.value })}
                  placeholder="e.g. depthead1 or elec.head@mits.ac.in"
                  className="w-full text-xs border rounded-xl p-2.5"
                />
                <p className="text-[11px] text-slate-400 mt-1">This user's role will be updated to ROLE_DEPT_HEAD (Service Supervisor).</p>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setHeadModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold">
                  Assign Supervisor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
