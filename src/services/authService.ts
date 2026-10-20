/**
 * All auth-related API calls — Register, Login, Logout, Me.
 * Components never call fetch directly; they use this service.
 */

import { apiClient } from './apiClient';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

export interface MessageResponse {
  message: string;
}

// ─── Service calls ─────────────────────────────────────────────────────────

export const authService = {
  register(payload: RegisterPayload) {
    return apiClient.post<MessageResponse>('/api/auth/register', payload);
  },

  login(payload: LoginPayload) {
    return apiClient.post<AuthResponse>('/api/auth/login', payload);
  },

  logout() {
    return apiClient.post<MessageResponse>('/api/auth/logout', {});
  },

  me() {
    return apiClient.get<UserProfile>('/api/auth/me');
  },
};
