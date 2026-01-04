import { motion } from 'framer-motion';
import { Palette, BookOpen, Search, ArrowUp, GraduationCap, LogOut, LogIn, Bookmark, Type, Sparkles } from 'lucide-react';
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
    { icon: Sparkles, label: 'Playground', href: '/font-playground', type: 'route' },
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
        className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className="flex items-center justify-center gap-2 md:gap-3 lg:gap-4 px-3 md:px-5 lg:px-6 py-2 md:py-3 border border-foreground/10 bg-background/80 backdrop-blur-md max-w-fit">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 md:gap-3 cursor-pointer"
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
          >
            <div 
              className="w-6 h-6 md:w-8 md:h-8 bg-foreground flex items-center justify-center"
              style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
            >
              <span className="text-[8px] md:text-xs font-bold text-background">DV</span>
            </div>
            <span className="hidden sm:block font-bold text-sm md:text-base tracking-widest">
              DESIGNVERSE
            </span>
          </motion.div>

          {/* Navigation Items - Hide on smallest screens */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item, index) => (
              item.type === 'hash' ? (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ backgroundColor: 'hsl(var(--foreground) / 0.05)' }}
                  className="flex items-center gap-1.5 px-3 py-2 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium tracking-wider uppercase">{item.label}</span>
                </motion.a>
              ) : (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  whileHover={{ backgroundColor: 'hsl(var(--foreground) / 0.05)' }}
                  className="flex items-center gap-1.5 px-3 py-2 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium tracking-wider uppercase">{item.label}</span>
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
                  className="p-2 transition-all duration-300 hover:bg-foreground/5"
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
                  className="p-2 transition-all duration-300 hover:bg-foreground/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="w-4 h-4" />
                </motion.button>
              )
            ))}
          </div>

          {/* Separator */}
          <div className="hidden md:block w-[1px] h-6 bg-foreground/10" />

          {/* Theme Switcher & Auth */}
          <div className="flex items-center gap-1 md:gap-2">
            <ThemeToggle />
            
            <Button
              onClick={handleAuthAction}
              variant="ghost"
              size="sm"
              className="px-2 md:px-3 py-2 transition-all duration-300 hover:bg-foreground/5 flex items-center gap-1"
              title={user ? 'Sign out' : 'Sign in'}
            >
              {user ? (
                <>
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs tracking-wider uppercase">Out</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs tracking-wider uppercase">In</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Geometric Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 border border-foreground/20 bg-background/80 backdrop-blur-sm flex items-center justify-center group"
        whileHover={{ 
          scale: 1.1,
          borderColor: 'hsl(var(--foreground) / 0.4)',
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
      </motion.button>
    </>
  );
};

export default Navigation;