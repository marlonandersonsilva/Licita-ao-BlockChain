
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/contexts/Web3Context";
import { Wallet } from "lucide-react";

const WalletConnect = () => {
  const { account, isConnected, isRegisteredBidder, connectWallet, disconnectWallet } = useWeb3();

  return (
    <div className="flex items-center gap-2">
      {isConnected ? (
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <span className={`px-2 py-1 text-xs rounded-full ${
              isRegisteredBidder ? 'bg-blockchain-success/20 text-blockchain-success' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {isRegisteredBidder ? 'Licitante Registrado' : 'Não Registrado'}
            </span>
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={disconnectWallet}
          >
            <Wallet className="h-4 w-4" />
            {account?.slice(0, 6)}...{account?.slice(-4)}
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          className="gap-2"
          onClick={connectWallet}
        >
          <Wallet className="h-4 w-4" />
          Conectar Carteira
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;
