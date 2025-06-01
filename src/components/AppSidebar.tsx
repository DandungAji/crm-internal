import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  FolderKanban,
  Calendar,
  CheckSquare,
  Users,
  FileText,
  Settings,
  Database,
  LogOut,
  Receipt,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Projects", url: "/projects", icon: FolderKanban },
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Team", url: "/team", icon: Users },
  { title: "Files", url: "/files", icon: FileText },
  { title: "Invoice", url: "/invoice", icon: Receipt },
  { title: "Masterdata", url: "/masterdata", icon: Database },
];

const bottomItems = [{ title: "Settings", url: "/settings", icon: Settings }];

export function AppSidebar() {
  const { open } = useSidebar();
  const collapsed = !open;
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const getNavClass = (path: string) => {
    return isActive(path)
      ? "bg-primary dark:bg-accent-darker text-black dark:text-foreground border-r-2 border-black dark:border-accent-light font-medium"
      : "text-black/60 dark:text-foreground/60 hover:bg-primary/60 dark:hover:bg-accent-darker/60 hover:text-black/90 dark:hover:text-foreground/90";
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar
      className={`${
        collapsed ? "w-16" : "w-64"
      } border-r border-black/20 dark:border-black/70 bg-white dark:bg-black/80`}
    >
      <SidebarContent className="p-4 flex flex-col h-full">
        {/* User Info Header */}
        {!collapsed && (
          <SidebarHeader className="mb-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-primary dark:bg-accent-darker">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt={user?.name || "User"}
                />
                <AvatarFallback className="bg-accent-darker/10 dark:bg-accent-darker/90 text-accent-darker/90 dark:text-accent-darker/10">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-black-900 dark:text-black-100 truncate">
                  {user?.name || "John Doe"}
                </div>
                <div className="text-xs text-black-700 dark:text-black-400 truncate">
                  {user?.email || "john.doe@example.com"}
                </div>
              </div>
            </div>
          </SidebarHeader>
        )}

        {/* Main Navigation */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel
            className={`${
              collapsed ? "hidden" : "block"
            } text-xs font-semibold text-black-500 dark:text-black-400 uppercase tracking-wider mb-2`}
          >
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center p-3 rounded-lg transition-all duration-200 ${getNavClass(
                        item.url
                      )}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="ml-3 text-sm">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {bottomItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`flex items-center p-3 rounded-lg transition-all duration-200 ${getNavClass(
                          item.url
                        )}`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <span className="ml-3 text-sm">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full flex items-center justify-start p-3 text-red-600 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 hover:dark:bg-red-900/40 hover:text-red-700 dark:text-red-400"
                      >
                        <LogOut className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <span className="ml-3 text-sm">Logout</span>
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white dark:bg-black-800">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to logout? You will need to sign
                          in again to access the application.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleLogout}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Logout
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
