import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'blue' }) => {
  const colorMap = {
    blue: {
      cardBg: 'card-gradient-blue',
      border: 'border-blue-200/80',
      iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-600',
      iconText: 'text-white',
      accentBar: 'bg-blue-600',
      valueText: 'text-blue-950',
    },
    emerald: {
      cardBg: 'card-gradient-emerald',
      border: 'border-emerald-200/80',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      iconText: 'text-white',
      accentBar: 'bg-emerald-600',
      valueText: 'text-emerald-950',
    },
    amber: {
      cardBg: 'card-gradient-cyan',
      border: 'border-cyan-200/90',
      iconBg: 'bg-gradient-to-br from-cyan-500 to-teal-600',
      iconText: 'text-white',
      accentBar: 'bg-cyan-600',
      valueText: 'text-cyan-950',
    },
    cyan: {
      cardBg: 'card-gradient-cyan',
      border: 'border-cyan-200/90',
      iconBg: 'bg-gradient-to-br from-cyan-500 to-teal-600',
      iconText: 'text-white',
      accentBar: 'bg-cyan-600',
      valueText: 'text-cyan-950',
    },
    rose: {
      cardBg: 'card-gradient-rose',
      border: 'border-rose-200/80',
      iconBg: 'bg-gradient-to-br from-rose-500 to-red-600',
      iconText: 'text-white',
      accentBar: 'bg-rose-600',
      valueText: 'text-rose-950',
    },
    indigo: {
      cardBg: 'card-gradient-indigo',
      border: 'border-indigo-200/80',
      iconBg: 'bg-gradient-to-br from-indigo-600 to-purple-600',
      iconText: 'text-white',
      accentBar: 'bg-indigo-600',
      valueText: 'text-indigo-950',
    },
    purple: {
      cardBg: 'card-gradient-purple',
      border: 'border-purple-200/80',
      iconBg: 'bg-gradient-to-br from-purple-600 to-indigo-600',
      iconText: 'text-white',
      accentBar: 'bg-purple-600',
      valueText: 'text-purple-950',
    },
  };

  const style = colorMap[color] || colorMap.blue;

  return (
    <div className={`${style.cardBg} ${style.border} border p-5 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between border-t-2 border-t-white/90`}>
      {/* 3D Decorative Ambient Light Bubble */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/40 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

      <div className="flex items-center justify-between relative z-10">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-700/90">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-2xl ${style.iconBg} ${style.iconText} shadow-lg shadow-indigo-950/10 ring-4 ring-white/90 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="my-2 flex items-baseline space-x-2 relative z-10">
        <span className={`text-3xl font-black tracking-tight ${style.valueText} drop-shadow-xs`}>{value}</span>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trend.startsWith('+') ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'} shadow-2xs`}>
            {trend}
          </span>
        )}
      </div>

      {subtitle && <p className="text-[11px] text-slate-600 font-semibold relative z-10">{subtitle}</p>}

      {/* 3D Bottom Mini Accent Indicator Line */}
      <div className="mt-3 w-full bg-slate-200/70 h-2 rounded-full overflow-hidden p-0.5 shadow-inner relative z-10">
        <div className={`h-full ${style.accentBar} rounded-full transition-all duration-500 shadow-xs`} style={{ width: value > 0 ? '75%' : '15%' }} />
      </div>
    </div>
  );
};
