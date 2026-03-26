import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Search, Filter, Download, Tag, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface MarketplaceAsset {
  id: string;
  name: string;
  description: string;
  price: number;
  preview_url: string;
  download_url: string;
  seller_id: string;
  category?: string;
}

const Marketplace = () => {
  const [assets, setAssets] = useState<MarketplaceAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const { data, error } = await (supabase.from('marketplace_assets') as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      let fetchedAssets = data || [];
      
      // FALLBACK DUMMY DATA
      if (fetchedAssets.length === 0) {
        fetchedAssets = [
          {
            id: 'd1',
            name: 'Elite Framer Template',
            description: 'A high-performance portfolio template for creative directors.',
            price: 59,
            preview_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
            download_url: '#',
            seller_id: 'internal',
            category: 'UI Components'
          },
          {
            id: 'd2',
            name: 'Neo-Brutalist Icons',
            description: '500+ hand-crafted SVG icons for modern interfaces.',
            price: 29,
            preview_url: 'https://images.unsplash.com/photo-1614850523296-e811cf9ee04a?w=800&q=80',
            download_url: '#',
            seller_id: 'internal',
            category: 'Iconography'
          },
          {
            id: 'd3',
            name: 'DesignVerse Pro UI Kit',
            description: 'The ultimate design system for rapid web development.',
            price: 129,
            preview_url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
            download_url: '#',
            seller_id: 'internal',
            category: 'UI Kits'
          },
          {
            id: 'd4',
            name: 'Glass Gradient Pack',
            description: 'Seamless liquid gradients for your next design project.',
            price: 15,
            preview_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80',
            download_url: '#',
            seller_id: 'internal',
            category: 'Assets'
          },
          {
            id: 'd5',
            name: 'Minimalist Blog Template',
            description: 'Clean, typography-focused layout for serious writers.',
            price: 45,
            preview_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
            download_url: '#',
            seller_id: 'internal',
            category: 'Web Templates'
          },
          {
            id: 'd6',
            name: 'Motion Design Presets',
            description: 'Lottie animations for onboarding and landing pages.',
            price: 35,
            preview_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
            download_url: '#',
            seller_id: 'internal',
            category: 'Motion'
          }
        ];
      }
      
      setAssets(fetchedAssets);
    } catch (error: any) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 pt-32">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-none mb-2">
              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Elite Assets</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase underline decoration-primary decoration-8 underline-offset-8">
              Design Marketplace
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl italic font-medium">
              Premium UI kits, icons, and templates crafted by the community.
            </p>
          </div>
          
          <Button 
            className="h-16 px-8 bg-foreground text-background hover:bg-foreground/90 font-black tracking-widest text-sm rounded-none group"
            onClick={() => navigate('/marketplace/sell')}
          >
            <Plus className="w-5 h-5 mr-3 transition-transform group-hover:rotate-90" />
            LIST YOUR ASSET
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search premium assets..." 
              className="pl-12 h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none font-medium text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-14 px-8 border-foreground/10 rounded-none font-black tracking-widest text-xs uppercase">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-[3/4] bg-foreground/5 animate-pulse border border-foreground/10" />
            ))}
          </div>
        ) : filteredAssets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative flex flex-col bg-background border border-foreground/10 p-5 hover:border-primary/50 transition-all duration-500 overflow-hidden"
              >
                {/* Preview Image */}
                <div className="relative aspect-video overflow-hidden mb-6 bg-foreground/5">
                  <img 
                    src={asset.preview_url || 'https://images.unsplash.com/photo-1487058715912-ca02820ee39d'} 
                    alt={asset.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-background text-xs font-black italic border border-foreground/10">
                    ${asset.price}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow space-y-3">
                  <h3 className="text-xl font-black uppercase tracking-tight italic group-hover:text-primary transition-colors truncate">
                    {asset.name}
                  </h3>
                  
                  <div className="flex flex-col flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-2 font-medium leading-relaxed mb-6">
                      {asset.description}
                    </p>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full h-10 border border-foreground/5 hover:bg-foreground/5 font-black text-[10px] tracking-widest uppercase group/trigger"
                        >
                          View Details
                          <ArrowUpRight className="w-3 h-3 ml-2 transition-transform group-hover/trigger:translate-x-0.5 group-hover/trigger:-translate-y-0.5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl bg-background border-foreground/10 p-0 overflow-hidden rounded-none">
                        <DialogHeader className="sr-only">
                          <DialogTitle>{asset.name}</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <div className="aspect-square md:aspect-auto bg-foreground/5 relative overflow-hidden">
                            <img 
                              src={asset.preview_url || 'https://images.unsplash.com/photo-1487058715912-ca02820ee39d'} 
                              alt={asset.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 px-4 py-2 bg-background border border-foreground/10 text-xs font-black italic">
                              ${asset.price}
                            </div>
                          </div>
                          <div className="p-8 flex flex-col">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-none mb-4 w-fit">
                              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">{asset.category || 'Elite Asset'}</span>
                            </div>
                            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4 decoration-primary decoration-4 underline underline-offset-4">
                              {asset.name}
                            </h2>
                            <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 flex-grow">
                              {asset.description} Crafted with precision and attention to detail. This premium asset includes high-resolution source files, comprehensive documentation, and a lifetime commercial license.
                            </p>
                            
                            <div className="space-y-4 pt-6 border-t border-foreground/5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Price</span>
                                <span className="text-3xl font-black italic text-primary">${asset.price}</span>
                              </div>
                              <Button 
                                className="w-full h-16 bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-black tracking-[0.2em] text-xs rounded-none group/btn"
                              >
                                {asset.price === 0 ? 'DOWNLOAD FOR FREE' : 'PURCHASE ACCESS'}
                                <Download className="w-4 h-4 ml-3 transition-transform group-hover/btn:translate-y-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Seller Info Badge */}
                <div className="absolute -bottom-10 group-hover:bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md p-2 border border-foreground/10 flex items-center gap-2 transition-all duration-500 delay-100 shadow-2xl">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-black">
                    V
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase truncate opacity-70">Verified Creator</span>
                  <ArrowUpRight className="w-3 h-3 ml-auto text-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-6 border border-dashed border-foreground/10">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/30" />
            <div className="space-y-2">
              <h3 className="text-2xl font-black italic uppercase">No Assets Found</h3>
              <p className="text-muted-foreground italic">Be the first to list a premium design asset!</p>
            </div>
            <Button 
              variant="outline"
              className="h-12 border-foreground/10 hover:bg-foreground hover:text-background rounded-none font-black tracking-widest text-[10px]"
            >
              BROWSE ALL ASSETS
            </Button>
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

export default Marketplace;
