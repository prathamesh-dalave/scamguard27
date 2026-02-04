import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./components/DashboardLayout";
import FamilyDashboard from "./pages/FamilyDashboard";
import ThreatMonitor from "./pages/ThreatMonitor";
import AddMember from "./pages/AddMember";
import Awareness from "./pages/Awareness";
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
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Dashboard Routes with Sidebar Layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<FamilyDashboard />} />
            <Route path="/threats" element={<ThreatMonitor />} />
            <Route path="/add-member" element={<AddMember />} />
            <Route path="/awareness" element={<Awareness />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
