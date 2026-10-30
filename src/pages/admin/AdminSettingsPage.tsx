import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  ShieldCheck,
  Cpu,
  Lock,
  Check,
  Save,
  Users,
  Building,
  Key,
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { currentUser } = useApp();

  const [councilName, setCouncilName] = useState('Apex Institutional Trust & Oversight Council');
  const [quorumThreshold, setQuorumThreshold] = useState('3');
  const [spendingLimit, setSpendingLimit] = useState(50000);
  const [tezosRpc, setTezosRpc] = useState('https://ghostnet.tezos.marigold.dev');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <div className="text-xs font-mono-code text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
          <Settings className="w-3.5 h-3.5" /> INSTITUTIONAL CONFIGURATION
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Governance & Multi-Sig Settings
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Manage administrative signer quorums, spending caps, and cryptographic parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-6 font-mono-code text-xs">
        {/* Organization Name */}
        <div className="space-y-3 pb-5 border-b border-[#18211C]">
          <h3 className="uppercase text-neutral-400 tracking-wider">
            Oversight Body Information
          </h3>
          <div>
            <label className="block text-neutral-400 mb-1">COUNCIL ENTITY NAME</label>
            <input
              type="text"
              value={councilName}
              onChange={(e) => setCouncilName(e.target.value)}
              className="w-full bg-[#111612] border border-[#232D27] rounded p-2 text-white focus:outline-none focus:border-[#00FF87]"
            />
          </div>
        </div>

        {/* Multi-Sig Signer Committee */}
        <div className="space-y-3 pb-5 border-b border-[#18211C]">
          <div className="flex items-center justify-between">
            <h3 className="uppercase text-neutral-400 tracking-wider">
              Authorized Multi-Sig Signer Committee
            </h3>
            <span className="text-[#00FF87]">{quorumThreshold} of 3 Signatures Required</span>
          </div>

          <div className="space-y-2">
            {[
              { role: 'Treasurer', name: 'Vikram Joshi', wallet: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb', active: true },
              { role: 'Project Lead', name: 'Dr. Neha Rao', wallet: 'tz1L7Kq89mN2XpW4yV0z8J3cR1b9T5aD4e7F', active: true },
              { role: 'Chief Auditor (You)', name: currentUser.name, wallet: currentUser.walletAddress, active: true },
            ].map((signer) => (
              <div
                key={signer.role}
                className="p-3 rounded bg-[#111612] border border-[#232D27] flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-white font-sans">{signer.name}</div>
                  <div className="text-[11px] text-neutral-400 font-mono-code">
                    Role: {signer.role} | Wallet: {signer.wallet.slice(0, 10)}...{signer.wallet.slice(-4)}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/30 text-[10px]">
                  ACTIVE KEY
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Governance Limits */}
        <div className="space-y-3 pb-5 border-b border-[#18211C]">
          <h3 className="uppercase text-neutral-400 tracking-wider">
            Spending Quotas & Protocol Limits
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-400 mb-1">PER-TRANSACTION CAP (INR)</label>
              <input
                type="number"
                value={spendingLimit}
                onChange={(e) => setSpendingLimit(Number(e.target.value))}
                className="w-full bg-[#111612] border border-[#232D27] rounded p-2 text-white focus:outline-none focus:border-[#00FF87]"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">AUDIT ESCROW DELAY</label>
              <input
                type="text"
                disabled
                value="24 Hours (Nodal Clearing Window)"
                className="w-full bg-[#111612] border border-[#232D27] rounded p-2 text-neutral-400"
              />
            </div>
          </div>
        </div>

        {/* Blockchain Connection */}
        <div className="space-y-3 pb-2">
          <h3 className="uppercase text-neutral-400 tracking-wider">
            Blockchain Node Configuration
          </h3>

          <div>
            <label className="block text-neutral-400 mb-1">TEZOS GHOSTNET RPC ENDPOINT</label>
            <input
              type="text"
              value={tezosRpc}
              onChange={(e) => setTezosRpc(e.target.value)}
              className="w-full bg-[#111612] border border-[#232D27] rounded p-2 text-white focus:outline-none focus:border-[#00FF87]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          {saved && (
            <span className="text-xs text-[#00FF87] flex items-center gap-1 font-mono-code">
              <Check className="w-4 h-4" /> Parameters Committed to Ledger
            </span>
          )}
          <button
            type="submit"
            className="px-5 py-2.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-bold text-xs transition-colors flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,255,135,0.2)]"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Commit Governance Rules</span>
          </button>
        </div>
      </form>
    </div>
  );
};
