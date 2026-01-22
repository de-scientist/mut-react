import React from "react";

export type AuthStore = {
  email: string | null;
  clearAuth: () => void;
};

export const useAuthStore = (): AuthStore => {
  const [email, setEmail] = React.useState<string | null>(() => {
    try {
      return localStorage.getItem("email");
    } catch {
      return null;
    }
  });

  const clearAuth = React.useCallback(() => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    } catch {}
    setEmail(null);
  }, []);

  return { email, clearAuth };
};
