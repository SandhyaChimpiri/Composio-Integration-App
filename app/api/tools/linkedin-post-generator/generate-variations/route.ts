import { NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const createTweetContext = (tweets: string[], maxLength = 500): string => {
  let context = "";
  for (const tweet of tweets) {
    if ((context + tweet).length > maxLength) break;
    context += tweet + "\n\n"; // Add separator between tweets
  }
  return context.trim();
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userPrompt, likedTweets } = body;

    if (!userPrompt || !likedTweets || !Array.isArray(likedTweets)) {
      return NextResponse.json(
        {
          error: "Missing required parameters: userPrompt, likedTweets (array)",
        },
        { status: 400 },
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Server configuration error: OPENAI_API_KEY is not set." },
        { status: 500 },
      );
    }

    console.log("Generating variations for prompt:", userPrompt);

    // Create context from the first ~5 liked tweets (limit length)
    const tweetContext = createTweetContext(likedTweets.slice(0, 5));

    const systemPrompt = `You are an expert LinkedIn post writer. 
Your goal is to generate multiple variations of a LinkedIn post based on a user's prompt.
Crucially, you must mimic the general style, tone, and common themes found in the examples of tweets the user likes.
${
  tweetContext
    ? `Here are examples of liked tweet content for style reference:\n${tweetContext}`
    : "No liked tweet examples provided, use a generally engaging and professional LinkedIn style."
}
Generate exactly 3 distinct variations of the post. 
Separate each variation *strictly* with the delimiter '---VARIATION_SEPARATOR---' and nothing else between variations.`;

    const mainPrompt = `User prompt for LinkedIn post: "${userPrompt}"`;

    // Call OpenAI using Vercel AI SDK
    const { text: generatedContent } = await generateText({
      model: openai("gpt-4o"), // Using a cost-effective model, adjust as needed
      system: systemPrompt,
      prompt: mainPrompt,
      maxTokens: 1024, // Adjust as needed
      temperature: 0.7, // Balance creativity and coherence
    });

    console.log("Raw AI response:", generatedContent);

    // Parse the response
    const variationsText = generatedContent.split("---VARIATION_SEPARATOR---");

    const finalVariations = variationsText
      .map((v) => v.trim()) // Trim whitespace
      .filter((v) => v.length > 0) // Filter out empty strings
      .map((content, i) => ({
        id: `ai-gen-${Date.now()}-${i}`,
        content: content,
      }));

    if (finalVariations.length === 0) {
      console.error(
        "Failed to parse variations from AI response:",
        generatedContent,
      );
      throw new Error(
        "AI failed to generate variations in the expected format.",
      );
    }

    return NextResponse.json({ variations: finalVariations });
  } catch (error: any) {
    console.error("Error generating variations with AI:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate variations using AI" },
      { status: 500 },
    );
  }
}
