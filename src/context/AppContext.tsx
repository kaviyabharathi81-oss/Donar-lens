import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  Campaign,
  Donation,
  Expense,
  TransactionRecord,
  AuditRecord,
  AppNotification,
} from '../types';
import {
  DEMO_USERS,
  ADMIN_COMMITTEE_MEMBERS,
  INITIAL_CAMPAIGNS,
  INITIAL_DONATIONS,
  INITIAL_EXPENSES,
  INITIAL_TRANSACTIONS,
  INITIAL_AUDIT_LOG,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

interface AppContextType {
  currentUser: UserProfile;
  currentRole: UserRole;
  activeAdminSigner: UserProfile;
  adminCommittee: UserProfile[];
  theme: 'dark' | 'light';
  campaigns: Campaign[];
  donations: Donation[];
  expenses: Expense[];
  transactions: TransactionRecord[];
  auditLog: AuditRecord[];
  notifications: AppNotification[];
  savedCampaignIds: string[];
  previewReceipt: Expense | null;
  previewTx: TransactionRecord | null;
  switchRole: (role: 'donor' | 'admin') => void;
  setActiveAdminSigner: (signer: UserProfile) => void;
  login: (email: string, role: 'donor' | 'admin', name?: string) => void;
  logout: () => void;
  toggleTheme: () => void;
  setThemeMode: (mode: 'dark' | 'light') => void;
  toggleSaveCampaign: (campaignId: string) => void;
  createDonation: (data: { campaignId: string; amount: number; message?: string; isAnonymous: boolean }) => Donation;
  verifyDonation: (donationId: string, notes?: string) => void;
  rejectDonation: (donationId: string, reason?: string) => void;
  createExpense: (data: {
    campaignId: string;
    amount: number;
    category: Expense['category'];
    description: string;
    vendor: string;
    date: string;
    receiptFileName: string;
  }) => Expense;
  approveExpense: (expenseId: string, approverName?: string) => void;
  approveAdminSignature: (
    expenseId: string,
    signerNameOrId: string,
    signerProfile?: UserProfile
  ) => { success: boolean; isQuorumReached: boolean; message: string };
  rejectExpense: (expenseId: string, reason?: string) => void;
  createCampaign: (data: Partial<Campaign>) => Campaign;
  markNotificationRead: (id: string) => void;
  setPreviewReceipt: (expense: Expense | null) => void;
  setPreviewTx: (tx: TransactionRecord | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('dl_current_role');
    if (saved === 'admin') return DEMO_USERS.admin;
    return DEMO_USERS.donor;
  });

  const [activeAdminSigner, setActiveAdminSigner] = useState<UserProfile>(() => {
    const savedId = localStorage.getItem('dl_active_signer');
    const matched = ADMIN_COMMITTEE_MEMBERS.find(m => m.id === savedId);
    return matched || ADMIN_COMMITTEE_MEMBERS[0];
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('dl_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return 'dark';
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [donations, setDonations] = useState<Donation[]>(INITIAL_DONATIONS);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(INITIAL_TRANSACTIONS);
  const [auditLog, setAuditLog] = useState<AuditRecord[]>(INITIAL_AUDIT_LOG);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [savedCampaignIds, setSavedCampaignIds] = useState<string[]>(['camp_001', 'camp_004']);
  const [previewReceipt, setPreviewReceipt] = useState<Expense | null>(null);
  const [previewTx, setPreviewTx] = useState<TransactionRecord | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('dl_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('dl_theme', next);
      return next;
    });
  };

  const setThemeMode = (mode: 'dark' | 'light') => {
    setTheme(mode);
    localStorage.setItem('dl_theme', mode);
  };

  const handleSetActiveAdminSigner = (signer: UserProfile) => {
    setActiveAdminSigner(signer);
    localStorage.setItem('dl_active_signer', signer.id);
    if (currentUser.role === 'admin') {
      setCurrentUser(signer);
    }
  };

  const switchRole = (role: 'donor' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser(activeAdminSigner);
    } else {
      setCurrentUser(DEMO_USERS.donor);
    }
    localStorage.setItem('dl_current_role', role);
  };

  const login = (email: string, role: 'donor' | 'admin', name?: string) => {
    const base = DEMO_USERS[role];
    const user: UserProfile = {
      ...base,
      email: email || base.email,
      name: name || base.name,
    };
    setCurrentUser(user);
    localStorage.setItem('dl_current_role', role);
  };

  const logout = () => {
    // defaults back to donor for demo flow
    switchRole('donor');
  };

  const toggleSaveCampaign = (campaignId: string) => {
    setSavedCampaignIds(prev =>
      prev.includes(campaignId) ? prev.filter(id => id !== campaignId) : [...prev, campaignId]
    );
  };

  const createDonation = ({
    campaignId,
    amount,
    message,
    isAnonymous,
  }: {
    campaignId: string;
    amount: number;
    message?: string;
    isAnonymous: boolean;
  }): Donation => {
    const camp = campaigns.find(c => c.id === campaignId) || campaigns[0];
    const newId = `don_${Date.now().toString().slice(-4)}`;
    const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const txHash = `op${randomHex}`;
    const blockNumber = 4982400 + Math.floor(Math.random() * 50);

    const newDonation: Donation = {
      id: newId,
      campaignId: camp.id,
      campaignTitle: camp.title,
      donorName: isAnonymous ? 'Anonymous Donor' : currentUser.name,
      donorEmail: isAnonymous ? 'anon@donorlens.demo' : currentUser.email,
      isAnonymous,
      amount,
      networkFee: 1.25,
      timestamp: new Date().toISOString(),
      walletAddress: currentUser.walletAddress,
      txHash,
      blockNumber,
      network: 'Tezos Ghostnet',
      blockchainStatus: 'CONFIRMED',
      officialStatus: 'PENDING_REVIEW',
      message,
    };

    // Update donations
    setDonations(prev => [newDonation, ...prev]);

    // Update campaign balance
    setCampaigns(prev =>
      prev.map(c => {
        if (c.id === camp.id) {
          const newRaised = c.raised + amount;
          const newRemaining = c.remaining + amount;
          return {
            ...c,
            raised: newRaised,
            remaining: newRemaining,
            indexedBalance: newRemaining,
            donorsCount: c.donorsCount + 1,
          };
        }
        return c;
      })
    );

    // Create on-chain transaction record
    const newTx: TransactionRecord = {
      id: `tx_${Date.now()}`,
      txHash,
      type: 'DONATION',
      amount,
      campaignId: camp.id,
      campaignTitle: camp.title,
      walletAddress: currentUser.walletAddress,
      blockNumber,
      timestamp: new Date().toISOString(),
      status: 'CONFIRMED',
      verification: 'PENDING',
      gasUsed: '0.00140 XTZ',
      contract: camp.contractAddress,
    };
    setTransactions(prev => [newTx, ...prev]);

    // Append to immutable audit log
    const auditEntry: AuditRecord = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: `${currentUser.name} (${currentUser.walletAddress.slice(0, 8)}...)`,
      actorRole: 'Community Donor',
      action: 'Donation Deposited & On-Chain Anchored',
      entityType: 'DONATION',
      entityId: newId,
      txHash,
      description: `Cryptographic deposit of ₹${amount.toLocaleString('en-IN')} confirmed on Tezos Ghostnet block #${blockNumber}. Awaiting official auditor review.`,
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    // Trigger notification for admin
    const adminNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      targetRole: 'admin',
      title: 'New Donation Awaiting Verification',
      description: `${currentUser.name} contributed ₹${amount.toLocaleString('en-IN')} to "${camp.title}". Hash: ${txHash.slice(0, 12)}...`,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'verification',
      link: `/admin/campaigns/${camp.id}/donations`,
    };
    setNotifications(prev => [adminNotif, ...prev]);

    return newDonation;
  };

  const verifyDonation = (donationId: string, notes?: string) => {
    let verifiedDonation: Donation | undefined;
    setDonations(prev =>
      prev.map(d => {
        if (d.id === donationId) {
          verifiedDonation = {
            ...d,
            officialStatus: 'VERIFIED',
            verifiedBy: currentUser.name,
            verifiedAt: new Date().toISOString(),
            verificationNotes: notes || 'Verified against institutional banking escrow & cryptographic index.',
          };
          return verifiedDonation;
        }
        return d;
      })
    );

    // Update matching transaction record
    setTransactions(prev =>
      prev.map(tx => {
        if (verifiedDonation && tx.txHash === verifiedDonation.txHash) {
          return { ...tx, verification: 'OFFICIALLY_VERIFIED' };
        }
        return tx;
      })
    );

    // Append to audit log
    if (verifiedDonation) {
      const auditEntry: AuditRecord = {
        id: `aud_${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: currentUser.name,
        actorRole: 'Chief Financial Comptroller & Auditor',
        action: 'Official Donation Verification Attested',
        entityType: 'DONATION',
        entityId: donationId,
        txHash: verifiedDonation.txHash,
        description: `Official verification granted for ₹${verifiedDonation.amount.toLocaleString('en-IN')} by ${currentUser.name}. Status updated to OFFICIALLY VERIFIED.`,
      };
      setAuditLog(prev => [auditEntry, ...prev]);

      // Notify donor
      const donorNotif: AppNotification = {
        id: `notif_${Date.now()}`,
        targetRole: 'donor',
        title: 'Donation Officially Verified!',
        description: `Your contribution of ₹${verifiedDonation.amount.toLocaleString('en-IN')} has been officially attested by ${currentUser.name}.`,
        timestamp: new Date().toISOString(),
        read: false,
        type: 'verification',
        link: `/donor/donations/${donationId}`,
      };
      setNotifications(prev => [donorNotif, ...prev]);
    }
  };

  const rejectDonation = (donationId: string, reason?: string) => {
    setDonations(prev =>
      prev.map(d => {
        if (d.id === donationId) {
          return {
            ...d,
            officialStatus: 'REJECTED',
            verificationNotes: reason || 'Nodal banking record mismatch. Flagged for review.',
          };
        }
        return d;
      })
    );
  };

  const createExpense = ({
    campaignId,
    amount,
    category,
    description,
    vendor,
    date,
    receiptFileName,
  }: {
    campaignId: string;
    amount: number;
    category: Expense['category'];
    description: string;
    vendor: string;
    date: string;
    receiptFileName: string;
  }): Expense => {
    const camp = campaigns.find(c => c.id === campaignId) || campaigns[0];
    const newId = `exp_${Date.now().toString().slice(-4)}`;
    const randomCID = 'bafybeig' + Array.from({ length: 48 }, () => Math.floor(Math.random() * 36).toString(36)).join('');

    const newExpense: Expense = {
      id: newId,
      campaignId: camp.id,
      campaignTitle: camp.title,
      amount,
      category,
      description,
      vendor,
      submittedBy: currentUser.name,
      date: date || new Date().toISOString().slice(0, 10),
      receiptCID: randomCID,
      receiptFileName: receiptFileName || `Invoice_${newId}.pdf`,
      status: 'PENDING_APPROVAL',
      requiredApprovals: camp.governance.minimumApprovers || 3,
      approvers: [
        { id: 'app_1', name: 'Vikram Joshi', role: 'Treasurer', status: 'PENDING' },
        { id: 'app_2', name: 'Dr. Neha Rao', role: 'Project Lead', status: 'PENDING' },
        { id: 'app_3', name: 'Dr. Priya Sundaram', role: 'Auditor', status: 'PENDING' },
      ],
      anchoredOnChain: false,
      reconciled: false,
      ipfsPinned: true,
    };

    setExpenses(prev => [newExpense, ...prev]);

    // Append to audit log
    const auditEntry: AuditRecord = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: currentUser.name,
      actorRole: 'Official Campaign Manager',
      action: 'Expense Submitted & Receipt IPFS Pinned',
      entityType: 'EXPENSE',
      entityId: newId,
      evidenceCID: randomCID,
      description: `Expense voucher of ₹${amount.toLocaleString('en-IN')} for "${vendor}" submitted. CID: ${randomCID.slice(0, 16)}... Awaiting multi-sig committee signatures.`,
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    return newExpense;
  };

  const approveAdminSignature = (
    expenseId: string,
    signerNameOrId: string,
    signerProfile?: UserProfile
  ): { success: boolean; isQuorumReached: boolean; message: string } => {
    let targetExpense: Expense | undefined;
    let isQuorumReached = false;
    let alreadyApproved = false;
    let notFound = false;
    let foundApproverName = '';
    let foundApproverRole = '';
    const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newTxHash = `op${randomHex}`;
    const blockNumber = 4982420 + Math.floor(Math.random() * 30);

    setExpenses(prev =>
      prev.map(exp => {
        if (exp.id === expenseId) {
          const targetIndex = exp.approvers.findIndex(
            a =>
              a.id === signerNameOrId ||
              a.name.toLowerCase() === signerNameOrId.toLowerCase() ||
              a.role.toLowerCase() === signerNameOrId.toLowerCase()
          );

          if (targetIndex === -1) {
            notFound = true;
            return exp;
          }

          if (exp.approvers[targetIndex].status === 'APPROVED') {
            alreadyApproved = true;
            foundApproverName = exp.approvers[targetIndex].name;
            return exp;
          }

          const signer = exp.approvers[targetIndex];
          foundApproverName = signer.name;
          foundApproverRole = signer.role;

          const updatedApprovers = exp.approvers.map((app, idx) => {
            if (idx === targetIndex) {
              return {
                ...app,
                status: 'APPROVED' as const,
                timestamp: new Date().toISOString(),
                signatureHash: `sig_0x${Math.floor(Math.random() * 0xffffffff).toString(16)}`,
              };
            }
            return app;
          });

          const approvedCount = updatedApprovers.filter(a => a.status === 'APPROVED').length;
          const quorumMet = approvedCount >= exp.requiredApprovals;
          isQuorumReached = quorumMet;

          targetExpense = {
            ...exp,
            approvers: updatedApprovers,
            status: quorumMet ? ('APPROVED' as const) : exp.status,
            anchoredOnChain: quorumMet ? true : exp.anchoredOnChain,
            reconciled: quorumMet ? true : exp.reconciled,
            txHash: quorumMet ? newTxHash : exp.txHash,
            blockNumber: quorumMet ? blockNumber : exp.blockNumber,
          };
          return targetExpense;
        }
        return exp;
      })
    );

    if (alreadyApproved) {
      return {
        success: false,
        isQuorumReached: false,
        message: `${foundApproverName} has already recorded their signature for this voucher.`,
      };
    }

    if (notFound || !targetExpense) {
      return {
        success: false,
        isQuorumReached: false,
        message: 'Disbursement voucher or designated committee approver was not found.',
      };
    }

    const currentApprovedCount = targetExpense.approvers.filter(a => a.status === 'APPROVED').length;

    if (isQuorumReached) {
      const exp = targetExpense;
      setCampaigns(prev =>
        prev.map(c => {
          if (c.id === exp.campaignId) {
            const newSpent = c.spent + exp.amount;
            const newRemaining = Math.max(0, c.remaining - exp.amount);
            return {
              ...c,
              spent: newSpent,
              remaining: newRemaining,
              indexedBalance: newRemaining,
              expensesCount: c.expensesCount + 1,
            };
          }
          return c;
        })
      );

      const expTx: TransactionRecord = {
        id: `tx_${Date.now()}`,
        txHash: newTxHash,
        type: 'EXPENSE',
        amount: exp.amount,
        campaignId: exp.campaignId,
        campaignTitle: exp.campaignTitle,
        walletAddress: signerProfile?.walletAddress || currentUser.walletAddress,
        blockNumber,
        timestamp: new Date().toISOString(),
        status: 'CONFIRMED',
        verification: 'OFFICIALLY_VERIFIED',
        gasUsed: '0.00280 XTZ',
        contract: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      };
      setTransactions(prev => [expTx, ...prev]);

      const auditEntry: AuditRecord = {
        id: `aud_${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: `${foundApproverName} (${foundApproverRole})`,
        actorRole: foundApproverRole,
        action: 'Multi-Sig Quorum Finalized & Vault Disbursed',
        entityType: 'EXPENSE',
        entityId: exp.id,
        txHash: newTxHash,
        evidenceCID: exp.receiptCID,
        description: `Disbursement of ₹${exp.amount.toLocaleString('en-IN')} officially authorized. Final signature verified by ${foundApproverName}. Consensus (3 of 3 signatures) achieved. Anchored to Tezos Ghostnet block #${blockNumber}.`,
      };
      setAuditLog(prev => [auditEntry, ...prev]);

      const notif: AppNotification = {
        id: `notif_${Date.now()}`,
        targetRole: 'all',
        title: 'Multi-Sig Escrow Released',
        description: `Voucher #${exp.id} (₹${exp.amount.toLocaleString('en-IN')}) finalized with all 3 signatures. Funds disbursed & anchored on-chain.`,
        timestamp: new Date().toISOString(),
        read: false,
        type: 'expense',
      };
      setNotifications(prev => [notif, ...prev]);

      return {
        success: true,
        isQuorumReached: true,
        message: `Quorum reached! All ${exp.requiredApprovals} admins approved. Escrow released & anchored on-chain.`,
      };
    } else {
      const exp = targetExpense;
      const remainingNeeded = exp.requiredApprovals - currentApprovedCount;

      const auditEntry: AuditRecord = {
        id: `aud_${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: `${foundApproverName} (${foundApproverRole})`,
        actorRole: foundApproverRole,
        action: 'Multi-Sig Signature Appended',
        entityType: 'APPROVAL',
        entityId: exp.id,
        description: `Cryptographic approval signature appended by ${foundApproverName} (${foundApproverRole}) for voucher #${exp.id}. [${currentApprovedCount}/${exp.requiredApprovals} signatures gathered].`,
      };
      setAuditLog(prev => [auditEntry, ...prev]);

      const adminNotif: AppNotification = {
        id: `notif_${Date.now()}`,
        targetRole: 'admin',
        title: `Signature Added: ${foundApproverName}`,
        description: `Signature appended to voucher #${exp.id} (₹${exp.amount.toLocaleString('en-IN')}). Awaiting ${remainingNeeded} more signature(s).`,
        timestamp: new Date().toISOString(),
        read: false,
        type: 'approval',
        link: `/admin/campaigns/${exp.campaignId}/approvals`,
      };
      setNotifications(prev => [adminNotif, ...prev]);

      return {
        success: true,
        isQuorumReached: false,
        message: `Signature recorded for ${foundApproverName}. ${currentApprovedCount}/${exp.requiredApprovals} signatures gathered (${remainingNeeded} pending).`,
      };
    }
  };

  const approveExpense = (expenseId: string, approverName?: string) => {
    const signer = approverName || activeAdminSigner.name;
    approveAdminSignature(expenseId, signer, activeAdminSigner);
  };

  const rejectExpense = (expenseId: string, reason?: string) => {
    setExpenses(prev =>
      prev.map(exp => {
        if (exp.id === expenseId) {
          return {
            ...exp,
            status: 'REJECTED' as const,
          };
        }
        return exp;
      })
    );

    const auditEntry: AuditRecord = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: activeAdminSigner.name,
      actorRole: 'Multi-Sig Committee Officer',
      action: 'Expense Disbursement Rejected',
      entityType: 'EXPENSE',
      entityId: expenseId,
      description: `Disbursement voucher #${expenseId} rejected. Reason: ${reason || 'Non-compliant documentation or quote irregularity.'}`,
    };
    setAuditLog(prev => [auditEntry, ...prev]);
  };

  const createCampaign = (data: Partial<Campaign>): Campaign => {
    const randomContract = 'KT1' + Array.from({ length: 33 }, () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]).join('');
    const newCamp: Campaign = {
      id: `camp_${Date.now().toString().slice(-4)}`,
      title: data.title || 'Untitled Initiative',
      tagline: data.tagline || 'Community transparent campaign',
      description: data.description || '',
      category: data.category || 'Education',
      location: data.location || 'Campus / Community Center',
      organizer: data.organizer || currentUser.name,
      organizerRole: 'Campaign Lead',
      officialVerifier: 'Dr. Priya Sundaram',
      officialVerifierRole: 'Chief Financial Comptroller & Auditor',
      goal: data.goal || 100000,
      raised: 0,
      spent: 0,
      remaining: 0,
      startDate: data.startDate || new Date().toISOString().slice(0, 10),
      deadline: data.deadline || '2026-12-31',
      status: 'active',
      verificationStatus: 'verified',
      contractAddress: randomContract,
      donorsCount: 0,
      expensesCount: 0,
      matchingBlockchain: true,
      indexedBalance: 0,
      expectedImpact: data.expectedImpact || 'Accountable community support with verified receipts.',
      governance: {
        spendingLimitPerTx: data.governance?.spendingLimitPerTx || 50000,
        minimumApprovers: data.governance?.minimumApprovers || 3,
        multiSigRequired: true,
        receiptRequired: true,
        publicAuditEnabled: true,
      },
    };

    setCampaigns(prev => [newCamp, ...prev]);

    // Add audit entry for campaign initialization
    const auditEntry: AuditRecord = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: currentUser.name,
      actorRole: 'Authorized Official',
      action: 'Campaign Smart Contract Initialized',
      entityType: 'CAMPAIGN',
      entityId: newCamp.id,
      txHash: `op${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
      description: `New campaign "${newCamp.title}" deployed to Tezos Ghostnet with contract ${randomContract}. Governance: ${newCamp.governance.minimumApprovers} multi-sig signers.`,
    };
    setAuditLog(prev => [auditEntry, ...prev]);

    return newCamp;
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole: currentUser.role,
        activeAdminSigner,
        adminCommittee: ADMIN_COMMITTEE_MEMBERS,
        theme,
        campaigns,
        donations,
        expenses,
        transactions,
        auditLog,
        notifications,
        savedCampaignIds,
        previewReceipt,
        previewTx,
        switchRole,
        setActiveAdminSigner: handleSetActiveAdminSigner,
        login,
        logout,
        toggleTheme,
        setThemeMode,
        toggleSaveCampaign,
        createDonation,
        verifyDonation,
        rejectDonation,
        createExpense,
        approveExpense,
        approveAdminSignature,
        rejectExpense,
        createCampaign,
        markNotificationRead,
        setPreviewReceipt,
        setPreviewTx,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
