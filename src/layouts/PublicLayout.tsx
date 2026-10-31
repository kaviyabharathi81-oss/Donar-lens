import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { BrandLogo } from '../components/common/BrandLogo';
import { DemoBanner } from '../components/common/DemoBanner';
import { ReceiptModal } from '../components/receipt/ReceiptModal';
import { TzktModal } from '../components/tx/TzktModal';
import { ShieldCheck, Search, ArrowRight, CheckCircle2, Sun, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PublicLayout: React.FC = () => {
  const { currentRole, theme, toggleTheme } = useApp();
  const location = useLocation();

  const navLinks = [
    { label: 'Explore Initiatives', to: '/explore' },
    { label: 'How It Works', to: '/#how-it-works' },
    { label: 'Verify a Record', to: '/verify' },
    { label: 'About Accountability', to: '/about' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#050706] text-[#F3F4F6] selection:bg-[#00FF87]/20 selection:text-[#00FF87]">
      <DemoBanner />

      {/* Main Public Header */}
      <header className="border-b border-[#18211C] bg-[#070A08]/90 backdrop-blur sticky top-[33px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <BrandLogo size="md" showTagline />

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-[#111612] border border-[#232D27] text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-blue-500" />}
            </button>

            <Link
              to="/verify"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono-code border border-[#232D27] hover:border-[#00FF87]/40 text-neutral-300 hover:text-white transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-[#00FF87]" />
              Verify Hash
            </Link>

            <Link
              to={currentRole === 'admin' ? '/admin/dashboard' : '/donor/dashboard'}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded font-medium text-xs bg-[#00FF87] hover:bg-[#00e57a] text-black shadow-[0_0_15px_rgba(0,255,135,0.25)] transition-all hover:scale-[1.02]"
            >
              <span>Enter {currentRole === 'admin' ? 'Admin Portal' : 'Donor Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="border-t border-[#18211C] bg-[#040605] py-12 px-4 sm:px-6 text-xs text-neutral-500 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <BrandLogo size="sm" showTagline />
            <p className="text-neutral-400 leading-relaxed text-xs">
              Transparent community giving with verifiable donations, controlled spending, supporting evidence, and accountable campaign management.
            </p>
            <div className="flex items-center gap-2 font-mono-code text-[11px] text-[#00FF87]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tezos Michelson Smart Contracts + IPFS</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono-code uppercase tracking-wider text-neutral-300 mb-3 text-xs">Portals</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/donor/dashboard" className="hover:text-white transition-colors">
                  Donor Portal
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-white transition-colors">
                  Admin Oversight Portal
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">
                  Explore Campaigns
                </Link>
              </li>
              <li>
                <Link to="/donor/upcoming" className="hover:text-white transition-colors">
                  Upcoming Community Drives
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono-code uppercase tracking-wider text-neutral-300 mb-3 text-xs">Verification & Audit</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/verify" className="hover:text-white transition-colors">
                  Public Record Verifier
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Append-Only Architecture
                </Link>
              </li>
              <li>
                <span className="text-neutral-400">TzKT Indexer Ghostnet</span>
              </li>
              <li>
                <span className="text-neutral-400">Filecoin IPFS Evidence Pinning</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono-code uppercase tracking-wider text-neutral-300 mb-3 text-xs">Demonstration</h4>
            <div className="p-3 rounded bg-[#0A0E0C] border border-[#1E2621] space-y-2 font-mono-code text-[11px]">
              <div className="text-neutral-400">Presentation Mode Active</div>
              <div className="text-[#00FF87] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
                Zero-Discrepancy Ledger
              </div>
              <p className="text-[10px] text-neutral-500 font-sans">
                Every transaction and approval is simulated deterministically with realistic cryptographic hashes.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-[#141B17] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>© 2026 DONOR LENS. "See where every contribution goes." All records verified.</div>
          <div className="font-mono-code text-neutral-600">
            NETWORK: TEZOS_GHOSTNET | STATUS: SYNCHRONIZED
          </div>
        </div>
      </footer>

      <ReceiptModal />
      <TzktModal />
    </div>
  );
};
