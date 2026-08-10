"use client";

import { useEffect, useState } from "react";

interface AdminToastProps {
  message: string | null;
  onClear: () => void;
}

export function AdminToast({ message, onClear }: AdminToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    setVisible(true);
    const hideTimer = window.setTimeout(() => setVisible(false), 2200);
    const clearTimer = window.setTimeout(onClear, 2600);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(clearTimer);
    };
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-16 left-1/2 z-[110] -translate-x-1/2 rounded-full bg-text-heading px-5 py-2.5 text-sm text-white shadow-lg transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
