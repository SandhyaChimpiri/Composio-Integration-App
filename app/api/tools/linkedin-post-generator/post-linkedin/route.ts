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
      postContent,
      linkedinAuthorUrn,
      linkedinConnectedAccountId,
      entityId: providedEntityId,
    } = body;
    const entityId = providedEntityId?.trim() || "default"; // Use provided or default

    if (!postContent || !linkedinAuthorUrn || !linkedinConnectedAccountId) {
      return NextResponse.json(
        {
          error:
            "Missing required parameters: postContent, linkedinAuthorUrn, linkedinConnectedAccountId",
        },
        { status: 400 },
      );
    }

    console.log(
      `Posting to LinkedIn for Author: ${linkedinAuthorUrn} via Connection: ${linkedinConnectedAccountId}`,
    );
    console.log(`Content: ${postContent.substring(0, 50)}...`);

    const actionUrl = `${COMPOSIO_API_BASE_URL}/actions/LINKEDIN_CREATE_LINKED_IN_POST/execute`;
    const headers = {
      "x-api-key": effectiveApiKey, // Use effective API key from utility
      "Content-Type": "application/json",
    };
    const payload = {
      entityId: entityId,
      connectedAccountId: linkedinConnectedAccountId,
      input: {
        author: linkedinAuthorUrn,
        commentary: postContent,
        visibility: "PUBLIC", // Defaulting to PUBLIC visibility
        lifecycleState: "PUBLISHED", // Defaulting to PUBLISHED state
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
        "Composio API error (post-linkedin):",
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
      console.error("Composio execution error (post-linkedin):", result.error);
      throw new Error(
        `Composio execution error: ${result.error || "Unknown execution error"}`,
      );
    }

    console.log("Composio LinkedIn post result:", result.data);

    return NextResponse.json({
      success: true,
      message: "Post submitted to LinkedIn successfully via Composio.",
      data: result.data, // Optionally return data like the post ID
    });
  } catch (error: any) {
    console.error("Error in post-linkedin route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to post to LinkedIn" },
      { status: 500 },
    );
  }
}
