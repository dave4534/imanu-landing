/**
 * Layout proportions from Figma frame "Imanu website" (1440px wide).
 * Values are in px at design width unless noted as ratio.
 */
export const figma = {
  canvasWidth: 1440,

  header: {
    fontSize: 16,
    navGap: 60,
    logo: { width: 95, height: 47 },
    paddingY: 41,
  },

  hero: {
    height: 863,
    titleSize: 60,
    titleLineHeight: 121,
    subtitleSize: 50,
    subtitleLineHeight: 61,
    textBlock: { width: 471, insetBottom: 212, insetEnd: 122 },
  },

  intro: {
    height: 863,
    beigeWidth: 783,
    imageWidth: 658,
    titleSize: 60,
    subtitleSize: 32,
    textBlock: { width: 522, insetStart: 208 },
    button: { height: 48, paddingX: 24, fontSize: 16, iconSize: 36, gap: 8 },
  },

  about: {
    height: 952,
    image: { width: 672, height: 738, insetStart: 111, insetTop: 107 },
    titleSize: 80,
    bodySize: 26,
    textBlock: { insetStart: 887, width: 458 },
    titleInsetTop: 167,
    bodyInsetTop: 324,
  },

  services: {
    sectionHeight: 4057,
    image: { width: 704, insetStart: 86 },
    card: { width: 600, insetStart: 742 },
    cardHeights: [587, 469, 414, 463] as const,
    imageHeights: [768, 701, 701, 701] as const,
    cardOffsets: [204, 1206, 2183, 3183] as const,
    titleSize: 50,
    bodySize: 30,
    bodyWidth: 326,
  },

  testimonials: {
    height: 734,
    illustration: { width: 202, height: 217, centerX: 662 + 101 },
    text: { width: 891, fontSize: 26, gap: 42, insetTop: 295 },
  },

  contact: {
    height: 979,
    image: { width: 538, height: 540, insetStart: 138, insetTop: 220 },
    titleSize: 50,
    subtitleSize: 32,
    bodySize: 32,
    textWidth: 475,
  },
} as const;

/** Scale a Figma px value relative to canvas width */
export function figmaPx(value: number, viewport = figma.canvasWidth): string {
  return `${(value / viewport) * 100}vw`;
}

/** Max-width container matching Figma canvas */
export const containerClass = "mx-auto w-full max-w-[1440px]";
