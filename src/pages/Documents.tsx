
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import DocumentVerification from "@/components/DocumentVerification";

const Documents = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Documentos</h2>
        <p className="text-muted-foreground">
          Gerenciamento e verificação de documentos na blockchain.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-blockchain-blue" />
            </div>
            <CardTitle className="text-lg">Documentos Registrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Envie documentos para registro com assinatura digital na blockchain.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <p className="font-medium">Contrato de Licitação.pdf</p>
                    <p className="text-xs text-muted-foreground">Registrado em 25/04/2025</p>
                  </div>
                  <div className="px-2 py-1 text-xs bg-blockchain-success/20 text-blockchain-success rounded-full">
                    Verificado
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <p className="font-medium">Termos do Edital.pdf</p>
                    <p className="text-xs text-muted-foreground">Registrado em 24/04/2025</p>
                  </div>
                  <div className="px-2 py-1 text-xs bg-blockchain-success/20 text-blockchain-success rounded-full">
                    Verificado
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <p className="font-medium">Proposta Técnica.pdf</p>
                    <p className="text-xs text-muted-foreground">Registrado em 23/04/2025</p>
                  </div>
                  <div className="px-2 py-1 text-xs bg-blockchain-warning/20 text-blockchain-warning rounded-full">
                    Pendente
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full gap-2">
                <Upload className="h-4 w-4" />
                Enviar Novo Documento
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <DocumentVerification />
      </div>
    </div>
  );
};

export default Documents;
