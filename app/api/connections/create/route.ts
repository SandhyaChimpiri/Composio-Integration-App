import { OpenAIToolSet } from "composio-core";
import { NextRequest, NextResponse } from "next/server";
import { getEffectiveApiKey } from "@/lib/api-utils";

//get the expected input fields for a connection
export async function GET(request: NextRequest) {
  const apiKey = getEffectiveApiKey(request);

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is not configured" },
      { status: 401 },
    );
  }

  const url = new URL(request.url);
  const integrationId = url.searchParams.get("integrationId") || undefined;

  if (!integrationId) {
    return NextResponse.json(
      { error: "Integration ID is required" },
      { status: 400 },
    );
  }

  const toolset = new OpenAIToolSet({ apiKey: apiKey });
  const integration = await toolset.integrations.get({ integrationId });
  if (!integration || !integration.id) {
    return NextResponse.json(
      { error: "Integration not found" },
      { status: 404 },
    );
  }
  const expectedInputFields = await toolset.integrations.getRequiredParams({
    integrationId: integration.id,
  });

  return NextResponse.json({ expectedInputFields });
}

//create a connection
export async function POST(request: NextRequest) {
  const apiKey = getEffectiveApiKey(request);

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is not configured" },
      { status: 401 },
    );
  }

  const body = await request.json();
  const { integrationId, entityId } = body;
  if (!integrationId) {
    return NextResponse.json(
      { error: "Integration ID is required" },
      { status: 400 },
    );
  }

  const toolset = new OpenAIToolSet({ apiKey: apiKey });
  const integration = await toolset.integrations.get({ integrationId });
  if (!integration || !integration.id) {
    return NextResponse.json(
      { error: "Integration not found" },
      { status: 404 },
    );
  }

  const connectedAccount = await toolset.connectedAccounts.initiate({
    integrationId: integration.id,
    entityId: entityId,
  });

  return NextResponse.json({ redirectUrl: connectedAccount.redirectUrl });
}
