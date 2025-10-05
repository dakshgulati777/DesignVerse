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
    icon: Balance,
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
    icon: FontTypes,
    image: fontPairingImg
  },
  {
    id: '15',
    title: 'Font Hierarchy – Headings, Subheadings, Body',
    category: 'Typography',
    description: 'Establish a clear hierarchy in text to guide the reader.',
    detailedContent: `Font hierarchy is the arrangement of text elements in a way that signifies their importance. It helps guide the reader through the content, making it easier to digest information. Designers can create hierarchy through font size, weight, and style. Headings should be more prominent than subheadings, which should be more noticeable than body text. Consistent use of hierarchy across a design ensures clarity and enhances user experience, allowing readers to quickly identify key information.`,
    example: 'Using larger, bolder fonts for headings and smaller, lighter fonts for body text.',
    icon: TextAlignment,
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
    icon: TextAlignment,
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
    icon: Depth,
    image: depthImg
  },
  {
    id: '36',
    title: 'Perspective – 1-point, 2-point, 3-point',
    category: 'Shape & Form',
    description: 'Apply perspective techniques to create realistic depth in designs.',
    detailedContent: `Perspective techniques, such as 1-point, 2-point, and 3-point perspective, are essential for creating realistic depth in design. These techniques involve drawing elements in a way that mimics how they appear in the real world, with lines converging at vanishing points. Understanding perspective allows designers to create more immersive and engaging compositions. By applying perspective principles, designers can enhance the spatial relationships between elements and create a sense of realism in their work.`,
    example: 'Using 2-point perspective to create a realistic room layout.',
    icon: Perspective,
    image: perspectiveImg
  },
  {
    id: '37',
    title: 'Volume – 3D Effects',
    category: 'Shape & Form',
    description: 'Incorporate 3D effects to add dimension to designs.',
    detailedContent: `3D effects can add volume and depth to designs, making them more engaging and visually appealing. Designers can achieve 3D effects through techniques such as shading, gradients, and perspective. By creating the illusion of depth, designers can enhance the viewer's experience and draw attention to specific elements. Understanding how light interacts with objects is crucial for creating convincing 3D effects. Designers should experiment with different techniques to find the best approach for their specific projects.`,
    example: 'Using gradients and shadows to create a 3D button effect.',
    icon: Volume,
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
    icon: IconographySymbols,
    image: iconographySymbolsImg
  },
  {
    id: '41',
    title: 'Texture & Pattern',
    category: 'Shape & Form',
    description: 'Incorporate texture and patterns to add depth and interest.',
    detailedContent: `Texture and patterns can enhance visual interest and depth in design. Textures add tactile qualities, while patterns create repetition and rhythm. Designers can use texture and patterns to evoke emotions and create a specific atmosphere. It's essential to balance texture and patterns with other design elements to maintain clarity and cohesion. By experimenting with different textures and patterns, designers can create unique and engaging compositions that capture attention.`,
    example: 'Using a subtle fabric texture in the background of a website.',
    icon: TexturePattern,
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
    icon: Accessibility,
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
];

export default designFundamentals;
