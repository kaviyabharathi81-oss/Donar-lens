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
  Sun,
  Moon,
  Sparkles,
  Palette,
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { currentUser, theme, setThemeMode, activeAdminSigner, setActiveAdminSigner, adminCommittee } = useApp();

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
          Manage administrative signer quorums, spending caps, interface themes, and cryptographic parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-6 font-mono-code text-xs">
        {/* Dashboard Theme & Appearance Section */}
        <div className="space-y-3 pb-5 border-b border-[#18211C]">
          <div className="flex items-center justify-between">
            <h3 className="uppercase text-neutral-400 tracking-wider flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-purple-400" /> Dashboard Interface Theme
            </h3>
            <span className="text-purple-300">Active: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <p className="text-[11px] text-neutral-400">
            Select the visual presentation theme for the institutional administration console.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => setThemeMode('dark')}
              className={`p-3.5 rounded-lg border text-left transition-all flex items-start gap-3 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#121915] border-[#00FF87] ring-1 ring-[#00FF87]'
                  : 'bg-[#111612] border-[#232D27] opacity-70 hover:opacity-100'
              }`}
            >
              <div className="w-8 h-8 rounded bg-black/60 border border-neutral-700 flex items-center justify-center shrink-0">
                <Moon className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  Dark Institutional Mode
                  {theme === 'dark' && <span className="text-[#00FF87] text-[10px]">✓ Selected</span>}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  Deep obsidian palette with neon cryptographic accents and high cybernetic contrast.
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setThemeMode('light')}
              className={`p-3.5 rounded-lg border text-left transition-all flex items-start gap-3 cursor-pointer ${
                theme === 'light'
                  ? 'bg-slate-100 border-[#00FF87] ring-1 ring-[#00FF87]'
                  : 'bg-[#111612] border-[#232D27] opacity-70 hover:opacity-100'
              }`}
            >
              <div className="w-8 h-8 rounded bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                <Sun className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  Clean Light Corporate Mode
                  {theme === 'light' && <span className="text-emerald-600 font-bold text-[10px]">✓ Selected</span>}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  High-readability soft slate surfaces designed for daylight auditing and review.
                </div>
              </div>
            </button>
          </div>
        </div>

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
              Authorized Multi-Sig Signer Committee (3 Members)
            </h3>
            <span className="text-[#00FF87]">{quorumThreshold} of 3 Signatures Required</span>
          </div>
          <p className="text-[11px] text-neutral-400">
            Each admin must approve their respective signature for each transaction. Select an officer to switch your active signing persona in the console:
          </p>

          <div className="space-y-2">
            {adminCommittee.map((signer) => {
              const isSelected = activeAdminSigner.id === signer.id;
              return (
                <div
                  key={signer.id}
                  onClick={() => setActiveAdminSigner(signer)}
                  className={`p-3 rounded border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#121915] border-[#00FF87]/50 shadow-[0_0_10px_rgba(0,255,135,0.1)]'
                      : 'bg-[#111612] border-[#232D27] hover:border-neutral-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-white font-sans flex items-center gap-2">
                      <span>{signer.name}</span>
                      {isSelected && (
                        <span className="px-2 py-0.2 rounded text-[10px] bg-[#00FF87]/20 text-[#00FF87] font-mono-code font-bold">
                          Active Persona
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono-code mt-0.5">
                      Role: {signer.department || signer.role} | Wallet: {signer.walletAddress.slice(0, 10)}...{signer.walletAddress.slice(-4)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveAdminSigner(signer);
                    }}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono-code transition-colors ${
                      isSelected
                        ? 'bg-[#00FF87] text-black font-bold'
                        : 'bg-neutral-800 text-neutral-300 hover:text-white'
                    }`}
                  >
                    {isSelected ? 'Active Signer' : 'Switch Signer'}
                  </button>
                </div>
              );
            })}
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
