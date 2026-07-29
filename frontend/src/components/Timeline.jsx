import React, { useState } from 'react';
import { StatusBadge } from './StatusBadge';
import { Clock, User, Camera, X } from 'lucide-react';

export const Timeline = ({ history = [], beforeImageUrl = null, afterImageUrl = null }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!history || history.length === 0) {
    return (
      <div className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
        No audit activity recorded yet.
      </div>
    );
  }

  return (
    <div className="flow-root py-1">
      <ul className="space-y-0">
        {history.map((item, idx) => {
          const isLast = idx === history.length - 1;
          const formattedDate = item.createdAt
            ? new Date(item.createdAt).toLocaleString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            : '';

          // Determine step image URL
          let img = item.imageUrl;
          if (!img) {
            if (idx === 0 && beforeImageUrl) {
              img = beforeImageUrl;
            } else if (
              (item.statusTo === 'RESOLVED' || item.statusTo === 'REPAIR_COMPLETED') &&
              afterImageUrl
            ) {
              img = afterImageUrl;
            }
          }

          return (
            <li key={item.id || idx} className="relative pb-6 last:pb-0">
              {/* Vertical Connecting Line */}
              {!isLast && (
                <span
                  className="absolute top-4 left-3.5 -ml-px h-full w-0.5 bg-slate-200"
                  aria-hidden="true"
                />
              )}

              <div className="relative flex items-start space-x-3">
                {/* User Avatar Circle */}
                <div className="relative z-10">
                  <span className="h-7 w-7 rounded-full bg-blue-50 text-blue-600 ring-4 ring-white flex items-center justify-center shadow-xs border border-blue-200">
                    <User className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Audit Item Details */}
                <div className="flex-1 min-w-0 pt-0.5 space-y-1.5">
                  {/* Name & Status Badge */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 leading-tight">
                      {item.updatedByName || 'System / Staff'}
                    </span>
                    <StatusBadge status={item.statusTo} />
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center space-x-1 text-[11px] text-slate-400 font-medium">
                    <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{formattedDate}</span>
                  </div>

                  {/* Remarks Speech Bubble */}
                  {item.remarks && (
                    <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 leading-relaxed break-words font-normal">
                      {item.remarks}
                    </div>
                  )}

                  {/* Uploaded Photo Proof Attachment Thumbnail */}
                  {img && (
                    <div className="pt-1">
                      <div
                        onClick={() => setSelectedImage(img)}
                        className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-100 max-w-[200px] shadow-xs hover:shadow-md hover:border-indigo-400 transition-all"
                      >
                        <img
                          src={img}
                          alt="Audit Step Photo Proof"
                          className="h-28 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-slate-900/70 backdrop-blur-xs p-1.5 flex items-center space-x-1 text-[10px] font-bold text-white">
                          <Camera className="w-3 h-3 text-indigo-300" />
                          <span>View Photo Proof</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Fullscreen Photo Zoom Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-fadeIn"
        >
          <div className="relative max-w-3xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-700 p-2">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-slate-900/80 text-white rounded-full hover:bg-slate-900 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage}
              alt="Full Size Audit Proof"
              className="max-h-[80vh] w-auto object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
