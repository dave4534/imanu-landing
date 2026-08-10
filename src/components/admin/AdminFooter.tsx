"use client";

import { useAdmin } from "@/components/admin/AdminProvider";

export function AdminFooter() {
  const { isAdmin, isLoading, openLogin, logout } = useAdmin();

  return (
    <footer className="fixed inset-x-0 bottom-0 z-[30] border-t border-black/10 bg-section-hero/95 py-3 text-center text-sm text-text-heading/60 backdrop-blur-sm">
      {isLoading ? (
        <span>Admin</span>
      ) : isAdmin ? (
        <div className="flex items-center justify-center gap-4">
          <span className="text-brand-logo">Edit mode on — click text or images</span>
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
}
