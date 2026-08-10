"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { AdminToast } from "@/components/admin/AdminToast";

interface AdminContextValue {
  locale: Locale;
  isAdmin: boolean;
  isLoading: boolean;
  showLogin: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  login: (password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  saveText: (path: string, value: string) => Promise<string | null>;
  uploadImage: (imageKey: string, file: File) => Promise<string | null>;
  showToast: (message: string) => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  const clearToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  const refreshSession = useCallback(async () => {
    const response = await fetch("/api/admin/session");
    const data = (await response.json()) as { authenticated: boolean };
    setIsAdmin(Boolean(data.authenticated));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const login = useCallback(
    async (password: string) => {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) return data.error ?? "Login failed.";
      setIsAdmin(true);
      setShowLogin(false);
      router.refresh();
      return null;
    },
    [router],
  );

  const logout = useCallback(async () => {
    await fetch("/api/admin/session", { method: "DELETE" });
    setIsAdmin(false);
    router.refresh();
  }, [router]);

  const saveText = useCallback(
    async (path: string, value: string) => {
      try {
        const response = await fetch("/api/admin/overrides", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale, path, value }),
        });

        let data: { error?: string } = {};
        try {
          data = (await response.json()) as { error?: string };
        } catch {
          if (!response.ok) {
            return "Save failed. The server returned an unexpected response.";
          }
        }

        if (!response.ok) return data.error ?? "Save failed.";
        router.refresh();
        return null;
      } catch {
        return "Save failed. Check your connection and try again.";
      }
    },
    [locale, router],
  );

  const uploadImage = useCallback(
    async (imageKey: string, file: File) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("imageKey", imageKey);

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        let data: { error?: string } = {};
        try {
          data = (await response.json()) as { error?: string };
        } catch {
          if (!response.ok) {
            return "Upload failed. The server returned an unexpected response.";
          }
        }

        if (!response.ok) return data.error ?? "Upload failed.";
        router.refresh();
        return null;
      } catch {
        return "Upload failed. Check your connection and try again.";
      }
    },
    [router],
  );

  const value = useMemo(
    () => ({
      locale,
      isAdmin,
      isLoading,
      showLogin,
      openLogin: () => setShowLogin(true),
      closeLogin: () => setShowLogin(false),
      login,
      logout,
      saveText,
      uploadImage,
      showToast,
    }),
    [
      locale,
      isAdmin,
      isLoading,
      showLogin,
      login,
      logout,
      saveText,
      uploadImage,
      showToast,
    ],
  );

  return (
    <AdminContext.Provider value={value}>
      {children}
      <AdminToast message={toastMessage} onClear={clearToast} />
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
