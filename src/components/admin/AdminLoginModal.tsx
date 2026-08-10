"use client";

import { useState, type FormEvent } from "react";
import { useAdmin } from "@/components/admin/AdminProvider";

export function AdminLoginModal() {
  const { showLogin, closeLogin, login } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!showLogin) return null;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const result = await login(password);
    if (result) setError(result);
    setIsSubmitting(false);
    if (!result) setPassword("");
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      onClick={closeLogin}
      role="presentation"
    >
      <div
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-title"
      >
        <h2
          id="admin-login-title"
          className="text-lg font-semibold text-text-heading"
        >
          Admin login
        </h2>
        <p className="mt-2 text-sm text-text-heading/70">
          Enter the password to edit text and images in place.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="admin-password"
              className="mb-1 block text-sm font-medium text-text-heading"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-black/15 px-3 py-2 text-text-heading outline-none focus:border-brand-logo"
              autoComplete="current-password"
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeLogin}
              className="rounded-md px-4 py-2 text-sm text-text-heading hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !password}
              className="rounded-md bg-brand-logo px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
