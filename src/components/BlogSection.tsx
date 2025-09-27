import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { ExternalLink, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

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

  // Sample blog posts - in production, fetch from Blogger API
  const samplePosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Psychology of Color in Modern Design',
      excerpt: 'Explore how different colors affect user behavior and emotions in digital interfaces. Understanding color theory can transform your design approach.',
      author: 'Sarah Chen',
      date: '2024-03-15',
      readTime: '5 min read',
      category: 'Color Theory',
      imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=250&fit=crop'
    },
    {
      id: '2',
      title: 'Glassmorphism: The Future of UI Design',
      excerpt: 'Discover the trending design aesthetic that combines transparency, blur effects, and subtle borders to create stunning user interfaces.',
      author: 'Alex Rodriguez',
      date: '2024-03-12',
      readTime: '7 min read',
      category: 'UI Trends',
      imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop'
    },
    {
      id: '3',
      title: 'AI-Powered Design Tools Revolution',
      excerpt: 'How artificial intelligence is reshaping the design landscape and empowering creators to push boundaries like never before.',
      author: 'Maya Patel',
      date: '2024-03-10',
      readTime: '6 min read',
      category: 'AI & Design',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop'
    },
    {
      id: '4',
      title: 'Motion Design Principles for Web',
      excerpt: 'Learn the fundamental principles of motion design and how to apply them effectively in web interfaces for better user experience.',
      author: 'James Wilson',
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              loop={true}
              loopAdditionalSlides={2}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="blog-swiper pb-12"
              style={{
                '--swiper-navigation-color': 'hsl(var(--primary))',
                '--swiper-pagination-color': 'hsl(var(--primary))',
              } as any}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 'auto',
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 'auto',
                  spaceBetween: 40,
                }
              }}
            >
              {posts.map((post, index) => (
                <SwiperSlide key={post.id} className="max-w-md">
                  <motion.div
                    className="parallax-card h-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Post Image */}
                    <div className="relative overflow-hidden rounded-lg mb-6">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4">
                        <span className="text-sm text-primary font-medium">{post.readTime}</span>
                        <Button variant="outline" size="sm" className="btn-glass">
                          Read More
                          <ExternalLink className="w-4 h-4 ml-2" />
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button className="btn-primary">
            View All Posts
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;