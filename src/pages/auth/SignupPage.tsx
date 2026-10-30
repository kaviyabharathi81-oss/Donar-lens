import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { useApp } from '../../context/AppContext';
import { UserCheck, ShieldAlert, ArrowRight, ShieldCheck, Check, Sparkles, Building2, User } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('Aarav Sharma');
  const [email, setEmail] = useState('student@donorlens.demo');
  const [password, setPassword] = useState('secret1234');
  const [selectedRole, setSelectedRole] = useState<'donor' | 'admin'>('donor');

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCompleteSignup = () => {
    login(email, selectedRole, fullName);
    navigate(`/onboarding?role=${selectedRole}`);
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
      <div className="w-full max-w-xl space-y-6">
        <div className="text-center space-y-2">
          <BrandLogo size="lg" showTagline />
          <h2 className="text-xl font-bold mt-4 tracking-tight">Create your Donor Lens account</h2>
          <p className="text-xs text-neutral-400">
            Join the cryptographic community verification network.
          </p>
        </div>

        {/* Demo One-Click Presentation Buttons */}
        <div className="p-3.5 rounded bg-[#0D110F] border border-[#232D27] flex items-center justify-between gap-3">
          <div className="text-xs text-neutral-400">
            <span className="font-mono-code text-[#00FF87] font-semibold">Fast Presentation:</span> Skip signup steps:
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDemoDonor}
              className="px-2.5 py-1.5 rounded bg-[#00FF87]/15 hover:bg-[#00FF87]/25 text-[#00FF87] border border-[#00FF87]/30 text-xs font-medium"
            >
              Continue with Demo Donor
            </button>
            <button
              onClick={handleDemoAdmin}
              className="px-2.5 py-1.5 rounded bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-medium"
            >
              Continue with Demo Admin
            </button>
          </div>
        </div>

        {step === 1 ? (
          <form onSubmit={handleNextStep} className="p-6 rounded bg-[#0A0D0B] border border-[#1E2621] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs font-mono-code">
              <span className="text-[#00FF87]">STEP 1 OF 2</span>
              <span className="text-neutral-400">Account Credentials</span>
            </div>

            <div>
              <label className="block text-xs font-mono-code text-neutral-400 mb-1">FULL NAME</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#111612] border border-[#232D27] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00FF87]"
                placeholder="e.g. Aarav Sharma"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono-code text-neutral-400 mb-1">EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111612] border border-[#232D27] rounded px-3 py-2 text-xs font-mono-code text-white focus:outline-none focus:border-[#00FF87]"
                placeholder="student@apex.edu"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono-code text-neutral-400 mb-1">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111612] border border-[#232D27] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00FF87]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Next: Select Your Platform Role</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="p-6 rounded bg-[#0A0D0B] border border-[#1E2621] space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs font-mono-code">
              <span className="text-[#00FF87]">STEP 2 OF 2</span>
              <span className="text-neutral-400">Account Role Selection</span>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white">How will you use Donor Lens?</h3>
              <p className="text-xs text-neutral-400">
                Choose the interface tailored to your participation in community campaigns.
              </p>
            </div>

            {/* Two Large Role Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Role Card 1: Student / Donor */}
              <div
                onClick={() => setSelectedRole('donor')}
                className={`relative p-5 rounded-lg border cursor-pointer transition-all ${
                  selectedRole === 'donor'
                    ? 'border-[#00FF87] bg-[#00FF87]/10 shadow-[0_0_20px_rgba(0,255,135,0.15)] ring-1 ring-[#00FF87]'
                    : 'border-[#232D27] bg-[#111612] hover:border-neutral-600'
                }`}
              >
                {selectedRole === 'donor' && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#00FF87] flex items-center justify-center text-black">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
                <div className="w-10 h-10 rounded-lg bg-[#00FF87]/20 border border-[#00FF87]/40 flex items-center justify-center text-[#00FF87] mb-3">
                  <User className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">STUDENT / DONOR</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Discover community campaigns, contribute, track your donations, and verify where funds are used.
                </p>
                <div className="mt-4 pt-3 border-t border-neutral-800/80 text-[11px] font-mono-code text-[#00FF87]">
                  → Enters Donor Portal
                </div>
              </div>

              {/* Role Card 2: Admin / Official */}
              <div
                onClick={() => setSelectedRole('admin')}
                className={`relative p-5 rounded-lg border cursor-pointer transition-all ${
                  selectedRole === 'admin'
                    ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-1 ring-purple-500'
                    : 'border-[#232D27] bg-[#111612] hover:border-neutral-600'
                }`}
              >
                {selectedRole === 'admin' && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">ADMIN / OFFICIAL</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Manage campaigns, verify donations, approve expenses, and maintain financial accountability.
                </p>
                <div className="mt-4 pt-3 border-t border-neutral-800/80 text-[11px] font-mono-code text-purple-400">
                  → Enters Admin Portal
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleCompleteSignup}
                className="flex-1 py-2.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Continue to {selectedRole === 'donor' ? 'Donor Onboarding' : 'Admin Onboarding'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <div className="text-center text-xs text-neutral-500">
          Already have an account?{' '}
          <Link to="/login" className="text-[#00FF87] hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
