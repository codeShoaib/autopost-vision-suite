
import { 
  CalendarDays, 
  Home, 
  LayoutDashboard, 
  MessagesSquare, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Settings, 
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
}

export const Sidebar = ({ collapsed }: SidebarProps) => {
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", icon: Home, href: "/" },
    { name: "Create Post", icon: MessagesSquare, href: "/create" },
    { name: "Calendar", icon: CalendarDays, href: "/calendar" },
    { name: "Analytics", icon: LayoutDashboard, href: "/analytics" },
    { name: "Connections", icon: Share2, href: "/connections" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];
  
  return (
    <aside 
      className={cn(
        "bg-sidebar fixed inset-y-0 left-0 z-20 flex flex-col border-r border-sidebar-border shadow-lg transition-all duration-300 lg:relative backdrop-blur-lg",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          {!collapsed && (
            <h1 className="text-xl font-bold gradient-text ml-2">AutoPost</h1>
          )}
          {collapsed && (
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
              A
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-2">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out",
                  isActive
                    ? "bg-primary/20 text-white shadow-md"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-white"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && <span className="transition-opacity duration-200">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white">
            U
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-white">User Name</p>
              <p className="text-xs text-blue-200">user@example.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
