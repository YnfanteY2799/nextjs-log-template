import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export async function middleware({ nextUrl, cookies, url }: NextRequest) {
  const cok = cookies.get("tok");

  if (!cok) return NextResponse.redirect(new URL("/login", url));

  console.log("Cookie is : ", cok);
  try {
    const { payload } = await jwtVerify(cok, "secret");
  } catch (e) {}
}

export const config = {
  matcher: ["/Dboard", "/" /**:path* */],
};
