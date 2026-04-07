import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ImageIcon, Loader2, Sparkles } from 'lucide-react';
import { InferenceClient } from '@huggingface/inference';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { BrandProfile, GeneratedContent } from '@/pages/BrandKit';

interface ContentGeneratorProps {
  brandProfile: BrandProfile;
  onGenerated: (content: GeneratedContent[]) => void;
  onBack: () => void;
}

const VISUAL_VARIANTS = [
  'Use a dramatic hero composition with bold lighting and a premium studio backdrop.',
  'Use a clean editorial layout with floating product elements and refined typography spacing.',
  'Use a macro-detail composition that emphasizes texture, finish, and craftsmanship.',
  'Use a lifestyle desk scene with supporting props and a realistic ambient environment.',
  'Use a campaign-poster direction with layered shapes, sharp shadows, and strong hierarchy.',
  'Use a social-first concept with interactive stickers, split layouts, and playful framing.',
];

const getAssetPrompt = (item: GeneratedContent, brandProfile: BrandProfile, index: number) => {
  const variant = VISUAL_VARIANTS[index % VISUAL_VARIANTS.length];

  return [
    `Create a polished marketing visual for ${brandProfile.brandName}.`,
    `Product: ${brandProfile.productName}.`,
    `Category: ${brandProfile.productCategory}.`,
    `Content type: ${item.content_type}.`,
    `Hook: ${item.hook}.`,
    `Visual direction: ${item.visual_description}.`,
    `Brand tone: ${brandProfile.tone}.`,
    `Brand colors: ${brandProfile.brandColors.join(', ')}.`,
    variant,
    'Make this output clearly different from other campaign assets for the same product.',
    'Keep the same product identity but change composition, crop, lighting, and styling.',
    item.content_type === 'reel'
      ? 'Compose it as a vertical reel cover poster with strong center focus and motion-friendly layout.'
      : item.content_type === 'story'
        ? 'Compose it as an interactive story card with clean breathing room for stickers and poll UI.'
        : 'Compose it as a polished square campaign image for an Instagram post.',
  ].join(' ');
};

const generateImageWithHuggingFace = async (item: GeneratedContent, brandProfile: BrandProfile, index: number) => {
  const token = import.meta.env.VITE_HF_API_KEY;
  if (!token) return null;

  const client = new InferenceClient(token);
  return client.textToImage(
    {
      provider: 'hf-inference',
      model: 'black-forest-labs/FLUX.1-schnell',
      inputs: getAssetPrompt(item, brandProfile, index),
      parameters: {
        guidance_scale: 5,
        width: item.content_type === 'reel' ? 832 : 1024,
        height: item.content_type === 'reel' ? 1216 : 1024,
      },
    },
    { outputType: 'dataUrl' }
  );
};

const generateImageWithGemini = async (item: GeneratedContent, brandProfile: BrandProfile, index: number) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return null;

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gemini-2.5-flash-image',
      prompt: getAssetPrompt(item, brandProfile, index),
      response_format: 'b64_json',
      n: 1,
      size: item.content_type === 'reel' ? '1024x1536' : '1024x1024',
    }),
  });

  if (!response.ok) {
    throw new Error(`Image generation failed with status ${response.status}`);
  }

  const data = await response.json();
  const base64 = data?.data?.[0]?.b64_json;
  return base64 ? `data:image/png;base64,${base64}` : null;
};

const generateVideoWithHuggingFace = async (item: GeneratedContent, brandProfile: BrandProfile, productImage: File, index: number) => {
  const token = import.meta.env.VITE_HF_API_KEY;
  if (!token || item.content_type !== 'reel') return null;

  const client = new InferenceClient(token);
  const blob = await client.imageToVideo({
    provider: 'fal-ai',
    model: 'Wan-AI/Wan2.1-I2V-14B-720P',
    inputs: productImage,
    parameters: {
      prompt: getAssetPrompt(item, brandProfile, index),
      negative_prompt: 'blurry, distorted, duplicate product, extra device, watermark, text artifacts',
      num_frames: 49,
      num_inference_steps: 30,
      guidance_scale: 5,
      target_size: {
        width: 720,
        height: 1280,
      },
    },
  });

  return URL.createObjectURL(blob);
};

const generateAssetsForContent = async (
  content: GeneratedContent[],
  brandProfile: BrandProfile,
  productImage: File,
  setProgress: (value: string) => void
) => {
  const generatedContent: GeneratedContent[] = [];
  let generatedCount = 0;
  let generatedVideos = 0;

  for (let i = 0; i < content.length; i += 1) {
    const item = content[i];
    setProgress(`Generating assets ${i + 1} of ${content.length}...`);

    try {
      let imageUrl = null;

      try {
        imageUrl = await generateImageWithHuggingFace(item, brandProfile, i);
      } catch (error) {
        console.error('Hugging Face image generation failed for item', i, error);
      }

      if (!imageUrl) {
        imageUrl = await generateImageWithGemini(item, brandProfile, i);
      }

      let videoUrl = item.videoUrl;
      if (item.content_type === 'reel') {
        try {
          videoUrl = await generateVideoWithHuggingFace(item, brandProfile, productImage, i) || undefined;
          if (videoUrl) generatedVideos += 1;
        } catch (error) {
          console.error('Hugging Face video generation failed for item', i, error);
        }
      }

      if (imageUrl) generatedCount += 1;
      generatedContent.push({
        ...item,
        imageUrl: imageUrl || undefined,
        videoUrl,
      });
    } catch (error) {
      console.error('Asset generation failed for item', i, error);
      generatedContent.push({
        ...item,
        imageUrl: undefined,
      });
    }
  }

  if (generatedCount === 0) {
    toast({
      title: 'Image generation unavailable',
      description: 'AI image API did not return usable images, so distinct designed previews are being shown instead.',
      variant: 'destructive',
    });
  }

  if (generatedVideos === 0 && content.some((item) => item.content_type === 'reel') && import.meta.env.VITE_HF_API_KEY) {
    toast({
      title: 'Reel video generation unavailable',
      description: 'HF video generation did not return a usable reel, so reel cover images and AI prompts are being used instead.',
      variant: 'destructive',
    });
  }

  return generatedContent;
};

const buildFallbackContent = (brandProfile: BrandProfile): GeneratedContent[] => {
  const brandTag = brandProfile.brandName.toLowerCase().replace(/\s/g, '');
  const categoryTag = brandProfile.productCategory.toLowerCase().replace(/\s/g, '');

  return [
    {
      content_type: 'reel',
      schedule_day: 'Monday',
      hook: `${brandProfile.productName} ka asli magic`,
      caption: `${brandProfile.productName} is the ${brandProfile.productCategory} drop your audience should not miss. ${brandProfile.tagline || 'Check it out'} #${brandTag}`,
      hashtags: [brandTag, categoryTag, 'indianbrand', 'madeinindia', 'shoplocal', 'd2c', 'trending'],
      visual_description: `Cinematic reveal of ${brandProfile.productName} with ${brandProfile.brandName} brand colors and a ${brandProfile.tone} tone.`,
      videoPrompt: `Create a vertical reel for ${brandProfile.brandName}'s ${brandProfile.productName}, a ${brandProfile.productCategory} product, using ${brandProfile.tone} styling and colors ${brandProfile.brandColors.join(', ')}.`,
    },
    {
      content_type: 'reel',
      schedule_day: 'Wednesday',
      hook: `${brandProfile.productName} packing day`,
      caption: `${brandProfile.productName} ke orders pack ho rahe hain. ${brandProfile.brandName} is building trust one order at a time.`,
      hashtags: ['packingorders', 'smallbusinessindia', 'supportlocal', categoryTag, 'd2cbrand'],
      visual_description: `Behind-the-scenes packing montage of ${brandProfile.productName} with branded inserts and ${brandProfile.brandColors[0]} accents.`,
      videoPrompt: `Generate a behind-the-scenes packing reel for ${brandProfile.productName} by ${brandProfile.brandName} with energetic cuts and a clear product focus.`,
    },
    {
      content_type: 'post',
      schedule_day: 'Tuesday',
      hook: `${brandProfile.productName} close-up`,
      caption: `${brandProfile.productName} ko zoom karke dekho. ${brandProfile.brandName} har detail mein quality deliver karta hai.`,
      hashtags: ['qualitycheck', 'productshot', 'premiumquality', 'indiand2c', categoryTag],
      visual_description: `High-detail macro product shot of ${brandProfile.productName} styled for the ${brandProfile.productCategory} category using the full brand palette.`,
      videoPrompt: '',
    },
    {
      content_type: 'reel',
      schedule_day: 'Thursday',
      hook: `${brandProfile.productName} reviews are in`,
      caption: `Real customers, real love. Dekho log ${brandProfile.productName} ke baare mein kya bol rahe hain.`,
      hashtags: ['customerreview', 'testimonial', 'happycustomer', 'trustworthy', brandTag],
      visual_description: `Testimonial reel for ${brandProfile.productName} featuring product cutaways, social proof overlays, and ${brandProfile.tone} energy.`,
      videoPrompt: `Create a testimonial-style reel for ${brandProfile.productName} with social proof callouts, crisp motion text, and ${brandProfile.brandName} branding.`,
    },
    {
      content_type: 'post',
      schedule_day: 'Friday',
      hook: `${brandProfile.productName} weekend pick`,
      caption: `Weekend ho aur ${brandProfile.productName} na ho? ${brandProfile.brandName} ke saath apna weekend upgrade karo.`,
      hashtags: ['weekendvibes', 'shopnow', 'treatyourself', 'weekendmood', categoryTag],
      visual_description: `Lifestyle flat-lay featuring ${brandProfile.productName}, props from the ${brandProfile.productCategory} world, and a ${brandProfile.tone} brand mood.`,
      videoPrompt: '',
    },
    {
      content_type: 'story',
      schedule_day: 'Saturday',
      hook: `${brandProfile.productName} poll`,
      caption: `${brandProfile.productName} ke liye kaunsa look ya variant pasand hai? Vote karo aur ${brandProfile.brandName} ko batao.`,
      hashtags: ['poll', 'youropinion', 'brandlove', 'engagement', categoryTag],
      visual_description: `Interactive story poll for ${brandProfile.productName} using two visual variants and brand-color UI stickers.`,
      videoPrompt: '',
    },
  ];
};

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
    setProgress('Uploading your product photo...');

    try {
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

      setProgress('AI is crafting your content plan...');

      const { data, error } = await supabase.functions.invoke('generate-brand-content', {
        body: {
          brandName: brandProfile.brandName,
          productName: brandProfile.productName,
          productCategory: brandProfile.productCategory,
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
          videoPrompt: item.videoPrompt,
          imageUrl: undefined,
        }));
      }

      if (content.length === 0) {
        content = buildFallbackContent(brandProfile).map((item) => ({
          ...item,
          imageUrl: undefined,
        }));

        toast({
          title: 'Content Plan Generated',
          description: `Created custom content for ${brandProfile.brandName} using your product details.`,
        });
      } else {
        toast({
          title: 'AI Content Ready',
          description: `Generated a full week's content plan for ${brandProfile.productName}.`,
        });
      }

      const contentWithGeneratedAssets = await generateAssetsForContent(content, brandProfile, productImage, setProgress);
      onGenerated(contentWithGeneratedAssets);
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
          Drop your best product shot. AI will create a week's Instagram content for <span className="text-foreground font-semibold">{brandProfile.brandName}</span> based on your product name, category, tone, tagline, colors, and photo.
        </p>
      </div>

      <div className="flex items-center gap-4 p-4 border border-foreground/10">
        <div className="flex -space-x-1">
          {brandProfile.brandColors.slice(0, 4).map((c, i) => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-background" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div>
          <div className="font-semibold text-sm">{brandProfile.brandName}</div>
          <div className="text-xs text-muted-foreground">{brandProfile.productName} · {brandProfile.productCategory}</div>
          <div className="text-xs text-muted-foreground">{brandProfile.tagline || brandProfile.tone}</div>
        </div>
      </div>

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
              Photo Ready
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
