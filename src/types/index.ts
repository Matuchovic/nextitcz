export type UserRole = 'admin' | 'dev' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string | null;
  company?: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'live' | 'dev' | 'review' | 'archived';
  tech_stack: string[];
  progress: number; // 0-100
  deadline?: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface Deployment {
  id: string;
  project_id: string;
  version: string;
  status: 'pending' | 'building' | 'success' | 'failed';
  environment: 'production' | 'staging' | 'preview';
  created_at: string;
  deployed_by: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key_prefix: string; // Only first few chars shown
  permissions: string[];
  last_used?: string;
  expires_at?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  type: 'deployment' | 'alert' | 'info' | 'warning';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price_monthly: number;
  price_annual: number;
  description: string;
  features: string[];
  is_featured?: boolean;
  cta_label: string;
  cta_href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  project_type: string;
  message: string;
  company?: string;
  budget?: string;
}

// API response wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Dashboard stats
export interface DashboardStats {
  revenue_monthly: number;
  revenue_change: number;
  active_users: number;
  users_change: number;
  projects_live: number;
  projects_new_today: number;
  api_latency_p99: number;
}
