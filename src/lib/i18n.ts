export const locales = ["he", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "he";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "he" ? "rtl" : "ltr";
}

/** Text + flex alignment that follows locale direction */
export function localeTextProps(locale: Locale) {
  return {
    dir: getDirection(locale),
    className: "text-start",
  } as const;
}

/** CTA button stacks sit on the visual right in both locales */
export function localeCtaStackClass(locale: Locale): string {
  return locale === "he" ? "items-start" : "items-end";
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "he" ? "en" : "he";
}
