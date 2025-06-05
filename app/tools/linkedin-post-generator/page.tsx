import { LinkedinGenerator } from "@/tools/linkedin-post-generator/linkedin-generator";
import { Suspense } from "react";

export default function LinkedinPostGeneratorToolPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold tracking-tight">
        LinkedIn Post Generator
      </h1>
      <p className="mb-8 text-muted-foreground">
        Enter a prompt, and we'll generate LinkedIn post variations based on the
        style and tone derived from your liked tweets.
      </p>
      {/* Use Suspense for potential future data fetching within the generator */}
      <Suspense fallback={<div>Loading Tool...</div>}>
        <LinkedinGenerator />
      </Suspense>
    </div>
  );
}
