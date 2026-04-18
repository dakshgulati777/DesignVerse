import { useEffect, useMemo, useRef, useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { Upload, DollarSign, ArrowLeft, X, Link2, Tags, ShieldCheck } from 'lucide-react';

const categories = ['UI Kits', 'Iconography', 'UI Components', 'Web Templates', 'Motion', 'Assets', 'Other'];

const MarketplaceSell = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id: editId } = useParams();
  const isEditMode = !!editId;
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
    category: 'UI Kits',
  });

  useEffect(() => {
    if (!editId || !user) return;
    (async () => {
      const { data, error } = await supabase.from('marketplace_assets').select('*').eq('id', editId).maybeSingle();
      if (error || !data) {
        toast({ title: 'Could not load listing', variant: 'destructive' });
        navigate('/marketplace');
        return;
      }
      if (data.seller_id !== user.id) {
        toast({ title: 'Not authorized', description: 'You can only edit your own listings.', variant: 'destructive' });
        navigate('/marketplace');
        return;
      }
      setFormData({
        name: data.name,
        description: data.description,
        price: String(data.price),
        previewUrl: data.preview_url || '',
        downloadUrl: data.download_url || '',
        category: data.category || 'UI Kits',
      });
      if (data.preview_url) setPreviewImage(data.preview_url);
    })();
  }, [editId, user]);

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim().length >= 4 &&
      formData.description.trim().length >= 30 &&
      formData.downloadUrl.trim().startsWith('http') &&
      formData.price !== '' &&
      !Number.isNaN(Number(formData.price))
    );
  }, [formData]);

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
      const { error: uploadError } = await supabase.storage.from('marketplace-images').upload(path, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('marketplace-images').getPublicUrl(path);

      setFormData((prev) => ({ ...prev, previewUrl: publicUrl }));
      setPreviewImage(publicUrl);
      toast({ title: 'Preview image uploaded' });
    } catch (error) {
      toast({ title: 'Upload failed', description: error instanceof Error ? error.message : 'Unable to upload preview image.', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const removePreviewImage = () => {
    setFormData((prev) => ({ ...prev, previewUrl: '' }));
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: 'Please sign in to list assets', variant: 'destructive' });
      return;
    }
    if (!isFormValid) {
      toast({ title: 'Complete the required fields', description: 'Add a stronger description, valid link, and price.', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('marketplace_assets').insert([
        {
          name: formData.name.trim(),
          description: formData.description.trim(),
          price: Number(formData.price),
          preview_url: formData.previewUrl || null,
          download_url: formData.downloadUrl.trim(),
          category: formData.category,
          seller_id: user.id,
        },
      ]);

      if (error) throw error;

      toast({
        title: 'Asset listed',
        description: 'Your design is now live in the marketplace.',
      });
      navigate('/marketplace');
    } catch (error) {
      toast({
        title: 'Error listing asset',
        description: error instanceof Error ? error.message : 'Unable to list asset.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider>
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/marketplace')}
          className="flex items-center gap-2 text-sm font-black tracking-widest text-muted-foreground hover:text-foreground mb-8 sm:mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          BACK TO MARKET
        </motion.button>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 sm:space-y-10">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase underline decoration-primary decoration-4 underline-offset-8">
                Sell Your Design
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg font-medium max-w-2xl">
                Publish templates, UI kits, icon packs, motion assets, or other downloadable design products with a clear preview and instant destination link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Asset Name</label>
                  <Input
                    required
                    placeholder="Neo-Glass UI Kit"
                    className="h-12 sm:h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none font-bold"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Price (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      required
                      type="number"
                      min="0"
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
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all border ${
                        formData.category === cat ? 'bg-foreground text-background border-foreground' : 'bg-transparent text-muted-foreground border-foreground/10 hover:border-foreground/30'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Description</label>
                <Textarea
                  required
                  placeholder="Describe what is included, file format, license, compatibility, and the kind of designer this asset helps."
                  className="min-h-[140px] bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none p-4 sm:p-6 font-medium leading-relaxed"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">{formData.description.trim().length} characters</p>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Preview Image</label>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

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
                        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">Max 5MB • JPG, PNG, WebP</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Download Link</label>
                <div className="relative">
                  <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    required
                    placeholder="https://gumroad.com/l/your-pack"
                    className="pl-12 h-12 sm:h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none font-medium"
                    value={formData.downloadUrl}
                    onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
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

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="border border-foreground/10 bg-gradient-to-br from-foreground/[0.04] via-transparent to-primary/10 p-5 sm:p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 mb-4">
                <Tags className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Listing Preview</span>
              </div>

              <div className="border border-foreground/10 bg-background/80 p-4 space-y-4">
                <div className="aspect-video overflow-hidden bg-foreground/5">
                  {previewImage ? (
                    <img src={previewImage} alt="Listing preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">Your cover image will appear here</div>
                  )}
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-black uppercase tracking-tight">{formData.name || 'Your asset title'}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{formData.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Price</p>
                    <p className="text-2xl font-black">${formData.price || '0'}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {formData.description || 'Use the description to explain what is included, why it is useful, and what buyers receive.'}
                </p>
              </div>
            </div>

            <div className="border border-foreground/10 bg-background/70 p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <ShieldCheck className="w-4 h-4 text-primary" />
                What makes a strong listing
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Use a preview that clearly shows the style and file quality.</p>
                <p>Mention file types, usage rights, and whether it is for Figma, Framer, Webflow, or general download.</p>
                <p>Use a direct, trusted checkout or download destination link.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default MarketplaceSell;
