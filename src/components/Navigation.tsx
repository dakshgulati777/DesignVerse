import { motion } from 'framer-motion';
import { Search, Bell, MessageSquare, Upload, User, Compass, Swords, Briefcase, Users, Wrench } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Compass, label: 'Explore', href: '/' },
    { icon: Swords, label: 'Battles', href: '/battles' },
    { icon: Briefcase, label: 'Portfolio', href: '/portfolio' },
    { icon: Users, label: 'Hire Designers', href: '/hire' },
    { icon: Wrench, label: 'Tools', href: '/tools' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-4 left-4 right-4 z-50 flex justify-center px-4"
    >
      <div className="glass-nav flex items-center justify-between w-full max-w-6xl">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground font-satoshi">DV</span>
          </div>
          <span className="hidden sm:block font-satoshi font-bold text-lg tracking-tight text-foreground">
            DesignVerse
          </span>
        </motion.div>

        {/* Center Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => navigate(item.href)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium font-inter transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Search className="w-4.5 h-4.5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors relative"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <MessageSquare className="w-4.5 h-4.5" />
          </motion.button>

          <ThemeToggle />

          <Button
            onClick={() => navigate('/upload')}
            className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 py-2 text-sm font-medium font-inter"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </Button>

          {user ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signOut()}
              className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center"
            >
              <User className="w-4 h-4 text-foreground" />
            </motion.button>
          ) : (
            <Button
              onClick={() => navigate('/auth')}
              variant="ghost"
              className="rounded-xl px-3 py-2 text-sm font-medium font-inter"
            >
              Sign in
            </Button>
          )}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 glass-nav flex items-center justify-around py-2 z-50">
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            onClick={() => navigate(item.href)}
            whileTap={{ scale: 0.9 }}
            className={`flex flex-col items-center gap-0.5 p-2 rounded-xl text-xs font-medium transition-colors ${
              isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;
