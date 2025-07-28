import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const middleware = async (request: NextRequest) => {
  const res = NextResponse.next();
  const access_token = request.cookies.get("access")?.value || "";
  const refresh_token = request.cookies.get("refresh")?.value || "";

  if (!refresh_token || !access_token) {
    console.log("No token in middleware. Redirecting from middleware");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decoded_user = jwt.decode(access_token);
  console.log("Decoded user", decoded_user);
  if (!decoded_user) {
    console.log("No access token in middleware. Redirecting from middleware");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (decoded_user.exp < Date.now()) {
    const response = await fetch(`${API_URL}/user/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refresh_token }),
    });
    const resJson = await response.json();
    const new_access_token = resJson.access;

    res.cookies.set("access", new_access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
  }

  return res;
};

export const config = {
  matcher: ["/admin/:path*", "/my-orders/:path*"],
};
