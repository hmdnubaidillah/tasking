import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  let cookie = req.cookies.get("token");

  if (cookie?.name === "token") {
    return NextResponse.rewrite(new URL("/", req.url));
  } else {
    return NextResponse.rewrite(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/", "/login"],
};
