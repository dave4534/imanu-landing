/**
 * Site color palette — single source of truth.
 *
 * Edit values here to change colors site-wide. Each key maps to a CSS custom
 * property injected on :root (see ThemeStyles in components/ThemeStyles.tsx).
 *
 * v2 admin WYSIWYG will read/write this same structure.
 */
export const theme = {
  brand: {
    logo: "#DA186A",
  },
  text: {
    nav: "#58213f",
    heading: "#285e56",
    onYellow: "#285e56",
    onPink: "#fff86a",
    onGreen: "#fff86a",
  },
  section: {
    hero: "#ffffff",
    intro: "#d0b6a9",
    about: "#e59497",
    services: "#2c6961",
    testimonials: "#edcb4b",
    contact: "#e59497",
  },
  accent: {
    button: "#fff86a",
    cardYellow: "#edcb4b",
    cardPink: "#e59497",
  },
} as const;

export type Theme = typeof theme;

/** Flat map of CSS variable names → hex values */
export function themeToCssVariables(
  colors: Theme = theme,
): Record<string, string> {
  return {
    "--theme-brand-logo": colors.brand.logo,
    "--theme-text-nav": colors.text.nav,
    "--theme-text-heading": colors.text.heading,
    "--theme-text-on-yellow": colors.text.onYellow,
    "--theme-text-on-pink": colors.text.onPink,
    "--theme-text-on-green": colors.text.onGreen,
    "--theme-section-hero": colors.section.hero,
    "--theme-section-intro": colors.section.intro,
    "--theme-section-about": colors.section.about,
    "--theme-section-services": colors.section.services,
    "--theme-section-testimonials": colors.section.testimonials,
    "--theme-section-contact": colors.section.contact,
    "--theme-accent-button": colors.accent.button,
    "--theme-accent-card-yellow": colors.accent.cardYellow,
    "--theme-accent-card-pink": colors.accent.cardPink,
  };
}
