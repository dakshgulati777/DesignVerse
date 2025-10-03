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
import flexboxImg from '@/assets/fundamentals/flexbox.jpg';
import cssGridImg from '@/assets/fundamentals/css-grid.jpg';
import responsiveDesignImg from '@/assets/fundamentals/responsive-design.jpg';
import mobileFirstImg from '@/assets/fundamentals/mobile-first.jpg';
import asymmetricLayoutImg from '@/assets/fundamentals/asymmetric-layout.jpg';
import colorAccessibilityImg from '@/assets/fundamentals/color-accessibility.jpg';
import gradientsImg from '@/assets/fundamentals/gradients.jpg';
import monochromaticImg from '@/assets/fundamentals/monochromatic.jpg';
import fontPairingImg from '@/assets/fundamentals/font-pairing.jpg';
import typeHierarchyImg from '@/assets/fundamentals/type-hierarchy.jpg';
import readabilityImg from '@/assets/fundamentals/readability.jpg';
import kerningImg from '@/assets/fundamentals/kerning.jpg';
import lineHeightImg from '@/assets/fundamentals/line-height.jpg';
import rhythmImg from '@/assets/fundamentals/rhythm.jpg';
import proximityImg from '@/assets/fundamentals/proximity.jpg';
import scaleImg from '@/assets/fundamentals/scale.jpg';
import repetitionImg from '@/assets/fundamentals/repetition.jpg';
import alignmentImg from '@/assets/fundamentals/alignment.jpg';
import depthImg from '@/assets/fundamentals/depth.jpg';
import microinteractionsImg from '@/assets/fundamentals/microinteractions.jpg';
import animationImg from '@/assets/fundamentals/animation.jpg';
import transitionsImg from '@/assets/fundamentals/transitions.jpg';
import loadingStatesImg from '@/assets/fundamentals/loading-states.jpg';
import errorStatesImg from '@/assets/fundamentals/error-states.jpg';
import emptyStatesImg from '@/assets/fundamentals/empty-states.jpg';
import userFlowsImg from '@/assets/fundamentals/user-flows.jpg';
import informationArchitectureImg from '@/assets/fundamentals/information-architecture.jpg';
import accessibilityImg from '@/assets/fundamentals/accessibility.jpg';
import usabilityImg from '@/assets/fundamentals/usability.jpg';
import userResearchImg from '@/assets/fundamentals/user-research.jpg';
import personasImg from '@/assets/fundamentals/personas.jpg';
import logoDesignImg from '@/assets/fundamentals/logo-design.jpg';
import brandIdentityImg from '@/assets/fundamentals/brand-identity.jpg';
import visualConsistencyImg from '@/assets/fundamentals/visual-consistency.jpg';
import buttonDesignImg from '@/assets/fundamentals/button-design.jpg';
import formDesignImg from '@/assets/fundamentals/form-design.jpg';
import navigationPatternsImg from '@/assets/fundamentals/navigation-patterns.jpg';
import cardDesignImg from '@/assets/fundamentals/card-design.jpg';
import modalDesignImg from '@/assets/fundamentals/modal-design.jpg';
import iconSystemsImg from '@/assets/fundamentals/icon-systems.jpg';
import designSystemsImg from '@/assets/fundamentals/design-systems.jpg';
import designTokensImg from '@/assets/fundamentals/design-tokens.jpg';
import responsiveImagesImg from '@/assets/fundamentals/responsive-images.jpg';
import performanceImg from '@/assets/fundamentals/performance.jpg';
import contentStrategyImg from '@/assets/fundamentals/content-strategy.jpg';
import microcopyImg from '@/assets/fundamentals/microcopy.jpg';
import ctaDesignImg from '@/assets/fundamentals/cta-design.jpg';
import storytellingImg from '@/assets/fundamentals/storytelling.jpg';

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
    title: 'Contrast (Color, Value, Size)',
    category: 'Design Principles',
    description: 'Create visual interest and hierarchy by using distinct differences in color, value (lightness/darkness), and size between elements.',
    detailedContent: `Contrast is a fundamental design principle that enhances visual appeal and clarity by emphasizing differences between elements. It can be achieved through variations in color, value (lightness/darkness), size, shape, and texture. Effective use of contrast creates visual hierarchy, draws attention to key elements, and improves readability.

    Color contrast involves using complementary or contrasting colors to make elements stand out. For example, placing a bright color against a muted background can highlight a call-to-action button. Value contrast refers to the difference in lightness or darkness between elements. High value contrast, such as black text on a white background, improves readability, while low value contrast can create a subtle, sophisticated look.
    
    Size contrast involves varying the size of elements to create visual interest and hierarchy. Larger elements naturally attract more attention, making them ideal for headlines or important visuals. Shape contrast uses different shapes to differentiate elements and add visual variety. Combining geometric and organic shapes can create a dynamic and engaging design.
    
    Texture contrast involves using different textures to add depth and interest to a design. Combining smooth and rough textures can create a tactile feel and make elements stand out. By strategically using contrast, designers can guide the viewer's eye, create visual interest, and ensure that important information is easily noticed and understood. Mastering contrast is essential for creating visually appealing and effective designs.`,
    example: 'White text on a black background, large headlines with small body text, using a bright accent color in a minimalist design',
    icon: ContrastIcon,
    image: contrastImg
  },
  {
    id: '3',
    title: 'Color Harmony (Complementary, Analogous, Triadic)',
    category: 'Color Fundamentals',
    description: 'Create visually pleasing color schemes using complementary (opposite colors), analogous (adjacent colors), or triadic (equidistant colors) relationships on the color wheel.',
    detailedContent: `Color harmony is the principle of creating visually pleasing and balanced color combinations. It involves selecting colors that work well together to create a cohesive and aesthetically pleasing design. There are several established color harmonies that designers use to achieve this.

    Complementary color harmony involves using colors that are opposite each other on the color wheel, such as red and green or blue and orange. These combinations create high contrast and can make elements stand out. Analogous color harmony uses colors that are adjacent to each other on the color wheel, such as blue, blue-green, and green. These combinations create a harmonious and soothing effect.
    
    Triadic color harmony involves using three colors that are equally spaced on the color wheel, such as red, yellow, and blue. These combinations are vibrant and balanced. Other color harmonies include monochromatic (using different shades of a single color) and tetradic (using two pairs of complementary colors).
    
    When selecting colors for a design, it's important to consider the overall mood and message you want to convey. Warm colors like red, orange, and yellow evoke feelings of energy and excitement, while cool colors like blue, green, and purple evoke feelings of calmness and serenity. By understanding color harmonies and the psychological effects of colors, designers can create visually appealing and effective designs that resonate with their target audience.`,
    example: 'A website using shades of blue and purple (analogous), a poster with red and green accents (complementary), a logo with red, yellow, and blue elements (triadic)',
    icon: Palette,
    image: colorHarmonyImg
  },
  {
    id: '4',
    title: 'Typography (Font Choice, Hierarchy, Readability)',
    category: 'Typography',
    description: 'Effectively communicate through strategic font selection, establishing clear visual hierarchy, and ensuring optimal readability for the target audience.',
    detailedContent: `Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. It involves selecting appropriate fonts, establishing a clear visual hierarchy, and ensuring optimal readability for the target audience. Effective typography is essential for creating engaging and user-friendly designs.

    Font choice is a critical aspect of typography. Different fonts convey different moods and messages. Serif fonts, with their small decorative strokes, are often used for traditional and formal designs, while sans-serif fonts, without the strokes, are typically used for modern and minimalist designs. It's important to choose fonts that align with the overall tone and style of the design.
    
    Visual hierarchy is another important element of typography. It involves organizing text in a way that guides the reader's eye and highlights important information. This can be achieved through variations in font size, weight, and color. Headlines should be larger and bolder than body text, and key phrases can be emphasized with italics or bolding.
    
    Readability is the ultimate goal of typography. Text should be easy to read and understand. Factors that affect readability include font size, line height, letter spacing, and contrast. It's important to choose font sizes that are appropriate for the target audience and to ensure that there is sufficient contrast between the text and the background. By mastering typography, designers can create visually appealing and effective designs that communicate their message clearly and effectively.`,
    example: 'Using a large, bold font for headlines and a smaller, lighter font for body text, ensuring sufficient contrast between text and background, choosing fonts that are easy to read on different devices',
    icon: Type,
    image: typographyImg
  },
  {
    id: '5',
    title: 'Grid Systems (Layout, Alignment, Consistency)',
    category: 'Layout & Composition',
    description: 'Structure content effectively using grid systems to ensure consistent layout, precise alignment, and a visually harmonious composition.',
    detailedContent: `Grid systems are a fundamental tool in design for structuring content in a consistent and visually harmonious way. They provide a framework for arranging elements on a page or screen, ensuring that everything is aligned and balanced. Grid systems are particularly useful for creating complex layouts with multiple elements.

    A grid system typically consists of a series of vertical and horizontal lines that divide the page into columns and rows. These lines serve as guides for placing elements, ensuring that they are aligned and spaced consistently. The number of columns and rows in a grid system can vary depending on the complexity of the design.
    
    Grid systems promote consistency by providing a clear structure for the layout. This makes it easier to create designs that are visually appealing and easy to navigate. They also help to ensure that elements are aligned properly, which can improve the overall readability and usability of the design.
    
    When using a grid system, it's important to be flexible and adapt the grid to the specific needs of the design. Sometimes it may be necessary to break the grid in order to create visual interest or to highlight certain elements. However, it's important to do this intentionally and with a clear understanding of the principles of grid-based design. By mastering grid systems, designers can create layouts that are both visually appealing and functionally effective.`,
    example: 'Using a 12-column grid for a website layout, aligning text and images to the grid lines, creating a consistent visual rhythm throughout the design',
    icon: Grid,
    image: gridSystemsImg
  },
  {
    id: '6',
    title: 'Whitespace (Negative Space, Breathing Room)',
    category: 'Layout & Composition',
    description: 'Enhance clarity and focus by strategically using whitespace (negative space) to create visual breathing room around elements.',
    detailedContent: `Whitespace, also known as negative space, is the empty space around and between elements in a design. It is an essential design principle that enhances clarity, readability, and overall visual appeal. Effective use of whitespace creates visual breathing room, allowing the eye to rest and focus on the important elements.

    Whitespace is not just empty space; it is an active element that plays a crucial role in the composition. It helps to separate and group elements, creating a clear visual hierarchy. By strategically using whitespace, designers can guide the viewer's eye and draw attention to key areas of the design.
    
    There are two types of whitespace: macro whitespace and micro whitespace. Macro whitespace refers to the large areas of empty space around the main elements of the design, while micro whitespace refers to the small spaces between letters, words, and lines of text. Both types of whitespace are important for creating a balanced and readable design.
    
    Too little whitespace can make a design feel cluttered and overwhelming, while too much whitespace can make it feel empty and uninviting. The key is to find the right balance that allows the elements to breathe and stand out. By mastering whitespace, designers can create designs that are both visually appealing and easy to understand.`,
    example: 'Using wide margins and generous line spacing in a document, creating ample space around a logo or headline, using whitespace to separate sections of a website',
    icon: Minimize2,
    image: whitespaceImg
  },
  {
    id: '7',
    title: 'Visual Hierarchy (Emphasis, Order, Importance)',
    category: 'Design Principles',
    description: 'Guide the viewer\'s eye by establishing a clear visual hierarchy that emphasizes important elements and directs the flow of information.',
    detailedContent: `Visual hierarchy is the arrangement of elements in a design to guide the viewer's eye and communicate the importance of different pieces of information. It is a fundamental design principle that helps to create a clear and effective user experience. By establishing a clear visual hierarchy, designers can ensure that the most important elements are noticed first and that the overall message is easily understood.

    There are several techniques that can be used to create visual hierarchy, including size, color, contrast, and placement. Larger elements naturally attract more attention, making them ideal for headlines or key visuals. Brighter or more contrasting colors can also be used to highlight important elements.
    
    Placement is another important factor in visual hierarchy. Elements that are placed at the top of the page or in the center of the screen tend to be noticed first. By strategically placing elements, designers can control the flow of information and guide the viewer's eye through the design.
    
    In addition to these techniques, whitespace can also be used to create visual hierarchy. By creating ample space around important elements, designers can make them stand out and draw attention to them. By mastering visual hierarchy, designers can create designs that are both visually appealing and easy to understand.`,
    example: 'Using a large, bold headline to introduce a topic, using bullet points to list key features, placing a call-to-action button in a prominent location',
    icon: Eye,
    image: visualHierarchyImg
  },
  {
    id: '8',
    title: 'Color Psychology (Emotions, Associations, Culture)',
    category: 'Color Fundamentals',
    description: 'Understand the psychological effects of colors and use them strategically to evoke specific emotions, create associations, and align with cultural meanings.',
    detailedContent: `Color psychology is the study of how colors affect human behavior and emotions. Colors can evoke a wide range of feelings and associations, and understanding these effects is essential for creating effective designs. By strategically using colors, designers can influence the way people perceive and interact with their designs.

    Different colors have different psychological effects. For example, blue is often associated with calmness, trust, and stability, while red is associated with energy, excitement, and passion. Green is associated with nature, growth, and harmony, while yellow is associated with happiness, optimism, and creativity.
    
    In addition to these general associations, colors can also have different meanings in different cultures. For example, white is often associated with purity and innocence in Western cultures, while it is associated with mourning and death in some Eastern cultures. It's important to be aware of these cultural differences when designing for a global audience.
    
    When selecting colors for a design, it's important to consider the overall mood and message you want to convey. By understanding the psychological effects of colors and their cultural meanings, designers can create designs that are both visually appealing and emotionally resonant.`,
    example: 'Using blue in a website for a financial institution to convey trust and stability, using red in a marketing campaign to create excitement and urgency, using green in a logo for an environmental organization to convey nature and sustainability',
    icon: Lightbulb,
    image: colorPsychologyImg
  },

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
    title: 'Contrast (Color, Value, Size)',
    category: 'Design Principles',
    description: 'Create visual interest and hierarchy by using distinct differences in color, value (lightness/darkness), and size between elements.',
    detailedContent: `Contrast is a fundamental design principle that enhances visual appeal and clarity by emphasizing differences between elements. It can be achieved through variations in color, value (lightness/darkness), size, shape, and texture. Effective use of contrast creates visual hierarchy, draws attention to key elements, and improves readability.

Color contrast involves using complementary or contrasting colors to make elements stand out. For example, placing a bright color against a muted background can highlight a call-to-action button. Value contrast refers to the difference in lightness or darkness between elements. High value contrast, such as black text on a white background, improves readability, while low value contrast can create a subtle, sophisticated look.

Size contrast involves varying the size of elements to create visual interest and hierarchy. Larger elements naturally attract more attention, making them ideal for headlines or important visuals. Shape contrast uses different shapes to differentiate elements and add visual variety. Combining geometric and organic shapes can create a dynamic and engaging design.

Texture contrast involves using different textures to add depth and interest to a design. Combining smooth and rough textures can create a tactile feel and make elements stand out. By strategically using contrast, designers can guide the viewer's eye, create visual interest, and ensure that important information is easily noticed and understood. Mastering contrast is essential for creating visually appealing and effective designs.`,
    example: 'White text on a black background, large headlines with small body text, using a bright accent color in a minimalist design',
    icon: ContrastIcon,
    image: contrastImg
  },
  {
    id: '3',
    title: 'Color Harmony (Complementary, Analogous, Triadic)',
    category: 'Color Fundamentals',
    description: 'Create visually pleasing color schemes using complementary (opposite colors), analogous (adjacent colors), or triadic (equidistant colors) relationships on the color wheel.',
    detailedContent: `Color harmony is the principle of creating visually pleasing and balanced color combinations. It involves selecting colors that work well together to create a cohesive and aesthetically pleasing design. There are several established color harmonies that designers use to achieve this.

Complementary color harmony involves using colors that are opposite each other on the color wheel, such as red and green or blue and orange. These combinations create high contrast and can make elements stand out. Analogous color harmony uses colors that are adjacent to each other on the color wheel, such as blue, blue-green, and green. These combinations create a harmonious and soothing effect.

Triadic color harmony involves using three colors that are equally spaced on the color wheel, such as red, yellow, and blue. These combinations are vibrant and balanced. Other color harmonies include monochromatic (using different shades of a single color) and tetradic (using two pairs of complementary colors).

When selecting colors for a design, it's important to consider the overall mood and message you want to convey. Warm colors like red, orange, and yellow evoke feelings of energy and excitement, while cool colors like blue, green, and purple evoke feelings of calmness and serenity. By understanding color harmonies and the psychological effects of colors, designers can create visually appealing and effective designs that resonate with their target audience.`,
    example: 'A website using shades of blue and purple (analogous), a poster with red and green accents (complementary), a logo with red, yellow, and blue elements (triadic)',
    icon: Palette,
    image: colorHarmonyImg
  },
  {
    id: '4',
    title: 'Typography (Font Choice, Hierarchy, Readability)',
    category: 'Typography',
    description: 'Effectively communicate through strategic font selection, establishing clear visual hierarchy, and ensuring optimal readability for the target audience.',
    detailedContent: `Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. It involves selecting appropriate fonts, establishing a clear visual hierarchy, and ensuring optimal readability for the target audience. Effective typography is essential for creating engaging and user-friendly designs.

Font choice is a critical aspect of typography. Different fonts convey different moods and messages. Serif fonts, with their small decorative strokes, are often used for traditional and formal designs, while sans-serif fonts, without the strokes, are typically used for modern and minimalist designs. It's important to choose fonts that align with the overall tone and style of the design.

Visual hierarchy is another important element of typography. It involves organizing text in a way that guides the reader's eye and highlights important information. This can be achieved through variations in font size, weight, and color. Headlines should be larger and bolder than body text, and key phrases can be emphasized with italics or bolding.

Readability is the ultimate goal of typography. Text should be easy to read and understand. Factors that affect readability include font size, line height, letter spacing, and contrast. It's important to choose font sizes that are appropriate for the target audience and to ensure that there is sufficient contrast between the text and the background. By mastering typography, designers can create visually appealing and effective designs that communicate their message clearly and effectively.`,
    example: 'Using a large, bold font for headlines and a smaller, lighter font for body text, ensuring sufficient contrast between text and background, choosing fonts that are easy to read on different devices',
    icon: Type,
    image: typographyImg
  },
  {
    id: '5',
    title: 'Grid Systems (Layout, Alignment, Consistency)',
    category: 'Layout & Composition',
    description: 'Structure content effectively using grid systems to ensure consistent layout, precise alignment, and a visually harmonious composition.',
    detailedContent: `Grid systems are a fundamental tool in design for structuring content in a consistent and visually harmonious way. They provide a framework for arranging elements on a page or screen, ensuring that everything is aligned and balanced. Grid systems are particularly useful for creating complex layouts with multiple elements.

A grid system typically consists of a series of vertical and horizontal lines that divide the page into columns and rows. These lines serve as guides for placing elements, ensuring that they are aligned and spaced consistently. The number of columns and rows in a grid system can vary depending on the complexity of the design.

Grid systems promote consistency by providing a clear structure for the layout. This makes it easier to create designs that are visually appealing and easy to navigate. They also help to ensure that elements are aligned properly, which can improve the overall readability and usability of the design.

When using a grid system, it's important to be flexible and adapt the grid to the specific needs of the design. Sometimes it may be necessary to break the grid in order to create visual interest or to highlight certain elements. However, it's important to do this intentionally and with a clear understanding of the principles of grid-based design. By mastering grid systems, designers can create layouts that are both visually appealing and functionally effective.`,
    example: 'Using a 12-column grid for a website layout, aligning text and images to the grid lines, creating a consistent visual rhythm throughout the design',
    icon: Grid,
    image: gridSystemsImg
  },
  {
    id: '6',
    title: 'Whitespace (Negative Space, Breathing Room)',
    category: 'Layout & Composition',
    description: 'Enhance clarity and focus by strategically using whitespace (negative space) to create visual breathing room around elements.',
    detailedContent: `Whitespace, also known as negative space, is the empty space around and between elements in a design. It is an essential design principle that enhances clarity, readability, and overall visual appeal. Effective use of whitespace creates visual breathing room, allowing the eye to rest and focus on the important elements.

Whitespace is not just empty space; it is an active element that plays a crucial role in the composition. It helps to separate and group elements, creating a clear visual hierarchy. By strategically using whitespace, designers can guide the viewer's eye and draw attention to key areas of the design.

There are two types of whitespace: macro whitespace and micro whitespace. Macro whitespace refers to the large areas of empty space around the main elements of the design, while micro whitespace refers to the small spaces between letters, words, and lines of text. Both types of whitespace are important for creating a balanced and readable design.

Too little whitespace can make a design feel cluttered and overwhelming, while too much whitespace can make it feel empty and uninviting. The key is to find the right balance that allows the elements to breathe and stand out. By mastering whitespace, designers can create designs that are both visually appealing and easy to understand.`,
    example: 'Using wide margins and generous line spacing in a document, creating ample space around a logo or headline, using whitespace to separate sections of a website',
    icon: Minimize2,
    image: whitespaceImg
  },
  {
    id: '7',
    title: 'Visual Hierarchy (Emphasis, Order, Importance)',
    category: 'Design Principles',
    description: 'Guide the viewer\'s eye by establishing a clear visual hierarchy that emphasizes important elements and directs the flow of information.',
    detailedContent: `Visual hierarchy is the arrangement of elements in a design to guide the viewer's eye and communicate the importance of different pieces of information. It is a fundamental design principle that helps to create a clear and effective user experience. By establishing a clear visual hierarchy, designers can ensure that the most important elements are noticed first and that the overall message is easily understood.

There are several techniques that can be used to create visual hierarchy, including size, color, contrast, and placement. Larger elements naturally attract more attention, making them ideal for headlines or key visuals. Brighter or more contrasting colors can also be used to highlight important elements.

Placement is another important factor in visual hierarchy. Elements that are placed at the top of the page or in the center of the screen tend to be noticed first. By strategically placing elements, designers can control the flow of information and guide the viewer's eye through the design.

In addition to these techniques, whitespace can also be used to create visual hierarchy. By creating ample space around important elements, designers can make them stand out and draw attention to them. By mastering visual hierarchy, designers can create designs that are both visually appealing and easy to understand.`,
    example: 'Using a large, bold headline to introduce a topic, using bullet points to list key features, placing a call-to-action button in a prominent location',
    icon: Eye,
    image: visualHierarchyImg
  },
  {
    id: '8',
    title: 'Color Psychology (Emotions, Associations, Culture)',
    category: 'Color Fundamentals',
    description: 'Understand the psychological effects of colors and use them strategically to evoke specific emotions, create associations, and align with cultural meanings.',
    detailedContent: `Color psychology is the study of how colors affect human behavior and emotions. Colors can evoke a wide range of feelings and associations, and understanding these effects is essential for creating effective designs. By strategically using colors, designers can influence the way people perceive and interact with their designs.

Different colors have different psychological effects. For example, blue is often associated with calmness, trust, and stability, while red is associated with energy, excitement, and passion. Green is associated with nature, growth, and harmony, while yellow is associated with happiness, optimism, and creativity.

In addition to these general associations, colors can also have different meanings in different cultures. For example, white is often associated with purity and innocence in Western cultures, while it is associated with mourning and death in some Eastern cultures. It's important to be aware of these cultural differences when designing for a global audience.

When selecting colors for a design, it's important to consider the overall mood and message you want to convey. By understanding the psychological effects of colors and their cultural meanings, designers can create designs that are both visually appealing and emotionally resonant.`,
    example: 'Using blue in a website for a financial institution to convey trust and stability, using red in a marketing campaign to create excitement and urgency, using green in a logo for an environmental organization to convey nature and sustainability',
    icon: Lightbulb,
    image: colorPsychologyImg
  },

];

export default designFundamentals;
