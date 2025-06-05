"use client";

import { useState, useMemo } from "react";
import { useActions } from "@/lib/hooks/use-api-queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AlertCircle, Info, Search, Wrench } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AppActions({ appKey }: { appKey: string }) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 50;

  const {
    data: actionsData,
    isLoading,
    error,
    refetch,
  } = useActions({
    apps: appKey ? [appKey] : undefined,
    page,
    limit,
  });

  // Filter actions based on search term
  const filteredActions = useMemo(() => {
    if (!actionsData?.items) return [];

    if (!searchTerm.trim()) return actionsData.items;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return actionsData.items.filter(
      (action) =>
        action.displayName.toLowerCase().includes(lowerSearchTerm) ||
        action.description.toLowerCase().includes(lowerSearchTerm) ||
        action.tags.some((tag) => tag.toLowerCase().includes(lowerSearchTerm)),
    );
  }, [actionsData?.items, searchTerm]);

  // Handle testing an action
  const handleTestAction = (actionName: string) => {
    router.push(`/actions/manual-calling?app=${appKey}&action=${actionName}`);
  };

  if (!appKey) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>Available actions for this app</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>App Key Missing</AlertTitle>
            <AlertDescription>
              Cannot load actions because the app key is missing.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>Available actions for this app</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !actionsData) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Actions</CardTitle>
          </div>
          <CardDescription>Available actions for this app</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Actions</AlertTitle>
            <AlertDescription>
              {error?.message || "Failed to load actions"}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const totalPages = Math.ceil(actionsData.items.length/limit+1);

  if (actionsData.items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>Available actions for this app</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>No Actions Available</AlertTitle>
            <AlertDescription>
              This app does not have any actions available.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Available actions for this app</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search actions by name, description, or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {filteredActions.length === 0 ? (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>No Matching Actions</AlertTitle>
            <AlertDescription>
              No actions match your search criteria. Try a different search
              term.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActions.map((action) => (
                  <TableRow key={action.name}>
                    <TableCell className="font-medium">
                      {action.displayName}
                    </TableCell>
                    <TableCell className="max-w-md truncate">
                      {action.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {action.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {action.deprecated ? (
                        <Badge variant="destructive">Deprecated</Badge>
                      ) : (
                        <Badge variant="default">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTestAction(action.name)}
                      >
                        <Wrench className="mr-2 h-4 w-4" />
                        Test
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {totalPages > 0 && !searchTerm &&  (
              <div className="mt-4">
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
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(pageNum);
                            }}
                            isActive={pageNum === page}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}
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
        )}
      </CardContent>
    </Card>
  );
}
