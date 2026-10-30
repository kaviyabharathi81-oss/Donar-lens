import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Search,
  Check,
  X,
  FileCheck2,
} from 'lucide-react';
import { BlockchainBadge, OfficialBadge } from '../../components/common/StatusBadges';
import { Donation } from '../../types';

export const AdminDonationVerificationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { donations, campaigns, verifyDonation, rejectDonation, setPreviewTx, currentUser } = useApp();

  const campaignId = id || 'camp_001';
  const campaign = campaigns.find((c) => c.id === campaignId) || campaigns[0];

  const campaignDonations = donations.filter((d) => d.campaignId === campaign.id);

  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'VERIFIED'>('PENDING');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [verificationNotes, setVerificationNotes] = useState('Nodal bank settlement statement checked against KYC roll. Confirmed.');

  const filtered = campaignDonations.filter((d) => {
    if (filter === 'PENDING') return d.officialStatus === 'PENDING_REVIEW';
    if (filter === 'VERIFIED') return d.officialStatus === 'VERIFIED';
    return true;
  });

  const handleVerify = (donId: string) => {
    verifyDonation(donId, verificationNotes);
    setActionSuccess(`Donation #${donId} marked as OFFICIALLY VERIFIED.`);
    setSelectedDonation(null);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleReject = (donId: string) => {
    rejectDonation(donId, 'Bank settlement mismatch.');
    setActionSuccess(`Donation #${donId} rejected.`);
    setSelectedDonation(null);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        to={`/admin/campaigns/${campaign.id}`}
        className="text-xs font-mono-code text-neutral-400 hover:text-white flex items-center gap-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Campaign Console</span>
      </Link>

      {/* Header (Section 25) */}
      <div className="p-6 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#18211C] gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-amber-400">
              <CheckSquare className="w-4 h-4" />
              <span>OFFICIAL VERIFICATION DESK</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-0.5">
              Donation Verification Queue
            </h1>
            <p className="text-xs text-neutral-400 font-sans mt-0.5">
              Review on-chain cryptographically confirmed pledges against institutional nodal bank accounts.
            </p>
          </div>

          {/* Core concept banner */}
          <div className="p-3 rounded bg-[#0D120F] border border-neutral-800 text-[11px] font-mono-code space-y-1">
            <div className="text-neutral-400">TWO-TIER AUDIT POLICY:</div>
            <div className="text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
              <strong>BLOCKCHAIN CONFIRMED:</strong> Tx verified on Tezos.
            </div>
            <div className="text-purple-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <strong>OFFICIALLY VERIFIED:</strong> Auditor reviewed & approved.
            </div>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center justify-between gap-3 text-xs font-mono-code">
          <div className="flex items-center gap-2">
            {(['PENDING', 'VERIFIED', 'ALL'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded transition-colors ${
                  filter === f
                    ? 'bg-[#00FF87] text-black font-bold'
                    : 'bg-[#111612] text-neutral-400 hover:text-white border border-[#232D27]'
                }`}
              >
                {f} {f === 'PENDING' && `(${campaignDonations.filter(d => d.officialStatus === 'PENDING_REVIEW').length})`}
              </button>
            ))}
          </div>

          {actionSuccess && (
            <div className="px-3 py-1 rounded bg-[#00FF87]/20 border border-[#00FF87] text-[#00FF87] text-xs font-mono-code animate-fade-in flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>{actionSuccess}</span>
            </div>
          )}
        </div>
      </div>

      {/* Verification Queue Table (Section 25) */}
      <div className="rounded-lg border border-[#1E2621] bg-[#0A0D0B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-code">
            <thead className="bg-[#070A08] border-b border-[#1E2621] text-[11px] text-neutral-400 uppercase">
              <tr>
                <th className="py-3 px-4">Donor Name & Wallet</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Blockchain Status</th>
                <th className="py-3 px-4">Official Verification</th>
                <th className="py-3 px-4">Operation Hash</th>
                <th className="py-3 px-4 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18211C]">
              {filtered.map((don) => (
                <tr key={don.id} className="hover:bg-[#0D120F] transition-colors">
                  <td className="py-3 px-4 font-sans">
                    <div className="font-semibold text-white">
                      {don.isAnonymous ? 'Anonymous Contributor' : don.donorName}
                    </div>
                    <div className="text-[10px] text-neutral-400 font-mono-code truncate max-w-[150px]">
                      {don.walletAddress}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#00FF87]">
                    ₹{don.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-neutral-400">
                    {new Date(don.timestamp).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <BlockchainBadge status={don.blockchainStatus} size="sm" />
                  </td>
                  <td className="py-3 px-4">
                    <OfficialBadge status={don.officialStatus} size="sm" />
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() =>
                        setPreviewTx({
                          id: don.id,
                          txHash: don.txHash,
                          type: 'DONATION',
                          amount: don.amount,
                          campaignId: don.campaignId,
                          campaignTitle: don.campaignTitle,
                          walletAddress: don.walletAddress,
                          blockNumber: don.blockNumber,
                          timestamp: don.timestamp,
                          status: don.blockchainStatus,
                          verification:
                            don.officialStatus === 'VERIFIED'
                              ? 'OFFICIALLY_VERIFIED'
                              : 'PENDING',
                          gasUsed: '0.00140 XTZ',
                          contract: campaign.contractAddress,
                        })
                      }
                      className="text-neutral-400 hover:text-white flex items-center gap-1 hover:underline"
                    >
                      <span>{don.txHash.slice(0, 8)}...</span>
                      <ExternalLink className="w-3 h-3 text-[#00FF87]" />
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {don.officialStatus === 'PENDING_REVIEW' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedDonation(don)}
                          className="px-2.5 py-1 rounded bg-[#111612] hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-[11px]"
                        >
                          Audit Details
                        </button>
                        <button
                          onClick={() => handleVerify(don.id)}
                          className="px-2.5 py-1 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-bold text-[11px] shadow-[0_0_8px_rgba(0,255,135,0.2)]"
                        >
                          Verify Donation
                        </button>
                      </div>
                    ) : (
                      <span className="text-[#00FF87] font-mono-code text-[11px] flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Attested
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Detail Modal (Section 25) */}
      {selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-mono-code">
          <div className="relative w-full max-w-lg bg-[#0D110F] border border-[#232D27] rounded-lg shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#00FF87]" />
                <h3 className="font-bold text-white text-sm">
                  Official Verification Checklist
                </h3>
              </div>
              <button
                onClick={() => setSelectedDonation(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Checklist Checks (Section 25) */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-[#111612] border border-[#232D27] flex items-center justify-between">
                <span>1. Transaction exists on Tezos</span>
                <span className="text-[#00FF87] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Block #{selectedDonation.blockNumber}
                </span>
              </div>

              <div className="p-2.5 rounded bg-[#111612] border border-[#232D27] flex items-center justify-between">
                <span>2. Amount matches (₹{selectedDonation.amount.toLocaleString('en-IN')})</span>
                <span className="text-[#00FF87] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Match
                </span>
              </div>

              <div className="p-2.5 rounded bg-[#111612] border border-[#232D27] flex items-center justify-between">
                <span>3. Wallet cryptographic signature valid</span>
                <span className="text-[#00FF87] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Validated
                </span>
              </div>

              <div className="p-2.5 rounded bg-[#111612] border border-[#232D27] flex items-center justify-between">
                <span>4. Campaign association confirmed</span>
                <span className="text-[#00FF87] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {campaign.title.slice(0, 18)}...
                </span>
              </div>

              <div className="p-2.5 rounded bg-[#111612] border border-[#232D27] flex items-center justify-between">
                <span>5. Blockchain confirmation status</span>
                <BlockchainBadge status={selectedDonation.blockchainStatus} size="sm" />
              </div>
            </div>

            {/* Attestation Notes Input */}
            <div>
              <label className="block text-[11px] text-neutral-400 uppercase mb-1">
                Auditor Statement & Bank Settlement Notes:
              </label>
              <textarea
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                rows={2}
                className="w-full bg-[#111612] border border-[#232D27] rounded p-2 text-xs text-white focus:outline-none focus:border-[#00FF87]"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleReject(selectedDonation.id)}
                className="px-3 py-2 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold"
              >
                Reject Donation
              </button>
              <button
                onClick={() => handleVerify(selectedDonation.id)}
                className="flex-1 py-2 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-bold text-xs shadow-[0_0_12px_rgba(0,255,135,0.25)] flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Attest & Grant Official Verification</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
