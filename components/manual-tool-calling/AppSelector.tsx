import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { App } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface AppSelectorProps {
  apps: App[] | undefined;
  filteredApps: App[] | undefined;
  isLoading: boolean;
  selectedApp: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectApp: (key: string) => void;
}

export function AppSelector({
  apps,
  filteredApps,
  isLoading,
  selectedApp,
  searchQuery,
  onSearchChange,
  onSelectApp,
}: AppSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="app-search" className="text-sm font-alliance">
        Select App
      </Label>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="app-search"
          placeholder="Search apps..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 border-primary/20 bg-primary/5 focus-visible:ring-primary/30"
        />
      </div>

      <Card className="border-primary/10">
        <ScrollArea className="h-[180px] custom-scrollbar">
          {isLoading ? (
            <div className="space-y-2 p-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 p-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredApps && filteredApps.length > 0 ? (
            <div className="p-1">
              {filteredApps.map((app) => (
                <div
                  key={app.key}
                  className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                    selectedApp === app.key
                      ? "bg-primary/15 text-primary"
                      : "hover:bg-primary/5"
                  }`}
                  onClick={() => onSelectApp(app.key)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md overflow-hidden border border-primary/20 bg-card">
                    {app.logo ? (
                      <img
                        src={app.logo}
                        alt={app.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="text-xs font-mono text-muted-foreground font-bold">
                        {app.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm font-alliance">
                      {app.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {app.key}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-4">
              <p className="text-sm text-muted-foreground font-sans">
                {apps && apps.length > 0
                  ? "No apps match your search"
                  : "No apps available"}
              </p>
            </div>
          )}
        </ScrollArea>
      </Card>
    </div>
  );
}
