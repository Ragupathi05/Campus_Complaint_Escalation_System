import React, { useState, useEffect } from 'react';
import { complaintApi } from '../../api/complaintApi';
import { StatusBadge } from '../../components/StatusBadge';
import { ImageUploadZone } from '../../components/ImageUploadZone';
import { Wrench, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StaffActiveTasksPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [actionType, setActionType] = useState('');
  const [remarks, setRemarks] = useState('');
  const [afterImageUrl, setAfterImageUrl] = useState('');
  const [newStatus, setNewStatus] = useState('IN_PROGRESS');
  const [loading, setLoading] = useState(false);

  const loadTasks = () => {
    complaintApi.getAssignedToMe().then((data) => {
      setComplaints(data.filter((c) => !['CLOSED', 'VERIFIED'].includes(c.status)));
    }).catch(console.error);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAccept = async (id) => {
    try {
      await complaintApi.accept(id);
      loadTasks();
    } catch (err) {
      alert(err.message || 'Failed to accept task');
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTask) return;
    setLoading(true);

    try {
      if (actionType === 'resolve') {
        await complaintApi.resolve(selectedTask.id, { remarks, afterImageUrl });
      } else if (actionType === 'progress') {
        await complaintApi.updateStatus(selectedTask.id, { status: newStatus, remarks, afterImageUrl });
      }
      setSelectedTask(null);
      setRemarks('');
      setAfterImageUrl('');
      loadTasks();
    } catch (err) {
      alert(err.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">My Active Workstation Tasks</h2>
          <p className="text-xs text-slate-500">Manage assigned maintenance tasks, update status, and upload repair proof photos</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
            <tr>
              <th className="px-4 py-3">Ticket #</th>
              <th className="px-4 py-3">Problem & Priority</th>
              <th className="px-4 py-3">Campus Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">SLA Due Target</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-slate-400 italic">
                  No active tasks in your queue right now.
                </td>
              </tr>
            ) : (
              complaints.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-indigo-600">{item.ticketNumber}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">{item.locationFullPath}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3 text-[11px] text-slate-500">{new Date(item.slaDueDate).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Link
                      to={`/complaints/${item.id}`}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium hover:bg-slate-200"
                    >
                      Details
                    </Link>

                    {item.status === 'ASSIGNED' && (
                      <button
                        onClick={() => handleAccept(item.id)}
                        className="px-2.5 py-1 bg-purple-600 text-white rounded-md text-[11px] font-semibold hover:bg-purple-500"
                      >
                        Accept Task
                      </button>
                    )}

                    {['ACCEPTED', 'IN_PROGRESS', 'WAITING_PARTS'].includes(item.status) && (
                      <>
                        <button
                          onClick={() => { setSelectedTask(item); setActionType('progress'); }}
                          className="px-2.5 py-1 bg-amber-500 text-white rounded-md text-[11px] font-semibold hover:bg-amber-400"
                        >
                          Update Status
                        </button>
                        <button
                          onClick={() => { setSelectedTask(item); setActionType('resolve'); }}
                          className="px-2.5 py-1 bg-emerald-600 text-white rounded-md text-[11px] font-semibold hover:bg-emerald-500"
                        >
                          Mark Resolved
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800">
              {actionType === 'resolve' ? 'Mark Task Resolved' : 'Update Task Progress'}
            </h3>
            <p className="text-xs text-slate-500">Ticket: <span className="font-mono font-bold">{selectedTask.ticketNumber}</span></p>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              {actionType === 'progress' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">New Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full text-xs rounded-xl border p-2.5"
                  >
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="WAITING_PARTS">WAITING_PARTS</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Remarks & Actions Taken</label>
                <textarea
                  required
                  rows="3"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Replaced damaged component / tested functionality..."
                  className="w-full text-xs rounded-xl border p-2.5"
                />
              </div>

              <ImageUploadZone
                label={actionType === 'resolve' ? 'Mandatory "After Repair" Photo Proof' : 'Progress Photo (Optional)'}
                onImageUploaded={setAfterImageUrl}
              />

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTask(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || (actionType === 'resolve' && !afterImageUrl)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Submit Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
