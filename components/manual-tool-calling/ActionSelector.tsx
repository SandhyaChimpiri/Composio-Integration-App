import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Action {
  name: string;
  displayName: string;
  description: string;
  tags: string[];
  deprecated: boolean;
}

interface ActionSelectorProps {
  isLoading: boolean;
  selectedApp: string;
  selectedAction: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectAction: (name: string) => void;
  filteredActions: Action[] | undefined;
}

export function ActionSelector({
  isLoading,
  selectedApp,
  selectedAction,
  searchQuery,
  onSearchChange,
  onSelectAction,
  filteredActions,
}: ActionSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="action-search" className="text-sm font-alliance">
        Select Action
      </Label>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="action-search"
          placeholder="Search actions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          disabled={!selectedApp}
          className="pl-9 border-primary/20 bg-primary/5 focus-visible:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <Card className="border-primary/10">
        <ScrollArea className="h-[180px] custom-scrollbar">
          {!selectedApp ? (
            <div className="flex items-center justify-center h-full p-4">
              <p className="text-sm text-muted-foreground font-sans">
                Select an app to view actions
              </p>
            </div>
          ) : isLoading ? (
            <div className="space-y-2 p-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1 p-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ))}
            </div>
          ) : filteredActions && filteredActions.length > 0 ? (
            <div className="p-1">
              {filteredActions.map((action) => (
                <div
                  key={action.name}
                  className={`p-2 rounded-md cursor-pointer transition-colors ${
                    selectedAction === action.name
                      ? "bg-primary/15"
                      : "hover:bg-primary/5"
                  }`}
                  onClick={() => onSelectAction(action.name)}
                >
                  <div className="flex items-center justify-between">
                    <p
                      className={`font-medium text-sm ${
                        selectedAction === action.name
                          ? "text-primary font-alliance"
                          : "text-foreground font-alliance"
                      }`}
                    >
                      {action.displayName || action.name}
                    </p>
                    <div className="flex gap-1">
                      {action.tags.slice(0, 2).map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[10px] bg-chart-1/10 text-chart-1 border-chart-1/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {action.tags.length > 2 && (
                        <Badge
                          variant="outline"
                          className="text-[10px] bg-primary/10 text-muted-foreground border-primary/20"
                        >
                          +{action.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {action.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 font-sans">
                      {action.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-4">
              <p className="text-sm text-muted-foreground font-sans">
                No actions found
              </p>
            </div>
          )}
        </ScrollArea>
      </Card>
    </div>
  );
}
