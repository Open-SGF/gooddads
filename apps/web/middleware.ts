import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";
import { ProtectedRoutes } from "./utils/types";
import { Roles } from "./utils/enums";

export async function middleware(request: NextRequest) {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createClient(request);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    console.log(request.cookies);

    if (!session && !request.url.includes("/login")) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else if (session && request.url.includes("/login")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (session) {
      const routes: ProtectedRoutes = {
        DAD: ["/", "/dashboard/dad"],
        ADMIN: ["/", "/dashbaord/admin"],
        INTAKE: ["/", "/dashboard/intake"],
      };

      const { pathname } = request.nextUrl;

      if (pathname === "/403") return;

      const userRole = session?.user.app_metadata?.userrole as Roles;

      if (!userRole) return NextResponse.redirect(new URL("/", request.url));

      if (!routes[userRole].includes(pathname))
        return NextResponse.redirect(new URL("/403", request.url));
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  // Runs middleware on everything that isn't an api or static file
  matcher: [
    /* Match all paths except for:
       1. /api routes
       2. /_next (Next.js internals)
       3. /fonts (inside /public)
       4. /images (inside /public)
       5. /styles (inside /public)
       6. /templates (inside /public)
       7. /static (inside /public)
       8. /404 (error page)
       9. all root files inside /public (e.g. /favicon.ico) */
    // eslint-disable-next-line no-secrets/no-secrets -- this is not a secret
    "/((?!auth-redirect|api|_next|fonts|images|styles|templates|static|404|[\\w-]+\\.\\w+).*)",
  ],
};
