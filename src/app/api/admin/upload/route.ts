import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/admin/session";
import {
  readOverrides,
  saveUploadedImage,
  writeOverrides,
} from "@/lib/admin/storage";
import type { ImageKey } from "@/lib/admin/types";
import { defaultImages } from "@/config/images";

const validImageKeys = new Set<string>(Object.keys(defaultImages));

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const imageKey = formData.get("imageKey");

  if (!(file instanceof File) || typeof imageKey !== "string") {
    return NextResponse.json({ error: "Missing file or imageKey." }, { status: 400 });
  }

  if (!validImageKeys.has(imageKey)) {
    return NextResponse.json({ error: "Invalid image key." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image." }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Image must be smaller than 10MB." },
      { status: 400 },
    );
  }

  try {
    const imageUrl = await saveUploadedImage(file, imageKey);
    const overrides = await readOverrides();
    overrides.images[imageKey as ImageKey] = imageUrl;
    await writeOverrides(overrides);
    return NextResponse.json({ ok: true, imageUrl });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to upload image.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
