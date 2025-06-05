import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const toolsList = [
  {
    id: "linkedin-post-generator",
    title: "LinkedIn Post Generator",
    description:
      "Generate professional LinkedIn posts tailored to your audience",
    icon: "📝",
  },
];

export default function ToolsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tools</h1>
          <p className="text-muted-foreground">
            Explore and use Composio tools to enhance your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {toolsList.map((tool) => (
            <Card
              key={tool.id}
              className="flex flex-col h-full hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{tool.icon}</div>
                  <CardTitle>{tool.title}</CardTitle>
                </div>
                <CardDescription className="mt-2">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto pt-4">
                <Button asChild className="w-full">
                  <Link href={`/tools/${tool.id}`}>Open Tool</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
