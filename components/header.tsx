"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LOCAL_STORAGE_API_KEY } from "@/lib/api-utils";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [customApiKey, setCustomApiKey] = useState("");
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkApiKey = () => {
      const storedKey = localStorage.getItem(LOCAL_STORAGE_API_KEY);
      if (storedKey) {
        setCustomApiKey(storedKey);
        setHasStoredKey(true);
      } else {
        setCustomApiKey("");
        setHasStoredKey(false);
      }
    };

    // Check initially
    checkApiKey();

    // Listen for storage events
    window.addEventListener("storage", checkApiKey);

    return () => {
      window.removeEventListener("storage", checkApiKey);
    };
  }, []);

  const handleSaveApiKey = () => {
    if (customApiKey.trim()) {
      localStorage.setItem(LOCAL_STORAGE_API_KEY, customApiKey.trim());
      setHasStoredKey(true);
      
      toast({
        title: "API Key Saved",
        description: "Your custom API key has been saved locally.",
      });
      window.dispatchEvent(new Event("storage"));
      setShowApiKeyDialog(false);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid API Key",
        description: "Please enter a valid API key.",
      });
    }
  };

  const handleDeleteApiKey = () => {
    localStorage.removeItem(LOCAL_STORAGE_API_KEY);
    setCustomApiKey("");
    setHasStoredKey(false);
    toast({
      title: "API Key Cleared",
      description: "Your custom API key has been removed from local storage.",
    });
    window.dispatchEvent(new Event("storage"));
    setShowApiKeyDialog(false);
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-surface-alt backdrop-blur-sm bg-opacity-80">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-display font-bold gradient-text">
            Vestra Composio Dashboard
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Button
            variant="link"
            asChild
            className="font-body text-content-accent hover:text-content-accent/80"
          >
            <Link href="/tools">Tools</Link>
          </Button>
          <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-action-primary/20 hover:border-action-primary/30 hover:bg-action-primary/5"
              >
                API Key
                {hasStoredKey && (
                  <Badge
                    variant="secondary"
                    className="ml-1 bg-chart-2 text-secondary-foreground"
                  >
                    Custom
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] custom-scrollbar">
              <DialogHeader>
                <DialogTitle className="font-heading">
                  Set Custom API Key
                </DialogTitle>
                <DialogDescription className="font-body text-content-secondary">
                  {hasStoredKey
                    ? "You are using a custom API key. You can update or delete it."
                    : "Enter your Composio API key here. It will be stored locally in your browser and used for requests instead of the default key."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="apiKey" className="text-right">
                    API Key
                  </Label>
                  <Input
                    id="apiKey"
                    value={customApiKey}
                    onChange={(e) => setCustomApiKey(e.target.value)}
                    className="col-span-3 autofillOverride input-base"
                    placeholder="Enter your Composio API Key"
                  />
                </div>
              </div>
              <DialogFooter className="flex justify-between sm:justify-between">
                {hasStoredKey && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDeleteApiKey}
                  >
                    Clear API Key
                  </Button>
                )}
                <Button type="button" onClick={handleSaveApiKey}>
                  Save Key
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
