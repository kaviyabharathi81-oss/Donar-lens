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
  Key,
  UserCheck,
  Users,
  Shield,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminApprovalsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    campaigns,
    expenses,
    approveAdminSignature,
    rejectExpense,
    setPreviewReceipt,
    activeAdminSigner,
    setActiveAdminSigner,
    adminCommittee,
  } = useApp();

  const campaignId = id || 'camp_001';
  const campaign = campaigns.find((c) => c.id === campaignId) || campaigns[0];

  const campaignExpenses = expenses.filter((e) => e.campaignId === campaign.id);
  const pendingApprovals = campaignExpenses.filter((e) => e.status === 'PENDING_APPROVAL');
  const approvedList = campaignExpenses.filter((e) => e.status === 'APPROVED');

  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [rejectingExpenseId, setRejectingExpenseId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState<string>('Non-compliant quotation documentation or price irregularity.');

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 4500);
  };

  const handleSignAsAdmin = (expenseId: string, approverName: string) => {
    const signerProfile = adminCommittee.find(
      (m) => m.name.toLowerCase() === approverName.toLowerCase() || m.department?.includes(approverName)
    ) || activeAdminSigner;

    const result = approveAdminSignature(expenseId, approverName, signerProfile);

    if (result.success) {
      if (result.isQuorumReached) {
        showToast(result.message, 'success');
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.5 },
            colors: ['#00FF87', '#A855F7', '#38BDF8'],
          });
        } catch {
          // ignore
        }
      } else {
        showToast(result.message, 'info');
      }
    } else {
      showToast(result.message, 'error');
    }
  };

  const handleConfirmReject = () => {
    if (!rejectingExpenseId) return;
    rejectExpense(rejectingExpenseId, rejectReason);
    showToast(`Disbursement voucher #${rejectingExpenseId} rejected and flagged in audit log.`, 'error');
    setRejectingExpenseId(null);
  };

  return (
    <div className="space-y-6">
      <Link
        to={`/admin/campaigns/${campaign.id}`}
        className="text-xs font-mono-code text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Campaign Console</span>
      </Link>

      {/* Header with Institutional Quorum Rules */}
      <div className="p-6 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#18211C] gap-3">
          <div>
            <div className="text-xs font-mono-code text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> MULTI-SIG APPROVAL CENTER
            </div>
            <h1 className="text-2xl font-bold text-white mt-0.5">
              Expense Authorization Quorum
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Strict M-of-N multi-signature authorizations required. Each admin official must independently verify and approve their signature for each transaction before vault escrow is released.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono-code text-xs flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Consensus: 3 of 3 Required</span>
            </div>
          </div>
        </div>

        {/* Multi-Sig Signer Committee Selector & Persona Switcher */}
        <div className="p-3.5 rounded-lg bg-[#0D120F] border border-[#1E2621] space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-code">
            <div className="flex items-center gap-2 text-neutral-300">
              <Key className="w-4 h-4 text-[#00FF87]" />
              <span className="font-bold text-white uppercase text-[11px]">Authorized Committee Signers</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400 text-[11px]">Active Persona:</span>
              <span className="text-[#00FF87] font-semibold">{activeAdminSigner.name}</span>
            </div>
            <div className="text-[11px] text-neutral-400">
              Key: <span className="text-white font-mono">{activeAdminSigner.walletAddress.slice(0, 10)}...{activeAdminSigner.walletAddress.slice(-4)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono-code">
            {adminCommittee.map((member) => {
              const isActive = activeAdminSigner.id === member.id;
              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => setActiveAdminSigner(member)}
                  className={`p-2.5 rounded-md border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#121915] border-[#00FF87] text-white ring-1 ring-[#00FF87]/50 shadow-[0_0_10px_rgba(0,255,135,0.15)]'
                      : 'bg-[#090D0B] border-[#1E2621] text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                  }`}
                >
                  <div className="truncate">
                    <div className="font-bold text-white truncate text-xs flex items-center gap-1.5">
                      <span>{member.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse" />}
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate mt-0.5">
                      {member.department?.split('&')[0] || member.role}
                    </div>
                  </div>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      isActive ? 'bg-[#00FF87] text-black' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {isActive ? 'Active' : 'Select'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {toastMsg && (
          <div
            className={`p-3 rounded-lg border text-xs font-mono-code animate-fade-in flex items-center gap-2 ${
              toastMsg.type === 'success'
                ? 'bg-[#00FF87]/20 border-[#00FF87] text-[#00FF87]'
                : toastMsg.type === 'error'
                ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                : 'bg-blue-500/20 border-blue-500 text-blue-300'
            }`}
          >
            {toastMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : toastMsg.type === 'error' ? (
              <XCircle className="w-4 h-4 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 shrink-0" />
            )}
            <span>{toastMsg.text}</span>
          </div>
        )}
      </div>

      {/* Pending Approvals List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono-code uppercase text-neutral-400 tracking-wider">
            Awaiting Committee Authorization ({pendingApprovals.length})
          </h2>
          <span className="text-[11px] font-mono-code text-neutral-500">
            Each admin must approve their respective slot
          </span>
        </div>

        {pendingApprovals.length === 0 ? (
          <div className="p-8 text-center rounded-lg bg-[#0A0D0B] border border-[#1E2621] text-xs text-neutral-400 font-mono-code space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#00FF87] mx-auto opacity-80" />
            <div className="text-white font-semibold">All Disbursement Vouchers Are Fully Authorized</div>
            <div className="text-[11px] text-neutral-500">
              All multi-sig quorums have been verified and anchored to the Tezos Ghostnet blockchain.
            </div>
          </div>
        ) : (
          pendingApprovals.map((exp) => {
            const approvedApprovers = exp.approvers.filter((a) => a.status === 'APPROVED');
            const pendingApproversList = exp.approvers.filter((a) => a.status === 'PENDING');
            const approvedCount = approvedApprovers.length;
            const progressPercent = Math.round((approvedCount / exp.requiredApprovals) * 100);

            return (
              <div
                key={exp.id}
                className="p-6 rounded-xl bg-[#0A0D0B] border border-amber-500/30 space-y-5 transition-all shadow-sm"
              >
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-800 gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono-code">
                      <span className="text-amber-400 font-bold">VOUCHER ID: {exp.id}</span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-neutral-300">{exp.category}</span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-neutral-400">Submitted: {exp.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1">{exp.description}</h3>
                    <div className="text-xs text-neutral-400 font-mono-code mt-0.5">
                      Vendor: <span className="text-white font-semibold">{exp.vendor}</span> | Submitted By: <span className="text-neutral-300">{exp.submittedBy}</span>
                    </div>
                  </div>

                  <div className="text-right font-mono-code">
                    <div className="text-xs text-neutral-400">DISBURSEMENT AMOUNT</div>
                    <div className="text-2xl font-bold text-rose-400">
                      ₹{exp.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Multi-Sig Signer Committee Breakdown */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono-code gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400">Multi-Sig Consensus Progress:</span>
                      <span className="text-amber-400 font-bold">
                        {approvedCount} of {exp.requiredApprovals} Signatures Appended
                      </span>
                    </div>
                    <span className="text-neutral-500 text-[11px]">
                      {exp.requiredApprovals - approvedCount === 0
                        ? 'Consensus reached. Ready for anchor.'
                        : `${exp.requiredApprovals - approvedCount} signature(s) required to release vault escrow.`}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        approvedCount === exp.requiredApprovals
                          ? 'bg-[#00FF87]'
                          : 'bg-gradient-to-r from-amber-500 to-amber-300'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Individual Admin Signer Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    {exp.approvers.map((app) => {
                      const isApproved = app.status === 'APPROVED';
                      const isCurrentActive = activeAdminSigner.name.toLowerCase() === app.name.toLowerCase();

                      return (
                        <div
                          key={app.id}
                          className={`p-3.5 rounded-lg border text-xs font-mono-code flex flex-col justify-between space-y-3 transition-all ${
                            isApproved
                              ? 'bg-[#0E1511] border-[#00FF87]/40 text-white shadow-[0_0_8px_rgba(0,255,135,0.08)]'
                              : isCurrentActive
                              ? 'bg-[#15120B] border-amber-500/60 text-amber-300 ring-1 ring-amber-500/30'
                              : 'bg-[#12110E] border-neutral-800 text-neutral-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <div>
                                <div className="font-bold text-white text-sm">{app.name}</div>
                                <div className="text-[11px] text-neutral-400">{app.role}</div>
                              </div>
                              {isApproved ? (
                                <span className="px-2 py-0.5 rounded text-[10px] bg-[#00FF87]/20 border border-[#00FF87]/40 text-[#00FF87] font-bold flex items-center gap-1">
                                  <Check className="w-3 h-3 stroke-[3]" /> Approved
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 border border-amber-500/40 text-amber-300 font-medium flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> Pending
                                </span>
                              )}
                            </div>

                            {/* Cryptographic metadata if approved */}
                            {isApproved && (
                              <div className="mt-2 pt-2 border-t border-neutral-800/80 space-y-1 text-[10px] text-neutral-400 font-mono-code">
                                <div className="truncate">
                                  <span className="text-neutral-500">Hash: </span>
                                  <span className="text-[#00FF87]">{app.signatureHash || 'sig_0x7f8a92b0'}</span>
                                </div>
                                <div className="text-neutral-400">
                                  <span className="text-neutral-500">Time: </span>
                                  {app.timestamp ? new Date(app.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Verified'}
                                </div>
                              </div>
                            )}

                            {/* Signer identity note if pending */}
                            {!isApproved && (
                              <div className="mt-2 text-[11px] text-neutral-400">
                                {isCurrentActive ? (
                                  <span className="text-amber-400 font-medium">
                                    ★ You are logged in as {app.name}.
                                  </span>
                                ) : (
                                  <span className="text-neutral-500">
                                    Requires signature from {app.name}.
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Individual Signature Action Button */}
                          <div>
                            {isApproved ? (
                              <div className="w-full py-1.5 px-2 rounded bg-[#00FF87]/10 text-[#00FF87] text-center text-[11px] font-bold flex items-center justify-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Signature Cryptographically Anchored</span>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleSignAsAdmin(exp.id, app.name)}
                                className={`w-full py-2 px-3 rounded text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                  isCurrentActive
                                    ? 'bg-[#00FF87] hover:bg-[#00e57a] text-black shadow-[0_0_12px_rgba(0,255,135,0.25)]'
                                    : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 hover:border-[#00FF87]/40'
                                }`}
                              >
                                <Key className="w-3.5 h-3.5" />
                                <span>Approve & Sign as {app.name.split(' ')[0]}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Supporting Receipt & Overall Consensus Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-neutral-800 text-xs font-mono-code">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPreviewReceipt(exp)}
                      className="flex items-center gap-1.5 text-[#00FF87] hover:underline cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Inspect Supporting Receipt ({exp.receiptFileName})</span>
                    </button>
                    <span className="text-neutral-600">|</span>
                    <span className="text-neutral-400 text-[11px]">
                      IPFS CID: {exp.receiptCID.slice(0, 12)}...
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRejectingExpenseId(exp.id)}
                      className="px-3 py-1.5 rounded bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-medium cursor-pointer transition-colors"
                    >
                      Reject Voucher
                    </button>

                    {approvedCount === exp.requiredApprovals ? (
                      <span className="px-3 py-1.5 rounded bg-[#00FF87]/20 border border-[#00FF87]/50 text-[#00FF87] font-bold text-xs flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Consensus Satisfied (Released)</span>
                      </span>
                    ) : (
                      <div className="text-[11px] text-neutral-400 px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 flex items-center gap-1.5">
                        <Lock className="w-3 h-3 text-amber-400" />
                        <span>Escrow Locked ({approvedCount}/{exp.requiredApprovals} Signed)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Approved Disbursements Archive */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono-code uppercase text-neutral-400 tracking-wider">
            Approved & Disbursed Vouchers Archive ({approvedList.length})
          </h2>
          <span className="text-[11px] font-mono-code text-neutral-500">
            Cryptographically anchored on Tezos Ghostnet
          </span>
        </div>

        <div className="rounded-lg border border-[#1E2621] bg-[#0A0D0B] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-code">
              <thead className="bg-[#070A08] border-b border-[#1E2621] text-[11px] text-neutral-400 uppercase">
                <tr>
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4">Expense Voucher</th>
                  <th className="py-2.5 px-4">Amount</th>
                  <th className="py-2.5 px-4">Consensus Signers</th>
                  <th className="py-2.5 px-4">IPFS Receipt</th>
                  <th className="py-2.5 px-4 text-right">Blockchain Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18211C]">
                {approvedList.map((exp) => (
                  <tr key={exp.id} className="hover:bg-[#0D120F] transition-colors">
                    <td className="py-2.5 px-4 text-neutral-400">{exp.date}</td>
                    <td className="py-2.5 px-4 font-sans font-medium text-white max-w-[260px]">
                      <div className="truncate">{exp.description}</div>
                      <div className="text-[10px] text-neutral-400 font-mono-code">Vendor: {exp.vendor}</div>
                    </td>
                    <td className="py-2.5 px-4 text-rose-400 font-bold">
                      ₹{exp.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-1 text-[#00FF87] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>3 / 3 Quorum</span>
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">
                        {exp.approvers.map((a) => a.name.split(' ')[0]).join(', ')}
                      </div>
                    </td>
                    <td className="py-2.5 px-4">
                      <button
                        onClick={() => setPreviewReceipt(exp)}
                        className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
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

      {/* Reject Voucher Modal */}
      {rejectingExpenseId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-mono-code">
          <div className="relative w-full max-w-md bg-[#0D110F] border border-[#232D27] rounded-xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm pb-2 border-b border-neutral-800">
              <AlertTriangle className="w-5 h-5" />
              <span>Reject Disbursement Voucher #{rejectingExpenseId}</span>
            </div>

            <p className="text-neutral-300">
              Disbursement rejection will mark this voucher as non-compliant and notify the submitting department. Please provide the audit justification:
            </p>

            <div>
              <label className="block text-neutral-400 uppercase text-[10px] mb-1">
                Auditor Rejection Reason
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
                className="w-full bg-[#111612] border border-[#232D27] rounded p-2 text-white focus:outline-none focus:border-rose-400 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectingExpenseId(null)}
                className="px-3 py-1.5 rounded bg-neutral-800 text-neutral-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-4 py-1.5 rounded bg-rose-500 hover:bg-rose-600 text-white font-bold"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
