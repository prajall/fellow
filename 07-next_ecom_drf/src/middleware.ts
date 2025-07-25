import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const access_token = request.cookies.get("access")?.value || "";

  if (!access_token) {
    console.log("No access token in middleware. Redirecting from middleware");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  await fetch("http://localhost:8000/user/info/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => console.log("User response in middleware", res.json()));

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*"],
};
