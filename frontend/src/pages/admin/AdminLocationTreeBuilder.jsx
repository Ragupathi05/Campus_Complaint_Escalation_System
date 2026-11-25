import React, { useState, useEffect } from 'react';
import { locationApi } from '../../api/locationApi';
import { MapPin, Plus, Folder, Home, ChevronRight } from 'lucide-react';

export const AdminLocationTreeBuilder = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    locationApi.getRoots().then(setLocations).catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Campus Location Hierarchy Builder</h2>
        <p className="text-xs text-slate-500">Manage 4-level campus location tree nodes (Campus → Block → Floor → Room/Lab)</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-100 pb-3">
          <MapPin className="w-4 h-4 text-indigo-600" />
          <span>Active Location Hierarchy Nodes</span>
        </h3>

        <div className="space-y-3 text-xs">
          {locations.map((campus) => (
            <div key={campus.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-slate-800 text-sm">
                <Home className="w-4 h-4 text-indigo-600" />
                <span>{campus.name} ({campus.type})</span>
              </div>

              <div className="pl-6 space-y-2">
                {campus.children?.map((block) => (
                  <div key={block.id} className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-slate-700">
                      <Folder className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{block.name}</span>
                    </div>

                    <div className="pl-5 space-y-1 text-[11px]">
                      {block.children?.map((floor) => (
                        <div key={floor.id} className="flex items-center space-x-1 text-slate-600">
                          <ChevronRight className="w-3 h-3 text-slate-400" />
                          <span className="font-medium">{floor.name}</span>
                          <span className="text-slate-400">({floor.children?.length || 0} Rooms/Labs)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
