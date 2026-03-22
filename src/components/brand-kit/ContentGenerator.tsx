import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, ArrowLeft, Loader2, ImageIcon, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { BrandProfile, GeneratedContent } from '@/pages/BrandKit';

interface ContentGeneratorProps {
  brandProfile: BrandProfile;
  onGenerated: (content: GeneratedContent[]) => void;
  onBack: () => void;
}

const ContentGenerator = ({ brandProfile, onGenerated, onBack }: ContentGeneratorProps) => {
  const { user } = useAuth();
  const [productImage, setProductImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState('');

  const handleImageDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setProductImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleGenerate = async () => {
    if (!productImage || !user) return;

    setIsGenerating(true);
    setProgress('Uploading product photo...');

    try {
      // Upload image to storage
      const fileExt = productImage.name.split('.').pop();
      const filePath = `${user.id}/products/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('brand-assets')
        .upload(filePath, productImage);

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      const { data: urlData } = supabase.storage
        .from('brand-assets')
        .getPublicUrl(filePath);

      setProgress('AI is crafting your content plan... ✨');

      // Call edge function
      const { data, error } = await supabase.functions.invoke('generate-brand-content', {
        body: {
          brandName: brandProfile.brandName,
          brandColors: brandProfile.brandColors,
          tagline: brandProfile.tagline,
          tone: brandProfile.tone,
          productImageUrl: urlData.publicUrl,
        },
      });

      if (error) throw error;

      if (data?.error) {
        throw new Error(data.error);
      }

      const content = data.content as GeneratedContent[];
      if (!content || content.length === 0) {
        throw new Error('No content generated');
      }

      toast({
        title: 'Content Generated! 🎉',
        description: `${content.length} pieces of content ready for your week.`,
      });

      onGenerated(content);
    } catch (err: any) {
      console.error('Generation error:', err);
      toast({
        title: 'Generation Failed',
        description: err.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
      setProgress('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm tracking-wider">BACK TO BRAND SETUP</span>
      </button>

      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Upload Product Photo</h2>
        <p className="text-muted-foreground">
          Drop your best product shot. AI will create a week's Instagram content for <span className="text-foreground font-semibold">{brandProfile.brandName}</span>.
        </p>
      </div>

      {/* Brand Summary */}
      <div className="flex items-center gap-4 p-4 border border-foreground/10">
        <div className="flex -space-x-1">
          {brandProfile.brandColors.slice(0, 4).map((c, i) => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-background" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div>
          <div className="font-semibold text-sm">{brandProfile.brandName}</div>
          <div className="text-xs text-muted-foreground">{brandProfile.tagline || brandProfile.tone}</div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleImageDrop}
        className="relative border-2 border-dashed border-foreground/20 hover:border-foreground/40 transition-colors cursor-pointer min-h-[300px] flex items-center justify-center"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        
        {previewUrl ? (
          <div className="relative w-full p-4">
            <img src={previewUrl} alt="Product" className="max-h-[400px] mx-auto object-contain" />
            <div className="absolute top-2 right-2 px-3 py-1 bg-foreground text-background text-xs font-semibold">
              ✓ Photo Ready
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4 p-8">
            <div className="w-16 h-16 mx-auto border border-foreground/20 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold">Drop your product photo here</p>
              <p className="text-sm text-muted-foreground mt-1">or click to browse · JPG, PNG up to 10MB</p>
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <motion.button
        onClick={handleGenerate}
        disabled={!productImage || isGenerating}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full py-4 bg-foreground text-background font-bold tracking-widest text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{progress}</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>GENERATE WEEK'S CONTENT</span>
          </>
        )}
      </motion.button>

      {isGenerating && (
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-foreground/40 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
          <p>This usually takes 15-30 seconds</p>
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;
