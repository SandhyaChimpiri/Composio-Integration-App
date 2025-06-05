import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getApps,
  getAppByName,
  getIntegrations,
  getIntegrationById,
  createIntegration,
  initiateConnection,
  getConnections,
  getActions,
  getActionById,
  getActionSchema,
  type Action,
  type ActionListResponse,
  type ActionQueryParams,
  type IntegrationCreateParams,
  type ConnectionCreateParams,
  type ConnectionQueryParams,
  type ConnectionListResponse,
} from "@/lib/api-client";

interface ConnectionResponse {
  redirectUrl: string;
  connectedAccountId: string;
}

export const queryKeys = {
  apps: ["apps"] as const,
  app: (name: string) => ["app", name] as const,
  integrations: ["integrations"] as const,
  integration: (id: string) => ["integration", id] as const,
  connections: (params?: ConnectionQueryParams) =>
    ["connections", params] as const,
  actions: (params?: ActionQueryParams) => ["actions", params] as const,
  action: (id: string, version?: string) => ["action", id, version] as const,
  actionSchema: (name: string) => ["actionSchema", name] as const,
};

export function useApps() {
  return useQuery({
    queryKey: queryKeys.apps,
    queryFn: getApps,
  });
}

export function useApp(name: string) {
  return useQuery({
    queryKey: queryKeys.app(name),
    queryFn: () => getAppByName(name),
    enabled: !!name,
  });
}

export function useIntegrations(appName?: string) {
  return useQuery({
    queryKey: [...queryKeys.integrations, appName],
    queryFn: () => getIntegrations(appName),
  });
}

export function useIntegration(id: string) {
  return useQuery({
    queryKey: queryKeys.integration(id),
    queryFn: () => getIntegrationById(id),
    enabled: !!id,
  });
}

export function useCreateIntegration() {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, IntegrationCreateParams>({
    mutationFn: createIntegration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.integrations });
    },
  });
}

export function useInitiateConnection() {
  return useMutation<ConnectionResponse, Error, ConnectionCreateParams>({
    mutationFn: async (data) => {
      const response = await initiateConnection(data);
      const result = await response.json();
      return result as ConnectionResponse;
    },
  });
}

export function useConnections(params?: ConnectionQueryParams) {
  return useQuery<ConnectionListResponse>({
    queryKey: queryKeys.connections(params),
    queryFn: () => getConnections(params),
    enabled: true,
  });
}

export function useActions(params?: ActionQueryParams) {
  return useQuery<ActionListResponse>({
    queryKey: queryKeys.actions(params),
    queryFn: () => getActions(params),
  });
}

export function useAction(actionId: string, version?: string) {
  return useQuery<Action>({
    queryKey: queryKeys.action(actionId, version),
    queryFn: () => getActionById(actionId, version),
    enabled: !!actionId,
  });
}

export function useActionSchema(actionName: string) {
  return useQuery({
    queryKey: queryKeys.actionSchema(actionName),
    queryFn: () => getActionSchema(actionName),
    enabled: !!actionName,
  });
}
