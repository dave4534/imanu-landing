import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "imanu_admin";

/** Built-in admin password — override with ADMIN_PASSWORD env var if needed */
const DEFAULT_ADMIN_PASSWORD = "pitz";
const DEFAULT_SESSION_SECRET = "imanu-admin-session-v1";

function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? DEFAULT_SESSION_SECRET;
}

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD;
}

export function isAdminConfigured(): boolean {
  return true;
}

function createSessionToken(): string {
  return createHmac("sha256", getSessionSecret())
    .update(getAdminPassword())
    .digest("hex");
}

export function verifyPassword(password: string): boolean {
  const expected = Buffer.from(getAdminPassword());
  const received = Buffer.from(password);
  if (expected.length !== received.length) return false;
  return timingSafeEqual(expected, received);
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const expected = createSessionToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
