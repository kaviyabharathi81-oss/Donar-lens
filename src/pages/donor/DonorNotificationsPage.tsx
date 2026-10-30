import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCircle2, ShieldCheck, FileText, ArrowRight, Layers, Sparkles } from 'lucide-react';

export const DonorNotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead } = useApp();

  const donorNotifs = notifications.filter((n) => n.targetRole === 'donor' || n.targetRole === 'all');

  const today = donorNotifs.filter((n) => n.timestamp.startsWith('2026-10-29') || n.timestamp.startsWith('2026-10-30'));
  const yesterday = donorNotifs.filter((n) => n.timestamp.startsWith('2026-10-28'));
  const earlier = donorNotifs.filter((n) => !n.timestamp.startsWith('2026-10-29') && !n.timestamp.startsWith('2026-10-30') && !n.timestamp.startsWith('2026-10-28'));

  const renderGroup = (title: string, list: typeof donorNotifs) => {
    if (list.length === 0) return null;
    return (
      <div className="space-y-3">
        <h3 className="text-xs font-mono-code uppercase text-neutral-400 tracking-wider">
          {title}
        </h3>
        <div className="space-y-2">
          {list.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              className={`p-4 rounded-lg border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                item.read
                  ? 'bg-[#0A0D0B] border-[#1E2621] opacity-75'
                  : 'bg-[#0F1411] border-[#00FF87]/30 shadow-[0_0_10px_rgba(0,255,135,0.08)]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-[#00FF87]/10 text-[#00FF87] border border-[#00FF87]/20 shrink-0 mt-0.5">
                  {item.type === 'verification' && <ShieldCheck className="w-4 h-4" />}
                  {item.type === 'donation' && <CheckCircle2 className="w-4 h-4" />}
                  {item.type === 'expense' && <FileText className="w-4 h-4" />}
                  {item.type === 'system' && <Layers className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white text-xs">{item.title}</h4>
                    {!item.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">{item.description}</p>
                  <span className="text-[10px] font-mono-code text-neutral-500 mt-1 block">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>

              {item.link && (
                <Link
                  to={item.link}
                  className="px-2.5 py-1 rounded bg-[#111612] border border-[#232D27] text-neutral-300 hover:text-white text-xs font-mono-code shrink-0 flex items-center gap-1"
                >
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <div className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5" /> NOTIFICATION INBOX
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Notifications & Attestations
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Real-time alerts on donation confirmations, expense disbursements, and auditor verification status.
        </p>
      </div>

      <div className="space-y-6">
        {renderGroup('Today', today)}
        {renderGroup('Yesterday', yesterday)}
        {renderGroup('Earlier', earlier)}
      </div>
    </div>
  );
};
