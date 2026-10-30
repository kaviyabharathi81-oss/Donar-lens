import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, ShieldCheck, Clock, Users, ArrowUpRight, Bookmark } from 'lucide-react';

export const DonorExplorePage: React.FC = () => {
  const { campaigns, savedCampaignIds, toggleSaveCampaign } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const categories = ['All', 'Education', 'Healthcare', 'Food relief', 'Emergency relief', 'Technology'];

  const filtered = campaigns.filter((camp) => {
    const matchesSearch =
      camp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || camp.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || camp.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider">
          CAMPAIGN EXPLORER
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Discover Campaigns
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Support verified campus initiatives, community drives, and emergency welfare pools.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-lg bg-[#0A0D0B] border border-[#1E2621] space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search campaigns by keyword, category, or cause..."
            className="w-full bg-[#111612] border border-[#232D27] rounded px-3 py-2 pl-9 text-xs text-white focus:outline-none focus:border-[#00FF87]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex flex-wrap gap-1.5">
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

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#111612] border border-[#232D27] rounded px-2.5 py-1 text-xs text-neutral-300 font-mono-code focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="active">Active Open</option>
            <option value="nearly_funded">Nearly Funded</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((camp) => {
          const percent = camp.goal > 0 ? Math.min(100, Math.round((camp.raised / camp.goal) * 100)) : 0;
          const isSaved = savedCampaignIds.includes(camp.id);

          return (
            <div
              key={camp.id}
              className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] hover:border-[#00FF87]/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                  <span className="text-emerald-400">{camp.category}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="flex items-center gap-1 text-[11px] text-[#00FF87]">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                    <button
                      onClick={() => toggleSaveCampaign(camp.id)}
                      className="p-1 text-neutral-400 hover:text-white"
                      title={isSaved ? 'Bookmarked' : 'Bookmark'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-[#00FF87] fill-[#00FF87]' : ''}`} />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-white text-base line-clamp-1">{camp.title}</h3>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {camp.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#18211C]">
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

                <div className="flex items-center justify-between text-[11px] font-mono-code text-neutral-400">
                  <span>{camp.donorsCount} Donors</span>
                  <span>End: {camp.deadline}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 font-mono-code">
                  <Link
                    to={`/donor/campaigns/${camp.id}`}
                    className="py-1.5 rounded bg-[#111612] hover:bg-[#161D18] border border-[#232D27] text-neutral-200 text-center text-xs"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/donor/campaigns/${camp.id}/donate`}
                    className="py-1.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-center text-xs flex items-center justify-center gap-1"
                  >
                    <span>Donate</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
