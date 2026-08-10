"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
} from "react";
import { createPortal } from "react-dom";
import { useAdmin } from "@/components/admin/AdminProvider";

interface EditableTextProps {
  path: string;
  value: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  dir?: "rtl" | "ltr";
  multiline?: boolean;
}

const adminHighlightClass =
  "cursor-pointer outline-2 outline-transparent outline-offset-2 hover:outline-brand-logo/60";

const editFieldClassName =
  "w-full rounded border-2 border-brand-logo bg-white p-2 text-base font-normal leading-normal text-neutral-900 shadow-lg outline-none";

interface EditorPosition {
  top: number;
  left: number;
  width: number;
}

export function EditableText({
  path,
  value,
  as: Component = "span",
  className,
  style,
  dir,
  multiline = false,
}: EditableTextProps) {
  const { isAdmin, saveText, showToast, getTextValue } = useAdmin();
  const anchorRef = useRef<HTMLElement | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const resolvedValue = getTextValue(path, value);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(resolvedValue);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editorPosition, setEditorPosition] = useState<EditorPosition | null>(
    null,
  );
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) setDraft(resolvedValue);
  }, [isEditing, resolvedValue]);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing, editorPosition]);

  const closeEditor = useCallback(() => {
    setDraft(resolvedValue);
    setError(null);
    setIsEditing(false);
    setEditorPosition(null);
  }, [resolvedValue]);

  const handleSave = useCallback(async () => {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === resolvedValue) {
      closeEditor();
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      const result = await saveText(path, trimmed);
      if (result) {
        setError(result);
        showToast(result);
        closeEditor();
        return;
      }
      closeEditor();
      showToast("Changes saved");
    } finally {
      setIsSaving(false);
    }
  }, [closeEditor, draft, path, resolvedValue, saveText, showToast]);

  function openEditor() {
    const rect = anchorRef.current?.getBoundingClientRect();
    if (!rect) return;

    setEditorPosition({
      top: rect.top,
      left: rect.left,
      width: Math.max(rect.width, 280),
    });
    setDraft(resolvedValue);
    setError(null);
    setIsEditing(true);
  }

  useEffect(() => {
    if (!isEditing) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (editorRef.current?.contains(target)) return;
      void handleSave();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeEditor();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeEditor, handleSave, isEditing]);

  if (!isAdmin) {
    return (
      <Component className={className} style={style} dir={dir}>
        {resolvedValue}
      </Component>
    );
  }

  const editor =
    isEditing && editorPosition
      ? createPortal(
          <div
            ref={editorRef}
            className="fixed z-[120]"
            style={{
              top: editorPosition.top,
              left: editorPosition.left,
              width: editorPosition.width,
            }}
            dir={dir}
          >
            {multiline ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    closeEditor();
                  }
                }}
                className={editFieldClassName}
                rows={Math.min(8, Math.max(3, draft.split("\n").length + 1))}
                disabled={isSaving}
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    void handleSave();
                  }
                  if (event.key === "Escape") {
                    event.preventDefault();
                    closeEditor();
                  }
                }}
                className={editFieldClassName}
                disabled={isSaving}
              />
            )}
            <div className="mt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeEditor}
                disabled={isSaving}
                className="rounded border border-neutral-300 bg-white px-3 py-1 text-sm text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={isSaving}
                className="rounded bg-brand-logo px-3 py-1 text-sm text-white hover:opacity-90 disabled:opacity-50"
              >
                {isSaving ? "Saving…" : "Done"}
              </button>
            </div>
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <Component
        ref={anchorRef as never}
        className={`${className ?? ""} ${adminHighlightClass}`}
        style={style}
        dir={dir}
        onClick={openEditor}
        title="Click to edit"
      >
        {resolvedValue}
      </Component>
      {editor}
    </>
  );
}
