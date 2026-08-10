import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Legacy Hebrew URLs → clean root
  if (pathname === "/he" || pathname.startsWith("/he/")) {
    const newPath = pathname === "/he" ? "/" : pathname.slice(3) || "/";
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  const pathnameHasLocale = locales.some(
    (locale) =>
      locale !== defaultLocale &&
      (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`),
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Serve Hebrew at `/` without showing `/he` in the URL
  if (pathname === "/") {
    return NextResponse.rewrite(new URL(`/${defaultLocale}`, request.url));
  }

  const segment = pathname.split("/")[1];
  if (segment && !isLocale(segment)) {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|icons|images|.*\\..*).*)"],
};
