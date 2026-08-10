"use client";

import type { CSSProperties } from "react";
import { EditableText } from "@/components/admin/EditableText";
import { useAdmin } from "@/components/admin/AdminProvider";
import { getDirection, type Locale } from "@/lib/i18n";

interface EditableNavLinkProps {
  href: string;
  path: string;
  value: string;
  locale: Locale;
  className?: string;
  style?: CSSProperties;
  external?: boolean;
  onNavigate?: () => void;
}

export function EditableNavLink({
  href,
  path,
  value,
  locale,
  className,
  style,
  external = false,
  onNavigate,
}: EditableNavLinkProps) {
  const { isAdmin } = useAdmin();
  const dir = getDirection(locale);

  if (isAdmin) {
    return (
      <span className={className} style={style}>
        <EditableText path={path} value={value} as="span" dir={dir} />
      </span>
    );
  }

  return (
    <a
      href={href}
      className={className}
      style={style}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onNavigate}
    >
      {value}
    </a>
  );
}
