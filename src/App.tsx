import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { LanguageLoader } from "./components/ui/language-loader";
import { PixelTracker } from "./components/PixelTracker";
import { AppErrorBoundary } from "./components/AppErrorBoundary";

// Lazy loading pages for better performance
const Index = lazy(() => import("./pages/Index"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const Project = lazy(() => import("./pages/Project"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const ContactForm = lazy(() => import("./pages/ContactForm"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

const App = () => (
  <AppErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <LanguageLoader />
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <PixelTracker />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sobre" element={<AboutUs />} />
                <Route path="/servicos" element={<ServicesPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/portfolio/:id" element={<Project />} />
                <Route path="/termos" element={<Terms />} />
                <Route path="/privacidade" element={<Privacy />} />
                <Route path="/contato" element={<ContactForm />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </AppErrorBoundary>
);

export default App;
