"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { ImageKey } from "@/lib/admin/types";
import { useAdmin } from "@/components/admin/AdminProvider";

interface EditableImageProps {
  imageKey: ImageKey;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function EditableImage({
  imageKey,
  className = "",
  style,
  children,
}: EditableImageProps) {
  const { isAdmin, uploadImage, showToast } = useAdmin();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setIsUploading(true);
    setError(null);
    const result = await uploadImage(imageKey, file);
    setIsUploading(false);
    if (result) {
      setError(result);
      return;
    }
    showToast("Changes saved");
  }

  const needsRelative =
    isAdmin && !/\b(absolute|relative|fixed|sticky)\b/.test(className);

  return (
    <div
      className={`${needsRelative ? "relative " : ""}${className}`}
      style={style}
    >
      {children}
      {isAdmin && (
        <>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            aria-label="Replace image"
            className="absolute inset-0 z-10 flex items-end justify-center bg-black/0 pb-3 opacity-0 transition hover:bg-black/30 hover:opacity-100 focus-visible:bg-black/30 focus-visible:opacity-100"
          >
            <span className="rounded-full bg-brand-logo px-4 py-2 text-sm text-white shadow">
              {isUploading ? "Uploading…" : "Replace image"}
            </span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => void handleFileChange(event)}
          />
          {error && (
            <p className="absolute bottom-0 left-0 right-0 z-20 bg-red-600 px-2 py-1 text-center text-xs text-white">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
}
