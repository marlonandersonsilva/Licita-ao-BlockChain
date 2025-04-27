
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Editals = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Editais</h2>
          <p className="text-muted-foreground">
            Gerencie os editais de licitação publicados na blockchain.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Edital
        </Button>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="blockchain-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blockchain-blue" />
              </div>
              <div>
                <CardTitle className="text-lg">Edital {i}/2025</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Publicado em 25/04/2025
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Aquisição de equipamentos de TI para modernização do parque
                tecnológico.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="text-sm">
                  <p className="font-medium">Valor Estimado</p>
                  <p className="text-muted-foreground">R$ 1.250.000,00</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Prazo</p>
                  <p className="text-muted-foreground">30 dias</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Status</p>
                  <p className="text-blockchain-success">Aberto</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Editals;
