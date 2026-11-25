import React, { useState, useEffect } from 'react';
import { departmentApi } from '../../api/departmentApi';
import { Clock, Shield, Plus, Save } from 'lucide-react';

export const DeptHeadCategorySlaEditor = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    departmentApi.getAllCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <div className="w-full space-y-6">
      <div className="card-3d bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2.5">
            <Clock className="w-6 h-6 text-indigo-600" />
            <span>Department Category & SLA Rule Configurator</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">Configure target SLA resolution hours and default priorities for department issue categories</p>
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 pb-3 pt-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>Active Category SLA Rules ({categories.length})</span>
          </h3>
        </div>

        <div className="space-y-3.5">
          {categories.map((cat) => (
            <div key={cat.id} className="card-3d p-5 bg-gradient-to-r from-slate-50/80 to-indigo-50/30 hover:from-white hover:to-indigo-50/60 rounded-2xl border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <h4 className="font-black text-slate-900 text-sm tracking-tight">{cat.name}</h4>
                <p className="text-xs text-slate-500 font-medium">{cat.description || 'No description provided'}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Default Priority</span>
                  <span className="font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100 shadow-2xs">
                    {cat.defaultPriority}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">SLA Target</span>
                  <span className="font-black text-slate-900 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200/90 shadow-2xs font-mono text-xs">
                    {cat.slaHours} Hours
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
