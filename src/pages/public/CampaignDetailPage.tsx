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
  Users,
  Wallet,
  Calendar,
  Layers,
  ArrowUpRight,
  Download,
  AlertTriangle,
} from 'lucide-react';
import {
  BlockchainBadge,
  OfficialBadge,
  ReconciliationBadge,
  LayerTag,
} from '../../components/common/StatusBadges';
import {
  CampaignFundingProgressChart,
  CampaignCategoryExpenseChart,
} from '../../components/charts/DashboardCharts';

export const CampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { campaigns, donations, expenses, setPreviewReceipt, setPreviewTx } = useApp();

  const campaign = campaigns.find((c) => c.id === id) || campaigns[0];
  const campaignDonations = donations.filter((d) => d.campaignId === campaign.id);
  const campaignExpenses = expenses.filter((e) => e.campaignId === campaign.id);

  const [activeTab, setActiveTab] = useState<
    'about' | 'financial' | 'donations' | 'expenses' | 'verification'
  >('financial');

  const percent = campaign.goal > 0 ? Math.min(100, Math.round((campaign.raised / campaign.goal) * 100)) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Campaign Header & Hero Card */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-mono-code">
                {campaign.category}
              </span>
              <OfficialBadge status="VERIFIED" />
              <span className="px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono-code">
                STATUS: {campaign.status.toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{campaign.title}</h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">{campaign.tagline}</p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <Link
              to={`/donor/campaigns/${campaign.id}/donate`}
              className="px-6 py-3 rounded-md bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(0,255,135,0.25)] flex items-center gap-2"
            >
              <span>Donate now</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setActiveTab('expenses')}
              className="px-4 py-3 rounded-md bg-[#111612] hover:bg-[#161D18] border border-[#232D27] text-neutral-300 text-xs font-mono-code transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-[#00FF87]" />
              <span>Track spending</span>
            </button>
          </div>
        </div>

        {/* Financial Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#18211C]">
          <div className="p-3.5 rounded-lg bg-[#0F1411] border border-[#1E2621]">
            <div className="text-[11px] font-mono-code text-neutral-400 uppercase">Target Goal</div>
            <div className="text-xl font-bold font-mono-code text-white mt-1">
              ₹{campaign.goal.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-neutral-500 mt-0.5">Budget Cap</div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#0F1411] border border-[#1E2621]">
            <div className="text-[11px] font-mono-code text-neutral-400 uppercase">Total Raised</div>
            <div className="text-xl font-bold font-mono-code text-white mt-1">
              ₹{campaign.raised.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-[#00FF87] mt-0.5 font-mono-code">
              {percent}% Funded
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#0F1411] border border-[#1E2621]">
            <div className="text-[11px] font-mono-code text-neutral-400 uppercase">Disbursed (Spent)</div>
            <div className="text-xl font-bold font-mono-code text-rose-400 mt-1">
              ₹{campaign.spent.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5 font-mono-code">
              {campaignExpenses.length} Receipts Pinned
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#0F1411] border border-[#1E2621]">
            <div className="text-[11px] font-mono-code text-neutral-400 uppercase">Remaining in Escrow</div>
            <div className="text-xl font-bold font-mono-code text-[#00FF87] mt-1">
              ₹{campaign.remaining.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-400 mt-0.5 font-mono-code">
              100% Reconciled
            </div>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono-code">
            <span className="text-neutral-400">Total Funds Accumulated</span>
            <span className="text-[#00FF87] font-semibold">
              ₹{campaign.raised.toLocaleString('en-IN')} / ₹{campaign.goal.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="w-full h-2 rounded bg-neutral-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-[#00FF87]"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* On-Chain Reconciliation Banner */}
        <div className="p-4 rounded-lg bg-[#0D120F] border border-[#1E2621] flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code">
          <div className="flex items-center gap-3">
            <ReconciliationBadge matches={true} diff={0} />
            <div className="text-neutral-400 hidden sm:block">
              Recorded Balance: <span className="text-white font-bold">₹{campaign.remaining.toLocaleString('en-IN')}</span> |
              Indexed Balance: <span className="text-white font-bold">₹{campaign.indexedBalance.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">Contract:</span>
            <span className="text-cyan-400">{campaign.contractAddress.slice(0, 10)}...{campaign.contractAddress.slice(-4)}</span>
            <LayerTag layer="ON-CHAIN" />
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#1E2621] text-xs font-mono-code overflow-x-auto pb-1">
        {[
          { key: 'financial', label: 'Financial Progress & Analytics' },
          { key: 'expenses', label: `Itemized Expenses & Receipts (${campaignExpenses.length})` },
          { key: 'donations', label: `Verified Donations (${campaignDonations.length})` },
          { key: 'about', label: 'Initiative Overview & Impact' },
          { key: 'verification', label: 'Smart Contract & Multi-Sig Rules' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2.5 rounded-t font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-[#111612] text-[#00FF87] border-t-2 border-t-[#00FF87] border-x border-[#1E2621]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Financial Progress */}
      {activeTab === 'financial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-neutral-400">FUNDING VELOCITY</span>
                <span className="text-xs text-[#00FF87] font-mono-code">Accumulation vs Spend</span>
              </div>
              <CampaignFundingProgressChart
                goal={campaign.goal}
                raised={campaign.raised}
                spent={campaign.spent}
              />
            </div>

            <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-neutral-400">DISBURSEMENT BY CATEGORY</span>
                <span className="text-xs text-neutral-400 font-mono-code">Audited Vouchers</span>
              </div>
              <CampaignCategoryExpenseChart />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Expenses & Receipts Table */}
      {activeTab === 'expenses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono-code">
            <div className="text-neutral-400">
              EVERY EXPENDITURE BACKED BY IPFS ITEMIZATION & MULTI-SIG APPROVAL
            </div>
            <span className="text-[#00FF87]">{campaignExpenses.length} Audited Expenditures</span>
          </div>

          <div className="rounded-lg border border-[#1E2621] bg-[#0A0D0B] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#070A08] border-b border-[#1E2621] text-[11px] font-mono-code text-neutral-400 uppercase">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Item & Vendor</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Multi-Sig Status</th>
                    <th className="py-3 px-4">Receipt Proof</th>
                    <th className="py-3 px-4">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#18211C] font-mono-code text-xs">
                  {campaignExpenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-[#0D120F] transition-colors">
                      <td className="py-3 px-4 text-neutral-400">{exp.date}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px]">
                          {exp.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-sans">
                        <div className="font-semibold text-white">{exp.description}</div>
                        <div className="text-[11px] text-neutral-400 font-mono-code">Vendor: {exp.vendor}</div>
                      </td>
                      <td className="py-3 px-4 font-bold text-rose-400">
                        ₹{exp.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        {exp.status === 'APPROVED' ? (
                          <span className="text-[#00FF87] flex items-center gap-1 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> 3/3 Signed
                          </span>
                        ) : (
                          <span className="text-amber-400 flex items-center gap-1 text-[11px]">
                            <Clock className="w-3.5 h-3.5" /> 2/3 Pending Auditor
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => setPreviewReceipt(exp)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#00FF87]/10 hover:bg-[#00FF87]/20 border border-[#00FF87]/30 text-[#00FF87] text-[11px] transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View PDF (IPFS)</span>
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        {exp.txHash ? (
                          <button
                            onClick={() =>
                              setPreviewTx({
                                id: exp.id,
                                txHash: exp.txHash!,
                                type: 'EXPENSE',
                                amount: exp.amount,
                                campaignId: campaign.id,
                                campaignTitle: campaign.title,
                                walletAddress: 'tz1h3rQ8wToHLY5fsXTCCDH3LsnvaQF10D7a',
                                blockNumber: exp.blockNumber || 4982420,
                                timestamp: exp.date,
                                status: 'CONFIRMED',
                                verification: 'OFFICIALLY_VERIFIED',
                                gasUsed: '0.00280 XTZ',
                                contract: campaign.contractAddress,
                              })
                            }
                            className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                          >
                            <span>{exp.txHash.slice(0, 8)}...</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-neutral-500 text-[11px]">Pending Ledger Block</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Donations Table */}
      {activeTab === 'donations' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono-code">
            <span className="text-neutral-400">TRANSPARENT PUBLIC DONATION LEDGER</span>
            <span className="text-[#00FF87]">{campaignDonations.length} Tracked Contributions</span>
          </div>

          <div className="rounded-lg border border-[#1E2621] bg-[#0A0D0B] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono-code">
                <thead className="bg-[#070A08] border-b border-[#1E2621] text-[11px] text-neutral-400 uppercase">
                  <tr>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Contributor</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Blockchain Status</th>
                    <th className="py-3 px-4">Official Verification</th>
                    <th className="py-3 px-4">Transaction Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#18211C]">
                  {campaignDonations.map((don) => (
                    <tr key={don.id} className="hover:bg-[#0D120F] transition-colors">
                      <td className="py-3 px-4 text-neutral-400">
                        {new Date(don.timestamp).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-sans font-medium text-white">
                        {don.isAnonymous ? 'Anonymous Donor' : don.donorName}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#00FF87]">
                        ₹{don.amount.toLocaleString('en-IN')}
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
                              campaignId: campaign.id,
                              campaignTitle: campaign.title,
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
                          className="text-neutral-400 hover:text-white flex items-center gap-1 text-[11px] hover:underline"
                        >
                          <span>{don.txHash.slice(0, 10)}...</span>
                          <ArrowUpRight className="w-3 h-3 text-[#00FF87]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: About & Impact */}
      {activeTab === 'about' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-3">
              <h3 className="text-base font-bold text-white">About the Campaign</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {campaign.description}
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-3">
              <h3 className="text-base font-bold text-white">Targeted Impact</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {campaign.expectedImpact}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-3 text-xs font-mono-code">
              <span className="text-neutral-400 uppercase">OFFICIAL ORGANIZER</span>
              <div className="text-white font-bold font-sans text-sm">{campaign.organizer}</div>
              <div className="text-neutral-400 font-sans">{campaign.organizerRole}</div>
              <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-500 font-sans">
                Location: {campaign.location}
              </div>
            </div>

            <div className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-3 text-xs font-mono-code">
              <span className="text-[#00FF87] uppercase flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> INSTITUTIONAL VERIFIER
              </span>
              <div className="text-white font-bold font-sans text-sm">{campaign.officialVerifier}</div>
              <div className="text-neutral-400 font-sans">{campaign.officialVerifierRole}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Verification & Governance Rules */}
      {activeTab === 'verification' && (
        <div className="p-6 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-5 text-xs font-mono-code">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <span className="text-base font-bold text-white font-sans">
              Smart Contract Governance Parameters
            </span>
            <span className="text-[#00FF87]">STATUS: DEPLOYED & AUDITED</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded bg-[#111612] border border-[#232D27] space-y-1.5">
              <span className="text-neutral-400">Tezos Smart Contract Address</span>
              <div className="text-cyan-400 font-bold break-all select-all">{campaign.contractAddress}</div>
            </div>

            <div className="p-4 rounded bg-[#111612] border border-[#232D27] space-y-1.5">
              <span className="text-neutral-400">Per-Transaction Spending Limit</span>
              <div className="text-[#00FF87] font-bold">
                ₹{campaign.governance.spendingLimitPerTx.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-4 rounded bg-[#111612] border border-[#232D27] space-y-1.5">
              <span className="text-neutral-400">Multi-Sig Approver Quorum</span>
              <div className="text-white font-bold">
                {campaign.governance.minimumApprovers} of 3 Authorized Signatures Required
              </div>
            </div>

            <div className="p-4 rounded bg-[#111612] border border-[#232D27] space-y-1.5">
              <span className="text-neutral-400">Supporting Evidence Requirement</span>
              <div className="text-purple-300 font-bold">
                Mandatory IPFS Invoice Pinning Prior to Release
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
