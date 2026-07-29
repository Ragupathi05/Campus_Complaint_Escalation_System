import React from 'react';
import { AlertCircle, Users, CheckCircle2, X } from 'lucide-react';

export const DuplicateComplaintModal = ({ isOpen, existingTicket, onJoin, onProceedAnyway, onClose }) => {
  if (!isOpen || !existingTicket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header Banner */}
        <div className="p-4 bg-amber-500 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <AlertCircle className="w-5 h-5 text-white" />
            <h3 className="text-sm font-bold">Similar Active Complaint Detected</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-amber-600 text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-slate-800">
          <p className="text-xs text-slate-600 leading-relaxed">
            Other students have already reported an active facility issue in this exact location. To get faster updates, you can <strong className="text-slate-900">join the existing complaint</strong> instead of creating a duplicate ticket.
          </p>

          {/* Existing Ticket Card Preview */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-600">{existingTicket.ticketNumber}</span>
              <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                <Users className="w-3 h-3" />
                <span>{existingTicket.subscriberCount || 14} students subscribed</span>
              </div>
            </div>
            <h4 className="text-xs font-bold text-slate-900">{existingTicket.title}</h4>
            <p className="text-[11px] text-slate-500">{existingTicket.locationName} • Registered active</p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={onProceedAnyway}
              className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Create Separate Ticket
            </button>
            <button
              onClick={onJoin}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/30 flex items-center justify-center space-x-1.5 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Join Existing Complaint</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
