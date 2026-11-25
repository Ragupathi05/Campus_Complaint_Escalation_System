import React from 'react';
import { Award, Star, CheckCircle, Clock, Zap } from 'lucide-react';

export const StaffPerformanceScorecard = () => {
  return (
    <div className="w-full space-y-6">
      {/* 3D Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 p-6 sm:p-7 rounded-3xl text-white shadow-xl border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-black uppercase tracking-wider mb-1">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Technician Metrics</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Technician Performance & Rating Scorecard</h2>
          <p className="text-xs text-indigo-100/90 font-medium">MITS maintenance quality evaluation, resolution speed index, and badges</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="card-3d bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <p className="text-xs font-black uppercase tracking-wider text-slate-500">Customer Rating Index</p>
          <div className="flex items-center space-x-3">
            <h3 className="text-3xl font-black text-cyan-600">4.8</h3>
            <div className="flex text-cyan-500 space-x-0.5">
              <Star className="w-5 h-5 fill-cyan-500" />
              <Star className="w-5 h-5 fill-cyan-500" />
              <Star className="w-5 h-5 fill-cyan-500" />
              <Star className="w-5 h-5 fill-cyan-500" />
              <Star className="w-5 h-5 fill-cyan-500" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Based on verified student reviews</p>
        </div>

        <div className="card-3d bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <p className="text-xs font-black uppercase tracking-wider text-slate-500">Avg Resolution Time</p>
          <h3 className="text-3xl font-black text-indigo-600">2.4 Hrs</h3>
          <p className="text-[11px] text-slate-400 font-medium">Well within 12-hour SLA target</p>
        </div>

        <div className="card-3d bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <p className="text-xs font-black uppercase tracking-wider text-slate-500">Achievement Tier</p>
          <h3 className="text-xl font-black text-emerald-600 flex items-center space-x-2">
            <Award className="w-6 h-6 text-emerald-500" />
            <span>Master Technician</span>
          </h3>
          <p className="text-[11px] text-slate-400 font-medium">Top 5% Resolution Speed</p>
        </div>
      </div>
    </div>
  );
};
