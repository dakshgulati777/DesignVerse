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

    const prompt = `You are an expert typography and design critic. Analyze this layout of text elements and provide constructive feedback.

Layout:
${layoutDescription}

Analyze the typography choices considering:
1. Font pairing harmony - do the fonts complement each other?
2. Visual hierarchy - is there clear size/weight differentiation?
3. Spacing and positioning - is the layout balanced?
4. Readability - are the font choices appropriate?
5. Overall aesthetic coherence

Respond with a JSON object (no markdown, just pure JSON):
{
  "score": <number from 0-100>,
  "feedback": [<3-4 specific observations about what works or doesn't>],
  "suggestions": [<3-4 actionable improvements they could make>]
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
