import { DashboardLayout } from "@/components/dashboard-layout";
import { AppDetail } from "@/components/app-detail";

// Define the page component with the correct type for params
export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  // In Next.js 15, params is a Promise that needs to be awaited
  const { name } = await params;

  return (
    <DashboardLayout>
      <AppDetail name={name} />
    </DashboardLayout>
  );
}
