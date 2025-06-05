import React from "react";
import { Check, Copy, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

// Dynamically import Monaco Editor with no SSR
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-80 w-full bg-slate-800 animate-pulse rounded-md"></div>
  ),
});

interface OpenAITabProps {
  openaiCodeSnippet: string;
  isOpenaiCopied: boolean;
  onCopy: () => void;
  editorOptions: any;
  onEditorMount: () => void;
}

export function OpenAITab({
  openaiCodeSnippet,
  isOpenaiCopied,
  onCopy,
  editorOptions,
  onEditorMount,
}: OpenAITabProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="openai-snippet">
            OpenAI Function Calling Integration
          </Label>
          <Badge variant="outline" className="px-2 py-1">
            Ready-to-use code
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground mb-2">
          Complete implementation to convert this Composio action into an OpenAI
          function call with direct integration.
        </div>
        <div className="h-80 border rounded-md overflow-hidden bg-slate-900">
          <MonacoEditor
            height="100%"
            width="100%"
            language="python"
            value={openaiCodeSnippet}
            options={{
              ...editorOptions,
              readOnly: false,
            }}
            theme="vs-dark"
            onMount={onEditorMount}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          <Info className="h-4 w-4 inline mr-1" />
          Set{" "}
          <code className="bg-secondary px-1 rounded-sm">OPENAI_API_KEY</code>,
          and{" "}
          <code className="bg-secondary px-1 rounded-sm">COMPOSIO_API_KEY</code>
          as environment variables.
        </div>
        <Button variant="outline" size="sm" onClick={onCopy}>
          {isOpenaiCopied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
