// export {default} from 'next-auth/middleware'

// export const config = {
//     mathcher: ["/homepage/createvent","/editprofile","hompage/organizer"]
// };
import { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import { JWT } from "next-auth/jwt";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }: { token: JWT | null; req: NextRequest }) => {
      // List of static paths that don't require authentication
      const publicStaticPaths: string[] = [
        "/auth/signin",
        "/auth/signup",
        "/auth/register",
        "/homepage",
        "/",
      ];

      // Function to check if the path is a public dynamic path
      const isPublicDynamicPath = (path: string): boolean => {
        // Check for dynamic path
        if (path.startsWith("/events/")) {
          return true;
        }
        // Check for any subpath under /images
        if (path.startsWith("/img/")) {
          return true;
        }
        return false;
      };

      // Get the current path
      const currentPath: string = new URL(req.url).pathname;

      // Check if the current path is one of the public paths
      const isPublicPath: boolean =
        publicStaticPaths.includes(currentPath) ||
        isPublicDynamicPath(currentPath);

      // Allow if it's a public path or if the user has a valid session token
      return isPublicPath || !!token;
    },
  },
  pages: {
    signIn: "/auth/signin", // Redirect to the custom sign-in page
    // signUp: "/auth/signup"  // Redirect to a custom error page (optional)
  },
  // ... rest of your configuration
});
