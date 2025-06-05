"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw, Search, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useApps,
  useActions,
  useActionSchema,
} from "@/lib/hooks/use-api-queries";
import { Skeleton } from "@/components/ui/skeleton";
import { App } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Import sub-components
import { AppSelector } from "./manual-tool-calling/AppSelector";
import { ActionSelector } from "./manual-tool-calling/ActionSelector";
import { SchemaEditorTab } from "./manual-tool-calling/SchemaEditorTab";
import { ApiCodeTab } from "./manual-tool-calling/ApiCodeTab";
import { OAuthTab } from "./manual-tool-calling/OAuthTab";
import { OpenAITab } from "./manual-tool-calling/OpenAITab";

// Import code generation utilities
import {
  ActionSchema, // Re-using the interface defined in the utils
  generateApiCode,
  generateOAuthCode,
  generateOpenAISchema,
} from "@/lib/code-generation";

// Dynamically import Monaco Editor with no SSR
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-80 w-full bg-slate-800 animate-pulse rounded-md"></div>
  ),
});

interface ManualToolCallingProps {
  initialApp?: string;
  initialAction?: string;
}

export function ManualToolCalling({
  initialApp,
  initialAction,
}: ManualToolCallingProps) {
  const searchParams = useSearchParams();
  const appFromUrl = searchParams.get("app");
  const actionFromUrl = searchParams.get("action");
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("schema");
  const [manualSchema, setManualSchema] = useState<string>("");
  const [apiCodeSnippet, setApiCodeSnippet] = useState("");
  const [oauthCodeSnippet, setOauthCodeSnippet] = useState("");
  const [openaiCodeSnippet, setOpenaiCodeSnippet] = useState("");
  const [parsedSchema, setParsedSchema] = useState<ActionSchema | null>(null);
  const [schemaError, setSchemaError] = useState<string | null>(null);
  const [isApiCopied, setIsApiCopied] = useState(false);
  const [isOauthCopied, setIsOauthCopied] = useState(false);
  const [isOpenaiCopied, setIsOpenaiCopied] = useState(false);
  const [editorMounted, setEditorMounted] = useState(false);

  // App and action selection
  const [selectedApp, setSelectedApp] = useState<string>(
    initialApp || appFromUrl || "",
  );
  const [selectedAction, setSelectedAction] = useState<string>(
    initialAction || actionFromUrl || "",
  );
  const [appSearchQuery, setAppSearchQuery] = useState("");
  const [actionSearchQuery, setActionSearchQuery] = useState("");
  const [fullActionName, setFullActionName] = useState<string>("");

  // Fetch apps and actions
  const { data: apps, isLoading: appsLoading } = useApps();
  const { data: actions, isLoading: actionsLoading } = useActions(
    selectedApp ? { apps: [selectedApp], limit: 1000, page: 1 } : undefined,
  );

  // Fetch action schema when an action is selected
  const { data: apiSchema, isLoading: schemaLoading } =
    useActionSchema(fullActionName);

  // Set the full action name when app and action are selected
  useEffect(() => {
    if (selectedApp && selectedAction) {
      setFullActionName(`${selectedAction}`);
    } else {
      setFullActionName("");
    }
  }, [selectedApp, selectedAction]);

  // Update schema when API data is received
  useEffect(() => {
    if (apiSchema) {
      try {
        setParsedSchema(apiSchema);
        setManualSchema(JSON.stringify(apiSchema, null, 2));
        setSchemaError(null);
      } catch (error) {
        console.error("Error processing API schema:", error);
        setSchemaError("Error processing API schema");
        setParsedSchema(null);
        setManualSchema("");
      }
    } else if (!fullActionName && !schemaLoading) {
      // Handle case where no action is selected (and not currently loading)
      const defaultSchema = {
        name: "DEFAULT_ACTION_PLACEHOLDER",
        description:
          "Select an App and Action to see its schema and generate code.",
        parameters: { properties: {}, type: "object" },
        display_name: "No Action Selected",
      } as ActionSchema; // Cast to satisfy type
      setParsedSchema(defaultSchema);
      setManualSchema(JSON.stringify(defaultSchema, null, 2));
      setSchemaError(null);
    } else if (!apiSchema && fullActionName && !schemaLoading) {
      setParsedSchema(null);
      setManualSchema("");
      setSchemaError("Failed to load schema or action has no schema.");
    }
  }, [apiSchema, fullActionName, schemaLoading]);

  // Effect to generate code snippets whenever parsedSchema changes
  useEffect(() => {
    if (parsedSchema && parsedSchema.name !== "DEFAULT_ACTION_PLACEHOLDER") {
      setApiCodeSnippet(generateApiCode(parsedSchema));
      setOpenaiCodeSnippet(generateOpenAISchema(parsedSchema));
    } else {
      // Clear snippets or show placeholder if schema is invalid/null/default
      const placeholder = "# Select a valid App and Action to generate code.";
      setApiCodeSnippet(placeholder);
      setOpenaiCodeSnippet(placeholder);
    }
  }, [parsedSchema]);

  // Effect to generate OAuth code once on mount (it's static)
  useEffect(() => {
    setOauthCodeSnippet(generateOAuthCode());
  }, []);

  // Handle manual schema changes
  const handleSchemaChange = (value: string | undefined) => {
    if (value === undefined) return; // Check for undefined

    setManualSchema(value);
    try {
      // Attempt to parse the manually edited schema
      const parsed = JSON.parse(value);
      setParsedSchema(parsed);
      setSchemaError(null);
    } catch (error) {
      setSchemaError("Invalid JSON schema");
      setParsedSchema(null); // Set parsedSchema to null on error
    }
  };

  // Copy code to clipboard
  const copyToClipboard = async (codeType: "api" | "oauth" | "openai") => {
    let codeToCopy: string | null = null;
    let toastDesc = "";
    let setCopiedState: (value: boolean) => void = () => {};

    switch (codeType) {
      case "api":
        codeToCopy = apiCodeSnippet;
        toastDesc = "API code copied to clipboard";
        setCopiedState = setIsApiCopied;
        break;
      case "oauth":
        codeToCopy = oauthCodeSnippet;
        toastDesc = "OAuth code copied to clipboard";
        setCopiedState = setIsOauthCopied;
        break;
      case "openai":
        codeToCopy = openaiCodeSnippet;
        toastDesc = "OpenAI function code copied to clipboard";
        setCopiedState = setIsOpenaiCopied;
        break;
    }

    if (codeToCopy === null || codeToCopy.startsWith("# Select")) {
      toast({
        title: "Cannot Copy Placeholder",
        description: "Please select a valid action first.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(codeToCopy);
      setCopiedState(true);
      toast({
        title: "Copied to clipboard!",
        description: toastDesc,
      });
      setTimeout(() => setCopiedState(false), 2000); // Reset icon after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
      toast({
        title: "Copy Failed",
        description: "Could not copy code to clipboard. See console.",
        variant: "destructive",
      });
    }
  };

  // Monaco editor options
  const editorOptions = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    automaticLayout: true,
    lineNumbers: "on",
    roundedSelection: true,
    cursorStyle: "line",
    wordWrap: "on",
  };

  // Handle editor mounting
  const handleEditorDidMount = () => {
    setEditorMounted(true);
  };

  // Filter apps based on search query
  const filteredApps = apps?.filter(
    (app: App) =>
      app.name.toLowerCase().includes(appSearchQuery.toLowerCase()) ||
      app.key.toLowerCase().includes(appSearchQuery.toLowerCase()),
  );

  // Filter actions based on search query
  const filteredActions = actions?.items.filter(
    (action) =>
      action.name.toLowerCase().includes(actionSearchQuery.toLowerCase()) ||
      action.displayName
        .toLowerCase()
        .includes(actionSearchQuery.toLowerCase()) ||
      action.description
        .toLowerCase()
        .includes(actionSearchQuery.toLowerCase()) ||
      action.tags.some((tag) =>
        tag.toLowerCase().includes(actionSearchQuery.toLowerCase()),
      ),
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manual Tool Calling</CardTitle>
        <CardDescription>Test tools with custom parameters</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* App and Action Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* App Selector */}
            <AppSelector
              apps={apps}
              filteredApps={filteredApps}
              isLoading={appsLoading}
              selectedApp={selectedApp}
              searchQuery={appSearchQuery}
              onSearchChange={setAppSearchQuery}
              onSelectApp={(key) => {
                setSelectedApp(key);
                setSelectedAction("");
                setActionSearchQuery("");
                setParsedSchema(null);
              }}
            />

            {/* Action Selector */}
            <ActionSelector
              isLoading={
                actionsLoading || (!!selectedApp && schemaLoading && !apiSchema)
              }
              selectedApp={selectedApp}
              selectedAction={selectedAction}
              searchQuery={actionSearchQuery}
              onSearchChange={setActionSearchQuery}
              onSelectAction={setSelectedAction}
              filteredActions={filteredActions}
            />
          </div>

          {/* Schema and Code Tabs */}
          <Tabs
            defaultValue="schema"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="schema">Schema Editor</TabsTrigger>
              <TabsTrigger value="api">API Code</TabsTrigger>
              <TabsTrigger value="oauth">OAuth Connection</TabsTrigger>
              <TabsTrigger value="openai">OpenAI Function</TabsTrigger>
            </TabsList>

            {/* Schema Editor Tab */}
            <TabsContent value="schema" className="mt-4">
              <SchemaEditorTab
                manualSchema={manualSchema}
                schemaError={schemaError}
                onSchemaChange={handleSchemaChange}
                schemaLoading={schemaLoading && !!fullActionName}
                parsedSchema={parsedSchema}
                apiSchema={apiSchema}
                editorOptions={editorOptions}
                onEditorMount={handleEditorDidMount}
              />
            </TabsContent>

            {/* API Tab */}
            <TabsContent value="api" className="mt-4">
              <ApiCodeTab
                apiCodeSnippet={apiCodeSnippet}
                isCopied={isApiCopied}
                onCopy={() => copyToClipboard("api")}
                editorOptions={editorOptions}
                onEditorMount={handleEditorDidMount}
              />
            </TabsContent>

            {/* OAuth Tab */}
            <TabsContent value="oauth" className="mt-4">
              <OAuthTab
                oauthCodeSnippet={oauthCodeSnippet}
                isOauthCopied={isOauthCopied}
                onCopy={() => copyToClipboard("oauth")}
                editorOptions={editorOptions}
                onEditorMount={handleEditorDidMount}
              />
            </TabsContent>

            {/* OpenAI Function Tab */}
            <TabsContent value="openai" className="mt-4">
              <OpenAITab
                openaiCodeSnippet={openaiCodeSnippet}
                isOpenaiCopied={isOpenaiCopied}
                onCopy={() => copyToClipboard("openai")}
                editorOptions={editorOptions}
                onEditorMount={handleEditorDidMount}
              />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
