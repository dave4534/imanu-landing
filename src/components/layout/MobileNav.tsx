"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { SiteContent } from "@/content";
import { figma } from "@/config/figma-layout";
import { siteConfig } from "@/config/site";
import { getDirection, type Locale } from "@/lib/i18n";
import { EditableNavLink } from "@/components/admin/EditableNavLink";

/** Matches Header mobile row minHeight (logo + padding) */
export const MOBILE_HEADER_HEIGHT = figma.header.logo.height + 20;

interface MobileNavProps {
  locale: Locale;
  content: SiteContent;
}

export function MobileNav({ locale, content }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const dir = getDirection(locale);

  const navItems = useMemo(
    () => [
      {
        href: "#about",
        path: "nav.about",
        label: content.nav.about,
        external: false,
      },
      {
        href: "#services",
        path: "nav.services",
        label: content.nav.services,
        external: false,
      },
      {
        href: siteConfig.instagramUrl,
        path: "nav.instagram",
        label: content.nav.instagram,
        external: true,
      },
      {
        href: "#contact",
        path: "nav.contact",
        label: content.nav.contact,
        external: false,
      },
    ],
    [content.nav],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setAnimateIn(false);
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => setAnimateIn(true));
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setAnimateIn(false);
    window.setTimeout(() => setOpen(false), 300);
  }

  function toggleMenu() {
    if (open) closeMenu();
    else setOpen(true);
  }

  const menu =
    open && mounted
      ? createPortal(
          <nav
            className="fixed inset-x-0 bottom-0 z-[40] flex w-full flex-col bg-section-hero px-8 pb-12"
            dir={dir}
            aria-label="Mobile navigation"
            style={{ top: MOBILE_HEADER_HEIGHT }}
          >
            <div className="flex flex-1 flex-col justify-center gap-10 pt-4">
              {navItems.map((item, index) => (
                <EditableNavLink
                  key={item.path}
                  href={item.href}
                  path={item.path}
                  value={item.label}
                  locale={locale}
                  external={item.external}
                  onNavigate={closeMenu}
                  className="block whitespace-nowrap text-[32px] leading-tight text-text-nav transition-opacity duration-500 ease-out"
                  style={{
                    opacity: animateIn ? 1 : 0,
                    transitionDelay: animateIn ? `${120 + index * 80}ms` : "0ms",
                  }}
                />
              ))}
            </div>
          </nav>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={toggleMenu}
        className="relative flex h-10 w-10 items-center justify-center"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span
          className={`absolute block h-0.5 w-6 bg-text-nav transition-all duration-300 ease-out ${
            open ? "translate-y-0 rotate-45" : "-translate-y-[7px]"
          }`}
        />
        <span
          className={`absolute block h-0.5 w-6 bg-text-nav transition-all duration-300 ease-out ${
            open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
          }`}
        />
        <span
          className={`absolute block h-0.5 w-6 bg-text-nav transition-all duration-300 ease-out ${
            open ? "translate-y-0 -rotate-45" : "translate-y-[7px]"
          }`}
        />
      </button>
      {menu}
    </>
  );
}
