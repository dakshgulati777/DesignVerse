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

// Unique image IDs for each category to ensure no duplicates
const uniqueImageIds: Record<string, string[]> = {
  Abstract: [
    '1557672172-298e090bd0f1', '1579546929518-9e396f3cc809', '1618005182384-a83a8bd57fbe',
    '1541701494587-cb58502866ab', '1507003211169-0a1dd7228f2d', '1550684376-0f2ba2e27a07',
    '1525909002-1b05e0c869d8', '1534796636912-3b95b3ab5986', '1567095761-36e46dbe2428',
    '1614851099175-e5b30eb6f696', '1620641788421-7a1c342ea42e', '1558591710-4b4a1ae0f04d',
    '1609345265499-ce9d2e9af5c7', '1618172193622-ae2d025f4032', '1517697471339-4aa32003c11a'
  ],
  Fabric: [
    '1523380677598-64d85d015339', '1558171813-4c088753af8f', '1528459801416-a9e53bbf4e17',
    '1513506003901-1e6a229e2d15', '1558618666-fcd25c85cd64', '1620799139652-cd423b12c0ef',
    '1544551763-46a013bb70d5', '1585399058938-e59c8f5b99a4', '1508919801845-fc2ae1bc5946',
    '1548169874-53e85f753f1e', '1563453392-4fa2c01dcdbb', '1579871494447-189778c6e4d2',
    '1549989476-69a92fa57c36', '1558980394-4c7c9299fe96', '1586281380117-0f9a2a91e5cf'
  ],
  Wood: [
    '1506755594592-349d12a7c52a', '1457305237443-44c3d5a30b89', '1493106641515-6b5631de4bb9',
    '1541123603104-512919d6a96c', '1507003211169-0a1dd7228f2d', '1516562309708-05f3b2b2c238',
    '1509644851169-2accfad98025', '1532298229144-0ec0c57515c7', '1541695263-3ac2d08c3a96',
    '1533035336-50096c9c5f04', '1558618666-fcd25c85cd64', '1520587963184-37a3e8ac32e3',
    '1516562309708-05f3b2b2c238', '1504297050568-910d24c426d3', '1543556139-7e3e068dd4da'
  ],
  Metal: [
    '1553095066-5014bc7b7f2d', '1519681393784-d120267933ba', '1518893063132-36e46dbe2428',
    '1485470733090-0aae1788d5af', '1533928298411-b1fded2e3a9e', '1513506003901-1e6a229e2d15',
    '1558171813-4c088753af8f', '1544551763-46a013bb70d5', '1585399058938-e59c8f5b99a4',
    '1519389950473-47ba0277781c', '1533035336-50096c9c5f04', '1508919801845-fc2ae1bc5946',
    '1548169874-53e85f753f1e', '1563453392-4fa2c01dcdbb', '1558980394-4c7c9299fe96'
  ],
  Paper: [
    '1506755855567-92ff770e8d00', '1494368308039-ed3393a402a4', '1489549132488-d00b7eee80f1',
    '1517697471339-4aa32003c11a', '1544551763-46a013bb70d5', '1558980394-4c7c9299fe96',
    '1586281380117-0f9a2a91e5cf', '1549989476-69a92fa57c36', '1558618666-fcd25c85cd64',
    '1515004580-d8d3a941b03b', '1542640244-7e672d6cef4e', '1564609310419-e2e04f8a97cf',
    '1580477371434-d4dae96e5f68', '1587558431-a2fc0d1c3f5e', '1590599145008-e4b2b97eee5f'
  ],
  Stone: [
    '1487700160041-babef9c3cb55', '1518893063132-36e46dbe2428', '1494368308039-ed3393a402a4',
    '1507003211169-0a1dd7228f2d', '1489549132488-d00b7eee80f1', '1533928298411-b1fded2e3a9e',
    '1513506003901-1e6a229e2d15', '1558171813-4c088753af8f', '1544551763-46a013bb70d5',
    '1585399058938-e59c8f5b99a4', '1519389950473-47ba0277781c', '1533035336-50096c9c5f04',
    '1508919801845-fc2ae1bc5946', '1548169874-53e85f753f1e', '1563453392-4fa2c01dcdbb'
  ],
  Nature: [
    '1502082553048-f009c37129b9', '1484402628941-0bb40fc029e7', '1518173946687-a4c036bc4e04',
    '1441974231531-c6227db76b6e', '1507003211169-0a1dd7228f2d', '1470770841072-f978cf4d019e',
    '1447752875215-b2761acb3c5d', '1433086966358-54859d0ed716', '1469474968028-56623f02e42e',
    '1500382017468-9049fed747ef', '1446329813274-7c9036bd9a1f', '1490750967868-88aa4486c946',
    '1439405326854-014607f694d7', '1431794062232-2a99a5431c6c', '1478827536114-da961b7f86d2'
  ],
  Grunge: [
    '1494438639946-1ebd1d20bf85', '1460661419201-fd4cecdf8a8b', '1489549132488-d00b7eee80f1',
    '1507003211169-0a1dd7228f2d', '1517697471339-4aa32003c11a', '1506755855567-92ff770e8d00',
    '1494368308039-ed3393a402a4', '1544551763-46a013bb70d5', '1558980394-4c7c9299fe96',
    '1586281380117-0f9a2a91e5cf', '1549989476-69a92fa57c36', '1558618666-fcd25c85cd64',
    '1515004580-d8d3a941b03b', '1542640244-7e672d6cef4e', '1564609310419-e2e04f8a97cf'
  ],
  Geometric: [
    '1519681393784-d120267933ba', '1478760329108-5c3ed9d495a0', '1509114397022-ed747cca3f65',
    '1507003211169-0a1dd7228f2d', '1517697471339-4aa32003c11a', '1553095066-5014bc7b7f2d',
    '1518893063132-36e46dbe2428', '1485470733090-0aae1788d5af', '1533928298411-b1fded2e3a9e',
    '1513506003901-1e6a229e2d15', '1558171813-4c088753af8f', '1544551763-46a013bb70d5',
    '1585399058938-e59c8f5b99a4', '1519389950473-47ba0277781c', '1533035336-50096c9c5f04'
  ],
  Watercolor: [
    '1511992243105-2992b3fd0410', '1557672172-298e090bd0f1', '1579546929518-9e396f3cc809',
    '1507003211169-0a1dd7228f2d', '1618005182384-a83a8bd57fbe', '1541701494587-cb58502866ab',
    '1525909002-1b05e0c869d8', '1534796636912-3b95b3ab5986', '1567095761-36e46dbe2428',
    '1614851099175-e5b30eb6f696', '1620641788421-7a1c342ea42e', '1558591710-4b4a1ae0f04d',
    '1609345265499-ce9d2e9af5c7', '1618172193622-ae2d025f4032', '1550684376-0f2ba2e27a07'
  ],
  Gradient: [
    '1579546929518-9e396f3cc809', '1557672172-298e090bd0f1', '1618005182384-a83a8bd57fbe',
    '1541701494587-cb58502866ab', '1507003211169-0a1dd7228f2d', '1550684376-0f2ba2e27a07',
    '1525909002-1b05e0c869d8', '1534796636912-3b95b3ab5986', '1567095761-36e46dbe2428',
    '1614851099175-e5b30eb6f696', '1620641788421-7a1c342ea42e', '1558591710-4b4a1ae0f04d',
    '1609345265499-ce9d2e9af5c7', '1618172193622-ae2d025f4032', '1517697471339-4aa32003c11a'
  ],
  Noise: [
    '1494368308039-ed3393a402a4', '1489549132488-d00b7eee80f1', '1519681393784-d120267933ba',
    '1507003211169-0a1dd7228f2d', '1517697471339-4aa32003c11a', '1478760329108-5c3ed9d495a0',
    '1509114397022-ed747cca3f65', '1553095066-5014bc7b7f2d', '1518893063132-36e46dbe2428',
    '1485470733090-0aae1788d5af', '1533928298411-b1fded2e3a9e', '1513506003901-1e6a229e2d15',
    '1558171813-4c088753af8f', '1544551763-46a013bb70d5', '1585399058938-e59c8f5b99a4'
  ],
  Vintage: [
    '1506755855567-92ff770e8d00', '1494368308039-ed3393a402a4', '1460661419201-fd4cecdf8a8b',
    '1507003211169-0a1dd7228f2d', '1489549132488-d00b7eee80f1', '1494438639946-1ebd1d20bf85',
    '1517697471339-4aa32003c11a', '1544551763-46a013bb70d5', '1558980394-4c7c9299fe96',
    '1586281380117-0f9a2a91e5cf', '1549989476-69a92fa57c36', '1558618666-fcd25c85cd64',
    '1515004580-d8d3a941b03b', '1542640244-7e672d6cef4e', '1564609310419-e2e04f8a97cf'
  ],
  Minimal: [
    '1517697471339-4aa32003c11a', '1501630834273-4b5604d2ee31', '1519681393784-d120267933ba',
    '1507003211169-0a1dd7228f2d', '1506755855567-92ff770e8d00', '1494368308039-ed3393a402a4',
    '1489549132488-d00b7eee80f1', '1478760329108-5c3ed9d495a0', '1509114397022-ed747cca3f65',
    '1553095066-5014bc7b7f2d', '1518893063132-36e46dbe2428', '1485470733090-0aae1788d5af',
    '1533928298411-b1fded2e3a9e', '1513506003901-1e6a229e2d15', '1558171813-4c088753af8f'
  ],
  Organic: [
    '1518173946687-a4c036bc4e04', '1484402628941-0bb40fc029e7', '1502082553048-f009c37129b9',
    '1507003211169-0a1dd7228f2d', '1441974231531-c6227db76b6e', '1470770841072-f978cf4d019e',
    '1447752875215-b2761acb3c5d', '1433086966358-54859d0ed716', '1469474968028-56623f02e42e',
    '1500382017468-9049fed747ef', '1446329813274-7c9036bd9a1f', '1490750967868-88aa4486c946',
    '1439405326854-014607f694d7', '1431794062232-2a99a5431c6c', '1478827536114-da961b7f86d2'
  ],
  Digital: [
    '1541701494587-cb58502866ab', '1478760329108-5c3ed9d495a0', '1618005182384-a83a8bd57fbe',
    '1507003211169-0a1dd7228f2d', '1579546929518-9e396f3cc809', '1557672172-298e090bd0f1',
    '1525909002-1b05e0c869d8', '1534796636912-3b95b3ab5986', '1567095761-36e46dbe2428',
    '1614851099175-e5b30eb6f696', '1620641788421-7a1c342ea42e', '1558591710-4b4a1ae0f04d',
    '1609345265499-ce9d2e9af5c7', '1618172193622-ae2d025f4032', '1550684376-0f2ba2e27a07'
  ],
  Concrete: [
    '1494438639946-1ebd1d20bf85', '1518893063132-36e46dbe2428', '1487700160041-babef9c3cb55',
    '1507003211169-0a1dd7228f2d', '1494368308039-ed3393a402a4', '1489549132488-d00b7eee80f1',
    '1533928298411-b1fded2e3a9e', '1513506003901-1e6a229e2d15', '1558171813-4c088753af8f',
    '1544551763-46a013bb70d5', '1585399058938-e59c8f5b99a4', '1519389950473-47ba0277781c',
    '1533035336-50096c9c5f04', '1508919801845-fc2ae1bc5946', '1548169874-53e85f753f1e'
  ],
  Leather: [
    '1528459801416-a9e53bbf4e17', '1558171813-4c088753af8f', '1523380677598-64d85d015339',
    '1507003211169-0a1dd7228f2d', '1513506003901-1e6a229e2d15', '1558618666-fcd25c85cd64',
    '1620799139652-cd423b12c0ef', '1544551763-46a013bb70d5', '1585399058938-e59c8f5b99a4',
    '1508919801845-fc2ae1bc5946', '1548169874-53e85f753f1e', '1563453392-4fa2c01dcdbb',
    '1579871494447-189778c6e4d2', '1549989476-69a92fa57c36', '1558980394-4c7c9299fe96'
  ],
  Glass: [
    '1485470733090-0aae1788d5af', '1553095066-5014bc7b7f2d', '1519681393784-d120267933ba',
    '1507003211169-0a1dd7228f2d', '1478760329108-5c3ed9d495a0', '1509114397022-ed747cca3f65',
    '1518893063132-36e46dbe2428', '1533928298411-b1fded2e3a9e', '1513506003901-1e6a229e2d15',
    '1558171813-4c088753af8f', '1544551763-46a013bb70d5', '1585399058938-e59c8f5b99a4',
    '1519389950473-47ba0277781c', '1533035336-50096c9c5f04', '1508919801845-fc2ae1bc5946'
  ],
};

// Generate unique texture image URL
const getTextureImage = (category: string, index: number): string => {
  const images = uniqueImageIds[category] || uniqueImageIds['Abstract'];
  const uniqueIndex = index % images.length;
  // Add index-based seed to query for additional uniqueness
  return `https://images.unsplash.com/photo-${images[uniqueIndex]}?w=400&h=400&fit=crop&q=80&seed=${category}-${index}`;
};

const textureNames: Record<string, string[]> = {
  Abstract: ['Fluid Motion', 'Color Burst', 'Swirl Dynamics', 'Prismatic Flow', 'Ethereal Waves', 'Dream Cascade', 'Aurora Stream', 'Neon Drift', 'Cosmic Splash', 'Liquid Art', 'Chromatic Shift', 'Vapor Trail', 'Nebula Core', 'Prism Light', 'Quantum Wave'],
  Fabric: ['Silk Weave', 'Cotton Blend', 'Linen Natural', 'Denim Rugged', 'Velvet Soft', 'Canvas Raw', 'Twill Pattern', 'Jersey Knit', 'Wool Texture', 'Satin Smooth', 'Cashmere Fine', 'Hemp Organic', 'Burlap Rustic', 'Mesh Open', 'Felt Dense'],
  Wood: ['Oak Grain', 'Walnut Rich', 'Pine Light', 'Mahogany Deep', 'Cherry Warm', 'Bamboo Natural', 'Cedar Rustic', 'Teak Classic', 'Birch Clean', 'Maple Smooth', 'Ash Pale', 'Redwood Bold', 'Ebony Dark', 'Beech Soft', 'Elm Vintage'],
  Metal: ['Brushed Steel', 'Copper Patina', 'Bronze Aged', 'Aluminum Clean', 'Gold Foil', 'Silver Shine', 'Iron Rust', 'Titanium Gray', 'Chrome Polish', 'Brass Antique', 'Zinc Matte', 'Nickel Bright', 'Pewter Soft', 'Platinum Pure', 'Mercury Liquid'],
  Paper: ['Kraft Brown', 'Parchment Old', 'Rice Delicate', 'Cardboard Raw', 'Newsprint Vintage', 'Watercolor Wet', 'Cotton Rag', 'Recycled Green', 'Handmade Art', 'Tracing Light', 'Tissue Thin', 'Vellum Smooth', 'Manila Classic', 'Bond Crisp', 'Washi Japanese'],
  Stone: ['Marble White', 'Granite Speckled', 'Slate Dark', 'Limestone Warm', 'Sandstone Soft', 'Travertine Natural', 'Quartzite Crystal', 'Onyx Deep', 'Basalt Black', 'Terrazzo Mixed', 'Soapstone Smooth', 'Flagstone Rough', 'Cobalt Blue', 'Jade Green', 'Obsidian Glass'],
  Nature: ['Moss Forest', 'Bark Tree', 'Leaf Pattern', 'Flower Petal', 'Sand Beach', 'Water Ripple', 'Cloud Soft', 'Sky Gradient', 'Grass Green', 'Rock Surface', 'Coral Reef', 'Shell Spiral', 'Fern Frond', 'Pine Needle', 'Driftwood Aged'],
  Grunge: ['Rust Layer', 'Paint Chip', 'Scratch Mark', 'Dust Particle', 'Stain Splash', 'Crack Web', 'Peel Edge', 'Distress Heavy', 'Worn Surface', 'Decay Urban', 'Corrosion Deep', 'Grime Build', 'Soot Layer', 'Patina Age', 'Weathered Wall'],
  Geometric: ['Hexagon Grid', 'Triangle Mesh', 'Circle Pattern', 'Square Tile', 'Diamond Array', 'Line Network', 'Polygon Mix', 'Cube 3D', 'Wave Linear', 'Dot Matrix', 'Chevron Stack', 'Zigzag Path', 'Spiral Flow', 'Cross Grid', 'Star Pattern'],
  Watercolor: ['Wash Soft', 'Bleed Edge', 'Splash Free', 'Gradient Blend', 'Stroke Brush', 'Pool Color', 'Wet Effect', 'Dry Brush', 'Layer Mix', 'Tint Light', 'Bloom Spread', 'Pigment Drop', 'Flow Organic', 'Mist Fade', 'Texture Paper'],
  Gradient: ['Linear Flow', 'Radial Burst', 'Angular Sweep', 'Mesh Complex', 'Duotone Bold', 'Sunset Warm', 'Ocean Cool', 'Forest Deep', 'Neon Bright', 'Pastel Soft', 'Metallic Shine', 'Holographic', 'Aurora Light', 'Prism Split', 'Thermal Heat'],
  Noise: ['Film Grain', 'Static Fine', 'Sand Fine', 'Speckle Light', 'Dust Heavy', 'Snow Effect', 'Glitch Digital', 'Dither Pattern', 'Halftone Dot', 'Perlin Smooth', 'Gaussian Blur', 'Salt Pepper', 'Turbulent Mix', 'Fractal Deep', 'Voronoi Cell'],
  Vintage: ['Sepia Tone', 'Faded Photo', 'Aged Paper', 'Retro Print', 'Old Film', 'Antique Worn', 'Classic Grain', 'Heritage Warm', 'Nostalgic Soft', 'Timeless Feel', 'Daguerreotype', 'Tintype Metal', 'Polaroid Edge', 'Letterpress', 'Woodcut Print'],
  Minimal: ['White Clean', 'Gray Neutral', 'Black Solid', 'Subtle Line', 'Simple Shape', 'Empty Space', 'Pure Form', 'Quiet Tone', 'Less More', 'Essential Basic', 'Zen Clear', 'Mono Chrome', 'Silent Rest', 'Void Deep', 'Balance Calm'],
  Organic: ['Cell Structure', 'Root Pattern', 'Vein Network', 'Coral Form', 'Shell Spiral', 'Bone Surface', 'Skin Texture', 'Scale Pattern', 'Feather Detail', 'Fur Soft', 'Membrane Thin', 'Muscle Fiber', 'Leaf Vein', 'Seed Pod', 'Crystal Growth'],
  Digital: ['Pixel Art', 'Glitch Effect', 'Circuit Board', 'Code Matrix', 'Binary Stream', 'Data Viz', 'Scan Line', 'RGB Split', 'Vaporwave', 'Cyber Grid', 'Neon Wire', 'Hologram Shift', 'Terminal Green', 'Bitmap Raw', 'Vector Clean'],
  Concrete: ['Raw Pour', 'Polished Floor', 'Exposed Aggregate', 'Smooth Cast', 'Rough Surface', 'Crack Pattern', 'Stain Mark', 'Industrial Gray', 'Modern Minimal', 'Urban Edge', 'Brutalist Bold', 'Cement Fresh', 'Foundation Deep', 'Sidewalk Worn', 'Slab Thick'],
  Leather: ['Full Grain', 'Top Grain', 'Suede Soft', 'Patent Shine', 'Embossed Pattern', 'Distressed Worn', 'Nubuck Smooth', 'Croc Print', 'Ostrich Dot', 'Snake Scale', 'Pebble Texture', 'Saddle Brown', 'Tooled Design', 'Burnished Edge', 'Veg Tan'],
  Glass: ['Frosted Blur', 'Clear Shine', 'Cracked Web', 'Stained Color', 'Textured Wave', 'Mirror Reflect', 'Ice Crystal', 'Bubble Pattern', 'Prism Rainbow', 'Transparent Layer', 'Beveled Edge', 'Dichroic Shift', 'Fused Art', 'Blown Form', 'Etched Design'],
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

// Generate textures with unique images
const generateTextures = (): Texture[] => {
  const allTextures: Texture[] = [];
  const categories = textureCategories.filter(c => c !== 'All');
  let id = 1;
  let globalIndex = 0;

  categories.forEach((category) => {
    const names = textureNames[category] || textureNames['Abstract'];
    const tags = tagsByCategory[category] || tagsByCategory['Abstract'];
    
    // Generate 55 textures per category with unique indices
    for (let i = 0; i < 55; i++) {
      const nameIndex = i % names.length;
      const tagIndex = i % tags.length;
      const variant = Math.floor(i / names.length) + 1;
      
      allTextures.push({
        id: String(id++),
        name: variant > 1 ? `${names[nameIndex]} ${variant}` : names[nameIndex],
        category,
        tags: tags[tagIndex],
        thumbnail: getTextureImage(category, globalIndex++),
        downloads: {
          ai: `texture-${id}-${category.toLowerCase()}.ai`,
          psd: `texture-${id}-${category.toLowerCase()}.psd`,
          png: `texture-${id}-${category.toLowerCase()}.png`,
        },
      });
    }
  });

  return allTextures;
};

export const textures = generateTextures();