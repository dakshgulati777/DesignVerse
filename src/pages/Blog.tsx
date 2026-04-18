import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  User,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Search,
  ArrowLeft,
  Clock,
  Share2,
  BookOpen,
  Trash2,
  Edit3,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useBookmarks } from '@/hooks/useBookmarks';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { toast } from '@/hooks/use-toast';
import SimpleMarkdown from '@/components/SimpleMarkdown';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  author_id?: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  content?: string;
}

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 's1',
    title: 'The Psychology of Glassmorphism',
    excerpt: 'Why transparency and blur continue to dominate modern interface design, and how to use the trend without losing clarity.',
    author: 'DesignVerse Community',
    date: new Date().toISOString(),
    readTime: '4 min read',
    category: 'Psychology',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=800&fit=crop',
    content: '# The Psychology of Glassmorphism\n\nModern UI design continues to borrow from physical depth. Blur, transparency, and layering can help create intuitive hierarchy when contrast is handled carefully.\n\n## Why it works\n\nGlassmorphism feels spatial and tactile. It can separate interface layers without adding heavy borders or card stacks.\n\n## Use it carefully\n\n- Preserve strong text contrast.\n- Keep background noise low.\n- Use blur to support hierarchy, not replace it.',
  },
  {
    id: 's2',
    title: 'Bento Grids: A Layout Revolution',
    excerpt: 'From Apple to Stripe, the bento grid keeps winning because it balances structure, storytelling, and responsive composition.',
    author: 'DesignVerse',
    date: new Date().toISOString(),
    readTime: '6 min read',
    category: 'Layout',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop',
    content: '# Bento Grids: A Layout Revolution\n\nBento layouts turn dense information into modular storytelling.\n\n## Why they scale\n\nThey help teams mix product shots, copy, and proof points inside one visual system that still feels flexible on smaller screens.',
  },
];

const Blog = () => {
  const STORAGE_KEY = 'designverse-blog-state';
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { user } = useAuth();
  const navigate = useNavigate();
  const hasRestoredScroll = useRef(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('blogs').select('id, title, content, cover_image, created_at, author_id, category').order('created_at', { ascending: false });

      if (error) throw error;

      const blogPosts = (data || []).map((blog) => {
        const wordCount = blog.content ? blog.content.trim().split(/\s+/).filter(Boolean).length : 0;
        return {
          id: blog.id,
          title: blog.title,
          excerpt: blog.content ? `${blog.content.substring(0, 170)}...` : '',
          author: 'DesignVerse Community',
          author_id: blog.author_id,
          date: blog.created_at,
          readTime: `${Math.max(1, Math.ceil(wordCount / 180))} min read`,
          category: blog.category || 'Community',
          imageUrl: blog.cover_image || 'https://images.unsplash.com/photo-1487058715912-ca02820ee39d?w=1200&h=800&fit=crop',
          content: blog.content,
        };
      });

      setPosts(blogPosts.length > 0 ? blogPosts : FALLBACK_POSTS);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setPosts(FALLBACK_POSTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedState = sessionStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState) as { searchQuery?: string; selectedCategory?: string | null };
        if (typeof parsed.searchQuery === 'string') setSearchQuery(parsed.searchQuery);
        if (parsed.selectedCategory !== undefined) setSelectedCategory(parsed.selectedCategory);
      } catch (error) {
        console.error('Failed to restore blog state:', error);
      }
    }

    fetchBlogs();
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ searchQuery, selectedCategory }));
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const handleScrollSave = () => {
      const savedState = sessionStorage.getItem(STORAGE_KEY);
      const parsedState = savedState ? JSON.parse(savedState) : {};
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...parsedState, searchQuery, selectedCategory, scrollY: window.scrollY }));
    };

    window.addEventListener('scroll', handleScrollSave, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSave);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    if (loading || hasRestoredScroll.current) return;
    const savedState = sessionStorage.getItem(STORAGE_KEY);
    if (!savedState) return;

    try {
      const parsed = JSON.parse(savedState) as { scrollY?: number };
      if (typeof parsed.scrollY === 'number') {
        requestAnimationFrame(() => {
          window.scrollTo({ top: parsed.scrollY, behavior: 'auto' });
          hasRestoredScroll.current = true;
        });
      }
    } catch (error) {
      console.error('Failed to restore blog scroll:', error);
    }
  }, [loading]);

  useEffect(() => {
    const refreshPageData = () => fetchBlogs();
    window.addEventListener('focus', refreshPageData);
    window.addEventListener('pageshow', refreshPageData);
    return () => {
      window.removeEventListener('focus', refreshPageData);
      window.removeEventListener('pageshow', refreshPageData);
    };
  }, []);

  const categories = useMemo(() => {
    const dynamicCategories = Array.from(new Set(posts.map((post) => post.category))).filter(Boolean);
    return ['All', ...dynamicCategories];
  }, [posts]);

  const filteredPosts = useMemo(() => posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }), [posts, searchQuery, selectedCategory]);

  const featuredPost = filteredPosts[0];

  const handleShare = async (post: BlogPost) => {
    const shareText = `${post.title} - ${post.excerpt}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: shareText });
        return;
      } catch {
        // fall through
      }
    }

    await navigator.clipboard.writeText(shareText);
    toast({ title: 'Story copied', description: 'Story title and excerpt copied to clipboard.' });
  };

  const handleDeletePost = async (postId: string) => {
    if (!user) return;
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', postId).eq('author_id', user.id);
      if (error) throw error;
      setPosts(prev => prev.filter(p => p.id !== postId));
      toast({ title: 'Post deleted', description: 'Your blog post has been removed.' });
    } catch {
      toast({ title: 'Error', description: 'Failed to delete post.', variant: 'destructive' });
    }
  };

  return (
    <ThemeProvider>
      <div className="blog-page min-h-screen bg-background text-foreground pb-20 font-inter">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32">
          <div className="mb-12 sm:mb-16">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              BACK
            </motion.button>

            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-none mb-2">
                  <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">DesignVerse Blog</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase underline decoration-primary decoration-4 sm:decoration-8 underline-offset-8">
                  Latest Stories
                </h1>
                <p className="text-muted-foreground text-base sm:text-xl max-w-2xl font-medium">
                  Insights, tutorials, case studies, and design thinking from the community.
                </p>
              </div>

              <Button
                className="h-12 sm:h-16 px-6 sm:px-8 bg-foreground text-background hover:bg-foreground/90 font-black tracking-widest text-xs sm:text-sm rounded-none group"
                onClick={() => navigate('/create-blog')}
              >
                WRITE A STORY
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2 sm:ml-3 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {featuredPost && !loading && (
            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch border border-foreground/10 bg-background/70 mb-10 sm:mb-12 overflow-hidden">
              <div className="aspect-[4/3] lg:aspect-auto min-h-[240px] bg-foreground/5">
                <img src={featuredPost.imageUrl} alt={featuredPost.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 sm:p-8 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 w-fit">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Featured Story</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black tracking-[-0.05em] uppercase">{featuredPost.title}</h2>
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><User className="w-3 h-3 text-primary" /> {featuredPost.author}</span>
                  <span className="w-1 h-1 bg-primary rounded-full opacity-50" />
                  <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-primary" /> {new Date(featuredPost.date).toLocaleDateString()}</span>
                  <span className="w-1 h-1 bg-primary rounded-full opacity-50" />
                  <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-primary" /> {featuredPost.readTime}</span>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="h-12 rounded-none font-black tracking-[0.18em] text-xs">OPEN STORY</Button>
                    </DialogTrigger>
                    <DialogContent className="blog-dialog-content max-w-4xl max-h-[95vh] overflow-y-auto bg-background border-foreground/10 p-0 rounded-none font-inter border-2">
                      <DialogHeader className="sr-only"><DialogTitle>{featuredPost.title}</DialogTitle></DialogHeader>
                      <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden">
                        <img src={featuredPost.imageUrl} alt={featuredPost.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest mb-4">
                            {featuredPost.category}
                          </div>
                          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground">{featuredPost.title}</h2>
                        </div>
                      </div>
                      <div className="p-8 md:p-12">
                        <SimpleMarkdown content={featuredPost.content || featuredPost.excerpt} className="max-w-none text-lg" />
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="h-12 rounded-none font-black tracking-[0.18em] text-xs border-foreground/10" onClick={() => handleShare(featuredPost)}>
                    SHARE STORY
                  </Button>
                </div>
              </div>
            </section>
          )}

          <div className="flex flex-col lg:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-12 h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none font-medium text-base sm:text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat || (selectedCategory === null && cat === 'All') ? 'default' : 'outline'}
                  className={`h-12 px-4 border-foreground/10 rounded-none font-black tracking-widest text-[10px] uppercase transition-all ${
                    (selectedCategory === cat || (selectedCategory === null && cat === 'All')) ? 'bg-foreground text-background' : 'hover:bg-foreground/5'
                  }`}
                  onClick={() => setSelectedCategory(cat === 'All' ? null : cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/5] bg-foreground/5 animate-pulse border border-foreground/10" />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative flex flex-col h-full bg-background border border-foreground/10 p-4 hover:border-primary/50 transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden mb-6">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-background border border-foreground/10 text-[10px] font-black uppercase tracking-widest shadow-xl">
                      {post.category}
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow space-y-4">
                    <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest flex-wrap">
                      <span className="flex items-center gap-1.5"><User className="w-3 h-3 text-primary" /> {post.author}</span>
                      <span className="w-1 h-1 bg-primary rounded-full opacity-50" />
                      <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-primary" /> {new Date(post.date).toLocaleDateString()}</span>
                    </div>

                    <h3 className="text-xl font-black leading-tight group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight">
                      {post.title}
                    </h3>

                    <div className="flex flex-col flex-grow">
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-medium mb-6">{post.excerpt}</p>

                      <div className="mt-auto pt-6 flex items-center justify-between border-t border-foreground/5">
                        <div className="flex items-center gap-2 px-2 py-1 bg-foreground/5 text-primary">
                          <Clock className="w-3 h-3 text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-[0.1em]">{post.readTime}</span>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" className="p-0 h-auto font-black text-[10px] tracking-widest uppercase hover:text-primary hover:bg-transparent group/trigger">
                              OPEN STORY
                              <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover/trigger:translate-x-1" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="blog-dialog-content max-w-4xl max-h-[95vh] overflow-y-auto bg-background border-foreground/10 p-0 rounded-none font-inter border-2">
                            <DialogHeader className="sr-only">
                              <DialogTitle>{post.title}</DialogTitle>
                            </DialogHeader>

                            <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden">
                              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                              <div className="absolute bottom-8 left-8 right-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest mb-4">
                                  {post.category}
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground">{post.title}</h2>
                              </div>
                            </div>

                            <div className="p-8 md:p-12 lg:p-16">
                              <div className="flex flex-wrap items-center gap-6 mb-12 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b-2 border-foreground/5 pb-8">
                                <span className="flex items-center gap-2"><User className="w-4 h-4 text-primary" /> BY {post.author}</span>
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {post.readTime}</span>
                              </div>

                              <SimpleMarkdown content={post.content || post.excerpt} className="max-w-none text-lg" />

                              <div className="mt-16 pt-10 border-t-2 border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex items-center gap-6">
                                  <span className="text-xs font-black uppercase tracking-[0.2em]">Share the insight</span>
                                  <div className="flex gap-3">
                                    <button className="w-10 h-10 border-2 border-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors" onClick={() => handleShare(post)}>
                                      <Share2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  className={`border-2 rounded-none font-black tracking-widest text-[10px] h-14 px-10 transition-all ${
                                    isBookmarked('blog', post.id) ? 'bg-primary text-primary-foreground border-primary' : 'border-foreground/20 hover:bg-foreground hover:text-background'
                                  }`}
                                  onClick={() => {
                                    if (isBookmarked('blog', post.id)) {
                                      removeBookmark('blog', post.id);
                                    } else {
                                      addBookmark('blog', post.id, post);
                                    }
                                  }}
                                >
                                  {isBookmarked('blog', post.id)
                                    ? <span className="flex items-center gap-2"><BookmarkCheck className="w-4 h-4" /> REMOVE BOOKMARK</span>
                                    : <span className="flex items-center gap-2"><Bookmark className="w-4 h-4" /> SAVE FOR LATER</span>}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-20">
                    {user && post.author_id === user.id && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate(`/create-blog/${post.id}`); }}
                          className="p-2 bg-background/90 text-foreground backdrop-blur-md border border-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                          aria-label="Edit post"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeletePost(post.id); }}
                          className="p-2 bg-destructive/90 text-destructive-foreground backdrop-blur-md border border-destructive/20 hover:bg-destructive transition-colors"
                          aria-label="Delete post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isBookmarked('blog', post.id)) {
                          removeBookmark('blog', post.id);
                        } else {
                          addBookmark('blog', post.id, post);
                        }
                      }}
                      className="p-2 bg-background/80 backdrop-blur-md border border-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {isBookmarked('blog', post.id) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-6 border border-dashed border-foreground/10">
              <div className="w-16 h-16 mx-auto text-muted-foreground/30 flex items-center justify-center border border-foreground/10">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase">No Articles Found</h3>
                <p className="text-muted-foreground">Try adjusting your search or write the first story in this category.</p>
              </div>
              <Button className="h-12 rounded-none font-black tracking-widest text-[10px]" onClick={() => navigate('/create-blog')}>
                WRITE A STORY
              </Button>
            </div>
          )}
        </div>

        <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-80 h-80 border-8 border-foreground rotate-12" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 border-8 border-foreground -rotate-12" />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Blog;
