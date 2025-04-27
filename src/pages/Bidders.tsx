
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Plus, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Bidders = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Licitantes</h2>
          <p className="text-muted-foreground">
            Empresas e fornecedores registrados na plataforma.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Licitante
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="blockchain-card">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-blockchain-blue" />
              </div>
              <CardTitle className="text-lg">Empresa {i}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>João Silva</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-blockchain-success" />
                  <span className="text-blockchain-success">Verificado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Bidders;
