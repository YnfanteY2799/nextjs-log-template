import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware({ nextUrl, cookies, url }: NextRequest) {
  const cok = cookies.get("tok");

  if (!cok) return NextResponse.redirect(new URL("/login", url));

  try {
    const { payload } = await jwtVerify(cok, "secret");
  } catch (e) {}
}

export const config = {
  matcher: ["/Dboard", "/" /**:path* */],
};
