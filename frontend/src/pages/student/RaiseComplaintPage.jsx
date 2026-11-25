import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintApi } from '../../api/complaintApi';
import { departmentApi } from '../../api/departmentApi';
import { LocationPicker } from '../../components/LocationPicker';
import { ImageUploadZone } from '../../components/ImageUploadZone';
import { PlusCircle, FileText, ShieldAlert, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export const RaiseComplaintPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    categoryId: '',
    locationId: '',
    landmarkDetails: '',
    beforeImageUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    departmentApi.getAllCategories().then(setCategories).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.locationId) {
      setError('Please select a specific 4-level campus location (Room / Lab)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await complaintApi.create({
        ...form,
        categoryId: parseInt(form.categoryId, 10),
        locationId: parseInt(form.locationId, 10),
      });
      navigate('/dashboard/student/history');
    } catch (err) {
      setError(err.message || 'Failed to submit complaint ticket.');
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryObj = categories.find((c) => c.id === parseInt(form.categoryId, 10));

  return (
    <div className="w-full space-y-6">
      {/* 3D Header Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-7 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-indigo-500/20">
        <div>
          <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">
            <PlusCircle className="w-4 h-4 text-indigo-400" />
            <span>Digital Grievance Portal</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Raise New Campus Complaint</h2>
          <p className="text-xs text-indigo-200/80 font-medium">Provide ticket details, 4-tier location, and photo proof to trigger automated department triage</p>
        </div>
        {selectedCategoryObj && (
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-xs text-right">
            <span className="text-[10px] uppercase font-bold text-cyan-300 block">Automated SLA Guarantee</span>
            <span className="text-lg font-black text-white">{selectedCategoryObj.slaHours} Hours</span>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-2xl font-semibold shadow-xs flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive 5-Step Complaint Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 card-3d bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">1. Issue Category</label>
              <select
                required
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full text-xs font-medium rounded-2xl border border-slate-300/90 p-3.5 bg-slate-50/80 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.departmentName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">2. Problem Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Smart Classroom Projector Disconnected"
                className="w-full text-xs font-medium rounded-2xl border border-slate-300/90 p-3.5 bg-slate-50/80 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
              />
            </div>
          </div>

          {selectedCategoryObj && (
            <div className="p-4 bg-gradient-to-r from-indigo-50 via-sky-50 to-blue-50 border border-indigo-100/90 rounded-2xl text-xs text-indigo-900 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <span><strong className="font-extrabold">Assigned Department:</strong> {selectedCategoryObj.departmentName}</span>
              </div>
              <div className="font-extrabold text-indigo-700 bg-white/80 px-3 py-1 rounded-full border border-indigo-200">
                SLA Window: {selectedCategoryObj.slaHours} Hours
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">3. Problem Description</label>
            <textarea
              required
              rows="4"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Explain the issue details, symptoms, when it started, or equipment code..."
              className="w-full text-xs font-medium rounded-2xl border border-slate-300/90 p-3.5 bg-slate-50/80 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700">4. Structured Campus Location</label>
            <LocationPicker
              onLocationSelect={(locId) => setForm({ ...form, locationId: locId })}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">Landmark / Specific Spot</label>
            <input
              type="text"
              value={form.landmarkDetails}
              onChange={(e) => setForm({ ...form, landmarkDetails: e.target.value })}
              placeholder="e.g. Near 2nd bench row, right side AC unit"
              className="w-full text-xs font-medium rounded-2xl border border-slate-300/90 p-3.5 bg-slate-50/80 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700">5. Attach Issue Photo (Before Repair Proof)</label>
            <ImageUploadZone
              onImageUploaded={(url) => setForm({ ...form, beforeImageUrl: url })}
            />
          </div>

          <div className="flex justify-end pt-5 border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className="btn-3d-primary px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-black flex items-center space-x-2 transition-all disabled:opacity-50 shadow-lg shadow-indigo-600/30"
            >
              <span>{loading ? 'Submitting Ticket...' : 'Submit Complaint Ticket'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Right Column: 3D SLA & Process Guidance Panel */}
        <div className="space-y-5">
          {/* Card 1: Automated Escalation Guarantee */}
          <div className="card-3d bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-indigo-600">
              <ShieldAlert className="w-5 h-5 text-indigo-600" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Campus SLA Guarantee</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Every complaint submitted through CampusCare is backed by strict university Service Level Agreements.
            </p>
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <span className="font-black text-slate-800 block">Instant Auto-Routing</span>
                  <span className="text-[11px] text-slate-500">Tickets route immediately to the matching department supervisor.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-xl bg-cyan-100 text-cyan-800 font-black flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <span className="font-black text-slate-800 block">Technician Dispatch</span>
                  <span className="text-[11px] text-slate-500">Supervisor delegates task based on proximity and workload index.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-xl bg-rose-100 text-rose-800 font-black flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <span className="font-black text-slate-800 block">Cron Auto-Escalation</span>
                  <span className="text-[11px] text-slate-500">If unresolved beyond SLA deadline, automatically escalated to Higher Official.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Helpful Reporting Tips */}
          <div className="card-3d bg-gradient-to-br from-indigo-50/80 to-blue-50/60 p-6 rounded-3xl border border-indigo-100 shadow-sm space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-indigo-950 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Tips for Quickest Resolution</span>
            </h4>
            <ul className="text-xs text-indigo-900/90 space-y-2 font-medium list-disc list-inside">
              <li>Attach a clear photo of the damage or broken equipment.</li>
              <li>Provide exact room / lab numbers using the 4-tier selector.</li>
              <li>Mention nearby landmarks (e.g. "Workstation 14, projector desk").</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
