import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ActionsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-tata font-bold tracking-tight gradient-text">
            Actions
          </h1>
          <p className="text-muted-foreground font-sans">
            Explore and test Composio actions manually
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-12 px-6 border rounded-lg border-primary/10 bg-card/80 backdrop-blur-sm">
          <h2 className="text-2xl font-alliance font-semibold mb-4">
            Manual Action Calling
          </h2>
          <p className="text-center text-muted-foreground max-w-md mb-8 font-sans">
            Test Composio actions with custom parameters without writing code.
            Explore action schemas and execute actions directly.
          </p>
          <Button asChild size="lg" className="bg-primary/90 hover:bg-primary">
            <Link href="/actions/manual-calling">
              <span className="font-sans">Get Started</span>
            </Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
