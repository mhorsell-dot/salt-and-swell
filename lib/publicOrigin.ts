import { NextRequest, NextResponse } from "next/server";

export function getPublicOrigin(request: NextRequest): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");

  const forwardedProtocol = request.headers.get("x-forwarded-proto");

  const protocol =
    forwardedProtocol ??
    (host?.includes("localhost") || host?.startsWith("127.0.0.1") ? "http" : "https");

  if (!host) {
    return request.nextUrl.origin;
  }

  return `${protocol}://${host}`;
}

export function redirectTo(request: NextRequest, pathname: string): NextResponse {
  return NextResponse.redirect(new URL(pathname, getPublicOrigin(request)), 303);
}
