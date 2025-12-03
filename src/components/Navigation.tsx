import { motion } from 'framer-motion';
import { Palette, BookOpen, Search, Rocket, GraduationCap, LogOut, LogIn, Bookmark, Type } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';

const Navigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Palette, label: 'Palettes', href: '#palettes', type: 'hash' },
    { icon: Type, label: 'Fonts', href: '/font-lab', type: 'route' },
    { icon: BookOpen, label: 'Blog', href: '#blog', type: 'hash' },
    { icon: Search, label: 'Principles', href: '#principles', type: 'hash' },
    { icon: GraduationCap, label: 'Learning', href: '/learners', type: 'route' },
    { icon: Bookmark, label: 'Bookmarks', href: '/bookmarks', type: 'route' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.type === 'route') {
      navigate(item.href);
    }
  };

  const handleAuthAction = async () => {
    if (user) {
      await signOut();
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-2 md:top-4 left-1/2 transform -translate-x-1/2 z-50 w-[98%] md:w-auto max-w-[95vw]"
      >
        <div className="glass-nav flex items-center justify-between md:gap-3 lg:gap-4 px-2 md:px-4 lg:px-6 py-2 md:py-3">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 md:gap-2 cursor-pointer"
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
          >
            <div className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center hover-glow">
              <Palette className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" />
            </div>
            <span className="hidden sm:block font-bold text-xs md:text-base lg:text-lg bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              DesignVerse
            </span>
          </motion.div>

          {/* Navigation Items - Hide on smallest screens */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {navItems.map((item, index) => (
              item.type === 'hash' ? (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="flex items-center gap-1.5 px-2 xl:px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                  <span className="text-xs xl:text-sm font-medium">{item.label}</span>
                </motion.a>
              ) : (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="flex items-center gap-1.5 px-2 xl:px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                  <span className="text-xs xl:text-sm font-medium">{item.label}</span>
                </motion.button>
              )
            ))}
          </div>

          {/* Mobile/Tablet Navigation */}
          <div className="flex lg:hidden items-center gap-1">
            {navItems.map((item, index) => (
              item.type === 'hash' ? (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg transition-all duration-300 hover:bg-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="w-4 h-4" />
                </motion.a>
              ) : (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg transition-all duration-300 hover:bg-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="w-4 h-4" />
                </motion.button>
              )
            ))}
          </div>

          {/* Theme Switcher & Auth */}
          <div className="flex items-center gap-1 md:gap-2">
            <ThemeToggle />
            
            <Button
              onClick={handleAuthAction}
              variant="ghost"
              size="sm"
              className="p-1.5 md:p-2 rounded-md transition-all duration-300 hover:bg-white/10 flex items-center gap-1"
              title={user ? 'Sign out' : 'Sign in'}
            >
              {user ? (
                <>
                  <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline text-xs md:text-sm">Sign Out</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline text-xs md:text-sm">Sign In</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Spaceship Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 glass-nav p-4 group"
        whileHover={{ 
          scale: 1.1,
          y: -5,
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Rocket className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
      </motion.button>
    </>
  );
};

export default Navigation;