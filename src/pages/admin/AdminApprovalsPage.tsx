import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  ArrowLeft,
  FileText,
  Lock,
  Cpu,
  Check,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminApprovalsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { campaigns, expenses, approveExpense, rejectExpense, setPreviewReceipt, currentUser } = useApp();

  const campaignId = id || 'camp_001';
  const campaign = campaigns.find((c) => c.id === campaignId) || campaigns[0];

  const campaignExpenses = expenses.filter((e) => e.campaignId === campaign.id);
  const pendingApprovals = campaignExpenses.filter((e) => e.status === 'PENDING_APPROVAL');
  const approvedList = campaignExpenses.filter((e) => e.status === 'APPROVED');

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleApprove = (expenseId: string) => {
    approveExpense(expenseId, currentUser.name);
    setToastMsg('Auditor multi-sig signature appended. Disbursement approved & anchored on-chain!');
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#00FF87', '#A855F7'],
      });
    } catch (e) {
      // ignore
    }
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleReject = (expenseId: string) => {
    rejectExpense(expenseId, 'Disbursement rejected due to non-compliant quotation documentation.');
    setToastMsg('Disbursement rejected and flagged in audit log.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      <Link
        to={`/admin/campaigns/${campaign.id}`}
        className="text-xs font-mono-code text-neutral-400 hover:text-white flex items-center gap-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Campaign Console</span>
      </Link>

      {/* Header (Section 27) */}
      <div className="p-6 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#18211C] gap-3">
          <div>
            <div className="text-xs font-mono-code text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> MULTI-SIG APPROVAL CENTER
            </div>
            <h1 className="text-2xl font-bold text-white mt-0.5">
              Expense Authorization Quorum
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Strict M-of-N multi-signature authorizations required before funds can be released from vault contract.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono-code text-xs flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>Quorum Policy: 3 of 3 Signatures</span>
          </div>
        </div>

        {toastMsg && (
          <div className="p-3 rounded bg-[#00FF87]/20 border border-[#00FF87] text-[#00FF87] text-xs font-mono-code animate-fade-in flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        )}
      </div>

      {/* Pending Approvals List (Section 27) */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono-code uppercase text-neutral-400 tracking-wider">
          Awaiting Authorization ({pendingApprovals.length})
        </h2>

        {pendingApprovals.length === 0 ? (
          <div className="p-8 text-center rounded-lg bg-[#0A0D0B] border border-[#1E2621] text-xs text-neutral-400 font-mono-code">
            ✓ All disbursement vouchers are currently approved or resolved.
          </div>
        ) : (
          pendingApprovals.map((exp) => {
            const approvedCount = exp.approvers.filter((a) => a.status === 'APPROVED').length;
            return (
              <div
                key={exp.id}
                className="p-6 rounded-xl bg-[#0A0D0B] border border-amber-500/30 space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-800 gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono-code">
                      <span className="text-amber-400 font-bold">VOUCHER ID: {exp.id}</span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-neutral-300">{exp.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-0.5">{exp.description}</h3>
                    <div className="text-xs text-neutral-400 font-mono-code mt-0.5">
                      Vendor: <span className="text-white">{exp.vendor}</span> | Date: {exp.date}
                    </div>
                  </div>

                  <div className="text-right font-mono-code">
                    <div className="text-xs text-neutral-400">DISBURSEMENT AMOUNT</div>
                    <div className="text-2xl font-bold text-rose-400">
                      ₹{exp.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Approvers State Breakdown (Section 27: Treasurer - Approved, Project Lead - Approved, Auditor - Pending) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="text-neutral-400">Multi-Sig Progress</span>
                    <span className="text-amber-400 font-bold">
                      {approvedCount} / {exp.requiredApprovals} Approvals Recorded
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {exp.approvers.map((app) => (
                      <div
                        key={app.id}
                        className={`p-3 rounded border text-xs font-mono-code flex items-center justify-between ${
                          app.status === 'APPROVED'
                            ? 'bg-[#0E1511] border-[#00FF87]/30 text-white'
                            : 'bg-[#15120B] border-amber-500/30 text-amber-300'
                        }`}
                      >
                        <div>
                          <div className="font-bold">{app.name}</div>
                          <div className="text-[11px] text-neutral-400">{app.role}</div>
                        </div>
                        <div>
                          {app.status === 'APPROVED' ? (
                            <span className="text-[#00FF87] flex items-center gap-1 font-semibold text-[11px]">
                              ✓ Approved
                            </span>
                          ) : (
                            <span className="text-amber-400 flex items-center gap-1 text-[11px]">
                              <Clock className="w-3.5 h-3.5" /> Pending
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Supporting Receipt & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-neutral-800 text-xs font-mono-code">
                  <button
                    onClick={() => setPreviewReceipt(exp)}
                    className="flex items-center gap-1.5 text-[#00FF87] hover:underline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Inspect Supporting Receipt ({exp.receiptFileName})</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReject(exp.id)}
                      className="px-3 py-1.5 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-medium"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(exp.id)}
                      className="px-4 py-1.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-bold text-xs shadow-[0_0_12px_rgba(0,255,135,0.25)] flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Grant Final Approval & Release Escrow</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Approved Disbursements Archive */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xs font-mono-code uppercase text-neutral-400 tracking-wider">
          Approved & Disbursed Vouchers ({approvedList.length})
        </h2>

        <div className="rounded-lg border border-[#1E2621] bg-[#0A0D0B] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-code">
              <thead className="bg-[#070A08] border-b border-[#1E2621] text-[11px] text-neutral-400 uppercase">
                <tr>
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4">Expense Voucher</th>
                  <th className="py-2.5 px-4">Amount</th>
                  <th className="py-2.5 px-4">Consensus</th>
                  <th className="py-2.5 px-4">IPFS Receipt</th>
                  <th className="py-2.5 px-4 text-right">Blockchain Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18211C]">
                {approvedList.map((exp) => (
                  <tr key={exp.id} className="hover:bg-[#0D120F] transition-colors">
                    <td className="py-2.5 px-4 text-neutral-400">{exp.date}</td>
                    <td className="py-2.5 px-4 text-white font-sans font-medium">{exp.description}</td>
                    <td className="py-2.5 px-4 text-rose-400 font-bold">
                      ₹{exp.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-4 text-[#00FF87] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 3 / 3 Quorum
                    </td>
                    <td className="py-2.5 px-4">
                      <button
                        onClick={() => setPreviewReceipt(exp)}
                        className="text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Pinned CID</span>
                      </button>
                    </td>
                    <td className="py-2.5 px-4 text-right text-neutral-400 font-mono-code">
                      {exp.txHash ? `${exp.txHash.slice(0, 10)}...` : 'On-Chain Confirmed'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
