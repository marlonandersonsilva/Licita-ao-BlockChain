
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLink, ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type BidStatus = "pending" | "approved" | "rejected" | "completed" | "canceled";

interface BidCardProps {
  id: string;
  title: string;
  company: string;
  value: string;
  status: BidStatus;
  date: string;
  transactionHash?: string;
}

const BidCard = ({
  id,
  title,
  company,
  value,
  status,
  date,
  transactionHash,
}: BidCardProps) => {
  const statusColors: Record<
    BidStatus,
    { bg: string; text: string; label: string }
  > = {
    pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pendente" },
    approved: { bg: "bg-green-100", text: "text-green-800", label: "Aprovada" },
    rejected: { bg: "bg-red-100", text: "text-red-800", label: "Rejeitada" },
    completed: { bg: "bg-blue-100", text: "text-blue-800", label: "Concluída" },
    canceled: { bg: "bg-gray-100", text: "text-gray-800", label: "Cancelada" },
  };

  const statusInfo = statusColors[status];

  return (
    <Card className="blockchain-card overflow-visible">
      <CardContent className="p-4 pb-0">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-sm">{title}</h3>
              <p className="text-xs text-muted-foreground">{company}</p>
            </div>
            <Badge
              variant="outline"
              className={`${statusInfo.bg} ${statusInfo.text} border-none`}
            >
              {statusInfo.label}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Valor</p>
              <p className="font-semibold">{value}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Data</p>
              <p className="text-sm">{date}</p>
            </div>
          </div>

          {transactionHash && (
            <div className="mt-1 flex items-center">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-blockchain-success"></span>
                Verificado na Blockchain
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-5 w-5 rounded-full p-0 ml-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span className="sr-only">Ver na blockchain</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Ver transação na blockchain</p>
                      <p className="text-xs font-mono mt-1 opacity-70 truncate max-w-40">
                        {transactionHash}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pb-4 pt-3">
        <Button variant="ghost" size="sm" className="text-blockchain-blue text-xs">
          Ver detalhes
          <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
        <div className="relative h-6 w-24">
          <div className="blockchain-flow-line top-3" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default BidCard;
