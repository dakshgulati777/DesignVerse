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
    setProgress('Uploading your product photo... 📸');

    try {
      // Upload product image to storage
      const fileExt = productImage.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('brand-assets')
        .upload(filePath, productImage);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('brand-assets')
        .getPublicUrl(filePath);

      const productImageUrl = urlData.publicUrl;

      setProgress('AI is crafting your content plan... 🤖');

      // Call edge function with brand profile data
      const { data, error } = await supabase.functions.invoke('generate-brand-content', {
        body: {
          brandName: brandProfile.brandName,
          brandColors: brandProfile.brandColors,
          tagline: brandProfile.tagline,
          tone: brandProfile.tone,
          productImageUrl,
        },
      });

      if (error) throw error;

      let content: GeneratedContent[] = [];

      if (data?.content && Array.isArray(data.content)) {
        content = data.content.map((item: any) => ({
          content_type: item.content_type,
          schedule_day: item.schedule_day,
          caption: item.caption,
          hashtags: item.hashtags || [],
          visual_description: item.visual_description,
          hook: item.hook,
          imageUrl: productImageUrl,
        }));
      }

      if (content.length === 0) {
        // Fallback content customized with brand details
        content = [
          { content_type: 'reel', schedule_day: 'Monday', hook: `${brandProfile.brandName} ka Asli Magic! ✨`, caption: `Yeh hai asli quality! ${brandProfile.tagline || 'Check it out'} 🔥 #${brandProfile.brandName.replace(/\s/g, '')}`, hashtags: [brandProfile.brandName.toLowerCase().replace(/\s/g, ''), 'indianbrand', 'madeinindia', 'shoplocal', 'd2c', 'trending'], visual_description: 'Cinematic product reveal with brand colors' },
          { content_type: 'reel', schedule_day: 'Wednesday', hook: 'Packing Order No. 1000! 🎉', caption: `Aapke pyaar se ho raha hai yeh possible 🥰 ${brandProfile.tagline || ''} #SmallBusiness`, hashtags: ['packingorders', 'smallbusinessindia', 'supportlocal', 'behindthescenes', 'd2cbrand'], visual_description: 'Behind-the-scenes packing montage' },
          { content_type: 'post', schedule_day: 'Tuesday', hook: 'Quality jo dikhe 👀', caption: `Close-up dekho aur batao — Quality kaisi lagi? 💯 ${brandProfile.brandName} sirf best deta hai!`, hashtags: ['qualitycheck', 'productshot', 'premiumquality', 'indiand2c'], visual_description: 'High-quality macro product shot with brand color background' },
          { content_type: 'reel', schedule_day: 'Thursday', hook: 'Customer Review Time! ⭐', caption: `Real customers, real love! ❤️ Dekho kya keh rahe hain ${brandProfile.brandName} ke baare mein`, hashtags: ['customerreview', 'testimonial', 'happycustomer', 'trustworthy'], visual_description: 'Customer testimonial compilation with text overlays' },
          { content_type: 'post', schedule_day: 'Friday', hook: 'Weekend Mood with ' + brandProfile.brandName, caption: `Weekend ho aur ${brandProfile.brandName} na ho? That's not done! 😎 Grab yours now 🛒`, hashtags: ['weekendvibes', 'shopnow', 'treatyourself', 'weekendmood'], visual_description: 'Lifestyle flat-lay with product and props' },
          { content_type: 'story', schedule_day: 'Saturday', hook: 'Quick Poll! 📊', caption: `Konsa color zyada pasand hai? Vote karo! 👆 ${brandProfile.brandName} wants to know YOUR choice`, hashtags: ['poll', 'youropinion', 'brandlove', 'engagement'], visual_description: 'Interactive poll story with two product variants' },
        ];

        toast({
          title: 'Content Plan Generated! ✨',
          description: `Created custom Hinglish content for ${brandProfile.brandName} using smart templates.`,
        });
      } else {
        toast({
          title: 'AI Content Ready! 🎉',
          description: `Generated a full week's content plan for ${brandProfile.brandName}`,
        });
      }

      onGenerated(content);
    } catch (err: any) {
      console.error('Generation error:', err);
      toast({
        title: 'Generation Error',
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
