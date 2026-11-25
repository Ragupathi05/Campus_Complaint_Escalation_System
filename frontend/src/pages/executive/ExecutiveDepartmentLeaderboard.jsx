import React from 'react';
import { Award, TrendingUp, ShieldCheck, Star } from 'lucide-react';

export const ExecutiveDepartmentLeaderboard = () => {
  const leaderboards = [
    { rank: 1, name: 'Electrical & Maintenance', resolutionRate: '98.2%', avgSlaHours: '3.1 Hrs', rating: '4.8' },
    { rank: 2, name: 'IT Infrastructure & Networking', resolutionRate: '96.5%', avgSlaHours: '4.2 Hrs', rating: '4.7' },
    { rank: 3, name: 'Plumbing & Civil Facilities', resolutionRate: '92.0%', avgSlaHours: '8.5 Hrs', rating: '4.5' },
    { rank: 4, name: 'Housekeeping & Sanitation', resolutionRate: '89.4%', avgSlaHours: '11.0 Hrs', rating: '4.3' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Campus Department Performance Leaderboard</h2>
        <p className="text-xs text-slate-500">Benchmark facility departments by speed, SLA compliance, and student satisfaction</p>
      </div>

      <div className="space-y-4">
        {leaderboards.map((dept) => (
          <div key={dept.rank} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base ${
                dept.rank === 1 ? 'bg-indigo-100 text-indigo-800 border border-indigo-300 shadow-2xs' : 'bg-slate-100 text-slate-700'
              }`}>
                #{dept.rank}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{dept.name}</h3>
                <p className="text-xs text-slate-400">Avg Resolution: {dept.avgSlaHours}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-xs text-right">
              <div>
                <span className="text-slate-400 block font-medium">SLA Resolution Rate</span>
                <span className="font-bold text-emerald-600 text-sm">{dept.resolutionRate}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Student Rating</span>
                <span className="font-bold text-cyan-600 text-sm flex items-center justify-end space-x-1">
                  <Star className="w-3.5 h-3.5 fill-cyan-500" />
                  <span>{dept.rating}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
