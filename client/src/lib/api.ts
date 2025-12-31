import { useAuthStore } from "../store/authStore";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

export type ApiError = Error & {
  status?: number;
  zodErrors?: { message: string; path?: (string | number)[] }[];
};

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  authRequired = false
): Promise<T> {
  const { token, clearAuth } = useAuthStore.getState();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (authRequired && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401 && authRequired) {
    clearAuth();
  }

  if (!res.ok) {
    let data: any = null;
    try {
      data = await res.json();
    } catch {
      // ignore
    }

    const err: ApiError = Object.assign(
      new Error(data?.message || `Request failed with status ${res.status}`),
      {
        status: res.status,
        zodErrors: Array.isArray(data?.errors) ? data.errors : undefined,
      }
    );
    throw err;
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}
