import React, { useState } from 'react';
import { Bell, Check, Ticket, AlertTriangle, ShieldCheck, X } from 'lucide-react';

export const NotificationCenter = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Technician Assigned',
      message: 'Rajesh Kumar (Senior Electrician) assigned to your ticket #MITS-2026-A4F9',
      time: '10 mins ago',
      type: 'assignment',
      unread: true,
    },
    {
      id: 2,
      title: 'Repair Completed',
      message: 'Technician uploaded repair photo proof. Please verify and rate the service.',
      time: '1 hour ago',
      type: 'completion',
      unread: true,
    },
    {
      id: 3,
      title: 'SLA Escalation Alert',
      message: 'Ticket #MITS-2026-88B1 exceeded SLA target and escalated to Service Supervisor.',
      time: '3 hours ago',
      type: 'escalation',
      unread: false,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-slate-900">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-900">CampusCare Alerts</span>
          {notifications.filter((n) => n.unread).length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
              {notifications.filter((n) => n.unread).length}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={markAllRead}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          >
            <Check className="w-3 h-3" />
            <span>Mark all read</span>
          </button>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-3.5 hover:bg-slate-50/80 transition-colors flex items-start space-x-3 ${
              n.unread ? 'bg-blue-50/30' : ''
            }`}
          >
            <div
              className={`p-2 rounded-xl mt-0.5 ${
                n.type === 'completion'
                  ? 'bg-emerald-100 text-emerald-600'
                  : n.type === 'escalation'
                  ? 'bg-rose-100 text-rose-600'
                  : 'bg-blue-100 text-blue-600'
              }`}
            >
              {n.type === 'completion' ? (
                <ShieldCheck className="w-4 h-4" />
              ) : n.type === 'escalation' ? (
                <AlertTriangle className="w-4 h-4" />
              ) : (
                <Ticket className="w-4 h-4" />
              )}
            </div>

            <div className="flex-1 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{n.title}</span>
                <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
