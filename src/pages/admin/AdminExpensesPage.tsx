import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Receipt,
  PlusCircle,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  X,
  Upload,
  ArrowUpRight,
} from 'lucide-react';
import { Expense } from '../../types';

export const AdminExpensesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { campaigns, expenses, createExpense, setPreviewReceipt, setPreviewTx } = useApp();

  const campaignId = id || 'camp_001';
  const campaign = campaigns.find((c) => c.id === campaignId) || campaigns[0];

  const campaignExpenses = expenses.filter((e) => e.campaignId === campaign.id);

  const totalSpent = campaignExpenses
    .filter((e) => e.status === 'APPROVED')
    .reduce((acc, e) => acc + e.amount, 0);
  const pendingSpent = campaignExpenses
    .filter((e) => e.status === 'PENDING_APPROVAL')
    .reduce((acc, e) => acc + e.amount, 0);

  // New Expense Modal State
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState<number>(15000);
  const [category, setCategory] = useState<Expense['category']>('Equipment');
  const [description, setDescription] = useState('');
  const [vendor, setVendor] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [receiptFileName, setReceiptFileName] = useState('Invoice_Voucher_Nov.pdf');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmitExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !vendor || amount <= 0) return;

    createExpense({
      campaignId: campaign.id,
      amount,
      category,
      description,
      vendor,
      date,
      receiptFileName,
    });

    setShowModal(false);
    setSuccessMsg('Expense voucher submitted. Awaiting multi-sig committee signatures.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      <Link
        to={`/admin/campaigns/${campaign.id}`}
        className="text-xs font-mono-code text-neutral-400 hover:text-white flex items-center gap-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Campaign Console</span>
      </Link>

      {/* Header (Section 26) */}
      <div className="p-6 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#18211C] gap-3">
          <div>
            <div className="text-xs font-mono-code text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Receipt className="w-4 h-4" /> DISBURSEMENT ACCOUNTING
            </div>
            <h1 className="text-2xl font-bold text-white mt-0.5">
              Expense & Voucher Management
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Itemized invoices pinned to IPFS and governed by multi-sig spending rules.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs font-mono-code transition-colors flex items-center gap-1.5 w-fit"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit New Expense Voucher</span>
          </button>
        </div>

        {/* Top 4 Metrics (Section 26) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono-code">
          <div className="p-3.5 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">Total Approved Spent</div>
            <div className="text-lg font-bold text-rose-400 mt-1">₹{totalSpent.toLocaleString('en-IN')}</div>
          </div>

          <div className="p-3.5 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">Pending Approval</div>
            <div className="text-lg font-bold text-amber-400 mt-1">₹{pendingSpent.toLocaleString('en-IN')}</div>
          </div>

          <div className="p-3.5 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">Approved Vouchers</div>
            <div className="text-lg font-bold text-[#00FF87] mt-1">
              {campaignExpenses.filter((e) => e.status === 'APPROVED').length}
            </div>
          </div>

          <div className="p-3.5 rounded bg-[#0F1411] border border-[#1E2621]">
            <div className="text-neutral-500 uppercase text-[10px]">IPFS Pinned Evidence</div>
            <div className="text-lg font-bold text-cyan-400 mt-1">100% Pinned</div>
          </div>
        </div>

        {successMsg && (
          <div className="p-3 rounded bg-[#00FF87]/20 border border-[#00FF87] text-[#00FF87] text-xs font-mono-code animate-fade-in flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* Expenses Table (Section 26) */}
      <div className="rounded-lg border border-[#1E2621] bg-[#0A0D0B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-code">
            <thead className="bg-[#070A08] border-b border-[#1E2621] text-[11px] text-neutral-400 uppercase">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Expense & Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Receipt Proof</th>
                <th className="py-3 px-4">Multi-Sig Approvals</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Transaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18211C]">
              {campaignExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-[#0D120F] transition-colors">
                  <td className="py-3 px-4 text-neutral-400">{exp.date}</td>
                  <td className="py-3 px-4 font-sans max-w-[220px]">
                    <div className="font-semibold text-white truncate">{exp.description}</div>
                    <div className="text-[10px] text-neutral-400 font-mono-code">Vendor: {exp.vendor}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px]">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-rose-400">
                    ₹{exp.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setPreviewReceipt(exp)}
                      className="flex items-center gap-1 text-[#00FF87] hover:underline"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{exp.receiptFileName}</span>
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <span className={exp.status === 'APPROVED' ? 'text-[#00FF87]' : 'text-amber-400'}>
                      {exp.approvers.filter((a) => a.status === 'APPROVED').length} of {exp.requiredApprovals} Signed
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        exp.status === 'APPROVED'
                          ? 'bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]/40'
                          : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                      }`}
                    >
                      {exp.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {exp.txHash ? (
                      <button
                        onClick={() =>
                          setPreviewTx({
                            id: exp.id,
                            txHash: exp.txHash!,
                            type: 'EXPENSE',
                            amount: exp.amount,
                            campaignId: campaign.id,
                            campaignTitle: campaign.title,
                            walletAddress: 'tz1h3rQ8wToHLY5fsXTCCDH3LsnvaQF10D7a',
                            blockNumber: exp.blockNumber || 4982420,
                            timestamp: exp.date,
                            status: 'CONFIRMED',
                            verification: 'OFFICIALLY_VERIFIED',
                            gasUsed: '0.00280 XTZ',
                            contract: campaign.contractAddress,
                          })
                        }
                        className="text-cyan-400 hover:underline flex items-center justify-end gap-1"
                      >
                        <span>{exp.txHash.slice(0, 8)}...</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <span className="text-neutral-500 text-[11px]">Awaiting Sign-off</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit Expense Modal (Section 26) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-mono-code">
          <div className="relative w-full max-w-lg bg-[#0D110F] border border-[#232D27] rounded-lg shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#00FF87]" />
                <h3 className="font-bold text-white text-sm">
                  Submit Official Expense Voucher
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitExpense} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 uppercase mb-1">DISBURSEMENT AMOUNT (INR) *</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-[#111612] border border-[#232D27] rounded p-2 text-white focus:outline-none focus:border-[#00FF87]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase mb-1">CATEGORY *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#111612] border border-[#232D27] rounded p-2 text-white focus:outline-none"
                  >
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Medical">Medical</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Education">Education</option>
                    <option value="Operations">Operations</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 uppercase mb-1">AUTHORIZED VENDOR / CONTRACTOR *</label>
                <input
                  type="text"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  placeholder="e.g. MedEquip Surgical Supplies Ltd."
                  className="w-full bg-[#111612] border border-[#232D27] rounded p-2 text-white focus:outline-none focus:border-[#00FF87]"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase mb-1">ITEMIZED JUSTIFICATION & DESCRIPTION *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Describe goods/services delivered and beneficiary allocation..."
                  className="w-full bg-[#111612] border border-[#232D27] rounded p-2 text-white focus:outline-none focus:border-[#00FF87]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 uppercase mb-1">INVOICE DATE</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#111612] border border-[#232D27] rounded p-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase mb-1">ATTACHED RECEIPT PDF</label>
                  <input
                    type="text"
                    value={receiptFileName}
                    onChange={(e) => setReceiptFileName(e.target.value)}
                    className="w-full bg-[#111612] border border-[#232D27] rounded p-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded bg-[#0A0E0C] border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                <div className="text-cyan-400 flex items-center gap-1 font-semibold">
                  <Upload className="w-3.5 h-3.5" /> Simulated IPFS Upload & SHA-256 Hash
                </div>
                <div>A cryptographically immutable CIDv1 hash will be generated and anchored to Tezos.</div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-neutral-800 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#00FF87] text-black font-bold shadow-[0_0_10px_rgba(0,255,135,0.2)]"
                >
                  Submit for Multi-Sig Sign-off
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
