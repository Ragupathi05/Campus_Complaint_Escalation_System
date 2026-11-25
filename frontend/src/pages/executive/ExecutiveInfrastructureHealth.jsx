import React from 'react';
import { Activity, ShieldCheck, AlertTriangle, Building, CheckCircle2 } from 'lucide-react';

export const ExecutiveInfrastructureHealth = () => {
  const blocks = [
    { name: 'Block A (EB Block)', status: 'HEALTHY', activeTickets: 2, resolvedMonth: 45 },
    { name: 'Block B (Science & Mech)', status: 'HEALTHY', activeTickets: 1, resolvedMonth: 38 },
    { name: 'Main Library & Auditoriums', status: 'WARNING', activeTickets: 5, resolvedMonth: 29 },
    { name: 'Student Hostels (Block C & D)', status: 'HEALTHY', activeTickets: 3, resolvedMonth: 62 },
    { name: 'Sports Complex & Grounds', status: 'OPTIMAL', activeTickets: 0, resolvedMonth: 12 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Campus Facility Infrastructure Health Status</h2>
        <p className="text-xs text-slate-500">Live operational status across all MITS campus blocks and facility zones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blocks.map((b, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-800 flex items-center space-x-2">
                <Building className="w-4 h-4 text-indigo-600" />
                <span>{b.name}</span>
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  b.status === 'WARNING'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {b.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-center pt-2">
              <div className="bg-slate-50 p-2 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-medium">Active Open Issues</span>
                <span className="font-bold text-slate-800 text-base">{b.activeTickets}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-medium">Solved This Month</span>
                <span className="font-bold text-emerald-600 text-base">{b.resolvedMonth}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
