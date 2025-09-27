import { motion } from 'framer-motion';
import { Palette, BookOpen, Search, Moon, Sun, Zap, Rocket } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const { theme, setTheme } = useTheme();

  const navItems = [
    { icon: Palette, label: 'Palettes', href: '#palettes' },
    { icon: BookOpen, label: 'Blog', href: '#blog' },
    { icon: Search, label: 'Principles', href: '#principles' },
  ];

  const themeIcons = {
    dark: Moon,
    light: Sun,
    neon: Zap,
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-3 md:top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] md:w-auto"
      >
        <div className="glass-nav flex items-center justify-between md:gap-6">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
          >
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Palette className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg md:text-xl">DesignVerse</span>
          </motion.div>

          {/* Navigation Items - Hide text on mobile */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Mobile Navigation - Icons only */}
          <div className="flex md:hidden items-center gap-1">
            {navItems.map((item, index) => (
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
            ))}
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            {(['dark', 'light', 'neon'] as const).map((themeOption) => {
              const Icon = themeIcons[themeOption];
              return (
                <Button
                  key={themeOption}
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(themeOption)}
                  className={`p-1.5 md:p-2 rounded-md transition-all duration-300 ${
                    theme === themeOption 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
              );
            })}
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