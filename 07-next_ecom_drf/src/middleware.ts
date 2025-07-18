import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  console.log("Middleware hit");
  const access_token = request.cookies.get("access")?.value || "";

  if (!access_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();

  // const response = await api.get("/user/info/");
  // console.log("User", response.data);
  // if (response.status == 200) {
  //   const user = response.data;
  //   if (user?.role == "admin") {
  //   }
  // }
  // return NextResponse.redirect(new URL("/"));
};

export const config = {
  matcher: ["/admin/:path*"],
};
