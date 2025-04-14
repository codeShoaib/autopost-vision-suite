
import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock auth for now
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/auth");
  };
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-900/10 to-indigo-900/5">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-indigo-900/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.2),transparent_50%)]"></div>
      </div>
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar 
          toggleSidebar={toggleSidebar} 
          sidebarCollapsed={sidebarCollapsed}
          onLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 animate-fade-in">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
