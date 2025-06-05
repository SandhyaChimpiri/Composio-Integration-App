export interface Action {
  appKey: string;
  appName: string;
  name: string;
  displayName: string;
  description: string;
  tags: string[];
  deprecated: boolean;
}

export interface ActionListResponse {
  items: Action[];
  page: number;
  totalPages: number;
}

export interface App {
  name: string;
  key: string;
  appId: string;
  description: string;
  categories: string[];
  logo?: string;
  docs?: string;
  enabled: boolean;
  meta?: {
    actionsCount: number;
    triggersCount: number;
    is_custom_app: boolean;
  };
}

export interface Integration {
  id: string;
  name: string;
  appName: string;
  enabled: boolean;
  logo?: string;
  authConfig?: Record<string, any>;
  useComposioAuth: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IntegrationCreateParams {
  app_name: string;
  name: string;
  auth_mode: string;
  auth_config?: Record<string, any>;
  use_composio_auth: boolean;
}

export interface ConnectionCreateParams {
  integrationId: string;
  entityId: string;
}

export interface ConnectionResponse {
  redirectUrl: string;
  connectedAccountId: string;
}

export interface Connection {
  integrationId: string;
  isDisabled: boolean;
  invocationCount: number;
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  appUniqueId?: string;
  appName: string;
  member?: Record<string, any>;
  connectionParams?: Record<string, any>;
  clientUniqueUserId?: string;
  data?: Record<string, any>;
  deleted?: boolean;
  enabled: boolean;
  logo?: string;
  authConfig?: Record<string, any>;
  labels?: string[];
}

export interface ConnectionListResponse {
  items: Connection[];
  totalPages: number;
  page: number;
}

export interface ConnectionQueryParams {
  page?: number;
  pageSize?: number;
  appNames?: string[];
  labels?: string[];
  showActiveOnly?: boolean;
  status?: string;
  integrationId?: string;
  connectionId?: string;
  entityId?: string[];
  showDisabled?: boolean;
}

export interface ActionQueryParams {
  apps?: string[];
  actions?: string[];
  tags?: string[];
  useCase?: string;
  page?: number;
  limit?: number;
  filterImportant?: boolean;
  sortBy?: "alphabet" | "usage" | "no_sort";
}
