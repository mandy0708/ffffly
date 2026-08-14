import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Lets a link force the theme: /?theme=dark (or ?theme=light). The value is
// written to the `theme` cookie both on the incoming request (so this render
// already picks the right colors, see app/layout.tsx) and on the response (so
// later navigations keep it). Without the param, nothing changes.
export function proxy(request: NextRequest) {
  const theme = request.nextUrl.searchParams.get("theme");
  if (theme !== "dark" && theme !== "light") return NextResponse.next();

  request.cookies.set("theme", theme);
  const response = NextResponse.next({ request });
  response.cookies.set("theme", theme, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  // Page routes only — skip _next internals and static files.
  matcher: ["/((?!_next|.*\\..*).*)"],
};
