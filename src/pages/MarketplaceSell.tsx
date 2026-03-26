import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { ShoppingBag, Upload, DollarSign, ArrowLeft } from 'lucide-react';

const MarketplaceSell = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    previewUrl: '',
    downloadUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Please sign in to list assets", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('marketplace_assets').insert([
        {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          preview_url: formData.previewUrl,
          download_url: formData.downloadUrl,
          seller_id: user.id
        }
      ]);

      if (error) throw error;

      toast({
        title: "Asset Listed! 💎",
        description: "Your design asset is now live in the marketplace.",
      });
      navigate('/marketplace');
    } catch (error: any) {
      toast({
        title: "Error listing asset",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 pt-32">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/marketplace')}
          className="flex items-center gap-2 text-sm font-black tracking-widest text-muted-foreground hover:text-foreground mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          BACK TO MARKET
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase underline decoration-primary decoration-4 underline-offset-8">
              Sell Your Design
            </h1>
            <p className="text-muted-foreground text-lg italic font-medium">
              Turn your pixels into profit. List your premium assets for the community.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                  Asset Name
                </label>
                <Input
                  required
                  placeholder="Neo-Glass UI Kit"
                  className="h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none font-bold"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                  Price (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    required
                    type="number"
                    step="0.01"
                    placeholder="29.00"
                    className="pl-12 h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none font-bold"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                Description
              </label>
              <Textarea
                required
                placeholder="Describe your asset's features, contents, and compatibility..."
                className="min-h-[150px] bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none p-6 font-medium leading-relaxed"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                Preview Image URL
              </label>
              <Input
                required
                placeholder="https://images.unsplash.com/..."
                className="h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none font-medium"
                value={formData.previewUrl}
                onChange={(e) => setFormData({ ...formData, previewUrl: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                Download Link (Drive/Dropbox/Gumroad)
              </label>
              <Input
                required
                placeholder="https://dropbox.com/s/..."
                className="h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none font-medium"
                value={formData.downloadUrl}
                onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
              />
            </div>

            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-16 px-16 bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-black tracking-widest text-sm rounded-none group shadow-2xl transition-all"
              >
                {isSubmitting ? 'LISTING ASSET...' : (
                  <div className="flex items-center gap-3">
                    LIST ASSET NOW
                    <Upload className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketplaceSell;
