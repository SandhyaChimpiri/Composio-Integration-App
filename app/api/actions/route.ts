import { NextRequest, NextResponse } from "next/server";
import { getEffectiveApiKey } from "@/lib/api-utils"; // Import the utility function

export async function GET(request: NextRequest) {
  try {
    const apiKey = getEffectiveApiKey(request); // Get the effective API key
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is not configured" },
        { status: 401 },
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const apps = searchParams.get("apps");
    const actions = searchParams.get("actions");
    const tags = searchParams.get("tags");
    const useCase = searchParams.get("useCase");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const filterImportantActions =
      searchParams.get("filterImportantActions") === "true";
    const sortBy = searchParams.get("sortBy") || "no_sort";

    // Prepare query parameters
    const queryParams = new URLSearchParams();
    if (apps) queryParams.append("apps", apps);
    if (actions) queryParams.append("actions", actions);
    if (tags) queryParams.append("tags", tags);
    if (useCase) queryParams.append("useCase", useCase);
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());
    if (filterImportantActions)
      queryParams.append(
        "filterImportantActions",
        filterImportantActions.toString(),
      );
    queryParams.append("sortBy", sortBy);

    // Call the Composio API
    const url = `${process.env.BASE_URL}/api/v2/actions/list/all?${queryParams}`;
    const response = await fetch(url, {
      headers: {
        "x-api-key": apiKey, // Use the effective API key
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    // Parse the response JSON
    const responseData = await response.json();

    // Transform the data to match the expected model structure
    const transformedItems =
      responseData.items?.map((item: any) => ({
        parameters: item.parameters || {},
        response: item.response || {},
        appKey: item.appKey || item.app_key || "",
        appName: item.appName || item.app_name || "Twitter",
        version: item.version || "1.0",
        available_versions: item.available_versions || [
          { key: "1.0", value: "1.0" },
        ],
        no_auth: item.no_auth || false,
        description: item.description || "",
        displayName: item.displayName || item.display_name || "",
        logo: item.logo || "",
        name: item.name || "",
        tags: item.tags || [],
        appId: item.appId || item.app_id || "",
        deprecated: item.deprecated || false,
      })) || [];

    // Create the response object
    const result = {
      items: transformedItems,
      page: responseData.page || page,
      totalPages: responseData.totalPages || 1.0,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error listing actions:", error);
    return NextResponse.json(
      {
        error: `Error listing actions: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 },
    );
  }
}
