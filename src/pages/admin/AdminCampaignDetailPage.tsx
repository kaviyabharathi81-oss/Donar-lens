import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
  Lock,
  Cpu,
  Layers,
  CheckSquare,
  Receipt,
  Database,
  ArrowUpRight,
} from 'lucide-react';
import {
  CampaignFundingProgressChart,
  CampaignCategoryExpenseChart,
} from '../../components/charts/DashboardCharts';
import {
  BlockchainBadge,
  OfficialBadge,
  ReconciliationBadge,
  LayerTag,
} from '../../components/common/StatusBadges';

export const AdminCampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { campaigns, donations, expenses, setPreviewReceipt, setPreviewTx } = useApp();

  const campaign = campaigns.find((c) => c.id === id) || campaigns[0];
  const campaignDonations = donations.filter((d) => d.campaignId === campaign.id);
  const campaignExpenses = expenses.filter((e) => e.campaignId === campaign.id);

  const pendingDonations = campaignDonations.filter((d) => d.officialStatus === 'PENDING_REVIEW').length;
  const pendingApprovals = campaignExpenses.filter((e) => e.status === 'PENDING_APPROVAL').length;

  return (
    <div className="space-y-6">
      {/* Campaign Header & Overview (Section 24) */}
      <div className="p-6 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-[#18211C] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code mb-1">
              <span className="text-purple-400 font-bold">CAMPAIGN VAULT CONSOLE</span>
              <span className="text-neutral-600">|</span>
              <span className="text-neutral-400">ID: {campaign.id}</span>
              <LayerTag layer="ON-CHAIN" />
            </div>
            <h1 className="text-2xl font-bold text-white">{campaign.title}</h1>
            <p className="text-xs text-neutral-400 mt-0.5">Contract: {campaign.contractAddress}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code">
            <Link
              to={`/admin/campaigns/${campaign.id}/donations`}
              className="px-3 py-2 rounded bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 flex items-center gap-1.5 transition-colors"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Verify Donations ({pendingDonations})</span>
            </Link>

            <Link
              to={`/admin/campaigns/${campaign.id}/approvals`}
              className="px-3 py-2 rounded bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 flex items-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Approvals Center ({pendingApprovals})</span>
            </Link>

            <Link
              to={`/admin/campaigns/${campaign.id}/expenses`}
              className="px-3 py-2 rounded bg-[#111612] hover:bg-[#161D18] border border-[#232D27] text-neutral-300 flex items-center gap-1.5"
            >
              <Receipt className="w-3.5 h-3.5 text-[#00FF87]" />
              <span>Submit Expense</span>
            </Link>
          </div>
        </div>

        {/* Financial Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono-code">
          <div className="p-3.5 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">Funding Goal</div>
            <div className="text-lg font-bold text-white mt-1">₹{campaign.goal.toLocaleString('en-IN')}</div>
          </div>

          <div className="p-3.5 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">Total Raised</div>
            <div className="text-lg font-bold text-[#00FF87] mt-1">₹{campaign.raised.toLocaleString('en-IN')}</div>
          </div>

          <div className="p-3.5 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">Total Spent</div>
            <div className="text-lg font-bold text-rose-400 mt-1">₹{campaign.spent.toLocaleString('en-IN')}</div>
          </div>

          <div className="p-3.5 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">Remaining in Escrow</div>
            <div className="text-lg font-bold text-[#00FF87] mt-1">₹{campaign.remaining.toLocaleString('en-IN')}</div>
          </div>
        </div>

        {/* Progress Bar & Reconciliation Status */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono-code">
            <span className="text-neutral-400">Escrow Progress</span>
            <span className="text-[#00FF87] font-semibold">
              {Math.round((campaign.raised / campaign.goal) * 100)}% Funded
            </span>
          </div>
          <div className="w-full h-1.5 rounded bg-neutral-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-[#00FF87]"
              style={{ width: `${Math.min(100, (campaign.raised / campaign.goal) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-3 rounded bg-[#0D120F] border border-[#1E2621] flex flex-wrap items-center justify-between text-xs font-mono-code">
          <ReconciliationBadge matches={true} diff={0} />
          <div className="text-neutral-400">
            Per-Tx Limit: <strong className="text-white">₹{campaign.governance.spendingLimitPerTx.toLocaleString('en-IN')}</strong> |
            Quorum: <strong className="text-white">{campaign.governance.minimumApprovers} Approvers</strong>
          </div>
        </div>
      </div>

      {/* TWO CHARTS REQUIRED ON CAMPAIGN ADMIN (Section 24 & 38) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-[#00FF87] uppercase">CHART 1 — FUNDING PROGRESS</span>
            <LayerTag layer="ON-CHAIN" />
          </div>
          <CampaignFundingProgressChart
            goal={campaign.goal}
            raised={campaign.raised}
            spent={campaign.spent}
          />
        </div>

        <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code text-rose-400 uppercase">CHART 2 — EXPENSE DISTRIBUTION</span>
            <LayerTag layer="IPFS" />
          </div>
          <CampaignCategoryExpenseChart />
        </div>
      </div>

      {/* Quick Nav Tabs to Sub-modules (Section 24) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono-code">
        <Link
          to={`/admin/campaigns/${campaign.id}/donations`}
          className="p-3 rounded bg-[#0A0D0B] border border-[#1E2621] hover:border-[#00FF87]/40 text-center transition-colors"
        >
          <div className="text-white font-bold">Donations</div>
          <div className="text-amber-400 text-[11px] mt-0.5">{pendingDonations} Pending</div>
        </Link>

        <Link
          to={`/admin/campaigns/${campaign.id}/expenses`}
          className="p-3 rounded bg-[#0A0D0B] border border-[#1E2621] hover:border-[#00FF87]/40 text-center transition-colors"
        >
          <div className="text-white font-bold">Expenses</div>
          <div className="text-neutral-400 text-[11px] mt-0.5">{campaignExpenses.length} Total</div>
        </Link>

        <Link
          to={`/admin/campaigns/${campaign.id}/approvals`}
          className="p-3 rounded bg-[#0A0D0B] border border-[#1E2621] hover:border-[#00FF87]/40 text-center transition-colors"
        >
          <div className="text-white font-bold">Approvals</div>
          <div className="text-purple-300 text-[11px] mt-0.5">{pendingApprovals} Pending</div>
        </Link>

        <Link
          to={`/admin/campaigns/${campaign.id}/transactions`}
          className="p-3 rounded bg-[#0A0D0B] border border-[#1E2621] hover:border-[#00FF87]/40 text-center transition-colors"
        >
          <div className="text-white font-bold">Transactions</div>
          <div className="text-cyan-400 text-[11px] mt-0.5">Explorer</div>
        </Link>

        <Link
          to={`/admin/campaigns/${campaign.id}/audit`}
          className="p-3 rounded bg-[#0A0D0B] border border-[#1E2621] hover:border-[#00FF87]/40 text-center transition-colors"
        >
          <div className="text-white font-bold">Audit Trail</div>
          <div className="text-emerald-400 text-[11px] mt-0.5">Append-Only</div>
        </Link>
      </div>
    </div>
  );
};
