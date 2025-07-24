import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const refreshToken = body.refresh;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "No refresh token provided" },
        { status: 400 }
      );
    }

    const backendResponse = await fetch(
      "http://localhost:8000/user/token/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    const data = await backendResponse.json();

    if (backendResponse.status !== 200) {
      return NextResponse.json(
        { error: "Failed to refresh token" },
        { status: backendResponse.status }
      );
    }

    const accessToken = data.access;

    console.log("Fetched new access token", accessToken);

    const response = NextResponse.json({ message: "Token refreshed" });

    response.cookies.set("access", accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Refresh API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
