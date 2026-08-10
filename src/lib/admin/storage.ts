import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { head, put } from "@vercel/blob";
import {
  emptyOverrides,
  type ContentOverrides,
} from "@/lib/admin/types";

const BLOB_OVERRIDES_PATH = "imanu/content-overrides.json";
const LOCAL_OVERRIDES_PATH = path.join(
  process.cwd(),
  "data",
  "content-overrides.json",
);

export async function readOverrides(): Promise<ContentOverrides> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const meta = await head(BLOB_OVERRIDES_PATH);
      const response = await fetch(meta.downloadUrl, {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
        },
      });
      if (response.ok) {
        return normalizeOverrides(await response.json());
      }
    } catch {
      // Blob not created yet — fall through to local file
    }
  }

  try {
    const raw = await readFile(LOCAL_OVERRIDES_PATH, "utf8");
    return normalizeOverrides(JSON.parse(raw));
  } catch {
    return emptyOverrides();
  }
}

export async function writeOverrides(data: ContentOverrides): Promise<void> {
  const payload = JSON.stringify(data, null, 2);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(BLOB_OVERRIDES_PATH, payload, {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Saving is not configured for production. Connect Vercel Blob storage.",
    );
  }

  await mkdir(path.dirname(LOCAL_OVERRIDES_PATH), { recursive: true });
  await writeFile(LOCAL_OVERRIDES_PATH, payload, "utf8");
}

function normalizeOverrides(raw: unknown): ContentOverrides {
  if (!raw || typeof raw !== "object") return emptyOverrides();
  const data = raw as Partial<ContentOverrides>;
  return {
    he: data.he ?? {},
    en: data.en ?? {},
    images: data.images ?? {},
  };
}

export async function saveUploadedImage(
  file: File,
  imageKey: string,
): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext)
    ? ext
    : "jpg";
  const filename = `${imageKey.replace(/\./g, "-")}-${Date.now()}.${safeExt}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`imanu/images/${filename}`, file, {
      access: "public",
      addRandomSuffix: false,
    });
    return blob.url;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Image uploads are not configured for production. Connect Vercel Blob storage.",
    );
  }

  const uploadsDir = path.join(process.cwd(), "public", "images", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, filename), buffer);
  return `/images/uploads/${filename}`;
}
