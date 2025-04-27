
import { useState, useEffect } from "react";
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useWeb3 } from "@/contexts/Web3Context";

interface BlockchainStatusProps {
  className?: string;
}

const BlockchainStatus = ({ className }: BlockchainStatusProps) => {
  const { provider, isConnected, chainId } = useWeb3();
  const [lastBlock, setLastBlock] = useState<number | null>(null);
  const [blockTime, setBlockTime] = useState<string>("aguardando...");

  useEffect(() => {
    let blockListener: any = null;

    const setupBlockListener = async () => {
      if (provider) {
        try {
          // Get current block number
          const currentBlock = await provider.getBlockNumber();
          setLastBlock(currentBlock);
          setBlockTime("agora");

          // Listen for new blocks
          blockListener = provider.on("block", (blockNumber: number) => {
            setLastBlock(blockNumber);
            setBlockTime("agora");

            // Reset block time after 10 seconds
            setTimeout(() => {
              setBlockTime("10 segundos atrás");
            }, 10000);
          });
        } catch (error) {
          console.error("Error setting up block listener:", error);
        }
      }
    };

    if (isConnected && provider) {
      setupBlockListener();
    }

    return () => {
      if (blockListener && provider) {
        provider.removeListener("block", blockListener);
      }
    };
  }, [provider, isConnected]);

  return (
    <div className={cn("flex items-center gap-3 px-3 py-2 rounded-lg border bg-white", className)}>
      <div className="flex items-center">
        <div
          className={cn(
            "h-2.5 w-2.5 rounded-full mr-2",
            isConnected ? "bg-blockchain-success" : "bg-blockchain-warning animate-pulse"
          )}
        />
        <span className="text-sm font-medium">
          {isConnected ? `Conectado${chainId ? ` (Chain ID: ${chainId})` : ''}` : "Não Conectado"}
        </span>
      </div>
      <div className="h-4 border-r border-gray-200" />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs">
                {lastBlock ? `Bloco #${lastBlock}` : 'Aguardando bloco...'}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Último bloco: {blockTime}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default BlockchainStatus;
