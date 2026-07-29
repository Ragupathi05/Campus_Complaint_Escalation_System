import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, KeyRound, User as UserIcon, ArrowRight, Eye, EyeOff, Sparkles, CheckCircle2, Zap } from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const performLogin = async (username, password) => {
    setError('');
    setLoading(true);
    try {
      const user = await login({ usernameOrEmail: username, password });
      if (user.role === 'ROLE_STUDENT' || user.role === 'ROLE_FACULTY') {
        navigate('/dashboard/student');
      } else if (user.role === 'ROLE_STAFF') {
        navigate('/dashboard/staff');
      } else if (user.role === 'ROLE_DEPT_HEAD') {
        navigate('/dashboard/dept-head');
      } else if (user.role === 'ROLE_ADMIN') {
        navigate('/dashboard/admin');
      } else if (user.role === 'ROLE_HIGHER_OFFICIAL') {
        navigate('/dashboard/higher-official');
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    performLogin(form.usernameOrEmail, form.password);
  };

  const handleQuickLogin = (username) => {
    setForm({ usernameOrEmail: username, password: 'password123' });
    performLogin(username, 'password123');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row overflow-hidden relative font-sans">
      {/* Left side futuristic hero showcase */}
      <div className="lg:w-7/12 relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-slate-950">
        {/* Background Generated Hero Image with Soft Gradient Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000 hover:scale-100">
          <img
            src="/campus_care_hero.png"
            alt="Campus Care Hero"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Ambient Gradient Glows */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-indigo-950/40 z-10" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl z-10" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl z-10" />

        {/* Top Logo Badge */}
        <div className="relative z-20 flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl shadow-indigo-500/30 ring-2 ring-white/20">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="text-2xl font-black text-white tracking-tight">CampusCare</span>
            <p className="text-xs text-indigo-200/80 font-medium">Madanapalle Institute of Technology & Science</p>
          </div>
        </div>

        {/* Center Feature Value Props */}
        <div className="relative z-20 space-y-6 max-w-xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Smart Campus Complaint & Facility Infrastructure</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
            Automated Escalation, <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Real-Time SLA Dispatch
            </span>
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed font-medium">
            Seamlessly connect Students, Supervisors, Technicians, and Campus Leadership with automated department routing, photo proof verification, and SLA timeout escalation.
          </p>

          {/* Floating Feature Badges */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-black text-amber-300">
                <Zap className="w-4 h-4" />
                <span>Instant SLA</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">Auto Department Routing</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-black text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Photo Proof</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">Verified Repair Photos</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-black text-blue-300">
                <ShieldCheck className="w-4 h-4" />
                <span>Audit Trail</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">Executive Oversight</p>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="relative z-20 text-xs text-slate-400 font-medium">
          © 2026 Madanapalle Institute of Technology & Science (MITS). All rights reserved.
        </div>
      </div>

      {/* Right side login form card */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50/50">
        <div className="w-full max-w-md space-y-6 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-slate-200/90 relative z-20">
          <div className="text-center space-y-2">
            <div className="inline-flex lg:hidden p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white shadow-md mb-2">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Sign In to CampusCare</h2>
            <p className="text-xs text-slate-500 font-medium">Enter your credentials or click a demo account below</p>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center shadow-2xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Username or Email</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={form.usernameOrEmail}
                  onChange={(e) => setForm({ ...form, usernameOrEmail: e.target.value })}
                  placeholder="e.g. student1, staff1, admin1"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl text-xs font-black shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-1">
            <span className="text-xs text-slate-500 font-medium">New Student or Faculty? </span>
            <Link to="/register" className="text-xs text-indigo-600 hover:text-indigo-700 hover:underline font-extrabold">
              Create an Account
            </Link>
          </div>

          {/* Interactive One-Click Demo Accounts Widget */}
          <div className="pt-4 border-t border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">Instant Demo Login:</span>
              <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">1-Click Access</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickLogin('student1')}
                className="p-2.5 rounded-2xl bg-indigo-50/80 hover:bg-indigo-600 hover:text-white border border-indigo-100 text-indigo-950 transition-all font-bold text-left flex items-center justify-between group shadow-2xs"
              >
                <div>
                  <span className="block text-[11px] font-extrabold">Student</span>
                  <span className="text-[9px] text-slate-500 group-hover:text-indigo-100 font-medium">student1</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('staff1')}
                className="p-2.5 rounded-2xl bg-emerald-50/80 hover:bg-emerald-600 hover:text-white border border-emerald-100 text-emerald-950 transition-all font-bold text-left flex items-center justify-between group shadow-2xs"
              >
                <div>
                  <span className="block text-[11px] font-extrabold">Technician</span>
                  <span className="text-[9px] text-slate-500 group-hover:text-emerald-100 font-medium">staff1</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('depthead1')}
                className="p-2.5 rounded-2xl bg-amber-50/80 hover:bg-amber-600 hover:text-white border border-amber-100 text-amber-950 transition-all font-bold text-left flex items-center justify-between group shadow-2xs"
              >
                <div>
                  <span className="block text-[11px] font-extrabold">Supervisor</span>
                  <span className="text-[9px] text-slate-500 group-hover:text-amber-100 font-medium">depthead1</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin1')}
                className="p-2.5 rounded-2xl bg-purple-50/80 hover:bg-purple-600 hover:text-white border border-purple-100 text-purple-950 transition-all font-bold text-left flex items-center justify-between group shadow-2xs"
              >
                <div>
                  <span className="block text-[11px] font-extrabold">Admin</span>
                  <span className="text-[9px] text-slate-500 group-hover:text-purple-100 font-medium">admin1</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
