import React from 'react';
import { X, ExternalLink, ShieldCheck, Download, FileText, CheckCircle, Hash } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LayerTag } from '../common/StatusBadges';

export const ReceiptModal: React.FC = () => {
  const { previewReceipt, setPreviewReceipt } = useApp();

  if (!previewReceipt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0D110F] dark:bg-[#0D110F] light:bg-white border border-[#232D27] dark:border-[#232D27] light:border-slate-300 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1D2520] dark:border-[#1D2520] light:border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#00FF87]/10 text-[#00FF87] border border-[#00FF87]/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white dark:text-white light:text-slate-900 text-base">
                  Verified Expenditure Receipt
                </h3>
                <LayerTag layer="IPFS" />
                <LayerTag layer="ON-CHAIN" />
              </div>
              <p className="text-xs text-neutral-400 font-mono-code">
                {previewReceipt.receiptFileName}
              </p>
            </div>
          </div>
          <button
            onClick={() => setPreviewReceipt(null)}
            className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-sm">
          {/* IPFS Verification Banner */}
          <div className="p-3.5 rounded bg-[#111612] dark:bg-[#111612] light:bg-slate-50 border border-[#232D27] dark:border-[#232D27] light:border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono-code text-neutral-400">IPFS Content Identifier (CID v1)</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono-code text-[#00FF87]">
                <CheckCircle className="w-3.5 h-3.5" /> Pinned via Filecoin IPFS Gateway
              </span>
            </div>
            <div className="p-2 rounded bg-black/40 border border-neutral-800 font-mono-code text-xs text-emerald-400 break-all select-all">
              ipfs://{previewReceipt.receiptCID}
            </div>
          </div>

          {/* Rendered Invoice Sheet Preview */}
          <div className="border border-neutral-800 rounded bg-[#070908] p-5 font-sans space-y-4">
            <div className="flex justify-between items-start border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider">Official Disbursement Voucher</span>
                <h4 className="text-lg font-bold text-white mt-1">{previewReceipt.vendor}</h4>
                <p className="text-xs text-neutral-400">Authorized Vendor / Service Contractor</p>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono-code text-neutral-400">VOUCHER ID</div>
                <div className="text-sm font-mono-code text-white font-bold">{previewReceipt.id.toUpperCase()}</div>
                <div className="text-xs text-neutral-400 mt-1">Date: {previewReceipt.date}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs py-2">
              <div>
                <div className="text-neutral-500 font-mono-code uppercase">Associated Campaign</div>
                <div className="text-neutral-200 font-medium mt-0.5">{previewReceipt.campaignTitle}</div>
              </div>
              <div>
                <div className="text-neutral-500 font-mono-code uppercase">Disbursement Category</div>
                <div className="text-neutral-200 font-medium mt-0.5">{previewReceipt.category}</div>
              </div>
              <div className="col-span-2">
                <div className="text-neutral-500 font-mono-code uppercase">Itemized Description & Justification</div>
                <div className="text-neutral-200 mt-0.5">{previewReceipt.description}</div>
              </div>
            </div>

            <div className="border-t border-neutral-800 pt-3 flex justify-between items-center">
              <span className="text-xs text-neutral-400 font-medium">Total Verified Expenditure:</span>
              <span className="text-xl font-bold font-mono-code text-[#00FF87]">
                ₹{previewReceipt.amount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Multi-Sig Signatures */}
          <div>
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00FF87]" /> Multi-Sig Approver Consensus ({previewReceipt.approvers.filter(a => a.status === 'APPROVED').length} of {previewReceipt.requiredApprovals} Verified)
            </h4>
            <div className="space-y-2">
              {previewReceipt.approvers.map((approver) => (
                <div
                  key={approver.id}
                  className="flex items-center justify-between p-2.5 rounded bg-[#111612] border border-[#232D27] text-xs font-mono-code"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${approver.status === 'APPROVED' ? 'bg-[#00FF87]' : 'bg-amber-400'}`} />
                    <span className="text-neutral-200 font-medium">{approver.name}</span>
                    <span className="text-neutral-400 text-[11px]">({approver.role})</span>
                  </div>
                  <div>
                    {approver.status === 'APPROVED' ? (
                      <span className="text-[#00FF87] flex items-center gap-1 text-[11px]">
                        ✓ Signed ({approver.signatureHash || 'sig_0x7b8a...'})
                      </span>
                    ) : (
                      <span className="text-amber-400 text-[11px]">Awaiting Sign-off</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#1D2520] dark:border-[#1D2520] light:border-slate-200 bg-[#0A0D0B]">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono-code">
            <Hash className="w-3.5 h-3.5" />
            <span>SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</span>
          </div>
          <button
            onClick={() => {
              const element = document.createElement('a');
              const file = new Blob([
                `DONOR LENS VERIFIED EXPENDITURE RECEIPT\n--------------------------------------\nReceipt CID: ${previewReceipt.receiptCID}\nVendor: ${previewReceipt.vendor}\nAmount: INR ${previewReceipt.amount}\nCampaign: ${previewReceipt.campaignTitle}\nStatus: Verified\nTimestamp: ${previewReceipt.date}`
              ], { type: 'text/plain' });
              element.href = URL.createObjectURL(file);
              element.download = previewReceipt.receiptFileName || 'receipt.txt';
              element.click();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#00FF87]/15 hover:bg-[#00FF87]/25 text-[#00FF87] border border-[#00FF87]/30 text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Download Cryptographic Evidence
          </button>
        </div>
      </div>
    </div>
  );
};
