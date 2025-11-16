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
];

// Sample texture data - in production, this would come from a database
export const textures: Texture[] = [
  {
    id: '1',
    name: 'Abstract Gradient Flow',
    category: 'Abstract',
    tags: ['gradient', 'smooth', 'modern', 'colorful'],
    thumbnail: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/abstract-gradient.ai',
      psd: '/textures/abstract-gradient.psd',
      png: '/textures/abstract-gradient.png',
    },
  },
  {
    id: '2',
    name: 'Denim Fabric',
    category: 'Fabric',
    tags: ['denim', 'texture', 'blue', 'fabric'],
    thumbnail: 'https://images.unsplash.com/photo-1523380677598-64d85d015339?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/denim-fabric.ai',
      psd: '/textures/denim-fabric.psd',
      png: '/textures/denim-fabric.png',
    },
  },
  {
    id: '3',
    name: 'Dark Wood Grain',
    category: 'Wood',
    tags: ['wood', 'grain', 'dark', 'natural'],
    thumbnail: 'https://images.unsplash.com/photo-1506755594592-349d12a7c52a?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/dark-wood.ai',
      psd: '/textures/dark-wood.psd',
      png: '/textures/dark-wood.png',
    },
  },
  {
    id: '4',
    name: 'Brushed Metal',
    category: 'Metal',
    tags: ['metal', 'brushed', 'silver', 'industrial'],
    thumbnail: 'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/brushed-metal.ai',
      psd: '/textures/brushed-metal.psd',
      png: '/textures/brushed-metal.png',
    },
  },
  {
    id: '5',
    name: 'Vintage Paper',
    category: 'Paper',
    tags: ['paper', 'vintage', 'aged', 'beige'],
    thumbnail: 'https://images.unsplash.com/photo-1506755855567-92ff770e8d00?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/vintage-paper.ai',
      psd: '/textures/vintage-paper.psd',
      png: '/textures/vintage-paper.png',
    },
  },
  {
    id: '6',
    name: 'Marble Surface',
    category: 'Stone',
    tags: ['marble', 'stone', 'luxury', 'white'],
    thumbnail: 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/marble-surface.ai',
      psd: '/textures/marble-surface.psd',
      png: '/textures/marble-surface.png',
    },
  },
  {
    id: '7',
    name: 'Leaf Pattern',
    category: 'Nature',
    tags: ['nature', 'leaves', 'green', 'organic'],
    thumbnail: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/leaf-pattern.ai',
      psd: '/textures/leaf-pattern.psd',
      png: '/textures/leaf-pattern.png',
    },
  },
  {
    id: '8',
    name: 'Urban Grunge',
    category: 'Grunge',
    tags: ['grunge', 'urban', 'rough', 'distressed'],
    thumbnail: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/urban-grunge.ai',
      psd: '/textures/urban-grunge.psd',
      png: '/textures/urban-grunge.png',
    },
  },
  {
    id: '9',
    name: 'Geometric Lines',
    category: 'Geometric',
    tags: ['geometric', 'lines', 'modern', 'abstract'],
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/geometric-lines.ai',
      psd: '/textures/geometric-lines.psd',
      png: '/textures/geometric-lines.png',
    },
  },
  {
    id: '10',
    name: 'Cotton Canvas',
    category: 'Fabric',
    tags: ['fabric', 'canvas', 'cotton', 'neutral'],
    thumbnail: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/cotton-canvas.ai',
      psd: '/textures/cotton-canvas.psd',
      png: '/textures/cotton-canvas.png',
    },
  },
  {
    id: '11',
    name: 'Rustic Wood Planks',
    category: 'Wood',
    tags: ['wood', 'rustic', 'planks', 'brown'],
    thumbnail: 'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/rustic-wood.ai',
      psd: '/textures/rustic-wood.psd',
      png: '/textures/rustic-wood.png',
    },
  },
  {
    id: '12',
    name: 'Copper Patina',
    category: 'Metal',
    tags: ['copper', 'patina', 'aged', 'green'],
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/copper-patina.ai',
      psd: '/textures/copper-patina.psd',
      png: '/textures/copper-patina.png',
    },
  },
  {
    id: '13',
    name: 'Watercolor Splash',
    category: 'Abstract',
    tags: ['watercolor', 'artistic', 'splash', 'colorful'],
    thumbnail: 'https://images.unsplash.com/photo-1511992243105-2992b3fd0410?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/watercolor-splash.ai',
      psd: '/textures/watercolor-splash.psd',
      png: '/textures/watercolor-splash.png',
    },
  },
  {
    id: '14',
    name: 'Recycled Paper',
    category: 'Paper',
    tags: ['paper', 'recycled', 'eco', 'textured'],
    thumbnail: 'https://images.unsplash.com/photo-1494368308039-ed3393a402a4?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/recycled-paper.ai',
      psd: '/textures/recycled-paper.psd',
      png: '/textures/recycled-paper.png',
    },
  },
  {
    id: '15',
    name: 'Granite Rock',
    category: 'Stone',
    tags: ['granite', 'rock', 'stone', 'speckled'],
    thumbnail: 'https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/granite-rock.ai',
      psd: '/textures/granite-rock.psd',
      png: '/textures/granite-rock.png',
    },
  },
  {
    id: '16',
    name: 'Forest Moss',
    category: 'Nature',
    tags: ['moss', 'forest', 'green', 'organic'],
    thumbnail: 'https://images.unsplash.com/photo-1484402628941-0bb40fc029e7?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/forest-moss.ai',
      psd: '/textures/forest-moss.psd',
      png: '/textures/forest-moss.png',
    },
  },
  {
    id: '17',
    name: 'Paint Splatter',
    category: 'Grunge',
    tags: ['paint', 'splatter', 'artistic', 'messy'],
    thumbnail: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/paint-splatter.ai',
      psd: '/textures/paint-splatter.psd',
      png: '/textures/paint-splatter.png',
    },
  },
  {
    id: '18',
    name: 'Hexagon Grid',
    category: 'Geometric',
    tags: ['hexagon', 'grid', 'pattern', 'modern'],
    thumbnail: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/hexagon-grid.ai',
      psd: '/textures/hexagon-grid.psd',
      png: '/textures/hexagon-grid.png',
    },
  },
  {
    id: '19',
    name: 'Silk Fabric',
    category: 'Fabric',
    tags: ['silk', 'fabric', 'smooth', 'luxury'],
    thumbnail: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/silk-fabric.ai',
      psd: '/textures/silk-fabric.psd',
      png: '/textures/silk-fabric.png',
    },
  },
  {
    id: '20',
    name: 'Bamboo Pattern',
    category: 'Wood',
    tags: ['bamboo', 'wood', 'asian', 'natural'],
    thumbnail: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=400&h=400&fit=crop',
    downloads: {
      ai: '/textures/bamboo-pattern.ai',
      psd: '/textures/bamboo-pattern.psd',
      png: '/textures/bamboo-pattern.png',
    },
  },
];
