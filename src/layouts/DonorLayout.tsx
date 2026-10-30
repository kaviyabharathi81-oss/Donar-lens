import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../components/common/BrandLogo';
import { DemoBanner } from '../components/common/DemoBanner';
import { ReceiptModal } from '../components/receipt/ReceiptModal';
import { TzktModal } from '../components/tx/TzktModal';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  History,
  Calendar,
  Bookmark,
  Bell,
  User,
  Settings,
  Search,
  ExternalLink,
  Wallet,
  ShieldCheck,
  Menu,
  X,
  LogOut,
} from 'lucide-react';

export const DonorLayout: React.FC = () => {
  const { currentUser, notifications, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const unreadCount = notifications.filter(n => n.targetRole !== 'admin' && !n.read).length;

  const navItems = [
    { label: 'Dashboard', to: '/donor/dashboard', icon: LayoutDashboard },
    { label: 'Discover Campaigns', to: '/donor/explore', icon: Compass },
    { label: 'My Contributions', to: '/donor/donations', icon: History },
    { label: 'Upcoming Campaigns', to: '/donor/upcoming', icon: Calendar },
    { label: 'Saved Initiatives', to: '/donor/saved', icon: Bookmark },
    { label: 'Notifications', to: '/donor/notifications', icon: Bell, badge: unreadCount },
    { label: 'Donor Profile', to: '/donor/profile', icon: User },
    { label: 'Settings', to: '/donor/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#050706] text-[#F3F4F6] selection:bg-[#00FF87]/20 selection:text-[#00FF87]">
      <DemoBanner />

      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-[#1B231E] bg-[#090C0A] shrink-0 sticky top-[33px] h-[calc(100vh-33px)]">
          {/* Logo Bar */}
          <div className="p-5 border-b border-[#18211C]">
            <BrandLogo size="sm" showTagline />
            <div className="mt-3 flex items-center justify-between px-2.5 py-1.5 rounded bg-[#111612] border border-[#232D27] text-[11px] font-mono-code">
              <span className="text-neutral-400">PORTAL:</span>
              <span className="text-[#00FF87] font-semibold">STUDENT / DONOR</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to || (item.to !== '/donor/dashboard' && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/30 shadow-[0_0_12px_rgba(0,255,135,0.1)]'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#00FF87]' : 'text-neutral-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#00FF87] text-black font-mono-code text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile Footer */}
          <div className="p-3 border-t border-[#18211C] bg-[#070A08]">
            <div className="p-2 rounded bg-[#111612] border border-[#232D27] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#00FF87]/20 border border-[#00FF87]/40 flex items-center justify-center text-[#00FF87] font-bold text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-semibold text-white truncate max-w-[130px]">{currentUser.name}</div>
                    <div className="text-[10px] text-neutral-400 truncate max-w-[130px]">{currentUser.email}</div>
                  </div>
                </div>
              </div>

              <div className="pt-1.5 border-t border-neutral-800/60 flex items-center justify-between text-[10px] font-mono-code text-neutral-400">
                <span className="flex items-center gap-1">
                  <Wallet className="w-3 h-3 text-[#00FF87]" />
                  {currentUser.walletAddress.slice(0, 6)}...{currentUser.walletAddress.slice(-4)}
                </span>
                <span className="text-[#00FF87]">Active</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Header */}
        <div className="lg:hidden w-full flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1B231E] bg-[#090C0A]">
            <BrandLogo size="sm" />
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/verify')}
                className="p-1.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300"
                title="Verify Record"
              >
                <Search className="w-4 h-4 text-[#00FF87]" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="p-4 border-b border-[#1B231E] bg-[#0B0F0D] space-y-2">
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
                      <Icon className="w-4 h-4 text-[#00FF87]" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Desktop Topbar */}
          <header className="hidden lg:flex items-center justify-between px-8 py-3.5 border-b border-[#18211C] bg-[#070A08]/80 backdrop-blur sticky top-[33px] z-20">
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-400 font-sans">Student & Community Contributor Workspace</span>
              <span className="text-neutral-600">|</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono-code text-[#00FF87]">
                <ShieldCheck className="w-3.5 h-3.5" /> Direct Contract Escrow
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/verify"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#111612] border border-[#232D27] hover:border-[#00FF87]/40 text-neutral-300 text-xs font-mono-code transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-[#00FF87]" />
                <span>Verify Transaction</span>
              </Link>
              <Link
                to="/donor/notifications"
                className="relative p-2 rounded bg-[#111612] border border-[#232D27] text-neutral-400 hover:text-white transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00FF87] shadow-[0_0_6px_#00FF87]" />
                )}
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
