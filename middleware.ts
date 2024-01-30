// import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware({
//   // An array of public routes that don't require authentication.
//   publicRoutes: ["/api/webhook/clerk"],

//   // An array of routes to be ignored by the authentication middleware.
//   ignoredRoutes: ["/api/webhook/clerk"],

//   // A custom function that will be called after the authentication process is completed.
//   afterAuth: async (req, res) => {
//     // Get the user object from the session
//     const user = req?.session;

//     // // Check the user's role or status and redirect accordingly
//     // if (user.role === "admin") {
//     //   // Redirect to the admin dashboard
     
//     // } else if (user.status === "pending") {
//     //   // Redirect to the verification page
    
//     // } else {
//     //   // Redirect to the user profile page
//     //  console.log('working');
     
//     // }

//     console.log(user);
    
//   },
// });

// export const config = {
//     matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

  import { NextResponse } from 'next/server';


import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // Redirect logged in users to organization selection page if they are not active in an organization
    if (
      auth.userId &&
      !auth.orgId &&
      req.nextUrl.pathname !== "/org-selection"
    ) {
      const orgSelection = new URL("/org-selection", req.url);
      return NextResponse.redirect(orgSelection);
    }
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});