import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const authPahts = ["/login", "/register", "/"];

export async function middleware(request) {
    // Receive JWT from incoming requests
    const token = await getToken({ req: request });
    const userExist = !!token;

    if (userExist) {
        // If user is logged in -> user can go back to /login, /register, /
        if (authPahts.includes(request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL("/courses", request.url));
        }
    } else {
        if (authPahts.includes(request.nextUrl.pathname)) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};