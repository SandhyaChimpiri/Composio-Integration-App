import { NextResponse, NextRequest } from "next/server";
import { getEffectiveApiKey } from "@/lib/api-utils"; // Import the utility

const COMPOSIO_API_BASE_URL = "https://backend.composio.dev/api/v2";

export async function POST(request: NextRequest) {
  try {
    // Use the utility function to get the effective API key
    const effectiveApiKey = getEffectiveApiKey(request);

    if (!effectiveApiKey) {
      return NextResponse.json(
        {
          error: "Server configuration error: Composio API Key is not set.",
        },
        { status: 500 },
      );
    }

    const body = await request.json();
    const {
      twitterUserId,
      twitterConnectedAccountId,
      entityId: providedEntityId,
    } = body;
    const entityId = providedEntityId?.trim() || "default"; // Use provided or default
    const maxResults = 10; // Fetch up to 10 recent liked tweets

    if (!twitterUserId || !twitterConnectedAccountId) {
      return NextResponse.json(
        {
          error:
            "Missing required parameters: twitterUserId, twitterConnectedAccountId",
        },
        { status: 400 },
      );
    }

    console.log(
      `Fetching tweets for User ID: ${twitterUserId} via Connection: ${twitterConnectedAccountId}`,
    );

    const actionUrl = `${COMPOSIO_API_BASE_URL}/actions/TWITTER_RETURNS_POST_OBJECTS_LIKED_BY_THE_PROVIDED_USER_ID/execute`;
    const headers = {
      "x-api-key": effectiveApiKey, // Use effective API key from utility
      "Content-Type": "application/json",
    };
    const payload = {
      entityId: entityId,
      connectedAccountId: twitterConnectedAccountId,
      input: {
        id: twitterUserId,
        max_results: maxResults,
        // tweet__fields: ["text", "created_at"], // Request text field
      },
    };

    const response = await fetch(actionUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Composio API error (fetch-tweets):",
        response.status,
        errorText,
      );
      throw new Error(
        `Composio API error: ${response.status} - ${
          errorText || "Unknown error"
        }`,
      );
    }

    const result = await response.json();

    if (!result.successful) {
      console.error("Composio execution error (fetch-tweets):", result.error);
      throw new Error(
        `Composio execution error: ${result.error || "Unknown execution error"}`,
      );
    }

    // Extract tweets - adjust path based on actual Composio response structure
    // Assuming the structure is result.data.data.data for the array of tweets
    const tweets = result?.data?.data?.data || [];
    console.log(`Successfully fetched ${tweets.length} tweets.`);

    return NextResponse.json({ tweets: tweets });
  } catch (error: any) {
    console.error("Error in fetch-tweets route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch liked tweets" },
      { status: 500 },
    );
  }
}
