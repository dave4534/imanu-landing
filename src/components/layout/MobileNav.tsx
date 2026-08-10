"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/content";
import { figma } from "@/config/figma-layout";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n";

interface MobileNavProps {
  locale: Locale;
  content: SiteContent;
}

export function MobileNav({ locale, content }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass =
    "block whitespace-nowrap transition-opacity hover:opacity-70";

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex flex-col justify-center gap-1.5 p-2"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <span className="block h-0.5 w-6 bg-text-nav" />
        <span className="block h-0.5 w-6 bg-text-nav" />
        <span className="block h-0.5 w-6 bg-text-nav" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav
            className="absolute start-0 top-0 flex h-full w-[min(100%,320px)] flex-col gap-6 bg-section-hero p-6 shadow-lg"
            style={{ fontSize: figma.header.fontSize }}
          >
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 text-2xl leading-none text-text-nav"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>
            <a
              href="#contact"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {content.nav.contact}
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {content.nav.instagram}
            </a>
            <a
              href="#about"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {content.nav.about}
            </a>
            <a
              href="#services"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {content.nav.services}
            </a>
            <Link
              href={`/${locale}`}
              className="mt-auto"
              onClick={() => setOpen(false)}
              aria-label={siteConfig.siteName}
            >
              Imanu
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
