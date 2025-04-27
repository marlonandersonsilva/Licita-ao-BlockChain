
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Settings as SettingsIcon, 
  Globe, 
  Bell, 
  Palette 
} from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">
          Gerencie as configurações da sua conta e da plataforma.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
              <SettingsIcon className="h-5 w-5 text-blockchain-blue" />
            </div>
            <CardTitle className="text-lg">Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Configurações gerais da plataforma.
            </p>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
              <Globe className="h-5 w-5 text-blockchain-blue" />
            </div>
            <CardTitle className="text-lg">Região</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Idioma e configurações regionais.
            </p>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-blockchain-blue" />
            </div>
            <CardTitle className="text-lg">Notificações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Configure suas preferências de notificação.
            </p>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
              <Palette className="h-5 w-5 text-blockchain-blue" />
            </div>
            <CardTitle className="text-lg">Aparência</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Personalize o tema e a aparência da interface.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
