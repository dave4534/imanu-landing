import type { ImageKey } from "@/lib/admin/types";

export const defaultImages: Record<ImageKey, string> = {
  hero: "/images/PXL_20251129_113001863.MP.jpg",
  intro: "/images/PXL_20251129_112701842.jpg",
  about: "/images/about.png",
  contact: "/images/PXL_20250709_190438676.jpg",
  "services.0": "/images/PXL_20250709_190438676.jpg",
  "services.1": "/images/PXL_20251129_112701842.jpg",
  "services.2": "/images/about.png",
  "services.3": "/images/PXL_20251129_113001863.MP.jpg",
};

export function resolveImages(
  overrides: Partial<Record<ImageKey, string>> = {},
): Record<ImageKey, string> {
  return { ...defaultImages, ...overrides };
}
