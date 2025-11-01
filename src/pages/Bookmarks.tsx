import { motion } from 'framer-motion';
import { Bookmark, Palette, BookOpen, GraduationCap, Trash2 } from 'lucide-react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Bookmarks = () => {
  const { bookmarks, loading, removeBookmark } = useBookmarks();
  const { user } = useAuth();
  const navigate = useNavigate();

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
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBookmark(bookmark.item_type, bookmark.item_id)}
                              className="hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-5 gap-2">
                            {bookmark.item_data?.colors?.map((color: string, i: number) => (
                              <div
                                key={i}
                                className="h-16 rounded-lg"
                                style={{ backgroundColor: color }}
                              />
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
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBookmark(bookmark.item_type, bookmark.item_id)}
                              className="hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
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
                          className="glass-card group hover:shadow-2xl hover:shadow-primary/20 transition-all"
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg">{bookmark.item_data?.title}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBookmark(bookmark.item_type, bookmark.item_id)}
                              className="hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Bookmarks;
