import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import Index from "./pages/Index";
import Learners from "./pages/Learners";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import ProfileSetup from "./pages/ProfileSetup";
import FontLab from "./pages/FontLab";
import FontPlayground from "./pages/FontPlayground";
import Bookmarks from "./pages/Bookmarks";
import BrandKit from "./pages/BrandKit";
import Marketplace from "./pages/Marketplace";
import MarketplaceSell from "./pages/MarketplaceSell";
import BlogCreate from "./pages/BlogCreate";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PageLoader from "./components/PageLoader";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  enter: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0, y: -20, scale: 0.98,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const { user, profile, loading } = useAuth();
  const [showLoader, setShowLoader] = useState(false);
  const prevPathRef = useRef(location.pathname);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      prevPathRef.current = location.pathname;
      return;
    }

    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      // Show loader on page transitions (except for initial load which has Preloader)
      if (location.pathname !== '/') {
        setShowLoader(true);
      }
    }
  }, [location.pathname]);

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false);
  }, []);

  // Redirect to setup if logged in but no profile nickname
  if (!loading && user && !profile?.nickname && location.pathname !== '/profile-setup' && location.pathname !== '/auth') {
    return <Navigate to="/profile-setup" replace />;
  }

  return (
    <>
      {showLoader && <PageLoader onComplete={handleLoaderComplete} />}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
        >
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/learners" element={<Learners />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/font-lab" element={<FontLab />} />
            <Route path="/font-playground" element={<FontPlayground />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/brand-kit" element={<BrandKit />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/sell" element={<MarketplaceSell />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/create-blog" element={<BlogCreate />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
