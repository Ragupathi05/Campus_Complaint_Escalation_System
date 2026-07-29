import React, { useState } from 'react';
import { complaintApi } from '../api/complaintApi';
import { UploadCloud, CheckCircle, Image as ImageIcon } from 'lucide-react';

export const ImageUploadZone = ({ label, onImageUploaded, initialUrl = '' }) => {
  const [preview, setPreview] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await complaintApi.uploadFile(formData);
      setPreview(res.url);
      onImageUploaded(res.url);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1">
      {label && <label className="block text-xs font-medium text-slate-700">{label}</label>}
      <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-indigo-500 transition-colors bg-slate-50/50">
        {preview ? (
          <div className="relative group inline-block">
            <img src={preview} alt="Uploaded Proof" className="h-32 w-auto object-cover rounded-lg shadow-sm border" />
            <div className="absolute inset-0 bg-slate-900/40 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <label className="cursor-pointer bg-white text-slate-900 text-xs px-2.5 py-1 rounded-md font-medium shadow-sm">
                Change
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          </div>
        ) : (
          <label className="cursor-pointer flex flex-col items-center justify-center space-y-1">
            <UploadCloud className="w-8 h-8 text-indigo-500" />
            <span className="text-xs font-medium text-slate-700">
              {uploading ? 'Uploading Photo...' : 'Click or Drag & Drop Photo Proof'}
            </span>
            <span className="text-[10px] text-slate-400">JPG, PNG up to 10MB</span>
            <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="hidden" />
          </label>
        )}
      </div>
      {error && <p className="text-[11px] text-rose-600">{error}</p>}
    </div>
  );
};
