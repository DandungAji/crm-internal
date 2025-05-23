
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Kanban from "./pages/Kanban";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="projects" element={<Projects />} />
            <Route path="kanban" element={<Kanban />} />
            <Route path="calendar" element={<Calendar />} />
            {/* Placeholder routes for future implementation */}
            <Route path="tasks" element={<div className="p-6"><h1 className="text-2xl font-bold">Tasks - Coming Soon</h1></div>} />
            <Route path="team" element={<div className="p-6"><h1 className="text-2xl font-bold">Team - Coming Soon</h1></div>} />
            <Route path="messages" element={<div className="p-6"><h1 className="text-2xl font-bold">Messages - Coming Soon</h1></div>} />
            <Route path="files" element={<div className="p-6"><h1 className="text-2xl font-bold">Files - Coming Soon</h1></div>} />
            <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings - Coming Soon</h1></div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
