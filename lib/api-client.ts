"use client";

import type {
  Action,
  ActionListResponse,
  ActionQueryParams,
  IntegrationCreateParams,
  ConnectionCreateParams,
  ConnectionQueryParams,
  ConnectionListResponse,
} from "./types";
import { LOCAL_STORAGE_API_KEY } from "./api-utils"; // Import the constant

// Helper function to get the custom API key from local storage
function getCustomApiKey(): string | null {
  if (typeof window !== "undefined") {
    // Ensure localStorage is available
    return localStorage.getItem(LOCAL_STORAGE_API_KEY);
  }
  return null;
}

// Updated fetch function to include custom API key header
async function fetchWithCustomKey(endpoint: string, options: RequestInit = {}) {
  const customApiKey = getCustomApiKey();
  const headers = {
    ...options.headers,
    "ngrok-skip-browser-warning": "true", // Keep this header if needed
    ...(customApiKey && { "x-custom-api-key": customApiKey }), // Add custom key header
  };

  // Use NEXT_PUBLIC_API_URL consistently for backend requests
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error (${response.status}) for ${url}:`, errorText);
      let errorDetail;
      try {
        errorDetail = JSON.parse(errorText).detail || "An error occurred";
      } catch {
        errorDetail = errorText || "An error occurred";
      }
      throw new Error(errorDetail);
    }

    // Handle cases where response might be empty (e.g., 204 No Content)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      // Return null or handle non-JSON response appropriately
      return null;
    }
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export async function getApps() {
  // Use the helper function for consistency
  return fetchWithCustomKey(`/api/apps`);
}

export async function getAppByName(name: string) {
  return fetchWithCustomKey(`/api/apps/${name}`);
}

export async function getIntegrations(appName?: string) {
  const queryParams = appName ? `?appName=${appName}` : "";
  return fetchWithCustomKey(`/api/integrations${queryParams}`);
}

export async function getIntegrationById(id: string) {
  return fetchWithCustomKey(`/api/integrations/${id}`);
}

export async function createIntegration(data: IntegrationCreateParams) {
  return fetchWithCustomKey(`/api/integrations/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Content-Type is needed for POST
    },
    body: JSON.stringify(data),
  });
}

export async function initiateConnection(data: ConnectionCreateParams) {
  return fetchWithCustomKey(`/api/connections/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function getConnections(params?: ConnectionQueryParams) {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.pageSize)
    searchParams.set("pageSize", params.pageSize.toString());
  if (params?.appNames?.length)
    searchParams.set("appNames", params.appNames.join(","));
  if (params?.labels?.length)
    searchParams.set("labels", params.labels.join(","));
  if (params?.showActiveOnly) searchParams.set("showActiveOnly", "true");
  if (params?.status) searchParams.set("status", params.status);
  if (params?.integrationId)
    searchParams.set("integrationId", params.integrationId);
  if (params?.connectionId)
    searchParams.set("connectionId", params.connectionId);
  if (params?.entityId?.length)
    searchParams.set("entityId", params.entityId.join(","));
  if (params?.showDisabled) searchParams.set("showDisabled", "true");

  const queryString = searchParams.toString();
  return fetchWithCustomKey(`/api/connections?${queryString}`);
}

export async function getActions(params?: ActionQueryParams) {
  const searchParams = new URLSearchParams();

  if (params?.apps?.length) searchParams.set("apps", params.apps.join(","));
  if (params?.actions?.length)
    searchParams.set("actions", params.actions.join(","));
  if (params?.tags?.length) searchParams.set("tags", params.tags.join(","));
  if (params?.useCase) searchParams.set("useCase", params.useCase);
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.limit) searchParams.set("limit", params.limit.toString());
  if (params?.filterImportant)
    // Renamed from filterImportantActions for consistency? Check type def
    searchParams.set("filterImportantActions", "true");
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);

  const queryString = searchParams.toString();
  return fetchWithCustomKey(`/api/actions?${queryString}`);
}

// NOTE: getActionById seems to fetch directly from Composio, not through our backend API
// based on the original code comment structure (fetchWithoutAuth vs fetch).
// It will *not* use the custom API key unless modified to go through our backend.
export async function getActionById(actionId: string, version?: string) {
  // This function originally used fetchWithoutAuth, implying it might not
  // have been intended to go via the backend wrapper. Assuming direct call.
  // If it needs the custom key, it requires a backend route and update here.
  const searchParams = new URLSearchParams();
  if (version) searchParams.set("version", version);
  const queryString = searchParams.toString();
  // Constructing URL for direct call - requires base URL for Composio API
  const baseUrl =
    process.env.NEXT_PUBLIC_COMPOSIO_API_URL || process.env.BASE_URL;
  if (!baseUrl) {
    console.error("Composio API base URL is not configured for getActionById");
    throw new Error("Composio API base URL not configured");
  }
  const url = `${baseUrl}/api/v1/actions/${actionId}${
    queryString ? `?${queryString}` : ""
  }`;
  // Needs API key handling - how should direct calls be authenticated?
  // Using custom key if available, else env key. Needs careful consideration.
  const apiKey = getCustomApiKey() || process.env.COMPOSIO_API_KEY;
  console.warn(
    "getActionById currently makes a direct API call. Ensure CORS is configured on Composio API if used client-side.",
  );
  if (!apiKey) {
    console.error("API key is missing for direct call in getActionById");
    throw new Error("API key is missing");
  }
  const response = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "x-api-key": apiKey,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch action ${actionId}`);
  }
  return response.json();
}

export async function getActionSchema(actionName: string) {
  // This now correctly calls our backend wrapper endpoint.
  return fetchWithCustomKey(`/api/actions/${actionName}`);
}

// Re-export types for convenience
export type {
  Action,
  ActionListResponse,
  ActionQueryParams,
  IntegrationCreateParams,
  ConnectionCreateParams,
  ConnectionQueryParams,
  ConnectionListResponse,
};
