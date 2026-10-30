import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Bookmark, ArrowRight, ShieldCheck, ArrowUpRight, Trash2 } from 'lucide-react';

export const DonorSavedPage: React.FC = () => {
  const { campaigns, savedCampaignIds, toggleSaveCampaign } = useApp();

  const savedList = campaigns.filter((c) => savedCampaignIds.includes(c.id));

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider flex items-center gap-1.5">
          <Bookmark className="w-3.5 h-3.5" /> SAVED INITIATIVES
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Saved Campaigns
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Bookmarked active campaigns and upcoming drives you're tracking.
        </p>
      </div>

      {savedList.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0A0D0B] border border-[#1E2621] space-y-3">
          <Bookmark className="w-8 h-8 text-neutral-600 mx-auto" />
          <p className="text-neutral-400 text-xs">You haven't bookmarked any campaigns yet.</p>
          <Link
            to="/donor/explore"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#00FF87] text-black font-semibold text-xs"
          >
            <span>Explore Community Campaigns</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedList.map((camp) => (
            <div
              key={camp.id}
              className="p-5 rounded-lg bg-[#0A0D0B] border border-[#1E2621] hover:border-[#00FF87]/30 transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                  <span className="text-emerald-400">{camp.category}</span>
                  <button
                    onClick={() => toggleSaveCampaign(camp.id)}
                    className="text-neutral-500 hover:text-rose-400 p-1 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-bold text-white text-base">{camp.title}</h3>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{camp.description}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#18211C] font-mono-code text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Raised / Goal:</span>
                  <span className="text-white font-bold">
                    ₹{camp.raised.toLocaleString('en-IN')} / ₹{camp.goal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/donor/campaigns/${camp.id}`}
                    className="flex-1 py-1.5 rounded bg-[#111612] hover:bg-[#161D18] border border-[#232D27] text-center text-neutral-200 text-xs"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/donor/campaigns/${camp.id}/donate`}
                    className="flex-1 py-1.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-center text-xs flex items-center justify-center gap-1"
                  >
                    <span>Contribute</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
