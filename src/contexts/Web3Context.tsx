
import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useToast } from "@/components/ui/use-toast";
import { toast } from "@/components/ui/sonner";

// Sample ABI for bidding contract - would be replaced with actual contract ABI
const biddingABI = [
  "function registerBidder(string memory name, string memory document) public returns (bool)",
  "function submitProposal(uint256 editalId, uint256 value, string memory description) public returns (uint256)",
  "function getProposals(uint256 editalId) public view returns (uint256[] memory, address[] memory, uint256[] memory)",
  "function getBidderInfo(address bidder) public view returns (string memory, string memory, bool)",
  "event BidderRegistered(address indexed bidder, string name, uint256 timestamp)",
  "event ProposalSubmitted(uint256 indexed editalId, address indexed bidder, uint256 value, uint256 timestamp)"
];

interface Web3ContextType {
  provider: ethers.BrowserProvider | null;
  contract: ethers.Contract | null;
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
  isRegisteredBidder: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  registerBidder: (name: string, document: string) => Promise<void>;
  submitProposal: (editalId: number, value: number, description: string) => Promise<void>;
  verifyDocument: (documentHash: string) => Promise<boolean>;
  listenToEvents: () => void;
}

const Web3Context = createContext<Web3ContextType | null>(null);

// Sample contract address - would be replaced with actual deployed contract address
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isRegisteredBidder, setIsRegisteredBidder] = useState<boolean>(false);
  const { toast: uiToast } = useToast();

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const network = await provider.getNetwork();
        const signer = await provider.getSigner();
        
        // Initialize contract
        const biddingContract = new ethers.Contract(CONTRACT_ADDRESS, biddingABI, signer);
        
        setProvider(provider);
        setContract(biddingContract);
        setAccount(accounts[0]);
        setChainId(Number(network.chainId));
        setIsConnected(true);

        // Check if user is a registered bidder
        try {
          const bidderInfo = await biddingContract.getBidderInfo(accounts[0]);
          setIsRegisteredBidder(bidderInfo[2]); // index 2 contains isRegistered boolean
        } catch (error) {
          console.error("Error checking bidder status:", error);
          setIsRegisteredBidder(false);
        }

        uiToast({
          title: "Carteira conectada",
          description: `Conectado à conta ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        });

        // Set up event listeners
        listenToEvents();
      } catch (error) {
        console.error("Error connecting wallet:", error);
        uiToast({
          variant: "destructive",
          title: "Erro ao conectar",
          description: "Não foi possível conectar à carteira.",
        });
      }
    } else {
      uiToast({
        variant: "destructive",
        title: "Carteira não encontrada",
        description: "Por favor, instale uma carteira Ethereum como MetaMask.",
      });
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setContract(null);
    setAccount(null);
    setChainId(null);
    setIsConnected(false);
    setIsRegisteredBidder(false);
    uiToast({
      title: "Desconectado",
      description: "Carteira desconectada com sucesso.",
    });
  };

  const registerBidder = async (name: string, document: string) => {
    if (!contract || !account) {
      uiToast({
        variant: "destructive",
        title: "Não conectado",
        description: "Conecte-se a uma carteira primeiro.",
      });
      return;
    }

    try {
      // Show pending toast
      toast.loading("Registrando licitante...");
      
      // Send transaction
      const tx = await contract.registerBidder(name, document);
      
      // Wait for confirmation
      await tx.wait();
      
      // Update state
      setIsRegisteredBidder(true);
      
      // Show success toast
      toast.dismiss();
      toast.success("Licitante registrado com sucesso!");
    } catch (error) {
      console.error("Error registering bidder:", error);
      toast.dismiss();
      toast.error("Erro ao registrar licitante.");
    }
  };

  const submitProposal = async (editalId: number, value: number, description: string) => {
    if (!contract || !account) {
      uiToast({
        variant: "destructive",
        title: "Não conectado",
        description: "Conecte-se a uma carteira primeiro.",
      });
      return;
    }

    if (!isRegisteredBidder) {
      uiToast({
        variant: "destructive",
        title: "Não registrado",
        description: "Você precisa estar registrado como licitante.",
      });
      return;
    }

    try {
      // Show pending toast
      toast.loading("Enviando proposta...");
      
      // Send transaction
      const tx = await contract.submitProposal(editalId, ethers.parseEther(value.toString()), description);
      
      // Wait for confirmation
      await tx.wait();
      
      // Show success toast
      toast.dismiss();
      toast.success("Proposta enviada com sucesso!");
    } catch (error) {
      console.error("Error submitting proposal:", error);
      toast.dismiss();
      toast.error("Erro ao enviar proposta.");
    }
  };

  const verifyDocument = async (documentHash: string) => {
    // In a real implementation, this would check the document against blockchain records
    // For now, we'll return a mock result
    return Promise.resolve(true);
  };

  const listenToEvents = () => {
    if (!contract) return;

    contract.on("BidderRegistered", (bidder, name, timestamp) => {
      if (bidder.toLowerCase() === account?.toLowerCase()) {
        toast.success(`Registro confirmado: ${name}`);
        setIsRegisteredBidder(true);
      }
    });

    contract.on("ProposalSubmitted", (editalId, bidder, value, timestamp) => {
      if (bidder.toLowerCase() === account?.toLowerCase()) {
        const valueInEth = ethers.formatEther(value);
        toast.success(`Proposta #${editalId} confirmada: ${valueInEth} ETH`);
      }
    });
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          // Re-check registration status when account changes
          if (contract) {
            contract.getBidderInfo(accounts[0])
              .then((info: any) => setIsRegisteredBidder(info[2]))
              .catch(() => setIsRegisteredBidder(false));
          }
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        setChainId(Number(chainId));
        // Reload the page on chain change as recommended by MetaMask
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, [contract]);

  return (
    <Web3Context.Provider 
      value={{ 
        provider, 
        contract,
        account, 
        chainId, 
        isConnected,
        isRegisteredBidder,
        connectWallet, 
        disconnectWallet,
        registerBidder,
        submitProposal,
        verifyDocument,
        listenToEvents
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
