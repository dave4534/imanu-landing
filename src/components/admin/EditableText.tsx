"use client";

import {
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
  const { isAdmin, saveText, showToast } = useAdmin();
  const anchorRef = useRef<HTMLElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editorPosition, setEditorPosition] = useState<EditorPosition | null>(
    null,
  );
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing, editorPosition]);

  function openEditor() {
    const rect = anchorRef.current?.getBoundingClientRect();
    if (!rect) return;

    setEditorPosition({
      top: rect.top,
      left: rect.left,
      width: Math.max(rect.width, 280),
    });
    setDraft(value);
    setError(null);
    setIsEditing(true);
  }

  async function handleSave() {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === value) {
      setIsEditing(false);
      setEditorPosition(null);
      setDraft(value);
      return;
    }

    setIsSaving(true);
    setError(null);
    const result = await saveText(path, trimmed);
    setIsSaving(false);
    if (result) {
      setError(result);
      return;
    }
    setIsEditing(false);
    setEditorPosition(null);
    showToast("Changes saved");
  }

  function closeEditor() {
    setDraft(value);
    setError(null);
    setIsEditing(false);
    setEditorPosition(null);
  }

  if (!isAdmin) {
    return (
      <Component className={className} style={style} dir={dir}>
        {value}
      </Component>
    );
  }

  const editor =
    isEditing && editorPosition
      ? createPortal(
          <div
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
                onBlur={() => void handleSave()}
                onKeyDown={(event) => {
                  if (event.key === "Escape") closeEditor();
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
                onBlur={() => void handleSave()}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    void handleSave();
                  }
                  if (event.key === "Escape") closeEditor();
                }}
                className={editFieldClassName}
                disabled={isSaving}
              />
            )}
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
        {value}
      </Component>
      {editor}
    </>
  );
}
