export type UserRole = 'donor' | 'admin' | 'guest';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  walletAddress: string;
  department?: string;
  organization?: string;
  memberSince: string;
  anonymousDefault?: boolean;
}

export type CampaignStatus = 'active' | 'nearly_funded' | 'completed' | 'upcoming' | 'archived';
export type VerificationStatus = 'verified' | 'pending' | 'unverified';

export interface Campaign {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Education' | 'Healthcare' | 'Food relief' | 'Community development' | 'Emergency relief' | 'Technology';
  location: string;
  organizer: string;
  organizerRole: string;
  officialVerifier: string;
  officialVerifierRole: string;
  goal: number;
  raised: number;
  spent: number;
  remaining: number;
  startDate: string;
  deadline: string;
  status: CampaignStatus;
  verificationStatus: VerificationStatus;
  contractAddress: string;
  donorsCount: number;
  expensesCount: number;
  matchingBlockchain: boolean;
  indexedBalance: number;
  coverImage?: string;
  expectedImpact: string;
  governance: {
    spendingLimitPerTx: number;
    minimumApprovers: number;
    multiSigRequired: boolean;
    receiptRequired: boolean;
    publicAuditEnabled: boolean;
  };
}

export type BlockchainStatus = 'PENDING' | 'CONFIRMED' | 'FAILED';
export type OfficialStatus = 'PENDING_REVIEW' | 'VERIFIED' | 'REJECTED' | 'NEEDS_REVIEW';

export interface Donation {
  id: string;
  campaignId: string;
  campaignTitle: string;
  donorName: string;
  donorEmail: string;
  isAnonymous: boolean;
  amount: number;
  networkFee: number;
  timestamp: string;
  walletAddress: string;
  txHash: string;
  blockNumber: number;
  network: string;
  blockchainStatus: BlockchainStatus;
  officialStatus: OfficialStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  verificationNotes?: string;
  receiptCID?: string;
  message?: string;
}

export type ExpenseStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'RECORDED' | 'REJECTED';

export interface ApproverSignature {
  id: string;
  name: string;
  role: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  timestamp?: string;
  signatureHash?: string;
}

export interface Expense {
  id: string;
  campaignId: string;
  campaignTitle: string;
  amount: number;
  category: 'Food' | 'Transport' | 'Medical' | 'Equipment' | 'Education' | 'Operations' | 'Other';
  description: string;
  vendor: string;
  submittedBy: string;
  date: string;
  receiptCID: string;
  receiptFileName: string;
  status: ExpenseStatus;
  requiredApprovals: number;
  approvers: ApproverSignature[];
  txHash?: string;
  blockNumber?: number;
  anchoredOnChain: boolean;
  reconciled: boolean;
  ipfsPinned: boolean;
}

export interface TransactionRecord {
  id: string;
  txHash: string;
  type: 'DONATION' | 'EXPENSE' | 'CORRECTION' | 'CONTRACT_DEPLOY';
  amount: number;
  campaignId: string;
  campaignTitle: string;
  walletAddress: string;
  blockNumber: number;
  timestamp: string;
  status: 'CONFIRMED' | 'PENDING' | 'FAILED';
  verification: 'OFFICIALLY_VERIFIED' | 'BLOCKCHAIN_ONLY' | 'PENDING';
  gasUsed: string;
  contract: string;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  entityType: 'CAMPAIGN' | 'DONATION' | 'EXPENSE' | 'RECEIPT' | 'APPROVAL' | 'RECONCILIATION';
  entityId: string;
  txHash?: string;
  evidenceCID?: string;
  description: string;
  isCorrection?: boolean;
  originalRecordId?: string;
  correctionReason?: string;
}

export interface AppNotification {
  id: string;
  targetRole: 'donor' | 'admin' | 'all';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'donation' | 'expense' | 'approval' | 'verification' | 'system' | 'campaign';
  link?: string;
}
