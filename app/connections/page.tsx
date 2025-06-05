import { Metadata } from "next";
import { ConnectionsOverview } from "./connections-overview";

export const metadata: Metadata = {
  title: "Connections - Composio",
  description: "Manage your app connections and authentication.",
};

export default function ConnectionsPage() {
  return <ConnectionsOverview />;
}
