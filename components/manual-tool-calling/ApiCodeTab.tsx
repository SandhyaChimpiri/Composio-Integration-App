import React from "react";
import { Check, Copy } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// Dynamically import Monaco Editor with no SSR
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-80 w-full bg-slate-800 animate-pulse rounded-md"></div>
  ),
});

interface ApiCodeTabProps {
  apiCodeSnippet: string;
  isCopied: boolean;
  onCopy: () => void;
  editorOptions: any;
  onEditorMount: () => void;
}

export function ApiCodeTab({
  apiCodeSnippet,
  isCopied,
  onCopy,
  editorOptions,
  onEditorMount,
}: ApiCodeTabProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="api-snippet">Direct API Implementation</Label>
        <div className="h-80 border rounded-md overflow-hidden bg-slate-900">
          <MonacoEditor
            height="100%"
            width="100%"
            language="python"
            value={apiCodeSnippet}
            options={{
              ...editorOptions,
              readOnly: false,
            }}
            theme="vs-dark"
            onMount={onEditorMount}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={onCopy}>
          {isCopied ? (
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
