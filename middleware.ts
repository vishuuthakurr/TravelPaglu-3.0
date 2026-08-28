import { withAuth } from 'next-auth/middleware';

// Export the withAuth middleware
export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // If a token exists, the user is authenticated.
      return !!token;
    },
  },
  pages: {
    signIn: '/login', // Redirect unauthenticated users here
  },
});

// Define the routes that should be protected by this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (auth page)
     * - signup (auth page)
     * - verify-email (auth page)
     * - contact (public page)
     * - admin (handled by custom gateway in app/admin/page.tsx)
     * 
     * Because Next.js middleware matcher doesn't easily support negative lookaheads cleanly 
     * for root path ('/') in all versions, we explicitly list the routes to protect.
     */
    '/home',
    '/destinations',
    '/destination/:path*',
    '/profile',
  ],
};
