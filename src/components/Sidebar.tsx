
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Home, 
  FileText, 
  GanttChart, 
  Layers, 
  ActivitySquare, 
  FileSignature, 
  Shield, 
  Settings 
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const Sidebar = ({ className, isOpen }: SidebarProps) => {
  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      icon: <Home className="h-4 w-4" />,
      href: "/",
    },
    {
      title: "Editais",
      icon: <FileText className="h-4 w-4" />,
      href: "/editals",
    },
    {
      title: "Licitantes",
      icon: <GanttChart className="h-4 w-4" />,
      href: "/bidders",
    },
    {
      title: "Propostas",
      icon: <Layers className="h-4 w-4" />,
      href: "/proposals",
    },
    {
      title: "Transações",
      icon: <ActivitySquare className="h-4 w-4" />,
      href: "/transactions",
    },
    {
      title: "Documentos",
      icon: <FileSignature className="h-4 w-4" />,
      href: "/documents",
    },
    {
      title: "Segurança",
      icon: <Shield className="h-4 w-4" />,
      href: "/security",
    },
    {
      title: "Configurações",
      icon: <Settings className="h-4 w-4" />,
      href: "/settings",
    },
  ];

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col bg-white border-r shadow-sm",
        className
      )}
    >
      <ScrollArea className="flex-1">
        <div className="px-3 py-4">
          <div className="mb-10 ml-3">
            <div className="flex h-16 items-center gap-2">
              <div className="h-7 w-7 rounded-md blockchain-gradient flex items-center justify-center">
                <div className="h-3.5 w-3.5 bg-white rounded-sm" />
              </div>
              <h1 className="text-xl font-bold text-blockchain-navy">SecureBid</h1>
            </div>
          </div>
          <div className="space-y-1">
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blockchain-blue text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  )
                }
              >
                {item.icon}
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="border-t p-3">
        <div className="blockchain-card p-3">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blockchain-blue p-1.5">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Conexão Segura</p>
              <p className="text-xs text-gray-500">Blockchain Ativa</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-blockchain-blue rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
