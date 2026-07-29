import React, { useState, useEffect } from 'react';
import { departmentApi } from '../../api/departmentApi';
import { Clock, Shield, Plus, Save } from 'lucide-react';

export const DeptHeadCategorySlaEditor = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    departmentApi.getAllCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Department Category & SLA Rule Configurator</h2>
        <p className="text-xs text-slate-500">Configure target SLA resolution hours and default priorities for department issue categories</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>Active Category SLA Rules ({categories.length})</span>
          </h3>
        </div>

        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div>
                <h4 className="font-bold text-slate-800">{cat.name}</h4>
                <p className="text-[11px] text-slate-500">{cat.description || 'No description'}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-medium">Default Priority</span>
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {cat.defaultPriority}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-medium">SLA Target</span>
                  <span className="font-bold text-slate-800 bg-white px-3 py-1 rounded border font-mono">
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
