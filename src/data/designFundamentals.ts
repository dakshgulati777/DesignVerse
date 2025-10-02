import { 
  Eye, Zap, Layers, Minimize2, Palette, Type, Layout, 
  Image, Briefcase, Users, Monitor, Lightbulb, Code, Sparkles, Target, 
  Cpu, Grid, Circle, Square, Hexagon, Triangle, Smartphone, Tablet,
  PenTool, Crop, Sliders, Camera, FileText, BookOpen, Folder, Star,
  Compass, Ruler, Pencil, Paintbrush, Droplet, Sun, Moon, Contrast as ContrastIcon,
  AlignLeft, AlignCenter, AlignRight, Link, Layers as LayersIcon, Box, Pyramid
} from 'lucide-react';

import balanceImg from '@/assets/fundamentals/balance.jpg';
import contrastImg from '@/assets/fundamentals/contrast.jpg';
import colorHarmonyImg from '@/assets/fundamentals/color-harmony.jpg';
import typographyImg from '@/assets/fundamentals/typography.jpg';
import gridSystemsImg from '@/assets/fundamentals/grid-systems.jpg';
import whitespaceImg from '@/assets/fundamentals/whitespace.jpg';
import visualHierarchyImg from '@/assets/fundamentals/visual-hierarchy.jpg';
import colorPsychologyImg from '@/assets/fundamentals/color-psychology.jpg';
import uxDesignImg from '@/assets/fundamentals/ux-design.jpg';
import brandingImg from '@/assets/fundamentals/branding.jpg';

export interface DesignFundamental {
  id: string;
  title: string;
  category: 'Design Principles' | 'Color Fundamentals' | 'Typography' | 'Layout & Composition' | 'Imagery & Visuals' | 'Branding & Identity' | 'UX & UI Basics' | 'Digital Design' | 'Design Tools' | 'Visual Communication' | 'Print & Production' | 'Modern Trends';
  description: string;
  detailedContent: string;
  example: string;
  icon: any;
  image: string;
}

export const designFundamentals: DesignFundamental[] = [
  // Design Principles (1-10)
  {
    id: '1',
    title: 'Balance (Symmetry, Asymmetry, Radial)',
    category: 'Design Principles',
    description: 'Achieve visual equilibrium through symmetrical (mirror-like), asymmetrical (weighted), or radial (center-focused) arrangements of elements.',
    detailedContent: `Balance is one of the foundational principles of design that creates visual stability and harmony in compositions. It refers to the distribution of visual weight across a design, ensuring that no single area feels too heavy or too light compared to others.

There are three main types of balance in design. Symmetrical balance creates a mirror-like effect where elements on one side of a central axis are identical or very similar to those on the other side. This type of balance conveys formality, stability, and trustworthiness, making it ideal for corporate logos, traditional layouts, and classical designs. Symmetrical balance is easy for viewers to process and creates a sense of order and predictability.

Asymmetrical balance, on the other hand, uses different elements of varying visual weights to create equilibrium. While the elements may differ in size, color, or texture, they balance each other through careful positioning and composition. Asymmetrical balance is more dynamic and interesting than symmetrical balance, creating visual tension that guides the viewer's eye through the design. It's commonly used in modern web design, magazine layouts, and contemporary branding where energy and movement are desired.

Radial balance arranges elements around a central point, creating a circular or spiral pattern that radiates outward. This type of balance is often found in nature (think sunflowers or ripples in water) and is perfect for creating focal points in designs like badges, medallions, mandalas, and circular logos. Radial balance draws the eye naturally to the center while maintaining interest throughout the composition.

Understanding balance requires considering the visual weight of different elements. Darker colors appear heavier than lighter ones, larger elements carry more weight than smaller ones, and complex textures feel heavier than simple ones. By manipulating these properties, designers can create balanced compositions that feel stable yet engaging. Mastering balance allows you to create designs that are both aesthetically pleasing and functionally effective, guiding viewers through your content while maintaining visual interest.`,
    example: 'Symmetrical logos like Chanel, asymmetrical web layouts like modern portfolios, radial designs like Instagram story highlights',
    icon: Layers,
    image: balanceImg
  },
  {
    id: '2',
    title: 'Contrast',
    category: 'Design Principles',
    description: 'Create visual interest and hierarchy by using opposing elements like light vs dark, large vs small, or thick vs thin.',
    detailedContent: `Contrast is arguably the most powerful tool in a designer's toolkit. It creates visual distinction between elements, establishes clear hierarchy, improves readability, and adds energy and excitement to compositions. Without contrast, designs become monotonous, difficult to navigate, and fail to communicate their message effectively.

The most obvious form of contrast is tonal contrast—the difference between light and dark values. High contrast between text and background ensures readability, which is crucial for accessibility. Black text on a white background provides maximum contrast, but designers can create effective contrast with various color combinations as long as there's sufficient difference in brightness levels. Tools like the WCAG contrast checker help ensure your designs meet accessibility standards.

Size contrast creates hierarchy and emphasis. Making important elements larger immediately draws attention to them, while smaller supporting elements recede into the background. This is fundamental in typography, where headlines are significantly larger than body text, creating a clear reading order. Size contrast also applies to images, shapes, and interactive elements like buttons.

Color contrast goes beyond just light and dark. Complementary colors (opposite on the color wheel) create maximum color contrast and visual excitement. Warm colors like red and orange contrast with cool colors like blue and green, creating dynamic compositions that capture attention. However, too much high-contrast color can be overwhelming, so balance is key.

Texture and shape contrast add another dimension to designs. Smooth surfaces contrast with rough textures, geometric shapes contrast with organic forms, and thick lines contrast with thin ones. These contrasts create visual interest and depth, preventing designs from feeling flat or one-dimensional.

Mastering contrast means understanding when to use high contrast for emphasis and when to use low contrast for harmony. Effective designs use contrast strategically to guide the viewer's eye, create focal points, and ensure the most important information stands out. Remember that contrast isn't just about making things different—it's about making things meaningfully different in ways that support your design's purpose and message.`,
    example: 'High contrast text for readability, dark mode vs light mode interfaces, bold headlines paired with light body text, contrasting CTA buttons',
    icon: ContrastIcon,
    image: contrastImg
  },
  {
    id: '3',
    title: 'Emphasis & Focus',
    category: 'Design Principles',
    description: 'Direct attention to key elements using size, color, position, or isolation to create focal points in your design.',
    detailedContent: `Emphasis is the principle that guides viewers to the most important elements in your design first. Every effective design has a clear focal point—a dominant element that immediately captures attention and serves as the entry point for visual exploration. Without emphasis, viewers don't know where to look first, leading to confusion and poor communication.

Creating emphasis starts with understanding visual hierarchy. Not all elements in a design are equally important, and emphasis helps establish this hierarchy by making key elements stand out while supporting elements recede. This is crucial in everything from posters and websites to product packaging and user interfaces. The primary focal point should be obvious and unmistakable, while secondary and tertiary elements support the overall message without competing for attention.

Size is one of the most effective ways to create emphasis. Larger elements naturally draw the eye first due to their greater visual mass. This is why headlines are bigger than body text and why hero images dominate website headers. However, size alone isn't enough—you need to maintain sufficient contrast with surrounding elements to make the size difference meaningful.

Color creates powerful emphasis, especially when used strategically. A single red element in a sea of gray immediately commands attention. Bright, saturated colors stand out against muted backgrounds, and complementary color combinations create maximum impact. Many successful designs use a mostly neutral palette with strategic pops of color to highlight calls-to-action or important information.

Position plays a crucial role in emphasis. Elements placed in the center of a composition naturally become focal points due to their prominence. The top-left corner is where Western readers typically begin scanning, making it prime real estate for important content. Isolation—surrounding an element with white space—also creates emphasis by separating it from competing visual information.

Movement and direction can create emphasis through implied motion or visual paths. Arrows, lines, and gaze direction (in photography) guide viewers toward focal points. Animation and interaction on digital platforms provide additional tools for creating emphasis through motion and change. The key to effective emphasis is intentionality—every design decision should support your hierarchy and guide viewers through your content in the desired order.`,
    example: 'Call-to-action buttons in bright colors, hero headlines in large bold fonts, featured products with spotlights, isolated logos surrounded by whitespace',
    icon: Target,
    image: visualHierarchyImg
  },
  {
    id: '4',
    title: 'Proportion & Scale',
    category: 'Design Principles',
    description: 'Use relative size relationships between elements to create harmony, hierarchy, and visual interest in compositions.',
    detailedContent: `Proportion and scale define the size relationships between elements in a design and between elements and the overall composition. These principles are fundamental to creating harmonious, professional designs that feel balanced and intentional rather than arbitrary or chaotic.

The Golden Ratio (approximately 1:1.618) is perhaps the most famous proportional system in design. Found throughout nature and classical art, this ratio creates naturally pleasing proportions that feel balanced to the human eye. Many designers use the golden ratio to determine layout proportions, image sizes, and even typography scales. While you don't need to apply it rigidly to every design, understanding this ratio provides a valuable foundation for creating harmonious compositions.

Modular scales in typography create visual rhythm and hierarchy through mathematical relationships between font sizes. Instead of choosing arbitrary sizes like 12px, 15px, and 23px, modular scales use consistent ratios (like 1.25 or 1.5) to generate harmonious size progressions. This creates a cohesive typographic system where every size feels related and intentional. Tools like Modular Scale help designers generate these systems quickly.

Scale creates hierarchy and emphasis—larger elements feel more important and immediately draw attention. However, scale relationships must be significant enough to be meaningful. A headline that's only slightly larger than body text doesn't establish clear hierarchy, while one that's dramatically larger creates unmistakable emphasis. The same principle applies to images, icons, and interactive elements.

Proportion affects how we perceive spaces and forms. Wide formats feel panoramic and cinematic, while tall formats feel elegant and sophisticated. Square formats feel stable and balanced. Understanding these psychological effects helps you choose proportions that support your design's mood and message. Responsive design adds another layer, requiring thoughtful proportional adjustments across different screen sizes.

Maintaining consistent proportions across a design system creates unity and professional polish. If your primary button is 44px tall, related buttons should use proportional heights rather than arbitrary values. If your grid uses a 12-column layout, maintain those proportions throughout your design. Consistency in proportion signals quality and attention to detail while making designs more cohesive and easier to use.`,
    example: 'Golden ratio in logo design, modular typography scales (16px base with 1.5 scale), responsive layouts maintaining proportions, card components with consistent aspect ratios',
    icon: Minimize2,
    image: gridSystemsImg
  },
  {
    id: '5',
    title: 'Alignment',
    category: 'Design Principles',
    description: 'Create order and connection by positioning elements along common edges or centers for clean, professional layouts.',
    detailedContent: `Alignment is the principle of positioning elements along common edges, centers, or axes to create order, connection, and visual unity in designs. While it might seem like a simple concept, proper alignment is what separates amateur designs from professional ones. Misaligned elements create visual chaos and suggest carelessness, while well-aligned designs feel intentional, organized, and trustworthy.

Edge alignment creates invisible connections between elements that our eyes naturally follow. When multiple elements share a common left edge, they form a vertical line that creates cohesion and order. Similarly, aligning tops, bottoms, or right edges creates horizontal connections. These invisible lines act as organizational structures that help viewers navigate content logically and comfortably.

Grid systems formalize alignment by providing a structural framework for positioning elements consistently. A typical 12-column grid divides the design space into proportional sections that guide element placement. Grids don't limit creativity—they provide a foundation that frees designers to focus on content and aesthetics rather than constantly making alignment decisions. Popular frameworks like Bootstrap and Material Design use grid systems extensively.

Center alignment creates symmetry and focus, making it ideal for headlines, logos, and featured content. However, center-aligned body text becomes difficult to read in long passages because the irregular left edge makes it hard for eyes to find the start of each new line. Left alignment (or right alignment in right-to-left languages) provides the consistent edge that readers need for comfortable extended reading.

Vertical rhythm refers to the consistent spacing and alignment of text baselines throughout a design. Just as musical rhythm creates patterns in time, vertical rhythm creates patterns in space that guide the eye smoothly down the page. Setting a baseline grid (often based on line-height) ensures that text across multiple columns aligns horizontally, creating visual harmony.

Even in intentionally asymmetrical or dynamic designs, elements should align to invisible guide lines. Random placement creates confusion, while deliberate placement along a grid or alignment system creates purposeful tension and energy. The key is that misalignment should be intentional and meaningful, not accidental. Master alignment by using rulers, guides, and grid overlays in your design tools, and develop an eye for spotting when elements are even slightly off. This attention to detail elevates design quality dramatically.`,
    example: 'Grid-based layouts with 12 columns, centered navigation menus, left-aligned form fields, baseline grid in typography, card grids with aligned edges',
    icon: AlignLeft,
    image: gridSystemsImg
  },
  {
    id: '6',
    title: 'Repetition & Consistency',
    category: 'Design Principles',
    description: 'Establish visual unity by repeating design elements like colors, fonts, shapes, or spacing throughout your work.',
    detailedContent: `Repetition and consistency are the glue that holds designs together, creating unity and strengthening brand identity. When design elements repeat consistently throughout a project, they create patterns that users recognize, understand, and trust. Without consistency, designs feel chaotic and unprofessional, regardless of how beautiful individual elements might be.

Visual repetition creates rhythm and familiarity. Repeating colors, fonts, spacing values, shapes, and design motifs throughout a project creates a cohesive visual language that users quickly learn to recognize. This is fundamental to brand identity—think of how instantly recognizable Apple's minimalist aesthetic or Coca-Cola's red and script typography are. These brands maintain strict consistency across all touchpoints, from product packaging to advertising to digital interfaces.

Design systems formalize consistency by establishing reusable components and patterns. Instead of creating unique buttons for every page, design systems define standard button styles (primary, secondary, tertiary) that repeat throughout the interface. This creates predictability for users—they learn that blue buttons are primary actions, and this knowledge transfers across the entire product. Design systems also dramatically improve efficiency, as designers can reuse components rather than recreating them constantly.

Consistency in spacing creates visual rhythm and professional polish. Establishing a spacing scale (like 4px, 8px, 16px, 24px, 32px) and using only these values throughout a design creates harmonious relationships between elements. Random spacing values create visual noise and suggest carelessness, while consistent spacing signals attention to detail and quality.

Typography consistency is crucial for readability and brand identity. Limiting yourself to 2-3 typefaces and defining clear rules for when to use each one creates visual cohesion. Headlines always use the same font, body text always uses another, and special accents might use a third. Font sizes should also follow consistent scales rather than arbitrary values.

However, consistency doesn't mean boring repetition. Variation within consistent systems adds interest while maintaining unity. You might use the same button component but vary its color for different action types. You might maintain consistent spacing but vary layout structures for visual interest. The key is that variation should be systematic and purposeful, following defined rules rather than random choices.

Maintaining consistency requires discipline and documentation. Style guides, design systems, and component libraries help teams maintain consistency across large projects and over time. Regular audits catch inconsistencies before they accumulate. Remember that consistency builds trust—when users can predict how your design will behave, they feel more confident and comfortable interacting with it.`,
    example: 'Brand style guides with consistent colors and fonts, UI component libraries with reusable buttons and inputs, spacing systems using multiples of 8px, icon sets with consistent stroke weight and style',
    icon: Sparkles,
    image: brandingImg
  },
  {
    id: '7',
    title: 'Color Harmony',
    category: 'Color Fundamentals',
    description: 'Create pleasing color combinations using color wheel relationships like complementary, analogous, or triadic schemes.',
    detailedContent: `Color harmony is the art and science of combining colors in ways that are aesthetically pleasing and support your design's purpose. Understanding color relationships through the color wheel gives designers a systematic approach to creating effective color palettes rather than relying solely on intuition or trial and error.

Complementary colors sit opposite each other on the color wheel (like blue and orange, or red and green) and create maximum color contrast and vibration when placed side by side. This high-energy combination is excellent for creating emphasis and grabbing attention, making it popular in sports branding, action-oriented designs, and call-to-action elements. However, complementary schemes can be overwhelming if overused, so balance is crucial—often one color dominates while the other provides strategic accents.

Analogous colors are neighbors on the color wheel (like blue, blue-green, and green) and create harmonious, comfortable combinations that feel natural and cohesive. These schemes are common in nature and evoke specific moods—cool analogous schemes (blues and greens) feel calm and serene, while warm analogous schemes (reds, oranges, and yellows) feel energetic and welcoming. Analogous schemes work well for background gradients, themed interfaces, and designs where harmony matters more than contrast.

Triadic color schemes use three colors equally spaced around the color wheel (like red, yellow, and blue) to create balanced yet vibrant combinations. These schemes offer more variety than analogous colors while remaining balanced and harmonious. The key to successful triadic schemes is letting one color dominate while using the others as accents, preventing the design from feeling too busy or chaotic.

Split-complementary schemes offer a more nuanced approach than direct complementary pairs. Instead of using a color's direct opposite, you use the two colors adjacent to its complement. This creates strong visual contrast with less tension than pure complementary schemes, offering versatility and sophistication.

Monochromatic schemes use variations of a single hue—different shades (adding black), tints (adding white), and tones (adding gray) of the same color. While potentially less exciting than multi-color schemes, monochromatic palettes create sophisticated, cohesive designs that emphasize form, texture, and hierarchy over color variety. They're excellent for minimalist designs and when you want to convey elegance and restraint.

Understanding color harmony also means considering context and culture. Colors carry different meanings in different cultures, and color combinations that feel harmonious in one context might clash in another. Temperature (warm vs. cool), saturation (vibrant vs. muted), and value (light vs. dark) all affect how colors interact and the moods they create. Tools like Adobe Color, Coolors, and Paletton help designers explore color harmonies systematically, but developing your eye for color relationships through practice and observation is equally important.`,
    example: 'Complementary: Spotify (green/pink), Fanta (orange/blue); Analogous: Instagram gradients (yellow-orange-red-purple); Triadic: Burger King (red-yellow-blue)',
    icon: Palette,
    image: colorHarmonyImg
  },
  {
    id: '8',
    title: 'Color Psychology',
    category: 'Color Fundamentals',
    description: 'Understand how colors evoke emotions and influence behavior in design applications.',
    detailedContent: `Color psychology studies how colors affect human perception, emotion, and behavior. While color associations aren't universal and vary across cultures and contexts, understanding common psychological responses to color helps designers make informed decisions that support their project's goals and messaging.

Red is perhaps the most powerful color psychologically. It evokes strong emotions—passion, energy, urgency, danger, and excitement. Red increases heart rate and creates a sense of immediacy, which is why it's commonly used for sale signs, clearance tags, and error messages. Brands like Coca-Cola and Netflix use red to convey energy and excitement. However, red can also signal danger or caution, so context matters significantly.

Blue is the most universally liked color and conveys trust, stability, professionalism, and calmness. It's the color of clear skies and clean water, creating associations with openness and purity. This is why blue dominates corporate and financial branding—Facebook, Twitter, PayPal, and countless banks use blue to communicate trustworthiness. Blue also has calming effects, making it popular in healthcare and wellness applications. Different shades create different effects: light blues feel peaceful and serene, while dark blues feel professional and authoritative.

Green represents nature, growth, health, and prosperity. It's the color of money in many Western countries, creating associations with wealth and success. Green is also strongly connected to environmental and organic products, health and wellness brands, and anything emphasizing growth or renewal. Different greens carry different meanings—bright greens feel fresh and energetic, while darker greens feel more sophisticated and wealthy.

Yellow conveys optimism, happiness, warmth, and caution. It's highly visible and attention-grabbing, often used for warning signs and highlighters. Brands like McDonald's and IKEA use yellow to create feelings of friendliness and accessibility. However, yellow can be overwhelming in large doses and may create anxiety if overused. Softer, golden yellows feel warm and inviting, while bright yellows demand attention.

Purple has historically been associated with luxury, royalty, creativity, and spirituality due to the rarity and expense of purple dyes in ancient times. Modern brands use purple to convey premium quality, creativity, and innovation. It's popular in beauty, luxury goods, and creative industries. Purple strikes a balance between the stability of blue and the energy of red, creating a sense of sophisticated excitement.

Orange combines red's energy with yellow's happiness, creating feelings of enthusiasm, creativity, and adventure. It's less aggressive than red but more energetic than yellow, making it excellent for calls-to-action that shouldn't feel too urgent or alarming. Orange is popular in tech startups and creative brands that want to feel approachable and innovative.

Black conveys sophistication, power, elegance, and modernity. It's the color of luxury brands, high-end fashion, and premium products. Black creates strong contrast and works well for creating hierarchy and emphasis. However, too much black can feel heavy or oppressive, so balance is important. White and gray complement black effectively to create sophisticated, minimalist designs.

Cultural context dramatically affects color psychology. In Western cultures, white represents purity and weddings, while in some Eastern cultures, it represents mourning and death. Red signifies good fortune and celebration in China but can mean danger or warning in Western contexts. Always consider your audience's cultural background when making color decisions. Understanding color psychology helps you make strategic color choices that support your message, evoke desired emotions, and influence user behavior in meaningful ways.`,
    example: 'Red for urgency (sales, errors), blue for trust (banks, social media), green for eco-friendly (organic brands), purple for luxury (Cadbury, Hallmark), yellow for optimism (McDonald\'s), black for premium (Chanel, Apple)',
    icon: Droplet,
    image: colorPsychologyImg
  },
  // Add more fundamentals following the same pattern...
];

export default designFundamentals;
