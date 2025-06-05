import React from "react";
import { RefreshCw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { ActionSchema } from "@/lib/code-generation";

// Dynamically import Monaco Editor with no SSR
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-80 w-full bg-slate-800 animate-pulse rounded-md"></div>
  ),
});

interface SchemaEditorTabProps {
  manualSchema: string;
  schemaError: string | null;
  onSchemaChange: (value: string | undefined) => void;
  schemaLoading: boolean;
  parsedSchema: ActionSchema | null;
  apiSchema: any;
  editorOptions: any;
  onEditorMount: () => void;
}

export function SchemaEditorTab({
  manualSchema,
  schemaError,
  onSchemaChange,
  schemaLoading,
  parsedSchema,
  apiSchema,
  editorOptions,
  onEditorMount,
}: SchemaEditorTabProps) {
  return (
    <div className="space-y-4">
      {/* Schema Preview Section - Improved design */}
      {parsedSchema && (
        <div className="rounded-lg border border-primary/10 p-4 bg-card/80 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h3 className="text-md font-alliance font-semibold text-foreground">
              {parsedSchema.display_name ||
                parsedSchema.name ||
                "Unnamed Action"}
            </h3>

            {parsedSchema.name &&
              parsedSchema.name !== "DEFAULT_ACTION_PLACEHOLDER" && (
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-foreground border-primary/20 font-mono text-xs"
                >
                  {parsedSchema.name}
                </Badge>
              )}
          </div>

          {parsedSchema.description && (
            <p className="text-sm text-muted-foreground font-sans mb-3">
              {parsedSchema.description}
            </p>
          )}

          {parsedSchema.parameters?.properties &&
          Object.keys(parsedSchema.parameters.properties).length > 0 ? (
            <div className="mt-3 space-y-2">
              <h4 className="text-sm font-alliance text-foreground/80">
                Parameters:
              </h4>
              <ScrollArea className="h-[120px] custom-scrollbar">
                <div className="space-y-2">
                  {Object.entries(parsedSchema.parameters.properties).map(
                    ([key, prop]: [string, any]) => (
                      <div
                        key={key}
                        className="flex flex-col p-2 rounded-md bg-primary/5"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-chart-2">
                            {key}
                          </span>
                          <span className="text-xs px-1 py-0.5 rounded bg-chart-1/20 text-chart-1 font-mono">
                            {prop.type}
                          </span>
                          {prop.required && (
                            <Badge
                              variant="outline"
                              className="text-[10px] py-0 px-1 h-4 bg-chart-3/20 text-chart-3 border-chart-3/30"
                            >
                              required
                            </Badge>
                          )}
                        </div>
                        {prop.description && (
                          <span className="text-xs text-muted-foreground mt-1 font-sans">
                            {prop.description}
                          </span>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </ScrollArea>
            </div>
          ) : (
            parsedSchema.name !== "DEFAULT_ACTION_PLACEHOLDER" && (
              <div className="text-sm text-muted-foreground font-sans italic">
                No parameters defined for this action.
              </div>
            )
          )}

          {parsedSchema.name === "DEFAULT_ACTION_PLACEHOLDER" && (
            <Alert className="bg-primary/5 border-primary/20">
              <Info className="h-4 w-4 text-chart-3" />
              <AlertTitle className="font-sans">
                Select an App and Action
              </AlertTitle>
              <AlertDescription className="font-sans text-muted-foreground">
                Choose an app and action from the dropdowns above to view the
                action schema.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {schemaError && (
        <Alert variant="destructive">
          <AlertTitle>Schema Error</AlertTitle>
          <AlertDescription>{schemaError}</AlertDescription>
        </Alert>
      )}

      {/* Monaco Editor Section */}
      <div className="monaco-editor-container rounded-md overflow-hidden border border-primary/20">
        {schemaLoading ? (
          <Skeleton className="h-80 w-full" />
        ) : (
          <MonacoEditor
            height="400px"
            language="json"
            theme="vs-dark"
            value={manualSchema}
            options={editorOptions}
            onChange={onSchemaChange}
            onMount={onEditorMount}
          />
        )}
      </div>
    </div>
  );
}
