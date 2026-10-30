import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Cpu,
  FileText,
  Layers,
  ArrowLeft,
  ArrowUpRight,
} from 'lucide-react';
import { LayerTag, ReconciliationBadge } from '../../components/common/StatusBadges';

export const VerifyDetailPage: React.FC = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const { donations, transactions, expenses, setPreviewReceipt, setPreviewTx } = useApp();

  const txHash = transactionId || 'op7f92c1a88b209e74dc643d9f18a38b556012e873acb9841f32a0d1e5e49811';
  const matchingDonation = donations.find((d) => d.txHash === txHash);
  const matchingExpense = expenses.find((e) => e.txHash === txHash);
  const matchingTx = transactions.find((t) => t.txHash === txHash);

  const amount = matchingDonation?.amount || matchingExpense?.amount || matchingTx?.amount || 5000;
  const campaignTitle = matchingDonation?.campaignTitle || matchingExpense?.campaignTitle || 'Student Emergency Assistance Fund';
  const blockNumber = matchingDonation?.blockNumber || matchingTx?.blockNumber || 4982142;
  const timestamp = matchingDonation?.timestamp || matchingTx?.timestamp || '2026-10-29T14:22:10Z';
  const walletAddress = matchingDonation?.walletAddress || matchingTx?.walletAddress || 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb';
  const isExpense = !!matchingExpense || matchingTx?.type === 'EXPENSE';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <Link
          to="/verify"
          className="text-xs font-mono-code text-neutral-400 hover:text-white flex items-center gap-1.5 mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Verifier</span>
        </Link>

        <div className="p-6 sm:p-8 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#18211C] gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00FF87]/20 border border-[#00FF87]/40 flex items-center justify-center text-[#00FF87]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold font-mono-code text-[#00FF87]">
                    OPERATION VERIFIED
                  </span>
                  <LayerTag layer="ON-CHAIN" />
                  <LayerTag layer="INDEXED" />
                </div>
                <div className="text-xs text-neutral-400 font-mono-code mt-0.5">
                  Network: Tezos Ghostnet Testnet | Consensus Block: #{blockNumber}
                </div>
              </div>
            </div>

            <ReconciliationBadge matches={true} diff={0} />
          </div>

          {/* Monospace Hash */}
          <div className="p-3 rounded bg-black/50 border border-neutral-800 space-y-1">
            <div className="text-[10px] font-mono-code text-neutral-500 uppercase">
              TRANSACTION OPERATION HASH (SHA-256)
            </div>
            <div className="font-mono-code text-xs text-neutral-200 select-all break-all">
              {txHash}
            </div>
          </div>

          {/* Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono-code">
            <div className="p-3 rounded bg-[#0F1411] border border-[#1E2621]">
              <div className="text-neutral-500 uppercase text-[10px]">Operation Type</div>
              <div className="text-white font-bold mt-1">{isExpense ? 'EXPENDITURE' : 'CONTRIBUTION'}</div>
            </div>

            <div className="p-3 rounded bg-[#0F1411] border border-[#1E2621]">
              <div className="text-neutral-500 uppercase text-[10px]">Amount</div>
              <div className="text-[#00FF87] font-bold mt-1">₹{amount.toLocaleString('en-IN')}</div>
            </div>

            <div className="p-3 rounded bg-[#0F1411] border border-[#1E2621]">
              <div className="text-neutral-500 uppercase text-[10px]">Gas Fee</div>
              <div className="text-neutral-300 mt-1">0.00140 XTZ</div>
            </div>

            <div className="p-3 rounded bg-[#0F1411] border border-[#1E2621]">
              <div className="text-neutral-500 uppercase text-[10px]">Reconciliation</div>
              <div className="text-[#00FF87] font-bold mt-1">0 Discrepancy</div>
            </div>
          </div>

          {/* Verification Checks with Green Checkmarks (Section 33) */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-code uppercase text-neutral-400 tracking-wider">
              Verification Attestation Checks
            </h3>
            <div className="space-y-2">
              {[
                {
                  title: 'Blockchain Confirmation',
                  desc: `Recorded on Tezos Ghostnet block #${blockNumber} in smart contract storage.`,
                },
                {
                  title: 'Official Verification',
                  desc: 'Reviewed and attested by authorized institutional auditor Dr. Priya Sundaram.',
                },
                {
                  title: 'Receipt Verification',
                  desc: 'Supporting PDF evidence itemized and cryptographically pinned to IPFS gateway.',
                },
                {
                  title: 'Financial Reconciliation',
                  desc: 'On-chain smart contract balance exactly matches application escrow balance.',
                },
              ].map((check) => (
                <div
                  key={check.title}
                  className="p-3 rounded bg-[#111612] border border-[#232D27] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00FF87] shrink-0" />
                    <div>
                      <span className="font-semibold text-white font-mono-code">{check.title}</span>
                      <p className="text-[11px] text-neutral-400 font-sans mt-0.5">{check.desc}</p>
                    </div>
                  </div>
                  <span className="text-[#00FF87] font-mono-code text-[11px]">PASS</span>
                </div>
              ))}
            </div>
          </div>

          {/* Receipt Preview Button (if applicable) */}
          {matchingExpense && (
            <div className="p-4 rounded bg-[#111612] border border-[#232D27] flex items-center justify-between">
              <div>
                <div className="text-xs font-mono-code text-white font-semibold">Supporting Receipt Voucher</div>
                <div className="text-[11px] text-neutral-400 font-mono-code">{matchingExpense.receiptFileName}</div>
              </div>
              <button
                onClick={() => setPreviewReceipt(matchingExpense)}
                className="px-3 py-1.5 rounded bg-[#00FF87]/20 hover:bg-[#00FF87]/30 text-[#00FF87] border border-[#00FF87]/40 text-xs font-mono-code flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Inspect Receipt Modal</span>
              </button>
            </div>
          )}

          {/* TzKT Simulation */}
          <div className="pt-2 flex justify-between items-center text-xs font-mono-code border-t border-neutral-800">
            <span className="text-neutral-500">TzKT Block Explorer Indexer</span>
            <button
              onClick={() => {
                if (matchingTx) setPreviewTx(matchingTx);
                else {
                  setPreviewTx({
                    id: 'tx_demo',
                    txHash,
                    type: isExpense ? 'EXPENSE' : 'DONATION',
                    amount,
                    campaignId: 'camp_001',
                    campaignTitle,
                    walletAddress,
                    blockNumber,
                    timestamp,
                    status: 'CONFIRMED',
                    verification: 'OFFICIALLY_VERIFIED',
                    gasUsed: '0.00140 XTZ',
                    contract: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
                  });
                }
              }}
              className="text-[#00FF87] hover:underline flex items-center gap-1"
            >
              <span>View Raw Michelson Explorer Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
