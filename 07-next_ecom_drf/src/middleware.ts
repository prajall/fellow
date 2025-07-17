import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  console.log("Middleware hit");
  const access_token = request.cookies.get("access")?.value || "";
  const { pathname } = request.nextUrl;

  console.log(request.nextUrl);

  if (pathname.startsWith("/admin") && !access_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*"],
};
