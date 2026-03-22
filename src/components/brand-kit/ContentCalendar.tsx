import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Copy, Check, Film, Image, Smartphone, Calendar, Hash, Lightbulb } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { BrandProfile, GeneratedContent } from '@/pages/BrandKit';

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
              className="border border-foreground/10 p-5 cursor-pointer hover:border-foreground/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-widest uppercase">{config.label}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {item.schedule_day}
                </div>
              </div>

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
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border border-foreground/10 max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 space-y-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {(() => { const Icon = typeConfig[selectedItem.content_type].icon; return <Icon className="w-5 h-5" />; })()}
                  <span className="font-bold tracking-wider uppercase">{typeConfig[selectedItem.content_type].label}</span>
                  <span className="text-sm text-muted-foreground">· {selectedItem.schedule_day}</span>
                </div>
                <button onClick={() => setSelectedItem(null)} className="text-muted-foreground hover:text-foreground">✕</button>
              </div>

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
