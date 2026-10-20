import { apiClient } from './apiClient';

export interface LowStockProduct {
  id: number;
  name: string;
  stockQuantity: number;
  minimumStock: number;
  status: string;
}

export interface RecentSale {
  id: number;
  customerName: string;
  totalAmount: number;
  createdAt: string;
}

export interface DashboardData {
  totalProducts: number;
  totalCustomers: number;
  totalSales: number;
  totalRevenue: number;
  totalInventoryValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  lowStockProducts: LowStockProduct[];
  recentSales: RecentSale[];
}

export const dashboardService = {
  get: () => apiClient.get<DashboardData>('/api/dashboard'),
};
