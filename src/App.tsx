
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import des pages
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ScanPage from "./pages/ScanPage";
import QuestionPage from "./pages/QuestionPage";
import FinishPage from "./pages/FinishPage";
import NotFound from "./pages/NotFound";
import SetupPage from "./pages/SetupPage";
import ModeSelectionPage from "./pages/ModeSelectionPage";
import Index from "./pages/Index";
import ResultsPage from "./pages/ResultsPage";
import QuestionsAdminPage from "./pages/QuestionsAdminPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/index" element={<Index />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/question/:id" element={<QuestionPage />} />
          <Route path="/finish" element={<FinishPage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/mode-selection" element={<ModeSelectionPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/admin/questions" element={<QuestionsAdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
