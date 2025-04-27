
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";
import ProposalSubmission from "@/components/ProposalSubmission";
import { useWeb3 } from "@/contexts/Web3Context";

const Proposals = () => {
  const { isConnected } = useWeb3();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Propostas</h2>
        <p className="text-muted-foreground">
          Visualize e gerencie as propostas submetidas.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ProposalSubmission />

        <Card className="blockchain-card">
          <CardHeader>
            <CardTitle className="text-lg">Propostas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {isConnected ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
                            <Layers className="h-4 w-4 text-blockchain-blue" />
                          </div>
                          <CardTitle className="text-sm">Proposta #{i}</CardTitle>
                        </div>
                        <span className="text-xs text-blockchain-warning bg-blockchain-warning/10 rounded-full px-2 py-1">
                          Em Análise
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-sm">
                          <p className="font-medium">Edital</p>
                          <p className="text-muted-foreground">001/2025</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Valor</p>
                          <p className="text-muted-foreground">0.5 ETH</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Data</p>
                          <p className="text-muted-foreground">25/04/2025</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-4">
                <p className="text-sm text-muted-foreground">
                  Conecte-se à blockchain para visualizar as propostas.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Proposals;
