import { DashboardLayout } from "@/components/dashboard-layout";
import { SettingsForm } from "@/components/settings-form";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-tata font-bold tracking-tight gradient-text">
            Settings
          </h1>
          <p className="text-muted-foreground font-sans">
            Manage your API settings and preferences.
          </p>
        </div>
        <SettingsForm />
      </div>
    </DashboardLayout>
  );
}
