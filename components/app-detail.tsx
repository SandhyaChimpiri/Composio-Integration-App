"use client";

import { useApp } from "@/lib/hooks/use-api-queries";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateIntegrationForm } from "@/components/create-integration-form";
import { AppActions } from "@/components/app-actions";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type AuthScheme = {
  scheme_name: string;
  auth_mode: string;
  default_scopes?: string[];
  fields: Array<{
    name: string;
    display_name: string;
    description: string;
    type: string;
    default: string | null;
    required: boolean;
  }>;
};

type App = {
  name: string;
  key: string;
  appId: string;
  description: string;
  categories: string[];
  logo: string;
  auth_schemes: AuthScheme[];
};

export function AppDetail({ name }: { name: string }) {
  const { data: app, isLoading, error, refetch } = useApp(name);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-display font-semibold">
            Loading app details...
          </h2>
          <p className="text-content-secondary font-body">
            Please wait while we fetch the app information.
          </p>
        </div>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <Card className="card-base">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-status-error" />
              <CardTitle className="font-heading">
                Error Loading App Details
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-body">API Error</AlertTitle>
              <AlertDescription className="font-body">
                {error?.message || "App not found"}
              </AlertDescription>
            </Alert>
            <div className="flex flex-col gap-2">
              <Button onClick={() => refetch()} className="w-full">
                Retry
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full bg-action-primary/10 hover:bg-action-primary/20 text-content-accent border-action-primary/20"
              >
                <Link href="/apps">Back to Apps</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Process auth_schemes to ensure they have the correct structure
  const processedApp = {
    ...app,
    auth_schemes:
      app.auth_schemes && app.auth_schemes.length > 0
        ? app.auth_schemes.map((scheme: any) => {
            // Extract default scopes from the fields if available
            const scopesField = scheme.fields?.find(
              (f: any) => f.name === "scopes",
            );
            const defaultScopes = scopesField?.default
              ? scopesField.default.split(" ")
              : [];

            return {
              ...scheme,
              // Ensure default_scopes is properly extracted
              default_scopes: scheme.default_scopes
                ? Array.isArray(scheme.default_scopes)
                  ? scheme.default_scopes
                  : [scheme.default_scopes]
                : defaultScopes,
            };
          })
        : [],
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mr-2 hover:bg-action-primary/5"
        >
          <Link href="/apps">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="font-body">Back to Apps</span>
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="md:w-2/3">
          <Card className="card-base">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md">
                <Image
                  src={app.logo || "/placeholder.svg?height=64&width=64"}
                  alt={app.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <CardTitle className="text-2xl font-display">
                  {app.name}
                </CardTitle>
                <CardDescription className="font-body">
                  {app.categories.join(", ")}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-content-secondary font-body">
                {app.description}
              </p>

              <div className="mt-6">
                <h3 className="mb-2 text-lg font-medium font-heading">
                  Authentication Schemes
                </h3>
                {processedApp.auth_schemes &&
                processedApp.auth_schemes.length > 0 ? (
                  <ul className="list-inside list-disc space-y-2 font-body">
                    {processedApp.auth_schemes.map((scheme: AuthScheme) => (
                      <li key={`${scheme.scheme_name}-${scheme.auth_mode}`}>
                        <span className="font-medium text-content-accent">
                          {scheme.scheme_name}
                        </span>
                        <span className="text-content-primary">
                          : {scheme.auth_mode}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-content-secondary font-body">
                    No authentication schemes available.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-1/3">
          <Card className="card-base">
            <CardHeader>
              <CardTitle className="font-heading">Create Integration</CardTitle>
              <CardDescription className="font-body">
                Configure a new integration with {app.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateIntegrationForm app={processedApp} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <AppActions appKey={app.key} />
      </div>
    </div>
  );
}
