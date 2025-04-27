
interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    removeAllListeners: () => void;
    removeListener: (event: string, callback: (...args: any[]) => void) => void;
    selectedAddress?: string;
    chainId?: string;
    networkVersion?: string;
  };
}

// Smart contract related types
interface BidderInfo {
  name: string;
  document: string;
  isRegistered: boolean;
}

interface ProposalData {
  id: number;
  editalId: number;
  bidder: string;
  value: bigint;
  description: string;
  timestamp: number;
  status: 'pending' | 'approved' | 'rejected';
}

interface EditalData {
  id: number;
  title: string;
  description: string;
  budget: bigint;
  deadline: number;
  documentHash: string;
  status: 'open' | 'closed' | 'completed';
  proposalsCount: number;
  createdAt: number;
}

interface TransactionData {
  hash: string;
  type: 'register' | 'proposal' | 'contract' | 'document';
  status: 'pending' | 'confirmed' | 'failed';
  from: string;
  to: string;
  data: any;
  timestamp: number;
  blockNumber?: number;
}
