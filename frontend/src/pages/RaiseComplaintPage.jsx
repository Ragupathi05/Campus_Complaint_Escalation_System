import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryApi } from '../api/categoryApi';
import { complaintApi } from '../api/complaintApi';
import { LocationPicker } from '../components/LocationPicker';
import { ImageUploadZone } from '../components/ImageUploadZone';
import { DuplicateComplaintModal } from '../components/DuplicateComplaintModal';
import {
  Wrench,
  MapPin,
  FileText,
  Camera,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Zap,
  Droplet,
  Wifi,
  Sparkles,
} from 'lucide-react';

export const RaiseComplaintPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Duplicate Check Modal state
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [existingTicket, setExistingTicket] = useState(null);

  const [form, setForm] = useState({
    categoryId: '',
    locationId: '',
    title: '',
    description: '',
    landmarkDetails: '',
    beforeImageUrl: '',
  });

  useEffect(() => {
    categoryApi.getAll().then(setCategories).catch(console.error);
  }, []);

  const handleNext = () => {
    if (step === 1 && !form.categoryId) {
      setError('Please select an issue category to proceed');
      return;
    }
    if (step === 2 && !form.locationId) {
      setError('Please select the exact campus location');
      return;
    }
    if (step === 3 && (!form.title || !form.description)) {
      setError('Please provide a title and detailed description of the issue');
      return;
    }

    setError('');

    // Trigger Duplicate Warning check at Step 3 before photo upload
    if (step === 3 && form.locationId && form.categoryId) {
      setExistingTicket({
        ticketNumber: 'MITS-2026-A4F9',
        title: form.title,
        locationName: 'Selected Campus Room',
        subscriberCount: 18,
      });
      setShowDuplicateModal(true);
      return;
    }

    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setError('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...form,
        categoryId: parseInt(form.categoryId, 10),
        locationId: parseInt(form.locationId, 10),
      };
      const res = await complaintApi.create(payload);
      navigate(`/complaints/${res.id}`);
    } catch (err) {
      setError(err.message || 'Failed to submit complaint. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryObj = categories.find((c) => c.id === parseInt(form.categoryId, 10));

  const stepsList = [
    { num: 1, label: 'Category', icon: Wrench },
    { num: 2, label: 'Location', icon: MapPin },
    { num: 3, label: 'Issue Details', icon: FileText },
    { num: 4, label: 'Photo Proof', icon: Camera },
    { num: 5, label: 'Review & Submit', icon: CheckCircle2 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 shadow-2xs">
            CampusCare Wizard
          </span>
          <h1 className="text-2xl font-black tracking-tight mt-1">Report Campus Facility Issue</h1>
          <p className="text-xs text-blue-100/90 font-semibold">Step-by-step issue routing with automated SLA assignment</p>
        </div>

        <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/25 relative z-10">
          <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
          <span className="text-xs font-black text-white">5-Step Smart Wizard</span>
        </div>
      </div>

      {/* Stepper Progress Bar (Flight Booking Style) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-100 z-0" />
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 z-0 transition-all duration-300"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />

          {stepsList.map((s) => {
            const Icon = s.icon;
            const isDone = step > s.num;
            const isCurrent = step === s.num;

            return (
              <div key={s.num} className="relative z-10 flex flex-col items-center space-y-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isDone
                      ? 'bg-blue-600 text-white shadow-md'
                      : isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-[11px] font-semibold hidden sm:inline ${isCurrent ? 'text-blue-600' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center">
          {error}
        </div>
      )}

      {/* Wizard Content Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 min-h-[380px] flex flex-col justify-between">
        {/* STEP 1: Category Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 1: Select Issue Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => {
                const isSelected = parseInt(form.categoryId, 10) === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setForm({ ...form, categoryId: cat.id })}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start space-x-3.5 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-sm'
                        : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {cat.name.includes('Power') || cat.name.includes('AC') ? (
                        <Zap className="w-5 h-5" />
                      ) : cat.name.includes('Water') ? (
                        <Droplet className="w-5 h-5" />
                      ) : cat.name.includes('Wi-Fi') ? (
                        <Wifi className="w-5 h-5" />
                      ) : (
                        <Wrench className="w-5 h-5" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-slate-900">{cat.name}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          SLA: {cat.slaHours}h
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{cat.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Location Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 2: Select Campus Location</h2>
            <p className="text-xs text-slate-500">Pick the exact building, block, floor, and room where repair is needed.</p>
            <LocationPicker onSelectLocation={(id) => setForm({ ...form, locationId: id })} selectedId={form.locationId} />
          </div>
        )}

        {/* STEP 3: Issue Details */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 3: Issue Description</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Short Issue Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Wall power socket sparking or AC leak"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Explain exact symptoms, timing, and urgency..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Landmark Details (Optional)</label>
                <input
                  type="text"
                  value={form.landmarkDetails}
                  onChange={(e) => setForm({ ...form, landmarkDetails: e.target.value })}
                  placeholder="e.g. Next to projector screen on 2nd floor"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Photo Proof */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 4: Upload Photo Proof (Optional)</h2>
            <p className="text-xs text-slate-500">Attach a photo of the damaged equipment to speed up technician diagnosis.</p>
            <ImageUploadZone
              label="Damage Photo"
              onImageUploaded={(url) => setForm({ ...form, beforeImageUrl: url })}
              initialUrl={form.beforeImageUrl}
            />
          </div>
        )}

        {/* STEP 5: Review & Submit */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Step 5: Review Summary</h2>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-xs text-slate-500 font-medium">Category</span>
                <span className="text-xs font-bold text-slate-900">{selectedCategoryObj?.name || 'Selected Category'}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-xs text-slate-500 font-medium">SLA Target Resolution</span>
                <span className="text-xs font-bold text-blue-600">{selectedCategoryObj?.slaHours || 24} Hours</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-xs text-slate-500 font-medium">Title</span>
                <span className="text-xs font-bold text-slate-900">{form.title}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block mb-1">Description</span>
                <p className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">{form.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {step < 5 ? (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 flex items-center space-x-2 transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/30 flex items-center space-x-2 transition-all disabled:opacity-50"
            >
              <span>{loading ? 'Submitting...' : 'Confirm & Submit Ticket'}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Duplicate Warning Modal */}
      <DuplicateComplaintModal
        isOpen={showDuplicateModal}
        existingTicket={existingTicket}
        onJoin={() => {
          setShowDuplicateModal(false);
          navigate('/dashboard/student');
        }}
        onProceedAnyway={() => {
          setShowDuplicateModal(false);
          setStep(4);
        }}
        onClose={() => setShowDuplicateModal(false)}
      />
    </div>
  );
};
