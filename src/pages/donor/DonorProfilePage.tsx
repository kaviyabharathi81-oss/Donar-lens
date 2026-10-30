import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Wallet, ShieldCheck, Mail, Building, Calendar, CheckCircle2, Lock } from 'lucide-react';

export const DonorProfilePage: React.FC = () => {
  const { currentUser, donations } = useApp();
  const [anonymousDefault, setAnonymousDefault] = useState(currentUser.anonymousDefault || false);

  const myDonations = donations.filter(
    (d) => d.walletAddress === currentUser.walletAddress || d.donorEmail === currentUser.email
  );
  const totalDonated = myDonations.reduce((acc, d) => acc + d.amount, 0);
  const verifiedDonations = myDonations.filter((d) => d.officialStatus === 'VERIFIED').length;
  const campaignsCount = new Set(myDonations.map((d) => d.campaignId)).size;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <div className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" /> CONTRIBUTOR PROFILE
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Donor Identity & Reputation
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Cryptographic keys and transparent participation credentials.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-6">
        {/* User Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#18211C] gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#00FF87]/20 border border-[#00FF87]/40 flex items-center justify-center text-[#00FF87] font-bold text-xl">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{currentUser.name}</h2>
              <p className="text-xs text-neutral-400 font-mono-code">{currentUser.email}</p>
              <div className="mt-1 flex items-center gap-2 text-[11px] text-neutral-500">
                <Building className="w-3.5 h-3.5" />
                <span>{currentUser.organization}</span>
              </div>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded bg-[#111612] border border-[#232D27] text-xs font-mono-code text-[#00FF87] flex items-center gap-1.5 w-fit">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Student Contributor</span>
          </div>
        </div>

        {/* Cryptographic Wallet Binding */}
        <div className="p-4 rounded-lg bg-[#0F1411] border border-[#1E2621] space-y-2 font-mono-code text-xs">
          <div className="flex justify-between text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-[#00FF87]" />
              PRIMARY CRYPTOGRAPHIC WALLET
            </span>
            <span className="text-[#00FF87]">Tezos Ghostnet</span>
          </div>
          <div className="p-2.5 rounded bg-black/60 border border-neutral-800 text-neutral-200 break-all select-all">
            {currentUser.walletAddress}
          </div>
        </div>

        {/* Lifetime Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono-code">
          <div className="p-4 rounded-lg bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">Total Donated</div>
            <div className="text-xl font-bold text-white mt-1">
              ₹{totalDonated.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-400 mt-0.5">Lifetime Total</div>
          </div>

          <div className="p-4 rounded-lg bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">Campaigns Supported</div>
            <div className="text-xl font-bold text-white mt-1">{campaignsCount}</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">Community Initiatives</div>
          </div>

          <div className="p-4 rounded-lg bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">Verified Donations</div>
            <div className="text-xl font-bold text-[#00FF87] mt-1">{verifiedDonations}</div>
            <div className="text-[11px] text-[#00FF87] mt-0.5">100% Attested</div>
          </div>
        </div>

        {/* Privacy Options (Section 19) */}
        <div className="pt-4 border-t border-[#18211C] space-y-3">
          <h3 className="text-xs font-mono-code uppercase text-neutral-400 tracking-wider">
            Ledger Privacy Preferences
          </h3>

          <div className="p-4 rounded bg-[#111612] border border-[#232D27] space-y-2">
            <label className="flex items-center justify-between text-xs cursor-pointer">
              <span className="font-medium text-white">Default to Anonymous Donation</span>
              <input
                type="checkbox"
                checked={anonymousDefault}
                onChange={(e) => setAnonymousDefault(e.target.checked)}
                className="rounded border-[#232D27] text-[#00FF87] focus:ring-0 bg-[#070A08]"
              />
            </label>
            <p className="text-[11px] text-neutral-400 font-sans">
              When checked, your name will be masked as "Anonymous Donor" on public campaign contributor lists while preserving your cryptographic audit trail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
