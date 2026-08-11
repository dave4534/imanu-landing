"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface LogoLinkProps {
  href: string;
  ariaLabel: string;
  className?: string;
  children: ReactNode;
}

function isSamePage(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function LogoLink({
  href,
  ariaLabel,
  className,
  children,
}: LogoLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={className}
      onClick={(event) => {
        if (!isSamePage(pathname, href)) return;

        event.preventDefault();
        window.history.replaceState(null, "", href);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {children}
    </Link>
  );
}
