import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getRouterBasename } from "@/utils/base";
import Index from "./pages/Index";
import { useEffect } from "react";
import { fetchPrimeStatusOnce } from "@/state/sessionStore";

const queryClient = new QueryClient();

const App = () => {
  // Preload prime status once per session when app starts
  useEffect(() => {
    fetchPrimeStatusOnce().catch(() => void 0);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={getRouterBasename()} >
          <Routes>
            <Route index element={<Index />} />
            <Route path="/" element={<Index />} />
            {/* Redirect any unknown path back to home to avoid 404 on GH Pages */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
