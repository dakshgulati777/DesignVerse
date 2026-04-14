import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Copy, Check, Film, Image, Smartphone, Calendar, Hash, Lightbulb, Download, Play, Wand2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { BrandProfile, GeneratedContent } from '@/pages/BrandKit';
import { Button } from '@/components/ui/button';

interface ContentCalendarProps {
  content: GeneratedContent[];
  brandProfile: BrandProfile;
  onBack: () => void;
}

const typeConfig = {
  reel: { icon: Film, label: 'Reel' },
  post: { icon: Image, label: 'Post' },
  story: { icon: Smartphone, label: 'Story' },
};

const createPreviewImage = (item: GeneratedContent, brandProfile: BrandProfile) => {
  const colors = [...brandProfile.brandColors, '#111111', '#f5f5f5'].slice(0, 4);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${item.content_type === 'reel' ? '1080 1920' : '1080 1080'}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${colors[0]}"/>
          <stop offset="50%" stop-color="${colors[1]}"/>
          <stop offset="100%" stop-color="${colors[2]}"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <circle cx="880" cy="180" r="180" fill="${colors[3]}" fill-opacity="0.18"/>
      <circle cx="190" cy="${item.content_type === 'reel' ? '1610' : '900'}" r="220" fill="#ffffff" fill-opacity="0.08"/>
      <rect x="72" y="72" width="936" height="${item.content_type === 'reel' ? '1776' : '936'}" rx="28" fill="#0a0a0a" fill-opacity="0.28" stroke="#ffffff" stroke-opacity="0.18"/>
      <text x="110" y="170" fill="#ffffff" font-family="Arial, sans-serif" font-size="42" font-weight="700" letter-spacing="8">${item.content_type.toUpperCase()}</text>
      <text x="110" y="260" fill="#ffffff" font-family="Arial, sans-serif" font-size="82" font-weight="700">${brandProfile.productName.slice(0, 24)}</text>
      <text x="110" y="330" fill="#ffffff" fill-opacity="0.86" font-family="Arial, sans-serif" font-size="34">${brandProfile.productCategory.slice(0, 28)}</text>
      <foreignObject x="110" y="420" width="860" height="320">
        <div xmlns="http://www.w3.org/1999/xhtml" style="color:white;font-family:Arial,sans-serif;font-size:52px;font-weight:700;line-height:1.15;">
          ${item.hook}
        </div>
      </foreignObject>
      <foreignObject x="110" y="${item.content_type === 'reel' ? '1220' : '730'}" width="860" height="210">
        <div xmlns="http://www.w3.org/1999/xhtml" style="color:rgba(255,255,255,0.85);font-family:Arial,sans-serif;font-size:30px;line-height:1.35;">
          ${item.visual_description}
        </div>
      </foreignObject>
      <text x="110" y="${item.content_type === 'reel' ? '1810' : '965'}" fill="#ffffff" fill-opacity="0.88" font-family="Arial,sans-serif" font-size="28" letter-spacing="3">${brandProfile.brandName.toUpperCase()}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const getDisplayImage = (item: GeneratedContent, brandProfile: BrandProfile) => item.imageUrl || createPreviewImage(item, brandProfile);

const getDownloadFilename = (item: GeneratedContent, index: number) => {
  if (item.videoUrl) return `${item.content_type}-${index}.webm`;
  return `${item.content_type}-${index}.png`;
};

const ContentCalendar = ({ content, brandProfile, onBack }: ContentCalendarProps) => {
  const [selectedItem, setSelectedItem] = useState<GeneratedContent | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const summary = useMemo(() => ({
    reels: content.filter((c) => c.content_type === 'reel').length,
    posts: content.filter((c) => c.content_type === 'post').length,
    stories: content.filter((c) => c.content_type === 'story').length,
  }), [content]);

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      toast({ title: 'Download Started', description: `Downloading ${filename}...` });
    } catch (error) {
      window.open(url, '_blank');
      toast({ title: 'Opening Asset', description: 'Direct download failed, so the asset was opened in a new tab.' });
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
    toast({ title: 'Copied!', description: `${field} copied to clipboard.` });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm tracking-wider">BACK</span>
      </button>

      <div className="border border-foreground/10 bg-gradient-to-br from-foreground/[0.04] via-transparent to-primary/10 p-5 sm:p-8 space-y-5">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Your Week&apos;s Content System</h2>
          <p className="text-muted-foreground">
            {content.length} pieces ready for <span className="text-foreground font-semibold">{brandProfile.brandName}</span>, shaped around {brandProfile.targetAudience} and your goal to {brandProfile.contentGoal.toLowerCase()}.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="border border-foreground/10 bg-background/70 p-4 text-sm">
            <div className="flex items-center gap-2 font-semibold"><Film className="w-4 h-4 text-primary" /> {summary.reels} Reels</div>
            <p className="mt-2 text-muted-foreground">Playable previews with copyable prompts and hooks.</p>
          </div>
          <div className="border border-foreground/10 bg-background/70 p-4 text-sm">
            <div className="flex items-center gap-2 font-semibold"><Image className="w-4 h-4 text-primary" /> {summary.posts} Posts</div>
            <p className="mt-2 text-muted-foreground">Designed campaign art matched to your palette and category.</p>
          </div>
          <div className="border border-foreground/10 bg-background/70 p-4 text-sm">
            <div className="flex items-center gap-2 font-semibold"><Smartphone className="w-4 h-4 text-primary" /> {summary.stories} Stories</div>
            <p className="mt-2 text-muted-foreground">Quick engagement content for polls, reminders, and launches.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {content.map((item, index) => {
          const config = typeConfig[item.content_type];
          const Icon = config.icon;

          return (
            <motion.div
              key={`${item.content_type}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              onClick={() => setSelectedItem(item)}
              className="border border-foreground/10 p-4 sm:p-5 cursor-pointer hover:border-foreground/30 transition-all group relative bg-background/70"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold tracking-widest uppercase">{config.label}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {item.schedule_day}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(item.videoUrl || getDisplayImage(item, brandProfile), getDownloadFilename(item, index));
                  }}
                  className="p-2 border border-foreground/10 hover:bg-foreground/5 transition-colors"
                  title="Download asset"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className={`${item.content_type === 'reel' ? 'aspect-[9/16]' : 'aspect-square'} mb-4 overflow-hidden border border-foreground/5 relative bg-muted/20`}>
                {item.content_type === 'reel' ? (
                  <>
                    <img src={getDisplayImage(item, brandProfile)} alt="Reel Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 bg-background/75 px-2 py-1 text-[10px] font-black tracking-[0.2em] uppercase">
                          <Play className="w-3 h-3 fill-current" />
                          Reel Preview
                        </span>
                        {!item.videoUrl && (
                          <p className="text-[10px] font-medium text-white/80">Cover ready, prompt included</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <img src={getDisplayImage(item, brandProfile)} alt="Generated Content" className="w-full h-full object-cover" />
                )}
              </div>

              <p className="font-semibold text-sm mb-2 line-clamp-2">{item.hook}</p>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                {brandProfile.productName} • {brandProfile.productCategory}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{item.caption}</p>

              <div className="flex gap-1 mt-auto">
                {brandProfile.brandColors.slice(0, 4).map((c, i) => (
                  <div key={i} className="h-1 flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border border-foreground/10 max-w-4xl w-full p-5 sm:p-6 space-y-5 my-auto"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = typeConfig[selectedItem.content_type].icon;
                    return <Icon className="w-5 h-5 text-primary" />;
                  })()}
                  <span className="font-bold tracking-wider uppercase">{typeConfig[selectedItem.content_type].label}</span>
                  <span className="text-sm text-muted-foreground">• {selectedItem.schedule_day}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(selectedItem.videoUrl || getDisplayImage(selectedItem, brandProfile), `${selectedItem.content_type}.webm`)}
                    className="h-9 gap-2 border-foreground/10 hover:bg-foreground/5"
                  >
                    <Download className="w-3 h-3" />
                    <span className="text-[10px] font-bold tracking-widest">DOWNLOAD</span>
                  </Button>
                  <button onClick={() => setSelectedItem(null)} className="text-muted-foreground hover:text-foreground text-xl leading-none">x</button>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className={`${selectedItem.content_type === 'reel' ? 'aspect-[9/16] max-h-[70vh]' : 'aspect-square'} w-full overflow-hidden border border-foreground/10 bg-muted/20 relative`}>
                  {selectedItem.content_type === 'reel' && selectedItem.videoUrl ? (
                    <video
                      src={selectedItem.videoUrl}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                      poster={getDisplayImage(selectedItem, brandProfile)}
                    />
                  ) : (
                    <>
                      <img src={getDisplayImage(selectedItem, brandProfile)} alt="Preview" className="w-full h-full object-cover" />
                      {selectedItem.content_type === 'reel' && (
                        <div className="absolute inset-x-4 bottom-4 bg-background/80 backdrop-blur-sm border border-foreground/10 p-3">
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <Wand2 className="w-4 h-4 text-primary" />
                            Reel brief ready
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            A video file was not available for this reel, but the reel cover, hook, caption, and prompt are ready to use.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Hook</span>
                    </div>
                    <p className="font-semibold">{selectedItem.hook}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Visual Concept</span>
                    <p className="text-sm text-muted-foreground">{selectedItem.visual_description}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Product Context</span>
                    <p className="text-sm text-muted-foreground">
                      {brandProfile.productName} in {brandProfile.productCategory} for {brandProfile.brandName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Target audience: {brandProfile.targetAudience} • Goal: {brandProfile.contentGoal}
                    </p>
                  </div>

                  {selectedItem.content_type === 'reel' && selectedItem.videoPrompt && (
                    <div className="space-y-2 p-3 bg-muted/30 border border-foreground/5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Film className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">AI Video Prompt</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(selectedItem.videoPrompt!, 'Video Prompt')}
                          className="text-[10px] font-bold tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {copiedField === 'Video Prompt' ? 'COPIED' : 'COPY PROMPT'}
                        </button>
                      </div>
                      <p className="text-xs italic leading-relaxed text-muted-foreground border-l-2 border-foreground/20 pl-3">
                        "{selectedItem.videoPrompt}"
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Caption</span>
                      <button
                        onClick={() => copyToClipboard(selectedItem.caption, 'Caption')}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedField === 'Caption' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copiedField === 'Caption' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{selectedItem.caption}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Hash className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Hashtags</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(selectedItem.hashtags.map((tag) => (tag.startsWith('#') ? tag : `#${tag}`)).join(' '), 'Hashtags')}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedField === 'Hashtags' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copiedField === 'Hashtags' ? 'Copied!' : 'Copy All'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.hashtags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 text-xs border border-foreground/10 font-mono">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-foreground/10">
                    {brandProfile.brandColors.map((c, i) => (
                      <div key={i} className="w-8 h-8" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentCalendar;
