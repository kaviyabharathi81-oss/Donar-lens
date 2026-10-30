import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  Bookmark,
  Bell,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
  Users,
} from 'lucide-react';

export const DonorUpcomingPage: React.FC = () => {
  const { campaigns, savedCampaignIds, toggleSaveCampaign } = useApp();
  const [notifiedIds, setNotifiedIds] = useState<string[]>([]);

  const upcomingList = campaigns.filter((c) => c.status === 'upcoming');

  const handleNotifyMe = (id: string) => {
    setNotifiedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="text-xs font-mono-code text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" /> PIPELINE INITIATIVES
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Upcoming Community Campaigns
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Future institutional initiatives awaiting smart contract activation. Set reminders and save early pledges.
        </p>
      </div>

      {/* Timeline Presentation of Upcoming Initiatives (Section 17) */}
      <div className="space-y-4">
        {upcomingList.map((camp, idx) => {
          const isSaved = savedCampaignIds.includes(camp.id);
          const isNotified = notifiedIds.includes(camp.id);

          return (
            <div
              key={camp.id}
              className="p-6 rounded-xl bg-[#090D0B] border border-[#1E2621] hover:border-purple-500/40 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#18211C] gap-3">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono-code text-xs font-semibold">
                    LAUNCH: {camp.startDate}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono-code text-xs">
                    {camp.category}
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono-code text-[#00FF87]">
                    <ShieldCheck className="w-3.5 h-3.5" /> Official Auditor Assigned
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleNotifyMe(camp.id)}
                    className={`px-3 py-1.5 rounded text-xs font-mono-code transition-colors flex items-center gap-1.5 border ${
                      isNotified
                        ? 'bg-[#00FF87]/20 border-[#00FF87] text-[#00FF87]'
                        : 'bg-[#111612] border-[#232D27] text-neutral-300 hover:text-white'
                    }`}
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>{isNotified ? 'Reminder Set' : 'Notify Me'}</span>
                  </button>

                  <button
                    onClick={() => toggleSaveCampaign(camp.id)}
                    className={`p-1.5 rounded border transition-colors ${
                      isSaved
                        ? 'bg-[#00FF87]/20 border-[#00FF87] text-[#00FF87]'
                        : 'bg-[#111612] border-[#232D27] text-neutral-400 hover:text-white'
                    }`}
                    title={isSaved ? 'Remove Bookmark' : 'Bookmark Campaign'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{camp.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1 font-sans leading-relaxed">
                  {camp.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono-code">
                <div className="p-3 rounded bg-[#0F1411] border border-[#1E2621]">
                  <div className="text-neutral-500 uppercase text-[10px]">Funding Goal</div>
                  <div className="text-white font-bold text-sm mt-0.5">
                    ₹{camp.goal.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-3 rounded bg-[#0F1411] border border-[#1E2621]">
                  <div className="text-neutral-500 uppercase text-[10px]">Organizer Lead</div>
                  <div className="text-neutral-200 mt-0.5 truncate">{camp.organizer}</div>
                </div>

                <div className="p-3 rounded bg-[#0F1411] border border-[#1E2621]">
                  <div className="text-neutral-500 uppercase text-[10px]">Expected Direct Impact</div>
                  <div className="text-emerald-400 mt-0.5 truncate">{camp.expectedImpact}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#18211C] text-xs">
                <span className="text-neutral-500 font-mono-code">
                  Pre-registration: 18 students interested
                </span>
                <Link
                  to={`/campaign/${camp.id}`}
                  className="text-xs font-mono-code text-[#00FF87] hover:underline flex items-center gap-1"
                >
                  <span>View Full Prospectus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
