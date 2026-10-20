/**
 * Central HTTP client.
 * Handles Authorization header injection and consistent error parsing.
 */

import { API_BASE_URL } from './config';

// Token is set by AuthContext after login and cleared on logout
let _token: string | null = null;

export function setAuthToken(token: string | null) {
  _token = token;
}

export function getAuthToken(): string | null {
  return _token;
}

// ─── Generic request helper ────────────────────────────────────────────────

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export class ApiException extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'ApiException';
  }
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (_token) {
    headers['Authorization'] = `Bearer ${_token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // No content responses (204)
  if (response.status === 204) return undefined as T;

  const data = await response.json().catch(() => ({ message: 'Unknown error' }));

  if (!response.ok) {
    const err = data as ApiError;
    throw new ApiException(response.status, err.message ?? 'Request failed', err.errors);
  }

  return data as T;
}

export const apiClient = {
  get:    <T>(path: string)               => request<T>('GET',    path),
  post:   <T>(path: string, body: unknown) => request<T>('POST',   path, body),
  put:    <T>(path: string, body: unknown) => request<T>('PUT',    path, body),
  delete: <T>(path: string)               => request<T>('DELETE', path),
};
