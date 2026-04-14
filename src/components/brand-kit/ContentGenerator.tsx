import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ImageIcon, Loader2, Sparkles, Film, Layers3 } from 'lucide-react';
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

interface GeneratedContentResponseItem {
  content_type: GeneratedContent['content_type'];
  schedule_day: string;
  caption: string;
  hashtags?: string[];
  visual_description: string;
  hook: string;
  videoPrompt?: string;
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
    `Target audience: ${brandProfile.targetAudience}.`,
    `Unique selling point: ${brandProfile.brandUSP}.`,
    `Campaign goal: ${brandProfile.contentGoal}.`,
    `Content type: ${item.content_type}.`,
    `Hook: ${item.hook}.`,
    `Visual direction: ${item.visual_description}.`,
    `Brand tone: ${brandProfile.tone}.`,
    `Tagline: ${brandProfile.tagline || 'Use concise branded messaging only when helpful.'}`,
    `Brand colors: ${brandProfile.brandColors.join(', ')}.`,
    variant,
    'Keep the same product identity but change composition, crop, lighting, and styling.',
    item.content_type === 'reel'
      ? 'Compose it as a vertical reel cover poster with strong center focus, motion-friendly composition, and space for headline overlays.'
      : item.content_type === 'story'
        ? 'Compose it as an interactive story card with clean breathing room for stickers and poll UI.'
        : 'Compose it as a polished square campaign image for an Instagram post.',
  ].join(' ');
};

const dataUrlToBlob = async (url: string) => {
  if (url.startsWith('data:')) {
    const response = await fetch(url);
    return response.blob();
  }

  const response = await fetch(url);
  return response.blob();
};

const createFallbackReelVideo = async (
  imageUrl: string,
  item: GeneratedContent,
  brandProfile: BrandProfile
) => {
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined') {
    return undefined;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 1280;
  const ctx = canvas.getContext('2d');
  if (!ctx) return undefined;

  const image = new Image();
  image.crossOrigin = 'anonymous';

  const imageLoaded = new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error('Unable to load image for reel preview.'));
  });

  image.src = imageUrl;
  await imageLoaded;

  const stream = canvas.captureStream(24);
  const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
    ? 'video/webm;codecs=vp9'
    : 'video/webm';

  const recorder = new MediaRecorder(stream, { mimeType });
  const chunks: Blob[] = [];

  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      chunks.push(event.data);
    }
  };

  const totalFrames = 96;
  const padding = 52;
  const hashtagLine = item.hashtags.slice(0, 4).map((tag) => (tag.startsWith('#') ? tag : `#${tag}`)).join(' ');

  const recordPromise = new Promise<string>((resolve, reject) => {
    recorder.onerror = () => reject(new Error('Unable to record fallback reel preview.'));
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      resolve(URL.createObjectURL(blob));
    };
  });

  recorder.start();

  for (let frame = 0; frame < totalFrames; frame += 1) {
    const progress = frame / (totalFrames - 1);
    const scale = 1 + progress * 0.08;
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const offsetX = (canvas.width - drawWidth) / 2;
    const offsetY = (canvas.height - drawHeight) / 2 - progress * 18;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

    const overlay = ctx.createLinearGradient(0, 0, 0, canvas.height);
    overlay.addColorStop(0, 'rgba(0, 0, 0, 0.15)');
    overlay.addColorStop(0.55, 'rgba(0, 0, 0, 0.4)');
    overlay.addColorStop(1, 'rgba(0, 0, 0, 0.82)');
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = brandProfile.brandColors[0] || '#ffffff';
    ctx.fillRect(padding, 72, 180, 6);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 34px "Space Grotesk", sans-serif';
    ctx.fillText(item.schedule_day.toUpperCase(), padding, 120);

    ctx.font = '700 66px "Space Grotesk", sans-serif';
    const hookLines = wrapCanvasText(ctx, item.hook, canvas.width - padding * 2, 3);
    hookLines.forEach((line, index) => {
      ctx.fillText(line, padding, 820 + index * 78);
    });

    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
    ctx.font = '500 28px "Space Grotesk", sans-serif';
    const descriptionLines = wrapCanvasText(ctx, item.visual_description, canvas.width - padding * 2, 3);
    descriptionLines.forEach((line, index) => {
      ctx.fillText(line, padding, 1040 + index * 36);
    });

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 26px "JetBrains Mono", monospace';
    ctx.fillText(brandProfile.brandName.toUpperCase(), padding, 1190);

    if (hashtagLine) {
      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
      ctx.fillText(hashtagLine.slice(0, 48), canvas.width - padding, 1190);
      ctx.textAlign = 'left';
    }

    await new Promise((resolve) => window.setTimeout(resolve, 1000 / 24));
  }

  recorder.stop();
  return recordPromise;
};

const wrapCanvasText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number) => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(nextLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = nextLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.slice(0, maxLines);
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

const generateVideoWithHuggingFace = async (
  item: GeneratedContent,
  brandProfile: BrandProfile,
  sourceImageUrl: string,
  index: number
) => {
  const token = import.meta.env.VITE_HF_API_KEY;
  if (!token || item.content_type !== 'reel') return null;

  const blob = await dataUrlToBlob(sourceImageUrl);
  const sourceFile = new File([blob], `${brandProfile.brandName}-reel-source-${index}.png`, { type: blob.type || 'image/png' });

  const client = new InferenceClient(token);
  const output = await client.imageToVideo({
    provider: 'fal-ai',
    model: 'Wan-AI/Wan2.1-I2V-14B-720P',
    inputs: sourceFile,
    parameters: {
      prompt: `${getAssetPrompt(item, brandProfile, index)} Animate camera movement, product reveal, and subtle social-ready motion.`,
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

  return URL.createObjectURL(output);
};

const generateAssetsForContent = async (
  content: GeneratedContent[],
  brandProfile: BrandProfile,
  setProgress: (value: string) => void
) => {
  const generatedContent: GeneratedContent[] = [];
  let generatedImages = 0;
  let generatedVideos = 0;
  let fallbackVideos = 0;

  for (let i = 0; i < content.length; i += 1) {
    const item = content[i];
    setProgress(`Generating assets ${i + 1} of ${content.length}...`);

    try {
      let imageUrl: string | null = null;

      try {
        imageUrl = await generateImageWithHuggingFace(item, brandProfile, i);
      } catch (error) {
        console.error('Hugging Face image generation failed for item', i, error);
      }

      if (!imageUrl) {
        imageUrl = await generateImageWithGemini(item, brandProfile, i);
      }

      let videoUrl = item.videoUrl;
      if (item.content_type === 'reel' && imageUrl) {
        try {
          videoUrl = await generateVideoWithHuggingFace(item, brandProfile, imageUrl, i) || undefined;
          if (videoUrl) {
            generatedVideos += 1;
          }
        } catch (error) {
          console.error('AI video generation failed for item', i, error);
        }

        if (!videoUrl) {
          try {
            videoUrl = await createFallbackReelVideo(imageUrl, item, brandProfile);
            if (videoUrl) fallbackVideos += 1;
          } catch (fallbackError) {
            console.error('Fallback reel generation failed for item', i, fallbackError);
          }
        }
      }

      if (imageUrl) generatedImages += 1;
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

  if (generatedImages === 0) {
    toast({
      title: 'Image generation unavailable',
      description: 'AI image APIs did not return usable artwork, so styled preview cards will be shown instead.',
      variant: 'destructive',
    });
  }

  if (generatedVideos === 0 && fallbackVideos > 0) {
    toast({
      title: 'Reels recovered with smart fallback',
      description: `${fallbackVideos} playable vertical reel preview${fallbackVideos > 1 ? 's were' : ' was'} created locally from the generated campaign art.`,
    });
  }

  if (generatedVideos === 0 && fallbackVideos === 0 && content.some((item) => item.content_type === 'reel')) {
    toast({
      title: 'Reel video generation unavailable',
      description: 'Reel covers and prompts are ready, but this browser could not render a video preview.',
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
      hook: `${brandProfile.productName} ka first impression`,
      caption: `${brandProfile.productName} is built for ${brandProfile.targetAudience}. ${brandProfile.brandUSP}. ${brandProfile.tagline || 'Discover the drop.'}`,
      hashtags: [brandTag, categoryTag, 'indianbrand', 'madeinindia', 'shoplocal', 'd2c', 'reels'],
      visual_description: `Cinematic hero reveal of ${brandProfile.productName} using ${brandProfile.brandName} colors with a ${brandProfile.tone} tone and a strong ${brandProfile.contentGoal.toLowerCase()} angle.`,
      videoPrompt: `Create a vertical hero reel for ${brandProfile.brandName}'s ${brandProfile.productName} focused on ${brandProfile.targetAudience}. Highlight ${brandProfile.brandUSP} and use ${brandProfile.brandColors.join(', ')}.`,
    },
    {
      content_type: 'post',
      schedule_day: 'Tuesday',
      hook: `${brandProfile.productName} detail check`,
      caption: `${brandProfile.productName} ke har detail mein ${brandProfile.brandUSP}. Saved for people who care about better ${brandProfile.productCategory.toLowerCase()} choices.`,
      hashtags: ['productdetail', 'designledbrand', 'premiumquality', categoryTag, brandTag],
      visual_description: `Macro product post showing texture, packaging, and finish with editorial composition and strong material detail.`,
      videoPrompt: '',
    },
    {
      content_type: 'story',
      schedule_day: 'Wednesday',
      hook: `Would you try ${brandProfile.productName}?`,
      caption: `Quick poll for our community: what matters most in your next ${brandProfile.productCategory.toLowerCase()} buy?`,
      hashtags: ['storypoll', 'communitychoice', brandTag, categoryTag],
      visual_description: `Interactive story poll with two clean product options, branded stickers, and concise prompts.`,
      videoPrompt: '',
    },
    {
      content_type: 'reel',
      schedule_day: 'Thursday',
      hook: `${brandProfile.productName} in daily use`,
      caption: `${brandProfile.productName} fits real routines, not just pretty feeds. ${brandProfile.brandName} keeps it useful and on-brand.`,
      hashtags: ['dailyuse', 'howtouse', categoryTag, brandTag, 'ugcstyle'],
      visual_description: `Lifestyle reel with quick cuts, hand interaction, branded typography overlays, and a believable product-in-use setting.`,
      videoPrompt: `Generate a vertical routine reel for ${brandProfile.productName} with lifestyle motion, subtle camera movement, and a trustworthy ${brandProfile.tone} brand tone.`,
    },
    {
      content_type: 'post',
      schedule_day: 'Friday',
      hook: `${brandProfile.productName} solves this`,
      caption: `People choose ${brandProfile.brandName} because ${brandProfile.brandUSP}. Save this post if that matters in your next purchase.`,
      hashtags: ['problemsolution', 'savepost', 'brandvalue', categoryTag, brandTag],
      visual_description: `Problem-solution carousel cover concept with bold headline blocks and contrast-led composition.`,
      videoPrompt: '',
    },
    {
      content_type: 'reel',
      schedule_day: 'Saturday',
      hook: `Why customers come back`,
      caption: `Testimonials, repeat orders, and product trust. ${brandProfile.productName} keeps turning first-time buyers into repeat fans.`,
      hashtags: ['testimonialreel', 'socialproof', 'smallbusinessindia', brandTag, categoryTag],
      visual_description: `Social proof reel with customer quotes, product cutaways, and premium editorial pacing.`,
      videoPrompt: `Create a testimonial reel for ${brandProfile.productName} with smooth motion, proof-driven overlays, and branded transitions.`,
    },
  ];
};

const ContentGenerator = ({ brandProfile, onGenerated, onBack }: ContentGeneratorProps) => {
  const { user } = useAuth();
  const [productImage, setProductImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState('');

  useEffect(() => () => {
    if (previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl]);

  const updateSelectedImage = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Unsupported file',
        description: 'Please upload a JPG, PNG, or WebP product photo.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'Image too large',
        description: 'Please keep product photos under 10MB.',
        variant: 'destructive',
      });
      return;
    }

    if (previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    setProductImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  }, [previewUrl]);

  const handleImageDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      updateSelectedImage(file);
    }
  }, [updateSelectedImage]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateSelectedImage(file);
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
          targetAudience: brandProfile.targetAudience,
          brandUSP: brandProfile.brandUSP,
          contentGoal: brandProfile.contentGoal,
          productImageUrl,
        },
      });

      if (error) throw error;

      let content: GeneratedContent[] = [];
      if (data?.content && Array.isArray(data.content)) {
        content = (data.content as GeneratedContentResponseItem[]).map((item) => ({
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
          title: 'Content plan generated',
          description: `Created a custom weekly content system for ${brandProfile.brandName}.`,
        });
      } else {
        toast({
          title: 'AI content ready',
          description: `Generated a full weekly plan for ${brandProfile.productName}.`,
        });
      }

      const contentWithGeneratedAssets = await generateAssetsForContent(content, brandProfile, setProgress);
      onGenerated(contentWithGeneratedAssets);
    } catch (err) {
      console.error('Generation error:', err);
      toast({
        title: 'Generation Error',
        description: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
      setProgress('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm tracking-wider">BACK TO BRAND SETUP</span>
      </button>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6 border border-foreground/10 bg-background/70 p-5 sm:p-8">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Upload Product Photo</h2>
            <p className="text-muted-foreground">
              Use a clean hero image. We&apos;ll turn it into posts, stories, and reel previews tailored for <span className="text-foreground font-semibold">{brandProfile.brandName}</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-4 border border-foreground/10 p-4">
            <div className="flex -space-x-1">
              {brandProfile.brandColors.slice(0, 4).map((c, i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-background" style={{ backgroundColor: c }} />
              ))}
            </div>
            <div className="space-y-1 text-sm">
              <div className="font-semibold">{brandProfile.brandName}</div>
              <div className="text-muted-foreground">{brandProfile.productName} • {brandProfile.productCategory}</div>
              <div className="text-muted-foreground">Audience: {brandProfile.targetAudience}</div>
              <div className="text-muted-foreground">Goal: {brandProfile.contentGoal}</div>
            </div>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleImageDrop}
            className="relative border-2 border-dashed border-foreground/20 hover:border-foreground/40 transition-colors cursor-pointer min-h-[320px] flex items-center justify-center"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            {previewUrl ? (
              <div className="relative w-full p-4">
                <img src={previewUrl} alt="Product" className="max-h-[420px] mx-auto object-contain" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-foreground text-background text-xs font-semibold">
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
                  <p className="text-sm text-muted-foreground mt-1">or click to browse • JPG, PNG, WebP up to 10MB</p>
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
              <p>This usually takes 20-45 seconds depending on image and video generation.</p>
            </div>
          )}
        </div>

        <div className="border border-foreground/10 bg-gradient-to-br from-foreground/[0.05] via-transparent to-primary/10 p-5 sm:p-8 space-y-5">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase text-primary">
            <Layers3 className="w-3.5 h-3.5" />
            Output Preview
          </div>

          <div className="space-y-4">
            <div className="border border-foreground/10 bg-background/70 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Film className="w-4 h-4 text-primary" />
                Reel generation fix
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                If the external AI video model fails, the app now creates a real playable vertical reel preview from the generated campaign image instead of showing a broken placeholder.
              </p>
            </div>

            <div className="border border-foreground/10 bg-background/70 p-4">
              <p className="text-sm font-semibold">What gets generated</p>
              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <p>Reels with cover art, video previews, and reusable prompts</p>
                <p>Posts and stories aligned to your palette, audience, and goal</p>
                <p>Captions, hooks, and hashtag sets ready to copy</p>
              </div>
            </div>

            <div className="border border-foreground/10 bg-background/70 p-4">
              <p className="text-sm font-semibold">Best results</p>
              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <p>Use a sharp product shot with one clear hero subject</p>
                <p>Keep background clutter low for better reel focus</p>
                <p>Include accurate audience and USP details for stronger hooks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator;
