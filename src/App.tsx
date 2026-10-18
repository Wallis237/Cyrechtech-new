import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import WorkPage from "./pages/WorkPage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";
import BookingSuccessPage from "./pages/BookingSuccessPage";
import TeamPage from "./pages/TeamPage";
import LegalPage from "./pages/LegalPage";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ClientReviewsPage from "./pages/ClientReviewsPage";
import HiringPage, { HiringSuccessPage } from "./pages/HiringPage";
import CollaborationsPage from "./pages/CollaborationsPage";
import { LanguageProvider } from "./i18n/LanguageProvider";
import SiteIntro from "./components/SiteIntro";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <SiteIntro key={`site-intro-${location.pathname}`} />
      <div key={`page-${location.pathname}`} className="page-transition">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/projects" element={<WorkPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/careers" element={<Navigate to="/collaborations/careers" replace />} />
          <Route path="/careers/success" element={<Navigate to="/collaborations/careers/success" replace />} />
          <Route path="/collaborations" element={<CollaborationsPage />} />
          <Route path="/collaborations/careers" element={<HiringPage />} />
          <Route path="/collaborations/careers/success" element={<HiringSuccessPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/booking/success" element={<BookingSuccessPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/reviews" element={<ClientReviewsPage />} />
          <Route path="/legal/policies" element={<LegalPage />} />
          <Route path="/legal/privacy-policy" element={<LegalPage />} />
          <Route path="/legal/cookie-policy" element={<LegalPage />} />
          <Route path="/legal/terms-of-use" element={<LegalPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
