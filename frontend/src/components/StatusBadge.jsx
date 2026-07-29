import React from 'react';
import { designTokens } from '../styles/designSystem';

export const StatusBadge = ({ status }) => {
  const config = designTokens.colors.status[status] || {
    label: status || 'Unknown',
    bg: 'bg-slate-100 border-slate-200 text-slate-700',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg}`}>
      {config.label}
    </span>
  );
};

export const PriorityBadge = ({ priority }) => {
  const config = designTokens.colors.priority[priority] || {
    label: priority || 'Low',
    bg: 'bg-slate-100 border-slate-200 text-slate-700',
    icon: '🟢',
  };

  return (
    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.bg}`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};
