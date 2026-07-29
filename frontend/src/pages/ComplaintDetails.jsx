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
    <div className="p-6 space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to={-1} className="p-2 bg-white rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-extrabold text-slate-900">Ticket {complaint.ticketNumber}</h2>
              <StatusBadge status={complaint.status} />
              <PriorityBadge priority={complaint.priority} />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {complaint.categoryName} • Registered on {new Date(complaint.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Amazon-Style Live Journey Progress Stepper */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Repair Journey</h3>
        <div className="flex items-center justify-between relative pt-2">
          <div className="absolute left-0 top-6 transform -translate-y-1/2 w-full h-1 bg-slate-100 z-0" />
          <div
            className="absolute left-0 top-6 transform -translate-y-1/2 h-1 bg-blue-600 z-0 transition-all duration-500"
            style={{ width: `${((currentStageIndex - 1) / 7) * 100}%` }}
          />

          {journeyStages.map((stage, idx) => {
            const Icon = stage.icon;
            const stageNum = idx + 1;
            const isPassed = currentStageIndex > stageNum;
            const isCurrent = currentStageIndex === stageNum;

            return (
              <div key={stage.key} className="relative z-10 flex flex-col items-center space-y-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs transition-all ${
                    isPassed
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md animate-pulse'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-semibold hidden sm:inline ${isCurrent ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>
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
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">{complaint.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
              {complaint.description}
            </p>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Exact Location</span>
              </div>
              <p className="text-xs text-slate-600 pl-6">{complaint.locationFullPath}</p>
              {complaint.landmarkDetails && (
                <p className="text-[11px] text-slate-400 pl-6">Landmark: {complaint.landmarkDetails}</p>
              )}
            </div>

            {/* Photo comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Issue Photo (Before)</label>
                {complaint.beforeImageUrl ? (
                  <img src={complaint.beforeImageUrl} alt="Before" className="h-44 w-full object-cover rounded-xl border" />
                ) : (
                  <div className="h-44 w-full bg-slate-100 rounded-xl flex items-center justify-center text-xs text-slate-400">
                    No before photo attached
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Repair Proof (After)</label>
                {complaint.afterImageUrl ? (
                  <img src={complaint.afterImageUrl} alt="After" className="h-44 w-full object-cover rounded-xl border" />
                ) : (
                  <div className="h-44 w-full bg-slate-100 rounded-xl flex items-center justify-center text-xs text-slate-400">
                    Awaiting staff repair photo proof
                  </div>
                )}
              </div>
            </div>

            {complaint.rating && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <p className="text-xs font-bold text-emerald-900">Student Verification & Rating</p>
                <StarRating value={complaint.rating} readOnly />
                {complaint.feedback && <p className="text-xs text-emerald-800 italic">"{complaint.feedback}"</p>}
              </div>
            )}
          </div>

          {/* Comment Discussion Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Ticket Activity Discussion ({complaint.comments?.length || 0})</span>
            </h4>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {complaint.comments?.map((c) => (
                <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      {c.authorName} ({c.authorRole.replace('ROLE_', '')})
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{new Date(c.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-600 leading-snug">{c.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendComment} className="flex items-center space-x-2 pt-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a message or update..."
                className="flex-1 text-xs border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600"
              />
              <button type="submit" className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md shadow-blue-600/30">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Stakeholders & Audit Timeline */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stakeholders & SLA Target</h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Submitted By</span>
                <span className="font-bold text-slate-900">{complaint.studentName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Service Supervisor</span>
                <span className="font-bold text-slate-900">{complaint.deptHeadName || 'Unassigned'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Assigned Technician</span>
                <span className="font-bold text-slate-900">{complaint.assignedStaffName || 'Pending Assignment'}</span>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-slate-400 block font-medium">SLA Resolution Target</span>
                <span className="font-bold text-blue-600 text-xs">{new Date(complaint.slaDueDate).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Audit Step Trail</h4>
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
