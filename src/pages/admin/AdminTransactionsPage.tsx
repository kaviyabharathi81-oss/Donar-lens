import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Cpu,
  Search,
  ExternalLink,
  ArrowLeft,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';
import { LayerTag } from '../../components/common/StatusBadges';

export const AdminTransactionsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { transactions, campaigns, setPreviewTx } = useApp();

  const campaignId = id || 'camp_001';
  const campaign = campaigns.find((c) => c.id === campaignId) || campaigns[0];

  const [typeFilter, setTypeFilter] = useState<'ALL' | 'DONATION' | 'EXPENSE'>('ALL');
  const [search, setSearch] = useState('');

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.txHash.toLowerCase().includes(search.toLowerCase()) ||
      tx.walletAddress.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'ALL' || tx.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <Link
        to={`/admin/campaigns/${campaign.id}`}
        className="text-xs font-mono-code text-neutral-400 hover:text-white flex items-center gap-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Campaign Console</span>
      </Link>

      {/* Header (Section 28) */}
      <div className="p-6 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#18211C] gap-3">
          <div>
            <div className="text-xs font-mono-code text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> OPERATION EXPLORER
            </div>
            <h1 className="text-2xl font-bold text-white mt-0.5">
              Blockchain Ledger Transactions
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5 font-sans">
              Raw Michelson smart contract execution calls indexed directly from Tezos Ghostnet.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#00FF87]/15 border border-[#00FF87]/30 text-[#00FF87] text-xs font-mono-code">
              Tezos Ghostnet: Block #4982420
            </span>
          </div>
        </div>

        {/* Filter and search */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 text-xs font-mono-code">
          <div className="flex items-center gap-1.5">
            {(['ALL', 'DONATION', 'EXPENSE'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded transition-colors ${
                  typeFilter === t
                    ? 'bg-[#00FF87] text-black font-bold'
                    : 'bg-[#111612] text-neutral-400 hover:text-white border border-[#232D27]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by hash or wallet address..."
              className="w-full sm:w-72 bg-[#111612] border border-[#232D27] rounded px-3 py-1.5 pl-8 text-xs text-white focus:outline-none focus:border-[#00FF87]"
            />
          </div>
        </div>
      </div>

      {/* Transaction Table (Section 28) */}
      <div className="rounded-lg border border-[#1E2621] bg-[#0A0D0B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-code">
            <thead className="bg-[#070A08] border-b border-[#1E2621] text-[11px] text-neutral-400 uppercase">
              <tr>
                <th className="py-3 px-4">Operation Hash</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Sender Wallet</th>
                <th className="py-3 px-4">Block</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4 text-right">Explorer Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18211C]">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#0D120F] transition-colors">
                  <td className="py-3 px-4 text-neutral-200 select-all font-mono-code">
                    {tx.txHash.slice(0, 12)}...{tx.txHash.slice(-6)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tx.type === 'DONATION'
                          ? 'bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/30'
                          : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-white">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-neutral-400 truncate max-w-[130px]">
                    {tx.walletAddress}
                  </td>
                  <td className="py-3 px-4 text-neutral-300">#{tx.blockNumber}</td>
                  <td className="py-3 px-4 text-[#00FF87] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> CONFIRMED
                  </td>
                  <td className="py-3 px-4">
                    {tx.verification === 'OFFICIALLY_VERIFIED' ? (
                      <span className="text-[#00FF87]">✓ ATTESTED</span>
                    ) : (
                      <span className="text-amber-400">PENDING REVIEW</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setPreviewTx(tx)}
                      className="px-2.5 py-1 rounded bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 text-[11px] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>View on TzKT</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
