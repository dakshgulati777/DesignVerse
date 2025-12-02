export interface Texture {
  id: string;
  name: string;
  category: string;
  tags: string[];
  thumbnail: string;
  downloads: {
    ai: string;
    psd: string;
    png: string;
  };
}

export const textureCategories = [
  'All',
  'Abstract',
  'Fabric',
  'Wood',
  'Metal',
  'Paper',
  'Stone',
  'Nature',
  'Grunge',
  'Geometric',
  'Watercolor',
  'Gradient',
  'Noise',
  'Vintage',
  'Minimal',
  'Organic',
  'Digital',
  'Concrete',
  'Leather',
  'Glass',
];

// Generate texture URLs based on category
const getTextureImage = (category: string, index: number): string => {
  const unsplashCollections: Record<string, string[]> = {
    Abstract: [
      'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ],
    Fabric: [
      'https://images.unsplash.com/photo-1523380677598-64d85d015339?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    ],
    Wood: [
      'https://images.unsplash.com/photo-1506755594592-349d12a7c52a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    ],
    Metal: [
      'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    ],
    Paper: [
      'https://images.unsplash.com/photo-1506755855567-92ff770e8d00?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1494368308039-ed3393a402a4?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=400&h=400&fit=crop',
    ],
    Stone: [
      'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1494368308039-ed3393a402a4?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ],
    Nature: [
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1484402628941-0bb40fc029e7?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518173946687-a4c036bc4e04?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ],
    Grunge: [
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ],
    Geometric: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ],
    Watercolor: [
      'https://images.unsplash.com/photo-1511992243105-2992b3fd0410?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ],
    Gradient: [
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ],
    Noise: [
      'https://images.unsplash.com/photo-1494368308039-ed3393a402a4?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ],
    Vintage: [
      'https://images.unsplash.com/photo-1506755855567-92ff770e8d00?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1494368308039-ed3393a402a4?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ],
    Minimal: [
      'https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ],
    Organic: [
      'https://images.unsplash.com/photo-1518173946687-a4c036bc4e04?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1484402628941-0bb40fc029e7?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ],
    Digital: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ],
    Concrete: [
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ],
    Leather: [
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1523380677598-64d85d015339?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ],
    Glass: [
      'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    ],
  };

  const images = unsplashCollections[category] || unsplashCollections['Abstract'];
  return images[index % images.length];
};

const textureNames: Record<string, string[]> = {
  Abstract: ['Fluid Motion', 'Color Burst', 'Swirl Dynamics', 'Prismatic Flow', 'Ethereal Waves', 'Dream Cascade', 'Aurora Stream', 'Neon Drift', 'Cosmic Splash', 'Liquid Art'],
  Fabric: ['Silk Weave', 'Cotton Blend', 'Linen Natural', 'Denim Rugged', 'Velvet Soft', 'Canvas Raw', 'Twill Pattern', 'Jersey Knit', 'Wool Texture', 'Satin Smooth'],
  Wood: ['Oak Grain', 'Walnut Rich', 'Pine Light', 'Mahogany Deep', 'Cherry Warm', 'Bamboo Natural', 'Cedar Rustic', 'Teak Classic', 'Birch Clean', 'Maple Smooth'],
  Metal: ['Brushed Steel', 'Copper Patina', 'Bronze Aged', 'Aluminum Clean', 'Gold Foil', 'Silver Shine', 'Iron Rust', 'Titanium Gray', 'Chrome Polish', 'Brass Antique'],
  Paper: ['Kraft Brown', 'Parchment Old', 'Rice Delicate', 'Cardboard Raw', 'Newsprint Vintage', 'Watercolor Wet', 'Cotton Rag', 'Recycled Green', 'Handmade Art', 'Tracing Light'],
  Stone: ['Marble White', 'Granite Speckled', 'Slate Dark', 'Limestone Warm', 'Sandstone Soft', 'Travertine Natural', 'Quartzite Crystal', 'Onyx Deep', 'Basalt Black', 'Terrazzo Mixed'],
  Nature: ['Moss Forest', 'Bark Tree', 'Leaf Pattern', 'Flower Petal', 'Sand Beach', 'Water Ripple', 'Cloud Soft', 'Sky Gradient', 'Grass Green', 'Rock Surface'],
  Grunge: ['Rust Layer', 'Paint Chip', 'Scratch Mark', 'Dust Particle', 'Stain Splash', 'Crack Web', 'Peel Edge', 'Distress Heavy', 'Worn Surface', 'Decay Urban'],
  Geometric: ['Hexagon Grid', 'Triangle Mesh', 'Circle Pattern', 'Square Tile', 'Diamond Array', 'Line Network', 'Polygon Mix', 'Cube 3D', 'Wave Linear', 'Dot Matrix'],
  Watercolor: ['Wash Soft', 'Bleed Edge', 'Splash Free', 'Gradient Blend', 'Stroke Brush', 'Pool Color', 'Wet Effect', 'Dry Brush', 'Layer Mix', 'Tint Light'],
  Gradient: ['Linear Flow', 'Radial Burst', 'Angular Sweep', 'Mesh Complex', 'Duotone Bold', 'Sunset Warm', 'Ocean Cool', 'Forest Deep', 'Neon Bright', 'Pastel Soft'],
  Noise: ['Film Grain', 'Static Fine', 'Sand Fine', 'Speckle Light', 'Dust Heavy', 'Snow Effect', 'Glitch Digital', 'Dither Pattern', 'Halftone Dot', 'Perlin Smooth'],
  Vintage: ['Sepia Tone', 'Faded Photo', 'Aged Paper', 'Retro Print', 'Old Film', 'Antique Worn', 'Classic Grain', 'Heritage Warm', 'Nostalgic Soft', 'Timeless Feel'],
  Minimal: ['White Clean', 'Gray Neutral', 'Black Solid', 'Subtle Line', 'Simple Shape', 'Empty Space', 'Pure Form', 'Quiet Tone', 'Less More', 'Essential Basic'],
  Organic: ['Cell Structure', 'Root Pattern', 'Vein Network', 'Coral Form', 'Shell Spiral', 'Bone Surface', 'Skin Texture', 'Scale Pattern', 'Feather Detail', 'Fur Soft'],
  Digital: ['Pixel Art', 'Glitch Effect', 'Circuit Board', 'Code Matrix', 'Binary Stream', 'Data Viz', 'Scan Line', 'RGB Split', 'Vaporwave', 'Cyber Grid'],
  Concrete: ['Raw Pour', 'Polished Floor', 'Exposed Aggregate', 'Smooth Cast', 'Rough Surface', 'Crack Pattern', 'Stain Mark', 'Industrial Gray', 'Modern Minimal', 'Urban Edge'],
  Leather: ['Full Grain', 'Top Grain', 'Suede Soft', 'Patent Shine', 'Embossed Pattern', 'Distressed Worn', 'Nubuck Smooth', 'Croc Print', 'Ostrich Dot', 'Snake Scale'],
  Glass: ['Frosted Blur', 'Clear Shine', 'Cracked Web', 'Stained Color', 'Textured Wave', 'Mirror Reflect', 'Ice Crystal', 'Bubble Pattern', 'Prism Rainbow', 'Transparent Layer'],
};

const tagsByCategory: Record<string, string[][]> = {
  Abstract: [
    ['fluid', 'motion', 'colorful', 'dynamic'],
    ['burst', 'vibrant', 'explosion', 'energy'],
    ['swirl', 'spiral', 'movement', 'flow'],
    ['prismatic', 'rainbow', 'spectrum', 'light'],
    ['ethereal', 'wave', 'soft', 'dreamy'],
  ],
  Fabric: [
    ['silk', 'smooth', 'luxury', 'elegant'],
    ['cotton', 'natural', 'soft', 'breathable'],
    ['linen', 'organic', 'textured', 'neutral'],
    ['denim', 'rugged', 'casual', 'blue'],
    ['velvet', 'rich', 'plush', 'deep'],
  ],
  Wood: [
    ['oak', 'grain', 'classic', 'strong'],
    ['walnut', 'rich', 'dark', 'premium'],
    ['pine', 'light', 'natural', 'rustic'],
    ['mahogany', 'deep', 'elegant', 'warm'],
    ['cherry', 'warm', 'refined', 'traditional'],
  ],
  Metal: [
    ['steel', 'brushed', 'industrial', 'modern'],
    ['copper', 'patina', 'aged', 'warm'],
    ['bronze', 'antique', 'classic', 'rich'],
    ['aluminum', 'clean', 'lightweight', 'silver'],
    ['gold', 'foil', 'luxury', 'premium'],
  ],
  Paper: [
    ['kraft', 'brown', 'eco', 'natural'],
    ['parchment', 'old', 'vintage', 'classic'],
    ['rice', 'delicate', 'asian', 'thin'],
    ['cardboard', 'raw', 'industrial', 'rough'],
    ['newsprint', 'vintage', 'retro', 'print'],
  ],
  Stone: [
    ['marble', 'white', 'luxury', 'elegant'],
    ['granite', 'speckled', 'durable', 'natural'],
    ['slate', 'dark', 'modern', 'sleek'],
    ['limestone', 'warm', 'soft', 'classic'],
    ['sandstone', 'soft', 'warm', 'natural'],
  ],
  Nature: [
    ['moss', 'green', 'forest', 'organic'],
    ['bark', 'tree', 'brown', 'natural'],
    ['leaf', 'pattern', 'botanical', 'fresh'],
    ['flower', 'petal', 'soft', 'colorful'],
    ['sand', 'beach', 'warm', 'fine'],
  ],
  Grunge: [
    ['rust', 'aged', 'industrial', 'brown'],
    ['paint', 'chip', 'distressed', 'urban'],
    ['scratch', 'worn', 'damaged', 'rough'],
    ['dust', 'particle', 'dirty', 'gritty'],
    ['stain', 'splash', 'messy', 'organic'],
  ],
  Geometric: [
    ['hexagon', 'grid', 'modern', 'tech'],
    ['triangle', 'mesh', 'sharp', 'dynamic'],
    ['circle', 'pattern', 'soft', 'continuous'],
    ['square', 'tile', 'clean', 'structured'],
    ['diamond', 'array', 'elegant', 'pattern'],
  ],
  Watercolor: [
    ['wash', 'soft', 'artistic', 'fluid'],
    ['bleed', 'edge', 'organic', 'natural'],
    ['splash', 'free', 'expressive', 'dynamic'],
    ['gradient', 'blend', 'smooth', 'subtle'],
    ['stroke', 'brush', 'handmade', 'artistic'],
  ],
  Gradient: [
    ['linear', 'flow', 'smooth', 'transition'],
    ['radial', 'burst', 'center', 'expanding'],
    ['angular', 'sweep', 'dramatic', 'bold'],
    ['mesh', 'complex', 'modern', 'colorful'],
    ['duotone', 'bold', 'minimal', 'striking'],
  ],
  Noise: [
    ['film', 'grain', 'vintage', 'analog'],
    ['static', 'fine', 'digital', 'subtle'],
    ['sand', 'fine', 'natural', 'soft'],
    ['speckle', 'light', 'delicate', 'scattered'],
    ['dust', 'heavy', 'gritty', 'rough'],
  ],
  Vintage: [
    ['sepia', 'tone', 'warm', 'nostalgic'],
    ['faded', 'photo', 'aged', 'soft'],
    ['aged', 'paper', 'worn', 'classic'],
    ['retro', 'print', 'colorful', 'fun'],
    ['old', 'film', 'grainy', 'authentic'],
  ],
  Minimal: [
    ['white', 'clean', 'pure', 'simple'],
    ['gray', 'neutral', 'calm', 'modern'],
    ['black', 'solid', 'bold', 'contrast'],
    ['subtle', 'line', 'delicate', 'refined'],
    ['simple', 'shape', 'basic', 'geometric'],
  ],
  Organic: [
    ['cell', 'structure', 'biological', 'natural'],
    ['root', 'pattern', 'network', 'growth'],
    ['vein', 'network', 'connected', 'flow'],
    ['coral', 'form', 'marine', 'complex'],
    ['shell', 'spiral', 'nautical', 'smooth'],
  ],
  Digital: [
    ['pixel', 'art', 'retro', '8bit'],
    ['glitch', 'effect', 'error', 'digital'],
    ['circuit', 'board', 'tech', 'electronic'],
    ['code', 'matrix', 'data', 'programming'],
    ['binary', 'stream', 'digital', 'tech'],
  ],
  Concrete: [
    ['raw', 'pour', 'industrial', 'urban'],
    ['polished', 'floor', 'smooth', 'modern'],
    ['exposed', 'aggregate', 'textured', 'rough'],
    ['smooth', 'cast', 'clean', 'minimal'],
    ['rough', 'surface', 'raw', 'natural'],
  ],
  Leather: [
    ['full', 'grain', 'premium', 'natural'],
    ['top', 'grain', 'quality', 'durable'],
    ['suede', 'soft', 'velvety', 'tactile'],
    ['patent', 'shine', 'glossy', 'fashion'],
    ['embossed', 'pattern', 'decorative', 'textured'],
  ],
  Glass: [
    ['frosted', 'blur', 'privacy', 'soft'],
    ['clear', 'shine', 'transparent', 'clean'],
    ['cracked', 'web', 'broken', 'dramatic'],
    ['stained', 'color', 'artistic', 'decorative'],
    ['textured', 'wave', 'obscure', 'pattern'],
  ],
};

// Generate 1000+ textures
const generateTextures = (): Texture[] => {
  const allTextures: Texture[] = [];
  const categories = textureCategories.filter(c => c !== 'All');
  let id = 1;

  categories.forEach((category) => {
    const names = textureNames[category] || textureNames['Abstract'];
    const tags = tagsByCategory[category] || tagsByCategory['Abstract'];
    
    // Generate ~55 textures per category (19 categories × 55 = 1045 textures)
    for (let i = 0; i < 55; i++) {
      const nameIndex = i % names.length;
      const tagIndex = i % tags.length;
      const variation = Math.floor(i / names.length) + 1;
      const textureName = variation > 1 ? `${names[nameIndex]} V${variation}` : names[nameIndex];
      
      allTextures.push({
        id: String(id++),
        name: textureName,
        category,
        tags: tags[tagIndex],
        thumbnail: getTextureImage(category, i),
        downloads: {
          ai: `/textures/${category.toLowerCase()}/${textureName.toLowerCase().replace(/\s+/g, '-')}.ai`,
          psd: `/textures/${category.toLowerCase()}/${textureName.toLowerCase().replace(/\s+/g, '-')}.psd`,
          png: `/textures/${category.toLowerCase()}/${textureName.toLowerCase().replace(/\s+/g, '-')}.png`,
        },
      });
    }
  });

  return allTextures;
};

export const textures: Texture[] = generateTextures();
