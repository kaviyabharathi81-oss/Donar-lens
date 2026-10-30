import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  BarChart3,
  CheckSquare,
  Receipt,
  Layers,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Cpu,
  ArrowUpRight,
  Database,
  FileText,
  Activity,
  PlusCircle,
} from 'lucide-react';
import {
  AdminDonationVolumeChart,
  AdminFundAllocationChart,
  AdminCampaignPerformanceChart,
  AdminExpenseTrendChart,
} from '../../components/charts/DashboardCharts';
import {
  BlockchainBadge,
  OfficialBadge,
  ReconciliationBadge,
  LayerTag,
} from '../../components/common/StatusBadges';

export const AdminDashboardPage: React.FC = () => {
  const { campaigns, donations, expenses, transactions, currentUser, setPreviewTx, setPreviewReceipt } = useApp();
  const navigate = useNavigate();

  // Metrics calculation
  const totalRaised = campaigns.reduce((acc, c) => acc + c.raised, 0);
  const totalSpent = campaigns.reduce((acc, c) => acc + c.spent, 0);
  const totalRemaining = campaigns.reduce((acc, c) => acc + c.remaining, 0);
  const activeCount = campaigns.filter((c) => c.status === 'active' || c.status === 'nearly_funded').length;
  const pendingDonations = donations.filter((d) => d.officialStatus === 'PENDING_REVIEW');
  const pendingExpenses = expenses.filter((e) => e.status === 'PENDING_APPROVAL');

  return (
    <div className="space-y-8">
      {/* Institutional Top Header (Section 21) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-[#18211C] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code">
            <span className="text-purple-400 font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              FINANCIAL AUDITING & OVERSIGHT CELL
            </span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-400">Institutional Comptroller Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
            Administration & Compliance Overview
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real-time multi-sig verification, append-only ledger audit trail, and zero-discrepancy reconciliation.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/campaigns/camp_001/donations"
            className="px-3.5 py-2 rounded bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono-code transition-colors flex items-center gap-1.5"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Verify Donations ({pendingDonations.length})</span>
          </Link>

          <Link
            to="/admin/campaigns/new"
            className="px-3.5 py-2 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs font-mono-code transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Campaign</span>
          </Link>
        </div>
      </div>

      {/* TOP 6 METRICS STRIP (Section 21) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-lg bg-[#0A0D0B] border border-[#1E2621]">
          <div className="text-[10px] font-mono-code text-neutral-400 uppercase">Total Funds Raised</div>
          <div className="text-lg font-bold font-mono-code text-white mt-1">
            ₹{totalRaised.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-emerald-400 font-mono-code">Across 5 Campaigns</div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0A0D0B] border border-[#1E2621]">
          <div className="text-[10px] font-mono-code text-neutral-400 uppercase">Active Campaigns</div>
          <div className="text-lg font-bold font-mono-code text-white mt-1">{activeCount}</div>
          <div className="text-[10px] text-neutral-400 font-mono-code">2 Upcoming Queue</div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0A0D0B] border border-[#1E2621]">
          <div className="text-[10px] font-mono-code text-amber-400 uppercase flex items-center gap-1">
            <Clock className="w-3 h-3" /> Pending Verification
          </div>
          <div className="text-lg font-bold font-mono-code text-amber-400 mt-1">
            {pendingDonations.length} Pledges
          </div>
          <div className="text-[10px] text-neutral-400 font-mono-code">Awaiting Sign-off</div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0A0D0B] border border-[#1E2621]">
          <div className="text-[10px] font-mono-code text-purple-300 uppercase flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" /> Pending Approvals
          </div>
          <div className="text-lg font-bold font-mono-code text-purple-300 mt-1">
            {pendingExpenses.length} Expenses
          </div>
          <div className="text-[10px] text-neutral-400 font-mono-code">Multi-Sig Quorum</div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0A0D0B] border border-[#1E2621]">
          <div className="text-[10px] font-mono-code text-neutral-400 uppercase">Total Expenses</div>
          <div className="text-lg font-bold font-mono-code text-rose-400 mt-1">
            ₹{totalSpent.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-neutral-400 font-mono-code">98 Itemized Receipts</div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0A0D0B] border border-[#1E2621]">
          <div className="text-[10px] font-mono-code text-[#00FF87] uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Reconciled Balance
          </div>
          <div className="text-lg font-bold font-mono-code text-[#00FF87] mt-1">
            ₹{totalRemaining.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-emerald-400 font-mono-code">Diff: ₹0 (100%)</div>
        </div>
      </div>

      {/* PENDING ACTIONS CALLOUT STRIP (Section 21) */}
      <div className="p-4 rounded-lg bg-[#0E1411] border border-[#232D27] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono-code">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[#00FF87] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
            PENDING AUDIT ACTIONS:
          </span>
          <span className="text-amber-400">
            • <strong>{pendingDonations.length}</strong> donations awaiting official verification
          </span>
          <span className="text-purple-300">
            • <strong>{pendingExpenses.length}</strong> expenses awaiting final multi-sig sign-off
          </span>
          <span className="text-neutral-300">• <strong>3</strong> IPFS vendor receipts pinned for review</span>
          <span className="text-emerald-400">• <strong>0</strong> transaction failures / retries</span>
        </div>

        <Link
          to="/admin/verification"
          className="text-[#00FF87] hover:underline flex items-center gap-1 text-xs shrink-0"
        >
          <span>Open Verification Center</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* AT LEAST FOUR LARGE CHARTS (Section 21 & 38) */}
      <div className="space-y-6">
        {/* ROW 1: Charts 1 & 2 (Above the fold) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CHART 1: Donation Volume Line Chart */}
          <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-[#00FF87] uppercase">CHART 01 — INFLOW</span>
                <LayerTag layer="ON-CHAIN" />
              </div>
              <h3 className="text-base font-bold text-white mt-1">Donation Volume Over Time</h3>
            </div>
            <AdminDonationVolumeChart />
          </div>

          {/* CHART 2: Fund Allocation Donut */}
          <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-cyan-400 uppercase">CHART 02 — ALLOCATION</span>
                <LayerTag layer="OFFICIAL" />
              </div>
              <h3 className="text-base font-bold text-white mt-1">Institutional Fund Allocation</h3>
            </div>
            <AdminFundAllocationChart />
          </div>
        </div>

        {/* ROW 2: Charts 3 & 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CHART 3: Campaign Performance Horizontal Bar */}
          <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-purple-400 uppercase">CHART 03 — BUDGET COMPARISON</span>
                <LayerTag layer="INDEXED" />
              </div>
              <h3 className="text-base font-bold text-white mt-1">Campaign Performance (Goal, Raised, Spent, Remaining)</h3>
            </div>
            <AdminCampaignPerformanceChart />
          </div>

          {/* CHART 4: Expense Trend Monthly Spending */}
          <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-rose-400 uppercase">CHART 04 — DISBURSEMENTS</span>
                <LayerTag layer="IPFS" />
              </div>
              <h3 className="text-base font-bold text-white mt-1">Monthly Expense & Voucher Trend</h3>
            </div>
            <AdminExpenseTrendChart />
          </div>
        </div>
      </div>

      {/* RECENT DONATIONS & BLOCKCHAIN ACTIVITY (Section 21) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Donations Queue */}
        <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono-code text-neutral-400 uppercase">
                INCOMING CONTRIBUTIONS
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">Donations Verification Queue</h3>
            </div>
            <Link
              to="/admin/campaigns/camp_001/donations"
              className="text-xs font-mono-code text-[#00FF87] hover:underline flex items-center gap-1"
            >
              <span>Manage Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-code">
              <thead className="bg-[#070A08] border-b border-[#1E2621] text-[11px] text-neutral-400 uppercase">
                <tr>
                  <th className="py-2.5 px-3">Donor</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Blockchain</th>
                  <th className="py-2.5 px-3">Official Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18211C]">
                {donations.slice(0, 5).map((d) => (
                  <tr key={d.id} className="hover:bg-[#0D120F] transition-colors">
                    <td className="py-2.5 px-3 text-white font-sans font-medium">
                      {d.isAnonymous ? 'Anonymous' : d.donorName}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-[#00FF87]">
                      ₹{d.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3">
                      <BlockchainBadge status={d.blockchainStatus} size="sm" />
                    </td>
                    <td className="py-2.5 px-3">
                      <OfficialBadge status={d.officialStatus} size="sm" />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <Link
                        to={`/admin/campaigns/${d.campaignId}/donations`}
                        className="px-2 py-1 rounded bg-[#111612] border border-[#232D27] text-neutral-300 hover:text-white text-[11px]"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Blockchain Transactions */}
        <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono-code text-neutral-400 uppercase">
                CONSENSUS LEDGER
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">Recent Blockchain Activity</h3>
            </div>
            <Link
              to="/admin/campaigns/camp_001/transactions"
              className="text-xs font-mono-code text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>All Transactions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-code">
              <thead className="bg-[#070A08] border-b border-[#1E2621] text-[11px] text-neutral-400 uppercase">
                <tr>
                  <th className="py-2.5 px-3">Operation Hash</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Block</th>
                  <th className="py-2.5 px-3 text-right">Explorer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18211C]">
                {transactions.slice(0, 5).map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#0D120F] transition-colors">
                    <td className="py-2.5 px-3 text-neutral-300 font-mono-code">
                      {tx.txHash.slice(0, 10)}...
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${tx.type === 'DONATION' ? 'text-[#00FF87] bg-[#00FF87]/10' : 'text-rose-400 bg-rose-500/10'}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-white">
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3 text-neutral-400">#{tx.blockNumber}</td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => setPreviewTx(tx)}
                        className="text-cyan-400 hover:underline text-[11px] inline-flex items-center gap-1"
                      >
                        <span>TzKT</span>
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

      {/* CAMPAIGN HEALTH STATUS (Section 21) */}
      <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono-code text-neutral-400 uppercase">
              INSTITUTIONAL AUDIT STATUS
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">Campaign Health & Audit Integrity</h3>
          </div>
          <ReconciliationBadge matches={true} diff={0} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono-code">
          <div className="p-3.5 rounded bg-[#111612] border border-[#00FF87]/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold font-sans">Student Emergency Assistance Fund</span>
              <span className="text-[#00FF87] font-bold">HEALTHY</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans">
              100% matched to block #4982142. All disbursements covered by pinned IPFS receipts.
            </p>
          </div>

          <div className="p-3.5 rounded bg-[#111612] border border-[#00FF87]/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold font-sans">Community Library Expansion</span>
              <span className="text-[#00FF87] font-bold">HEALTHY</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans">
              Vault balance ₹1,17,000 matches indexed storage. Multi-sig sign-offs in order.
            </p>
          </div>

          <div className="p-3.5 rounded bg-[#111612] border border-amber-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold font-sans">Flood Relief Preparedness Drive</span>
              <span className="text-amber-400 font-bold">COMPLETED / RECONCILED</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans">
              Campaign target met and closed. Final settlement report filed with district ombudsperson.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
