"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { AdminProvider } from "@/components/admin/AdminProvider";
import { AdminFooter } from "@/components/admin/AdminFooter";
import { AdminLoginModal } from "@/components/admin/AdminLoginModal";

interface AdminShellProps {
  locale: Locale;
  children: ReactNode;
}

export function AdminShell({ locale, children }: AdminShellProps) {
  return (
    <AdminProvider locale={locale}>
      {children}
      <AdminFooter />
      <AdminLoginModal />
    </AdminProvider>
  );
}
