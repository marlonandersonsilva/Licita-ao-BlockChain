
import { useState, useEffect } from "react";
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BlockchainStatusProps {
  className?: string;
}

const BlockchainStatus = ({ className }: BlockchainStatusProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastBlock, setLastBlock] = useState(15482674);
  const [blockTime, setBlockTime] = useState("2 minutos atrás");

  useEffect(() => {
    // Simulate connecting to blockchain
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);

    // Update block number periodically
    const blockTimer = setInterval(() => {
      setLastBlock(prev => prev + 1);
      setBlockTime("agora");

      // Reset block time after 5 seconds
      setTimeout(() => {
        setBlockTime("10 segundos atrás");
      }, 5000);
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(blockTimer);
    };
  }, []);

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
          {isConnected ? "Conectado" : "Conectando..."}
        </span>
      </div>
      <div className="h-4 border-r border-gray-200" />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs">Bloco #{lastBlock}</span>
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
