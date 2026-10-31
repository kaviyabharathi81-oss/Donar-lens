import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../components/common/BrandLogo';
import { DemoBanner } from '../components/common/DemoBanner';
import { ReceiptModal } from '../components/receipt/ReceiptModal';
import { TzktModal } from '../components/tx/TzktModal';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  BarChart3,
  Layers,
  CheckSquare,
  FileSpreadsheet,
  Receipt,
  Search,
  FileCheck2,
  FileText,
  Bell,
  Settings,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  Activity,
  Cpu,
  Menu,
  X,
  Database,
  ArrowRight,
  Sun,
  Moon,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { currentUser, activeAdminSigner, donations, expenses, notifications, theme, toggleTheme } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Calculate live operational badges
  const pendingDonations = donations.filter(d => d.officialStatus === 'PENDING_REVIEW').length;
  const pendingApprovals = expenses.filter(e => e.status === 'PENDING_APPROVAL').length;
  const adminNotifs = notifications.filter(n => n.targetRole !== 'donor' && !n.read).length;

  const navItems = [
    { label: 'Overview', to: '/admin/dashboard', icon: BarChart3 },
    { label: 'All Campaigns', to: '/admin/campaigns', icon: Layers },
    {
      label: 'Donation Verification',
      to: '/admin/campaigns/camp_001/donations',
      icon: CheckSquare,
      badge: pendingDonations,
      badgeColor: 'bg-amber-400 text-black',
    },
    { label: 'Expense Management', to: '/admin/campaigns/camp_001/expenses', icon: Receipt },
    {
      label: 'Multi-Sig Approvals',
      to: '/admin/campaigns/camp_001/approvals',
      icon: ShieldCheck,
      badge: pendingApprovals,
      badgeColor: 'bg-purple-400 text-black',
    },
    { label: 'Verification Center', to: '/admin/verification', icon: FileCheck2 },
    { label: 'Transaction Explorer', to: '/admin/campaigns/camp_001/transactions', icon: Cpu },
    { label: 'Audit Trail', to: '/admin/campaigns/camp_001/audit', icon: Database },
    { label: 'Financial Reports', to: '/admin/reports', icon: FileSpreadsheet },
    { label: 'Operational Alerts', to: '/admin/notifications', icon: Bell, badge: adminNotifs },
    { label: 'Governance Settings', to: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#050706] text-[#F3F4F6] selection:bg-[#00FF87]/20 selection:text-[#00FF87]">
      <DemoBanner />

      <div className="flex-1 flex">
        {/* Desktop Dense Institutional Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-[#1B231E] bg-[#080B09] shrink-0 sticky top-[33px] h-[calc(100vh-33px)]">
          {/* Brand header */}
          <div className="p-4 border-b border-[#18211C] bg-[#060807]">
            <BrandLogo size="sm" />
            <div className="mt-2.5 flex items-center justify-between px-2 py-1 rounded bg-[#0D120F] border border-purple-500/30 text-[10px] font-mono-code">
              <span className="text-purple-300 flex items-center gap-1 font-bold">
                <ShieldAlert className="w-3 h-3 text-purple-400" />
                ADMIN & OVERSIGHT
              </span>
              <span className="text-neutral-400">ROLE: AUDITOR</span>
            </div>
          </div>

          {/* Quick Create Campaign Button */}
          <div className="p-3 border-b border-[#18211C]">
            <Link
              to="/admin/campaigns/new"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-[#00FF87]/15 hover:bg-[#00FF87]/25 text-[#00FF87] border border-[#00FF87]/30 transition-all shadow-[0_0_10px_rgba(0,255,135,0.15)]"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Campaign</span>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to || (item.to !== '/admin/dashboard' && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#121915] text-[#00FF87] border border-[#00FF87]/40 font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#00FF87]' : 'text-neutral-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`px-1.5 py-0.2 rounded font-mono-code text-[10px] font-bold shrink-0 ${
                        item.badgeColor || 'bg-[#00FF87] text-black'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Institutional Admin Footer */}
          <div className="p-3 border-t border-[#18211C] bg-[#050706]">
            <div className="p-2 rounded bg-[#0D120F] border border-[#1E2621] space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold text-xs shrink-0">
                  PS
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold text-white truncate">{currentUser.name}</div>
                  <div className="text-[10px] text-purple-300 truncate">Comptroller & Auditor</div>
                </div>
              </div>

              <div className="pt-1.5 border-t border-neutral-800/60 flex items-center justify-between text-[10px] font-mono-code text-neutral-400">
                <span className="truncate max-w-[120px]">{currentUser.walletAddress.slice(0, 10)}...</span>
                <span className="text-[#00FF87]">Multi-Sig #1</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Header */}
        <div className="lg:hidden w-full flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1B231E] bg-[#080B09]">
            <BrandLogo size="sm" />
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-1 rounded bg-[#111612] border border-[#232D27] text-neutral-300 hover:text-white"
                  title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-blue-500" />}
                </button>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  ADMIN
                </span>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="p-3 border-b border-[#1B231E] bg-[#0A0E0C] space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-purple-400" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono-code bg-amber-400 text-black font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Institutional Topbar */}
            <header className="hidden lg:flex items-center justify-between px-8 py-2.5 border-b border-[#18211C] bg-[#070A08]/90 backdrop-blur sticky top-[33px] z-20">
              <div className="flex items-center gap-4 text-xs font-mono-code">
                <span className="text-white font-bold tracking-wide">ADMINISTRATION CONSOLE</span>
                <span className="text-neutral-600">/</span>
                <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                  <Activity className="w-3.5 h-3.5 text-[#00FF87]" />
                  <span>Tezos RPC: Connected (12ms)</span>
                </div>
                <span className="text-neutral-600">/</span>
                <span className="text-purple-300 text-[11px]">Multi-Sig: 3-of-3 Quorum</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Theme Mode Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111612] border border-[#232D27] hover:border-[#00FF87]/40 text-neutral-300 hover:text-white text-xs font-mono-code transition-all cursor-pointer shadow-sm"
                  title={theme === 'dark' ? 'Switch to Clean Light Theme' : 'Switch to Dark Theme'}
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                      <span>Light Theme</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-slate-800 font-semibold">Dark Theme</span>
                    </>
                  )}
                </button>

                <Link
                  to="/admin/campaigns/camp_001/approvals"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono-code hover:bg-purple-500/25 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Approvals ({pendingApprovals})</span>
                </Link>

                <Link
                  to="/admin/verification"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111612] border border-[#232D27] hover:border-[#00FF87]/40 text-neutral-300 text-xs font-mono-code transition-colors"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-[#00FF87]" />
                  <span>Queue ({pendingDonations})</span>
                </Link>

                <Link
                  to="/verify"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111612] border border-[#232D27] text-neutral-300 text-xs font-mono-code hover:text-white"
                >
                  <Search className="w-3 h-3 text-[#00FF87]" />
                  <span>Public Lookup</span>
                </Link>
              </div>
            </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>

      <ReceiptModal />
      <TzktModal />
    </div>
  );
};
