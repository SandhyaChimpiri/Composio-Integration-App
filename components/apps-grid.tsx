"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApps } from "@/lib/hooks/use-api-queries";
import Link from "next/link";
import Image from "next/image";
import { Search, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type App = {
  name: string;
  key: string;
  appId: string;
  description: string;
  categories: string[];
  logo: string;
};

export function AppsGrid() {
  const { data: apps = [], isLoading, error, refetch } = useApps();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = useMemo(() => {
    if (!searchQuery) return apps;
    return apps.filter(
      (app: App) =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.categories.some((category: string) =>
          category.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
  }, [searchQuery, apps]);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-display font-semibold">
            Loading apps...
          </h2>
          <p className="text-content-secondary font-body">
            Please wait while we fetch available apps.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <Card className="card-base">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-status-error" />
              <CardTitle className="font-heading">Error Loading Apps</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-body">API Error</AlertTitle>
              <AlertDescription className="font-body">
                {error.message}
              </AlertDescription>
            </Alert>
            <Button onClick={() => refetch()} className="w-full">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-content-secondary" />
          <Input
            type="search"
            placeholder="Search apps by name, description, or category..."
            className="pl-8 border-action-primary/20 bg-action-primary/5 placeholder:text-content-secondary focus-visible:ring-action-primary/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredApps.length === 0 ? (
        <div className="flex h-[30vh] items-center justify-center rounded-lg border border-dashed border-borderColor-subtle/20 bg-action-primary/5">
          <div className="text-center">
            <h3 className="text-lg font-heading font-medium">No apps found</h3>
            <p className="text-sm text-content-secondary font-body">
              Try adjusting your search query.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredApps.map((app: App) => (
            <Card key={app.appId || app.name} className="card-interactive">
              <CardHeader className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-md">
                    <Image
                      src={app.logo || "/placeholder.svg?height=40&width=40"}
                      alt={app.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <CardTitle className="text-lg font-heading">
                    {app.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="line-clamp-3 text-sm text-content-secondary font-body">
                  {app.description}
                </p>
                {app.categories && app.categories.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {app.categories.map((category: string) => (
                      <span
                        key={category}
                        className="inline-flex items-center rounded-full bg-action-primary/10 px-2 py-1 text-xs font-medium font-body"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  asChild
                  className="w-full bg-action-primary/10 hover:bg-action-primary/20 text-content-accent border border-action-primary/20"
                  variant="outline"
                >
                  <Link href={`/apps/${app.name}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
