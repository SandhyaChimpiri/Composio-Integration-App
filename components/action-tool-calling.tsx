"use client";

import { useState, useEffect } from "react";
import { useActionSchema } from "@/lib/hooks/use-api-queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, Copy, Loader2, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

// Import Monaco Editor
import Editor from "@monaco-editor/react";

interface ActionToolCallingProps {
  actionName: string;
}

export function ActionToolCalling({ actionName }: ActionToolCallingProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("schema");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [editorValue, setEditorValue] = useState("");

  // Parse the action name to get app and action
  const [appKey, actionKey] = actionName.split("_", 2);

  // Fetch the action schema
  const { data: schema, isLoading, error } = useActionSchema(actionName);

  // Generate code snippet when schema is loaded
  useEffect(() => {
    if (schema) {
      generateCodeFromSchema(schema);
      setEditorValue(JSON.stringify(schema, null, 2));
    }
  }, [schema]);

  // Function to generate the code snippet from schema
  const generateCodeFromSchema = (schema: any) => {
    if (!schema || !schema.function) return;

    const functionName = schema.function.name;
    const parameters = schema.function.parameters?.properties || {};
    const requiredParams = schema.function.parameters?.required || [];

    // Create a function that wraps the tool call
    let code = `from composio_openai import ComposioToolSet, Action

# Initialize the Composio client
toolset = ComposioToolSet(api_key="YOUR_API_KEY")

# Execute the action
result = toolset.execute_action(
    action=Action.${functionName},
    params={
`;

    // Add parameters with default values or placeholders
    Object.keys(parameters).forEach((param) => {
      const paramInfo = parameters[param];
      const isRequired = requiredParams.includes(param);

      if (paramInfo.type === "string") {
        code += `        "${param}": "${
          isRequired ? "REQUIRED" : "optional"
        }",\n`;
      } else if (paramInfo.type === "number" || paramInfo.type === "integer") {
        code += `        "${param}": ${isRequired ? "0" : "None"},\n`;
      } else if (paramInfo.type === "boolean") {
        code += `        "${param}": ${isRequired ? "False" : "None"},\n`;
      } else if (paramInfo.type === "array") {
        code += `        "${param}": ${isRequired ? "[]" : "None"},\n`;
      } else if (paramInfo.type === "object") {
        code += `        "${param}": ${isRequired ? "{}" : "None"},\n`;
      } else {
        code += `        "${param}": ${isRequired ? "None" : "None"},\n`;
      }
    });

    code += `    }
)

# Print the result
print(result)`;

    setCodeSnippet(code);
  };

  // Copy code to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setIsCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Code has been copied to your clipboard",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy code to clipboard",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Action Schema</CardTitle>
          <CardDescription>
            Loading schema for {appKey}/{actionKey}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !schema) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Action Schema</CardTitle>
          <CardDescription>Error loading schema</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error Loading Schema</AlertTitle>
            <AlertDescription className="space-y-4">
              <p>
                {error instanceof Error
                  ? error.message
                  : `Failed to load action schema for ${appKey}/${actionKey}`}
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-sm">Possible reasons:</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>The action may not exist</li>
                  <li>There might be an issue with the API connection</li>
                  <li>The action name format might be incorrect</li>
                </ul>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/apps/${appKey}`}>Back to App</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/apps">Browse Apps</Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{schema.function?.name || actionName}</CardTitle>
        <CardDescription>
          {schema.function?.description ||
            "Test this action with custom parameters"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Tabs
            defaultValue="schema"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="schema">Schema</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            {/* Schema Editor Tab */}
            <TabsContent value="schema" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="schema-editor">Action Schema</Label>
                  <div className="border rounded-md h-[500px]">
                    <Editor
                      height="500px"
                      defaultLanguage="json"
                      value={editorValue}
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                      }}
                    />
                  </div>
                </div>

                {schema.function?.parameters?.properties && (
                  <div className="space-y-2">
                    <Label>Parameters</Label>
                    <div className="border rounded-md p-4 space-y-2">
                      <ul className="mt-2 space-y-2">
                        {Object.entries(
                          schema.function.parameters.properties,
                        ).map(([name, param]: [string, any]) => (
                          <li key={name} className="border-b pb-2">
                            <div className="flex items-start">
                              <div className="flex-1">
                                <div className="font-medium">{name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {param.description}
                                </div>
                                <div className="text-xs">
                                  Type: {param.type}
                                  {schema.function.parameters.required?.includes(
                                    name,
                                  ) && (
                                    <span className="text-destructive ml-2">
                                      (Required)
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Code Tab */}
            <TabsContent value="code" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code-snippet">Generated Python Code</Label>
                  <div className="border rounded-md h-[500px]">
                    <Editor
                      height="500px"
                      defaultLanguage="python"
                      value={codeSnippet}
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
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
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
