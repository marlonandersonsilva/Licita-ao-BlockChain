
import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useToast } from "@/components/ui/use-toast";

interface Web3ContextType {
  provider: ethers.BrowserProvider | null;
  account: string | null;
  chainId: number | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const { toast } = useToast();

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const network = await provider.getNetwork();
        
        setProvider(provider);
        setAccount(accounts[0]);
        setChainId(Number(network.chainId));

        toast({
          title: "Carteira conectada",
          description: `Conectado à conta ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro ao conectar",
          description: "Não foi possível conectar à carteira.",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Carteira não encontrada",
        description: "Por favor, instale uma carteira Ethereum como MetaMask.",
      });
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setAccount(null);
    setChainId(null);
    toast({
      title: "Desconectado",
      description: "Carteira desconectada com sucesso.",
    });
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        setChainId(Number(chainId));
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  return (
    <Web3Context.Provider value={{ provider, account, chainId, connectWallet, disconnectWallet }}>
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
