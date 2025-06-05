import { DashboardLayout } from "@/components/dashboard-layout";
import { ManualToolCalling } from "@/components/manual-tool-calling";

export default function ActionToolCallingPage({
  params,
}: {
  params: { actionName: string };
}) {
  // Parse the action name to get app and action
  const [appKey, actionKey] = params.actionName.split("_", 2);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Manual Tool Calling
          </h1>
          <p className="text-muted-foreground">
            Test action with custom parameters
          </p>
        </div>
        <ManualToolCalling initialApp={appKey} initialAction={actionKey} />
      </div>
    </DashboardLayout>
  );
}
