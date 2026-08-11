import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminSession } from "@/lib/admin/session";
import {
  readOverrides,
  saveUploadedMedia,
  writeOverrides,
} from "@/lib/admin/storage";
import type { ImageKey } from "@/lib/admin/types";
import {
  ALLOWED_MEDIA_TYPES,
  MAX_VIDEO_UPLOAD_BYTES,
  mediaUploadError,
} from "@/lib/media";
import { defaultImages } from "@/config/images";

const validMediaKeys = new Set<string>(Object.keys(defaultImages));

function revalidatePages() {
  revalidatePath("/");
  revalidatePath("/en");
}

async function handleBlobClientUpload(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Client uploads require Vercel Blob storage." },
      { status: 503 },
    );
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "Invalid upload payload." }, { status: 400 });
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        if (!clientPayload) {
          throw new Error("Missing upload metadata.");
        }

        const parsed = JSON.parse(clientPayload) as { imageKey?: string };
        if (!parsed.imageKey || !validMediaKeys.has(parsed.imageKey)) {
          throw new Error("Invalid media key.");
        }

        return {
          allowedContentTypes: [...ALLOWED_MEDIA_TYPES],
          maximumSizeInBytes: MAX_VIDEO_UPLOAD_BYTES,
          tokenPayload: clientPayload,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        if (!tokenPayload) return;

        const parsed = JSON.parse(tokenPayload) as { imageKey?: string };
        if (!parsed.imageKey || !validMediaKeys.has(parsed.imageKey)) return;

        const overrides = await readOverrides();
        overrides.images[parsed.imageKey as ImageKey] = blob.url;
        await writeOverrides(overrides);
        revalidatePages();
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to upload media.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

async function handleServerUpload(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const imageKey = formData.get("imageKey");

  if (!(file instanceof File) || typeof imageKey !== "string") {
    return NextResponse.json(
      { error: "Missing file or imageKey." },
      { status: 400 },
    );
  }

  if (!validMediaKeys.has(imageKey)) {
    return NextResponse.json({ error: "Invalid media key." }, { status: 400 });
  }

  const validationError = mediaUploadError(file);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    const mediaUrl = await saveUploadedMedia(file, imageKey);
    const overrides = await readOverrides();
    overrides.images[imageKey as ImageKey] = mediaUrl;
    await writeOverrides(overrides);
    revalidatePages();
    return NextResponse.json({ ok: true, imageUrl: mediaUrl });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to upload media.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return handleBlobClientUpload(request);
  }

  return handleServerUpload(request);
}
