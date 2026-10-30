import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { UserCheck, ShieldAlert, Sun, Moon, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { currentUser, switchRole, theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  return (
    <div className="bg-[#080B09] border-b border-[#1E2621] text-xs py-1.5 px-4 sticky top-0 z-40 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Mode indicator & network telemetry */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00FF87] shadow-[0_0_8px_#00FF87] animate-pulse" />
            <span className="font-mono-code font-bold uppercase text-[#00FF87] tracking-wider text-[11px]">
              PROTOTYPE DEMO MODE
            </span>
          </div>
          <span className="text-neutral-600">|</span>
          <div className="hidden sm:flex items-center gap-2 text-neutral-400 font-mono-code text-[11px]">
            <Activity className="w-3 h-3 text-[#00FF87]" />
            <span>Tezos Ghostnet: Operational</span>
            <span className="text-emerald-400 font-medium">(0 Discrepancy)</span>
          </div>
        </div>

        {/* Right: Quick switcher controls */}
        <div className="flex items-center gap-2">
          <span className="text-neutral-400 text-[11px] hidden md:inline">Active Demo Persona:</span>
          
          <button
            onClick={() => {
              switchRole('donor');
              navigate('/donor/dashboard');
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all flex items-center gap-1.5 border ${
              currentUser.role === 'donor'
                ? 'bg-[#00FF87]/20 border-[#00FF87]/50 text-[#00FF87] shadow-[0_0_10px_rgba(0,255,135,0.2)]'
                : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <UserCheck className="w-3 h-3" />
            <span>Student Donor</span>
          </button>

          <button
            onClick={() => {
              switchRole('admin');
              navigate('/admin/dashboard');
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all flex items-center gap-1.5 border ${
              currentUser.role === 'admin'
                ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ShieldAlert className="w-3 h-3" />
            <span>Admin Official</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white transition-colors"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
          </button>
        </div>
      </div>
    </div>
  );
};
