import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Database,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Layers,
  FileText,
  AlertTriangle,
  History,
  Lock,
} from 'lucide-react';

export const AdminAuditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { auditLog, campaigns, setPreviewReceipt } = useApp();

  const campaignId = id || 'camp_001';
  const campaign = campaigns.find((c) => c.id === campaignId) || campaigns[0];

  return (
    <div className="space-y-6">
      <Link
        to={`/admin/campaigns/${campaign.id}`}
        className="text-xs font-mono-code text-neutral-400 hover:text-white flex items-center gap-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Campaign Console</span>
      </Link>

      {/* Header (Section 29) */}
      <div className="p-6 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#18211C] gap-3">
          <div>
            <div className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-4 h-4" /> IMMUTABLE AUDIT TRAIL
            </div>
            <h1 className="text-2xl font-bold text-white mt-0.5">
              Cryptographic & Official Audit Log
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5 font-sans">
              Strictly append-only logbook of all campaign events, approvals, disbursements, and attestation signatures.
            </p>
          </div>

          <div className="px-3.5 py-2 rounded bg-[#0E1511] border border-[#00FF87]/30 text-xs font-mono-code text-[#00FF87] flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>APPEND-ONLY ENFORCED</span>
          </div>
        </div>

        {/* Append-Only Rule Notice */}
        <div className="p-3.5 rounded bg-[#0D120F] border border-neutral-800 text-xs text-neutral-300 font-sans leading-relaxed">
          <strong>Institutional Invariant:</strong> Database records in Donor Lens are never mutated or deleted. Any administrative revision requires an explicit compensating transaction signed by authorized multi-sig keys, preserving 100% forensic transparency.
        </div>
      </div>

      {/* Audit Timeline (Section 29) */}
      <div className="p-6 rounded-xl bg-[#0A0D0B] border border-[#1E2621] space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-xs font-mono-code">
          <span className="text-neutral-400 uppercase tracking-wider">
            Chronological Events Ledger ({auditLog.length} Records)
          </span>
          <span className="text-[#00FF87]">Validated by SHA-256 Merkle Chain</span>
        </div>

        <div className="space-y-6 relative pl-6 border-l-2 border-[#1E2621]">
          {auditLog.map((record) => (
            <div key={record.id} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#090D0B] border-2 border-[#00FF87] group-hover:scale-125 transition-transform" />

              <div className="p-4 rounded-lg bg-[#0F1411] border border-[#1E2621] space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono-code">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{record.action}</span>
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 text-[10px]">
                      {record.entityType}
                    </span>
                  </div>
                  <span className="text-neutral-500 text-[11px]">
                    {new Date(record.timestamp).toUTCString()}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {record.description}
                </p>

                <div className="flex flex-wrap items-center justify-between pt-2 border-t border-neutral-800/60 text-[11px] font-mono-code text-neutral-400 gap-2">
                  <div>
                    Actor: <span className="text-neutral-200">{record.actor}</span>{' '}
                    <span className="text-neutral-500">({record.actorRole})</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {record.txHash && (
                      <span className="text-cyan-400 truncate max-w-[160px]">
                        Tx: {record.txHash.slice(0, 10)}...
                      </span>
                    )}
                    {record.evidenceCID && (
                      <span className="text-[#00FF87] truncate max-w-[160px]">
                        CID: {record.evidenceCID.slice(0, 10)}...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CORRECTION HISTORY SECTION (Section 29) */}
      <div className="p-6 rounded-xl bg-[#0A0D0B] border border-[#1E2621] space-y-4 font-mono-code text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white text-sm">Compensating Correction History</h3>
          </div>
          <span className="text-neutral-500">Zero Overwrites Permitted</span>
        </div>

        <div className="p-4 rounded-lg bg-[#111612] border border-[#232D27] space-y-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-amber-400 font-bold">REVISION CASE: CORR_2026_09A</span>
            <span className="text-neutral-500">2026-09-14 18:20 UTC</span>
          </div>
          <p className="text-neutral-300 font-sans leading-relaxed text-xs">
            <strong>Original Voucher #exp_498 (₹19,200):</strong> Incorrect transportation tax bracket applied on ambulance transit invoice.
            Compensating adjustment transaction #op99318a (+₹700 credit) submitted and co-signed by Auditor Dr. Priya Sundaram.
          </p>
          <div className="pt-2 text-[11px] text-neutral-500 flex items-center justify-between">
            <span>Author: Institutional Treasury Comptroller</span>
            <span className="text-[#00FF87]">Reconciled diff: ₹0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
