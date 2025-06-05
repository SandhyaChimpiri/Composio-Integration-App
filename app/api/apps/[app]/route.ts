import { NextRequest, NextResponse } from "next/server";
import { getEffectiveApiKey } from "@/lib/api-utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ app: string }> },
) {
  try {
    const apiKey = getEffectiveApiKey(request);
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is not configured" },
        { status: 401 },
      );
    }

    const { app: appName } = await params;

    // Make the request to the Composio API
    const response = await fetch(
      `${process.env.BASE_URL}/api/v1/apps/${appName}`,
      {
        headers: {
          "x-api-key": apiKey,
        },
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: `App '${appName}' not found` },
          { status: 404 },
        );
      }
      throw new Error(`API responded with status: ${response.status}`);
    }

    const appData = await response.json();

    // Process auth_schemes if present
    if (appData.auth_schemes && appData.auth_schemes.length > 0) {
      appData.auth_schemes = appData.auth_schemes.map((scheme: any) => {
        // Process fields in auth schemes if present
        if (scheme.fields) {
          scheme.fields = scheme.fields.map((field: any) => {
            return typeof field === "object" ? field : { value: field };
          });
        }

        // Process token_response_metadata
        if (
          scheme.token_response_metadata &&
          typeof scheme.token_response_metadata !== "object" &&
          !Array.isArray(scheme.token_response_metadata)
        ) {
          scheme.token_response_metadata = {
            value: scheme.token_response_metadata,
          };
        }

        return scheme;
      });
    }

    return NextResponse.json(appData);
  } catch (error) {
    console.error("Error fetching app:", error);
    return NextResponse.json(
      {
        error: `Error fetching app: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 },
    );
  }
}
