import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { Upload, DollarSign, ArrowLeft, X } from 'lucide-react';

const MarketplaceSell = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    previewUrl: '',
    downloadUrl: '',
    category: 'UI Kits'
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Please select an image file', variant: 'destructive' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'Image must be under 5MB', variant: 'destructive' });
      return;
    }

    setIsUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('marketplace-images')
        .upload(path, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('marketplace-images')
        .getPublicUrl(path);

      setFormData(prev => ({ ...prev, previewUrl: publicUrl }));
      setPreviewImage(publicUrl);
      toast({ title: 'Image uploaded!' });
    } catch (error: any) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const removePreviewImage = () => {
    setFormData(prev => ({ ...prev, previewUrl: '' }));
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
          seller_id: user.id,
          category: formData.category
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/marketplace')}
          className="flex items-center gap-2 text-sm font-black tracking-widest text-muted-foreground hover:text-foreground mb-8 sm:mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          BACK TO MARKET
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 sm:space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase underline decoration-primary decoration-4 underline-offset-8">
              Sell Your Design
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg font-medium">
              Turn your pixels into profit. List your premium assets for the community.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                  Asset Name
                </label>
                <Input
                  required
                  placeholder="Neo-Glass UI Kit"
                  className="h-12 sm:h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none font-bold"
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
                    className="pl-12 h-12 sm:h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none font-bold"
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
                className="min-h-[120px] sm:min-h-[150px] bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none p-4 sm:p-6 font-medium leading-relaxed"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {['UI Kits', 'UI Components', 'Iconography', 'Web Templates', 'Assets', 'Motion', 'Illustrations', 'Fonts'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={`px-4 py-2 text-xs font-black uppercase tracking-widest border transition-colors ${
                      formData.category === cat
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-foreground/10 text-muted-foreground hover:border-foreground/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                Preview Image
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {previewImage ? (
                <div className="relative aspect-video w-full overflow-hidden border border-foreground/10 bg-foreground/5">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removePreviewImage}
                    className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full aspect-video border-2 border-dashed border-foreground/10 hover:border-primary/40 bg-foreground/5 flex flex-col items-center justify-center gap-3 transition-colors"
                >
                  {isUploading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground animate-spin rounded-full" />
                      <span className="text-sm text-muted-foreground font-medium">Uploading...</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground/50" />
                      <span className="text-sm text-muted-foreground font-medium">Click to upload preview image</span>
                      <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">Max 5MB · JPG, PNG, WebP</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                Download Link (Drive/Dropbox/Gumroad)
              </label>
              <Input
                required
                placeholder="https://dropbox.com/s/..."
                className="h-12 sm:h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none font-medium"
                value={formData.downloadUrl}
                onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
              />
            </div>

            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-14 sm:h-16 px-10 sm:px-16 bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-black tracking-widest text-sm rounded-none group shadow-2xl transition-all"
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
