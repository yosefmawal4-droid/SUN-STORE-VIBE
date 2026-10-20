import { apiClient } from './apiClient';

export interface Category {
  id: number;
  name: string;
  description?: string;
  productCount: number;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
  categoryName: string;
  price: number;
  costPrice: number;
  stockQuantity: number;
  minimumStock: number;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  stockStatus: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
}

export interface CreateProductPayload {
  name: string;
  description?: string;
  categoryId: number;
  price: number;
  costPrice: number;
  stockQuantity: number;
  minimumStock: number;
  imageUrl?: string;
  isActive: boolean;
}

export const productService = {
  getAll: (search?: string, categoryId?: number) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (categoryId) params.append('categoryId', String(categoryId));
    const qs = params.toString();
    return apiClient.get<Product[]>(`/api/products${qs ? `?${qs}` : ''}`);
  },

  getById: (id: number) =>
    apiClient.get<Product>(`/api/products/${id}`),

  create: (payload: CreateProductPayload) =>
    apiClient.post<Product>('/api/products', payload),

  update: (id: number, payload: CreateProductPayload) =>
    apiClient.put<Product>(`/api/products/${id}`, payload),

  delete: (id: number) =>
    apiClient.delete<{ message: string }>(`/api/products/${id}`),
};

export const categoryService = {
  getAll: () =>
    apiClient.get<Category[]>('/api/categories'),

  create: (payload: { name: string; description?: string }) =>
    apiClient.post<Category>('/api/categories', payload),

  update: (id: number, payload: { name: string; description?: string }) =>
    apiClient.put<{ message: string }>(`/api/categories/${id}`, payload),

  delete: (id: number) =>
    apiClient.delete<{ message: string }>(`/api/categories/${id}`),
};
