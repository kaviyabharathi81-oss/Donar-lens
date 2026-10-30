import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Database,
  Cpu,
  FileText,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import {
  BlockchainBadge,
  OfficialBadge,
  ReconciliationBadge,
  LayerTag,
} from '../../components/common/StatusBadges';

export const AdminVerificationCenterPage: React.FC = () => {
  const { donations, expenses, campaigns, verifyDonation, approveExpense, setPreviewReceipt, setPreviewTx } = useApp();

  const [activeQueue, setActiveQueue] = useState<'DONATIONS' | 'EXPENSES' | 'RECEIPTS' | 'CONTRACTS'>('DONATIONS');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const pendingDonations = donations.filter((d) => d.officialStatus === 'PENDING_REVIEW');
  const verifiedDonations = donations.filter((d) => d.officialStatus === 'VERIFIED');
  const pendingExpenses = expenses.filter((e) => e.status === 'PENDING_APPROVAL');

  const handleQuickVerifyDonation = (id: string) => {
    verifyDonation(id, 'Verified via centralized auditor queue.');
    setSuccessMsg(`Donation #${id} attested as OFFICIALLY VERIFIED.`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleQuickApproveExpense = (id: string) => {
    approveExpense(id);
    setSuccessMsg(`Expense #${id} approved & anchored on-chain.`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header (Section 30) */}
      <div className="p-6 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#18211C] gap-3">
          <div>
            <div className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4" /> CENTRAL OVERSIGHT ENGINE
            </div>
            <h1 className="text-2xl font-bold text-white mt-0.5">
              Institutional Verification Center
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5 font-sans">
              Universal compliance gateway reviewing blockchain consensus, official attestation, database state, and IPFS receipts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ReconciliationBadge matches={true} diff={0} />
          </div>
        </div>

        {/* Verification Health Strip (Section 30) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono-code">
          <div className="p-3.5 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">Verified Records</div>
            <div className="text-xl font-bold text-[#00FF87] mt-1">{verifiedDonations.length}</div>
            <div className="text-[10px] text-emerald-400">100% Attested</div>
          </div>

          <div className="p-3.5 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-amber-400 uppercase text-[10px]">Pending Review</div>
            <div className="text-xl font-bold text-amber-400 mt-1">{pendingDonations.length}</div>
            <div className="text-[10px] text-neutral-400">Pledges in queue</div>
          </div>

          <div className="p-3.5 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-purple-300 uppercase text-[10px]">Pending Approvals</div>
            <div className="text-xl font-bold text-purple-300 mt-1">{pendingExpenses.length}</div>
            <div className="text-[10px] text-neutral-400">Multi-Sig Quorum</div>
          </div>

          <div className="p-3.5 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">IPFS Pinning Health</div>
            <div className="text-xl font-bold text-cyan-400 mt-1">100%</div>
            <div className="text-[10px] text-neutral-400">0 Missing Receipts</div>
          </div>
        </div>

        {successMsg && (
          <div className="p-3 rounded bg-[#00FF87]/20 border border-[#00FF87] text-[#00FF87] text-xs font-mono-code animate-fade-in flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* Queue Tabs (Section 30) */}
      <div className="p-3 rounded-lg bg-[#0A0D0B] border border-[#1E2621] flex flex-wrap gap-2 text-xs font-mono-code">
        <button
          onClick={() => setActiveQueue('DONATIONS')}
          className={`px-3.5 py-1.5 rounded transition-colors ${
            activeQueue === 'DONATIONS'
              ? 'bg-[#00FF87] text-black font-bold'
              : 'bg-[#111612] text-neutral-400 hover:text-white border border-[#232D27]'
          }`}
        >
          Donations Queue ({pendingDonations.length})
        </button>

        <button
          onClick={() => setActiveQueue('EXPENSES')}
          className={`px-3.5 py-1.5 rounded transition-colors ${
            activeQueue === 'EXPENSES'
              ? 'bg-purple-500 text-white font-bold'
              : 'bg-[#111612] text-neutral-400 hover:text-white border border-[#232D27]'
          }`}
        >
          Expense Approvals ({pendingExpenses.length})
        </button>

        <button
          onClick={() => setActiveQueue('RECEIPTS')}
          className={`px-3.5 py-1.5 rounded transition-colors ${
            activeQueue === 'RECEIPTS'
              ? 'bg-cyan-500 text-black font-bold'
              : 'bg-[#111612] text-neutral-400 hover:text-white border border-[#232D27]'
          }`}
        >
          IPFS Evidence Node ({expenses.length})
        </button>

        <button
          onClick={() => setActiveQueue('CONTRACTS')}
          className={`px-3.5 py-1.5 rounded transition-colors ${
            activeQueue === 'CONTRACTS'
              ? 'bg-emerald-500 text-black font-bold'
              : 'bg-[#111612] text-neutral-400 hover:text-white border border-[#232D27]'
          }`}
        >
          Campaign Contracts ({campaigns.length})
        </button>
      </div>

      {/* QUEUE 1: DONATIONS */}
      {activeQueue === 'DONATIONS' && (
        <div className="rounded-lg border border-[#1E2621] bg-[#0A0D0B] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-code">
              <thead className="bg-[#070A08] border-b border-[#1E2621] text-[11px] text-neutral-400 uppercase">
                <tr>
                  <th className="py-3 px-4">Contributor</th>
                  <th className="py-3 px-4">Campaign</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Blockchain Status</th>
                  <th className="py-3 px-4">Official Verification</th>
                  <th className="py-3 px-4 text-right">Attestation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18211C]">
                {donations.map((don) => (
                  <tr key={don.id} className="hover:bg-[#0D120F] transition-colors">
                    <td className="py-3 px-4 font-sans font-medium text-white">{don.donorName}</td>
                    <td className="py-3 px-4 text-neutral-300 font-sans max-w-[200px] truncate">
                      {don.campaignTitle}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#00FF87]">
                      ₹{don.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <BlockchainBadge status={don.blockchainStatus} size="sm" />
                    </td>
                    <td className="py-3 px-4">
                      <OfficialBadge status={don.officialStatus} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right">
                      {don.officialStatus === 'PENDING_REVIEW' ? (
                        <button
                          onClick={() => handleQuickVerifyDonation(don.id)}
                          className="px-3 py-1 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-bold text-xs"
                        >
                          Verify Pledge
                        </button>
                      ) : (
                        <span className="text-emerald-400 text-[11px]">✓ Verified</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QUEUE 2: EXPENSES */}
      {activeQueue === 'EXPENSES' && (
        <div className="rounded-lg border border-[#1E2621] bg-[#0A0D0B] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-code">
              <thead className="bg-[#070A08] border-b border-[#1E2621] text-[11px] text-neutral-400 uppercase">
                <tr>
                  <th className="py-3 px-4">Voucher</th>
                  <th className="py-3 px-4">Campaign</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Receipt Proof</th>
                  <th className="py-3 px-4">Signatures</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18211C]">
                {expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-[#0D120F] transition-colors">
                    <td className="py-3 px-4 font-sans font-medium text-white">{exp.description}</td>
                    <td className="py-3 px-4 font-sans text-neutral-300 max-w-[180px] truncate">
                      {exp.campaignTitle}
                    </td>
                    <td className="py-3 px-4 font-bold text-rose-400">
                      ₹{exp.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setPreviewReceipt(exp)}
                        className="text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Inspect IPFS</span>
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <span className={exp.status === 'APPROVED' ? 'text-[#00FF87]' : 'text-amber-400'}>
                        {exp.approvers.filter((a) => a.status === 'APPROVED').length} / {exp.requiredApprovals}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {exp.status === 'PENDING_APPROVAL' ? (
                        <button
                          onClick={() => handleQuickApproveExpense(exp.id)}
                          className="px-3 py-1 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-bold text-xs"
                        >
                          Approve Sign-off
                        </button>
                      ) : (
                        <span className="text-[#00FF87] text-[11px]">✓ Disbursed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QUEUE 3: RECEIPTS */}
      {activeQueue === 'RECEIPTS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expenses.map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-3 font-mono-code text-xs"
            >
              <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                <span className="text-white font-bold">{exp.receiptFileName}</span>
                <LayerTag layer="IPFS" />
              </div>
              <div className="text-neutral-400 font-sans">{exp.description} ({exp.vendor})</div>
              <div className="p-2 rounded bg-black/50 border border-neutral-800 text-[11px] text-emerald-400 break-all select-all">
                ipfs://{exp.receiptCID}
              </div>
              <div className="flex justify-between items-center pt-1 text-[11px]">
                <span className="text-neutral-500">Amount: ₹{exp.amount.toLocaleString('en-IN')}</span>
                <button
                  onClick={() => setPreviewReceipt(exp)}
                  className="text-[#00FF87] hover:underline flex items-center gap-1"
                >
                  <span>Open Full Voucher</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QUEUE 4: CONTRACTS */}
      {activeQueue === 'CONTRACTS' && (
        <div className="space-y-3 font-mono-code text-xs">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-4 rounded-lg bg-[#0A0D0B] border border-[#1E2621] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold font-sans text-sm">{camp.title}</span>
                  <LayerTag layer="ON-CHAIN" />
                </div>
                <div className="text-neutral-400 mt-1">Contract: {camp.contractAddress}</div>
              </div>
              <div className="text-right sm:text-right shrink-0">
                <div className="text-[#00FF87] font-bold">100% Reconciled</div>
                <div className="text-neutral-500 text-[11px]">
                  Vault Escrow: ₹{camp.remaining.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
