import type { Locale } from "@/lib/i18n";
import type { SiteContent } from "./types";
import { en } from "./en";
import { he } from "./he";

const contentByLocale: Record<Locale, SiteContent> = { he, en };

export function getContent(locale: Locale): SiteContent {
  return contentByLocale[locale];
}

export type { SiteContent, ServiceItem } from "./types";
