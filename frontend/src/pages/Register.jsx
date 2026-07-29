import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { ShieldCheck, User, Mail, Lock, Phone, ArrowRight, Building, Sparkles, CheckCircle2, GraduationCap } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phone: '',
    role: 'ROLE_STUDENT',
    departmentCode: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await authApi.register(form);
      setSuccess('Account created successfully! Redirecting to sign in...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message || 'Registration failed. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row overflow-hidden relative font-sans">
      {/* Left side 3D futuristic hero showcase */}
      <div className="lg:w-7/12 relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-slate-950">
        {/* Background Generated Hero Image */}
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

        {/* Center Showcase Content */}
        <div className="relative z-20 space-y-6 max-w-xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-lg">
            <GraduationCap className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>Academic Student & Faculty Onboarding</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
            Join MITS Smart <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Campuscare Network
            </span>
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed font-medium">
            Register your official college credentials to track maintenance, report hostel & lab issues, upvote campus complaints, and verify technician repairs in real time.
          </p>

          {/* Feature Badges */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-black text-amber-300">
                <Sparkles className="w-4 h-4" />
                <span>Instant Ticket</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">Auto Department Routing</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-black text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Live Feed</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">Campus Issue Upvotes</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-black text-blue-300">
                <ShieldCheck className="w-4 h-4" />
                <span>SLA Timers</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">Guaranteed Resolution</p>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="relative z-20 text-xs text-slate-400 font-medium">
          © 2026 Madanapalle Institute of Technology & Science (MITS). All rights reserved.
        </div>
      </div>

      {/* Right side registration form card */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50/50">
        <div className="w-full max-w-md space-y-5 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-slate-200/90 relative z-20">
          <div className="text-center space-y-1">
            <div className="inline-flex lg:hidden p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white shadow-md mb-2">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create MITS Account</h2>
            <p className="text-xs text-slate-500 font-medium">Enter your details & academic branch (CSE, CSM, ECE, EEE, etc.)</p>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center shadow-2xs">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold text-center shadow-2xs">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Ragupathi S"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Username / Roll No.</label>
                <input
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="21691a0501"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 font-mono focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Phone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="9876543210"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="student1@mits.ac.in"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Account Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-indigo-600"
                >
                  <option value="ROLE_STUDENT">Student</option>
                  <option value="ROLE_FACULTY">Teaching Faculty</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Academic Dept</label>
                <input
                  type="text"
                  required
                  value={form.departmentCode}
                  onChange={(e) => setForm({ ...form, departmentCode: e.target.value })}
                  placeholder="e.g. CSE, ECE, EEE"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 font-bold uppercase focus:bg-white focus:outline-none focus:border-indigo-600 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl text-xs font-black shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01] active:scale-95 disabled:opacity-50 mt-1"
            >
              <span>{loading ? 'Creating Account...' : 'Register Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-1">
            <span className="text-xs text-slate-500 font-medium">Already registered? </span>
            <Link to="/login" className="text-xs text-indigo-600 hover:text-indigo-700 hover:underline font-extrabold">
              Sign In here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
