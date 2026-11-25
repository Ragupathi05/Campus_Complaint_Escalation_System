import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, ShieldCheck, Search, Bell, Activity } from 'lucide-react';
import { GlobalSearchModal } from './GlobalSearchModal';
import { NotificationCenter } from './NotificationCenter';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md text-slate-800 sticky top-0 z-40 border-b border-slate-200/90 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-md shadow-indigo-600/25 ring-2 ring-indigo-100">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900">
              CampusCare
            </h1>
            <p className="text-[11px] text-slate-500 font-semibold">Smart Campus Complaint & Facility Management System</p>
          </div>
        </div>

        {/* Center Search Bar Trigger */}
        {user && (
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-4 py-2 bg-slate-100/90 hover:bg-slate-100 border border-slate-200/90 rounded-2xl text-xs text-slate-500 transition-all shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-indigo-600" />
                <span className="font-medium text-slate-600">Search tickets, rooms, staff...</span>
              </div>
              <kbd className="px-2 py-0.5 rounded-lg bg-white text-[10px] font-mono text-slate-600 border border-slate-200 shadow-2xs font-bold">
                Ctrl K
              </kbd>
            </button>
          </div>
        )}

        {/* Right Side User Profile & Notification Center */}
        {user && (
          <div className="flex items-center space-x-3">
            {/* Live Operational Badge */}
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 text-[10px] font-extrabold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>99.8% System SLA Health</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifyOpen(!isNotifyOpen)}
                className="p-2.5 rounded-2xl bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 border border-slate-200 transition-colors relative shadow-2xs"
              >
                <Bell className="w-4 h-4 text-slate-700" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  2
                </span>
              </button>
              <NotificationCenter isOpen={isNotifyOpen} onClose={() => setIsNotifyOpen(false)} />
            </div>

            {/* User Info Badge */}
            <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 rounded-2xl border border-indigo-100">
              <UserIcon className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-extrabold text-slate-900">{user.fullName}</span>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-600 text-white shadow-2xs">
                {user.role === 'ROLE_DEPT_HEAD' ? 'SUPERVISOR' : user.role.replace('ROLE_', '')}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center space-x-1.5 p-2 sm:px-3 sm:py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-2xl text-xs font-extrabold border border-rose-200 transition-colors shadow-2xs"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Global Command Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};
