"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LOCAL_STORAGE_API_KEY } from "@/lib/api-utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

export function SettingsForm() {
  const { toast } = useToast();
  const [hasStoredKey, setHasStoredKey] = useState(false);

  useEffect(() => {
    const checkApiKey = () => {
      const storedKey = localStorage.getItem(LOCAL_STORAGE_API_KEY);
      setHasStoredKey(!!storedKey);
    };

    // Check initially
    checkApiKey();

    // Set up event listener for storage changes
    window.addEventListener("storage", checkApiKey);

    return () => {
      window.removeEventListener("storage", checkApiKey);
    };
  }, []);

  const handleClearApiKey = () => {
    localStorage.removeItem(LOCAL_STORAGE_API_KEY);
    setHasStoredKey(false);
    toast({
      title: "API Key Cleared",
      description: "Your custom API key has been removed from local storage.",
    });
  };

  return (
    <Card className="card-base">
      <CardHeader>
        <CardTitle className="font-heading">Dashboard Settings</CardTitle>
        <CardDescription className="font-body">
          Manage your dashboard configuration.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium font-heading">Custom API Key</h3>
          <p className="text-sm text-content-secondary font-body">
            Manage the custom Composio API key stored in your browser. This key
            overrides the default configuration.
          </p>
          {hasStoredKey ? (
            <div className="mt-2">
              <Badge
                variant="secondary"
                className="bg-status-success text-secondary-foreground"
              >
                Custom API Key Active
              </Badge>
            </div>
          ) : (
            <div className="mt-2">
              <Badge
                variant="outline"
                className="text-content-secondary border-action-primary/20"
              >
                Using Default API Key
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t border-borderColor-subtle/20 px-6 py-4">
        {hasStoredKey ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="bg-status-error/90 hover:bg-status-error"
              >
                Clear Stored API Key
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-surface-base/95 backdrop-blur-sm border-borderColor-subtle/20">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-display">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="font-body">
                  This action will remove your custom API key from this
                  browser's local storage. The application will revert to using
                  the default API key configured on the server.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-action-primary/20 bg-action-primary/5 hover:bg-action-primary/10 text-content-accent">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleClearApiKey}
                  className="bg-status-error/90 hover:bg-status-error"
                >
                  Yes, clear API Key
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <p className="text-sm text-content-secondary font-body">
            No custom API key is currently stored. You can set one using the API
            Key button in the header.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
