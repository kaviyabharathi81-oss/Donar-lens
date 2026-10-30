import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowRight, Wallet, CheckCircle2, Lock, FileCheck } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') === 'admin' ? 'admin' : 'donor';
  const { currentUser, switchRole } = useApp();
  const navigate = useNavigate();

  const [institution, setInstitution] = useState(
    role === 'admin'
      ? 'Apex Institutional Trust & Oversight Council'
      : 'Apex Institute of Technology'
  );
  const [department, setDepartment] = useState(
    role === 'admin' ? 'Financial Auditing & Verification Cell' : 'Computer Science & Engineering'
  );
  const [anonymousPref, setAnonymousPref] = useState(false);
  const [quorumThreshold, setQuorumThreshold] = useState('3');

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole(role);
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/donor/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#050706] text-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <BrandLogo size="md" />
          <h2 className="text-xl font-bold mt-2">
            {role === 'donor' ? 'Student Contributor Onboarding' : 'Authorized Official Onboarding'}
          </h2>
          <p className="text-xs text-neutral-400">
            {role === 'donor'
              ? 'Configure your student profile and simulated cryptographic wallet.'
              : 'Configure your institutional audit credentials and multi-sig authorization.'}
          </p>
        </div>

        <form onSubmit={handleFinish} className="p-6 rounded bg-[#0A0D0B] border border-[#1E2621] space-y-5">
          {/* Simulated Wallet Binding */}
          <div className="p-3.5 rounded bg-[#111612] border border-[#232D27] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-code">
              <span className="text-neutral-400">Cryptographic Identity</span>
              <span className="text-[#00FF87] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Generated Tezos Keypair
              </span>
            </div>
            <div className="font-mono-code text-xs text-neutral-300 break-all bg-black/40 p-2 rounded border border-neutral-800">
              {currentUser.walletAddress}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-code text-neutral-400 mb-1">
              INSTITUTION / UNIVERSITY
            </label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full bg-[#111612] border border-[#232D27] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00FF87]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono-code text-neutral-400 mb-1">
              {role === 'donor' ? 'ACADEMIC DEPARTMENT / BATCH' : 'OVERSIGHT CELL / COMMITTEE'}
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-[#111612] border border-[#232D27] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00FF87]"
              required
            />
          </div>

          {role === 'donor' ? (
            <div className="p-3 rounded bg-[#111612] border border-[#232D27] space-y-2">
              <label className="flex items-center gap-2.5 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={anonymousPref}
                  onChange={(e) => setAnonymousPref(e.target.checked)}
                  className="rounded border-[#232D27] text-[#00FF87] focus:ring-0 bg-[#070A08]"
                />
                <span className="font-medium">Enable default privacy (Anonymous donor on public ledgers)</span>
              </label>
              <p className="text-[11px] text-neutral-500 pl-6">
                Your name will be withheld from public views while maintaining full cryptographic proof of contribution.
              </p>
            </div>
          ) : (
            <div className="p-3 rounded bg-[#111612] border border-[#232D27] space-y-2 text-xs">
              <label className="block font-mono-code text-neutral-400">
                REQUIRED SIGNATURE QUORUM FOR EXPENSE DISBURSEMENTS
              </label>
              <select
                value={quorumThreshold}
                onChange={(e) => setQuorumThreshold(e.target.value)}
                className="w-full bg-[#070A08] border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="2">2 of 3 Authorized Signatures (Standard Speed)</option>
                <option value="3">3 of 3 Unanimous Multi-Sig (High Security Audit)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Complete Setup & Enter {role === 'admin' ? 'Admin Console' : 'Donor Portal'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
