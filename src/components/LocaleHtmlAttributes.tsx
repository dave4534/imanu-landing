"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { defaultLocale, getDirection, isLocale } from "@/lib/i18n";

/** Syncs html lang and dir attributes from the URL locale segment */
export function LocaleHtmlAttributes() {
  const pathname = usePathname();

  useEffect(() => {
    const segment = pathname.split("/")[1] ?? defaultLocale;
    const locale = isLocale(segment) ? segment : defaultLocale;
    document.documentElement.lang = locale;
    document.documentElement.dir = getDirection(locale);
  }, [pathname]);

  return null;
}
