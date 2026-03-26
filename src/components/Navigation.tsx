import { motion } from 'framer-motion';
import { Palette, BookOpen, Search, ArrowUp, GraduationCap, LogOut, LogIn, Bookmark, Type, Sparkles, Wand2, User as UserIcon, ShoppingBag, PlusSquare } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

const Navigation = () => {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Palette, label: 'Palettes', href: '/#palettes', type: 'hash' },
    { icon: Type, label: 'Fonts', href: '/font-lab', type: 'route' },
    { icon: Sparkles, label: 'Playground', href: '/font-playground', type: 'route' },
    { icon: Wand2, label: 'Brand Kit', href: '/brand-kit', type: 'route' },
    { icon: ShoppingBag, label: 'Marketplace', href: '/marketplace', type: 'route', isNew: true },
    { icon: BookOpen, label: 'Blog', href: '/blog', type: 'route' },
    { icon: Search, label: 'Principles', href: '/#principles', type: 'hash' },
    { icon: GraduationCap, label: 'Learning', href: '/learners', type: 'route' },
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
              <motion.div key={item.label} className="relative group">
                {item.type === 'hash' ? (
                  <motion.a
                    href={item.href}
                    whileHover={{ backgroundColor: 'rgba(128, 128, 128, 0.08)' }}
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
                    onClick={() => handleNavClick(item)}
                    whileHover={{ backgroundColor: 'rgba(128, 128, 128, 0.08)' }}
                    className="flex items-center gap-1.5 px-3 py-2 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium tracking-wider uppercase">{item.label}</span>
                  </motion.button>
                )}
                {item.isNew && (
                  <span className="absolute -top-1 -right-1 px-1 py-0.5 bg-primary text-[6px] font-black text-primary-foreground rounded-full animate-pulse z-10">
                    NEW
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile/Tablet Navigation */}
          <div className="flex lg:hidden items-center gap-1">
            {navItems.map((item, index) => (
              <div key={item.label} className="relative">
                {item.type === 'hash' ? (
                  <motion.a
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
                )}
                {item.isNew && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full animate-ping" />
                )}
              </div>
            ))}
          </div>

          {/* Separator */}
          <div className="hidden md:block w-[1px] h-6 bg-foreground/10" />

          {/* Theme Switcher & Auth */}
          <div className="flex items-center gap-1 md:gap-2">
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative w-8 h-8 rounded-full p-0 overflow-hidden hover:bg-foreground/5 transition-all"
                  >
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-foreground text-background text-[10px] font-bold">
                        {user.email?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass-card border-foreground/10 mt-2 p-1">
                  <DropdownMenuLabel className="px-2 py-1.5">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-bold truncate">{user.user_metadata?.nickname || 'Designer'}</p>
                      <p className="text-[10px] text-muted-foreground truncate uppercase tracking-widest">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-foreground/10" />
                  <DropdownMenuItem 
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-2 px-2 py-2 text-xs font-bold tracking-wider text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>PROFILE DETAILS</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => navigate('/bookmarks')}
                    className="flex items-center gap-2 px-2 py-2 text-xs font-bold tracking-wider text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>MY BOOKMARKS</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => navigate('/create-blog')}
                    className="flex items-center gap-2 px-2 py-2 text-xs font-bold tracking-widest text-primary hover:bg-primary/5 transition-all cursor-pointer"
                  >
                    <PlusSquare className="w-3.5 h-3.5" />
                    <span>WRITE A STORY</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-foreground/10" />
                  <DropdownMenuItem 
                    onClick={signOut}
                    className="flex items-center gap-2 px-2 py-2 text-xs font-bold tracking-wider text-destructive hover:bg-destructive/5 transition-all cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>SIGN OUT</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleAuthAction}
                variant="ghost"
                size="sm"
                className="px-2 md:px-3 py-2 transition-all duration-300 hover:bg-foreground/5 flex items-center gap-1"
                title="Sign in"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline text-xs tracking-wider uppercase">In</span>
              </Button>
            )}
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