import { useDeferredValue, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { Send, ArrowLeft, Upload, X, BookOpen, Clock } from 'lucide-react';
import SimpleMarkdown from '@/components/SimpleMarkdown';

const categories = ['Psychology', 'Layout', 'AI & Design', 'Typography', 'Systems', 'Motion', 'Sustainability', 'UX Research', 'Community'];

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
    content: '',
    category: 'Community',
  });

  const deferredContent = useDeferredValue(formData.content);
  const wordCount = useMemo(() => formData.content.trim().split(/\s+/).filter(Boolean).length, [formData.content]);
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 180));

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
      const { error: uploadError } = await supabase.storage.from('blog-images').upload(path, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(path);
      setFormData((prev) => ({ ...prev, coverImage: publicUrl }));
      setCoverPreview(publicUrl);
      toast({ title: 'Cover image uploaded' });
    } catch (error) {
      toast({ title: 'Upload failed', description: error instanceof Error ? error.message : 'Unable to upload image.', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const removeCoverImage = () => {
    setFormData((prev) => ({ ...prev, coverImage: '' }));
    setCoverPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: 'Please sign in to publish', variant: 'destructive' });
      return;
    }

    if (wordCount < 80) {
      toast({ title: 'Story is too short', description: 'Add a little more detail before publishing.', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('blogs').insert([
        {
          title: formData.title.trim(),
          cover_image: formData.coverImage || null,
          content: formData.content.trim(),
          author_id: user.id,
          category: formData.category,
        },
      ]);

      if (error) throw error;

      toast({
        title: 'Blog published',
        description: 'Your story is now live in the community feed.',
      });
      navigate('/blog');
    } catch (error) {
      toast({
        title: 'Error publishing blog',
        description: error instanceof Error ? error.message : 'Unable to publish blog.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          BACK
        </motion.button>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 sm:space-y-10">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase underline decoration-primary decoration-4 underline-offset-8">
                Write a Story
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg">
                Publish tutorials, breakdowns, case studies, and design thinking from the DesignVerse community.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Story Title</label>
                <Input
                  required
                  placeholder="The Future of Minimalist Design..."
                  className="text-lg sm:text-xl h-12 sm:h-14 bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none font-bold"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
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

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Cover Image</label>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

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
                        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">Max 5MB • JPG, PNG, WebP</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <Tabs defaultValue="write" className="space-y-4">
                <TabsList className="w-full justify-start rounded-none bg-foreground/5 p-1">
                  <TabsTrigger value="write" className="rounded-none data-[state=active]:shadow-none">Write</TabsTrigger>
                  <TabsTrigger value="preview" className="rounded-none data-[state=active]:shadow-none">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="write">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Content (Markdown supported)</label>
                    <Textarea
                      required
                      placeholder="Start writing your story here..."
                      className="min-h-[320px] sm:min-h-[420px] bg-foreground/5 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-none text-base sm:text-lg leading-relaxed p-4 sm:p-6"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="preview">
                  <div className="min-h-[320px] sm:min-h-[420px] border border-foreground/10 bg-foreground/[0.03] p-5 sm:p-6">
                    <SimpleMarkdown content={deferredContent} className="max-w-none" />
                  </div>
                </TabsContent>
              </Tabs>

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

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="border border-foreground/10 bg-gradient-to-br from-foreground/[0.04] via-transparent to-primary/10 p-5 sm:p-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">Story Snapshot</span>
              </div>

              <div className="border border-foreground/10 bg-background/80 p-4 space-y-4">
                <div className="aspect-video bg-foreground/5 overflow-hidden">
                  {coverPreview ? (
                    <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">Your cover image preview appears here</div>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{formData.category}</p>
                  <h2 className="text-2xl font-black tracking-tight uppercase">{formData.title || 'Your blog title'}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-5">
                    {formData.content || 'Start writing to see your intro preview and reading rhythm here.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-foreground/10 bg-background/70 p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Clock className="w-4 h-4 text-primary" />
                Draft stats
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-foreground/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Words</p>
                  <p className="mt-2 text-2xl font-black">{wordCount}</p>
                </div>
                <div className="border border-foreground/10 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Read Time</p>
                  <p className="mt-2 text-2xl font-black">{estimatedReadTime} min</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Use headings, lists, and short sections so mobile readers can scan quickly.</p>
                <p>Cover images perform best when they are high contrast and easy to crop responsively.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogCreate;
