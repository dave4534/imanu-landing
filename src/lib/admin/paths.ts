import type { SiteContent } from "@/content/types";

/** Apply flat dot-path overrides onto a content object */
export function applyPathOverrides(
  content: SiteContent,
  overrides: Record<string, string>,
): SiteContent {
  if (Object.keys(overrides).length === 0) return content;

  const next = structuredClone(content);
  for (const [path, value] of Object.entries(overrides)) {
    setByPath(next as unknown as Record<string, unknown>, path, value);
  }
  return next;
}

function setByPath(
  obj: Record<string, unknown>,
  path: string,
  value: string,
): void {
  const keys = path.split(".");
  let current: Record<string, unknown> = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const next = current[key];

    if (next === undefined || next === null) {
      const index = Number(key);
      if (Array.isArray(current) && !Number.isNaN(index)) {
        if (!current[index] || typeof current[index] !== "object") {
          current[index] = {};
        }
        current = current[index] as Record<string, unknown>;
        continue;
      }
      current[key] = {};
      current = current[key] as Record<string, unknown>;
      continue;
    }

    if (typeof next === "object") {
      current = next as Record<string, unknown>;
    }
  }

  const lastKey = keys[keys.length - 1];
  const lastIndex = Number(lastKey);
  if (Array.isArray(current) && !Number.isNaN(lastIndex)) {
    current[lastIndex] = value;
    return;
  }
  current[lastKey] = value;
}
