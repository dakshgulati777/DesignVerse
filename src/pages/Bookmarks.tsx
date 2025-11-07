import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Palette, BookOpen, GraduationCap, Trash2, ArrowLeft, Copy, Check, Share2 } from 'lucide-react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DesignPrinciplesDetailed from '@/components/DesignPrinciplesDetailed';
import { toast } from 'sonner';

const Bookmarks = () => {
  const { bookmarks, loading, removeBookmark } = useBookmarks();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPrinciple, setSelectedPrinciple] = useState<any>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      toast.success(`Copied ${color}!`);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      toast.error('Failed to copy color');
    }
  };

  const shareItem = async (itemType: string, itemData: any) => {
    const shareText = itemType === 'palette' 
      ? `Check out this color palette: ${itemData.name} - ${itemData.colors.join(', ')}`
      : itemType === 'blog'
      ? `Read this article: ${itemData.title}`
      : `Learn about: ${itemData.title}`;

    const shareUrl = window.location.origin;

    if (navigator.share) {
      try {
        await navigator.share({
          title: itemData.name || itemData.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      toast.success('Copied to clipboard!');
    }
  };

  if (!user) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <div className="flex items-center justify-center min-h-screen px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold mb-4">Please Sign In</h1>
              <p className="text-muted-foreground mb-6">
                You need to be signed in to view your bookmarks
              </p>
              <Button onClick={() => navigate('/auth')} className="btn-primary">
                Sign In
              </Button>
            </motion.div>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  const paletteBookmarks = bookmarks.filter((b) => b.item_type === 'palette');
  const blogBookmarks = bookmarks.filter((b) => b.item_type === 'blog');
  const fundamentalBookmarks = bookmarks.filter((b) => b.item_type === 'fundamental');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-32 px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 glass-nav mb-6">
                <Bookmark className="w-5 h-5 text-primary" />
                <span className="font-medium">Your Bookmarks</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Saved <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Collection</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                All your favorite items in one place
              </p>
            </motion.div>

            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
              </div>
            ) : bookmarks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <Bookmark className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
                <h2 className="text-2xl font-bold mb-4">No bookmarks yet</h2>
                <p className="text-muted-foreground mb-8">
                  Start exploring and bookmark your favorite palettes, articles, and fundamentals
                </p>
                <Button onClick={() => navigate('/')} className="btn-primary">
                  Explore DesignVerse
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-16">
                {/* Color Palettes */}
                {paletteBookmarks.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-8">
                      <Palette className="w-6 h-6 text-primary" />
                      <h2 className="text-3xl font-bold">Color Palettes ({paletteBookmarks.length})</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paletteBookmarks.map((bookmark) => (
                        <motion.div
                          key={bookmark.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="glass-card group hover:shadow-2xl hover:shadow-primary/20 transition-all"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-semibold">{bookmark.item_data?.name}</h3>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => shareItem('palette', bookmark.item_data)}
                                className="hover:text-primary"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeBookmark(bookmark.item_type, bookmark.item_id)}
                                className="hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-5 gap-2">
                            {bookmark.item_data?.colors?.map((color: string, i: number) => (
                              <motion.div
                                key={i}
                                className="relative group/color cursor-pointer overflow-hidden rounded-lg"
                                whileHover={{ scale: 1.1, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => copyColor(color)}
                              >
                                <div
                                  className="h-16 rounded-lg shadow-lg transition-all"
                                  style={{ backgroundColor: color }}
                                />
                                <motion.div 
                                  className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center text-white text-xs"
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                >
                                  {copiedColor === color ? (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="flex flex-col items-center"
                                    >
                                      <Check className="w-4 h-4 mb-1 text-green-400" />
                                      <span className="text-green-400">Copied!</span>
                                    </motion.div>
                                  ) : (
                                    <>
                                      <Copy className="w-4 h-4 mb-1" />
                                      <span className="font-mono">{color}</span>
                                    </>
                                  )}
                                </motion.div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Blog Articles */}
                {blogBookmarks.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-8">
                      <BookOpen className="w-6 h-6 text-primary" />
                      <h2 className="text-3xl font-bold">Blog Articles ({blogBookmarks.length})</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {blogBookmarks.map((bookmark) => (
                        <motion.div
                          key={bookmark.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="glass-card group hover:shadow-2xl hover:shadow-primary/20 transition-all"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{bookmark.item_data?.title}</h3>
                              <p className="text-sm text-muted-foreground">{bookmark.item_data?.description}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => shareItem('blog', bookmark.item_data)}
                                className="hover:text-primary"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeBookmark(bookmark.item_type, bookmark.item_id)}
                                className="hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Fundamentals */}
                {fundamentalBookmarks.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-8">
                      <GraduationCap className="w-6 h-6 text-primary" />
                      <h2 className="text-3xl font-bold">Design Fundamentals ({fundamentalBookmarks.length})</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {fundamentalBookmarks.map((bookmark) => (
                        <motion.div
                          key={bookmark.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="glass-card group hover:shadow-2xl hover:shadow-primary/20 transition-all cursor-pointer"
                          onClick={() => setSelectedPrinciple(bookmark.item_data)}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg">{bookmark.item_data?.title}</h3>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  shareItem('fundamental', bookmark.item_data);
                                }}
                                className="hover:text-primary"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeBookmark(bookmark.item_type, bookmark.item_id);
                                }}
                                className="hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          {bookmark.item_data?.category && (
                            <span className="inline-block mt-2 text-xs text-muted-foreground bg-background/20 px-3 py-1 rounded-full border border-border/20">
                              {bookmark.item_data.category}
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Fundamental Details Modal */}
        <AnimatePresence>
          {selectedPrinciple && (
            <DesignPrinciplesDetailed
              principle={selectedPrinciple}
              onClose={() => setSelectedPrinciple(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

export default Bookmarks;
