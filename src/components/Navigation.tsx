import { motion } from 'framer-motion';
import {
  Palette,
  BookOpen,
  Search,
  ArrowUp,
  GraduationCap,
  LogOut,
  LogIn,
  Bookmark,
  Type,
  Sparkles,
  Wand2,
  User as UserIcon,
  ShoppingBag,
  PlusSquare,
  Menu,
  LayoutDashboard,
} from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = useMemo(() => [
    { icon: Palette, label: 'Palettes', href: '/#palettes', type: 'hash' as const },
    { icon: Type, label: 'Fonts', href: '/font-lab', type: 'route' as const },
    { icon: Sparkles, label: 'Playground', href: '/font-playground', type: 'route' as const },
    { icon: Wand2, label: 'Brand Kit', href: '/brand-kit', type: 'route' as const },
    { icon: ShoppingBag, label: 'Marketplace', href: '/marketplace', type: 'route' as const, isNew: true },
    { icon: BookOpen, label: 'Blog', href: '/blog', type: 'route' as const },
    { icon: Search, label: 'Principles', href: '/#principles', type: 'hash' as const },
    { icon: GraduationCap, label: 'Learning', href: '/learners', type: 'route' as const },
  ], []);

  const scrollToTop = () => {
    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 20);
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string, type: 'route' | 'hash') => {
    if (type === 'route') {
      navigate(href);
      return;
    }

    if (location.pathname === '/') {
      window.location.hash = href.split('#')[1];
    } else {
      navigate(href);
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

  const isActive = (href: string, type: 'route' | 'hash') => {
    if (type === 'route') return location.pathname === href;
    return location.pathname === '/' && location.hash === href.replace('/', '');
  };

  const quickActions = [
    { label: 'Write Story', action: () => navigate('/create-blog'), show: !!user },
    { label: 'Sell Design', action: () => navigate('/marketplace/sell'), show: !!user },
  ].filter((item) => item.show);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-3 sm:top-4 md:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4"
      >
        <div className="w-full max-w-7xl flex items-center justify-between gap-2 px-3 sm:px-4 lg:px-6 py-2.5 md:py-3 border border-foreground/10 bg-background/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0"
            onClick={scrollToTop}
            type="button"
          >
            <div
              className="w-8 h-8 bg-foreground flex items-center justify-center shrink-0"
              style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
            >
              <span className="text-[10px] font-bold text-background">DV</span>
            </div>
            <div className="min-w-0 text-left">
              <span className="block font-bold text-sm tracking-[0.22em] truncate">DESIGNVERSE</span>
              <span className="hidden sm:block text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Design toolkit + creator hub</span>
            </div>
          </motion.button>

          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item.href, item.type)}
                whileHover={{ backgroundColor: 'rgba(128, 128, 128, 0.08)' }}
                className={cn(
                  'relative flex items-center gap-2 px-3 py-2 transition-all duration-300 text-xs font-medium tracking-wider uppercase',
                  isActive(item.href, item.type) ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.isNew && (
                  <span className="absolute -top-1 -right-1 px-1 py-0.5 bg-primary text-[7px] font-black text-primary-foreground rounded-full">
                    NEW
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />

            <div className="hidden md:flex xl:hidden items-center gap-1 overflow-x-auto scrollbar-none max-w-[30rem]">
              {navItems.slice(0, 5).map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href, item.type)}
                  className={cn(
                    'shrink-0 px-3 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase border',
                    isActive(item.href, item.type)
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-foreground/10 text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="xl:hidden h-9 w-9 p-0 border border-foreground/10">
                  <Menu className="w-4 h-4" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[92vw] sm:max-w-md border-foreground/10 p-0">
                <div className="h-full flex flex-col">
                  <SheetHeader className="border-b border-foreground/10 p-6 pb-5">
                    <SheetTitle className="text-left tracking-[0.2em] uppercase text-sm">DesignVerse Menu</SheetTitle>
                  </SheetHeader>

                  <div className="p-6 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-2">
                      {navItems.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleNavClick(item.href, item.type)}
                          className={cn(
                            'flex items-center justify-between border px-4 py-3 text-left transition-colors',
                            isActive(item.href, item.type)
                              ? 'border-foreground bg-foreground text-background'
                              : 'border-foreground/10 hover:border-foreground/30'
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <item.icon className="w-4 h-4" />
                            <span className="text-xs font-bold tracking-[0.18em] uppercase">{item.label}</span>
                          </span>
                          {item.isNew && <span className="text-[9px] font-black tracking-[0.2em] uppercase">New</span>}
                        </button>
                      ))}
                    </div>

                    {quickActions.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground">Quick actions</p>
                        <div className="grid gap-2">
                          {quickActions.map((action) => (
                            <button
                              key={action.label}
                              onClick={action.action}
                              className="border border-primary/20 bg-primary/10 px-4 py-3 text-left text-xs font-bold tracking-[0.18em] uppercase"
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border border-foreground/10 p-4 text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground mb-1">Built for mobile and tablet</p>
                      <p>Navigation, marketplace actions, blog creation, and brand-kit flows now stay accessible without horizontal scrolling or hidden actions.</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative w-9 h-9 rounded-full p-0 overflow-hidden hover:bg-foreground/5 transition-all"
                  >
                    <Avatar className="w-9 h-9 rounded-full">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-foreground text-background text-[10px] font-bold">
                        {user.email?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 glass-card border-foreground/10 mt-2 p-1">
                  <DropdownMenuLabel className="px-2 py-1.5">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-bold truncate">{user.user_metadata?.nickname || 'Designer'}</p>
                      <p className="text-[10px] text-muted-foreground truncate uppercase tracking-widest">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-foreground/10" />
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="flex items-center gap-2 px-2 py-2 text-xs font-bold tracking-wider cursor-pointer">
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>PROFILE DETAILS</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/bookmarks')} className="flex items-center gap-2 px-2 py-2 text-xs font-bold tracking-wider cursor-pointer">
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>MY BOOKMARKS</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-2 py-2 text-xs font-bold tracking-wider cursor-pointer">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>DASHBOARD</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/create-blog')} className="flex items-center gap-2 px-2 py-2 text-xs font-bold tracking-widest text-primary cursor-pointer">
                    <PlusSquare className="w-3.5 h-3.5" />
                    <span>WRITE A STORY</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-foreground/10" />
                  <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 px-2 py-2 text-xs font-bold tracking-wider text-destructive cursor-pointer">
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
                className="px-2 sm:px-3 py-2 transition-all duration-300 hover:bg-foreground/5 flex items-center gap-1 border border-foreground/10"
                title="Sign in"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline text-xs tracking-wider uppercase">Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </motion.nav>

      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-11 h-11 md:w-12 md:h-12 border border-foreground/20 bg-background/80 backdrop-blur-sm flex items-center justify-center group"
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
