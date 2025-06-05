"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LOCAL_STORAGE_API_KEY } from "@/lib/api-utils";

type App = {
  name: string;
  appId: string;
  key: string;
  auth_schemes: Array<{
    scheme_name: string;
    auth_mode: string;
    fields: Array<{
      name: string;
      display_name: string;
      description: string;
      type: string;
      default: string | null;
      required: boolean;
    }>;
    default_scopes?: string[];
  }>;
};

export function CreateIntegrationForm({ app }: { app: App }) {
  const [name, setName] = useState(`${app.name}_integration`);
  const [authScheme, setAuthScheme] = useState(
    app.auth_schemes.length > 0 ? app.auth_schemes[0].auth_mode : "",
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Creating integration...");
      const selectedScheme = app.auth_schemes.find(
        (scheme) => scheme.auth_mode === authScheme,
      );

      if (!selectedScheme) {
        throw new Error("Selected authentication scheme not found");
      }

      // Prepare auth config from the selected scheme
      const authConfig: Record<string, string> = {};

      // Process scopes if found in the fields
      const scopesField = selectedScheme.fields.find(
        (field) => field.name === "scopes",
      );
      if (scopesField && scopesField.default) {
        authConfig.scopes = scopesField.default;
      } else if (
        selectedScheme.default_scopes &&
        selectedScheme.default_scopes.length > 0
      ) {
        // If no default in fields but we have default_scopes array, join them
        authConfig.scopes = selectedScheme.default_scopes.join(" ");
      }

      // Add other fields with defaults that may be required
      selectedScheme.fields.forEach((field) => {
        if (field.name !== "scopes" && field.default) {
          authConfig[field.name] = field.default;
        }
      });

      console.log("Integration data:", {
        app_name: app.key,
        name,
        auth_mode: authScheme,
        auth_config: authConfig,
      });

      // Get the custom API key from localStorage
      const customApiKey =
        typeof window !== "undefined"
          ? localStorage.getItem(LOCAL_STORAGE_API_KEY)
          : null;

      // Call the local Next.js API route
      const response = await fetch("/api/integrations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(customApiKey && { "x-custom-api-key": customApiKey }),
        },
        body: JSON.stringify({
          app_name: app.key,
          name,
          auth_mode: authScheme,
          auth_config: authConfig,
          use_composio_auth: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create integration");
      }

      const integration = await response.json();
      console.log("Integration created:", integration);

      toast({
        title: "Integration Created",
        description: `Successfully created integration for ${app.name}.`,
      });

      router.push(`/integrations/${integration.id}`);
    } catch (error) {
      console.error("Error creating integration:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to create integration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="font-heading">
          Integration Name
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border-action-primary/20 bg-action-primary/5 focus-visible:ring-action-primary/30 font-body"
        />
      </div>

      {app.auth_schemes.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="auth-scheme" className="font-heading">
            Authentication Scheme
          </Label>
          <Select
            value={authScheme}
            onValueChange={setAuthScheme}
            disabled={app.auth_schemes.length <= 1}
          >
            <SelectTrigger
              id="auth-scheme"
              className="border-action-primary/20 bg-action-primary/5"
            >
              <SelectValue
                placeholder="Select authentication scheme"
                className="font-body"
              />
            </SelectTrigger>
            <SelectContent className="border-borderColor-subtle/20 bg-surface-base/95 backdrop-blur-sm font-body">
              {app.auth_schemes.map((scheme) => (
                <SelectItem
                  key={`${scheme.scheme_name}-${scheme.auth_mode}`}
                  value={scheme.auth_mode}
                  className="hover:bg-action-primary/10 font-body"
                >
                  {scheme.scheme_name} ({scheme.auth_mode})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-content-secondary font-body">
            Authentication scheme determines how users will connect to this
            integration
          </p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-action-primary text-content-inverse"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Integration"}
      </Button>
    </form>
  );
}
