import type { Locale } from "@/lib/i18n";

export type ImageKey =
  | "hero"
  | "intro"
  | "about"
  | "contact"
  | "services.0"
  | "services.1"
  | "services.2"
  | "services.3";

/** Flat path → value overrides per locale, plus shared image URLs */
export interface ContentOverrides {
  he: Record<string, string>;
  en: Record<string, string>;
  images: Partial<Record<ImageKey, string>>;
}

export const emptyOverrides = (): ContentOverrides => ({
  he: {},
  en: {},
  images: {},
});

export type LocaleOverrides = Record<Locale, Record<string, string>>;
