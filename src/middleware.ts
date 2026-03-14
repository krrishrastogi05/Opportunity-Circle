import { withAuth } from "next-auth/middleware";

// Protect all /admin routes EXCEPT /admin/login
export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: ["/admin/((?!login$).*)"],
};
