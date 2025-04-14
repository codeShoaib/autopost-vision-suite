
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PenSquare,
  Calendar,
  Share2,
  BarChart3,
  Settings,
  Menu,
  Home,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  collapsed: boolean;
}

interface SidebarLink {
  name: string;
  path: string;
  icon: React.ElementType;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const { toast } = useToast();
  const location = useLocation();
  
  const mainLinks: SidebarLink[] = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Create Post",
      path: "/create",
      icon: PenSquare,
    },
    {
      name: "AI Generate",
      path: "/generate",
      icon: Sparkles,
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: Calendar,
    },
    {
      name: "Connections",
      path: "/connections",
      icon: Share2,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
  ];
  
  const secondaryLinks: SidebarLink[] = [
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];
  
  const handleUnimplemented = () => {
    toast({
      title: "Feature coming soon",
      description: "This feature is not yet implemented.",
    });
  };
  
  return (
    <div
      className={cn(
        "h-screen border-r border-border/40 bg-background/80 backdrop-blur-xl transition-all duration-300 relative z-20",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex h-14 items-center border-b border-border/40 px-4">
        {!collapsed ? (
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg text-primary">AutoPost</span>
          </Link>
        ) : (
          <Link to="/" className="mx-auto">
            <Home className="h-5 w-5 text-primary" />
          </Link>
        )}
      </div>
      
      <ScrollArea className="h-[calc(100vh-56px)] px-2 py-4">
        <div className="flex flex-col gap-1">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex h-9 items-center gap-2 rounded-md px-2 text-foreground/70 hover:text-foreground transition-colors",
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-accent/50"
              )}
            >
              <link.icon className="h-5 w-5" />
              {!collapsed && <span>{link.name}</span>}
            </Link>
          ))}
        </div>
        
        <div className="mt-8 flex flex-col gap-1">
          {secondaryLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex h-9 items-center gap-2 rounded-md px-2 text-foreground/70 hover:text-foreground transition-colors",
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-accent/50"
              )}
            >
              <link.icon className="h-5 w-5" />
              {!collapsed && <span>{link.name}</span>}
            </Link>
          ))}
        </div>
        
        {!collapsed && (
          <div className="mt-10 px-4">
            <Button
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              onClick={handleUnimplemented}
            >
              Upgrade Plan
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
