import { apiClient } from './apiClient';

export interface SaleItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Sale {
  id: number;
  customerId: number;
  customerName: string;
  totalAmount: number;
  createdAt: string;
  items: SaleItem[];
}

export interface CreateSalePayload {
  customerId: number;
  items: { productId: number; quantity: number }[];
}

export const saleService = {
  getAll: () =>
    apiClient.get<Sale[]>('/api/sales'),

  getById: (id: number) =>
    apiClient.get<Sale>(`/api/sales/${id}`),

  create: (payload: CreateSalePayload) =>
    apiClient.post<Sale>('/api/sales', payload),
};
