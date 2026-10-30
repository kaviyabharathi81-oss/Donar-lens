import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  Clock,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { BlockchainBadge, OfficialBadge } from '../../components/common/StatusBadges';

export const DonorDonationsPage: React.FC = () => {
  const { donations, currentUser, setPreviewTx } = useApp();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const myDonations = donations.filter(
    (d) => d.walletAddress === currentUser.walletAddress || d.donorEmail === currentUser.email
  );

  const totalDonated = myDonations.reduce((acc, d) => acc + d.amount, 0);
  const verifiedCount = myDonations.filter((d) => d.officialStatus === 'VERIFIED').length;
  const pendingCount = myDonations.filter((d) => d.officialStatus === 'PENDING_REVIEW').length;
  const supportedCampaigns = new Set(myDonations.map((d) => d.campaignId)).size;

  const filtered = myDonations.filter((d) => {
    const matchesSearch =
      d.campaignTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.txHash.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'VERIFIED' && d.officialStatus === 'VERIFIED') ||
      (statusFilter === 'PENDING' && d.officialStatus === 'PENDING_REVIEW');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Title & Header (Section 15) */}
      <div className="space-y-1">
        <div className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider">
          CONTRIBUTOR LEDGER
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          My Contributions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Complete cryptographic and official audit history of your campaign donations.
        </p>
      </div>

      {/* Top Summary Strip (Section 15) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-[#0A0D0B] border border-[#1E2621]">
          <div className="text-[11px] font-mono-code text-neutral-400 uppercase">Total Donated</div>
          <div className="text-2xl font-bold font-mono-code text-white mt-1">
            ₹{totalDonated.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono-code">Gross contributions</div>
        </div>

        <div className="p-4 rounded-lg bg-[#0A0D0B] border border-[#1E2621]">
          <div className="text-[11px] font-mono-code text-neutral-400 uppercase">Officially Verified</div>
          <div className="text-2xl font-bold font-mono-code text-[#00FF87] mt-1">
            {verifiedCount}
          </div>
          <div className="text-[11px] text-[#00FF87] font-mono-code">Auditor Attested</div>
        </div>

        <div className="p-4 rounded-lg bg-[#0A0D0B] border border-[#1E2621]">
          <div className="text-[11px] font-mono-code text-neutral-400 uppercase">Pending Review</div>
          <div className="text-2xl font-bold font-mono-code text-amber-400 mt-1">
            {pendingCount}
          </div>
          <div className="text-[11px] text-amber-400 font-mono-code">In Auditor Queue</div>
        </div>

        <div className="p-4 rounded-lg bg-[#0A0D0B] border border-[#1E2621]">
          <div className="text-[11px] font-mono-code text-neutral-400 uppercase">Campaigns Supported</div>
          <div className="text-2xl font-bold font-mono-code text-white mt-1">
            {supportedCampaigns}
          </div>
          <div className="text-[11px] text-cyan-400 font-mono-code">Distinct initiatives</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-lg bg-[#0A0D0B] border border-[#1E2621] flex flex-col sm:flex-row justify-between gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by campaign name or transaction hash..."
            className="w-full bg-[#111612] border border-[#232D27] rounded px-3 py-2 pl-9 text-xs font-mono-code text-white focus:outline-none focus:border-[#00FF87]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-neutral-400 font-mono-code text-[11px]">STATUS:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111612] border border-[#232D27] rounded px-2.5 py-1.5 text-xs font-mono-code text-neutral-300 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="VERIFIED">Officially Verified</option>
            <option value="PENDING">Pending Review</option>
          </select>
        </div>
      </div>

      {/* Donations Table (Section 15) */}
      <div className="rounded-lg border border-[#1E2621] bg-[#0A0D0B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-code">
            <thead className="bg-[#070A08] border-b border-[#1E2621] text-[11px] text-neutral-400 uppercase">
              <tr>
                <th className="py-3 px-4">Campaign</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Blockchain Status</th>
                <th className="py-3 px-4">Official Verification</th>
                <th className="py-3 px-4">Operation Hash</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18211C]">
              {filtered.map((d) => (
                <tr
                  key={d.id}
                  onClick={() => navigate(`/donor/donations/${d.id}`)}
                  className="hover:bg-[#0D120F] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-sans font-semibold text-white group-hover:text-[#00FF87] transition-colors max-w-[220px]">
                    <div className="truncate">{d.campaignTitle}</div>
                    <div className="text-[10px] text-neutral-500 font-mono-code">
                      ID: {d.id} {d.isAnonymous && '• Anonymous'}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#00FF87]">
                    ₹{d.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-neutral-400">
                    {new Date(d.timestamp).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <BlockchainBadge status={d.blockchainStatus} size="sm" />
                  </td>
                  <td className="py-3 px-4">
                    <OfficialBadge status={d.officialStatus} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-neutral-400">
                    <span className="font-mono-code text-[11px]">
                      {d.txHash.slice(0, 10)}...{d.txHash.slice(-4)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`/donor/donations/${d.id}`}
                      className="px-2.5 py-1 rounded bg-[#111612] border border-[#232D27] text-neutral-300 text-[11px] hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Inspect
                    </Link>
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
