
import { Activity, FileText, Layers, Users } from "lucide-react";
import StatCard from "./StatCard";
import BidCard from "./BidCard";
import BlockchainStatus from "./BlockchainStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const recentBids = [
    {
      id: "bid-123",
      title: "Aquisição de Equipamentos de TI",
      company: "Tech Solutions Ltda",
      value: "R$ 125.000,00",
      status: "approved" as const,
      date: "25/04/2025",
      transactionHash: "0x1234...5678",
    },
    {
      id: "bid-124",
      title: "Serviços de Manutenção Predial",
      company: "Construções Rápidas S.A.",
      value: "R$ 78.450,00",
      status: "pending" as const,
      date: "24/04/2025",
    },
    {
      id: "bid-125",
      title: "Fornecimento de Material de Escritório",
      company: "Office Supply ME",
      value: "R$ 12.380,00",
      status: "completed" as const,
      date: "22/04/2025",
      transactionHash: "0x8765...4321",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Visão geral do sistema de licitações na blockchain.
          </p>
        </div>
        <BlockchainStatus />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Licitações Ativas"
          value="12"
          description="Processos em andamento"
          icon={FileText}
          trend={{ value: 10, label: "desde o mês passado", positive: true }}
          color="blue"
        />
        <StatCard
          title="Licitantes Registrados"
          value="48"
          description="Empresas e fornecedores"
          icon={Users}
          trend={{ value: 5, label: "desde o mês passado", positive: true }}
          color="green"
        />
        <StatCard
          title="Propostas Recebidas"
          value="86"
          description="Total de propostas"
          icon={Layers}
          trend={{ value: 12, label: "desde o mês passado", positive: true }}
          color="amber"
        />
        <StatCard
          title="Transações"
          value="254"
          description="Registros na blockchain"
          icon={Activity}
          trend={{ value: 24, label: "desde o mês passado", positive: true }}
          color="blue"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="blockchain-card">
          <CardHeader>
            <CardTitle className="text-lg">Propostas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBids.map((bid) => (
                <BidCard key={bid.id} {...bid} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader>
            <CardTitle className="text-lg">Atividade da Blockchain</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="h-8 w-8 rounded-full bg-blockchain-blue/10 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-blockchain-blue" />
                </div>
                <div>
                  <p className="font-medium">Nova Transação</p>
                  <p className="text-xs text-muted-foreground">
                    Registro de Proposta #10458
                  </p>
                </div>
                <span className="ml-auto text-xs text-muted-foreground">1m atrás</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="h-8 w-8 rounded-full bg-blockchain-blue/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blockchain-blue" />
                </div>
                <div>
                  <p className="font-medium">Novo Contrato</p>
                  <p className="text-xs text-muted-foreground">
                    Contrato Inteligente Publicado
                  </p>
                </div>
                <span className="ml-auto text-xs text-muted-foreground">15m atrás</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="h-8 w-8 rounded-full bg-blockchain-success/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-blockchain-success" />
                </div>
                <div>
                  <p className="font-medium">Novo Licitante</p>
                  <p className="text-xs text-muted-foreground">
                    Tech Solutions Ltda
                  </p>
                </div>
                <span className="ml-auto text-xs text-muted-foreground">30m atrás</span>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-xs text-muted-foreground">
                    Ver mais
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
