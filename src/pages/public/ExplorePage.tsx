import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, Filter, ShieldCheck, Clock, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CampaignStatus } from '../../types';

export const ExplorePage: React.FC = () => {
  const { campaigns } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [onlyVerified, setOnlyVerified] = useState(false);

  const categories = ['All', 'Education', 'Healthcare', 'Food relief', 'Emergency relief', 'Technology'];
  const statuses = ['All', 'active', 'nearly_funded', 'completed', 'upcoming'];

  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesSearch =
      camp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || camp.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || camp.status === selectedStatus;
    const matchesVerification = !onlyVerified || camp.verificationStatus === 'verified';
    return matchesSearch && matchesCategory && matchesStatus && matchesVerification;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider">
          PUBLIC CAMPAIGN DIRECTORY
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Discover Campaigns</h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
          Browse verified community initiatives, disaster response drives, and student welfare funds with open accounting.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, keywords, or organizer..."
              className="w-full bg-[#111612] border border-[#232D27] rounded-md pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00FF87]"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-mono-code text-neutral-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="rounded border-[#232D27] text-[#00FF87] focus:ring-0 bg-[#111612]"
              />
              <span className="flex items-center gap-1 text-[#00FF87]">
                <ShieldCheck className="w-3.5 h-3.5" /> Officially Verified Only
              </span>
            </label>
          </div>
        </div>

        {/* Category Pills & Status Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-800/60 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-neutral-500 font-mono-code text-[11px] mr-1">CATEGORY:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#00FF87] text-black font-semibold'
                    : 'bg-[#111612] text-neutral-400 hover:text-white border border-[#232D27]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-neutral-500 font-mono-code text-[11px]">STATUS:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#111612] border border-[#232D27] rounded px-2.5 py-1 text-xs text-neutral-300 focus:outline-none capitalize"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((camp) => {
          const percent = camp.goal > 0 ? Math.min(100, Math.round((camp.raised / camp.goal) * 100)) : 0;
          return (
            <div
              key={camp.id}
              className="rounded-lg bg-[#0A0D0B] border border-[#1E2621] hover:border-[#00FF87]/40 transition-all flex flex-col justify-between p-5 space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code mb-2.5">
                  <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                    {camp.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-[#00FF87] font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified by Official
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#00FF87] transition-colors line-clamp-1">
                  {camp.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {camp.description}
                </p>

                <div className="mt-3 text-[11px] text-neutral-500">
                  Organizer: <span className="text-neutral-300">{camp.organizer}</span>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#18211C]">
                {/* Funding Progress */}
                <div>
                  <div className="flex justify-between text-xs font-mono-code mb-1">
                    <span className="text-neutral-400">
                      ₹{camp.raised.toLocaleString('en-IN')}{' '}
                      <span className="text-neutral-600">/ ₹{camp.goal.toLocaleString('en-IN')}</span>
                    </span>
                    <span className="text-[#00FF87] font-semibold">{percent}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-[#00FF87]"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="flex items-center justify-between text-[11px] font-mono-code text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-neutral-500" />
                    {camp.donorsCount} Donors
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-500" />
                    Deadline: {camp.deadline}
                  </span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    to={`/campaign/${camp.id}`}
                    className="py-1.5 rounded bg-[#111612] hover:bg-[#161D18] border border-[#232D27] text-neutral-300 text-center text-xs font-medium transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/donor/campaigns/${camp.id}/donate`}
                    className="py-1.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-center text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Contribute</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="p-12 text-center rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-3">
          <p className="text-neutral-400 text-xs">No initiatives matched your filter criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedStatus('All');
              setOnlyVerified(false);
            }}
            className="text-xs text-[#00FF87] underline font-mono-code"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
};
