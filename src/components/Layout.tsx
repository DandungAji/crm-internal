import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Bell, Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useDarkMode } from "@/hooks/useDarkMode";

export function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Mock notifications
  const notifications = [
    {
      id: 1,
      text: "Project 'Website Redesign' is due tomorrow",
      time: "30m ago",
    },
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
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header - Made sticky */}
          <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-700 h-16 flex items-center px-6">
            <SidebarTrigger className="mr-4" />

            <div className="flex items-center space-x-4 mr-8">
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                ProjectFlow
              </h1>
              <Badge
                variant="secondary"
                className="bg-accent hover:bg-accent text-slate-800 dark:bg-primary dark:text-slate-800 text-xs"
              >
                Internal CRM
              </Badge>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search projects, tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 ml-auto">
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="p-2 bg-accent hover:bg-accent/50"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative bg-accent hover:bg-accent/50"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="py-2">
                      <div className="flex flex-col">
                        <span>{notification.text}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {notification.time}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center text-blue-600 dark:text-blue-400">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                size="sm"
                className="bg-primary text-slate-900 hover:bg-accent"
                onClick={handleNewProject}
              >
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
