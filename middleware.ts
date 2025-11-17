import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/profile"];
const authRoutes = ["/login", "/register", "forgot-password", "reset-password"];

export default auth((req) => {
  const { nextUrl } = req;
  const path = nextUrl.pathname;
  const isLogin = !!req.auth;

  if (protectedRoutes.includes(path) && !isLogin) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (authRoutes.includes(path) && isLogin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
