import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Search,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  FileText,
  Cpu,
  BarChart2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { ReconciliationBadge } from '../../components/common/StatusBadges';

export const LandingPage: React.FC = () => {
  const { campaigns, currentRole, setPreviewTx, setPreviewReceipt, expenses } = useApp();
  const navigate = useNavigate();

  const featured = campaigns[0]; // Student Emergency Assistance Fund
  const upcomingCampaigns = campaigns.filter((c) => c.status === 'upcoming');

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#1B231E_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/30 text-[#00FF87] text-xs font-mono-code">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-ping" />
            <span>TRANSPARENT GIVING. VERIFIABLE SPENDING.</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            See where every contribution goes.
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Transparent community giving with verifiable donations, controlled spending, supporting evidence, and accountable campaign management. Built for educational institutions, student unions, and community funds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/explore"
              className="px-6 py-3 rounded-md bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)] hover:scale-[1.02] flex items-center gap-2"
            >
              <span>Explore campaigns</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/verify"
              className="px-6 py-3 rounded-md bg-[#111612] hover:bg-[#161D18] border border-[#232D27] hover:border-[#00FF87]/40 text-neutral-200 text-xs font-mono-code transition-all flex items-center gap-2"
            >
              <Search className="w-3.5 h-3.5 text-[#00FF87]" />
              <span>Verify a donation</span>
            </Link>
          </div>
        </div>

        {/* Real Application Interface Preview (Section 10 & 47) */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="rounded-xl border border-[#232D27] bg-[#0A0E0C] p-2 shadow-2xl relative overflow-hidden">
            {/* Window title bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#18211C] bg-[#060807] rounded-t-lg text-xs font-mono-code text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FF87]/80" />
                <span className="ml-2 text-neutral-300 font-sans font-medium">
                  {featured.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ReconciliationBadge matches={true} diff={0} />
              </div>
            </div>

            {/* Inner Dashboard Telemetry Preview */}
            <div className="p-6 space-y-6">
              {/* Financial Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[#0F1411] border border-[#1E2621]">
                  <div className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider">
                    Total Raised
                  </div>
                  <div className="text-2xl font-bold font-mono-code text-white mt-1">
                    ₹{featured.raised.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-[#00FF87] mt-1 flex items-center gap-1 font-mono-code">
                    <CheckCircle2 className="w-3 h-3" /> 87 Verified Donors
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#0F1411] border border-[#1E2621]">
                  <div className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider">
                    Verified Spending
                  </div>
                  <div className="text-2xl font-bold font-mono-code text-rose-400 mt-1">
                    ₹{featured.spent.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1 font-mono-code">
                    23 Itemized Expenses
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#0F1411] border border-[#1E2621]">
                  <div className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider">
                    Remaining in Escrow
                  </div>
                  <div className="text-2xl font-bold font-mono-code text-[#00FF87] mt-1">
                    ₹{featured.remaining.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 font-mono-code">
                    100% Reconciled On-Chain
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-xs font-mono-code mb-1.5">
                  <span className="text-neutral-400">Campaign Funding Progress</span>
                  <span className="text-[#00FF87] font-bold">
                    {Math.round((featured.raised / featured.goal) * 100)}% of ₹{featured.goal.toLocaleString('en-IN')} Goal
                  </span>
                </div>
                <div className="w-full h-2 rounded bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-[#00FF87]"
                    style={{ width: `${(featured.raised / featured.goal) * 100}%` }}
                  />
                </div>
              </div>

              {/* Verified Expense Live Ledger Row */}
              <div className="p-3.5 rounded bg-[#111612] border border-[#232D27] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono-code text-[11px]">
                    LATEST EXPENSE
                  </span>
                  <div>
                    <span className="text-white font-medium">Hospital ICU Subsidy (₹48,000)</span>
                    <span className="text-neutral-400 ml-2 font-mono-code text-[11px]">
                      IPFS CID: bafybeicg2b...
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewReceipt(expenses[1])}
                  className="px-3 py-1 rounded bg-[#00FF87]/15 hover:bg-[#00FF87]/25 border border-[#00FF87]/30 text-[#00FF87] text-xs font-mono-code transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Inspect Receipt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS Section (Section 10) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
          <div className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider">
            SYSTEM ARCHITECTURE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">How It Works</h2>
          <p className="text-xs text-neutral-400">
            Four verifiable stages from public pledge to itemized expense reconciliation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'Discover',
              desc: 'Find a verified community campaign backed by official academic or civic verifiers.',
              tag: 'CAMPUS VERIFIED',
            },
            {
              num: '02',
              title: 'Contribute',
              desc: 'Make a donation and immediately receive an immutable Tezos transaction hash and receipt.',
              tag: 'ON-CHAIN ANCHOR',
            },
            {
              num: '03',
              title: 'Track',
              desc: 'See how funds are allocated and disbursed with itemized proof of vendor invoices on IPFS.',
              tag: 'MULTI-SIG AUDIT',
            },
            {
              num: '04',
              title: 'Verify',
              desc: 'Independently inspect cryptographic records and confirm zero balance discrepancy.',
              tag: 'ZERO DISCREPANCY',
            },
          ].map((item) => (
            <div
              key={item.num}
              className="p-6 rounded-lg bg-[#0A0D0B] border border-[#1E2621] hover:border-[#00FF87]/40 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold font-mono-code text-[#00FF87] group-hover:scale-105 transition-transform">
                  {item.num}
                </span>
                <span className="text-[10px] font-mono-code text-neutral-400 border border-neutral-800 px-1.5 py-0.5 rounded">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Campaigns Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider">
              ACTIVE INITIATIVES
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">Featured Campaigns</h2>
          </div>
          <Link
            to="/explore"
            className="text-xs font-mono-code text-[#00FF87] hover:underline flex items-center gap-1"
          >
            <span>View All Campaigns</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.slice(0, 3).map((camp) => (
            <div
              key={camp.id}
              className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] hover:border-neutral-600 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code text-neutral-400 mb-2">
                  <span className="text-emerald-400">{camp.category}</span>
                  <span className="flex items-center gap-1 text-[#00FF87]">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified by Official
                  </span>
                </div>
                <h3 className="text-base font-bold text-white line-clamp-1">{camp.title}</h3>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{camp.description}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#18211C]">
                <div>
                  <div className="flex justify-between text-xs font-mono-code mb-1">
                    <span className="text-neutral-400">Raised</span>
                    <span className="text-white font-bold">
                      ₹{camp.raised.toLocaleString('en-IN')} / ₹{camp.goal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full bg-[#00FF87]"
                      style={{ width: `${Math.min(100, (camp.raised / camp.goal) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-mono-code text-neutral-500">
                    {camp.donorsCount} Donors
                  </span>
                  <Link
                    to={`/campaign/${camp.id}`}
                    className="px-3 py-1.5 rounded bg-[#111612] hover:bg-[#161D18] border border-[#232D27] text-neutral-200 text-xs font-medium transition-colors"
                  >
                    View Campaign
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Campaigns Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono-code text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> COMING SOON TO CAMPUS & COMMUNITY
              </div>
              <h2 className="text-2xl font-bold text-white mt-1">Upcoming Campaigns</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Initiatives pending launch after smart contract deployment and auditor review.
              </p>
            </div>
            <Link
              to="/donor/upcoming"
              className="px-4 py-2 rounded bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-medium transition-colors inline-flex items-center gap-1.5 w-fit"
            >
              <span>Explore All Upcoming</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingCampaigns.map((camp) => (
              <div
                key={camp.id}
                className="p-4 rounded-lg bg-[#0F1411] border border-[#232D27] space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="text-purple-300">Launch: {camp.startDate}</span>
                  <span className="text-neutral-400">Goal: ₹{camp.goal.toLocaleString('en-IN')}</span>
                </div>
                <h4 className="font-bold text-white text-sm">{camp.title}</h4>
                <p className="text-xs text-neutral-400">{camp.tagline}</p>
                <div className="text-[11px] font-mono-code text-neutral-500 pt-2 border-t border-neutral-800">
                  Target Impact: {camp.expectedImpact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built For Accountability Pillars (Section 10) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
          <div className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider">
            INSTITUTIONAL INTEGRITY
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Built for Accountability</h2>
          <p className="text-xs text-neutral-400">
            A dual verification model separating on-chain cryptographic proofs from authorized human oversight.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Verified Donations',
              desc: 'Dual-state validation: Every pledge is first anchored on Tezos, then attested by institutional comptrollers.',
              icon: ShieldCheck,
            },
            {
              title: 'Receipt Evidence',
              desc: 'Itemized vendor invoices, bills, and purchase orders are permanently stored on IPFS with SHA-256 integrity hashes.',
              icon: FileText,
            },
            {
              title: 'Official Approvals',
              desc: 'Disbursements require M-of-N multi-sig authorizations by elected student leads, treasurers, and faculty auditors.',
              icon: Lock,
            },
            {
              title: 'Blockchain Records',
              desc: 'Smart contract escrow logic prevents retroactive alterations. The append-only ledger is universally verifiable.',
              icon: Cpu,
            },
            {
              title: 'Public Verification',
              desc: 'Anyone can input a transaction hash or campaign ID to verify zero discrepancy between records and vault balances.',
              icon: Search,
            },
            {
              title: 'Append-Only Auditing',
              desc: 'Records are never overwritten. Financial corrections are recorded as explicit, immutable compensating transactions.',
              icon: Layers,
            },
          ].map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-2.5"
              >
                <div className="w-8 h-8 rounded bg-[#00FF87]/10 border border-[#00FF87]/20 flex items-center justify-center text-[#00FF87]">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">{pillar.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-10 rounded-2xl bg-gradient-to-b from-[#0D1310] to-[#070A08] border border-[#232D27] space-y-6">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Ready to experience transparent community giving?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Test the complete end-to-end prototype now as a student donor or authorized administrator.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/signup"
              className="px-6 py-3 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(0,255,135,0.25)] flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/verify"
              className="px-6 py-3 rounded bg-[#111612] hover:bg-neutral-800 border border-[#232D27] text-neutral-200 text-xs font-mono-code transition-colors"
            >
              Verify Public Hash
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
