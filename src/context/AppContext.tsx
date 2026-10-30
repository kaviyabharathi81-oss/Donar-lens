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
  login: (email: string, role: 'donor' | 'admin', name?: string) => void;
  logout: () => void;
  toggleTheme: () => void;
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

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
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
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const switchRole = (role: 'donor' | 'admin') => {
    const user = DEMO_USERS[role];
    setCurrentUser(user);
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

  const approveExpense = (expenseId: string, approverName = 'Dr. Priya Sundaram') => {
    let targetExpense: Expense | undefined;
    let willBecomeApproved = false;
    const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newTxHash = `op${randomHex}`;
    const blockNumber = 4982420 + Math.floor(Math.random() * 30);

    setExpenses(prev =>
      prev.map(exp => {
        if (exp.id === expenseId) {
          // Find pending approver or match current user
          const updatedApprovers = exp.approvers.map(app => {
            if (app.status === 'PENDING' && (app.name === approverName || !app.timestamp)) {
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
          const isNowApproved = approvedCount >= exp.requiredApprovals;
          willBecomeApproved = isNowApproved;

          targetExpense = {
            ...exp,
            approvers: updatedApprovers,
            status: isNowApproved ? ('APPROVED' as const) : exp.status,
            anchoredOnChain: isNowApproved ? true : exp.anchoredOnChain,
            reconciled: isNowApproved ? true : exp.reconciled,
            txHash: isNowApproved ? newTxHash : exp.txHash,
            blockNumber: isNowApproved ? blockNumber : exp.blockNumber,
          };
          return targetExpense;
        }
        return exp;
      })
    );

    // If fully approved, deduct from campaign remaining & add to spent!
    if (willBecomeApproved && targetExpense) {
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

      // Add expense transaction
      const expTx: TransactionRecord = {
        id: `tx_${Date.now()}`,
        txHash: newTxHash,
        type: 'EXPENSE',
        amount: exp.amount,
        campaignId: exp.campaignId,
        campaignTitle: exp.campaignTitle,
        walletAddress: currentUser.walletAddress,
        blockNumber,
        timestamp: new Date().toISOString(),
        status: 'CONFIRMED',
        verification: 'OFFICIALLY_VERIFIED',
        gasUsed: '0.00280 XTZ',
        contract: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      };
      setTransactions(prev => [expTx, ...prev]);

      // Append to audit log
      const auditEntry: AuditRecord = {
        id: `aud_${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: 'Multi-Sig Quorum',
        actorRole: 'Oversight Committee',
        action: 'Expense Approved & Anchored On-Chain',
        entityType: 'EXPENSE',
        entityId: exp.id,
        txHash: newTxHash,
        evidenceCID: exp.receiptCID,
        description: `Disbursement of ₹${exp.amount.toLocaleString('en-IN')} approved by multi-sig quorum. Anchored to Tezos block #${blockNumber}. Reconciled balance updated.`,
      };
      setAuditLog(prev => [auditEntry, ...prev]);

      // Notify donor & community
      const notif: AppNotification = {
        id: `notif_${Date.now()}`,
        targetRole: 'all',
        title: 'Campaign Expense Approved',
        description: `₹${exp.amount.toLocaleString('en-IN')} for "${exp.description}" approved and anchored on-chain with IPFS receipt.`,
        timestamp: new Date().toISOString(),
        read: false,
        type: 'expense',
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const rejectExpense = (expenseId: string, reason?: string) => {
    setExpenses(prev =>
      prev.map(exp => {
        if (exp.id === expenseId) {
          return {
            ...exp,
            status: 'REJECTED',
          };
        }
        return exp;
      })
    );
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
        login,
        logout,
        toggleTheme,
        toggleSaveCampaign,
        createDonation,
        verifyDonation,
        rejectDonation,
        createExpense,
        approveExpense,
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
