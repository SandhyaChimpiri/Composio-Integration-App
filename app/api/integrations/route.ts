import { Composio } from "composio-core";
import { NextResponse } from "next/server";
import { getEffectiveApiKey } from "@/lib/api-utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = getEffectiveApiKey(request);

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is not configured" },
      { status: 401 },
    );
  }

  const composio = new Composio({ apiKey: apiKey });
  const url = new URL(request.url);
  const appName = url.searchParams.get("appName") || undefined;
  const integrations = await composio.integrations.list({
    appName: appName,
  });
  return NextResponse.json(integrations);
}
