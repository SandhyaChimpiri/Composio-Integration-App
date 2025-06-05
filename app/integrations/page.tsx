import { DashboardLayout } from "@/components/dashboard-layout";
import { IntegrationsList } from "@/components/integrations-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function IntegrationsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-tata font-bold tracking-tight gradient-text">
              Integrations
            </h1>
            <p className="text-muted-foreground font-sans">
              Manage your app integrations and connections.
            </p>
          </div>
          <Button
            asChild
            className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
          >
            <Link href="/apps">
              <Plus className="mr-2 h-4 w-4" />
              <span className="font-sans">New Integration</span>
            </Link>
          </Button>
        </div>
        <IntegrationsList />
      </div>
    </DashboardLayout>
  );
}
