import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Download, Star, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface MarketplaceAsset {
  id: string;
  name: string;
  description: string;
  price: number;
  preview_url: string;
}

const MarketplaceSection = () => {
  const [assets, setAssets] = useState<MarketplaceAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFeaturedAssets = async () => {
    setLoading(true);
    try {
      const { data, error } = await (supabase.from('marketplace_assets') as any)
        .select('id, name, description, price, preview_url')
        .limit(3);

      let featured: MarketplaceAsset[] = data || [];

      if (featured.length === 0) {
        featured = [
          {
            id: 'h1',
            name: 'Elite Framer Template',
            description: 'High-performance portfolio for directors.',
            price: 59,
            preview_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
          },
          {
            id: 'h2',
            name: 'Neo-Brutalist Icons',
            description: '500+ hand-crafted SVG icons.',
            price: 29,
            preview_url: 'https://images.unsplash.com/photo-1614850523296-e811cf9ee04a?w=800&q=80'
          },
          {
            id: 'h3',
            name: 'DesignVerse Pro UI Kit',
            description: 'The ultimate design system for web.',
            price: 129,
            preview_url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80'
          }
        ];
      }
      setAssets(featured);
    } catch (err) {
      console.error('Error fetching featured assets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedAssets();
  }, []);

  return (
    <section id="marketplace" className="py-32 px-6 relative bg-foreground/[0.03] overflow-hidden border-y border-foreground/5">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-none mb-2">
              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Marketplace</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase underline decoration-primary decoration-4 underline-offset-8">
              Premium Assets
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl italic font-medium">
              Elite UI kits, templates, and icons crafted by top designers.
            </p>
          </div>
          <Button 
            className="h-16 px-8 bg-foreground text-background hover:bg-primary transition-all font-black tracking-[0.2em] text-xs rounded-none group"
            onClick={() => navigate('/marketplace')}
          >
            EXPLORE THE MARKET
            <ArrowRight className="w-4 h-4 ml-3 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[3/4] bg-foreground/5 animate-pulse border border-foreground/10" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {assets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col bg-background border border-foreground/10 p-6 hover:border-primary/50 transition-all duration-500"
              >
                <div className="relative aspect-video overflow-hidden mb-6 bg-foreground/5">
                  <img 
                    src={asset.preview_url} 
                    alt={asset.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-background text-[10px] font-black italic border border-foreground/10">
                    ${asset.price}
                  </div>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tight italic group-hover:text-primary transition-colors mb-2">
                  {asset.name}
                </h3>
                
                <div className="flex flex-col flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-2 font-medium mb-6">
                    {asset.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-foreground/5">
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="p-0 h-auto font-black text-[10px] tracking-widest uppercase hover:text-primary hover:bg-transparent group/trigger"
                        >
                          Details
                          <ArrowUpRight className="w-3 h-3 ml-1 transition-transform group-hover/trigger:translate-x-0.5 group-hover/trigger:-translate-y-0.5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl bg-background border-foreground/10 p-0 overflow-hidden rounded-none">
                        <DialogHeader className="sr-only">
                          <DialogTitle>{asset.name}</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <div className="aspect-square md:aspect-auto bg-foreground/5 relative overflow-hidden">
                            <img 
                              src={asset.preview_url} 
                              alt={asset.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 px-4 py-2 bg-background border border-foreground/10 text-xs font-black italic">
                              ${asset.price}
                            </div>
                          </div>
                          <div className="p-8 flex flex-col">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-none mb-4 w-fit">
                              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Elite Asset</span>
                            </div>
                            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4 decoration-primary decoration-4 underline underline-offset-4">
                              {asset.name}
                            </h2>
                            <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 flex-grow">
                              {asset.description} This high-quality asset is designed for professionals who demand excellence. Includes full source files, documentation, and a commercial license for all your projects.
                            </p>
                            
                            <div className="space-y-4 pt-6 border-t border-foreground/5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Price</span>
                                <span className="text-3xl font-black italic text-primary">${asset.price}</span>
                              </div>
                              <Button 
                                className="w-full h-16 bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-black tracking-[0.2em] text-xs rounded-none group/btn"
                                onClick={() => navigate('/marketplace')}
                              >
                                GET ACCESS NOW
                                <Download className="w-4 h-4 ml-3 transition-transform group-hover/btn:translate-y-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default MarketplaceSection;
