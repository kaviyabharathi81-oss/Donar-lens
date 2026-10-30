import React from 'react';
import { X, ExternalLink, CheckCircle2, Copy, Layers, Cpu, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TzktModal: React.FC = () => {
  const { previewTx, setPreviewTx } = useApp();
  const [copied, setCopied] = React.useState(false);

  if (!previewTx) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(previewTx.txHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0D110F] dark:bg-[#0D110F] light:bg-white border border-[#232D27] dark:border-[#232D27] light:border-slate-300 rounded-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1D2520] dark:border-[#1D2520] light:border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold font-mono-code text-sm">
              tz
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white dark:text-white light:text-slate-900 text-sm">
                  TzKT Blockchain Explorer Record
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-code bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Ghostnet Testnet
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono-code">
                Operation Group Hash
              </p>
            </div>
          </div>
          <button
            onClick={() => setPreviewTx(null)}
            className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 font-mono-code text-xs">
          {/* Hash Box */}
          <div className="p-3 rounded bg-black/50 border border-neutral-800 flex items-center justify-between">
            <div className="break-all text-neutral-200 select-all font-mono-code pr-2">
              {previewTx.txHash}
            </div>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors shrink-0"
              title="Copy Hash"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-[#00FF87]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Details Table */}
          <div className="border border-neutral-800 rounded divide-y divide-neutral-800">
            <div className="flex justify-between py-2.5 px-3">
              <span className="text-neutral-400">Operation Status</span>
              <span className="text-[#00FF87] flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> APPLIED / CONFIRMED
              </span>
            </div>

            <div className="flex justify-between py-2.5 px-3">
              <span className="text-neutral-400">Block Height</span>
              <span className="text-white">#{previewTx.blockNumber}</span>
            </div>

            <div className="flex justify-between py-2.5 px-3">
              <span className="text-neutral-400">Timestamp</span>
              <span className="text-neutral-300">{new Date(previewTx.timestamp).toUTCString()}</span>
            </div>

            <div className="flex justify-between py-2.5 px-3">
              <span className="text-neutral-400">Transaction Type</span>
              <span className="text-purple-400 font-semibold">{previewTx.type}</span>
            </div>

            <div className="flex justify-between py-2.5 px-3">
              <span className="text-neutral-400">Financial Value</span>
              <span className="text-[#00FF87] font-bold">₹{previewTx.amount.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-2.5 px-3">
              <span className="text-neutral-400">Sender Wallet</span>
              <span className="text-neutral-300">{previewTx.walletAddress}</span>
            </div>

            <div className="flex justify-between py-2.5 px-3">
              <span className="text-neutral-400">Target Smart Contract</span>
              <span className="text-cyan-400">{previewTx.contract}</span>
            </div>

            <div className="flex justify-between py-2.5 px-3">
              <span className="text-neutral-400">Gas Consumed / Fee</span>
              <span className="text-neutral-300">{previewTx.gasUsed}</span>
            </div>

            <div className="flex justify-between py-2.5 px-3">
              <span className="text-neutral-400">Official Verification Layer</span>
              <span className={previewTx.verification === 'OFFICIALLY_VERIFIED' ? 'text-[#00FF87]' : 'text-amber-400'}>
                {previewTx.verification === 'OFFICIALLY_VERIFIED' ? '✓ OFFICIALLY VERIFIED' : 'PENDING OFFICIAL REVIEW'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#1D2520] dark:border-[#1D2520] light:border-slate-200 bg-[#0A0D0B]">
          <span className="text-xs text-neutral-400 font-mono-code">
            Immutable Michelson Contract Storage Call
          </span>
          <button
            onClick={() => {
              window.open(`https://ghostnet.tzkt.io/${previewTx.txHash}`, '_blank');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 text-xs font-medium transition-colors"
          >
            <span>Simulate TzKT View</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
