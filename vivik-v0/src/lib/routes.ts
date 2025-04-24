export const publicRoutes = [
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
];

export const authRoutes = [
  "/sign-in(.*)",
  "/sign-up(.*)",
];

export const protectedRoutes = [
  "/onboarding/(.*)",
];

export const afterAuthUrl = "/onboarding/basic-info";
export const afterSignInUrl = "/dashboard"; 