import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  BookOpen, ShoppingBag, Bookmark, Activity, ArrowRight, Plus, Clock, TrendingUp, Edit3, Trash2,
} from 'lucide-react';

interface DashboardStats {
  totalPosts: number;
  totalListings: number;
  totalBookmarks: number;
  recentPosts: { id: string; title: string; created_at: string; category: string }[];
  recentListings: { id: string; name: string; created_at: string; price: number }[];
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0, totalListings: 0, totalBookmarks: 0, recentPosts: [], recentListings: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate('/auth'); return; }

    const fetchStats = async () => {
      setLoading(true);
      try {
        const [postsRes, listingsRes, bookmarksRes] = await Promise.all([
          supabase.from('blogs').select('id, title, created_at, category').eq('author_id', user.id).order('created_at', { ascending: false }).limit(5),
          supabase.from('marketplace_assets').select('id, name, created_at, price').eq('seller_id', user.id).order('created_at', { ascending: false }).limit(5),
          supabase.from('bookmarks').select('id').eq('user_id', user.id),
        ]);

        setStats({
          totalPosts: postsRes.data?.length ?? 0,
          totalListings: listingsRes.data?.length ?? 0,
          totalBookmarks: bookmarksRes.data?.length ?? 0,
          recentPosts: (postsRes.data ?? []) as any,
          recentListings: (listingsRes.data ?? []) as any,
        });
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground animate-spin rounded-full" />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  const statCards = [
    { label: 'Blog Posts', value: stats.totalPosts, icon: BookOpen, color: 'text-primary', action: () => navigate('/blog') },
    { label: 'Marketplace Listings', value: stats.totalListings, icon: ShoppingBag, color: 'text-primary', action: () => navigate('/marketplace') },
    { label: 'Bookmarks', value: stats.totalBookmarks, icon: Bookmark, color: 'text-primary', action: () => navigate('/bookmarks') },
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground pb-20">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Dashboard</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase">
              Your Studio
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl font-medium">
              Welcome back, {user?.user_metadata?.nickname || user?.email?.split('@')[0] || 'Designer'}. Here's your activity overview.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {statCards.map((card, i) => (
              <motion.button
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={card.action}
                className="border border-foreground/10 bg-background hover:border-primary/50 p-6 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-4xl font-black">{card.value}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mt-2">{card.label}</p>
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="border border-foreground/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-black uppercase tracking-[0.2em]">Recent Posts</h2>
                </div>
                <Button variant="ghost" size="sm" className="text-[10px] font-black tracking-widest" onClick={() => navigate('/create-blog')}>
                  <Plus className="w-3 h-3 mr-1" /> NEW
                </Button>
              </div>
              {stats.recentPosts.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-3 border border-foreground/5 hover:border-foreground/20 transition-colors">
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate">{post.title}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3" />
                          {new Date(post.created_at).toLocaleDateString()}
                          <span className="text-primary">{post.category}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No blog posts yet. Write your first story!</p>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="border border-foreground/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-black uppercase tracking-[0.2em]">Recent Listings</h2>
                </div>
                <Button variant="ghost" size="sm" className="text-[10px] font-black tracking-widest" onClick={() => navigate('/marketplace/sell')}>
                  <Plus className="w-3 h-3 mr-1" /> NEW
                </Button>
              </div>
              {stats.recentListings.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentListings.map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-3 border border-foreground/5 hover:border-foreground/20 transition-colors">
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate">{listing.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3" />
                          {new Date(listing.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-sm font-black">${listing.price}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No marketplace listings yet. List your first design asset!</p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
