import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ExternalLink,
  Copy,
  Wallet,
  Cpu,
  Layers,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { BlockchainBadge, OfficialBadge, ReconciliationBadge } from '../../components/common/StatusBadges';

export const DonorDonationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { donations, campaigns, setPreviewTx } = useApp();
  const navigate = useNavigate();

  const donation = donations.find((d) => d.id === id) || donations[0];
  const campaign = campaigns.find((c) => c.id === donation.campaignId) || campaigns[0];

  const isVerified = donation.officialStatus === 'VERIFIED';

  // 5-Stage Timeline (Section 16)
  const timeline = [
    {
      title: 'Donation Initiated',
      desc: `Pledge of ₹${donation.amount.toLocaleString('en-IN')} signed by wallet ${donation.walletAddress.slice(0, 8)}...`,
      status: 'completed',
      time: new Date(donation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      title: 'Transaction Submitted',
      desc: 'Broadcast to Tezos Ghostnet mempool with zero-knowledge cryptographic signature.',
      status: 'completed',
      time: '+1.2s',
    },
    {
      title: 'Blockchain Confirmed',
      desc: `Confirmed on block #${donation.blockNumber} with contract storage execution.`,
      status: 'completed',
      time: '+3.5s',
    },
    {
      title: 'Officially Indexed',
      desc: 'TzKT and Filecoin IPFS evidence node indexed operation state into public query graph.',
      status: 'completed',
      time: '+5.0s',
    },
    {
      title: 'Donation Officially Verified',
      desc: isVerified
        ? `Officially attested by ${donation.verifiedBy || 'Dr. Priya Sundaram (Chief Financial Comptroller)'}. Settlement matched with nodal statements.`
        : 'In authorized official audit queue. Review against nodal banking escrow in progress.',
      status: isVerified ? 'completed' : 'pending',
      time: isVerified ? 'Verified' : 'Pending Review',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/donor/donations"
        className="text-xs font-mono-code text-neutral-400 hover:text-white flex items-center gap-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to My Contributions</span>
      </Link>

      {/* Main Detail Header Card */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#18211C] gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-mono-code text-white">
                ₹{donation.amount.toLocaleString('en-IN')}
              </span>
              <OfficialBadge status={donation.officialStatus} />
              <BlockchainBadge status={donation.blockchainStatus} size="sm" />
            </div>
            <h1 className="text-base font-bold text-neutral-200 font-sans">
              Contributed to {donation.campaignTitle}
            </h1>
            <div className="text-xs text-neutral-400 font-mono-code">
              Donation Reference: {donation.id} | Date: {new Date(donation.timestamp).toUTCString()}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/verify/${donation.txHash}`)}
              className="px-3.5 py-2 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs font-mono-code flex items-center gap-1.5 transition-colors"
            >
              <span>Public Verification</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Cryptographic Operation Data (Section 16) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono-code">
          <div className="p-3 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">Consensus Network</div>
            <div className="text-white font-bold mt-0.5">{donation.network}</div>
          </div>

          <div className="p-3 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">Block Number</div>
            <div className="text-[#00FF87] font-bold mt-0.5">#{donation.blockNumber}</div>
          </div>

          <div className="p-3 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">Wallet Address</div>
            <div className="text-neutral-300 mt-0.5 truncate">{donation.walletAddress.slice(0, 10)}...</div>
          </div>

          <div className="p-3 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">Network Gas Fee</div>
            <div className="text-neutral-300 mt-0.5">{donation.networkFee} INR</div>
          </div>
        </div>

        {/* Transaction Hash */}
        <div className="p-3.5 rounded bg-black/60 border border-neutral-800 space-y-1 text-xs font-mono-code">
          <div className="text-neutral-500 uppercase text-[10px]">Tezos Operation Group Hash</div>
          <div className="text-neutral-200 break-all select-all">{donation.txHash}</div>
        </div>

        {/* 5-Stage Verification Timeline (Section 16) */}
        <div className="pt-2 space-y-4">
          <h3 className="text-xs font-mono-code uppercase text-neutral-400 tracking-wider">
            Lifecycle & Attestation Progression
          </h3>

          <div className="space-y-4 relative pl-4 border-l-2 border-[#1E2621]">
            {timeline.map((item, idx) => (
              <div key={item.title} className="relative group">
                <div
                  className={`absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                    item.status === 'completed'
                      ? 'bg-[#00FF87] border-black shadow-[0_0_8px_#00FF87]'
                      : 'bg-neutral-900 border-amber-400'
                  }`}
                />
                <div className="text-xs font-mono-code">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-bold ${
                        item.status === 'completed' ? 'text-white' : 'text-amber-400'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="text-[11px] text-neutral-500">{item.time}</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Financial Impact (Section 16) */}
        <div className="p-5 rounded-lg bg-[#0E1310] border border-[#232D27] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono-code">
            <span className="text-neutral-400 uppercase">DIRECT CAMPAIGN IMPACT</span>
            <span className="text-[#00FF87] font-bold">
              {((donation.amount / campaign.goal) * 100).toFixed(2)}% of Target Goal
            </span>
          </div>

          <p className="text-xs text-neutral-300 font-sans leading-relaxed">
            Your pledge of ₹{donation.amount.toLocaleString('en-IN')} contributes directly to the reserve pool of{' '}
            <strong>{campaign.title}</strong>, which has supported 42 emergency subsidies to date.
          </p>

          <div className="pt-2 flex items-center justify-between text-xs font-mono-code border-t border-neutral-800 text-neutral-400">
            <span>Campaign Raised: ₹{campaign.raised.toLocaleString('en-IN')}</span>
            <span>Target Goal: ₹{campaign.goal.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
