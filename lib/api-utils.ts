import { NextRequest } from "next/server";

const CUSTOM_API_KEY_HEADER = "x-custom-api-key";

/**
 * Gets the effective API key to use for Composio requests.
 * Prioritizes the key from the custom header if present, otherwise falls back
 * to the environment variable.
 *
 * @param request The incoming NextRequest or Request object.
 * @returns The API key to use, or an empty string if none is found.
 */
export function getEffectiveApiKey(request: NextRequest | Request): string {
  const customApiKey = request.headers.get(CUSTOM_API_KEY_HEADER);
  console.log("Custom API key:", customApiKey);
  if (customApiKey) {
    return customApiKey;
  }
  // Ensure we return an empty string if the env var is not set,
  // aligning with previous logic in some routes.
  return process.env.COMPOSIO_API_KEY || "";
}

// Constant for local storage key to be used in frontend
export const LOCAL_STORAGE_API_KEY = "composio-custom-api-key";
