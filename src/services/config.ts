/**
 * Central API configuration.
 * Change API_BASE_URL here only â€” never repeat the URL in components.
 *
 * For Expo Go on a physical device: replace with your machine's local IP,
 * e.g. "http://192.168.1.x:5253"
 *
 * For Android emulator: use "http://10.0.2.2:5253"
 * For iOS simulator / web: "http://localhost:5253"
 */
export const API_BASE_URL = 'http://localhost:5253';

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}/api/auth/register`,
  login: `${API_BASE_URL}/api/auth/login`,
  logout: `${API_BASE_URL}/api/auth/logout`,
  currentUser: `${API_BASE_URL}/api/auth/me`,
} as const;

