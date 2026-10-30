import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Bell, CheckSquare, ShieldCheck, AlertTriangle, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';

export const AdminNotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead } = useApp();

  const adminNotifs = notifications.filter((n) => n.targetRole === 'admin' || n.targetRole === 'all');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <div className="text-xs font-mono-code text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5" /> AUDIT ALERTS
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Operational & Compliance Alerts
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Real-time notices on incoming donations awaiting verification, multi-sig approval requests, and network synchronization.
        </p>
      </div>

      <div className="space-y-3 font-mono-code text-xs">
        {adminNotifs.map((item) => (
          <div
            key={item.id}
            onClick={() => markNotificationRead(item.id)}
            className={`p-4 rounded-lg border transition-all flex items-start justify-between gap-4 cursor-pointer ${
              item.read
                ? 'bg-[#0A0D0B] border-[#1E2621] opacity-75'
                : 'bg-[#0F1411] border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.1)]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 shrink-0 mt-0.5">
                {item.type === 'verification' && <CheckSquare className="w-4 h-4" />}
                {item.type === 'approval' && <ShieldCheck className="w-4 h-4" />}
                {item.type === 'system' && <Layers className="w-4 h-4" />}
                {item.type === 'expense' && <CheckCircle2 className="w-4 h-4" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-xs">{item.title}</h4>
                  {!item.read && <span className="w-2 h-2 rounded-full bg-purple-400" />}
                </div>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">{item.description}</p>
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  {new Date(item.timestamp).toUTCString()}
                </span>
              </div>
            </div>

            {item.link && (
              <Link
                to={item.link}
                className="px-3 py-1.5 rounded bg-[#111612] border border-[#232D27] text-neutral-300 hover:text-white text-xs shrink-0 flex items-center gap-1"
              >
                <span>Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
