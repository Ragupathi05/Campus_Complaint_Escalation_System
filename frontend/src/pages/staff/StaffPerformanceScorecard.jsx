import React from 'react';
import { Award, Star, CheckCircle, Clock, Zap } from 'lucide-react';

export const StaffPerformanceScorecard = () => {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Technician Performance & Rating Scorecard</h2>
        <p className="text-xs text-slate-500">MITS maintenance quality evaluation, resolution speed index, and badges</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-xs text-slate-500 font-medium">Customer Rating Index</p>
          <div className="flex items-center space-x-2">
            <h3 className="text-3xl font-bold text-amber-500">4.8</h3>
            <div className="flex text-amber-500">
              <Star className="w-5 h-5 fill-amber-500" />
              <Star className="w-5 h-5 fill-amber-500" />
              <Star className="w-5 h-5 fill-amber-500" />
              <Star className="w-5 h-5 fill-amber-500" />
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400">Based on verified student reviews</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-xs text-slate-500 font-medium">Avg Resolution Time</p>
          <h3 className="text-3xl font-bold text-indigo-600">2.4 Hrs</h3>
          <p className="text-[11px] text-slate-400">Well within 12-hour SLA target</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <p className="text-xs text-slate-500 font-medium">Achievement Tier</p>
          <h3 className="text-xl font-bold text-emerald-600 flex items-center space-x-1">
            <Award className="w-6 h-6" />
            <span>Master Technician</span>
          </h3>
          <p className="text-[11px] text-slate-400">Top 5% Resolution Speed</p>
        </div>
      </div>
    </div>
  );
};
