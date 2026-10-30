import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Layers,
  FileCheck2,
  Lock,
  Cpu,
  Sparkles,
} from 'lucide-react';

export const AdminCreateCampaignPage: React.FC = () => {
  const { createCampaign, currentUser } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1: Info
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Education' | 'Healthcare' | 'Food relief' | 'Emergency relief' | 'Technology'>('Education');
  const [location, setLocation] = useState('Apex Campus Central Block');
  const [organizer, setOrganizer] = useState(currentUser.name);

  // Step 2: Funding
  const [goal, setGoal] = useState<number>(350000);
  const [startDate, setStartDate] = useState('2026-11-01');
  const [deadline, setDeadline] = useState('2027-02-28');

  // Step 3: Governance
  const [spendingLimit, setSpendingLimit] = useState<number>(50000);
  const [minimumApprovers, setMinimumApprovers] = useState<number>(3);
  const [expenseCategories, setExpenseCategories] = useState('Equipment, Transport, Books, Supplies, Meals');

  // Step 4: Verification Rules
  const [officialReviewer, setOfficialReviewer] = useState('Dr. Priya Sundaram (Chief Financial Comptroller)');
  const [receiptRequired, setReceiptRequired] = useState(true);
  const [multiApprovalRequired, setMultiApprovalRequired] = useState(true);
  const [publicTransparency, setPublicTransparency] = useState(true);

  // Step 5: Simulation state
  const [isDeploying, setIsDeploying] = useState(false);
  const [createdResult, setCreatedResult] = useState<any | null>(null);

  const handleDeployContract = () => {
    setIsDeploying(true);

    setTimeout(() => {
      const newCamp = createCampaign({
        title,
        tagline: tagline || title,
        description,
        category,
        location,
        organizer,
        goal,
        startDate,
        deadline,
        governance: {
          spendingLimitPerTx: spendingLimit,
          minimumApprovers,
          multiSigRequired: multiApprovalRequired,
          receiptRequired,
          publicAuditEnabled: publicTransparency,
        },
      });

      setCreatedResult(newCamp);
      setIsDeploying(false);
    }, 1800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        to="/admin/campaigns"
        className="text-xs font-mono-code text-neutral-400 hover:text-white flex items-center gap-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Campaigns</span>
      </Link>

      <div className="p-6 sm:p-8 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-6">
        {/* Step Indicator Header (Section 23) */}
        <div className="pb-4 border-b border-[#18211C] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono-code text-[#00FF87] uppercase tracking-wider">
              NEW CAMPAIGN CONTRACT WIZARD
            </div>
            <h1 className="text-xl font-bold text-white mt-0.5">
              Initialize Institutional Campaign
            </h1>
          </div>

          <div className="flex items-center gap-1 text-xs font-mono-code">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[11px] ${
                  step === s
                    ? 'bg-[#00FF87] text-black shadow-[0_0_8px_#00FF87]'
                    : s < step
                    ? 'bg-neutral-800 text-[#00FF87] border border-[#00FF87]/30'
                    : 'bg-neutral-900 text-neutral-600'
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* STEP 1: Campaign Information */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in text-xs font-mono-code">
            <div className="text-neutral-400 uppercase text-[11px]">STEP 1 — BASIC INFORMATION</div>

            <div>
              <label className="block text-neutral-300 mb-1">CAMPAIGN TITLE *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Student Mental Health & Crisis Aid"
                className="w-full bg-[#111612] border border-[#232D27] rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#00FF87]"
                required
              />
            </div>

            <div>
              <label className="block text-neutral-300 mb-1">SHORT TAGLINE *</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Brief 1-sentence mission statement..."
                className="w-full bg-[#111612] border border-[#232D27] rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#00FF87]"
              />
            </div>

            <div>
              <label className="block text-neutral-300 mb-1">DETAILED OBJECTIVE & JUSTIFICATION *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe why funds are needed, target beneficiaries, and transparency protocols..."
                className="w-full bg-[#111612] border border-[#232D27] rounded p-2.5 text-xs font-sans text-white focus:outline-none focus:border-[#00FF87]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-300 mb-1">CATEGORY</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#111612] border border-[#232D27] rounded p-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Food relief">Food relief</option>
                  <option value="Emergency relief">Emergency relief</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">ORGANIZER / INITIATING BODY</label>
                <input
                  type="text"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  className="w-full bg-[#111612] border border-[#232D27] rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#00FF87]"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!title.trim()}
                className="px-5 py-2.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>Next: Funding Targets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Funding */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in text-xs font-mono-code">
            <div className="text-neutral-400 uppercase text-[11px]">STEP 2 — FUNDING GOALS & DATES</div>

            <div>
              <label className="block text-neutral-300 mb-1">FUNDING GOAL (INR) *</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-neutral-500 font-bold">₹</span>
                <input
                  type="number"
                  value={goal}
                  onChange={(e) => setGoal(Number(e.target.value))}
                  className="w-full bg-[#111612] border border-[#232D27] rounded p-2.5 pl-8 text-xs text-white focus:outline-none focus:border-[#00FF87]"
                  min="10000"
                  step="5000"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-300 mb-1">CAMPAIGN START DATE</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-[#111612] border border-[#232D27] rounded p-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">CAMPAIGN CLOSING DEADLINE</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-[#111612] border border-[#232D27] rounded p-2.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded bg-neutral-800 text-neutral-300 hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs flex items-center gap-1.5"
              >
                <span>Next: Multi-Sig Governance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Governance */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in text-xs font-mono-code">
            <div className="text-neutral-400 uppercase text-[11px]">STEP 3 — MULTI-SIG GOVERNANCE RULES</div>

            <div>
              <label className="block text-neutral-300 mb-1">
                MAXIMUM PER-TRANSACTION DISBURSEMENT LIMIT (INR)
              </label>
              <input
                type="number"
                value={spendingLimit}
                onChange={(e) => setSpendingLimit(Number(e.target.value))}
                className="w-full bg-[#111612] border border-[#232D27] rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#00FF87]"
              />
            </div>

            <div>
              <label className="block text-neutral-300 mb-1">
                MINIMUM REQUIRED APPROVAL SIGNATURES (QUORUM)
              </label>
              <select
                value={minimumApprovers}
                onChange={(e) => setMinimumApprovers(Number(e.target.value))}
                className="w-full bg-[#111612] border border-[#232D27] rounded p-2.5 text-xs text-white focus:outline-none"
              >
                <option value="2">2 Approvers (Treasurer + Lead)</option>
                <option value="3">3 Approvers (Treasurer + Lead + Auditor)</option>
                <option value="4">4 Approvers (Super-Majority Committee)</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-300 mb-1">ALLOWED EXPENSE CATEGORIES</label>
              <input
                type="text"
                value={expenseCategories}
                onChange={(e) => setExpenseCategories(e.target.value)}
                className="w-full bg-[#111612] border border-[#232D27] rounded p-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded bg-neutral-800 text-neutral-300 hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-5 py-2.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs flex items-center gap-1.5"
              >
                <span>Next: Verification Parameters</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Verification Rules */}
        {step === 4 && (
          <div className="space-y-4 animate-fade-in text-xs font-mono-code">
            <div className="text-neutral-400 uppercase text-[11px]">STEP 4 — VERIFICATION CONSTRAINTS</div>

            <div>
              <label className="block text-neutral-300 mb-1">DESIGNATED OFFICIAL REVIEWER</label>
              <input
                type="text"
                value={officialReviewer}
                onChange={(e) => setOfficialReviewer(e.target.value)}
                className="w-full bg-[#111612] border border-[#232D27] rounded p-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2.5 p-3 rounded bg-[#111612] border border-[#232D27] cursor-pointer">
                <input
                  type="checkbox"
                  checked={receiptRequired}
                  onChange={(e) => setReceiptRequired(e.target.checked)}
                  className="rounded text-[#00FF87] bg-[#070A08]"
                />
                <span className="text-neutral-200">Mandatory IPFS Itemized Receipt for Every Expense</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded bg-[#111612] border border-[#232D27] cursor-pointer">
                <input
                  type="checkbox"
                  checked={multiApprovalRequired}
                  onChange={(e) => setMultiApprovalRequired(e.target.checked)}
                  className="rounded text-[#00FF87] bg-[#070A08]"
                />
                <span className="text-neutral-200">Enforce Multi-Sig Cryptographic Signatures On-Chain</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded bg-[#111612] border border-[#232D27] cursor-pointer">
                <input
                  type="checkbox"
                  checked={publicTransparency}
                  onChange={(e) => setPublicTransparency(e.target.checked)}
                  className="rounded text-[#00FF87] bg-[#070A08]"
                />
                <span className="text-neutral-200">Public Audit Ledger & Reconciliation Graph Enabled</span>
              </label>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2 rounded bg-neutral-800 text-neutral-300 hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="px-5 py-2.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs flex items-center gap-1.5"
              >
                <span>Review & Deploy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Review & Deploy */}
        {step === 5 && !createdResult && (
          <div className="space-y-5 animate-fade-in text-xs font-mono-code">
            <div className="text-neutral-400 uppercase text-[11px]">STEP 5 — SUMMARY & CONTRACT INITIALIZATION</div>

            <div className="p-4 rounded bg-[#0F1411] border border-[#232D27] space-y-3 font-sans">
              <div className="flex justify-between items-start border-b border-neutral-800 pb-2">
                <div>
                  <h3 className="text-base font-bold text-white">{title}</h3>
                  <div className="text-xs text-neutral-400 font-mono-code">{category} • {location}</div>
                </div>
                <div className="text-right font-mono-code">
                  <span className="text-xs text-neutral-400">Target:</span>
                  <div className="text-lg font-bold text-[#00FF87]">₹{goal.toLocaleString('en-IN')}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono-code py-1">
                <div>
                  <span className="text-neutral-500">Quorum:</span> {minimumApprovers} Approvers
                </div>
                <div>
                  <span className="text-neutral-500">Per-Tx Limit:</span> ₹{spendingLimit.toLocaleString('en-IN')}
                </div>
                <div>
                  <span className="text-neutral-500">Official Verifier:</span> {officialReviewer}
                </div>
                <div>
                  <span className="text-neutral-500">Network:</span> Tezos Ghostnet Testnet
                </div>
              </div>
            </div>

            {isDeploying ? (
              <div className="py-8 text-center space-y-3">
                <Clock className="w-8 h-8 text-[#00FF87] animate-spin mx-auto" />
                <div className="text-white font-bold">Compiling Michelson Smart Contract & Deploying...</div>
                <p className="text-neutral-400 text-[11px]">Anchoring escrow logic and multi-sig parameters on-chain.</p>
              </div>
            ) : (
              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-4 py-2 rounded bg-neutral-800 text-neutral-300 hover:text-white"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleDeployContract}
                  className="px-6 py-2.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs font-mono-code flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,135,0.25)]"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Deploy & Create Campaign</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Success Screen with Fake Tezos Contract Address */}
        {createdResult && (
          <div className="py-6 space-y-6 animate-fade-in font-mono-code text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#00FF87]/20 border border-[#00FF87]/40 flex items-center justify-center text-[#00FF87]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white font-sans">Campaign Contract Initialized!</h2>
              <p className="text-xs text-neutral-400">
                The smart contract escrow has been deployed and registered in the institutional index.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#0F1411] border border-[#232D27] space-y-2 text-left text-xs">
              <div className="text-neutral-500 uppercase text-[10px]">TEZOS MICHELSON CONTRACT ADDRESS</div>
              <div className="p-2.5 rounded bg-black/60 border border-neutral-800 text-cyan-400 select-all break-all">
                {createdResult.contractAddress}
              </div>
              <div className="text-emerald-400 text-[11px] flex items-center gap-1 pt-1">
                <CheckCircle2 className="w-3 h-3" /> State Reconciled (Diff: ₹0)
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => navigate(`/admin/campaigns/${createdResult.id}`)}
                className="px-5 py-2.5 rounded bg-[#00FF87] text-black font-bold text-xs"
              >
                Go to Campaign Dashboard
              </button>
              <button
                onClick={() => navigate('/admin/campaigns')}
                className="px-4 py-2.5 rounded bg-[#111612] text-neutral-300 border border-[#232D27] text-xs"
              >
                View All Campaigns
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
