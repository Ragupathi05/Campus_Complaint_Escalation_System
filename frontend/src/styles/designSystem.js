// CampusCare v2.0 Enterprise Design Tokens & Theme Standards

export const designTokens = {
  colors: {
    brand: {
      navy: '#0F172A',      // Top Header & Dark Executive Panels
      navyDark: '#020617',  // Deep Dark Background
      blue: '#2563EB',      // Primary Action Buttons & Active Steppers
      blueHover: '#1D4ED8',
      blueLight: '#EFF6FF',
      emerald: '#22C55E',   // Success, Resolved, Verification Badges
      emeraldLight: '#DCFCE7',
      amber: '#06B6D4',     // Clean Cyan (cool SaaS tone)
      amberLight: '#ECFEFF',
      rose: '#EF4444',      // Danger, Escalated, Critical Priority
      roseLight: '#FEE2E2',
      slateBg: '#F8FAFC',   // Main Application Background
      cardBg: '#FFFFFF',    // Content Cards
      textPrimary: '#0F172A',
      textSecondary: '#64748B',
      border: '#E2E8F0',
    },
    priority: {
      LOW: { label: 'Low', color: 'emerald', bg: 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold', icon: '🟢' },
      MEDIUM: { label: 'Medium', color: 'sky', bg: 'bg-sky-50 border-sky-200 text-sky-800 font-bold', icon: '🔹' },
      HIGH: { label: 'High', color: 'indigo', bg: 'bg-indigo-50 border-indigo-200 text-indigo-800 font-bold', icon: '🔷' },
      CRITICAL: { label: 'Critical', color: 'rose', bg: 'bg-rose-50 border-rose-200 text-rose-700 font-bold', icon: '🔴' },
    },
    status: {
      NEW: { label: 'Submitted', bg: 'bg-blue-50 border-blue-200 text-blue-700 font-bold' },
      ASSIGNED: { label: 'Assigned', bg: 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold' },
      ACCEPTED: { label: 'Accepted', bg: 'bg-sky-50 border-sky-200 text-sky-700 font-bold' },
      IN_PROGRESS: { label: 'In Repair', bg: 'bg-cyan-50 border-cyan-200 text-cyan-800 font-bold' },
      WAITING_PARTS: { label: 'Waiting Parts', bg: 'bg-blue-50 border-blue-200 text-blue-800 font-bold' },
      REPAIR_COMPLETED: { label: 'Pending Verification', bg: 'bg-purple-50 border-purple-200 text-purple-700 font-bold' },
      VERIFIED: { label: 'Verified & Closed', bg: 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold' },
      ESCALATED: { label: 'SLA Escalated', bg: 'bg-rose-50 border-rose-200 text-rose-700 font-extrabold' },
      REOPENED: { label: 'Reopened', bg: 'bg-red-50 border-red-200 text-red-700 font-bold' },
    }
  },
  typography: {
    fontHeading: "'Poppins', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
  shadows: {
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    cardHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  borderRadius: {
    card: 'rounded-2xl',
    button: 'rounded-xl',
    badge: 'rounded-full',
  }
};
