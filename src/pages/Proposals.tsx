
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";

const Proposals = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Propostas</h2>
        <p className="text-muted-foreground">
          Visualize e gerencie as propostas submetidas.
        </p>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="blockchain-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
                <Layers className="h-5 w-5 text-blockchain-blue" />
              </div>
              <div>
                <CardTitle className="text-lg">Proposta #{i}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Enviada em 25/04/2025
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm">
                    <p className="font-medium">Edital</p>
                    <p className="text-muted-foreground">001/2025</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Valor</p>
                    <p className="text-muted-foreground">R$ 980.000,00</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Status</p>
                    <p className="text-blockchain-warning">Em Análise</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Proposals;
