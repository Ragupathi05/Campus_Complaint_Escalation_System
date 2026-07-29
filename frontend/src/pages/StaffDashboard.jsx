import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { complaintApi } from '../api/complaintApi';
import { StatCard } from '../components/StatCard';
import { StatusBadge, PriorityBadge } from '../components/StatusBadge';
import { ImageUploadZone } from '../components/ImageUploadZone';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Star,
  Package,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const StaffDashboard = () => {
  const { user } = useAuth();
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
      alert(err.message || 'Failed to update task.');
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: complaints.length,
    assigned: complaints.filter((c) => c.status === 'ASSIGNED').length,
    inProgress: complaints.filter((c) => ['ACCEPTED', 'IN_PROGRESS', 'WAITING_PARTS'].includes(c.status)).length,
    resolved: complaints.filter((c) => ['REPAIR_COMPLETED', 'VERIFIED', 'CLOSED'].includes(c.status)).length,
  };

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
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-blue-950/90 to-indigo-950/80 z-10" />
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl z-10 pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-64 h-64 bg-teal-600/30 rounded-full blur-2xl z-10 pointer-events-none" />

        <div className="relative z-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-amber-300 backdrop-blur-md border border-white/20 shadow-lg flex items-center space-x-1.5">
                <Wrench className="w-3.5 h-3.5 text-blue-400" />
                <span>Technician Workstation</span>
              </span>
              <span className="text-xs text-indigo-200 font-semibold">• {user?.departmentName || 'Electrical & Maintenance'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
              Good Morning, {user?.fullName || 'Technician'} ⚡
            </h1>

            <p className="text-xs text-indigo-100/90 font-medium leading-relaxed">
              Accept tasks, navigate floor routes, request spare parts, and upload repair photo proof.
            </p>
          </div>

          <div className="flex items-center space-x-3.5 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl relative z-20">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl shadow-lg">
              <Star className="w-6 h-6 fill-amber-300 text-amber-300" />
            </div>
            <div>
              <span className="text-sm font-black text-white block">4.9 / 5.0 Rating</span>
              <span className="text-[11px] text-indigo-200 font-semibold">Customer Performance Index</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Assigned Queue" value={stats.total} subtitle="Lifetime assigned jobs" icon={Wrench} color="blue" />
        <StatCard title="Pending Accept" value={stats.assigned} subtitle="Awaiting acceptance" icon={Clock} color="amber" />
        <StatCard title="In Work Progress" value={stats.inProgress} subtitle="Currently fixing" icon={AlertTriangle} color="indigo" />
        <StatCard title="Completed Jobs" value={stats.resolved} subtitle="Uploaded repair proof" icon={CheckCircle2} color="emerald" />
      </div>

      {/* Main Grid: Task Execution Table & Shift Route Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Task Execution Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Active Task Queue</h2>
            <span className="text-[11px] text-slate-400 font-medium">Upload photo proof upon completion</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                <tr>
                  <th className="px-4 py-3">Ticket</th>
                  <th className="px-4 py-3">Problem & Priority</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {complaints.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-12 text-center text-slate-400 italic">
                      No active maintenance tasks assigned to your queue.
                    </td>
                  </tr>
                ) : (
                  complaints.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-blue-600">{item.ticketNumber}</td>
                      <td className="px-4 py-3">
                        <p className="font-bold text-slate-900">{item.title}</p>
                        <PriorityBadge priority={item.priority} />
                      </td>
                      <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{item.locationFullPath}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-4 py-3 text-right space-x-1.5">
                        {item.status === 'ASSIGNED' && (
                          <button
                            onClick={() => handleAccept(item.id)}
                            className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] font-bold shadow-sm"
                          >
                            Accept Job
                          </button>
                        )}

                        {['ACCEPTED', 'IN_PROGRESS', 'WAITING_PARTS'].includes(item.status) && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedTask(item);
                                setActionType('progress');
                              }}
                              className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-bold"
                            >
                              Status
                            </button>
                            <button
                              onClick={() => {
                                setSelectedTask(item);
                                setActionType('resolve');
                              }}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold"
                            >
                              Resolve Proof
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
        </div>

        {/* Right Column: Today's Shift Route */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Today's Maintenance Route</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-3 text-xs">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600 font-bold text-[10px]">9:30 AM</div>
                <div>
                  <span className="font-bold text-slate-900 block">Block A — 2nd Floor</span>
                  <span className="text-[11px] text-slate-500">Room 204 Power Socket Inspection</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-3 text-xs">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-700 font-bold text-[10px]">11:00 AM</div>
                <div>
                  <span className="font-bold text-slate-900 block">Block B — Science Lab</span>
                  <span className="text-[11px] text-slate-500">AC Cooling & Filter Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update / Resolve Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              {actionType === 'resolve' ? 'Upload Repair Photo Proof' : 'Update Status'}
            </h3>
            <p className="text-xs text-slate-500">
              Ticket: <span className="font-mono font-bold text-blue-600">{selectedTask.ticketNumber}</span>
            </p>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              {actionType === 'progress' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">New Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-300 p-2.5 bg-slate-50"
                  >
                    <option value="IN_PROGRESS">IN_PROGRESS (Working)</option>
                    <option value="WAITING_PARTS">WAITING_PARTS (Parts Requisition)</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Remarks & Actions Taken</label>
                <textarea
                  required
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Explain repair actions taken..."
                  className="w-full text-xs rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white"
                />
              </div>

              <ImageUploadZone
                label={actionType === 'resolve' ? 'Mandatory Repair Photo (After)' : 'Progress Photo'}
                onImageUploaded={setAfterImageUrl}
              />

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTask(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || (actionType === 'resolve' && !afterImageUrl)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/30 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Submit Work Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
