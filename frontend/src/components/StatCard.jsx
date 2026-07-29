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
      cardBg: 'card-gradient-amber',
      border: 'border-amber-200/80',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
      iconText: 'text-white',
      accentBar: 'bg-amber-600',
      valueText: 'text-amber-950',
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
    <div className={`${style.cardBg} ${style.border} border p-5 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-2xl ${style.iconBg} ${style.iconText} shadow-md ring-4 ring-white/80 transform group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="my-2 flex items-baseline space-x-2">
        <span className={`text-3xl font-black tracking-tight ${style.valueText}`}>{value}</span>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trend.startsWith('+') ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
            {trend}
          </span>
        )}
      </div>

      {subtitle && <p className="text-[11px] text-slate-600 font-semibold">{subtitle}</p>}

      {/* Bottom Mini Accent Indicator Line */}
      <div className="mt-3 w-full bg-slate-200/60 h-1.5 rounded-full overflow-hidden">
        <div className={`h-full ${style.accentBar} rounded-full transition-all duration-500`} style={{ width: value > 0 ? '75%' : '15%' }} />
      </div>
    </div>
  );
};
