import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowRight, UserCheck, ShieldAlert, Lock, Mail } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('student@donorlens.demo');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('admin')) {
      login(email, 'admin');
      navigate('/admin/dashboard');
    } else {
      login(email, 'donor');
      navigate('/donor/dashboard');
    }
  };

  const handleDemoDonor = () => {
    login('student@donorlens.demo', 'donor', 'Aarav Sharma');
    navigate('/donor/dashboard');
  };

  const handleDemoAdmin = () => {
    login('admin@donorlens.demo', 'admin', 'Dr. Priya Sundaram');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#050706] text-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <BrandLogo size="lg" showTagline />
          <h2 className="text-xl font-bold mt-4 tracking-tight">Access Account</h2>
          <p className="text-xs text-neutral-400">
            Sign in to view verifiable contributions or manage community campaigns.
          </p>
        </div>

        {/* Demo Fast Track Buttons */}
        <div className="p-4 rounded bg-[#0D110F] border border-[#232D27] space-y-2.5">
          <div className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider text-center">
            One-Click Presentation Demonstration
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoDonor}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-[#00FF87]/15 hover:bg-[#00FF87]/25 text-[#00FF87] border border-[#00FF87]/30 text-xs font-semibold transition-all hover:scale-[1.01]"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Demo Donor</span>
            </button>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-all hover:scale-[1.01]"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="p-6 rounded bg-[#0A0D0B] border border-[#1E2621] space-y-4">
          <div>
            <label className="block text-xs font-mono-code text-neutral-400 mb-1">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111612] border border-[#232D27] rounded px-3 py-2 pl-9 text-xs font-mono-code text-white focus:outline-none focus:border-[#00FF87]"
                placeholder="name@apex.edu"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-code text-neutral-400 mb-1">
              PASSWORD
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111612] border border-[#232D27] rounded px-3 py-2 pl-9 text-xs text-white focus:outline-none focus:border-[#00FF87]"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-neutral-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#232D27] text-[#00FF87] focus:ring-0 bg-[#111612]"
              />
              <span>Remember session</span>
            </label>
            <span className="text-[#00FF87] hover:underline cursor-pointer">Forgot password?</span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Sign In to Donor Lens</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center text-xs text-neutral-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#00FF87] hover:underline font-medium">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
