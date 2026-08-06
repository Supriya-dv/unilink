import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

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
import Settings from "./pages/Settings";
import Premium from "./pages/Premium";
import NotFound from "./pages/NotFound";

import { AppLayout } from "./components/AppLayout";
import { AuthProvider, ProtectedRoute } from "./hooks/use-auth";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pricing" element={<Premium />} />

        {/* ⭐ Start Match Page (Full Screen, Protected) */}
        <Route path="/start-match" element={<ProtectedRoute><StartMatch /></ProtectedRoute>} />

        {/* App Layout Routes (Protected) */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/discover" element={<Discovery />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/careers" element={<CareerJourneys />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/premium" element={<Premium />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <AuthProvider>
            <AnimatedRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;