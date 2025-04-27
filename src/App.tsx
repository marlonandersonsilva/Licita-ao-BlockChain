
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Editals from "./pages/Editals";
import Bidders from "./pages/Bidders";
import Proposals from "./pages/Proposals";
import Transactions from "./pages/Transactions";
import Documents from "./pages/Documents";
import Security from "./pages/Security";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/editals" element={<Editals />} />
          <Route path="/bidders" element={<Bidders />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/security" element={<Security />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
