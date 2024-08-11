import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher([
 '/',
 "/users",
	"/meetings",
	"/admins",
	"/contacts",
	"/private(.*)",
]);

export default clerkMiddleware((auth, req) => {
 if (protectedRoutes(req)) {
   auth().protect();
 }
});

export const config = {
 matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*?)"],
};