
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSignature, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Documents = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documentos</h2>
          <p className="text-muted-foreground">
            Documentos assinados digitalmente e registrados na blockchain.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Documento
        </Button>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="blockchain-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
                <FileSignature className="h-5 w-5 text-blockchain-blue" />
              </div>
              <div>
                <CardTitle className="text-lg">Documento {i}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Assinado em 25/04/2025
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm">
                    <p className="font-medium">Tipo</p>
                    <p className="text-muted-foreground">Contrato</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Hash</p>
                    <p className="text-muted-foreground">0x1234...5678</p>
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

export default Documents;
