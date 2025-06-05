"use client";

import { useEffect, useState } from "react";
import { getIntegrations } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Link2 } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem,PaginationLink, PaginationPrevious, PaginationNext } from "./ui/pagination";

type Integration = {
  id: string;
  name: string;
  appName: string;
  authScheme: string;
  createdAt: string;
  logo: string;
  enabled: boolean;
};

export function IntegrationsList() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const integrationsData = await getIntegrations();
        setIntegrations(integrationsData?.items || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load integrations. Please try again.");
        toast({
          title: "Error",
          description: "Failed to load data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-display font-semibold">
            Loading integrations...
          </h2>
          <p className="text-content-secondary font-body">
            Please wait while we fetch your integrations.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <div className="text-center">
          <h2 className="text-xl font-display font-semibold">
            Error Loading Integrations
          </h2>
          <p className="text-content-secondary font-body">{error}</p>
        </div>
        <Button
          asChild
          className="bg-action-primary/10 hover:bg-action-primary/20 text-content-accent border border-action-primary/20"
        >
          <Link href="/integrations">Retry</Link>
        </Button>
      </div>
    );
  }

  if (integrations.length === 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-borderColor-subtle/20 bg-action-primary/5">
        <div className="text-center">
          <h2 className="text-xl font-heading font-semibold">
            No Integrations Found
          </h2>
          <p className="text-content-secondary font-body">
            You haven't created any integrations yet.
          </p>
        </div>
        <Button asChild>
          <Link href="/apps">Browse Apps</Link>
        </Button>
      </div>
    );
  }

  const limit = 9
  const totalPages = Math.ceil(integrations.length/limit);

  return (
    <>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {integrations.slice((page - 1) * limit, page * limit).map((integration) => (
        <Card key={integration.id} className="card-interactive">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-md">
              <Image
                src={integration.logo || "/placeholder.svg?height=40&width=40"}
                alt={integration.appName}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <CardTitle className="text-lg font-heading">
                {integration.name}
              </CardTitle>
              <CardDescription className="font-body">
                {integration.appName}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 text-sm font-body">
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-chart-2" />
                <span>Auth: {integration.authScheme}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-chart-3" />
                <span>
                  Created:{" "}
                  {new Date(integration.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    integration.enabled
                      ? "bg-status-success/20 text-status-success"
                      : "bg-status-error/20 text-status-error"
                  }`}
                >
                  {integration.enabled ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button asChild className="flex-1">
              <Link href={`/integrations/${integration.id}`}>Manage</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 bg-action-primary/10 hover:bg-action-primary/20 text-content-accent border border-action-primary/20"
            >
              <Link href={`/integrations/${integration.id}`}>Connect</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
    {totalPages > 0 && (
      <div>
     <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (page > 1) setPage(page - 1);
          }}
          className={
            page <= 1 ? "pointer-events-none opacity-50" : ""
          }
          />
        </PaginationItem>
        {Array.from({length: totalPages},(_,i)=>(i+1)).map(
          (pageNum)=>(
            <PaginationItem key={pageNum}>
              <PaginationLink href="#"
              onClick={(e)=>{
                e.preventDefault();
                setPage(pageNum);
              }}
              isActive={pageNum === page}
              >
              {pageNum}
              </PaginationLink>
            </PaginationItem>
          )
        )
        }
        <PaginationItem>
        <PaginationNext
          href="#"
          onClick={(e) => {
          e.preventDefault();
          if (page < totalPages) setPage(page + 1);
          }}
          className={
            page >= totalPages ? "pointer-events-none opacity-50" : ""
          }
        />
        </PaginationItem>
      </PaginationContent>
     </Pagination>
     </div>
     )}
    </>
  );
}
