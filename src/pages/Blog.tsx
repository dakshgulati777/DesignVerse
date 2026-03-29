import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Bookmark, BookmarkCheck, ArrowRight, Search, Filter, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBookmarks } from '@/hooks/useBookmarks';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

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

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true);
    let blogPosts: BlogPost[] = [];

    try {
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
        blogPosts = data.map(blog => ({
          id: blog.id,
          title: blog.title,
          excerpt: blog.content ? blog.content.substring(0, 150) + '...' : '',
          author: 'Community Member',
          date: blog.created_at,
          readTime: '5 min read',
          category: 'Community',
          imageUrl: blog.cover_image || 'https://images.unsplash.com/photo-1487058715912-ca02820ee39d',
          content: blog.content
        }));
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }

    if (blogPosts.length === 0) {
      const samples: BlogPost[] = [
        {
          id: 's1',
          title: 'The Psychology of Glassmorphism',
          excerpt: 'Why transparency and blur are dominating modern UI design languages in 2024.',
          author: 'Daksh Gulati',
          date: new Date().toISOString(),
          readTime: '4 min read',
          category: 'Psychology',
          imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=500&fit=crop',
          content: 'Modern UI design is seeing a significant shift towards glassmorphism. This aesthetic, characterized by transparency, background blur, and subtle borders, creates a sense of depth and hierarchy without overwhelming the user.\n\nIn this article, we dive deep into the psychology behind why this trend is resonating so strongly with users in 2024. The use of transparency in interfaces mimics the way we perceive the physical world, creating a more intuitive and natural user experience.\n\nKey principles of effective glassmorphism include proper contrast ratios, thoughtful blur radius selection, and maintaining accessibility standards while achieving aesthetic goals.'
        },
        {
          id: 's2',
          title: 'Bento Grids: A Layout Revolution',
          excerpt: 'From Apple to Stripe, why the bento box layout is becoming the industry standard.',
          author: 'DesignVerse',
          date: new Date().toISOString(),
          readTime: '6 min read',
          category: 'Layout',
          imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop',
          content: 'The bento box layout, popularized by Apple and extensively used by companies like Stripe and Linear, is more than just a passing trend. It offers a structured yet flexible way to present information.\n\nWe explore how to implement this layout efficiently in your next project. The modular nature of bento grids allows for responsive design patterns that adapt seamlessly across different screen sizes.\n\nBest practices include maintaining consistent padding, using visual hierarchy through size variation, and ensuring each cell has a clear purpose.'
        },
        {
          id: 's3',
          title: 'Generative AI: Your New Co-Pilot',
          excerpt: 'How to use midjourney and stable diffusion as part of your creative brainstorming process.',
          author: 'AI Expert',
          date: new Date().toISOString(),
          readTime: '10 min read',
          category: 'AI & Design',
          imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
          content: 'Artificial Intelligence is not replacing designers; it is empowering them. By using tools like Midjourney and Stable Diffusion, designers can rapidly prototype concepts and explore visual directions.\n\nThis guide shows you how to integrate AI into your professional workflow. Start by defining clear prompts that capture your design intent, then iterate on the results with human refinement.\n\nThe key is to view AI as a collaborative tool rather than a replacement for human creativity. The most successful designers will be those who learn to harness AI effectively.'
        },
        {
          id: 's4',
          title: 'The Return of Serif Typefaces',
          excerpt: 'Why high-contrast serifs are replacing clean sans-serifs in luxury brand identities.',
          author: 'Type Wizard',
          date: new Date().toISOString(),
          readTime: '5 min read',
          category: 'Typography',
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
          content: 'After a decade of minimalism and sans-serif dominance, high-contrast serif typefaces are making a comeback, particularly in luxury branding and high-end editorial design.\n\nThese typefaces bring a sense of personality, heritage, and elegance that sans-serifs often lack. The resurgence is driven by a desire for brands to stand out in an increasingly homogenized digital landscape.\n\nWhen selecting serif typefaces for modern projects, consider x-height, stroke contrast, and how the typeface renders at various sizes on digital displays.'
        },
        {
          id: 's5',
          title: 'Dynamic Design Systems',
          excerpt: 'Moving beyond static styles to fluid, token-based architectures that scale globally.',
          author: 'Lead Architect',
          date: new Date().toISOString(),
          readTime: '12 min read',
          category: 'Systems',
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
          content: 'Design systems have evolved from static style guides to dynamic, token-based architectures. This evolution enables teams to maintain consistency while scaling across multiple platforms and brands.\n\nDesign tokens serve as the atomic building blocks of your design system, storing visual attributes as data that can be consumed across any platform or framework.\n\nImplementation strategies include starting with core tokens (colors, spacing, typography), then building semantic tokens that map to specific use cases.'
        },
        {
          id: 's6',
          title: 'Motion: The 5th Dimension',
          excerpt: 'Creating micro-interactions that feel alive and provide meaningful user feedback.',
          author: 'Motion Guru',
          date: new Date().toISOString(),
          readTime: '8 min read',
          category: 'Motion',
          imageUrl: 'https://images.unsplash.com/photo-1614850523296-e811cf9ee04a?w=800&h=500&fit=crop',
          content: 'Motion design is the fifth dimension of user experience, adding life and personality to digital products. Micro-interactions, when done correctly, provide essential feedback without overwhelming users.\n\nThe principles of effective motion design include purposeful animation, appropriate timing, and easing curves that mimic natural movement.\n\nTools like Framer Motion and Lottie make it easier than ever to implement sophisticated animations that enhance rather than distract from the user experience.'
        },
        {
          id: 's7',
          title: 'Sustainable Web Design',
          excerpt: 'Reducing the carbon footprint of digital products through efficient asset loading.',
          author: 'Eco Designer',
          date: new Date().toISOString(),
          readTime: '5 min read',
          category: 'Sustainability',
          imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop',
          content: 'Every website has a carbon footprint, and sustainable web design is becoming an essential consideration for responsible designers. Efficient asset loading, optimized images, and minimal JavaScript can significantly reduce environmental impact.\n\nKey strategies include using modern image formats like WebP and AVIF, implementing lazy loading, and choosing green hosting providers.\n\nThe sustainable web design movement proves that environmental responsibility and beautiful design are not mutually exclusive.'
        },
        {
          id: 's8',
          title: 'The Dark Mode Paradox',
          excerpt: 'Is dark mode truly better for readability? Analyzing contrast and visual fatigue.',
          author: 'UX Scientist',
          date: new Date().toISOString(),
          readTime: '7 min read',
          category: 'UX Research',
          imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=500&fit=crop',
          content: 'Dark mode has become a standard feature, but is it truly better for readability? The answer depends on context, lighting conditions, and individual user preferences.\n\nResearch shows that dark mode can reduce eye strain in low-light environments, but light mode may be preferable for extended reading sessions in bright conditions.\n\nThe key is providing user choice and ensuring proper contrast ratios in both modes to maintain accessibility standards.'
        }
      ];
      blogPosts = samples;
    }

    setPosts(blogPosts);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const categories = ['All', 'Psychology', 'Layout', 'AI & Design', 'Typography', 'Systems', 'Motion', 'Sustainability', 'UX Research', 'Community'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32">
        {/* Header Section */}
        <div className="mb-16">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            BACK
          </motion.button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-none mb-2">
                <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">DesignVerse Blog</span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter italic uppercase underline decoration-primary decoration-4 sm:decoration-8 underline-offset-8">
                Latest Stories
              </h1>
              <p className="text-muted-foreground text-base sm:text-xl max-w-2xl italic font-medium">
                Insights, tutorials, and thoughts from the design community.
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

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-12 h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none font-medium text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat || (selectedCategory === null && cat === 'All') ? 'default' : 'outline'}
                className="h-14 px-4 border-foreground/10 rounded-none font-black tracking-widest text-xs uppercase"
                onClick={() => setSelectedCategory(cat === 'All' ? null : cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-[4/5] bg-foreground/5 animate-pulse border border-foreground/10" />
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
                                  <p>{post.excerpt}</p>
                                )}
                              </div>
                            </div>

                            <div className="mt-16 pt-8 border-t border-foreground/10 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <span className="text-xs font-black uppercase tracking-widest">Share this Story</span>
                                <div className="flex gap-2">
                                  {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 border border-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                                      <ArrowRight className="w-3 h-3" />
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
                                {isBookmarked('blog', post.id) ? 'BOOKMARKED' : 'BOOKMARK'}
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
        ) : (
          <div className="py-20 text-center space-y-6 border border-dashed border-foreground/10">
            <div className="w-16 h-16 mx-auto text-muted-foreground/30 flex items-center justify-center border border-foreground/10">
              <Search className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black italic uppercase">No Articles Found</h3>
              <p className="text-muted-foreground italic">Try adjusting your search or filter criteria.</p>
            </div>
          </div>
        )}
      </div>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 border-8 border-foreground rotate-12" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 border-8 border-foreground -rotate-12" />
      </div>
    </div>
  );
};

export default Blog;
