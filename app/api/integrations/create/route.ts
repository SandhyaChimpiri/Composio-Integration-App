import { Composio } from "composio-core";
import { NextRequest, NextResponse } from "next/server";
import { getEffectiveApiKey } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const apiKey = getEffectiveApiKey(request);

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is not configured" },
        { status: 401 },
      );
    }

    console.log("API key:", apiKey);

    const data = await request.json();
    const composio = new Composio({ apiKey });

    // Get the app details to retrieve the appId
    const app = await composio.apps.get({ appKey: data.app_name });

    // Find the right auth configuration to use
    let authConfig = data.auth_config || {};

    // Create the integration using composio library
    const integration = await composio.integrations.create({
      appId: app.appId,
      authConfig: authConfig,
      authScheme: data.auth_mode,
      forceNewIntegration: true,
      name: data.name,
      useComposioAuth: data.use_composio_auth,
    });
    console.log("Integration created:", integration);
    return NextResponse.json(integration);
  } catch (error) {
    console.error("Error creating integration:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}
