"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useApps, useIntegrations } from "@/lib/hooks/use-api-queries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AppWindowIcon as Apps,
  Link2,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Plug,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { App, Integration } from "@/lib/types";

export function DashboardOverview() {
  const {
    data: apps = [],
    isLoading: isLoadingApps,
    error: appsError,
    refetch: refetchApps,
  } = useApps();

  const {
    data: integrations = [],
    isLoading: isLoadingIntegrations,
    error: integrationsError,
    refetch: refetchIntegrations,
  } = useIntegrations();

  const isLoading = isLoadingApps || isLoadingIntegrations;
  const error = appsError || integrationsError;

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-display font-semibold">
            Loading dashboard...
          </h2>
          <p className="text-content-secondary font-body">
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
              <AlertCircle className="h-5 w-5 text-status-error" />
              <CardTitle className="font-heading">
                Error Loading Dashboard
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-body">API Error</AlertTitle>
              <AlertDescription className="font-body">
                {error.message}
              </AlertDescription>
            </Alert>
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => {
                  refetchApps();
                  refetchIntegrations();
                }}
                className="w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/settings">Check API Settings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-fluid-3xl font-display font-bold tracking-tight gradient-text">
          Dashboard
        </h1>
        <p className="text-content-secondary font-body">
          Welcome to your Composio Integration Dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-base">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-heading font-medium">
              Available Apps
            </CardTitle>
            <Apps className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">{apps.length}</div>
            <p className="text-xs text-content-secondary font-body">
              Apps available for integration
            </p>
            <Button variant="link" asChild className="mt-2 px-0">
              <Link href="/apps" className="flex items-center">
                Browse Apps
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="card-base">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-heading font-medium">
              Active Integrations
            </CardTitle>
            <Link2 className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">
              {integrations.items.length}
            </div>
            <p className="text-xs text-content-secondary font-body">
              Configured app integrations
            </p>
            <Button variant="link" asChild className="mt-2 px-0">
              <Link href="/integrations" className="flex items-center">
                Manage Integrations
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="card-base">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-heading font-medium">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button
                asChild
                variant="outline"
                className="justify-start bg-action-primary/5 border-action-primary/20 hover:bg-action-primary/10"
              >
                <Link href="/apps">
                  <Apps className="mr-2 h-4 w-4 text-chart-1" />
                  Browse Apps
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="justify-start bg-action-primary/5 border-action-primary/20 hover:bg-action-primary/10"
              >
                <Link href="/integrations">
                  <Link2 className="mr-2 h-4 w-4 text-chart-2" />
                  Manage Integrations
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="justify-start bg-action-primary/5 border-action-primary/20 hover:bg-action-primary/10"
              >
                <Link href="/connections">
                  <Plug className="mr-2 h-4 w-4 text-chart-3" />
                  Connections
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="card-base">
          <CardHeader>
            <CardTitle className="font-heading">Recent Apps</CardTitle>
            <CardDescription className="font-body">
              Recently added or updated apps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4 custom-scrollbar">
              <div className="space-y-4">
                {apps.slice(0, 5).map((app: App) => (
                  <div
                    key={app.key}
                    className="flex items-center justify-between border-b border-borderColor-subtle/10 pb-4 last:border-0"
                  >
                    <div className="flex items-center space-x-4">
                      {app.logo && (
                        <img
                          src={app.logo}
                          alt={app.name}
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      <div>
                        <div className="font-medium font-body">{app.name}</div>
                        <div className="text-sm text-content-secondary font-body">
                          {app.meta?.actionsCount || 0} actions available
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      asChild
                      className="hover:bg-action-primary/5"
                    >
                      <Link href={`/apps/${app.key}`}>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="card-base">
          <CardHeader>
            <CardTitle className="font-heading">Active Integrations</CardTitle>
            <CardDescription className="font-body">
              Your recently configured integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4 custom-scrollbar">
              <div className="space-y-4">
                {integrations.items
                  .slice(0, 5)
                  .map((integration: Integration) => (
                    <div
                      key={integration.id}
                      className="flex items-center justify-between border-b border-borderColor-subtle/10 pb-4 last:border-0"
                    >
                      <div className="flex items-center space-x-4">
                        {integration.logo && (
                          <img
                            src={integration.logo}
                            alt={integration.name}
                            className="h-8 w-8 rounded-full"
                          />
                        )}
                        <div>
                          <div className="font-medium font-body">
                            {integration.name}
                          </div>
                          <div className="text-sm text-content-secondary font-body">
                            {integration.appName}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={integration.enabled ? "default" : "secondary"}
                        className={
                          integration.enabled
                            ? "bg-chart-2 text-secondary-foreground"
                            : ""
                        }
                      >
                        {integration.enabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
