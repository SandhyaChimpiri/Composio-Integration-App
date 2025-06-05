import { DashboardLayout } from "@/components/dashboard-layout";
import { IntegrationDetail } from "@/components/integration-detail";

interface IntegrationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function IntegrationDetailPage({
  params,
}: IntegrationDetailPageProps) {
  const { id: integrationId } = await params;

  return (
    <DashboardLayout>
      <IntegrationDetail id={integrationId} />
    </DashboardLayout>
  );
}
