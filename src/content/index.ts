import type { Locale } from "@/lib/i18n";
import type { SiteContent } from "./types";
import { en } from "./en";
import { he } from "./he";
import { applyPathOverrides } from "@/lib/admin/paths";
import { readOverrides } from "@/lib/admin/storage";
import { resolveImages } from "@/config/images";
import type { ImageKey } from "@/lib/admin/types";

const contentByLocale: Record<Locale, SiteContent> = { he, en };

export async function getContent(locale: Locale): Promise<SiteContent> {
  const overrides = await readOverrides();
  return applyPathOverrides(contentByLocale[locale], overrides[locale]);
}

export async function getPageImages(): Promise<Record<ImageKey, string>> {
  const overrides = await readOverrides();
  return resolveImages(overrides.images);
}

export type { SiteContent, ServiceItem } from "./types";
