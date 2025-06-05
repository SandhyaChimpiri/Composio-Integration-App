"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  Linkedin,
  Settings2,
  Twitter,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { LOCAL_STORAGE_API_KEY } from "@/lib/api-utils";

// Define the structure for a post variation
interface PostVariation {
  id: string;
  content: string;
}

// This is the main UI component for the LinkedIn Post Generator tool
export function LinkedinGenerator() {
  const { toast } = useToast();

  // State for user input
  const [prompt, setPrompt] = useState<string>("");
  // State for connection details
  const [twitterUserId, setTwitterUserId] = useState<string>("");
  const [twitterConnectedAccountId, setTwitterConnectedAccountId] =
    useState<string>("");
  const [linkedinAuthorUrn, setLinkedinAuthorUrn] = useState<string>("");
  const [linkedinConnectedAccountId, setLinkedinConnectedAccountId] =
    useState<string>("");
  // State for Composio Entity ID (optional)
  const [entityId, setEntityId] = useState<string>(""); // Default to empty, will use "default" if empty

  // State for generated variations
  const [variations, setVariations] = useState<PostVariation[]>([]);
  // State for the selected variation
  const [selectedVariationId, setSelectedVariationId] = useState<string | null>(
    null,
  );
  // State to track loading status during generation
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // State for posting status
  const [isPosting, setIsPosting] = useState<boolean>(false);
  // State to store any errors during generation or posting
  const [error, setError] = useState<string | null>(null);

  // Function to handle the generation process
  const handleGeneratePosts = async () => {
    // Validate required inputs
    if (
      !prompt.trim() ||
      !twitterUserId.trim() ||
      !twitterConnectedAccountId.trim()
    ) {
      setError(
        "Please fill in the Prompt, Twitter User ID, and Twitter Connection ID.",
      );
      toast({
        variant: "destructive",
        title: "Missing Configuration",
        description: "Fill in Prompt & Twitter details before generating.",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setVariations([]); // Clear previous results
    setSelectedVariationId(null); // Clear previous selection

    try {
      // Step 1: Fetch Liked Tweets
      // Get custom API key from local storage
      const customApiKey =
        typeof window !== "undefined"
          ? localStorage.getItem(LOCAL_STORAGE_API_KEY)
          : null;

      const tweetRes = await fetch(
        "/api/tools/linkedin-post-generator/fetch-tweets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include custom API key header if it exists
            ...(customApiKey && { "x-custom-api-key": customApiKey }),
          },
          body: JSON.stringify({
            twitterUserId,
            twitterConnectedAccountId,
            entityId: entityId.trim() || "default", // Use provided or default
          }),
        },
      );

      if (!tweetRes.ok) {
        const errData = await tweetRes
          .json()
          .catch(() => ({ error: "Failed to parse error response" })); // Handle non-JSON error response
        throw new Error(
          errData.error || `Failed to fetch liked tweets (${tweetRes.status})`,
        );
      }

      const tweetData = await tweetRes.json();
      const likedTweets = tweetData.tweets.map(
        (tweet: { text: string }) => tweet.text,
      );

      if (!likedTweets || likedTweets.length === 0) {
        console.warn("No liked tweets found or returned from API.");
        // Optionally inform the user or proceed with generation without tweet context
        // For now, we proceed
      }

      // Step 2: Generate Variations
      const variationRes = await fetch(
        "/api/tools/linkedin-post-generator/generate-variations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userPrompt: prompt, likedTweets }), // Send empty array if no tweets found
        },
      );

      if (!variationRes.ok) {
        const errData = await variationRes
          .json()
          .catch(() => ({ error: "Failed to parse error response" }));
        throw new Error(
          errData.error ||
            `Failed to generate variations (${variationRes.status})`,
        );
      }

      const variationData = await variationRes.json();
      if (!variationData.variations || variationData.variations.length === 0) {
        throw new Error("Generation resulted in no variations.");
      }
      setVariations(variationData.variations);
    } catch (err: any) {
      // Store the error message
      setError(
        err.message || "An unexpected error occurred during generation.",
      );
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: err.message || "Could not generate variations.",
      });
    } finally {
      // Ensure loading state is turned off
      setIsLoading(false);
    }
  };

  // Function to handle posting to LinkedIn
  const handlePostToLinkedIn = async () => {
    // Validate required inputs
    if (
      !selectedVariationId ||
      !linkedinAuthorUrn.trim() ||
      !linkedinConnectedAccountId.trim()
    ) {
      setError(
        "Please select a variation and provide LinkedIn Author URN and Connection ID.",
      );
      toast({
        variant: "destructive",
        title: "Missing Information",
        description:
          "Select a variation and ensure LinkedIn details are filled in.",
      });
      return;
    }
    if (!variations.length) return; // Should not happen if button is enabled

    const selectedVariation = variations.find(
      (v) => v.id === selectedVariationId,
    );
    if (!selectedVariation) return; // Should not happen

    setIsPosting(true);
    setError(null);

    try {
      // Get custom API key from local storage
      const customApiKey =
        typeof window !== "undefined"
          ? localStorage.getItem(LOCAL_STORAGE_API_KEY)
          : null;

      const response = await fetch(
        "/api/tools/linkedin-post-generator/post-linkedin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include custom API key header if it exists
            ...(customApiKey && { "x-custom-api-key": customApiKey }),
          },
          body: JSON.stringify({
            postContent: selectedVariation.content,
            linkedinAuthorUrn,
            linkedinConnectedAccountId,
            entityId: entityId.trim() || "default", // Use provided or default
          }),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        const errorMsg =
          result.error || `Failed to post to LinkedIn (${response.status})`;
        throw new Error(errorMsg);
      }

      toast({
        title: "Post Successful",
        description:
          result.message || "Your post has been submitted to LinkedIn.",
      });
      setSelectedVariationId(null); // Optionally clear selection after posting
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while posting.");
      toast({
        variant: "destructive",
        title: "Posting Failed",
        description: err.message || "Could not post to LinkedIn.",
      });
    } finally {
      setIsPosting(false);
    }
  };

  // Check if generation prerequisites are met
  const canGenerate =
    !isLoading &&
    prompt.trim() &&
    twitterUserId.trim() &&
    twitterConnectedAccountId.trim();
  // Check if posting prerequisites are met
  const canPost =
    !isPosting &&
    selectedVariationId &&
    linkedinAuthorUrn.trim() &&
    linkedinConnectedAccountId.trim();

  return (
    // Main grid: 2 columns on large screens, increased gap
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Left Column: Configuration and Input Prompt */}
      <div className="flex flex-col gap-8">
        {/* Configuration Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="h-5 w-5 flex-shrink-0" /> Configuration
            </CardTitle>
            <CardDescription>
              Enter connection details required for fetching tweets and posting.
              Optionally provide a Composio Entity ID.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {" "}
            {/* Increased space */}
            {/* Twitter Group */}
            <div className="space-y-4 rounded-md border border-dashed p-4">
              <h4 className="mb-2 flex items-center gap-1 text-sm font-medium text-muted-foreground">
                <Twitter className="h-4 w-4" /> Tweet Fetching (Twitter)
              </h4>
              <div>
                <Label htmlFor="twitter-user-id">User ID</Label>
                <Input
                  id="twitter-user-id"
                  placeholder="e.g., 1830503015494639616"
                  value={twitterUserId}
                  onChange={(e) => setTwitterUserId(e.target.value)}
                  disabled={isLoading || isPosting}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Your numerical Twitter user ID.
                </p>
              </div>
              <div>
                <Label htmlFor="twitter-conn-id">Connection ID</Label>
                <Input
                  id="twitter-conn-id"
                  placeholder="Composio Connection ID for Twitter"
                  value={twitterConnectedAccountId}
                  onChange={(e) => setTwitterConnectedAccountId(e.target.value)}
                  disabled={isLoading || isPosting}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Found in Composio connections list.
                </p>
              </div>
            </div>
            {/* LinkedIn Group */}
            <div className="space-y-4 rounded-md border border-dashed p-4">
              <h4 className="mb-2 flex items-center gap-1 text-sm font-medium text-muted-foreground">
                <Linkedin className="h-4 w-4" /> Post Publishing (LinkedIn)
              </h4>
              <div>
                <Label htmlFor="linkedin-author-urn">Author URN</Label>
                <Input
                  id="linkedin-author-urn"
                  placeholder="e.g., urn:li:person:xxxxxxxx"
                  value={linkedinAuthorUrn}
                  onChange={(e) => setLinkedinAuthorUrn(e.target.value)}
                  disabled={isLoading || isPosting}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Your LinkedIn URN (person or org).
                </p>
              </div>
              <div>
                <Label htmlFor="linkedin-conn-id">Connection ID</Label>
                <Input
                  id="linkedin-conn-id"
                  placeholder="Composio Connection ID for LinkedIn"
                  value={linkedinConnectedAccountId}
                  onChange={(e) =>
                    setLinkedinConnectedAccountId(e.target.value)
                  }
                  disabled={isLoading || isPosting}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Found in Composio connections list.
                </p>
              </div>
            </div>
            {/* Entity ID Group */}
            <div className="space-y-2 rounded-md border border-dashed p-4">
              <h4 className="mb-2 flex items-center gap-1 text-sm font-medium text-muted-foreground">
                <Settings2 className="h-4 w-4" /> Composio Settings (Optional)
              </h4>
              <div>
                <Label htmlFor="entity-id">Entity ID</Label>
                <Input
                  id="entity-id"
                  placeholder="default"
                  value={entityId}
                  onChange={(e) => setEntityId(e.target.value)}
                  disabled={isLoading || isPosting}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Leave blank to use "default".
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Card */}
        <Card>
          <CardHeader>
            <CardTitle>1. Enter Your Prompt</CardTitle>
            <CardDescription>
              Provide the core topic or idea for your LinkedIn post.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="linkedin-prompt">Post Topic / Prompt</Label>
              <Textarea
                id="linkedin-prompt"
                placeholder="e.g., Exploring the future of AI in healthcare..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={8} // Slightly more rows
                disabled={isLoading || isPosting}
                className="resize-none"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGeneratePosts} disabled={!canGenerate}>
              <Sparkles className="mr-2 h-4 w-4" />{" "}
              {isLoading ? "Generating..." : "Generate Variations"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Right Column: Output/Variations */}
      <Card className="lg:col-span-1 flex flex-col">
        {" "}
        {/* Ensure card takes full height potentially */}
        <CardHeader>
          <CardTitle>2. Select a Variation</CardTitle>
          <CardDescription>
            Choose the generated post you prefer to publish.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow min-h-[400px]">
          {" "}
          {/* Added flex-grow */}
          {/* Loading State */}
          {isLoading && (
            <div className="flex h-full flex-col items-center justify-center space-y-4 pt-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          )}
          {/* Error State */}
          {error && !isLoading && !isPosting && (
            <div className="flex h-full items-center justify-center">
              <Alert variant="destructive" className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}
          {/* Variations Display */}
          {!isLoading && !error && variations.length > 0 && (
            <RadioGroup
              value={selectedVariationId ?? undefined}
              onValueChange={setSelectedVariationId}
              className="space-y-4" // Increased space
              disabled={isPosting}
            >
              {/* Adjusted height, maybe link to container height? */}
              <ScrollArea className="h-[calc(100vh-450px)] min-h-[350px] pr-3">
                {variations.map((variation) => (
                  <Label
                    key={variation.id}
                    htmlFor={variation.id}
                    // Apply conditional styling for selection
                    className={cn(
                      "block cursor-pointer rounded-lg border p-4 transition-colors hover:bg-accent/80",
                      selectedVariationId === variation.id
                        ? "border-primary ring-1 ring-primary bg-primary/5"
                        : "border",
                      isPosting ? "opacity-50 cursor-not-allowed" : "",
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem
                        value={variation.id}
                        id={variation.id}
                        className="mt-1"
                        disabled={isPosting}
                      />
                      <span className="block flex-1 whitespace-pre-wrap text-sm font-normal leading-relaxed">
                        {variation.content}
                      </span>
                    </div>
                  </Label>
                ))}
              </ScrollArea>
            </RadioGroup>
          )}
          {/* Initial/Empty State */}
          {!isLoading && !error && variations.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center rounded-md border border-dashed">
              <Sparkles className="mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-center text-sm text-muted-foreground">
                Configure connections, enter a prompt,
                <br />
                and click 'Generate Variations'.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          {" "}
          {/* Added border-t */}
          <Button
            onClick={handlePostToLinkedIn}
            disabled={!canPost || isLoading}
            size="lg" // Larger button for final action
          >
            {isPosting ? (
              <>
                <Settings2 className="mr-2 h-4 w-4 animate-spin" /> Posting to
                LinkedIn...
              </>
            ) : (
              <>
                <Linkedin className="mr-2 h-4 w-4" /> Post Selected Variation
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
