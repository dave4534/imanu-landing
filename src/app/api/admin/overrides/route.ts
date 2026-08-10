import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { isAdminSession } from "@/lib/admin/session";
import { readOverrides, writeOverrides } from "@/lib/admin/storage";
import type { ImageKey } from "@/lib/admin/types";

interface PatchBody {
  locale?: Locale;
  path?: string;
  value?: string;
  imageKey?: ImageKey;
  imageUrl?: string;
}

export async function GET() {
  const overrides = await readOverrides();
  return NextResponse.json(overrides);
}

export async function PATCH(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: PatchBody;
  try {
    body = (await request.json()) as PatchBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const overrides = await readOverrides();

  if (body.imageKey && typeof body.imageUrl === "string") {
    overrides.images[body.imageKey] = body.imageUrl;
    try {
      await writeOverrides(overrides);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save changes.";
      return NextResponse.json({ error: message }, { status: 503 });
    }
    revalidatePath("/he");
    revalidatePath("/en");
    return NextResponse.json({ ok: true, overrides });
  }

  if (
    body.locale &&
    isLocale(body.locale) &&
    typeof body.path === "string" &&
    typeof body.value === "string"
  ) {
    overrides[body.locale][body.path] = body.value;
    try {
      await writeOverrides(overrides);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save changes.";
      return NextResponse.json({ error: message }, { status: 503 });
    }
    revalidatePath("/he");
    revalidatePath("/en");
    return NextResponse.json({ ok: true, overrides });
  }

  return NextResponse.json({ error: "Invalid update payload." }, { status: 400 });
}
