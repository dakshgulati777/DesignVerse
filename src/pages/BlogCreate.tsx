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
import { Image as ImageIcon, Send, ArrowLeft, Upload, X } from 'lucide-react';

const BlogCreate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    coverImage: '',
    content: ''
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
        .from('blog-images')
        .upload(path, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(path);

      setFormData(prev => ({ ...prev, coverImage: publicUrl }));
      setCoverPreview(publicUrl);
      toast({ title: 'Image uploaded!' });
    } catch (error: any) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const removeCoverImage = () => {
    setFormData(prev => ({ ...prev, coverImage: '' }));
    setCoverPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('blogs').insert([
        {
          title: formData.title,
          cover_image: formData.coverImage,
          content: formData.content,
          author_id: user.id,
          category: 'Community'
        }
      ]);

      if (error) throw error;

      toast({
        title: "Blog Published! 🚀",
        description: "Your story has been shared with the community.",
      });
      navigate('/blog');
    } catch (error: any) {
      toast({
        title: "Error publishing blog",
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
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          BACK
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 sm:space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase underline decoration-primary decoration-4 underline-offset-8">
              Write a Story
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Share your insights, design tips, and creative journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                Story Title
              </label>
              <Input
                required
                placeholder="The Future of Minimalist Design..."
                className="text-lg sm:text-xl h-12 sm:h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                Cover Image
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {coverPreview ? (
                <div className="relative aspect-video w-full overflow-hidden border border-foreground/10 bg-foreground/5">
                  <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removeCoverImage}
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
                      <span className="text-sm text-muted-foreground font-medium">Click to upload cover image</span>
                      <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">Max 5MB · JPG, PNG, WebP</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                Content (Markdown supported)
              </label>
              <Textarea
                required
                placeholder="Start writing your story here..."
                className="min-h-[300px] sm:min-h-[400px] bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none text-base sm:text-lg leading-relaxed p-4 sm:p-6"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-14 sm:h-16 px-8 sm:px-12 bg-foreground text-background hover:bg-foreground/90 font-black tracking-widest text-sm rounded-none group"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-background/30 border-t-background animate-spin rounded-full" />
                    PUBLISHING...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    PUBLISH STORY
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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

export default BlogCreate;
