import { cookies } from "next/headers";
import type {
  Action,
  ActionListResponse,
  ActionQueryParams,
  IntegrationCreateParams,
  ConnectionCreateParams,
} from "./types";

// Server-side API functions
const API_BASE_URL = process.env.API_URL || "http://localhost:8000/api";

async function fetchFromBackend(endpoint: string, options: RequestInit = {}) {
  const headers = {
    ...options.headers,
    "ngrok-skip-browser-warning": "true",
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "An error occurred" }));
    throw new Error(error.detail || "An error occurred");
  }

  return response.json();
}

export async function getApps() {
  return fetchFromBackend("/apps");
}

export async function getAppByName(name: string) {
  return fetchFromBackend(`/apps/${name}`);
}

export async function getIntegrations(appName?: string) {
  const queryParams = appName ? `?app=${appName}` : "";
  return fetchFromBackend(`/integrations${queryParams}`);
}

export async function getIntegrationById(id: string) {
  return fetchFromBackend(`/integrations/${id}`);
}

export async function createIntegration(data: IntegrationCreateParams) {
  return fetchFromBackend("/integrations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function initiateConnection(data: ConnectionCreateParams) {
  return fetchFromBackend("/connections", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
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
    searchParams.set("filterImportantActions", "true");
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);

  const queryString = searchParams.toString();
  return fetchFromBackend(
    `/v2/actions/list/all${queryString ? `?${queryString}` : ""}`,
  );
}

export async function getActionById(actionId: string, version?: string) {
  const searchParams = new URLSearchParams();
  if (version) searchParams.set("version", version);

  const queryString = searchParams.toString();
  return fetchFromBackend(
    `/v2/actions/${actionId}${queryString ? `?${queryString}` : ""}`,
  );
}

// Re-export types for convenience
export type {
  Action,
  ActionListResponse,
  ActionQueryParams,
  IntegrationCreateParams,
  ConnectionCreateParams,
};
