
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Key, Lock, FileKey } from "lucide-react";

const Security = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Segurança</h2>
        <p className="text-muted-foreground">
          Configurações de segurança e criptografia.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
              <Key className="h-5 w-5 text-blockchain-blue" />
            </div>
            <CardTitle className="text-lg">Chaves Criptográficas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gerencie suas chaves públicas e privadas para assinatura digital.
            </p>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
              <Lock className="h-5 w-5 text-blockchain-blue" />
            </div>
            <CardTitle className="text-lg">Autenticação</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Configure a autenticação multifator e outras opções de segurança.
            </p>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-blockchain-blue" />
            </div>
            <CardTitle className="text-lg">Permissões</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gerencie as permissões de acesso aos recursos da plataforma.
            </p>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
              <FileKey className="h-5 w-5 text-blockchain-blue" />
            </div>
            <CardTitle className="text-lg">Certificados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Visualize e gerencie seus certificados digitais.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Security;
