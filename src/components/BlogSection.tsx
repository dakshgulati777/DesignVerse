import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ExternalLink, Calendar, User, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { fadeInUp } = useScrollAnimation();

  // Sample blog posts from Daksh Gulati's blog
  const samplePosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Psychology of Color in Modern Design',
      excerpt: 'Explore how different colors affect user behavior and emotions in digital interfaces. Understanding color theory can transform your design approach.',
      author: 'Daksh Gulati',
      date: '2024-03-15',
      readTime: '5 min read',
      category: 'Color Theory',
      imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=250&fit=crop'
    },
    {
      id: '2',
      title: 'Glassmorphism: The Future of UI Design',
      excerpt: 'Discover the trending design aesthetic that combines transparency, blur effects, and subtle borders to create stunning user interfaces.',
      author: 'Daksh Gulati',
      date: '2024-03-12',
      readTime: '7 min read',
      category: 'UI Trends',
      imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop'
    },
    {
      id: '3',
      title: 'AI-Powered Design Tools Revolution',
      excerpt: 'How artificial intelligence is reshaping the design landscape and empowering creators to push boundaries like never before.',
      author: 'Daksh Gulati',
      date: '2024-03-10',
      readTime: '6 min read',
      category: 'AI & Design',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop'
    },
    {
      id: '4',
      title: 'Motion Design Principles for Web',
      excerpt: 'Learn the fundamental principles of motion design and how to apply them effectively in web interfaces for better user experience.',
      author: 'Daksh Gulati',
      date: '2024-03-08',
      readTime: '8 min read',
      category: 'Motion Design',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchPosts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(samplePosts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-20 px-6 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          {...fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 glass-nav mb-6">
            <ExternalLink className="w-5 h-5 text-primary" />
            <span className="font-medium">Latest Insights</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Design
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Blog</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and insights from the design world
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Swiper
              grabCursor={true}
              centeredSlides={false}
              slidesPerView={'auto'}
              spaceBetween={30}
              loop={true}
              loopAdditionalSlides={2}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                enabled: true,
              }}
              modules={[Pagination, Navigation, Autoplay]}
              className="blog-swiper pb-12 !px-4"
              style={{
                '--swiper-navigation-color': 'hsl(var(--primary))',
                '--swiper-pagination-color': 'hsl(var(--primary))',
              } as any}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  centeredSlides: true,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                  centeredSlides: false,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                  centeredSlides: false,
                }
              }}
            >
              {posts.map((post, index) => (
                <SwiperSlide key={post.id} className="!h-auto" style={{ width: '350px', maxWidth: '90vw' }}>
                  <motion.div
                    className="parallax-card h-full group cursor-pointer hover-glow"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Post Image */}
                    <div className="relative overflow-hidden rounded-xl mb-6">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-44 sm:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
                          {post.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Post Content */}
                    <div className="space-y-4 p-1">
                      <h3 className="text-lg sm:text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-border/30">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm text-primary font-medium">{post.readTime}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              const bookmarked = isBookmarked('blog', post.id);
                              if (bookmarked) {
                                removeBookmark('blog', post.id);
                              } else {
                                addBookmark('blog', post.id, post);
                              }
                            }}
                            className="p-1 hover:text-primary"
                          >
                            {isBookmarked('blog', post.id) ? (
                              <BookmarkCheck className="w-4 h-4 fill-current" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <Button variant="outline" size="sm" className="btn-glass text-xs sm:text-sm hover-glow">
                          Read More
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          {...fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <Button 
            className="btn-primary"
            onClick={() => window.open('https://dakshgulati23.blogspot.com/', '_blank')}
          >
            View All Posts
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;