
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Bell } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

export function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // Mock notifications
  const notifications = [
    { id: 1, text: "Project 'Website Redesign' is due tomorrow", time: "30m ago" },
    { id: 2, text: "Bob assigned you a new task", time: "1h ago" },
    { id: 3, text: "Team meeting starts in 15 minutes", time: "2h ago" },
    { id: 4, text: "Emma commented on Marketing Campaign", time: "1d ago" },
  ];

  const handleNewProject = () => {
    navigate("/projects");
    toast({
      title: "New Project",
      description: "Opening project creation form",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-slate-200 h-16 flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            
            <div className="flex items-center space-x-4 mr-8">
              <h1 className="text-xl font-bold text-slate-900">ProjectFlow</h1>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">Internal CRM</Badge>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search projects, tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map(notification => (
                    <DropdownMenuItem key={notification.id} className="py-2">
                      <div className="flex flex-col">
                        <span>{notification.text}</span>
                        <span className="text-xs text-slate-500">{notification.time}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center text-blue-600">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleNewProject}>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
