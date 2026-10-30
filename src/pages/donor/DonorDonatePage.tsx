import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Lock,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DonorDonatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { campaigns, currentUser, createDonation } = useApp();
  const navigate = useNavigate();

  const campaign = campaigns.find((c) => c.id === id) || campaigns[0];

  const presetAmounts = [500, 1000, 2500, 5000];
  const [selectedAmount, setSelectedAmount] = useState<number>(2500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(currentUser.anonymousDefault || false);

  // Flow simulation step: 1 = Form, 2 = Confirming / Submitting, 3 = Confirmed
  const [donationStep, setDonationStep] = useState<1 | 2 | 3>(1);
  const [submittingPhase, setSubmittingPhase] = useState<'signing' | 'broadcasting' | 'confirming'>('signing');
  const [confirmedDonation, setConfirmedDonation] = useState<any | null>(null);

  const finalAmount = isCustom ? parseFloat(customAmount) || 0 : selectedAmount;
  const networkFee = 1.25;
  const totalPayable = finalAmount + networkFee;

  const handleStartDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount <= 0) return;

    setDonationStep(2);
    setSubmittingPhase('signing');

    // Step 1: Wallet signature simulation
    setTimeout(() => {
      setSubmittingPhase('broadcasting');
    }, 700);

    // Step 2: Tezos Ghostnet block broadcasting
    setTimeout(() => {
      setSubmittingPhase('confirming');
    }, 1500);

    // Step 3: Confirmed & indexed
    setTimeout(() => {
      const don = createDonation({
        campaignId: campaign.id,
        amount: finalAmount,
        message,
        isAnonymous,
      });
      setConfirmedDonation(don);
      setDonationStep(3);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#00FF87', '#38BDF8', '#A855F7'],
        });
      } catch (err) {
        // ignore
      }
    }, 2400);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link
        to={`/donor/campaigns/${campaign.id}`}
        className="text-xs font-mono-code text-neutral-400 hover:text-white flex items-center gap-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Campaign</span>
      </Link>

      <div className="p-6 sm:p-8 rounded-xl bg-[#090D0B] border border-[#1E2621] space-y-6">
        {/* Campaign Mini Header */}
        <div className="pb-4 border-b border-[#18211C] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono-code text-[#00FF87] uppercase">
              COMMUNITY CONTRIBUTION
            </div>
            <h1 className="text-xl font-bold text-white mt-0.5">{campaign.title}</h1>
            <p className="text-xs text-neutral-400">Vault Contract: {campaign.contractAddress.slice(0, 16)}...</p>
          </div>
          <div className="text-right font-mono-code text-xs">
            <div className="text-neutral-500 uppercase text-[10px]">REMAINING GOAL</div>
            <div className="text-[#00FF87] font-bold">₹{campaign.remaining.toLocaleString('en-IN')}</div>
          </div>
        </div>

        {/* STEP 1: Donation Form */}
        {donationStep === 1 && (
          <form onSubmit={handleStartDonation} className="space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="block text-xs font-mono-code text-neutral-400 uppercase mb-2">
                SELECT CONTRIBUTION AMOUNT
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setIsCustom(false);
                    }}
                    className={`py-3 rounded-lg border font-mono-code text-sm font-bold transition-all ${
                      !isCustom && selectedAmount === amt
                        ? 'bg-[#00FF87]/20 border-[#00FF87] text-[#00FF87] shadow-[0_0_12px_rgba(0,255,135,0.2)]'
                        : 'bg-[#111612] border-[#232D27] text-neutral-300 hover:border-neutral-600'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Custom Amount Field */}
              <div className="mt-3">
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-mono-code text-neutral-500">₹</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setIsCustom(true);
                    }}
                    onFocus={() => setIsCustom(true)}
                    placeholder="Enter custom amount..."
                    min="100"
                    className={`w-full bg-[#111612] border rounded px-3 py-2 pl-7 text-xs font-mono-code text-white focus:outline-none ${
                      isCustom ? 'border-[#00FF87]' : 'border-[#232D27]'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Optional Note / Message */}
            <div>
              <label className="block text-xs font-mono-code text-neutral-400 uppercase mb-1">
                PUBLIC MESSAGE OR DEDICATION (OPTIONAL)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a word of encouragement for the beneficiaries..."
                rows={2}
                className="w-full bg-[#111612] border border-[#232D27] rounded p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00FF87]"
              />
            </div>

            {/* Anonymous Toggle */}
            <div className="p-3.5 rounded bg-[#111612] border border-[#232D27] space-y-1">
              <label className="flex items-center gap-2.5 text-xs text-neutral-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-[#232D27] text-[#00FF87] focus:ring-0 bg-[#070A08]"
                />
                <span className="font-medium">Make this donation anonymous on public leaderboards</span>
              </label>
              <p className="text-[11px] text-neutral-500 pl-6 font-sans">
                Your cryptographic wallet signature will remain on-chain for verification while hiding your real name.
              </p>
            </div>

            {/* Fee Breakdown (Section 14) */}
            <div className="p-4 rounded bg-[#0A0D0B] border border-neutral-800 space-y-2 text-xs font-mono-code">
              <div className="flex justify-between text-neutral-400">
                <span>Pledge Contribution</span>
                <span className="text-white font-bold">₹{finalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Tezos Network Gas Fee</span>
                <span className="text-neutral-300">₹{networkFee.toFixed(2)} (0.00140 XTZ)</span>
              </div>
              <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm">
                <span className="font-bold text-white">Total Amount</span>
                <span className="font-bold text-[#00FF87]">₹{totalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Wallet Info Pill */}
            <div className="flex items-center justify-between text-[11px] font-mono-code text-neutral-400 p-2 rounded bg-black/40 border border-neutral-800">
              <span className="flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-[#00FF87]" />
                Connected Wallet: {currentUser.walletAddress.slice(0, 10)}...{currentUser.walletAddress.slice(-4)}
              </span>
              <span className="text-emerald-400">Tezos Ghostnet</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={finalAmount <= 0}
              className="w-full py-3 rounded-md bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(0,255,135,0.25)] flex items-center justify-center gap-2"
            >
              <span>Continue to Wallet Confirmation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: Simulated Wallet Confirmation */}
        {donationStep === 2 && (
          <div className="py-12 space-y-6 text-center animate-fade-in font-mono-code">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#00FF87]/10 border border-[#00FF87]/30 flex items-center justify-center text-[#00FF87] relative">
              <Clock className="w-8 h-8 animate-spin" />
              <div className="absolute inset-0 rounded-full border border-dashed border-[#00FF87]/50 animate-ping" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white font-sans">
                {submittingPhase === 'signing' && '1/3 Requesting Cryptographic Signature...'}
                {submittingPhase === 'broadcasting' && '2/3 Broadcasting to Tezos Ghostnet Mempool...'}
                {submittingPhase === 'confirming' && '3/3 Awaiting Michelson Contract Consensus Block...'}
              </h3>
              <p className="text-xs text-neutral-400 font-sans">
                Anchoring contribution of ₹{finalAmount.toLocaleString('en-IN')} to smart contract vault.
              </p>
            </div>

            <div className="max-w-xs mx-auto p-3 rounded bg-black/50 border border-neutral-800 text-[11px] text-neutral-400">
              Signer: {currentUser.walletAddress.slice(0, 12)}...
            </div>
          </div>
        )}

        {/* STEP 3: Confirmed & Success (Section 14) */}
        {donationStep === 3 && confirmedDonation && (
          <div className="py-6 space-y-6 animate-fade-in font-sans">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#00FF87]/20 border border-[#00FF87]/40 flex items-center justify-center text-[#00FF87]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Donation Confirmed!</h2>
              <p className="text-xs text-neutral-400 font-mono-code">
                Cryptographic transaction anchored on Tezos Ghostnet block #{confirmedDonation.blockNumber}
              </p>
            </div>

            {/* Transaction Hash Card (Section 14) */}
            <div className="p-4 rounded-lg bg-[#0F1411] border border-[#232D27] space-y-2 font-mono-code text-xs">
              <div className="flex justify-between text-[11px] text-neutral-400">
                <span>TRANSACTION OPERATION HASH</span>
                <span className="text-[#00FF87]">BLOCKCHAIN CONFIRMED</span>
              </div>
              <div className="p-2.5 rounded bg-black/60 border border-neutral-800 text-neutral-200 break-all select-all text-xs">
                {confirmedDonation.txHash}
              </div>
              <div className="flex justify-between items-center pt-2 text-[11px]">
                <span className="text-neutral-500">Official Status:</span>
                <span className="text-amber-400 font-semibold">
                  PENDING OFFICIAL AUDITOR REVIEW
                </span>
              </div>
            </div>

            {/* Action buttons (Section 14: View transaction, View verification) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate(`/donor/donations/${confirmedDonation.id}`)}
                className="py-2.5 rounded bg-[#111612] hover:bg-[#161D18] border border-[#232D27] text-neutral-200 text-xs font-mono-code transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Donation Record</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigate(`/verify/${confirmedDonation.txHash}`)}
                className="py-2.5 rounded bg-[#00FF87] hover:bg-[#00e57a] text-black font-semibold text-xs font-mono-code transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Verify on Public Engine</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-center pt-2">
              <Link to="/donor/dashboard" className="text-xs text-[#00FF87] hover:underline font-mono-code">
                ← Return to Donor Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
