"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAdmin } from "@/components/admin/AdminProvider";

export function AdminFooter() {
  const { isAdmin, isLoading, openLogin, logout } = useAdmin();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.classList.add("has-admin-footer");
    return () => {
      document.body.classList.remove("has-admin-footer");
    };
  }, []);

  const footer = (
    <footer className="admin-footer-bar border-t border-black/10 bg-section-hero/95 py-3 text-center text-sm text-text-heading/60 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm">
      {isLoading ? (
        <span>Admin</span>
      ) : isAdmin ? (
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4">
          <span className="text-brand-logo">
            Edit mode on — click text or images
          </span>
          <button
            type="button"
            onClick={() => void logout()}
            className="underline hover:text-text-heading"
          >
            Exit Edit mode
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={openLogin}
          className="underline hover:text-text-heading"
        >
          Admin
        </button>
      )}
    </footer>
  );

  if (!mounted) return footer;

  return createPortal(footer, document.body);
}
