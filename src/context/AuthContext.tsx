/**
 * AuthContext — single source of truth for authentication state.
 *
 * On app start:
 *   1. Reads stored token from AsyncStorage.
 *   2. If found, calls GET /api/auth/me to validate it.
 *   3. Sets user or clears storage if token is invalid/expired.
 *
 * Exposes: user, isAuthenticated, isLoading, login, register, logout.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken } from '../services/apiClient';
import { authService, UserProfile, LoginPayload, RegisterPayload } from '../services/authService';

// ─── Types ─────────────────────────────────────────────────────────────────

interface AuthContextValue {
  user:            UserProfile | null;
  isAuthenticated: boolean;
  isLoading:       boolean;
  login:           (payload: LoginPayload)    => Promise<void>;
  register:        (payload: RegisterPayload) => Promise<void>;
  logout:          ()                         => Promise<void>;
}

// ─── Context ───────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = '@sunpower_auth_token';

// ─── Provider ──────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user,      setUser]      = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ── Boot: restore session ───────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        if (token) {
          setAuthToken(token);
          const profile = await authService.me();
          setUser(profile);
        }
      } catch {
        // Token invalid or expired — clear silently
        await AsyncStorage.removeItem(TOKEN_KEY);
        setAuthToken(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // ── Login ───────────────────────────────────────────────────────────────
  const login = useCallback(async (payload: LoginPayload) => {
    const response = await authService.login(payload);
    await AsyncStorage.setItem(TOKEN_KEY, response.token);
    setAuthToken(response.token);
    setUser(response.user);
  }, []);

  // ── Register ────────────────────────────────────────────────────────────
  const register = useCallback(async (payload: RegisterPayload) => {
    // Register only creates the account; user still needs to login
    await authService.register(payload);
  }, []);

  // ── Logout ──────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await authService.logout(); // notify backend (stateless, just good practice)
    } catch {
      // ignore — we always clear client state
    } finally {
      await AsyncStorage.removeItem(TOKEN_KEY);
      setAuthToken(null);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
