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
import { Image as ImageIcon, Send, ArrowLeft } from 'lucide-react';

const BlogCreate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    coverImage: '',
    content: ''
  });

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
      
      <div className="max-w-4xl mx-auto px-6 pt-32">
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
          className="space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase underline decoration-primary decoration-4 underline-offset-8">
              Write a Story
            </h1>
            <p className="text-muted-foreground text-lg italic">
              Share your insights, design tips, and creative journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                Story Title
              </label>
              <Input
                required
                placeholder="The Future of Minimalist Design..."
                className="text-xl h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                Cover Image URL
              </label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="https://images.unsplash.com/..."
                    className="pl-12 h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  />
                </div>
              </div>
              {formData.coverImage && (
                <div className="mt-4 aspect-video w-full overflow-hidden border border-foreground/10 bg-foreground/5">
                  <img 
                    src={formData.coverImage} 
                    alt="Cover Preview" 
                    className="w-full h-full object-cover opacity-80"
                    onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1487058715912-ca02820ee39d')}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                Content (Markdown supported)
              </label>
              <Textarea
                required
                placeholder="Start writing your story here..."
                className="min-h-[400px] bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none text-lg leading-relaxed p-6"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-16 px-12 bg-foreground text-background hover:bg-foreground/90 font-black tracking-widest text-sm rounded-none group"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-background/30 border-t-background animate-spin" />
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
