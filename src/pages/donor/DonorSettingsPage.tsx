import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Bell, Globe, Shield, Check, Save } from 'lucide-react';

export const DonorSettingsPage: React.FC = () => {
  const { theme, toggleTheme, currentUser } = useApp();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [expenseNotifs, setExpenseNotifs] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <div className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider flex items-center gap-1.5">
          <Settings className="w-3.5 h-3.5" /> PREFERENCES
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Donor Settings
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Configure notifications, network node preferences, and appearance.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-6">
        {/* Appearance */}
        <div className="space-y-3 pb-6 border-b border-[#18211C]">
          <h3 className="text-xs font-mono-code uppercase text-neutral-400 tracking-wider">
            Interface Appearance
          </h3>
          <div className="flex items-center justify-between p-3.5 rounded bg-[#111612] border border-[#232D27] text-xs">
            <div>
              <div className="font-semibold text-white">Active Theme Mode</div>
              <div className="text-neutral-400 font-sans mt-0.5">
                Current: {theme === 'dark' ? 'Deep Black + Neon Green' : 'Light Institutional'}
              </div>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white font-mono-code text-xs transition-colors"
            >
              Toggle to {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-3 pb-6 border-b border-[#18211C]">
          <h3 className="text-xs font-mono-code uppercase text-neutral-400 tracking-wider">
            Alert Notifications
          </h3>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3.5 rounded bg-[#111612] border border-[#232D27] text-xs cursor-pointer">
              <div>
                <div className="font-semibold text-white">Official Verification Alerts</div>
                <div className="text-neutral-400 font-sans mt-0.5">
                  Receive notifications when an official auditor attests your contribution.
                </div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded border-[#232D27] text-[#00FF87] focus:ring-0 bg-[#070A08]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded bg-[#111612] border border-[#232D27] text-xs cursor-pointer">
              <div>
                <div className="font-semibold text-white">Itemized Expense Updates</div>
                <div className="text-neutral-400 font-sans mt-0.5">
                  Alerts when supported campaigns disburse funds with new IPFS receipts.
                </div>
              </div>
              <input
                type="checkbox"
                checked={expenseNotifs}
                onChange={(e) => setExpenseNotifs(e.target.checked)}
                className="rounded border-[#232D27] text-[#00FF87] focus:ring-0 bg-[#070A08]"
              />
            </label>
          </div>
        </div>

        {/* Blockchain Node Telemetry */}
        <div className="space-y-3 pb-4">
          <h3 className="text-xs font-mono-code uppercase text-neutral-400 tracking-wider">
            Network & RPC Gateway
          </h3>
          <div className="p-3.5 rounded bg-[#111612] border border-[#232D27] text-xs font-mono-code space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-400">Target RPC Node:</span>
              <span className="text-cyan-400">https://ghostnet.tezos.marigold.dev</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">IPFS Gateway:</span>
              <span className="text-emerald-400">https://ipfs.io/ipfs/</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Indexer Status:</span>
              <span className="text-[#00FF87]">TzKT Synchronized (0 diff)</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          {savedSuccess && (
            <span className="text-xs text-[#00FF87] font-mono-code flex items-center gap-1">
              <Check className="w-4 h-4" /> Preferences Saved
            </span>
          )}
          <button
            type="submit"
            className="px-5 py-2 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs font-mono-code flex items-center gap-1.5 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
