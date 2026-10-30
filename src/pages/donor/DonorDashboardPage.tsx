import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  ShieldCheck,
  Heart,
  Clock,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import {
  DonorActivityChart,
  DonorAllocationChart,
} from '../../components/charts/DashboardCharts';
import { BlockchainBadge, OfficialBadge } from '../../components/common/StatusBadges';

export const DonorDashboardPage: React.FC = () => {
  const { currentUser, campaigns, donations, setPreviewTx } = useApp();
  const navigate = useNavigate();

  // User-specific donation metrics
  const myDonations = donations.filter((d) => d.walletAddress === currentUser.walletAddress || d.donorEmail === currentUser.email);
  const totalDonated = myDonations.reduce((acc, d) => acc + d.amount, 0);
  const verifiedCount = myDonations.filter((d) => d.officialStatus === 'VERIFIED').length;
  const pendingCount = myDonations.filter((d) => d.officialStatus === 'PENDING_REVIEW').length;
  const uniqueCampaigns = new Set(myDonations.map((d) => d.campaignId)).size;

  const upcomingCampaigns = campaigns.filter((c) => c.status === 'upcoming');

  return (
    <div className="space-y-8">
      {/* Header Greeting (Section 11) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#18211C]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good evening, {currentUser.name.split(' ')[0]}.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Here's what's happening across your contributions.
          </p>
        </div>

        <Link
          to="/donor/explore"
          className="px-4 py-2 rounded-md bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs transition-all shadow-[0_0_15px_rgba(0,255,135,0.2)] flex items-center gap-1.5 w-fit"
        >
          <Compass className="w-4 h-4" />
          <span>Discover Campaigns</span>
        </Link>
      </div>

      {/* Top Financial Metrics (Section 11) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-1">
          <div className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider">
            Total Donated
          </div>
          <div className="text-2xl font-bold font-mono-code text-white">
            ₹{totalDonated.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono-code">
            Lifetime contributions
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-1">
          <div className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider">
            Verified Donations
          </div>
          <div className="text-2xl font-bold font-mono-code text-[#00FF87]">
            {verifiedCount} of {myDonations.length}
          </div>
          <div className="text-[11px] text-[#00FF87] font-mono-code flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% On-Chain Escrowed
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-1">
          <div className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider">
            Campaigns Supported
          </div>
          <div className="text-2xl font-bold font-mono-code text-white">
            {uniqueCampaigns}
          </div>
          <div className="text-[11px] text-neutral-400 font-mono-code">
            Campus welfare funds
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-1">
          <div className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider">
            Active Campaigns
          </div>
          <div className="text-2xl font-bold font-mono-code text-white">
            {campaigns.filter((c) => c.status === 'active' || c.status === 'nearly_funded').length}
          </div>
          <div className="text-[11px] text-cyan-400 font-mono-code">
            Open for contributions
          </div>
        </div>
      </div>

      {/* AT LEAST TWO LARGE CHARTS (Section 11 & 38) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Donation Activity Over Time */}
        <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-4">
          <div>
            <span className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider">
              ACTIVITY METRICS
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">Your contribution activity</h3>
            <p className="text-xs text-neutral-400">Total contributions over the last 6 months</p>
          </div>
          <DonorActivityChart />
        </div>

        {/* CHART 2: Donation Allocation Donut */}
        <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-4">
          <div>
            <span className="text-xs font-mono-code text-cyan-400 uppercase tracking-wider">
              PORTFOLIO IMPACT
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">Where your contributions go</h3>
            <p className="text-xs text-neutral-400">Distribution across supported campaigns</p>
          </div>
          <DonorAllocationChart />
        </div>
      </div>

      {/* Verification Health & Recent Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Health Card */}
        <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-neutral-400 uppercase">
              DONATION VERIFICATION HEALTH
            </span>
            <ShieldCheck className="w-4 h-4 text-[#00FF87]" />
          </div>

          <div className="space-y-2.5 font-mono-code text-xs">
            <div className="flex items-center justify-between p-2.5 rounded bg-[#111612] border border-[#232D27]">
              <span className="text-neutral-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00FF87]" /> Officially Verified
              </span>
              <span className="text-[#00FF87] font-bold">{verifiedCount} Donations</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded bg-[#111612] border border-[#232D27]">
              <span className="text-neutral-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Pending Official Review
              </span>
              <span className="text-amber-400 font-bold">{pendingCount} Donations</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded bg-[#111612] border border-[#232D27]">
              <span className="text-neutral-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" /> Requires Attention
              </span>
              <span className="text-neutral-400 font-bold">0 Discrepancy</span>
            </div>
          </div>

          <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
            Your recent donation of ₹5,000 is securely anchored to block #4982142 on Tezos. Dr. Priya Sundaram's audit desk reviews incoming nodal bank reconciliations within 24 hours.
          </p>
        </div>

        {/* Recent Donations Table */}
        <div className="lg:col-span-2 p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono-code text-neutral-400 uppercase">
                CONTRIBUTION RECORDS
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">Recent Donations</h3>
            </div>
            <Link
              to="/donor/donations"
              className="text-xs font-mono-code text-[#00FF87] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-code">
              <thead className="bg-[#070A08] border-b border-[#1E2621] text-[11px] text-neutral-400 uppercase">
                <tr>
                  <th className="py-2.5 px-3">Campaign</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18211C]">
                {myDonations.slice(0, 4).map((d) => (
                  <tr key={d.id} className="hover:bg-[#0D120F] transition-colors">
                    <td className="py-2.5 px-3 font-sans font-medium text-white max-w-[180px] truncate">
                      <Link to={`/donor/donations/${d.id}`} className="hover:underline">
                        {d.campaignTitle}
                      </Link>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-[#00FF87]">
                      ₹{d.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3 text-neutral-400">
                      {new Date(d.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-2.5 px-3">
                      <BlockchainBadge status={d.blockchainStatus} size="sm" />
                    </td>
                    <td className="py-2.5 px-3">
                      <OfficialBadge status={d.officialStatus} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* UPCOMING CAMPAIGNS (Section 11 & 39 - Prominent) */}
      <div className="p-6 rounded-xl bg-[#080C0A] border border-[#1E2621] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-mono-code text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> EARLY PLEDGES & NOTIFICATIONS
            </div>
            <h2 className="text-xl font-bold text-white mt-0.5">Upcoming Campaigns</h2>
            <p className="text-xs text-neutral-400">
              Future community initiatives queued for smart contract escrow deployment.
            </p>
          </div>
          <Link
            to="/donor/upcoming"
            className="text-xs font-mono-code text-purple-300 hover:underline flex items-center gap-1"
          >
            <span>View All Upcoming</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingCampaigns.slice(0, 3).map((camp) => (
            <div
              key={camp.id}
              className="p-4 rounded-lg bg-[#0F1411] border border-[#232D27] flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code mb-1">
                  <span className="text-purple-300">{camp.category}</span>
                  <span className="text-neutral-400 text-[11px]">Starts {camp.startDate}</span>
                </div>
                <h4 className="font-bold text-white text-sm">{camp.title}</h4>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{camp.tagline}</p>
              </div>

              <div className="pt-2 border-t border-neutral-800 space-y-2 text-xs">
                <div className="flex justify-between font-mono-code text-neutral-400 text-[11px]">
                  <span>Target Budget</span>
                  <span className="text-white font-bold">₹{camp.goal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[11px] text-neutral-500 font-mono-code">
                    By {camp.organizer}
                  </span>
                  <Link
                    to={`/donor/campaigns/${camp.id}`}
                    className="px-2.5 py-1 rounded bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-[11px] font-mono-code"
                  >
                    View Campaign
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
