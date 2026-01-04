import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TextElement {
  font: string;
  fontSize: number;
  position: { x: number; y: number };
  text: string;
  rotation: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { layout } = await req.json() as { layout: TextElement[] };
    
    if (!layout || !Array.isArray(layout) || layout.length < 2) {
      return new Response(
        JSON.stringify({ error: 'At least 2 text elements required for analysis' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const layoutDescription = layout.map((el, i) => 
      `Element ${i + 1}: Font "${el.font}", Size ${el.fontSize}px, Position (${Math.round(el.position.x)}, ${Math.round(el.position.y)}), Rotation ${el.rotation}°, Text "${el.text}"`
    ).join('\n');

    // Calculate layout metrics for better analysis
    const fontCategories = new Map<string, string>();
    const serifFonts = ['Merriweather', 'Playfair Display', 'Lora', 'PT Serif', 'Crimson Text', 'Libre Baskerville', 'Cormorant Garamond', 'EB Garamond', 'Spectral', 'Bodoni Moda', 'Fraunces', 'Alegreya'];
    const sansSerifFonts = ['Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Inter', 'Raleway', 'Ubuntu', 'Nunito', 'Work Sans', 'Rubik', 'Quicksand'];
    const displayFonts = ['Abril Fatface', 'Bebas Neue', 'Righteous', 'Anton', 'Cinzel', 'Oswald', 'Alfa Slab One', 'Bungee', 'Teko', 'Russo One'];
    const scriptFonts = ['Dancing Script', 'Caveat', 'Great Vibes', 'Kaushan Script', 'Sacramento', 'Pacifico', 'Lobster', 'Satisfy'];
    
    layout.forEach(el => {
      if (serifFonts.some(f => el.font.includes(f))) fontCategories.set(el.font, 'serif');
      else if (sansSerifFonts.some(f => el.font.includes(f))) fontCategories.set(el.font, 'sans-serif');
      else if (displayFonts.some(f => el.font.includes(f))) fontCategories.set(el.font, 'display');
      else if (scriptFonts.some(f => el.font.includes(f))) fontCategories.set(el.font, 'script');
      else fontCategories.set(el.font, 'other');
    });

    const fontCategoryInfo = layout.map(el => `${el.font} (${fontCategories.get(el.font) || 'unknown'})`).join(', ');
    const sizeRange = layout.map(el => el.fontSize);
    const sizeVariation = Math.max(...sizeRange) - Math.min(...sizeRange);

    const prompt = `You are an expert typography and design critic with deep knowledge of font pairing, visual hierarchy, and layout composition. Analyze this layout comprehensively.

Layout Details:
${layoutDescription}

Font Categories Used: ${fontCategoryInfo}
Size Variation: ${sizeVariation}px (min: ${Math.min(...sizeRange)}px, max: ${Math.max(...sizeRange)}px)

Analyze the typography choices considering these key criteria:

1. **Font Pairing Harmony** (0-25 points)
   - Do the fonts complement each other in style, weight, and mood?
   - Is there appropriate contrast (e.g., serif + sans-serif)?
   - Are there too many different fonts (ideally 2-3 max)?

2. **Visual Hierarchy** (0-25 points)
   - Is there clear size differentiation for headings vs body?
   - Does the layout guide the eye naturally?
   - Are important elements emphasized appropriately?

3. **Spacing & Composition** (0-25 points)
   - Is the layout balanced (symmetrical or asymmetrical)?
   - Is there appropriate breathing room between elements?
   - Are elements aligned or intentionally offset?

4. **Readability & Accessibility** (0-25 points)
   - Are the font choices legible at their sizes?
   - Would this work on various backgrounds?
   - Are decorative fonts used sparingly?

Provide detailed, actionable analysis. Be specific about what works and what doesn't.

Respond with a JSON object (no markdown, just pure JSON):
{
  "score": <number from 0-100>,
  "breakdown": {
    "fontPairing": <0-25>,
    "hierarchy": <0-25>,
    "spacing": <0-25>,
    "readability": <0-25>
  },
  "feedback": [<4-5 specific observations about what works well or needs improvement>],
  "suggestions": [<4-5 actionable improvements with specific font or layout recommendations>],
  "pairingTips": [<2-3 specific font pairing suggestions based on their current choices>]
}`;

    console.log('Sending request to Lovable AI Gateway...');

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: "You are a typography expert. Always respond with valid JSON only, no markdown formatting." 
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log('AI Response:', content);

    // Parse the JSON response, handling potential markdown wrapping
    let cleanedContent = content.trim();
    if (cleanedContent.startsWith('```json')) {
      cleanedContent = cleanedContent.slice(7);
    }
    if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.slice(3);
    }
    if (cleanedContent.endsWith('```')) {
      cleanedContent = cleanedContent.slice(0, -3);
    }
    cleanedContent = cleanedContent.trim();

    const analysis = JSON.parse(cleanedContent);

    // Validate response structure
    if (typeof analysis.score !== 'number' || !Array.isArray(analysis.feedback) || !Array.isArray(analysis.suggestions)) {
      throw new Error("Invalid response structure from AI");
    }

    // Ensure score is within bounds
    analysis.score = Math.max(0, Math.min(100, Math.round(analysis.score)));
    
    // Add pairing tips if not present
    if (!analysis.pairingTips) {
      analysis.pairingTips = [];
    }
    
    // Add breakdown if not present
    if (!analysis.breakdown) {
      analysis.breakdown = {
        fontPairing: Math.round(analysis.score * 0.25),
        hierarchy: Math.round(analysis.score * 0.25),
        spacing: Math.round(analysis.score * 0.25),
        readability: Math.round(analysis.score * 0.25)
      };
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('analyze-typography error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
