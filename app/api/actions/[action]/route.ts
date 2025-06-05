import { NextResponse } from "next/server";
import { Composio } from "composio-core";
import { getEffectiveApiKey } from "@/lib/api-utils";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { action: string } },
) {
  const actionName = params.action;
  const apiKey = getEffectiveApiKey(request);

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is not configured" },
      { status: 401 },
    );
  }

  const composio = new Composio({ apiKey: apiKey });
  const action = await composio.actions.get({
    actionName: actionName,
  });
  return NextResponse.json(action);
}
