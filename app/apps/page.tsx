import { DashboardLayout } from "@/components/dashboard-layout";
import { AppsGrid } from "@/components/apps-grid";

export default function AppsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-tata font-bold tracking-tight gradient-text">
            Apps
          </h1>
          <p className="text-muted-foreground font-sans">
            Browse and select apps to create integrations with.
          </p>
        </div>
        <AppsGrid />
      </div>
    </DashboardLayout>
  );
}
