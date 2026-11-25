import React, { useState, useEffect } from 'react';
import { complaintApi } from '../../api/complaintApi';
import { StatusBadge } from '../../components/StatusBadge';
import { ImageUploadZone } from '../../components/ImageUploadZone';
import { Wrench, CheckCircle2, Clock, Package, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StaffWorkstationPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [actionType, setActionType] = useState('');
  const [remarks, setRemarks] = useState('');
  const [afterImageUrl, setAfterImageUrl] = useState('');
  const [newStatus, setNewStatus] = useState('IN_PROGRESS');
  const [loading, setLoading] = useState(false);

  const loadTasks = () => {
    complaintApi.getAssignedToMe().then(setComplaints).catch(console.error);
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

  const pendingAcceptance = complaints.filter((c) => c.status === 'ASSIGNED');
  const inProgress = complaints.filter((c) => ['ACCEPTED', 'IN_PROGRESS'].includes(c.status));
  const waitingParts = complaints.filter((c) => c.status === 'WAITING_PARTS');
  const completed = complaints.filter((c) => ['RESOLVED', 'VERIFIED', 'CLOSED'].includes(c.status));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Technician Interactive Workstation</h2>
        <p className="text-xs text-slate-500">Kanban workflow queue to accept tickets, update repair status, and upload proof images</p>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Column 1: Assigned (Pending Accept) */}
        <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between font-bold text-xs text-purple-700 pb-2 border-b border-purple-200">
            <span className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4" />
              <span>Assigned ({pendingAcceptance.length})</span>
            </span>
          </div>
          <div className="space-y-3">
            {pendingAcceptance.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <span className="font-mono text-[10px] font-bold text-indigo-600">{item.ticketNumber}</span>
                <h4 className="font-bold text-xs text-slate-800">{item.title}</h4>
                <p className="text-[11px] text-slate-500 truncate">{item.locationFullPath}</p>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-600">{item.priority}</span>
                  <button
                    onClick={() => handleAccept(item.id)}
                    className="px-2.5 py-1 bg-purple-600 text-white rounded-md text-[10px] font-bold hover:bg-purple-500"
                  >
                    Accept Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="bg-cyan-50/60 p-4 rounded-2xl border border-cyan-200 space-y-3">
          <div className="flex items-center justify-between font-bold text-xs text-cyan-800 pb-2 border-b border-cyan-200">
            <span className="flex items-center space-x-1.5">
              <Wrench className="w-4 h-4 text-cyan-600" />
              <span>In Work ({inProgress.length})</span>
            </span>
          </div>
          <div className="space-y-3">
            {inProgress.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <span className="font-mono text-[10px] font-bold text-indigo-600">{item.ticketNumber}</span>
                <h4 className="font-bold text-xs text-slate-800">{item.title}</h4>
                <p className="text-[11px] text-slate-500 truncate">{item.locationFullPath}</p>
                <div className="pt-2 flex justify-end space-x-1">
                  <button
                    onClick={() => { setSelectedTask(item); setActionType('progress'); }}
                    className="px-2 py-1 bg-cyan-600 text-white rounded text-[10px] font-bold hover:bg-cyan-500 shadow-2xs"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => { setSelectedTask(item); setActionType('resolve'); }}
                    className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold hover:bg-emerald-500 shadow-2xs"
                  >
                    Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Waiting Parts */}
        <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200 space-y-3">
          <div className="flex items-center justify-between font-bold text-xs text-blue-800 pb-2 border-b border-blue-200">
            <span className="flex items-center space-x-1.5">
              <Package className="w-4 h-4 text-blue-600" />
              <span>Waiting Parts ({waitingParts.length})</span>
            </span>
          </div>
          <div className="space-y-3">
            {waitingParts.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <span className="font-mono text-[10px] font-bold text-indigo-600">{item.ticketNumber}</span>
                <h4 className="font-bold text-xs text-slate-800">{item.title}</h4>
                <p className="text-[11px] text-slate-500 truncate">{item.locationFullPath}</p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => { setSelectedTask(item); setActionType('resolve'); }}
                    className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold hover:bg-emerald-500"
                  >
                    Resolve Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 4: Completed */}
        <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 space-y-3">
          <div className="flex items-center justify-between font-bold text-xs text-emerald-700 pb-2 border-b border-emerald-200">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Resolved ({completed.length})</span>
            </span>
          </div>
          <div className="space-y-3">
            {completed.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-1">
                <span className="font-mono text-[10px] font-bold text-indigo-600">{item.ticketNumber}</span>
                <h4 className="font-bold text-xs text-slate-800">{item.title}</h4>
                <p className="text-[10px] text-emerald-600 font-bold">Proof Uploaded</p>
                <div className="pt-1 text-right">
                  <Link to={`/complaints/${item.id}`} className="text-[10px] text-indigo-600 font-bold hover:underline">
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
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
                  placeholder="Replaced damaged wiring / reset circuit..."
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
