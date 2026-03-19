import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Discovery from "./pages/Discovery";
import Profile from "./pages/Profile";
import Connections from "./pages/Connections";
import Messages from "./pages/Messages";
import StartMatch from "./pages/StartMatch";
import CareerJourneys from "./pages/CareerJourneys";
import NotFound from "./pages/NotFound";

import { AppLayout } from "./components/AppLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* ⭐ Start Match Page (Full Screen) */}
            <Route path="/start-match" element={<StartMatch />} />

            {/* App Layout Routes */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/discover" element={<Discovery />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/careers" element={<CareerJourneys />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;