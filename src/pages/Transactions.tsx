
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

const Transactions = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Transações</h2>
        <p className="text-muted-foreground">
          Histórico de transações registradas na blockchain.
        </p>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="blockchain-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-blockchain-blue" />
                </div>
                <div>
                  <CardTitle className="text-lg">Transação #{i}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    25/04/2025 14:30
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">Hash: 0x1234...5678</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm">
                    <p className="font-medium">Tipo</p>
                    <p className="text-muted-foreground">Registro de Proposta</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Status</p>
                    <p className="text-blockchain-success">Confirmada</p>
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

export default Transactions;
