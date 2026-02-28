import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { AdminAuthProvider } from "@/components/admin/AdminAuthProvider";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Compounding from "./pages/Compounding";
import Refill from "./pages/Refill";
import Transfer from "./pages/Transfer";
import Appointments from "./pages/Appointments";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAppointments from "./pages/admin/Appointments";
import AdminRefills from "./pages/admin/Refills";
import AdminTransfers from "./pages/admin/Transfers";
import AdminMessages from "./pages/admin/Messages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/compounding" element={<Compounding />} />
            <Route path="/refill" element={<Refill />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/login" element={<Navigate to="/admin/login" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminAuthProvider><AdminDashboard /></AdminAuthProvider>} />
            <Route path="/admin/appointments" element={<AdminAuthProvider><AdminAppointments /></AdminAuthProvider>} />
            <Route path="/admin/refills" element={<AdminAuthProvider><AdminRefills /></AdminAuthProvider>} />
            <Route path="/admin/transfers" element={<AdminAuthProvider><AdminTransfers /></AdminAuthProvider>} />
            <Route path="/admin/messages" element={<AdminAuthProvider><AdminMessages /></AdminAuthProvider>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
