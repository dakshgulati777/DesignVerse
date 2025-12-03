import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { textures } from '@/data/textureData';

const TextureLabsSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { fadeInUp } = useScrollAnimation();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Show first 8 textures as preview
  const previewTextures = textures.slice(0, 8);

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          {...fadeInUp}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-nav mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Free Resources</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Texture Labs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Download 1000+ high-quality textures for free. Available in Adobe Illustrator (.ai), 
            Photoshop (.psd), and PNG formats.
          </p>
        </motion.div>

        {/* Preview Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {previewTextures.map((texture, index) => (
            <motion.div
              key={texture.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square rounded-xl overflow-hidden glass-card hover-lift cursor-pointer"
              onClick={() => navigate('/texture-labs')}
            >
              <img
                src={texture.thumbnail}
                alt={texture.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <p className="font-semibold text-sm mb-1">{texture.name}</p>
                  <p className="text-xs text-muted-foreground">{texture.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          {...fadeInUp}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => navigate('/texture-labs')}
            className="btn-primary group"
          >
            Explore All Textures
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TextureLabsSection;
