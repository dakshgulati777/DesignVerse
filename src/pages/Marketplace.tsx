import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Plus,
  Search,
  Download,
  ArrowUpRight,
  Sparkles,
  Layers3,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { supabase } from '@/integrations/supabase/client';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { toast } from '@/hooks/use-toast';

interface MarketplaceAsset {
  id: string;
  name: string;
  description: string;
  price: number;
  preview_url: string | null;
  download_url: string | null;
  seller_id: string;
  category: string | null;
  created_at?: string;
}

const FALLBACK_ASSETS: MarketplaceAsset[] = [
  {
    id: 'd1',
    name: 'Elite Framer Template',
    description: 'A high-performance portfolio template for creative directors, freelancers, and design studios.',
    price: 59,
    preview_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    download_url: '#',
    seller_id: 'internal',
    category: 'UI Components',
  },
  {
    id: 'd2',
    name: 'Neo-Brutalist Icons',
    description: '500+ SVG icons with strong shapes, heavy contrast, and fast export-ready organization.',
    price: 29,
    preview_url: 'https://images.unsplash.com/photo-1614850523296-e811cf9ee04a?w=1200&q=80',
    download_url: '#',
    seller_id: 'internal',
    category: 'Iconography',
  },
  {
    id: 'd3',
    name: 'DesignVerse Pro UI Kit',
    description: 'Complete layout sections, cards, forms, dashboards, and landing page modules for modern web design.',
    price: 129,
    preview_url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80',
    download_url: '#',
    seller_id: 'internal',
    category: 'UI Kits',
  },
  {
    id: 'd4',
    name: 'Glass Gradient Pack',
    description: 'Liquid gradients, glass textures, and polished atmospheres for hero sections and campaign art.',
    price: 15,
    preview_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&q=80',
    download_url: '#',
    seller_id: 'internal',
    category: 'Assets',
  },
];

const Marketplace = () => {
  const STORAGE_KEY = 'designverse-marketplace-state';
  const [assets, setAssets] = useState<MarketplaceAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [purchasedAssets, setPurchasedAssets] = useState<string[]>([]);
  const navigate = useNavigate();
  const hasRestoredScroll = useRef(false);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('marketplace_assets').select('*').order('created_at', { ascending: false });
      if (error) throw error;

      const fetchedAssets = ((data as MarketplaceAsset[]) || []);
      setAssets(fetchedAssets.length > 0 ? fetchedAssets : FALLBACK_ASSETS);
    } catch (error) {
      console.error('Error fetching assets:', error);
      setAssets(FALLBACK_ASSETS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedState = sessionStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState) as { searchQuery?: string; selectedCategory?: string };
        if (parsed.searchQuery) setSearchQuery(parsed.searchQuery);
        if (parsed.selectedCategory) setSelectedCategory(parsed.selectedCategory);
      } catch (error) {
        console.error('Failed to restore marketplace state:', error);
      }
    }

    fetchAssets();
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
      console.error('Failed to restore marketplace scroll:', error);
    }
  }, [loading]);

  useEffect(() => {
    const refreshPageData = () => fetchAssets();
    window.addEventListener('focus', refreshPageData);
    window.addEventListener('pageshow', refreshPageData);
    return () => {
      window.removeEventListener('focus', refreshPageData);
      window.removeEventListener('pageshow', refreshPageData);
    };
  }, []);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(assets.map((asset) => asset.category).filter(Boolean) as string[]))],
    [assets]
  );

  const filteredAssets = useMemo(() => assets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }), [assets, searchQuery, selectedCategory]);

  const featuredAsset = filteredAssets[0];

  const handlePurchase = (asset: MarketplaceAsset) => {
    if (purchasedAssets.includes(asset.id)) {
      if (asset.download_url && asset.download_url !== '#') {
        window.open(asset.download_url, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    setPurchasedAssets((prev) => [...prev, asset.id]);
    toast({
      title: asset.price === 0 ? 'Asset unlocked' : 'Purchase ready',
      description: asset.download_url && asset.download_url !== '#'
        ? `Access granted for ${asset.name}. The download link is now unlocked.`
        : `${asset.name} has been added to your unlocked assets.`,
    });
  };

  const isPurchased = (assetId: string) => purchasedAssets.includes(assetId);

  return (
    <ThemeProvider>
      <div className="marketplace-page min-h-screen bg-background text-foreground pb-20 font-inter">
        <Navigation />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 z-10">
          <section className="relative overflow-hidden border border-foreground/10 bg-gradient-to-br from-foreground/[0.04] via-transparent to-primary/10 px-5 py-8 sm:px-8 sm:py-10 mb-10 sm:mb-14">
            <div className="absolute inset-y-0 right-0 hidden lg:block w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_60%)]" />
            <div className="relative grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-none">
                  <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Marketplace</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-[-0.06em] uppercase leading-none">
                  Upload, sell, and discover standout design assets.
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed font-medium">
                  Browse premium UI kits, icon packs, templates, and creative downloads from the DesignVerse community, now with stronger mobile browsing and clearer asset details.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="h-12 px-6 bg-foreground text-background hover:bg-foreground/90 font-black tracking-[0.18em] text-xs rounded-none group"
                    onClick={() => navigate('/marketplace/sell')}
                  >
                    <Plus className="w-4 h-4 mr-3 transition-transform group-hover:rotate-90" />
                    LIST YOUR ASSET
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 px-6 border-foreground/10 rounded-none font-black tracking-[0.18em] text-xs"
                    onClick={() => window.scrollTo({ top: document.body.scrollHeight / 3, behavior: 'smooth' })}
                  >
                    EXPLORE LISTINGS
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3">
                <div className="border border-foreground/10 bg-background/70 px-4 py-4">
                  <div className="flex items-center gap-3 mb-3 text-primary">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-[0.24em]">Curated</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">Focused on useful assets designers can actually ship with.</p>
                </div>
                <div className="border border-foreground/10 bg-background/70 px-4 py-4">
                  <div className="flex items-center gap-3 mb-3 text-primary">
                    <Layers3 className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-[0.24em]">Collections</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{Math.max(categories.length - 1, 0)} live categories to browse.</p>
                </div>
                <div className="border border-foreground/10 bg-background/70 px-4 py-4">
                  <div className="flex items-center gap-3 mb-3 text-primary">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-[0.24em]">Clear Access</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">Listings open with a visible preview, price, and destination link.</p>
                </div>
              </div>
            </div>
          </section>

          {featuredAsset && !loading && (
            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch border border-foreground/10 bg-background/70 mb-10 sm:mb-12 overflow-hidden">
              <div className="aspect-[4/3] lg:aspect-auto min-h-[240px] bg-foreground/5">
                <img src={featuredAsset.preview_url || FALLBACK_ASSETS[0].preview_url!} alt={featuredAsset.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 sm:p-8 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 w-fit">
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Featured Asset</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black tracking-[-0.05em] uppercase">{featuredAsset.name}</h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{featuredAsset.description}</p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="text-3xl font-black">${featuredAsset.price}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{featuredAsset.category || 'General'}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Button className="h-12 rounded-none font-black tracking-[0.18em] text-xs" onClick={() => handlePurchase(featuredAsset)}>
                    {isPurchased(featuredAsset.id) ? 'OPEN DOWNLOAD' : 'UNLOCK ASSET'}
                  </Button>
                  {featuredAsset.download_url && featuredAsset.download_url !== '#' && (
                    <Button
                      variant="outline"
                      className="h-12 rounded-none font-black tracking-[0.18em] text-xs border-foreground/10"
                      onClick={() => window.open(featuredAsset.download_url!, '_blank', 'noopener,noreferrer')}
                    >
                      VISIT LINK
                    </Button>
                  )}
                </div>
              </div>
            </section>
          )}

          <section className="border border-foreground/10 bg-background/70 px-4 py-4 sm:px-6 sm:py-5 mb-10 sm:mb-12">
            <div className="flex flex-wrap gap-2 mb-5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all ${
                    selectedCategory === category
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-transparent text-muted-foreground border-foreground/10 hover:border-foreground/30'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search assets, templates, UI kits..."
                  className="pl-12 h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none font-medium text-base sm:text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-[4/3] bg-foreground/5 animate-pulse border border-foreground/10" />
                ))}
              </div>
            ) : filteredAssets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAssets.map((asset, index) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="group relative flex flex-col bg-background border border-foreground/10 hover:border-primary/50 transition-all duration-500 overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5">
                      <img
                        src={asset.preview_url || FALLBACK_ASSETS[0].preview_url!}
                        alt={asset.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 bg-background text-xs font-black border border-foreground/10">
                        ${asset.price}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{asset.category || 'General'}</p>
                          <h3 className="text-xl font-black uppercase tracking-[-0.04em] group-hover:text-primary transition-colors">
                            {asset.name}
                          </h3>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-3 font-medium leading-relaxed">{asset.description}</p>

                      <div className="mt-auto flex flex-col sm:flex-row gap-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" className="flex-1 h-11 border border-foreground/10 hover:bg-foreground/5 rounded-none font-black text-[10px] tracking-widest uppercase">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="marketplace-dialog-content max-w-4xl bg-background border-foreground/10 p-0 overflow-hidden rounded-none font-inter border-2">
                            <DialogHeader className="sr-only">
                              <DialogTitle>{asset.name}</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                              <div className="aspect-square lg:aspect-auto bg-foreground/5 relative overflow-hidden">
                                <img src={asset.preview_url || FALLBACK_ASSETS[0].preview_url!} alt={asset.name} className="w-full h-full object-cover" />
                                <div className="absolute top-4 left-4 px-4 py-2 bg-background border border-foreground/10 text-xs font-black">
                                  ${asset.price}
                                </div>
                              </div>
                              <div className="p-6 sm:p-8 flex flex-col">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-none mb-4 w-fit">
                                  <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">{asset.category || 'Design Asset'}</span>
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-[-0.05em] mb-4 decoration-primary decoration-4 underline underline-offset-4">
                                  {asset.name}
                                </h2>
                                <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-6">{asset.description}</p>

                                <div className="grid grid-cols-2 gap-3 mb-8">
                                  <div className="border border-foreground/10 p-3">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Category</p>
                                    <p className="mt-2 text-sm font-semibold">{asset.category || 'General'}</p>
                                  </div>
                                  <div className="border border-foreground/10 p-3">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Published</p>
                                    <p className="mt-2 text-sm font-semibold">{asset.created_at ? new Date(asset.created_at).toLocaleDateString() : 'Recently'}</p>
                                  </div>
                                </div>

                                <div className="space-y-3 pt-6 border-t border-foreground/10">
                                  <Button
                                    onClick={() => handlePurchase(asset)}
                                    className="w-full h-14 bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-black tracking-[0.2em] text-xs rounded-none"
                                  >
                                    {isPurchased(asset.id) ? 'OPEN DOWNLOAD' : asset.price === 0 ? 'DOWNLOAD FOR FREE' : 'UNLOCK ASSET'}
                                    <Download className="w-4 h-4 ml-3" />
                                  </Button>
                                  {asset.download_url && asset.download_url !== '#' && (
                                    <Button
                                      variant="outline"
                                      className="w-full h-12 rounded-none border-foreground/10 font-black tracking-[0.18em] text-xs"
                                      onClick={() => window.open(asset.download_url!, '_blank', 'noopener,noreferrer')}
                                    >
                                      VISIT PRODUCT LINK
                                      <ExternalLink className="w-4 h-4 ml-2" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="outline"
                          className="h-11 rounded-none border-foreground/10 font-black text-[10px] tracking-widest uppercase"
                          onClick={() => handlePurchase(asset)}
                        >
                          {isPurchased(asset.id) ? 'Open' : 'Unlock'}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-6 border border-dashed border-foreground/10">
                <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/30" />
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">No Assets Found</h3>
                  <p className="text-muted-foreground">Try another search or be the first to list a premium design asset.</p>
                </div>
                <Button className="h-12 rounded-none font-black tracking-widest text-[10px]" onClick={() => navigate('/marketplace/sell')}>
                  LIST YOUR DESIGN
                </Button>
              </div>
            )}
          </section>
        </div>

        <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-80 h-80 border-8 border-foreground rotate-12" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 border-8 border-foreground -rotate-12" />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Marketplace;
