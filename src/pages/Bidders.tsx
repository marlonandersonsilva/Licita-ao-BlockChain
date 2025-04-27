
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import BidderRegistration from "@/components/BidderRegistration";
import { useWeb3 } from "@/contexts/Web3Context";

const Bidders = () => {
  const { isConnected } = useWeb3();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Licitantes</h2>
        <p className="text-muted-foreground">
          Gerenciamento e registro de licitantes na plataforma blockchain.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <BidderRegistration />

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-blockchain-blue/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-blockchain-blue" />
            </div>
            <CardTitle className="text-lg">Licitantes Registrados</CardTitle>
          </CardHeader>
          <CardContent>
            {isConnected ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Lista de empresas e entidades registradas na plataforma blockchain.
                </p>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <p className="font-medium">Empresa {i}</p>
                        <p className="text-xs text-muted-foreground">Registrada em 25/04/2025</p>
                      </div>
                      <div className="px-2 py-1 text-xs bg-blockchain-success/20 text-blockchain-success rounded-full">
                        Verificado
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center p-4">
                <p className="text-sm text-muted-foreground">
                  Conecte-se à blockchain para visualizar os licitantes registrados.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Bidders;
