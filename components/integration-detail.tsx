"use client";

import { useEffect, useState } from "react";
import {
  getIntegrationById,
  initiateConnection,
  getConnections,
} from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, X, Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { LOCAL_STORAGE_API_KEY } from "@/lib/api-utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "./ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "./ui/pagination";

type Integration = {
  id: string;
  name: string;
  appName: string;
  authScheme: string;
  createdAt: string;
  updatedAt: string;
  logo: string;
  enabled: boolean;
  connections: any[] | null;
};

type Connection = {
  id: string;
  integrationId: string;
  status: string;
  appName: string;
  enabled: boolean;
  createdAt: string;
  connectionParams?: any;
  isDisabled?: boolean;
  appUniqueId?: string;
  logo?: string;
  integrationIsDisabled?: boolean;
  member?: any;
  integration?: any;
  clientUniqueUserId?: string;
  nanoId?: string;
  statusReason?: string | null;
  updatedAt?: string;
};

export function IntegrationDetail({ id }: { id: string }) {
  const [integration, setIntegration] = useState<Integration | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] =
    useState<Connection | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const [entityId, setEntityId] = useState("default");
  const [page, setPage] = useState(1);

  const limit = 5;
  const totalPages = Math.ceil(connections.length / limit);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const [integrationData, connectionsData] = await Promise.all([
          getIntegrationById(id),
          getConnections({ integrationId: id }),
        ]);

        setIntegration(integrationData);
        setConnections(connectionsData?.items || []);
      } catch (err) {
        console.error("Failed to fetch integration details:", err);
        setError("Failed to load integration details. Please try again.");
        toast({
          title: "Error",
          description: "Failed to load integration details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id, toast]);

  // Get connection status badge variant
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

  const handleConnect = async () => {
    if (!integration) return;

    setIsConnecting(true);
    try {
      console.log("Initiating connection...");

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

      // Make direct fetch call to include custom headers
      const response = await fetch("/api/connections/create", {
        method: "POST",
        headers,
        body: JSON.stringify({
          integrationId: integration.id,
          entityId: entityId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to initiate connection");
      }

      const data = await response.json();
      const { redirectUrl } = data;

      console.log("Redirect URL:", redirectUrl);

      // open the redirect url in a new tab
      window.open(redirectUrl, "_blank");
    } catch (err) {
      console.error("Error initiating connection:", err);
      toast({
        title: "Error",
        description: "Failed to initiate connection. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Show connection details in dialog
  const handleViewConnectionDetails = (connection: Connection) => {
    setSelectedConnection(connection);
    setIsDialogOpen(true);
  };

  // Format keys for better readability
  const formatKey = (key: string) => {
    return key
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Mask sensitive data
  const maskSensitiveValue = (key: string, value: any) => {
    const sensitiveKeys = [
      "access_token",
      "client_secret",
      "scope",
      "scopes",
      "code_verifier",
      "client_id",
      "token_type",
    ];

    if (typeof value === "string" && sensitiveKeys.includes(key)) {
      return "********";
    }
    return value;
  };

  // Copy connection ID to clipboard
  const copyConnectionId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);

    // Reset copy success icon after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);

    toast({
      title: "Copied!",
      description: "Connection ID copied to clipboard",
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-display font-semibold">
            Loading integration details...
          </h2>
          <p className="text-content-secondary font-body">
            Please wait while we fetch the integration information.
          </p>
        </div>
      </div>
    );
  }

  if (error || !integration) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <div className="text-center">
          <h2 className="text-xl font-display font-semibold">
            Error Loading Integration Details
          </h2>
          <p className="text-content-secondary font-body">
            {error || "Integration not found"}
          </p>
        </div>
        <Button
          asChild
          className="bg-action-primary/10 hover:bg-action-primary/20 text-content-accent border border-action-primary/20"
        >
          <Link href="/integrations">Retry</Link>
        </Button>
      </div>
    );
  }

  const hasConnections = connections.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mr-2 hover:bg-action-primary/5"
        >
          <Link href="/integrations">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="font-body">Back to Integrations</span>
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="flex-1">
          <Card className="card-base">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md">
                <Image
                  src={
                    integration.logo || "/placeholder.svg?height=64&width=64"
                  }
                  alt={integration.appName}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <CardTitle className="text-2xl font-display">
                  {integration.name}
                </CardTitle>
                <CardDescription className="font-body">
                  Integration with {integration.appName}
                  <Badge
                    variant={integration.enabled ? "default" : "destructive"}
                    className="ml-2"
                  >
                    {integration.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-content-secondary font-heading">
                    Auth Scheme
                  </h3>
                  <p className="font-body">{integration.authScheme}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-content-secondary font-heading">
                    Created
                  </h3>
                  <p className="font-body">
                    {new Date(integration.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-content-secondary font-heading">
                    Last Updated
                  </h3>
                  <p className="font-body">
                    {new Date(integration.updatedAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-content-secondary font-heading">
                    Integration ID
                  </h3>
                  <p className="font-body">{integration.id}</p>
                </div>
              </div>
              <h1 className="my-6 text-lg">Active Connections</h1>
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead>Connections</TableHead>
                    <TableHead>Auth Scheme</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Go to Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {connections.length > 0 ? (
                    connections
                      .slice((page - 1) * limit, page * limit)
                      .map((connection) => (
                        <TableRow key={connection.id}>
                          <TableCell>
                            {" "}
                            {connection.appUniqueId ||
                              connection.id.slice(0, 8)}
                          </TableCell>
                          <TableCell> {integration.authScheme} </TableCell>
                          <TableCell>
                            {new Date(connection.createdAt).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {" "}
                            <Badge
                              variant={getStatusBadgeVariant(connection.status)}
                            >
                              {connection.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-action-primary/10"
                              onClick={() =>
                                handleViewConnectionDetails(connection)
                              }
                            >
                              <span className="font-body">Details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-content-secondary font-body"
                      >
                        No active connections. Create a connection below.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {totalPages > 0 && (
                <div className="mt-10">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) setPage(page - 1);
                          }}
                          className={
                            page <= 1 ? "pointer-events-none opacity-50" : ""
                          }
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (pageNum) => (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setPage(pageNum);
                              }}
                              isActive={pageNum === page}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page < totalPages) setPage(page + 1);
                          }}
                          className={
                            page >= totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="md:w-1/3">
          <Card className="card-base">
            <CardHeader>
              <CardTitle className="font-heading">Connection</CardTitle>
              <CardDescription className="font-body">
                Connect this integration with a specific entity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-content-secondary mb-4 font-body">
                Enter a unique identifier for this connection or leave as
                default.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="entityId" className="font-heading">
                    Entity ID
                  </Label>
                  <Input
                    id="entityId"
                    value={entityId}
                    onChange={(e) => setEntityId(e.target.value)}
                    className="border-action-primary/20 bg-action-primary/5 focus-visible:ring-action-primary/30"
                  />
                  <p className="text-xs text-content-secondary font-body">
                    This identifier helps you distinguish between multiple
                    connections to the same integration.
                  </p>
                </div>
                <Button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="w-full"
                >
                  {isConnecting ? "Connecting..." : "Connect"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Connection Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto custom-scrollbar border-borderColor-subtle/10 bg-surface-base/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display">
              Connection Details
              <Badge
                variant={getStatusBadgeVariant(
                  selectedConnection?.status || ""
                )}
              >
                {selectedConnection?.status}
              </Badge>
            </DialogTitle>
            <DialogDescription className="font-body">
              ID:{" "}
              <span className="font-medium flex items-center gap-1">
                {selectedConnection?.id}
                <button
                  onClick={() =>
                    selectedConnection?.id &&
                    copyConnectionId(selectedConnection.id)
                  }
                  className="inline-flex items-center justify-center rounded-md p-1 hover:bg-action-primary/5"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-status-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2 font-heading">
                Basic Information
              </h3>
              <div className="border rounded-md p-4 border-borderColor-subtle/10 bg-surface-interactive/40">
                <dl className="divide-y divide-borderColor-subtle/10">
                  <div className="grid grid-cols-3 gap-4 py-2">
                    <dt className="text-sm font-medium text-content-secondary font-body">
                      Status
                    </dt>
                    <dd className="text-sm text-content-primary col-span-2 font-body">
                      {selectedConnection?.status}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-2">
                    <dt className="text-sm font-medium text-content-secondary font-body">
                      App
                    </dt>
                    <dd className="text-sm text-content-primary col-span-2 font-body">
                      {selectedConnection?.appName}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-2">
                    <dt className="text-sm font-medium text-content-secondary font-body">
                      Created
                    </dt>
                    <dd className="text-sm text-content-primary col-span-2 font-body">
                      {selectedConnection?.createdAt &&
                        new Date(selectedConnection.createdAt).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Connection parameters details */}
            {selectedConnection?.connectionParams && (
              <div>
                <h3 className="font-medium mb-2 font-heading">
                  Connection Parameters
                </h3>
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                  <pre className="border rounded-md p-4 text-xs font-code border-borderColor-subtle/20 bg-action-primary/5 hover:bg-action-primary/10 text-content-primary">
                    {Object.entries(selectedConnection.connectionParams).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="pb-1 border-b border-borderColor-subtle/10 mb-1"
                        >
                          <span className="font-medium">
                            {formatKey(key)}:{" "}
                          </span>
                          <span>
                            {typeof value === "object"
                              ? JSON.stringify(value, null, 2)
                              : maskSensitiveValue(key, value)}
                          </span>
                        </div>
                      )
                    )}
                  </pre>
                </div>
              </div>
            )}

            {/* Additional Connection Details */}
            <div>
              <h3 className="font-medium mb-2 font-heading">
                Additional Details
              </h3>
              <div className="border rounded-md p-4 border-borderColor-subtle/10 bg-surface-interactive/40">
                <dl className="divide-y divide-borderColor-subtle/10">
                  <div className="grid grid-cols-3 gap-4 py-2">
                    <dt className="text-sm font-medium text-content-secondary font-body">
                      Client User ID
                    </dt>
                    <dd className="text-sm text-content-primary col-span-2 font-body">
                      {selectedConnection?.clientUniqueUserId || "N/A"}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-2">
                    <dt className="text-sm font-medium text-content-secondary font-body">
                      Connection ID
                    </dt>
                    <dd className="text-sm text-content-primary col-span-2 font-body">
                      {selectedConnection?.id}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-2">
                    <dt className="text-sm font-medium text-content-secondary font-body">
                      Nano ID
                    </dt>
                    <dd className="text-sm text-content-primary col-span-2 font-body">
                      {selectedConnection?.nanoId || "N/A"}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-2">
                    <dt className="text-sm font-medium text-content-secondary font-body">
                      Integration ID
                    </dt>
                    <dd className="text-sm text-content-primary col-span-2 font-body">
                      {selectedConnection?.integrationId}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-2">
                    <dt className="text-sm font-medium text-content-secondary font-body">
                      App Unique ID
                    </dt>
                    <dd className="text-sm text-content-primary col-span-2 font-body">
                      {selectedConnection?.appUniqueId || "N/A"}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-2">
                    <dt className="text-sm font-medium text-content-secondary font-body">
                      Updated At
                    </dt>
                    <dd className="text-sm text-content-primary col-span-2 font-body">
                      {selectedConnection?.updatedAt &&
                        new Date(selectedConnection.updatedAt).toLocaleString()}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-2">
                    <dt className="text-sm font-medium text-content-secondary font-body">
                      Enabled
                    </dt>
                    <dd className="text-sm text-content-primary col-span-2 font-body">
                      {selectedConnection?.enabled ? "Yes" : "No"}
                    </dd>
                  </div>
                  {selectedConnection?.statusReason && (
                    <div className="grid grid-cols-3 gap-4 py-2">
                      <dt className="text-sm font-medium text-content-secondary font-body">
                        Status Reason
                      </dt>
                      <dd className="text-sm text-content-primary col-span-2 font-body">
                        {selectedConnection.statusReason}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              className="border-action-primary/20 bg-action-primary/5 hover:bg-action-primary/10 text-content-accent"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
