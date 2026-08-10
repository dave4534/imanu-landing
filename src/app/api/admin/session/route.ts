import { NextResponse } from "next/server";
import {
  isAdminSession,
  setAdminSession,
  verifyPassword,
} from "@/lib/admin/session";

export async function GET() {
  const authenticated = await isAdminSession();
  return NextResponse.json({ authenticated });
}

export async function POST(request: Request) {
  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const { clearAdminSession } = await import("@/lib/admin/session");
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
