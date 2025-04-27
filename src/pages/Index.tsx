
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative flex min-h-screen flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          <Sidebar isOpen={sidebarOpen} />
          <main className={`flex-1 ${sidebarOpen ? 'md:ml-64' : ''}`}>
            <Dashboard />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
