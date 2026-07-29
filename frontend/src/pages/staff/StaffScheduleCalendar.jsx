import React from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, CheckCircle } from 'lucide-react';

export const StaffScheduleCalendar = () => {
  const schedule = [
    { time: '09:00 AM - 10:30 AM', location: 'Block A (EB Block) -> Floor 2 -> Room 204', task: 'Smart Board Disconnected (MITS-2026-7707F0)', status: 'COMPLETED' },
    { time: '11:00 AM - 01:00 PM', location: 'Main Library -> Floor 1 -> Reading Hall B', task: 'AC Cooling Leakage Inspection', status: 'IN_PROGRESS' },
    { time: '02:00 PM - 04:00 PM', location: 'Hostel Block C -> Ground Floor -> Room 12', task: 'Ceiling Fan Socket Repair', status: 'SCHEDULED' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Technician Daily Shift Route & Schedule</h2>
        <p className="text-xs text-slate-500">Floor-by-floor repair route optimization and time slots for today</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2 text-sm font-bold text-slate-800">
            <CalendarIcon className="w-5 h-5 text-indigo-600" />
            <span>Today's Maintenance Route Schedule ({new Date().toLocaleDateString()})</span>
          </div>
          <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-semibold">
            3 Scheduled Stops
          </span>
        </div>

        <div className="relative border-l-2 border-indigo-200 ml-4 space-y-6 pl-6">
          {schedule.map((item, idx) => (
            <div key={idx} className="relative space-y-1">
              <div className="absolute -left-[31px] top-1 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white shadow-xs" />
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-600 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.time}</span>
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.status === 'COMPLETED'
                      ? 'bg-emerald-50 text-emerald-700'
                      : item.status === 'IN_PROGRESS'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-800">{item.task}</h4>
              <p className="text-xs text-slate-600 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.location}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
