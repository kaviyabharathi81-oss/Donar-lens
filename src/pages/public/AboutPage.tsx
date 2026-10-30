import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Database, FileText, CheckCircle2, ArrowRight, Lock, Layers } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider">
          THE DONOR LENS CONSTITUTION
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Transparent giving. Verifiable spending.
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
          Donor Lens is a financial accountability platform designed to bridge the trust deficit in community giving, educational funds, and student welfare initiatives through cryptographic verification.
        </p>
      </div>

      {/* The Core Problem & Solution */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-4">
        <h2 className="text-xl font-bold text-white">Why Traditional Dashboards Fall Short</h2>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
          Most donation platforms present static progress bars and unverified balance meters. Traditional web databases are mutable: anyone with database administrator privileges can overwrite donation amounts, inflate campaign totals, or erase disbursements.
        </p>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
          Donor Lens enforces an <strong>append-only architecture</strong>. Records are never overwritten. Every contribution is committed to an immutable smart contract on the Tezos blockchain, and disbursements require multi-signature approvals with cryptographically pinned receipts on IPFS.
        </p>
      </div>

      {/* The Dual-State Verification Concept */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">The Dual-State Verification Model</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-lg bg-[#0F1411] border border-[#1E2621] space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF87]" />
              <h3 className="font-bold text-white font-mono-code text-sm">BLOCKCHAIN CONFIRMED</h3>
            </div>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              Guarantees the transaction exists cryptographically in the smart contract escrow. The timestamp, sender, and amount cannot be modified by any server admin.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#0F1411] border border-purple-500/30 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <h3 className="font-bold text-purple-300 font-mono-code text-sm">OFFICIALLY VERIFIED</h3>
            </div>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              An authorized human official (university comptroller, disaster ombudsperson, or NGO trustee) has validated the pledge against nodal bank settlements and confirmed KYC credentials.
            </p>
          </div>
        </div>
      </div>

      {/* Data Layer Transparency */}
      <div className="p-6 rounded-xl bg-[#0A0D0B] border border-[#1E2621] space-y-4 font-mono-code text-xs">
        <h3 className="text-base font-bold text-white font-sans">Data Layer Integrity Mapping</h3>
        <div className="space-y-2.5">
          <div className="p-3 rounded bg-[#111612] border border-[#232D27] flex items-center justify-between">
            <span className="text-[#00FF87] font-bold">ON-CHAIN (TEZOS)</span>
            <span className="text-neutral-300 font-sans">Authoritative escrow balances, governance multi-sig threshold, transaction hashes</span>
          </div>
          <div className="p-3 rounded bg-[#111612] border border-[#232D27] flex items-center justify-between">
            <span className="text-cyan-400 font-bold">IPFS GATEWAY</span>
            <span className="text-neutral-300 font-sans">Content-addressed itemized invoices, receipt PDFs, vendor delivery vouchers</span>
          </div>
          <div className="p-3 rounded bg-[#111612] border border-[#232D27] flex items-center justify-between">
            <span className="text-purple-400 font-bold">OFFICIAL OVERSIGHT</span>
            <span className="text-neutral-300 font-sans">Human verification signatures, audit attestations, correction logs</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Link
          to="/explore"
          className="px-6 py-3 rounded bg-[#00FF87] text-black font-semibold text-xs transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,135,0.25)]"
        >
          <span>Explore Verified Campaigns</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
