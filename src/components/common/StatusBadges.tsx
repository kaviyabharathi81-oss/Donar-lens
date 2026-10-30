import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, AlertTriangle, XCircle, Database, Layers } from 'lucide-react';
import { BlockchainStatus, OfficialStatus } from '../../types';

export const BlockchainBadge: React.FC<{ status: BlockchainStatus; size?: 'sm' | 'md' }> = ({
  status,
  size = 'md',
}) => {
  const isSm = size === 'sm';
  const padding = isSm ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  if (status === 'CONFIRMED') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-mono-code font-medium rounded border border-[#00FF87]/30 bg-[#00FF87]/10 text-[#00FF87] ${padding}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] shadow-[0_0_6px_#00FF87] animate-pulse" />
        ON-CHAIN CONFIRMED
      </span>
    );
  }

  if (status === 'PENDING') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-mono-code font-medium rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 ${padding}`}
      >
        <Clock className="w-3 h-3 animate-spin" />
        BROADCASTING
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono-code font-medium rounded border border-rose-500/30 bg-rose-500/10 text-rose-400 ${padding}`}
    >
      <XCircle className="w-3 h-3" />
      ON-CHAIN FAILED
    </span>
  );
};

export const OfficialBadge: React.FC<{ status: OfficialStatus; size?: 'sm' | 'md' }> = ({
  status,
  size = 'md',
}) => {
  const isSm = size === 'sm';
  const padding = isSm ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  if (status === 'VERIFIED') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold rounded border border-[#00FF87]/40 bg-[#00FF87]/15 text-[#00FF87] shadow-[0_0_12px_rgba(0,255,135,0.15)] ${padding}`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-[#00FF87]" />
        OFFICIALLY VERIFIED
      </span>
    );
  }

  if (status === 'PENDING_REVIEW') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded border border-amber-500/40 bg-amber-500/10 text-amber-400 ${padding}`}
      >
        <Clock className="w-3.5 h-3.5" />
        PENDING OFFICIAL REVIEW
      </span>
    );
  }

  if (status === 'NEEDS_REVIEW') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded border border-blue-500/40 bg-blue-500/10 text-blue-400 ${padding}`}
      >
        <AlertTriangle className="w-3.5 h-3.5" />
        ACTION REQUESTED
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded border border-rose-500/40 bg-rose-500/10 text-rose-400 ${padding}`}
    >
      <XCircle className="w-3.5 h-3.5" />
      OFFICIALLY REJECTED
    </span>
  );
};

export const ReconciliationBadge: React.FC<{ matches: boolean; diff?: number }> = ({
  matches,
  diff = 0,
}) => {
  if (matches && diff === 0) {
    return (
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0D110F] dark:bg-[#0D110F] light:bg-emerald-50 border border-[#00FF87]/30 text-[#00FF87] text-xs font-mono-code">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF87]" />
        <span>MATCHES BLOCKCHAIN</span>
        <span className="text-neutral-400 font-sans text-[11px]">(Diff: ₹0)</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-rose-950/40 border border-rose-500/40 text-rose-400 text-xs font-mono-code">
      <AlertTriangle className="w-3.5 h-3.5" />
      <span>DISCREPANCY DETECTED</span>
      <span className="font-bold">Diff: ₹{diff}</span>
    </div>
  );
};

export const LayerTag: React.FC<{ layer: 'ON-CHAIN' | 'OFF-CHAIN' | 'IPFS' | 'INDEXED' | 'OFFICIAL' }> = ({
  layer,
}) => {
  const styles = {
    'ON-CHAIN': 'border-[#00FF87]/30 bg-[#00FF87]/10 text-[#00FF87]',
    'OFFICIAL': 'border-purple-500/30 bg-purple-500/10 text-purple-400',
    'IPFS': 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
    'INDEXED': 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    'OFF-CHAIN': 'border-neutral-500/30 bg-neutral-500/10 text-neutral-400',
  };

  return (
    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono-code font-medium border ${styles[layer]}`}>
      {layer}
    </span>
  );
};
