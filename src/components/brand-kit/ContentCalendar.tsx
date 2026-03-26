import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Copy, Check, Film, Image, Smartphone, Calendar, Hash, Lightbulb, Download, Play } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { BrandProfile, GeneratedContent } from '@/pages/BrandKit';
import { Button } from '@/components/ui/button';

interface ContentCalendarProps {
  content: GeneratedContent[];
  brandProfile: BrandProfile;
  onBack: () => void;
}

const typeConfig = {
  reel: { icon: Film, label: 'Reel', color: 'hsl(var(--primary))' },
  post: { icon: Image, label: 'Post', color: 'hsl(var(--accent))' },
  story: { icon: Smartphone, label: 'Story', color: 'hsl(var(--secondary))' },
};

const ContentCalendar = ({ content, brandProfile, onBack }: ContentCalendarProps) => {
  const [selectedItem, setSelectedItem] = useState<GeneratedContent | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

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
      toast({ title: 'Opening Asset', description: 'Download failed, opening in new tab instead.' });
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
    toast({ title: 'Copied!', description: `${field} copied to clipboard` });
  };

  const reels = content.filter((c) => c.content_type === 'reel');
  const posts = content.filter((c) => c.content_type === 'post');
  const stories = content.filter((c) => c.content_type === 'story');

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm tracking-wider">BACK</span>
      </button>

      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Your Week's Content 🗓️
        </h2>
        <p className="text-muted-foreground">
          {content.length} pieces ready for <span className="text-foreground font-semibold">{brandProfile.brandName}</span>
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <span className="flex items-center gap-1"><Film className="w-4 h-4" /> {reels.length} Reels</span>
          <span className="flex items-center gap-1"><Image className="w-4 h-4" /> {posts.length} Posts</span>
          <span className="flex items-center gap-1"><Smartphone className="w-4 h-4" /> {stories.length} Stories</span>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.map((item, index) => {
          const config = typeConfig[item.content_type];
          const Icon = config.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedItem(item)}
              className="border border-foreground/10 p-5 cursor-pointer hover:border-foreground/30 transition-all group relative"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-widest uppercase">{config.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(item.videoUrl || item.imageUrl || '', `${item.content_type}-${index}.${item.videoUrl ? 'mp4' : 'png'}`);
                    }}
                    className="p-1 hover:bg-foreground/10 rounded transition-colors"
                    title="Download Asset"
                  >
                    <Download className="w-3 h-3" />
                  </button>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {item.schedule_day}
                  </div>
                </div>
              </div>

              {/* Preview Image/Video */}
              {item.imageUrl && (
                <div className={`${item.content_type === 'reel' ? 'aspect-[9/16]' : 'aspect-square'} mb-4 overflow-hidden border border-foreground/5 relative group-hover:border-foreground/20 transition-colors`}>
                  {item.content_type === 'reel' ? (
                    <div className="w-full h-full bg-muted/20 relative">
                       <img src={item.imageUrl} alt="Reel Preview" className="w-full h-full object-cover blur-[2px] opacity-50" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                         <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30">
                           <Play className="w-6 h-6 text-primary fill-primary" />
                         </div>
                         <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Vertical Reel</span>
                       </div>
                    </div>
                  ) : (
                    <img src={item.imageUrl} alt="AI Generated Content" className="w-full h-full object-cover grayscale active-grayscale-0 transition-all hover:grayscale-0" />
                  )}
                </div>
              )}

              {/* Hook */}
              <p className="font-semibold text-sm mb-2 line-clamp-2">{item.hook}</p>

              {/* Caption preview */}
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{item.caption}</p>

              {/* Brand Colors Bar */}
              <div className="flex gap-1 mt-auto">
                {brandProfile.brandColors.slice(0, 4).map((c, i) => (
                  <div key={i} className="h-1 flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal */}
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
              className="bg-background border border-foreground/10 max-w-lg w-full p-6 space-y-5 my-auto"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {(() => { const Icon = typeConfig[selectedItem.content_type].icon; return <Icon className="w-5 h-5" />; })()}
                  <span className="font-bold tracking-wider uppercase">{typeConfig[selectedItem.content_type].label}</span>
                  <span className="text-sm text-muted-foreground">· {selectedItem.schedule_day}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(selectedItem.imageUrl || '', `${selectedItem.content_type}.png`)}
                    className="h-8 gap-2 border-foreground/10 hover:bg-foreground/5"
                  >
                    <Download className="w-3 h-3" />
                    <span className="text-[10px] font-bold tracking-widest">DOWNLOAD</span>
                  </Button>
                  <button onClick={() => setSelectedItem(null)} className="text-muted-foreground hover:text-foreground">✕</button>
                </div>
              </div>

              {/* Modal Image/Video */}
              {selectedItem.imageUrl && (
                <div className={`${selectedItem.content_type === 'reel' ? 'aspect-[9/16] max-h-[50vh]' : 'aspect-square'} w-full overflow-hidden border border-foreground/10 bg-muted/20 relative`}>
                  {selectedItem.content_type === 'reel' ? (
                    <video 
                      src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-neon-lights-34208-large.mp4" 
                      controls 
                      autoPlay 
                      loop 
                      className="w-full h-full object-cover"
                      poster={selectedItem.imageUrl}
                    />
                  ) : (
                    <img src={selectedItem.imageUrl} alt="AI Preview" className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" />
                  )}
                </div>
              )}

              {/* Hook */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Hook</span>
                </div>
                <p className="font-semibold">{selectedItem.hook}</p>
              </div>

              {/* Visual Description */}
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Visual Concept</span>
                <p className="text-sm text-muted-foreground">{selectedItem.visual_description}</p>
              </div>

              {/* Reel Video Prompt */}
              {selectedItem.content_type === 'reel' && selectedItem.videoPrompt && (
                <div className="space-y-2 p-3 bg-muted/30 border border-foreground/5 relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-1">
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

              {/* Caption */}
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

              {/* Hashtags */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Hashtags</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(selectedItem.hashtags.join(' '), 'Hashtags')}
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

              {/* Brand Colors */}
              <div className="flex gap-2 pt-2 border-t border-foreground/10">
                {brandProfile.brandColors.map((c, i) => (
                  <div key={i} className="w-8 h-8" style={{ backgroundColor: c }} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentCalendar;
