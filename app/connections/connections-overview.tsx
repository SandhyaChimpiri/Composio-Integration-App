"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useIntegrations, useConnections } from "@/lib/hooks/use-api-queries";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  ArrowLeft,
  Link2,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useInitiateConnection } from "@/lib/hooks/use-api-queries";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Integration, Connection, ConnectionResponse } from "@/lib/types";
import { LOCAL_STORAGE_API_KEY } from "@/lib/api-utils";

export function ConnectionsOverview() {
  const searchParams = useSearchParams();
  const connectionId = searchParams.get("id");
  const integrationId = searchParams.get("integrationId");

  const {
    data: integrations = [],
    isLoading: isIntegrationsLoading,
    error: integrationsError,
    refetch: refetchIntegrations,
  } = useIntegrations();

  const {
    data: connectionsData,
    isLoading: isConnectionsLoading,
    error: connectionsError,
    refetch: refetchConnections,
  } = useConnections({
    connectionId: connectionId || undefined,
    integrationId: integrationId || undefined,
  });

  const connections = connectionsData?.items || [];

  const [connectionError, setConnectionError] = useState<string | null>(null);
  const { mutate: initiateConnection, isPending: isConnecting } =
    useInitiateConnection();

  // Get integration details for a connection
  const getIntegrationForConnection = (
    integrationId: string,
  ): Integration | undefined => {
    return integrations.find(
      (integration: Integration) => integration.id === integrationId,
    );
  };

  const handleConnect = (integrationId: string) => {
    // Get the custom API key from localStorage
    const customApiKey =
      typeof window !== "undefined"
        ? localStorage.getItem(LOCAL_STORAGE_API_KEY)
        : null;

    // Create headers with custom API key if available
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (customApiKey) {
      headers["x-custom-api-key"] = customApiKey;
    }

    // Make direct fetch call with custom headers
    fetch("/api/connections/create", {
      method: "POST",
      headers,
      body: JSON.stringify({
        integrationId: integrationId,
        entityId: "default",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || "Failed to initiate connection");
          });
        }
        return response.json();
      })
      .then((data: ConnectionResponse) => {
        // Redirect to the OAuth flow if a redirect URL is provided
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          // If no redirect URL, refresh the connections list
          refetchConnections();
        }
      })
      .catch((error) => {
        setConnectionError(error.message);
      });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACTIVE":
        return "default";
      case "FAILED":
        return "destructive";
      case "INITIATED":
        return "secondary";
      default:
        return "outline";
    }
  };

  const isLoading = isIntegrationsLoading || isConnectionsLoading;
  const error = integrationsError || connectionsError;

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading connections...</h2>
          <p className="text-muted-foreground">
            Please wait while we fetch your data.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <CardTitle>Error Loading Connections</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>API Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
            <Button
              onClick={() => {
                refetchIntegrations();
                refetchConnections();
              }}
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Display a filtered view if query parameters are present
  const isFiltered = connectionId || integrationId;
  const pageTitle = isFiltered
    ? connectionId
      ? "Connection Details"
      : `Connections for ${
          integrations.find((i: Integration) => i.id === integrationId)?.name ||
          "Integration"
        }`
    : "Connections";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={integrationId ? "/integrations" : "/"}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
          <p className="text-muted-foreground">
            {isFiltered
              ? "View and manage specific connection details"
              : "Manage your app connections and authentication."}
          </p>
        </div>
      </div>

      {connectionError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>{connectionError}</AlertDescription>
        </Alert>
      )}

      {connections.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Active Connections</CardTitle>
            <CardDescription>
              View and manage your connected accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {connections.map((connection: Connection) => {
                  const integration = getIntegrationForConnection(
                    connection.integrationId,
                  );

                  return (
                    <Card key={connection.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {connection.logo && (
                              <img
                                src={connection.logo}
                                alt={connection.appName}
                                className="h-8 w-8 rounded-full"
                              />
                            )}
                            <div>
                              <CardTitle className="text-lg">
                                {connection.appName}
                              </CardTitle>
                              <CardDescription>
                                Integration:{" "}
                                {integration?.name ||
                                  connection.integrationId.substring(0, 8)}
                                ...
                              </CardDescription>
                            </div>
                          </div>
                          <Badge
                            variant={getStatusBadgeVariant(connection.status)}
                          >
                            {connection.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col space-y-2">
                          <div className="text-sm text-muted-foreground">
                            <span className="font-semibold">ID:</span>{" "}
                            {connection.id}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-semibold">Created:</span>{" "}
                            {new Date(connection.createdAt).toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-semibold">Updated:</span>{" "}
                            {new Date(connection.updatedAt).toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-semibold">
                              Integration ID:
                            </span>{" "}
                            {connection.integrationId}
                          </div>
                          {connection.labels &&
                            connection.labels.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {connection.labels.map((label, index) => (
                                  <Badge key={index} variant="outline">
                                    {label}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          <div className="flex items-center justify-end gap-2 mt-4">
                            {connection.status === "FAILED" && (
                              <Button
                                onClick={() =>
                                  handleConnect(connection.integrationId)
                                }
                                disabled={isConnecting}
                              >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Reconnect
                              </Button>
                            )}
                            {connection.enabled && (
                              <Button variant="destructive">
                                <XCircle className="mr-2 h-4 w-4" />
                                Disconnect
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <h3 className="text-xl font-semibold mb-2">No Connections Found</h3>
            {integrationId ? (
              <>
                <p className="text-muted-foreground mb-6">
                  This integration doesn't have any active connections.
                </p>
                <Button
                  onClick={() => handleConnect(integrationId)}
                  disabled={isConnecting}
                >
                  <Link2 className="mr-2 h-4 w-4" />
                  Connect Now
                </Button>
              </>
            ) : (
              <>
                <p className="text-muted-foreground mb-6">
                  You don't have any active connections. Connect to an
                  integration first.
                </p>
                <Button asChild>
                  <Link href="/integrations">View Integrations</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {!isFiltered && (
        <Card>
          <CardHeader>
            <CardTitle>Available Integrations</CardTitle>
            <CardDescription>Connect to new integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {integrations
                  .filter((integration: Integration) => {
                    // Filter out integrations that already have connections
                    return !connections.some(
                      (connection) =>
                        connection.integrationId === integration.id,
                    );
                  })
                  .map((integration: Integration) => (
                    <Card key={integration.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {integration.logo && (
                              <img
                                src={integration.logo}
                                alt={integration.name}
                                className="h-8 w-8 rounded-full"
                              />
                            )}
                            <div>
                              <CardTitle className="text-lg">
                                {integration.name}
                              </CardTitle>
                              <CardDescription>
                                {integration.appName}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge variant="secondary">Not Connected</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            onClick={() => handleConnect(integration.id)}
                            disabled={isConnecting}
                          >
                            <Link2 className="mr-2 h-4 w-4" />
                            Connect
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                {integrations.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-muted-foreground">
                      No integrations found. Create an integration first to
                      manage connections.
                    </p>
                    <Button asChild className="mt-4">
                      <Link href="/apps">Browse Apps</Link>
                    </Button>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
