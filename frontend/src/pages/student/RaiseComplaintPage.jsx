import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintApi } from '../../api/complaintApi';
import { departmentApi } from '../../api/departmentApi';
import { LocationPicker } from '../../components/LocationPicker';
import { ImageUploadZone } from '../../components/ImageUploadZone';
import { PlusCircle, FileText, ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react';

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
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Raise New Campus Complaint</h2>
        <p className="text-xs text-slate-500">Provide ticket details and location to trigger automated department triage</p>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">1. Issue Category</label>
            <select
              required
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full text-xs rounded-xl border border-slate-300 p-3 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500"
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
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">2. Problem Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Smart Classroom Projector Disconnected"
              className="w-full text-xs rounded-xl border border-slate-300 p-3 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {selectedCategoryObj && (
          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 flex items-center justify-between">
            <div>
              <span className="font-bold">Target Department:</span> {selectedCategoryObj.departmentName}
            </div>
            <div>
              <span className="font-bold">Automated SLA Guarantee:</span> {selectedCategoryObj.slaHours} Hours
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">3. Problem Description</label>
          <textarea
            required
            rows="4"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Explain the issue details, symptoms, when it started, or equipment code..."
            className="w-full text-xs rounded-xl border border-slate-300 p-3 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">4. Structured Location Picker</label>
          <LocationPicker
            onLocationSelect={(locId) => setForm({ ...form, locationId: locId })}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Landmark / Specific Spot</label>
          <input
            type="text"
            value={form.landmarkDetails}
            onChange={(e) => setForm({ ...form, landmarkDetails: e.target.value })}
            placeholder="e.g. Near 2nd bench row, right side AC unit"
            className="w-full text-xs rounded-xl border border-slate-300 p-3 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <ImageUploadZone
          label="5. Attach Issue Photo (Before Repair Proof)"
          onImageUploaded={(url) => setForm({ ...form, beforeImageUrl: url })}
        />

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all disabled:opacity-50"
          >
            <span>{loading ? 'Submitting Ticket...' : 'Submit Complaint Ticket'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
