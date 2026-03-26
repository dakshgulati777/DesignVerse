import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, User, Bookmark, BookmarkCheck, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  content?: string;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { fadeInUp } = useScrollAnimation();
  const navigate = useNavigate();

  const fetchDynamicBlogs = async () => {
    setLoading(true);
    let blogPosts: BlogPost[] = [];
    
    try {
      // 1. Fetch blogs from Supabase
      const { data, error } = await supabase.from('blogs')
        .select(`
          id,
          title,
          content,
          cover_image,
          created_at,
          author_id
        `);

      if (!error && data) {
        // 2. Map data to BlogPost interface
        blogPosts = data.map(blog => ({
          id: blog.id,
          title: blog.title,
          excerpt: blog.content.substring(0, 120) + '...',
          author: 'Community Member',
          date: blog.created_at,
          readTime: '5 min read',
          category: 'Community',
          imageUrl: blog.cover_image || 'https://images.unsplash.com/photo-1487058715912-ca02820ee39d',
          content: blog.content
        }));
      }
    } catch (err) {
      console.error('Error fetching dynamic blogs:', err);
    }

    // 3. Fallback to sample posts if DB is empty or fetch failed
    if (blogPosts.length < 4) {
      const samples: BlogPost[] = [
        {
          id: 's1',
          title: 'The Psychology of Glassmorphism',
          excerpt: 'Why transparency and blur are dominating modern UI design languages in 2024.',
          author: 'Daksh Gulati',
          date: new Date().toISOString(),
          readTime: '4 min read',
          category: 'Psychology',
          imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=250&fit=crop',
          content: 'Modern UI design is seeing a significant shift towards glassmorphism. This aesthetic, characterized by transparency, background blur, and subtle borders, creates a sense of depth and hierarchy without overwhelming the user. In this article, we dive deep into the psychology behind why this trend is resonating so strongly with users in 2024.'
        },
        {
          id: 's2',
          title: 'Bento Grids: A Layout Revolution',
          excerpt: 'From Apple to Stripe, why the bento box layout is becoming the industry standard.',
          author: 'DesignVerse',
          date: new Date().toISOString(),
          readTime: '6 min read',
          category: 'Layout',
          imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop',
          content: 'The bento box layout, popularized by Apple and extensively used by companies like Stripe and Linear, is more than just a passing trend. It offers a structured yet flexible way to present information, making it perfect for dashboards and feature-rich pages. We explore how to implement this layout efficiently in your next project.'
        },
        {
          id: 's3',
          title: 'Generative AI: Your New Co-Pilot',
          excerpt: 'How to use midjourney and stable diffusion as part of your creative brainstorming process.',
          author: 'AI Expert',
          date: new Date().toISOString(),
          readTime: '10 min read',
          category: 'AI & Design',
          imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
          content: 'Artificial Intelligence is not replacing designers; it is empowering them. By using tools like Midjourney and Stable Diffusion, designers can rapidly prototype concepts and explore visual directions that were previously time-consuming. This guide shows you how to integrate AI into your professional workflow.'
        },
        {
          id: 's4',
          title: 'The Return of Serif Typefaces',
          excerpt: 'Why high-contrast serifs are replacing clean sans-serifs in luxury brand identities.',
          author: 'Type Wizard',
          date: new Date().toISOString(),
          readTime: '5 min read',
          category: 'Typography',
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
          content: 'After a decade of minimalism and sans-serif dominance, high-contrast serif typefaces are making a comeback, particularly in luxury branding and high-end editorial design. These typefaces bring a sense of personality, heritage, and elegance that sans-serifs often lack.'
        },
        {
          id: 's5',
          title: 'Dynamic Design Systems',
          excerpt: 'Moving beyond static styles to fluid, token-based architectures that scale globally.',
          author: 'Lead Architect',
          date: new Date().toISOString(),
          readTime: '12 min read',
          category: 'Systems',
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
        },
        {
          id: 's6',
          title: 'Motion: The 5th Dimension',
          excerpt: 'Creating micro-interactions that feel alive and provide meaningful user feedback.',
          author: 'Motion Guru',
          date: new Date().toISOString(),
          readTime: '8 min read',
          category: 'Motion',
          imageUrl: 'https://images.unsplash.com/photo-1614850523296-e811cf9ee04a?w=400&h=250&fit=crop'
        },
        {
          id: 's7',
          title: 'Sustainable Web Design',
          excerpt: 'Reducing the carbon footprint of digital products through efficient asset loading.',
          author: 'Eco Designer',
          date: new Date().toISOString(),
          readTime: '5 min read',
          category: 'Sustainability',
          imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop'
        },
        {
          id: 's8',
          title: 'The Dark Mode Paradox',
          excerpt: 'Is dark mode truly better for readability? Analyzing contrast and visual fatigue.',
          author: 'UX Scientist',
          date: new Date().toISOString(),
          readTime: '7 min read',
          category: 'UX Research',
          imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=250&fit=crop'
        }
      ];
      blogPosts = [...blogPosts, ...samples];
    }

    // 4. Randomly select exactly 4
    const shuffled = [...blogPosts].sort(() => 0.5 - Math.random());
    setPosts(shuffled.slice(0, 4));
    setLoading(false);
  };

  useEffect(() => {
    fetchDynamicBlogs();
  }, []);

  return (
    <section id="blog" className="py-24 px-6 relative overflow-hidden bg-background/50">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          {...fadeInUp}
        >
          <div className="space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-none mb-2">
              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">From the Blog</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase underline decoration-primary decoration-4 underline-offset-8">
              Latest Stories
            </h2>
          </div>
          <Button
            variant="ghost"
            className="group font-black tracking-widest text-xs h-12 px-6 border border-foreground/10 hover:bg-foreground hover:text-background rounded-none"
            onClick={() => navigate('/blog')}
          >
            VIEW ALL INSIGHTS
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] bg-foreground/5 animate-pulse border border-foreground/10" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col h-full bg-background border border-foreground/10 p-4 hover:border-primary/50 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                  />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-background text-[10px] font-black uppercase tracking-widest">
                    {post.category}
                  </div>
                </div>

                <div className="flex flex-col flex-grow space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {post.author}</span>
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-xl font-black leading-tight group-hover:text-primary transition-colors line-clamp-2 italic">
                    {post.title}
                  </h3>
                  
                  <div className="flex flex-col flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-foreground/5">
                      <span className="text-[10px] font-black text-primary px-2 py-1 bg-primary/5">{post.readTime}</span>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="p-0 h-auto font-black text-[10px] tracking-widest uppercase hover:text-primary hover:bg-transparent group/trigger"
                          >
                            Read More
                            <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover/trigger:translate-x-1" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-foreground/10 p-0 rounded-none">
                          <DialogHeader className="sr-only">
                            <DialogTitle>{post.title}</DialogTitle>
                          </DialogHeader>
                          <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden">
                            <img 
                              src={post.imageUrl} 
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8">
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest mb-4">
                                {post.category}
                              </div>
                              <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-foreground decoration-primary decoration-4 underline underline-offset-8">
                                {post.title}
                              </h2>
                            </div>
                          </div>
                          
                          <div className="p-8 md:p-12">
                            <div className="flex flex-wrap items-center gap-6 mb-12 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-foreground/5 pb-6">
                              <span className="flex items-center gap-2"><User className="w-4 h-4 text-primary" /> {post.author}</span>
                              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                              <span className="flex items-center gap-2"><Bookmark className="w-4 h-4 text-primary" /> {post.readTime}</span>
                            </div>
                            
                            <div className="prose prose-invert max-w-none">
                              <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-foreground/90 mb-8 border-l-4 border-primary pl-6">
                                {post.excerpt}
                              </p>
                              <div className="text-lg leading-loose text-muted-foreground space-y-6 font-medium">
                                {post.content ? (
                                  post.content.split('\n\n').map((para, i) => (
                                    <p key={i}>{para}</p>
                                  ))
                                ) : (
                                  <p>{post.excerpt} {post.excerpt} {post.excerpt}</p>
                                )}
                              </div>
                            </div>
                            
                            <div className="mt-16 pt-8 border-t border-foreground/10 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <span className="text-xs font-black uppercase tracking-widest">Share this Story</span>
                                <div className="flex gap-2">
                                  {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 border border-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                                      <ExternalLink className="w-3 h-3" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <Button 
                                variant="outline"
                                className="border-foreground/20 rounded-none font-black tracking-widest text-[10px] h-12 px-8 hover:bg-foreground hover:text-background"
                                onClick={() => {
                                  isBookmarked('blog', post.id) ? removeBookmark('blog', post.id) : addBookmark('blog', post.id, post);
                                }}
                              >
                                {isBookmarked('blog', post.id) ? 'REMOVED FROM BOOKMARKS' : 'BOOKMARK STORY'}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>

                {/* Bookmark overlay */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    isBookmarked('blog', post.id) ? removeBookmark('blog', post.id) : addBookmark('blog', post.id, post);
                  }}
                  className="absolute top-6 right-6 p-2 bg-background/80 backdrop-blur-md rounded-none border border-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {isBookmarked('blog', post.id) ? (
                    <BookmarkCheck className="w-4 h-4 text-primary" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
    </section>
  );
};

export default BlogSection;