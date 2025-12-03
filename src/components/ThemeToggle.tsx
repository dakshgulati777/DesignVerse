import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Zap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { key: 'dark', icon: Moon, label: 'Dark', color: 'hsl(263, 70%, 50%)' },
    { key: 'light', icon: Sun, label: 'Light', color: 'hsl(25, 95%, 53%)' },
    { key: 'neon', icon: Zap, label: 'Neon', color: 'hsl(180, 100%, 50%)' },
  ] as const;

  const currentIndex = themes.findIndex(t => t.key === theme);

  return (
    <div className="relative flex items-center gap-0.5 md:gap-1 bg-white/5 rounded-xl p-1 overflow-hidden">
      {/* Animated background pill */}
      <motion.div
        className="absolute h-[calc(100%-8px)] rounded-lg bg-primary/80 backdrop-blur-sm"
        style={{ width: `calc(${100 / 3}% - 4px)` }}
        initial={false}
        animate={{
          x: `calc(${currentIndex * 100}% + ${currentIndex * 4}px)`,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      />

      {themes.map(({ key, icon: Icon, label }) => (
        <motion.button
          key={key}
          onClick={() => setTheme(key)}
          className={`relative z-10 p-1.5 md:p-2 rounded-lg transition-colors duration-300 ${
            theme === key ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={label}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${key}-${theme === key}`}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="w-4 h-4" />
            </motion.div>
          </AnimatePresence>
          
          {/* Glow effect when active */}
          {theme === key && (
            <motion.div
              className="absolute inset-0 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                boxShadow: `0 0 20px var(--shadow-glow)`,
              }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default ThemeToggle;
