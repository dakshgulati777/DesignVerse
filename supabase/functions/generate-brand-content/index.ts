import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { brandName, brandColors, tagline, tone, productImageUrl } = await req.json();

    const systemPrompt = `You are a social media content strategist for Indian D2C brands. You create engaging, scroll-stopping content plans with Hinglish captions (mix of Hindi and English) that resonate with young Indian audiences on Instagram.

Brand Details:
- Brand Name: ${brandName}
- Brand Colors: ${JSON.stringify(brandColors)}
- Tagline: ${tagline || "N/A"}
- Brand Tone: ${tone || "professional"}

You must generate a full week's content plan with exactly 6 pieces:
- 3 Reels (short video concepts with scripts)
- 2 Posts (static image concepts with captions)
- 1 Story (interactive story concept)

Each piece must include:
1. content_type: "reel", "post", or "story"
2. schedule_day: "Monday", "Tuesday", etc.
3. caption: Engaging Hinglish caption with emojis
4. hashtags: Array of 8-12 relevant hashtags
5. visual_description: Detailed description of the visual/image to create
6. hook: The first line that grabs attention`;

    const userPrompt = `Generate a complete week's Instagram content plan for this D2C brand. The product image is available at: ${productImageUrl}

Create content that:
- Uses trendy Hinglish captions (Hindi + English mix)
- Includes trending audio/format references for Reels
- Has scroll-stopping hooks
- Incorporates the brand colors: ${JSON.stringify(brandColors)}
- Matches the brand tone: ${tone}

Return the response as a JSON object with a "content" array containing exactly 6 items.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "generate_content_plan",
                description: "Generate a weekly Instagram content plan for a D2C brand",
                parameters: {
                  type: "object",
                  properties: {
                    content: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          content_type: { type: "string", enum: ["reel", "post", "story"] },
                          schedule_day: { type: "string" },
                          caption: { type: "string" },
                          hashtags: { type: "array", items: { type: "string" } },
                          visual_description: { type: "string" },
                          hook: { type: "string" },
                        },
                        required: ["content_type", "schedule_day", "caption", "hashtags", "visual_description", "hook"],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ["content"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "generate_content_plan" } },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    let contentPlan;
    if (toolCall?.function?.arguments) {
      contentPlan = JSON.parse(toolCall.function.arguments);
    } else {
      throw new Error("Failed to parse AI response");
    }

    return new Response(JSON.stringify(contentPlan), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating content:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
