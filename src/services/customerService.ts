import { apiClient } from './apiClient';

export interface Customer {
  id: number;
  name: string;
  phone?: string;
  address?: string;
  notes?: string;
  createdAt: string;
}

export interface CreateCustomerPayload {
  name: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export const customerService = {
  getAll: (search?: string) => {
    const qs = search ? `?search=${encodeURIComponent(search)}` : '';
    return apiClient.get<Customer[]>(`/api/customers${qs}`);
  },

  getById: (id: number) =>
    apiClient.get<Customer>(`/api/customers/${id}`),

  create: (payload: CreateCustomerPayload) =>
    apiClient.post<Customer>('/api/customers', payload),

  update: (id: number, payload: CreateCustomerPayload) =>
    apiClient.put<Customer>(`/api/customers/${id}`, payload),

  delete: (id: number) =>
    apiClient.delete<{ message: string }>(`/api/customers/${id}`),
};
