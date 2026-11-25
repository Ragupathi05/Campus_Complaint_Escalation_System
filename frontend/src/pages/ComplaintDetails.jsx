import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { complaintApi } from '../api/complaintApi';
import { StatusBadge, PriorityBadge } from '../components/StatusBadge';
import { Timeline } from '../components/Timeline';
import { StarRating } from '../components/StarRating';
import {
  ArrowLeft,
  MessageSquare,
  Send,
  MapPin,
  Clock,
  User,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  PackageCheck,
} from 'lucide-react';

export const ComplaintDetails = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    complaintApi
      .getById(id)
      .then((res) => {
        setComplaint(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await complaintApi.addComment(id, commentText);
      setCommentText('');
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to post comment');
    }
  };

  if (loading) return <div className="p-8 text-slate-500 text-xs">Loading CampusCare ticket details...</div>;
  if (!complaint) return <div className="p-8 text-rose-500 text-xs">Complaint ticket not found.</div>;

  // Amazon-Style 8-Stage Progress Tracker Stepper
  const journeyStages = [
    { key: 'NEW', label: 'Submitted', icon: Clock },
    { key: 'ROUTED', label: 'Auto-Routed', icon: MapPin },
    { key: 'ASSIGNED', label: 'Assigned', icon: User },
    { key: 'ACCEPTED', label: 'Accepted', icon: CheckCircle2 },
    { key: 'IN_PROGRESS', label: 'In Repair', icon: Wrench },
    { key: 'WAITING_PARTS', label: 'Waiting Parts', icon: PackageCheck },
    { key: 'REPAIR_COMPLETED', label: 'Repair Finished', icon: ShieldCheck },
    { key: 'VERIFIED', label: 'Verified & Closed', icon: CheckCircle2 },
  ];

  const statusPriorityMap = {
    NEW: 1,
    ROUTED: 2,
    ASSIGNED: 3,
    ACCEPTED: 4,
    IN_PROGRESS: 5,
    WAITING_PARTS: 5,
    REPAIR_COMPLETED: 7,
    VERIFIED: 8,
    CLOSED: 8,
  };

  const currentStageIndex = statusPriorityMap[complaint.status] || 1;

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header */}
      <div className="card-3d bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <Link to={-1} className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl border border-slate-200 transition-colors shadow-2xs">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Ticket {complaint.ticketNumber}</h2>
              <StatusBadge status={complaint.status} />
              <PriorityBadge priority={complaint.priority} />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Category: <strong className="text-slate-800">{complaint.categoryName}</strong> • Registered on {new Date(complaint.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Amazon-Style Live Journey Progress Stepper with 3D Depth */}
      <div className="card-3d bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center space-x-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>Live 8-Stage Repair Journey</span>
          </h3>
          <span className="text-[11px] font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
            Current Stage: {complaint.status?.replace('_', ' ')}
          </span>
        </div>

        <div className="flex items-center justify-between relative pt-3 pb-2 px-2">
          <div className="absolute left-6 right-6 top-8 transform -translate-y-1/2 h-1.5 bg-slate-100 z-0 rounded-full" />
          <div
            className="absolute left-6 top-8 transform -translate-y-1/2 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 z-0 transition-all duration-700 rounded-full shadow-xs"
            style={{ width: `calc(${((currentStageIndex - 1) / 7) * 100}% - 3rem)` }}
          />

          {journeyStages.map((stage, idx) => {
            const Icon = stage.icon;
            const stageNum = idx + 1;
            const isPassed = currentStageIndex > stageNum;
            const isCurrent = currentStageIndex === stageNum;

            return (
              <div key={stage.key} className="relative z-10 flex flex-col items-center space-y-2">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xs transition-all duration-300 ${
                    isPassed
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : isCurrent
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white ring-4 ring-blue-100 shadow-xl shadow-blue-600/40 scale-110'
                      : 'bg-slate-100 text-slate-400 border border-slate-200/80'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <span className={`text-[10px] font-extrabold hidden md:inline tracking-tight ${isCurrent ? 'text-indigo-600 font-black' : isPassed ? 'text-slate-800' : 'text-slate-400'}`}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Complaint Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-3d bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">{complaint.title}</h3>
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 font-medium">
              {complaint.description}
            </p>

            <div className="p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl border border-indigo-100/80 space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-black text-slate-800">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Exact Location</span>
              </div>
              <p className="text-xs text-slate-700 font-semibold pl-6">{complaint.locationFullPath}</p>
              {complaint.landmarkDetails && (
                <p className="text-[11px] text-slate-500 pl-6 font-medium">Landmark: {complaint.landmarkDetails}</p>
              )}
            </div>

            {/* Photo comparison with 3D frames */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">Issue Photo (Before)</label>
                {complaint.beforeImageUrl ? (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                    <img src={complaint.beforeImageUrl} alt="Before" className="h-48 w-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-slate-100 rounded-2xl flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-300 font-medium">
                    No before photo attached
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">Repair Proof (After)</label>
                {complaint.afterImageUrl ? (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                    <img src={complaint.afterImageUrl} alt="After" className="h-48 w-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-slate-100/70 rounded-2xl flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-300 font-medium">
                    Awaiting staff repair photo proof
                  </div>
                )}
              </div>
            </div>

            {complaint.rating && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1.5">
                <p className="text-xs font-black text-emerald-900 uppercase tracking-wider">Student Verification & Rating</p>
                <StarRating value={complaint.rating} readOnly />
                {complaint.feedback && <p className="text-xs text-emerald-800 italic font-medium">"{complaint.feedback}"</p>}
              </div>
            )}
          </div>

          {/* Comment Discussion Section */}
          <div className="card-3d bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Ticket Activity Discussion ({complaint.comments?.length || 0})</span>
            </h4>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {complaint.comments?.map((c) => (
                <div key={c.id} className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">
                      {c.authorName} ({c.authorRole.replace('ROLE_', '')})
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">{new Date(c.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-700 leading-snug font-medium">{c.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendComment} className="flex items-center space-x-2 pt-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a message or update..."
                className="flex-1 text-xs border border-slate-300 rounded-2xl p-3 bg-slate-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
              <button type="submit" className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-600/30 transition-all">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Stakeholders & Audit Timeline */}
        <div className="space-y-6">
          <div className="card-3d bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Stakeholders & SLA Target</h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Submitted By</span>
                <span className="font-black text-slate-900">{complaint.studentName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Service Supervisor</span>
                <span className="font-black text-slate-900">{complaint.deptHeadName || 'Unassigned'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Assigned Technician</span>
                <span className="font-black text-slate-900">{complaint.assignedStaffName || 'Pending Assignment'}</span>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <span className="text-slate-400 block font-medium">SLA Resolution Target</span>
                <span className="font-black text-blue-600 text-xs">{new Date(complaint.slaDueDate).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="card-3d bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Audit Step Trail</h4>
            <Timeline
              history={complaint.history}
              beforeImageUrl={complaint.beforeImageUrl}
              afterImageUrl={complaint.afterImageUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
