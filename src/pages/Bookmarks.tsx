import { motion } from 'framer-motion';
import { ArrowLeft, Bookmark as BookmarkIcon, Palette, BookOpen, Lightbulb, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/contexts/AuthContext';

const Bookmarks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookmarks, loading, removeBookmark } = useBookmarks();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="glass-card max-w-md w-full text-center">
          <BookmarkIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-4">Sign in to view bookmarks</h2>
          <p className="text-muted-foreground mb-6">
            Create an account to save your favorite palettes, articles, and design fundamentals.
          </p>
          <Button onClick={() => navigate('/auth')} className="btn-primary">
            Sign In
          </Button>
        </Card>
      </div>
    );
  }

  const paletteBookmarks = bookmarks.filter(b => b.item_type === 'palette');
  const blogBookmarks = bookmarks.filter(b => b.item_type === 'blog');
  const fundamentalBookmarks = bookmarks.filter(b => b.item_type === 'fundamental');

  const getIcon = (type: string) => {
    switch (type) {
      case 'palette': return Palette;
      case 'blog': return BookOpen;
      case 'fundamental': return Lightbulb;
      default: return BookmarkIcon;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">My Bookmarks</h1>
              <p className="text-sm text-muted-foreground">
                {bookmarks.length} saved {bookmarks.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        ) : bookmarks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <BookmarkIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">No bookmarks yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring and save your favorite items
            </p>
            <Button onClick={() => navigate('/')} className="btn-primary">
              Explore DesignVerse
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {/* Color Palettes */}
            {paletteBookmarks.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Palette className="w-6 h-6" />
                  Color Palettes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paletteBookmarks.map((bookmark, index) => (
                    <motion.div
                      key={bookmark.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass-card group">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-semibold">{bookmark.item_data.name}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeBookmark('palette', bookmark.item_id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          {bookmark.item_data.colors?.map((color: string, i: number) => (
                            <div
                              key={i}
                              className="flex-1 h-16 rounded-lg transition-transform hover:scale-110"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Blog Articles */}
            {blogBookmarks.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  Blog Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogBookmarks.map((bookmark, index) => (
                    <motion.div
                      key={bookmark.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass-card group">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs text-primary font-medium">
                            {bookmark.item_data.category}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeBookmark('blog', bookmark.item_id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <h3 className="font-semibold mb-2">{bookmark.item_data.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {bookmark.item_data.description}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Design Fundamentals */}
            {fundamentalBookmarks.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6" />
                  Design Fundamentals
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {fundamentalBookmarks.map((bookmark, index) => (
                    <motion.div
                      key={bookmark.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass-card group relative overflow-hidden">
                        <img
                          src={bookmark.item_data.image}
                          alt={bookmark.item_data.name}
                          className="w-full h-32 md:h-40 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-medium text-sm md:text-base mb-2">
                          {bookmark.item_data.name}
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBookmark('fundamental', bookmark.item_id)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
