import { apiClient } from './apiClient';

export interface FaultCode {
  id: number;
  brand: string;
  model: string;
  code: string;
  type: string;
  description: string;
  possibleCauses?: string | null;
  recommendedAction?: string | null;
  safetyWarning?: string | null;
  manualReference?: string | null;
  verified: boolean;
}

export const faultCodeService = {
  getBrands: () =>
    apiClient.get<string[]>('/api/faultcodes/brands'),

  getModels: (brand: string) =>
    apiClient.get<string[]>(
      `/api/faultcodes/models?brand=${encodeURIComponent(brand)}`
    ),

  search: (filters: {
    brand: string;
    model: string;
    code: string;
  }) => {
    const params = new URLSearchParams({
      brand: filters.brand,
      model: filters.model,
      code: filters.code.trim(),
    });

    return apiClient.get<FaultCode[]>(
      `/api/faultcodes?${params.toString()}`
    );
  },
};
