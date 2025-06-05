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

  const url = new URL(request.url);
  const integrationId = url.searchParams.get("integrationId") || undefined;

  if (!integrationId) {
    return NextResponse.json(
      { error: "Integration ID is required" },
      { status: 400 },
    );
  }

  const statusParam = url.searchParams.get("status") || "ACTIVE";
  // Ensure status is one of the allowed values
  const status = ["ACTIVE", "FAILED", "INITIATED"].includes(statusParam)
    ? (statusParam as "ACTIVE" | "FAILED" | "INITIATED")
    : "ACTIVE";

  const params = {
    integrationId,
    page: url.searchParams.get("page")
      ? parseInt(url.searchParams.get("page") as string, 10)
      : 1,
    pageSize: url.searchParams.get("pageSize")
      ? parseInt(url.searchParams.get("pageSize") as string, 10)
      : 10,
    status,
    showActiveOnly: url.searchParams.get("showActiveOnly") === "true",
    showDisabled: url.searchParams.get("showDisabled") === "true",
    connectionId: url.searchParams.get("connectionId") || undefined,
    // Convert string array params to comma-separated strings
    appNames: url.searchParams.get("appNames") || undefined,
    labels: url.searchParams.get("labels") || undefined,
    entityId: url.searchParams.get("entityId") || undefined,
  };

  const composio = new Composio({ apiKey: apiKey });
  const connections = await composio.connectedAccounts.list(params);

  return NextResponse.json(connections);
}
