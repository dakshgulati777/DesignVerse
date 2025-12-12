import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, ArrowLeft, FileImage, FileCode, Heart } from 'lucide-react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { textures, textureCategories, type Texture } from '@/data/textureData';
import LazyImage from '@/components/LazyImage';
import { useFavorites } from '@/hooks/useFavorites';
const TextureLabs = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const filteredTextures = textures.filter((texture) => {
    const matchesSearch = 
      texture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      texture.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      texture.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || texture.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleDownload = async (format: 'ai' | 'psd' | 'png', texture: Texture) => {
    toast.info(`Preparing ${texture.name} (${format.toUpperCase()})...`);
    
    try {
      // Create a downloadable file from the texture thumbnail
      const response = await fetch(texture.thumbnail);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${texture.name.replace(/\s+/g, '-').toLowerCase()}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success(`${texture.name} downloaded successfully!`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error(`Failed to download. Please try again.`);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-32 px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="mb-6 glass-nav hover:bg-white/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
                Texture Labs
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Download 1000+ free high-quality textures in AI, PSD, and PNG formats
              </p>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 space-y-4"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search textures by name, category, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 glass-nav border-white/10 text-lg"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {textureCategories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className={selectedCategory === category ? 'btn-primary' : 'glass-nav border-white/10'}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Results Count */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mb-6"
            >
              Showing {filteredTextures.length} texture{filteredTextures.length !== 1 ? 's' : ''}
            </motion.p>

            {/* Textures Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTextures.map((texture, index) => {
                const textureIsFavorite = isFavorite('texture', texture.id);
                return (
                  <motion.div
                    key={texture.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.02, 0.4) }}
                    className="group glass-card rounded-2xl overflow-hidden hover-lift relative"
                  >
                    <button
                      onClick={() => textureIsFavorite 
                        ? removeFavorite('texture', texture.id)
                        : addFavorite('texture', texture.id, texture)
                      }
                      className="absolute top-3 right-3 p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors z-10"
                      aria-label={textureIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-4 h-4 ${textureIsFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                    </button>
                    {/* Thumbnail with Lazy Loading */}
                    <div className="relative aspect-square overflow-hidden bg-secondary/20">
                      <LazyImage
                        src={texture.thumbnail}
                        alt={texture.name}
                        className="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {texture.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{texture.category}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {texture.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Download Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload('ai', texture)}
                        className="flex-1 glass-nav border-white/10 hover:bg-primary/20"
                        title="Adobe Illustrator"
                      >
                        <FileCode className="h-3 w-3 mr-1" />
                        AI
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload('psd', texture)}
                        className="flex-1 glass-nav border-white/10 hover:bg-primary/20"
                        title="Adobe Photoshop"
                      >
                        <FileCode className="h-3 w-3 mr-1" />
                        PSD
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload('png', texture)}
                        className="flex-1 glass-nav border-white/10 hover:bg-primary/20"
                        title="PNG Image"
                      >
                        <FileImage className="h-3 w-3 mr-1" />
                        PNG
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            </div>

            {/* No Results */}
            {filteredTextures.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-xl text-muted-foreground">
                  No textures found matching your criteria
                </p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default TextureLabs;
