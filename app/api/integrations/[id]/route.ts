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

  const composio = new Composio({ apiKey });
  const url = new URL(request.url);
  //get id from the dynamic route
  const id = url.pathname.split("/").pop();
  if (id) {
    const integration = await composio.integrations.get({
      integrationId: id,
    });
    return NextResponse.json(integration);
  }
  return NextResponse.json(
    { error: "Integration ID is required" },
    { status: 400 },
  );
}
