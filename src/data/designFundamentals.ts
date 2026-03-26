// v2.0 - Design Fundamentals with 50 unique entries
import {
  Eye, Zap, Layers, Minimize2, Palette, Type, Layout,
  Image, Briefcase, Users, Monitor, Lightbulb, Code, Sparkles, Target,
  Cpu, Grid, Circle, Square, Hexagon, Triangle, Smartphone, Tablet,
  PenTool, Crop, Sliders, Camera, FileText, BookOpen, Folder, Star,
  Compass, Ruler, Pencil, Paintbrush, Droplet, Sun, Moon, Contrast as ContrastIcon,
  AlignLeft, AlignCenter, AlignRight, Link, Layers as LayersIcon, Box, Pyramid,
  Wind, Flame, Waves, Mountain, Activity, BarChart3, TrendingUp, Shapes
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

// New imports for additional fundamentals
import splitComplementaryImg from '@/assets/fundamentals/split-complementary.jpg';
import monochromaticImg from '@/assets/fundamentals/monochromatic.jpg';
import warmCoolColorsImg from '@/assets/fundamentals/warm-cool-colors.jpg';
import colorAccessibilityImg from '@/assets/fundamentals/color-accessibility.jpg';
import fontTypesImg from '@/assets/fundamentals/font-types.jpg';
import fontPairingImg from '@/assets/fundamentals/font-pairing.jpg';
import typeHierarchyImg from '@/assets/fundamentals/type-hierarchy.jpg';
import kerningImg from '@/assets/fundamentals/kerning.jpg';
import trackingImg from '@/assets/fundamentals/tracking.jpg';
import leadingImg from '@/assets/fundamentals/leading.jpg';
import readabilityImg from '@/assets/fundamentals/readability.jpg';
import textAlignmentImg from '@/assets/fundamentals/text-alignment.jpg';
import typographicContrastImg from '@/assets/fundamentals/typographic-contrast.jpg';
import webTypographyImg from '@/assets/fundamentals/web-typography.jpg';
import ruleOfThirdsImg from '@/assets/fundamentals/rule-of-thirds.jpg';
import goldenRatioImg from '@/assets/fundamentals/golden-ratio.jpg';
import marginsPaddingImg from '@/assets/fundamentals/margins-padding.jpg';
import zfPatternsImg from '@/assets/fundamentals/z-f-patterns.jpg';
import modularDesignImg from '@/assets/fundamentals/modular-design.jpg';
import overlappingElementsImg from '@/assets/fundamentals/overlapping-elements.jpg';
import asymmetricLayoutImg from '@/assets/fundamentals/asymmetric-layout.jpg';
import geometricShapesImg from '@/assets/fundamentals/geometric-shapes.jpg';
import organicShapesImg from '@/assets/fundamentals/organic-shapes.jpg';
import abstractFormsImg from '@/assets/fundamentals/abstract-forms.jpg';
import depthImg from '@/assets/fundamentals/depth.jpg';
import perspectiveImg from '@/assets/fundamentals/perspective.jpg';
import volume3dImg from '@/assets/fundamentals/volume-3d.jpg';
import visualWeightImg from '@/assets/fundamentals/visual-weight.jpg';
import spaceDivisionImg from '@/assets/fundamentals/space-division.jpg';
import texturePatternImg from '@/assets/fundamentals/texture-pattern.jpg';
import accessibilityImg from '@/assets/fundamentals/accessibility.jpg';
import uiConsistencyImg from '@/assets/fundamentals/ui-consistency.jpg';
import microinteractionsImg from '@/assets/fundamentals/microinteractions.jpg';
import feedbackAffordanceImg from '@/assets/fundamentals/feedback-affordance.jpg';
import ctaDesignImg from '@/assets/fundamentals/cta-design.jpg';
import navigationPatternsImg from '@/assets/fundamentals/navigation-patterns.jpg';
import responsiveAdaptiveImg from '@/assets/fundamentals/responsive-adaptive.jpg';
import cognitiveFlowImg from '@/assets/fundamentals/cognitive-flow.jpg';
import errorStatesImg from '@/assets/fundamentals/error-states.jpg';
import emptyStatesImg from '@/assets/fundamentals/empty-states.jpg';
import timingEasingImg from '@/assets/fundamentals/timing-easing.jpg';
import keyframesImg from '@/assets/fundamentals/keyframes.jpg';
import motionHierarchyImg from '@/assets/fundamentals/motion-hierarchy.jpg';
import feedbackAnimationsImg from '@/assets/fundamentals/feedback-animations.jpg';
import scrollParallaxImg from '@/assets/fundamentals/scroll-parallax.jpg';
import loadingStatesImg from '@/assets/fundamentals/loading-states.jpg';
import logoDesignImg from '@/assets/fundamentals/logo-design.jpg';
import brandPaletteImg from '@/assets/fundamentals/brand-palette.jpg';
import brandTypographyImg from '@/assets/fundamentals/brand-typography.jpg';
import iconographySymbolsImg from '@/assets/fundamentals/iconography-symbols.jpg';
import imageryConsistencyImg from '@/assets/fundamentals/imagery-consistency.jpg';
import toneVoiceImg from '@/assets/fundamentals/tone-voice.jpg';
import empathyMappingImg from '@/assets/fundamentals/empathy-mapping.jpg';
import journeyMappingImg from '@/assets/fundamentals/journey-mapping.jpg';
import wireframingImg from '@/assets/fundamentals/wireframing.jpg';
import iterativeDesignImg from '@/assets/fundamentals/iterative-design.jpg';
import glassmorphismImg from '@/assets/fundamentals/glassmorphism.jpg';
import neumorphismImg from '@/assets/fundamentals/neumorphism.jpg';
import darkModeImg from '@/assets/fundamentals/dark-mode.jpg';
import dataVisualizationImg from '@/assets/fundamentals/data-visualization.jpg';

export interface DesignFundamental {
  id: string;
  title: string;
  category: 'Design Principles' | 'Color Fundamentals' | 'Typography' | 'Layout & Composition' | 'Shape & Form' | 'UI Design' | 'Motion & Animation' | 'Branding' | 'UX Process' | 'Modern Trends';
  description: string;
  detailedContent: string;
  example: string;
  icon: any;
  image: string;
}

export const designFundamentals: DesignFundamental[] = [
  {
    id: '1',
    title: 'Balance',
    category: 'Design Principles',
    description: 'Achieve visual stability through the arrangement of elements.',
    detailedContent: `Balance in design refers to the distribution of visual weight within a composition. It can be symmetrical, where elements are evenly distributed, or asymmetrical, where different elements balance each other out through contrast and visual interest. Achieving balance is crucial for creating harmonious designs that feel stable and aesthetically pleasing. Designers often use balance to guide the viewer's eye and create a sense of order in their work.`,
    example: 'A symmetrical layout with equal visual weight on both sides.',
    icon: Layers,
    image: balanceImg
  },
  {
    id: '2',
    title: 'Contrast',
    category: 'Design Principles',
    description: 'Use differences in color, size, and shape to create visual interest.',
    detailedContent: `Contrast is a fundamental principle in design that helps to highlight differences between elements. It can be achieved through color, size, shape, and texture. High contrast can draw attention to specific areas of a design, while low contrast can create a more subtle effect. Effective use of contrast enhances readability, guides the viewer's eye, and adds depth to a composition.`,
    example: 'Black text on a white background for maximum readability.',
    icon: ContrastIcon,
    image: contrastImg
  },
  {
    id: '3',
    title: 'Color Harmony',
    category: 'Color Fundamentals',
    description: 'Create visually appealing color combinations that work well together.',
    detailedContent: `Color harmony refers to the pleasing arrangement of colors in a design. It involves selecting colors that complement each other and create a cohesive look. Various color schemes, such as complementary, analogous, and triadic, can be used to achieve harmony. Understanding color theory and the relationships between colors is essential for creating effective and attractive designs.`,
    example: 'Using blue and orange together for a vibrant look.',
    icon: Palette,
    image: colorHarmonyImg
  },
  {
    id: '4',
    title: 'Typography',
    category: 'Typography',
    description: 'The art of arranging type to make written language legible and visually appealing.',
    detailedContent: `Typography is a crucial aspect of design that involves the selection and arrangement of typefaces. It encompasses font choice, size, spacing, and alignment. Good typography enhances readability and conveys the intended message effectively. Designers must consider hierarchy, contrast, and consistency when working with typography to create visually appealing and functional text layouts.`,
    example: 'Using a bold font for headings and a lighter font for body text.',
    icon: Type,
    image: typographyImg
  },
  {
    id: '5',
    title: 'Grid Systems',
    category: 'Layout & Composition',
    description: 'Use grids to create structured and organized layouts.',
    detailedContent: `Grid systems are a foundational tool in design that help create structured layouts. They provide a framework for aligning elements and maintaining consistency throughout a design. By using grids, designers can ensure that their work is visually balanced and easy to navigate. Grids can be flexible or fixed, depending on the design needs, and they are essential for responsive design.`,
    example: 'A magazine layout that uses a 12-column grid for organization.',
    icon: Grid,
    image: gridSystemsImg
  },
  {
    id: '6',
    title: 'White Space',
    category: 'Layout & Composition',
    description: 'Utilize empty space to enhance clarity and focus.',
    detailedContent: `White space, or negative space, is the area around and between elements in a design. It is a powerful tool that can enhance readability, create emphasis, and improve overall aesthetics. Effective use of white space allows designs to breathe and helps guide the viewer's eye. It is essential for creating a clean and organized look, making content more accessible and engaging.`,
    example: 'A website with ample spacing between text and images for clarity.',
    icon: Minimize2,
    image: whitespaceImg
  },
  {
    id: '7',
    title: 'Visual Hierarchy',
    category: 'Design Principles',
    description: 'Establish a clear order of importance among elements.',
    detailedContent: `Visual hierarchy is the arrangement of elements in a way that signifies their importance. It guides the viewer's eye through a design, helping them understand the flow of information. Designers can create hierarchy through size, color, contrast, and placement. A well-defined visual hierarchy enhances usability and ensures that key messages are communicated effectively.`,
    example: 'Using larger text for headings and smaller text for body content.',
    icon: Layers,
    image: visualHierarchyImg
  },
  {
    id: '8',
    title: 'Color Psychology',
    category: 'Color Fundamentals',
    description: 'Understand how colors influence emotions and perceptions.',
    detailedContent: `Color psychology explores how colors affect human emotions and behaviors. Different colors evoke different feelings and associations, which can significantly impact design choices. For example, blue is often associated with trust and calmness, while red can evoke excitement or urgency. Designers must consider color psychology when creating branding, marketing materials, and user interfaces to ensure their designs resonate with the intended audience.`,
    example: 'Using blue in a corporate website to convey professionalism.',
    icon: Eye,
    image: colorPsychologyImg
  },
  {
    id: '9',
    title: 'Split Complementary Colors',
    category: 'Color Fundamentals',
    description: 'Create vibrant yet balanced color schemes using a base color and two colors adjacent to its complement on the color wheel.',
    detailedContent: `Split complementary color schemes offer a sophisticated approach to color harmony that provides visual interest while maintaining balance. This technique uses a base color combined with two colors that sit on either side of its complement on the color wheel, creating a more nuanced palette than direct complementary schemes. The split complementary approach delivers high contrast without the tension of true complementary pairs, making it ideal for designs that need vibrancy with sophistication. This color harmony works exceptionally well in branding, web design, and digital interfaces where you need multiple accent colors that work harmoniously together. The key advantage is versatility – you get three distinct colors that create visual interest while maintaining cohesion. When implementing split complementary schemes, use your base color as the dominant hue (60-70% of the design), one split complement as a secondary color (20-30%), and the other as an accent (10-20%). This creates hierarchy while keeping the palette balanced and visually engaging.`,
    example: 'Blue base with yellow-orange and red-orange accents, creating a warm-cool contrast',
    icon: Palette,
    image: splitComplementaryImg
  },
  {
    id: '10',
    title: 'Monochromatic Schemes',
    category: 'Color Fundamentals',
    description: 'Build elegant, cohesive designs using variations in lightness, saturation, and tone of a single color.',
    detailedContent: `Monochromatic color schemes represent the epitome of color harmony through simplicity. By working with a single hue and varying only its lightness, saturation, and tone, designers create sophisticated, unified compositions that are both elegant and easy on the eyes. This approach eliminates the complexity of color relationships and allows focus on other design elements like typography, layout, and imagery. Monochromatic schemes are particularly powerful in minimalist design, where restraint and clarity are paramount. They're also excellent for creating mood and atmosphere – a blue monochrome evokes calmness and professionalism, while a red monochrome creates energy and passion. The technique requires careful attention to contrast ratios for accessibility, ensuring text remains readable against backgrounds. Layer your palette with 5-7 variations: very light for backgrounds, light for secondary elements, medium for main content, dark for emphasis, and very dark for text or borders. Add depth through textures, patterns, and subtle gradients within your monochromatic range.`,
    example: 'Navy blue website with lighter blues for backgrounds, mid-tones for cards, and dark navy for text',
    icon: Droplet,
    image: monochromaticImg
  },
  {
    id: '11',
    title: 'Warm vs Cool Colors',
    category: 'Color Fundamentals',
    description: 'Differentiate between warm and cool colors to evoke specific feelings.',
    detailedContent: `Warm colors (reds, oranges, yellows) evoke feelings of warmth, energy, and excitement, while cool colors (blues, greens, purples) convey calmness, tranquility, and professionalism. Understanding the emotional impact of warm and cool colors is essential for effective design. Designers can use this knowledge to create atmospheres that align with the intended message or brand identity. For instance, a warm color palette may be suitable for a vibrant, energetic brand, while a cool palette may be more appropriate for a calming, professional service.`,
    example: 'Using warm colors for a summer event flyer and cool colors for a spa website.',
    icon: Sun,
    image: warmCoolColorsImg
  },
  {
    id: '12',
    title: 'Color Accessibility & Contrast Ratios',
    category: 'Color Fundamentals',
    description: 'Ensure designs are accessible by considering color contrast and visibility.',
    detailedContent: `Color accessibility is crucial for creating inclusive designs that can be perceived by all users, including those with visual impairments. Designers must consider contrast ratios between text and background colors to ensure readability. The Web Content Accessibility Guidelines (WCAG) provide standards for acceptable contrast ratios. By adhering to these guidelines, designers can create visually appealing designs that are also functional and accessible to a wider audience. Tools and resources are available to help assess color contrast and ensure compliance with accessibility standards.`,
    example: 'Using dark text on a light background to meet accessibility standards.',
    icon: ContrastIcon,
    image: colorAccessibilityImg
  },
  {
    id: '13',
    title: 'Font Types – Serif, Sans-Serif, Display, Script',
    category: 'Typography',
    description: 'Understand different font types and their appropriate usage.',
    detailedContent: `Font types can be broadly categorized into serif, sans-serif, display, and script fonts. Serif fonts have small lines or embellishments at the ends of their strokes, making them suitable for print and formal contexts. Sans-serif fonts lack these embellishments, offering a clean and modern look, ideal for digital content. Display fonts are decorative and used for headlines or attention-grabbing text, while script fonts mimic handwriting and convey elegance. Choosing the right font type is essential for effective communication and brand identity.`,
    example: 'Using a serif font for a formal invitation and a sans-serif font for a modern website.',
    icon: Type,
    image: fontTypesImg
  },
  {
    id: '14',
    title: 'Font Pairing – Harmonizing multiple fonts',
    category: 'Typography',
    description: 'Combine different fonts to create a cohesive and visually appealing design.',
    detailedContent: `Font pairing involves selecting two or more fonts that complement each other to create a harmonious design. Effective font pairing enhances readability and visual interest. Designers should consider contrast, style, and mood when pairing fonts. A common approach is to pair a serif font with a sans-serif font, as the contrast creates a dynamic look. It's essential to limit the number of fonts used to maintain cohesion and avoid visual clutter. Testing font combinations in various contexts ensures they work well together.`,
    example: 'Pairing a bold sans-serif font for headings with a light serif font for body text.',
    icon: Type,
    image: fontPairingImg
  },
  {
    id: '15',
    title: 'Font Hierarchy – Headings, Subheadings, Body',
    category: 'Typography',
    description: 'Establish a clear hierarchy in text to guide the reader.',
    detailedContent: `Font hierarchy is the arrangement of text elements in a way that signifies their importance. It helps guide the reader through the content, making it easier to digest information. Designers can create hierarchy through font size, weight, and style. Headings should be more prominent than subheadings, which should be more noticeable than body text. Consistent use of hierarchy across a design ensures clarity and enhances user experience, allowing readers to quickly identify key information.`,
    example: 'Using larger, bolder fonts for headings and smaller, lighter fonts for body text.',
    icon: Type,
    image: typeHierarchyImg
  },
  {
    id: '16',
    title: 'Kerning – Space between letters',
    category: 'Typography',
    description: 'Adjust the spacing between characters for improved readability.',
    detailedContent: `Kerning refers to the adjustment of space between individual characters in a word. Proper kerning enhances readability and visual appeal, ensuring that text appears balanced and cohesive. Designers must pay attention to kerning, especially in large text or logos, where spacing can significantly impact the overall look. Tools and software often provide kerning adjustments, allowing designers to fine-tune spacing for optimal results. Good kerning contributes to a polished and professional appearance in typography.`,
    example: 'Adjusting the spacing in a logo to ensure even distribution between letters.',
    icon: AlignLeft,
    image: kerningImg
  },
  {
    id: '17',
    title: 'Tracking – Overall letter spacing',
    category: 'Typography',
    description: 'Control the overall spacing of letters in a block of text.',
    detailedContent: `Tracking refers to the overall spacing between letters in a block of text. Unlike kerning, which adjusts space between specific pairs of letters, tracking affects the entire text. Proper tracking enhances readability and can influence the tone of the text. Tight tracking can create a sense of urgency, while loose tracking can evoke a more relaxed feel. Designers should consider tracking adjustments based on the context and purpose of the text, ensuring that it remains legible and visually appealing.`,
    example: 'Using tighter tracking for headlines and looser tracking for body text.',
    icon: AlignCenter,
    image: trackingImg
  },
  {
    id: '18',
    title: 'Leading – Line spacing',
    category: 'Typography',
    description: 'Adjust the space between lines of text for better readability.',
    detailedContent: `Leading, or line spacing, refers to the vertical space between lines of text. Proper leading enhances readability and ensures that text is easy to follow. Too little leading can make text feel cramped, while too much can create disconnection between lines. Designers should consider the typeface, size, and context when adjusting leading. A general rule of thumb is to set leading at 120-145% of the font size for optimal readability. Adjusting leading can significantly impact the overall look and feel of a design.`,
    example: 'Using 1.5 line spacing for body text to improve readability.',
    icon: AlignRight,
    image: leadingImg
  },
  {
    id: '19',
    title: 'Readability vs Legibility',
    category: 'Typography',
    description: 'Differentiate between readability and legibility in design.',
    detailedContent: `Readability refers to how easily text can be understood, while legibility focuses on how easily individual characters can be distinguished. Both are crucial for effective typography. Designers must consider font choice, size, spacing, and contrast to ensure that text is both readable and legible. Readability is often enhanced through proper hierarchy and layout, while legibility is improved by selecting clear, well-designed typefaces. Balancing both aspects is essential for creating effective and user-friendly designs.`,
    example: 'Choosing a sans-serif font for digital content to enhance legibility.',
    icon: FileText,
    image: readabilityImg
  },
  {
    id: '20',
    title: 'Text Alignment – Left, Right, Center, Justified',
    category: 'Typography',
    description: 'Choose appropriate text alignment for clarity and aesthetics.',
    detailedContent: `Text alignment refers to the positioning of text within a design. Common alignments include left, right, center, and justified. Each alignment serves different purposes and can influence the overall look and feel of a design. Left alignment is the most common for readability, while center alignment can create a formal or artistic effect. Justified text creates a clean edge but can lead to uneven spacing. Designers should choose alignment based on context, audience, and design goals to ensure clarity and visual appeal.`,
    example: 'Using left alignment for body text and center alignment for headings.',
    icon: AlignLeft,
    image: textAlignmentImg
  },
  {
    id: '21',
    title: 'Typographic Contrast – Bold vs Light, Large vs Small',
    category: 'Typography',
    description: 'Use contrast in typography to create emphasis and hierarchy.',
    detailedContent: `Typographic contrast involves using different font weights, sizes, and styles to create visual interest and hierarchy. By contrasting bold and light fonts, or large and small text, designers can guide the viewer's eye and emphasize key information. Effective use of contrast enhances readability and ensures that important messages stand out. Designers should consider the overall composition and balance when applying typographic contrast to maintain cohesion and clarity.`,
    example: 'Using bold headings with light body text to create a clear hierarchy.',
    icon: ContrastIcon,
    image: typographicContrastImg
  },
  {
    id: '22',
    title: 'Web Typography – Responsive & scalable fonts',
    category: 'Typography',
    description: 'Implement typography that adapts to different screen sizes and devices.',
    detailedContent: `Web typography focuses on creating text that is legible and visually appealing across various devices and screen sizes. Responsive typography involves using scalable units, such as ems or rems, to ensure that text adjusts appropriately. Designers must consider factors like line length, font size, and contrast to enhance readability on different screens. Implementing web-safe fonts and considering accessibility standards are also essential for effective web typography. By prioritizing responsive typography, designers can create user-friendly experiences that cater to diverse audiences.`,
    example: 'Using responsive font sizes that adjust based on screen width.',
    icon: Monitor,
    image: webTypographyImg
  },
  {
    id: '23',
    title: 'Grids – Modular, Baseline, Column',
    category: 'Layout & Composition',
    description: 'Utilize grid systems to create structured and organized layouts.',
    detailedContent: `Grids are essential tools in design that help create structured layouts. Modular grids divide the space into equal modules, while baseline grids align text to a consistent baseline. Column grids provide a framework for organizing content in a visually appealing manner. By using grids, designers can ensure that their work is visually balanced and easy to navigate. Grids can be flexible or fixed, depending on the design needs, and they are essential for responsive design.`,
    example: 'A website layout that uses a 12-column grid for organization.',
    icon: Grid,
    image: ruleOfThirdsImg
  },
  {
    id: '24',
    title: 'Rule of Thirds',
    category: 'Layout & Composition',
    description: 'Apply the rule of thirds to create balanced and engaging compositions.',
    detailedContent: `The rule of thirds is a compositional guideline that suggests dividing an image into nine equal parts using two horizontal and two vertical lines. By placing key elements along these lines or at their intersections, designers can create balanced and visually engaging compositions. This technique is widely used in photography and graphic design to enhance visual interest and guide the viewer's eye. While the rule of thirds is a helpful guideline, designers should also feel free to experiment and break the rules when necessary to achieve their desired effect.`,
    example: 'Positioning the main subject of a photo at one of the intersections of the grid.',
    icon: Layers,
    image: goldenRatioImg
  },
  {
    id: '25',
    title: 'Golden Ratio / Fibonacci Spiral',
    category: 'Layout & Composition',
    description: 'Utilize the golden ratio to create aesthetically pleasing designs.',
    detailedContent: `The golden ratio, approximately 1.618, is a mathematical ratio that is often found in nature and is considered aesthetically pleasing. Designers can use the golden ratio to create harmonious compositions by dividing elements according to this ratio. The Fibonacci spiral, derived from the golden ratio, can also guide layout and design decisions. By incorporating the golden ratio into design, creators can achieve balance and visual appeal that resonates with viewers on a subconscious level.`,
    example: 'Using the golden ratio to determine the layout of a webpage.',
    icon: Ruler,
    image: marginsPaddingImg
  },
  {
    id: '26',
    title: 'White Space / Negative Space',
    category: 'Layout & Composition',
    description: 'Embrace white space to enhance clarity and focus.',
    detailedContent: `White space, or negative space, is the area around and between elements in a design. It is a powerful tool that can enhance readability, create emphasis, and improve overall aesthetics. Effective use of white space allows designs to breathe and helps guide the viewer's eye. It is essential for creating a clean and organized look, making content more accessible and engaging. Designers should strive to find a balance between content and white space to create visually appealing designs.`,
    example: 'A website with ample spacing between text and images for clarity.',
    icon: Minimize2,
    image: zfPatternsImg
  },
  {
    id: '27',
    title: 'Margins & Padding',
    category: 'Layout & Composition',
    description: 'Use margins and padding to create space around elements.',
    detailedContent: `Margins and padding are essential for creating space around elements in a design. Margins refer to the space outside an element, while padding is the space inside an element. Proper use of margins and padding enhances readability and visual appeal, ensuring that elements are not cramped together. Designers should consider the overall layout and hierarchy when applying margins and padding to create a balanced and cohesive design. Consistent spacing contributes to a polished and professional appearance.`,
    example: 'Using padding to create space within a button and margins to separate elements.',
    icon: Box,
    image: modularDesignImg
  },
  {
    id: '28',
    title: 'Z-pattern & F-pattern layouts',
    category: 'Layout & Composition',
    description: 'Utilize common reading patterns to guide layout design.',
    detailedContent: `Z-pattern and F-pattern layouts are based on how users typically scan content on a page. The Z-pattern follows a zigzag path, while the F-pattern emphasizes the top and left areas of a layout. By understanding these patterns, designers can strategically place important elements to capture attention and guide the viewer's eye. Implementing these layouts enhances usability and ensures that key information is easily accessible. Designers should consider the content and context when applying these patterns to create effective layouts.`,
    example: 'Arranging content in a Z-pattern for a landing page to guide the viewer’s eye.',
    icon: LayersIcon,
    image: overlappingElementsImg
  },
  {
    id: '29',
    title: 'Modular Design',
    category: 'Layout & Composition',
    description: 'Create flexible and reusable design components.',
    detailedContent: `Modular design involves creating components that can be reused across different layouts and contexts. This approach enhances consistency and efficiency in design, allowing for easy updates and scalability. By breaking down designs into modular units, designers can maintain a cohesive look while adapting to various needs. Modular design is particularly effective in web and app design, where components can be easily rearranged and repurposed. Designers should focus on creating versatile modules that can work together harmoniously.`,
    example: 'Using card components that can be rearranged on a webpage.',
    icon: Layers,
    image: asymmetricLayoutImg
  },
  {
    id: '30',
    title: 'Overlapping Elements',
    category: 'Layout & Composition',
    description: 'Use overlapping elements to create depth and interest.',
    detailedContent: `Overlapping elements in design can create a sense of depth and visual interest. This technique adds layers to a composition, making it more dynamic and engaging. Designers can use overlapping elements to guide the viewer's eye and create focal points. However, it's essential to maintain clarity and ensure that overlapping elements do not hinder readability. By carefully considering the arrangement and transparency of overlapping elements, designers can achieve a balanced and visually appealing design.`,
    example: 'Layering images and text to create a visually rich layout.',
    icon: Layers,
    image: geometricShapesImg
  },
  {
    id: '31',
    title: 'Asymmetrical Composition',
    category: 'Layout & Composition',
    description: 'Create dynamic layouts through asymmetry.',
    detailedContent: `Asymmetrical composition involves arranging elements in a way that is not evenly balanced, creating visual tension and interest. This approach can lead to more dynamic and engaging designs, as it encourages the viewer's eye to explore the composition. Designers can achieve asymmetry through varying sizes, colors, and placements of elements. While asymmetrical designs can be visually striking, it's essential to maintain a sense of harmony and cohesion to ensure that the overall composition remains effective.`,
    example: 'Using larger images on one side and smaller text blocks on the other.',
    icon: Triangle,
    image: organicShapesImg
  },
  {
    id: '32',
    title: 'Geometric Shapes',
    category: 'Shape & Form',
    description: 'Incorporate geometric shapes to create structure and clarity.',
    detailedContent: `Geometric shapes are fundamental elements in design that provide structure and clarity. They can be used to create patterns, frames, and layouts that enhance visual appeal. Designers can combine geometric shapes to create complex compositions or use them individually for simplicity. Understanding the properties of different shapes, such as circles, squares, and triangles, allows designers to convey specific messages and emotions. Geometric shapes can also be used to create visual hierarchy and guide the viewer's eye through a design.`,
    example: 'Using circles and squares to create a modern logo.',
    icon: Circle,
    image: geometricShapesImg
  },
  {
    id: '33',
    title: 'Organic Shapes',
    category: 'Shape & Form',
    description: 'Utilize organic shapes to evoke natural and fluid designs.',
    detailedContent: `Organic shapes are free-form and often inspired by nature. They can create a sense of fluidity and movement in design, contrasting with the rigidity of geometric shapes. Designers can use organic shapes to evoke emotions and create a more approachable and friendly aesthetic. Incorporating organic shapes can enhance the overall feel of a design, making it more relatable and engaging. It's essential to balance organic shapes with other design elements to maintain harmony and clarity.`,
    example: 'Using flowing lines and curves in a logo design.',
    icon: Waves,
    image: organicShapesImg
  },
  {
    id: '34',
    title: 'Abstract Forms',
    category: 'Shape & Form',
    description: 'Explore abstract forms to create unique and innovative designs.',
    detailedContent: `Abstract forms are non-representational shapes that can evoke emotions and ideas without depicting specific objects. They allow designers to explore creativity and push boundaries in their work. Abstract forms can be used to create visually striking compositions that capture attention and provoke thought. By experimenting with colors, textures, and arrangements, designers can create unique designs that stand out. Understanding the principles of abstraction helps designers communicate complex ideas effectively through visual means.`,
    example: 'Creating a logo using abstract shapes to represent a brand.',
    icon: Sparkles,
    image: abstractFormsImg
  },
  {
    id: '35',
    title: 'Depth – Shadows & Layering',
    category: 'Shape & Form',
    description: 'Use shadows and layering to create a sense of depth in design.',
    detailedContent: `Depth in design can be achieved through the use of shadows and layering. By adding shadows to elements, designers can create a three-dimensional effect that enhances realism and visual interest. Layering elements can also contribute to depth, allowing for a more dynamic composition. Understanding light and shadow principles is essential for creating convincing depth in design. Designers should consider the direction of light and the placement of elements to achieve a balanced and visually appealing result.`,
    example: 'Using drop shadows on buttons to create a 3D effect.',
    icon: Box,
    image: depthImg
  },
  {
    id: '36',
    title: 'Perspective – 1-point, 2-point, 3-point',
    category: 'Shape & Form',
    description: 'Apply perspective techniques to create realistic depth in designs.',
    detailedContent: `Perspective techniques, such as 1-point, 2-point, and 3-point perspective, are essential for creating realistic depth in design. These techniques involve drawing elements in a way that mimics how they appear in the real world, with lines converging at vanishing points. Understanding perspective allows designers to create more immersive and engaging compositions. By applying perspective principles, designers can enhance the spatial relationships between elements and create a sense of realism in their work.`,
    example: 'Using 2-point perspective to create a realistic room layout.',
    icon: Pyramid,
    image: perspectiveImg
  },
  {
    id: '37',
    title: 'Volume – 3D Effects',
    category: 'Shape & Form',
    description: 'Incorporate 3D effects to add dimension to designs.',
    detailedContent: `3D effects can add volume and depth to designs, making them more engaging and visually appealing. Designers can achieve 3D effects through techniques such as shading, gradients, and perspective. By creating the illusion of depth, designers can enhance the viewer's experience and draw attention to specific elements. Understanding how light interacts with objects is crucial for creating convincing 3D effects. Designers should experiment with different techniques to find the best approach for their specific projects.`,
    example: 'Using gradients and shadows to create a 3D button effect.',
    icon: Box,
    image: volume3dImg
  },
  {
    id: '38',
    title: 'Visual Weight – How elements draw attention',
    category: 'Shape & Form',
    description: 'Understand visual weight to create balanced compositions.',
    detailedContent: `Visual weight refers to the perceived importance of an element in a design. Factors such as size, color, and placement influence visual weight. Designers must consider visual weight when arranging elements to create balanced compositions. Heavier elements draw more attention, while lighter elements recede into the background. By understanding visual weight, designers can guide the viewer's eye and create a sense of harmony in their work. Balancing visual weight is essential for effective design and communication.`,
    example: 'Using larger, darker elements to draw attention to key areas.',
    icon: Target,
    image: visualWeightImg
  },
  {
    id: '39',
    title: 'Space Division – Foreground, Midground, Background',
    category: 'Shape & Form',
    description: 'Utilize space division to create depth and context in designs.',
    detailedContent: `Space division involves organizing elements into foreground, midground, and background layers. This technique creates depth and context in designs, allowing viewers to navigate the composition more easily. By strategically placing elements in different layers, designers can guide the viewer's eye and create a sense of hierarchy. Understanding space division is essential for effective layout and composition, as it enhances visual storytelling and engagement.`,
    example: 'Placing a main subject in the foreground with supporting elements in the background.',
    icon: Layers,
    image: spaceDivisionImg
  },
  {
    id: '40',
    title: 'Iconography Basics',
    category: 'Shape & Form',
    description: 'Learn the fundamentals of creating and using icons.',
    detailedContent: `Iconography involves the design and use of icons to represent ideas, actions, or objects. Effective icons are simple, recognizable, and convey meaning quickly. Designers should consider factors such as style, size, and context when creating or selecting icons. Consistency in icon design enhances usability and contributes to a cohesive visual language. Understanding iconography basics is essential for creating effective user interfaces and enhancing communication through visual means.`,
    example: 'Using a simple trash can icon to represent delete functionality.',
    icon: Shapes,
    image: iconographySymbolsImg
  },
  {
    id: '41',
    title: 'Texture & Pattern',
    category: 'Shape & Form',
    description: 'Incorporate texture and patterns to add depth and interest.',
    detailedContent: `Texture and patterns can enhance visual interest and depth in design. Textures add tactile qualities, while patterns create repetition and rhythm. Designers can use texture and patterns to evoke emotions and create a specific atmosphere. It's essential to balance texture and patterns with other design elements to maintain clarity and cohesion. By experimenting with different textures and patterns, designers can create unique and engaging compositions that capture attention.`,
    example: 'Using a subtle fabric texture in the background of a website.',
    icon: Paintbrush,
    image: texturePatternImg
  },
  {
    id: '42',
    title: 'Usability Principles',
    category: 'UI Design',
    description: 'Understand key principles for creating user-friendly interfaces.',
    detailedContent: `Usability principles focus on creating interfaces that are easy to use and navigate. Key principles include consistency, feedback, simplicity, and accessibility. Designers should prioritize user needs and behaviors when creating interfaces, ensuring that users can accomplish their goals efficiently. Conducting user testing and gathering feedback are essential for refining usability. By adhering to usability principles, designers can create interfaces that enhance user satisfaction and engagement.`,
    example: 'Designing a navigation menu that is intuitive and easy to use.',
    icon: Users,
    image: uiConsistencyImg
  },
  {
    id: '43',
    title: 'Accessibility (WCAG)',
    category: 'UI Design',
    description: 'Ensure designs are accessible to all users, including those with disabilities.',
    detailedContent: `Accessibility in design refers to creating products that can be used by people with disabilities. The Web Content Accessibility Guidelines (WCAG) provide standards for making web content accessible. Designers should consider factors such as color contrast, keyboard navigation, and screen reader compatibility. By prioritizing accessibility, designers can create inclusive experiences that cater to a diverse audience. Understanding accessibility principles is essential for responsible and effective design.`,
    example: 'Using alt text for images to ensure screen reader compatibility.',
    icon: Eye,
    image: accessibilityImg
  },
  {
    id: '44',
    title: 'Consistency in UI Elements',
    category: 'UI Design',
    description: 'Maintain consistency in design elements for a cohesive experience.',
    detailedContent: `Consistency in UI design refers to using similar elements and behaviors throughout an interface. This includes consistent colors, typography, buttons, and layouts. Maintaining consistency enhances usability and helps users navigate the interface more intuitively. Designers should create style guides and design systems to ensure consistency across all elements. By prioritizing consistency, designers can create a seamless and cohesive user experience.`,
    example: 'Using the same button style across all pages of a website.',
    icon: Layout,
    image: microinteractionsImg
  },
  {
    id: '45',
    title: 'Microinteractions',
    category: 'UI Design',
    description: 'Incorporate small interactions to enhance user engagement.',
    detailedContent: `Microinteractions are subtle animations or design elements that enhance user engagement and provide feedback. They can include hover effects, button animations, and notifications. Microinteractions improve usability by guiding users and providing visual cues. Designers should consider the context and purpose of microinteractions to ensure they enhance the user experience without being distracting. By incorporating microinteractions, designers can create more dynamic and engaging interfaces.`,
    example: 'Using a subtle animation when a button is clicked.',
    icon: Sparkles,
    image: feedbackAffordanceImg
  },
  {
    id: '46',
    title: 'Feedback & Affordance',
    category: 'UI Design',
    description: 'Provide clear feedback to users to enhance interaction.',
    detailedContent: `Feedback and affordance are essential concepts in UI design that enhance user interaction. Feedback refers to the response a user receives after an action, while affordance indicates how an element can be used. Designers should ensure that users receive clear feedback for their actions, such as visual changes when buttons are clicked. Affordance should be intuitive, guiding users on how to interact with elements. By prioritizing feedback and affordance, designers can create more user-friendly interfaces.`,
    example: 'Changing the color of a button when hovered over to indicate interactivity.',
    icon: Lightbulb,
    image: ctaDesignImg
  },
  {
    id: '47',
    title: 'Call-to-Action Design',
    category: 'UI Design',
    description: 'Create effective call-to-action elements to drive user engagement.',
    detailedContent: `Call-to-action (CTA) design focuses on creating elements that encourage users to take specific actions, such as signing up or making a purchase. Effective CTAs are visually distinct, use action-oriented language, and are strategically placed within the design. Designers should consider color, size, and placement to ensure CTAs stand out and attract attention. By optimizing CTA design, designers can enhance user engagement and drive conversions.`,
    example: 'Using a bright button with clear text to encourage sign-ups.',
    icon: Target,
    image: navigationPatternsImg
  },
  {
    id: '48',
    title: 'Navigation Patterns',
    category: 'UI Design',
    description: 'Implement intuitive navigation patterns for seamless user experience.',
    detailedContent: `Navigation patterns are essential for guiding users through an interface. Effective navigation should be intuitive, allowing users to find information quickly and easily. Common navigation patterns include top navigation bars, side menus, and breadcrumb trails. Designers should prioritize clarity and simplicity in navigation design, ensuring that users can easily understand how to move through the interface. By implementing effective navigation patterns, designers can enhance usability and improve the overall user experience.`,
    example: 'Using a sticky navigation bar that remains visible as users scroll.',
    icon: Monitor,
    image: responsiveAdaptiveImg
  },
  {
    id: '49',
    title: 'Responsive & Adaptive Design',
    category: 'UI Design',
    description: 'Create designs that adapt to different screen sizes and devices.',
    detailedContent: `Responsive and adaptive design focuses on creating interfaces that work well across various devices and screen sizes. Responsive design uses fluid grids and flexible images to adjust layouts based on screen size, while adaptive design involves creating distinct layouts for specific screen sizes. Designers should prioritize usability and accessibility in responsive and adaptive design, ensuring that users have a seamless experience regardless of the device they use. By implementing these design principles, designers can create user-friendly interfaces that cater to diverse audiences.`,
    example: 'Designing a website that adjusts its layout for mobile and desktop users.',
    icon: Tablet,
    image: cognitiveFlowImg
  },
  {
    id: '50',
    title: 'Cognitive Flow',
    category: 'UI Design',
    description: 'Design interfaces that guide users through a logical flow of information.',
    detailedContent: `Cognitive flow refers to the mental process users experience when interacting with a design. Designers should create interfaces that guide users through a logical flow of information, minimizing cognitive load and enhancing usability. This involves organizing content in a way that makes sense to users and providing clear pathways for navigation. By prioritizing cognitive flow, designers can create more intuitive and user-friendly experiences that facilitate understanding and engagement.`,
    example: 'Structuring a website’s content to lead users from introduction to conclusion.',
    icon: Code,
    image: errorStatesImg
  },
  {
    id: '51',
    title: 'Error State Design',
    category: 'UI Design',
    description: 'Design helpful and user-friendly error states.',
    detailedContent: `Error state design focuses on creating clear and helpful messages when something goes wrong in an interface. Effective error states should explain what happened, why it happened, and how users can fix it. Use friendly language, avoid technical jargon, and provide actionable solutions. Good error states reduce user frustration and maintain trust in the product. Designers should also consider the visual design of error states, using appropriate colors and icons to convey the severity of the issue.`,
    example: 'Showing a friendly message with retry option when a form submission fails.',
    icon: Zap,
    image: errorStatesImg
  },
  {
    id: '52',
    title: 'Empty State Design',
    category: 'UI Design',
    description: 'Create engaging empty states that guide users to action.',
    detailedContent: `Empty states occur when there is no content to display in an interface, such as a new user's empty inbox or an empty shopping cart. Effective empty state design should explain the purpose of the area, provide guidance on how to populate it, and encourage action. Use illustrations, helpful copy, and clear call-to-action buttons to make empty states engaging rather than confusing. Well-designed empty states can significantly improve user onboarding and engagement.`,
    example: 'Using an illustration and "Add your first project" button in an empty dashboard.',
    icon: FileText,
    image: emptyStatesImg
  },
  {
    id: '53',
    title: 'Loading State Design',
    category: 'UI Design',
    description: 'Design engaging loading states that keep users informed.',
    detailedContent: `Loading states communicate that the system is working and the user should wait. Effective loading designs include progress indicators, skeleton screens, and animated placeholders. They reduce perceived waiting time and prevent users from thinking the app has frozen. Consider using skeleton screens for content loading, spinners for brief actions, and progress bars for longer processes. The key is matching the loading indicator to the expected wait time and providing context when possible.`,
    example: 'Using skeleton screens while loading a feed of content cards.',
    icon: Cpu,
    image: loadingStatesImg
  },
  {
    id: '54',
    title: 'Timing & Easing in Animation',
    category: 'Motion & Animation',
    description: 'Master timing and easing curves for natural-feeling animations.',
    detailedContent: `Timing and easing are fundamental to creating animations that feel natural and intentional. Timing refers to the duration of an animation, while easing controls the acceleration and deceleration. Common easing functions include ease-in (slow start), ease-out (slow end), and ease-in-out (slow start and end). Natural motion typically follows ease-out curves for elements entering the screen and ease-in curves for elements exiting. Understanding timing and easing helps create interfaces that feel responsive and polished.`,
    example: 'Using ease-out timing for a dropdown menu appearing on screen.',
    icon: Activity,
    image: timingEasingImg
  },
  {
    id: '55',
    title: 'Keyframe Animation',
    category: 'Motion & Animation',
    description: 'Create complex animations using keyframe techniques.',
    detailedContent: `Keyframe animation allows designers to create complex, multi-step animations by defining specific points (keyframes) along the animation timeline. Between keyframes, the browser interpolates the intermediate states. This technique enables sophisticated animations like bouncing effects, complex transitions, and animated illustrations. Keyframes give precise control over every aspect of an animation, from position and scale to color and opacity. When used thoughtfully, keyframe animations can create memorable and engaging user experiences.`,
    example: 'Creating a bouncing notification badge using keyframe animation.',
    icon: Sparkles,
    image: keyframesImg
  },
  {
    id: '56',
    title: 'Motion Hierarchy',
    category: 'Motion & Animation',
    description: 'Use motion to establish visual hierarchy and guide attention.',
    detailedContent: `Motion hierarchy uses animation to guide users' attention and establish importance in a design. Elements that move attract more attention than static ones, so designers can use motion strategically to highlight key content or actions. Staggered animations can show relationships between elements, while subtle background motion can create depth without distracting from main content. The key is using motion purposefully to enhance understanding and engagement rather than adding animation for its own sake.`,
    example: 'Staggering the entrance animation of list items to show their relationship.',
    icon: TrendingUp,
    image: motionHierarchyImg
  },
  {
    id: '57',
    title: 'Scroll & Parallax Effects',
    category: 'Motion & Animation',
    description: 'Create immersive scroll-based animations and parallax effects.',
    detailedContent: `Scroll-based animations trigger or progress based on the user's scroll position, creating dynamic and engaging experiences. Parallax effects create depth by moving background and foreground elements at different speeds as users scroll. These techniques can make storytelling more immersive and guide users through content in interesting ways. However, they should be used judiciously as excessive scroll effects can be disorienting or negatively impact performance. Always provide fallbacks for users who prefer reduced motion.`,
    example: 'Creating a parallax hero section where background moves slower than text.',
    icon: Layers,
    image: scrollParallaxImg
  },
  {
    id: '58',
    title: 'Logo Design Principles',
    category: 'Branding',
    description: 'Create memorable and versatile logos that represent brands effectively.',
    detailedContent: `Logo design is one of the most critical aspects of brand identity. Effective logos are simple, memorable, versatile, and appropriate for the brand. They should work across different sizes and contexts, from favicons to billboards. Consider how the logo will appear in black and white, as well as in color. The best logos have a timeless quality while still feeling relevant. The design process should start with understanding the brand's values, personality, and target audience before exploring visual concepts.`,
    example: 'Designing a simple, geometric logo that works at any size.',
    icon: Star,
    image: logoDesignImg
  },
  {
    id: '59',
    title: 'Brand Color Strategy',
    category: 'Branding',
    description: 'Develop strategic color palettes that reinforce brand identity.',
    detailedContent: `Brand color strategy involves selecting colors that represent and reinforce a brand's identity. Colors evoke emotions and associations, so choosing the right palette is crucial. Consider primary colors for main brand elements, secondary colors for supporting elements, and neutral colors for backgrounds and text. The palette should be versatile enough for various applications while remaining consistent and recognizable. Document color usage guidelines to ensure consistency across all brand touchpoints.`,
    example: 'Creating a brand palette with a bold primary color and complementary secondaries.',
    icon: Palette,
    image: brandPaletteImg
  },
  {
    id: '60',
    title: 'Brand Typography',
    category: 'Branding',
    description: 'Select and apply typography that reflects brand personality.',
    detailedContent: `Typography is a powerful tool for expressing brand personality. Font choices communicate values and emotions—a tech startup might use a clean, modern sans-serif, while a luxury brand might opt for an elegant serif. Consider readability across different contexts and ensure accessibility. Establish a type hierarchy with specific fonts, sizes, and weights for different content types. Some brands develop custom typefaces for maximum differentiation, while others carefully curate existing fonts that align with their identity.`,
    example: 'Pairing a distinctive display font with a readable body font for brand communications.',
    icon: Type,
    image: brandTypographyImg
  },
  {
    id: '61',
    title: 'Icon Systems',
    category: 'Branding',
    description: 'Create cohesive icon sets that enhance brand communication.',
    detailedContent: `Icon systems are collections of icons designed with consistent visual rules that support a brand's identity. A well-designed icon system uses consistent stroke weights, corner radiuses, sizing, and style across all icons. Icons should be immediately recognizable and work at various sizes. Consider creating guidelines for icon usage, including minimum sizes, spacing, and context. A cohesive icon system enhances usability while reinforcing brand recognition and professional polish.`,
    example: 'Designing a set of outlined icons with consistent 2px stroke weight.',
    icon: Shapes,
    image: iconographySymbolsImg
  },
  {
    id: '62',
    title: 'Imagery & Photography Style',
    category: 'Branding',
    description: 'Define consistent imagery style that aligns with brand identity.',
    detailedContent: `Brand imagery encompasses the visual style of photographs, illustrations, and graphics used across brand communications. Consistent imagery style helps create a recognizable and cohesive brand experience. Define guidelines for color treatment, composition, subject matter, and emotional tone. Consider whether the brand uses photography, illustration, or both, and establish rules for each. Imagery should support the brand story and connect emotionally with the target audience while remaining versatile for different applications.`,
    example: 'Using warm, natural photography with soft lighting for a wellness brand.',
    icon: Camera,
    image: imageryConsistencyImg
  },
  {
    id: '63',
    title: 'Tone of Voice',
    category: 'Branding',
    description: 'Develop consistent brand voice across all communications.',
    detailedContent: `Tone of voice defines how a brand communicates with its audience. It encompasses word choice, sentence structure, personality, and emotional register. A consistent tone of voice helps create recognizable brand communications and builds trust with audiences. Define key characteristics of the brand voice (e.g., friendly, professional, playful, authoritative) and provide examples of dos and don'ts. Consider how tone might vary across different contexts while maintaining the core brand personality.`,
    example: 'Using conversational, encouraging language for a fitness app interface.',
    icon: Briefcase,
    image: toneVoiceImg
  },
  {
    id: '64',
    title: 'Design Systems',
    category: 'Modern Trends',
    description: 'Build comprehensive design systems for scalable, consistent products.',
    detailedContent: `Design systems are collections of reusable components, patterns, and guidelines that help teams build consistent products at scale. They include UI components, design tokens, documentation, and usage guidelines. A well-maintained design system improves efficiency, ensures consistency, and facilitates collaboration between designers and developers. Key elements include component libraries, style guides, pattern libraries, and accessibility guidelines. Design systems evolve over time and require ongoing maintenance and governance.`,
    example: 'Creating a component library with buttons, forms, and cards using design tokens.',
    icon: Code,
    image: glassmorphismImg
  },
  {
    id: '65',
    title: 'Design Tokens',
    category: 'Modern Trends',
    description: 'Implement design tokens for consistent, scalable design decisions.',
    detailedContent: `Design tokens are named entities that store visual design decisions such as colors, spacing, typography, and shadows. They create a shared language between design and development, ensuring consistency across platforms and products. Tokens can be organized into tiers: global tokens define base values, semantic tokens add meaning, and component tokens apply to specific elements. Using tokens makes it easier to maintain themes, support dark mode, and make global design changes efficiently.`,
    example: 'Using --color-primary and --spacing-md tokens instead of hardcoded values.',
    icon: Cpu,
    image: neumorphismImg
  },
  {
    id: '66',
    title: 'Responsive Typography',
    category: 'Typography',
    description: 'Scale typography fluidly across different screen sizes for optimal readability.',
    detailedContent: `Responsive typography ensures text remains readable and aesthetically pleasing across all device sizes. This involves using relative units (rem, em, vw) instead of fixed pixels, implementing fluid type scales that smoothly transition between breakpoints, and adjusting line heights and letter spacing for different contexts. Modern CSS features like clamp() enable truly fluid typography that scales proportionally. Consider how type hierarchy translates to mobile—headings may need different ratios on smaller screens. Responsive typography enhances accessibility and user experience across the entire device spectrum.`,
    example: 'Using clamp(1rem, 2.5vw, 2rem) for headings that scale smoothly from mobile to desktop.',
    icon: Smartphone,
    image: webTypographyImg
  },
  {
    id: '67',
    title: 'Line Height & Rhythm',
    category: 'Typography',
    description: 'Create vertical rhythm through consistent line height and spacing relationships.',
    detailedContent: `Line height (leading) and vertical rhythm are crucial for comfortable reading. A baseline grid ensures consistent vertical spacing throughout a design, creating harmony between text blocks, images, and other elements. For body text, line heights between 1.4-1.6 typically work well, while headings may use tighter spacing (1.1-1.3). Establishing a base unit and building all spacing as multiples of that unit creates mathematical relationships that feel natural and organized. Good vertical rhythm reduces cognitive load and makes content easier to scan and read.`,
    example: 'Setting body text to line-height: 1.5 with paragraph margins based on 8px grid.',
    icon: AlignCenter,
    image: leadingImg
  },
  {
    id: '68',
    title: 'Variable Fonts',
    category: 'Typography',
    description: 'Leverage variable font technology for flexible, performant typography.',
    detailedContent: `Variable fonts contain multiple variations (weight, width, slant) in a single file, offering unprecedented typographic flexibility with reduced file sizes. Instead of loading separate files for regular, bold, and italic, one variable font can interpolate between any values. This enables smooth animations, responsive weight adjustments, and precise control over optical sizing. Variable fonts support custom axes beyond standard properties, allowing unique typographic expressions. They're particularly valuable for responsive design, where type weight can be tied to viewport width for optimal readability at any size.`,
    example: 'Animating font-weight from 300 to 700 on hover using a single variable font file.',
    icon: Sliders,
    image: fontTypesImg
  },
  {
    id: '69',
    title: 'Negative Space Design',
    category: 'Layout & Composition',
    description: 'Use empty space strategically to create focus, balance, and visual breathing room.',
    detailedContent: `Negative space (white space) is a powerful design element that provides visual rest, emphasizes important content, and creates sophisticated compositions. It's not merely "empty" space—it actively shapes how viewers perceive and navigate a design. Strategic use of negative space can convey luxury, simplicity, or creativity. Macro white space (between major elements) affects overall layout feel, while micro white space (within text and buttons) affects readability and usability. Embrace emptiness as a design decision, not wasted space. Sometimes what you leave out defines the design more than what you include.`,
    example: 'A hero section with generous margins that draws attention to a centered headline.',
    icon: Minimize2,
    image: whitespaceImg
  },
  {
    id: '70',
    title: 'Visual Grouping & Proximity',
    category: 'Design Principles',
    description: 'Group related elements together using spatial relationships to show connections.',
    detailedContent: `The Gestalt principle of proximity states that elements placed close together are perceived as related. This fundamental principle guides effective information architecture and visual organization. Related items should be grouped with consistent, tight spacing, while unrelated groups should be separated by larger gaps. This creates clear visual relationships without needing explicit containers or dividers. Effective proximity reduces cognitive load by helping users quickly understand content structure. Consider proximity in navigation menus, form fields, card layouts, and any interface where relationships between elements matter.`,
    example: 'Form labels positioned close to their inputs, with larger spacing between field groups.',
    icon: Layers,
    image: marginsPaddingImg
  },
  {
    id: '71',
    title: 'Gestalt Principles',
    category: 'Design Principles',
    description: 'Apply psychological principles of visual perception to create cohesive designs.',
    detailedContent: `Gestalt principles describe how humans naturally organize visual elements into groups and patterns. Key principles include: Proximity (close elements seem related), Similarity (similar elements seem related), Closure (minds complete incomplete shapes), Continuity (elements following a line seem related), Figure-Ground (distinguishing objects from backgrounds), and Common Fate (elements moving together seem related). Understanding these principles helps designers create intuitive interfaces that align with natural human perception. Gestalt thinking explains why certain layouts "work" and helps predict how users will interpret visual relationships.`,
    example: 'Using consistent icons and colors to group related navigation items together.',
    icon: Eye,
    image: visualHierarchyImg
  },
  {
    id: '72',
    title: 'Affordance & Signifiers',
    category: 'UI Design',
    description: 'Design interactive elements that clearly communicate how they can be used.',
    detailedContent: `Affordances are the possible actions an object allows, while signifiers are the clues that communicate those affordances. A button affords clicking—its raised appearance, shadow, and cursor change are signifiers. Good interface design makes affordances obvious through visual signifiers: clickable elements look clickable, draggable elements suggest movement, and input fields invite typing. Consistency in signifiers builds user confidence. When affordances aren't obvious, users struggle and make errors. Test designs with users to verify signifiers successfully communicate intended interactions.`,
    example: 'A raised button with shadow and hover state that clearly invites clicking.',
    icon: Target,
    image: feedbackAffordanceImg
  },
  {
    id: '73',
    title: 'Skeleton Screens',
    category: 'UI Design',
    description: 'Show content placeholders during loading to improve perceived performance.',
    detailedContent: `Skeleton screens display a simplified wireframe version of the UI while content loads, providing immediate visual feedback and reducing perceived wait time. Unlike spinners, skeletons show where content will appear, preparing users mentally for the incoming layout. This technique feels faster than traditional loading indicators because it suggests progress rather than waiting. Implement skeletons that match your actual content structure—rectangular shapes for images, lines for text blocks. Add subtle shimmer animations to indicate activity. Skeleton screens are particularly effective for content-heavy applications and feed-based interfaces.`,
    example: 'Showing gray rectangles and lines while a user profile loads, matching final layout.',
    icon: Activity,
    image: loadingStatesImg
  },
  {
    id: '74',
    title: 'Progressive Disclosure',
    category: 'UX Process',
    description: 'Reveal information and options progressively to reduce cognitive overload.',
    detailedContent: `Progressive disclosure presents only essential information initially, revealing details and advanced options as users need them. This technique simplifies complex interfaces by reducing visible options while maintaining access to full functionality. Common implementations include expandable sections, "show more" buttons, stepped forms, and contextual menus. Progressive disclosure respects user attention, helping beginners focus on core tasks while allowing experts to access advanced features. The key is identifying what users need immediately versus what can be deferred, based on user research and task analysis.`,
    example: 'A settings page showing basic options with "Advanced Settings" expandable section.',
    icon: Lightbulb,
    image: cognitiveFlowImg
  },
  {
    id: '75',
    title: 'Content Choreography',
    category: 'Layout & Composition',
    description: 'Orchestrate content reflow and priority across responsive breakpoints.',
    detailedContent: `Content choreography describes how content elements rearrange, resize, and reprioritize across different screen sizes. Unlike simple responsive reflow, choreography considers the narrative and priority of each element. Important content should remain prominent, secondary elements may reposition or collapse, and the reading order should make sense at every breakpoint. Plan mobile-first to establish core content priorities, then enhance for larger screens. Consider how images, text, and interactive elements will dance together as viewport changes. Good choreography maintains user experience integrity across all devices.`,
    example: 'Hero image becoming background on mobile while CTA moves above the fold.',
    icon: Layout,
    image: responsiveAdaptiveImg
  },
  {
    id: '76',
    title: 'Optical Alignment',
    category: 'Design Principles',
    description: 'Adjust element positions for visual balance rather than strict mathematical alignment.',
    detailedContent: `Optical alignment accounts for how humans perceive shapes differently than machines calculate them. Mathematically centered elements often look off-center because visual weight varies with shape, size, and color. Triangles need to sit slightly lower, circles need more space on sides, and heavy elements need more surrounding space. Icons in buttons may need horizontal adjustment to appear centered. Text with descenders may need vertical adjustment. The goal is perceived alignment, not pixel perfection. Trust your eyes over your rulers—if it looks wrong, adjust it until it looks right.`,
    example: 'Shifting a play icon right by 2px within a circular button to appear centered.',
    icon: Ruler,
    image: textAlignmentImg
  },
  {
    id: '77',
    title: 'Semantic Color Usage',
    category: 'Color Fundamentals',
    description: 'Use color consistently to convey meaning and system states across interfaces.',
    detailedContent: `Semantic colors communicate meaning beyond aesthetics: red for errors/danger, green for success, yellow for warnings, blue for information. Consistent semantic color usage helps users quickly understand system states and required actions. Define a semantic color palette separate from brand colors, ensuring sufficient contrast for accessibility. Consider color-blind users by pairing color with icons, text, or patterns. Semantic colors should be applied systematically—every error should look like an error, every success like success. This consistency builds user confidence and reduces cognitive load when interpreting interface feedback.`,
    example: 'Using red backgrounds with error icons for form validation, consistent throughout the app.',
    icon: Palette,
    image: colorPsychologyImg
  },
  {
    id: '78',
    title: 'Touch Target Sizing',
    category: 'UI Design',
    description: 'Size interactive elements appropriately for reliable touch and click interactions.',
    detailedContent: `Touch targets must be large enough for comfortable, accurate interaction. Major platform guidelines recommend 44-48pt minimum for primary actions. Small targets cause frustration, errors, and accessibility issues. Consider spacing between targets to prevent accidental taps. The visual element can be smaller than the touch target—padding extends the interactive area. On desktop, smaller targets may work with precise mouse input, but design mobile-first. Test on actual devices to verify targets feel comfortable for users with various finger sizes and motor abilities.`,
    example: 'A navigation icon visually 24px but with 48px touch area including padding.',
    icon: Smartphone,
    image: responsiveAdaptiveImg
  },
  {
    id: '79',
    title: 'Micro-animations',
    category: 'Motion & Animation',
    description: 'Use subtle animations to provide feedback and enhance interface personality.',
    detailedContent: `Micro-animations are small, purposeful animations that enhance user experience without demanding attention. They provide feedback (button press acknowledgment), indicate state changes (toggle switching), guide attention (subtle pulse on new notification), and add personality (playful hover effects). Keep micro-animations quick (150-300ms typically), subtle, and purposeful—every animation should serve a function. Too many or too slow animations become annoying. Micro-animations should feel natural and almost subconscious, improving experience without users consciously noticing them.`,
    example: 'A checkbox that animates with a quick bounce when checked, confirming the action.',
    icon: Zap,
    image: microinteractionsImg
  },
  {
    id: '80',
    title: 'Data Visualization Basics',
    category: 'Modern Trends',
    description: 'Present complex data clearly through appropriate chart types and visual encoding.',
    detailedContent: `Effective data visualization makes complex information understandable at a glance. Choose chart types based on what you're communicating: bar charts for comparison, line charts for trends, pie charts for parts of whole (use sparingly), scatter plots for relationships. Use visual encoding—position, length, color, size—to represent data values. Prioritize clarity over decoration; avoid 3D effects that distort perception. Label directly when possible instead of relying on legends. Consider accessibility: don't rely solely on color, ensure sufficient contrast, and provide alternative text descriptions for screen readers.`,
    example: 'A line chart showing monthly revenue with clear axis labels and direct value annotations.',
    icon: BarChart3,
    image: dataVisualizationImg
  }
];

export default designFundamentals;
