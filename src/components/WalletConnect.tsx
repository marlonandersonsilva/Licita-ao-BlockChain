
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/contexts/Web3Context";
import { Wallet } from "lucide-react";

const WalletConnect = () => {
  const { account, connectWallet, disconnectWallet } = useWeb3();

  return (
    <div className="flex items-center gap-2">
      {account ? (
        <Button
          variant="outline"
          className="gap-2"
          onClick={disconnectWallet}
        >
          <Wallet className="h-4 w-4" />
          {account.slice(0, 6)}...{account.slice(-4)}
        </Button>
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
