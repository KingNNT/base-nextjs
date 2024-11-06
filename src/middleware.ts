import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { LocaleSupport } from "./enums";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const pathArr = path.split("/");

  const redirectToHome = (oldPath: URL) => {
    if (pathArr.length === 3 && pathArr[2] === "") {
      const url = oldPath + "home";
      return NextResponse.redirect(url);
    }
    return NextResponse.redirect(oldPath);
  };

  const isPathLanguageSupport = Object.keys(LocaleSupport).some(
    (i) => i === pathArr[1],
  );
  if (isPathLanguageSupport) {
    return NextResponse.next();
  }
  const currentLanguage = "en";
  pathArr.splice(1, 0, currentLanguage);
  const newPath = pathArr.join("/");
  const newURL = new URL(newPath, request.nextUrl.origin);
  return redirectToHome(newURL);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - [locale] (correct URL)
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    `/`,
    `/((?!api|en|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)`,
  ],
};
