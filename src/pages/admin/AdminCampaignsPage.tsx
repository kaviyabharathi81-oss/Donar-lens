import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  PlusCircle,
  ShieldCheck,
  Search,
  ExternalLink,
  Cpu,
  Clock,
  ArrowRight,
  Database,
  ArrowUpRight,
} from 'lucide-react';
import { ReconciliationBadge } from '../../components/common/StatusBadges';

export const AdminCampaignsPage: React.FC = () => {
  const { campaigns } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'completed' | 'archived'>('active');
  const [search, setSearch] = useState('');

  const filtered = campaigns.filter((camp) => {
    const matchesSearch =
      camp.title.toLowerCase().includes(search.toLowerCase()) ||
      camp.organizer.toLowerCase().includes(search.toLowerCase());
    const matchesTab =
      activeTab === 'active'
        ? camp.status === 'active' || camp.status === 'nearly_funded'
        : camp.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Header (Section 22) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#18211C] gap-4">
        <div>
          <div className="text-xs font-mono-code text-purple-400 uppercase tracking-wider">
            PORTFOLIO MANAGEMENT
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            All Institutional Campaigns
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage escrow vaults, enforce multi-sig spending limits, and review ledger reconciliations.
          </p>
        </div>

        <Link
          to="/admin/campaigns/new"
          className="px-4 py-2.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs font-mono-code transition-colors flex items-center gap-1.5 w-fit"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Campaign</span>
        </Link>
      </div>

      {/* Tabs & Search (Section 22) */}
      <div className="p-4 rounded-lg bg-[#0A0D0B] border border-[#1E2621] flex flex-col sm:flex-row justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 font-mono-code">
          {(['active', 'upcoming', 'completed', 'archived'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded uppercase text-xs transition-colors ${
                activeTab === tab
                  ? 'bg-[#111612] text-[#00FF87] border border-[#00FF87]/40 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search campaigns..."
            className="w-full sm:w-64 bg-[#111612] border border-[#232D27] rounded px-3 py-1.5 pl-8 text-xs text-white focus:outline-none focus:border-[#00FF87]"
          />
        </div>
      </div>

      {/* Campaigns Table (Section 22) */}
      <div className="rounded-lg border border-[#1E2621] bg-[#0A0D0B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-code">
            <thead className="bg-[#070A08] border-b border-[#1E2621] text-[11px] text-neutral-400 uppercase">
              <tr>
                <th className="py-3 px-4">Campaign Name</th>
                <th className="py-3 px-4">Organizer</th>
                <th className="py-3 px-4">Goal</th>
                <th className="py-3 px-4">Raised</th>
                <th className="py-3 px-4">Spent</th>
                <th className="py-3 px-4">Remaining</th>
                <th className="py-3 px-4">Donors</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18211C]">
              {filtered.map((camp) => (
                <tr key={camp.id} className="hover:bg-[#0D120F] transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-white max-w-[200px]">
                    <Link
                      to={`/admin/campaigns/${camp.id}`}
                      className="hover:text-[#00FF87] transition-colors line-clamp-1"
                    >
                      {camp.title}
                    </Link>
                    <div className="text-[10px] text-neutral-500 font-mono-code">{camp.category}</div>
                  </td>
                  <td className="py-3 px-4 font-sans text-neutral-300">{camp.organizer}</td>
                  <td className="py-3 px-4 text-white">₹{camp.goal.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-[#00FF87] font-bold">
                    ₹{camp.raised.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-rose-400 font-bold">
                    ₹{camp.spent.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-cyan-400 font-bold">
                    ₹{camp.remaining.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-neutral-300">{camp.donorsCount}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#00FF87]">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/admin/campaigns/${camp.id}`}
                        className="px-2 py-1 rounded bg-[#111612] hover:bg-neutral-800 border border-[#232D27] text-neutral-200 text-[11px]"
                      >
                        Manage
                      </Link>
                      <Link
                        to={`/admin/campaigns/${camp.id}/audit`}
                        className="px-2 py-1 rounded bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-[11px]"
                      >
                        Audit
                      </Link>
                    </div>
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
