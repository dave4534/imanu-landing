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
import type { ContentOverrides } from "@/lib/admin/types";
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
  getTextValue: (path: string, fallback: string) => string;
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
  const [textOverrides, setTextOverrides] = useState<Record<string, string>>(
    {},
  );

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

  const loadOverrides = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/overrides", {
        cache: "no-store",
      });
      if (!response.ok) return;
      const data = (await response.json()) as ContentOverrides;
      setTextOverrides(data[locale] ?? {});
    } catch {
      // Keep existing optimistic overrides if refresh fails.
    }
  }, [locale]);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    if (!isAdmin) {
      setTextOverrides({});
      return;
    }
    void loadOverrides();
  }, [isAdmin, loadOverrides]);

  const getTextValue = useCallback(
    (path: string, fallback: string) => textOverrides[path] ?? fallback,
    [textOverrides],
  );

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
      await loadOverrides();
      router.refresh();
      return null;
    },
    [loadOverrides, router],
  );

  const logout = useCallback(async () => {
    await fetch("/api/admin/session", { method: "DELETE" });
    setIsAdmin(false);
    setTextOverrides({});
    router.refresh();
  }, [router]);

  const saveText = useCallback(
    async (path: string, value: string) => {
      setTextOverrides((current) => ({ ...current, [path]: value }));

      try {
        const response = await fetch("/api/admin/overrides", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale, path, value }),
        });

        let data: { error?: string; overrides?: ContentOverrides } = {};
        try {
          data = (await response.json()) as {
            error?: string;
            overrides?: ContentOverrides;
          };
        } catch {
          if (!response.ok) {
            setTextOverrides((current) => {
              const next = { ...current };
              delete next[path];
              return next;
            });
            return "Save failed. The server returned an unexpected response.";
          }
        }

        if (!response.ok) {
          setTextOverrides((current) => {
            const next = { ...current };
            delete next[path];
            return next;
          });
          return data.error ?? "Save failed.";
        }

        if (data.overrides?.[locale]) {
          setTextOverrides(data.overrides[locale]);
        }

        router.refresh();
        return null;
      } catch {
        setTextOverrides((current) => {
          const next = { ...current };
          delete next[path];
          return next;
        });
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
      getTextValue,
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
      getTextValue,
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
