import { Navigate, Outlet, useLocation } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { Path } from "@/router";

import { useAuth } from "@/lib/AuthContext/useAuth";

const PUBLIC: Path[] = [
  "/phone_confirm",
  "/login",
  "/signup",
  "/forgot-password",
  "/forgot-password/email-sent",
];

const queryClient = new QueryClient();

const Redirects = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log("🚀 ~ user:", user);
  if (loading) {
    return <div>loading...</div>;
  }
  console.log("USER ACCESSED: ", location.pathname);
  if (!user) {
    if (PUBLIC.includes(location.pathname as Path)) {
      return children;
    }
    return <Navigate to="/login" replace />;
  }
  if (
    !user?.phone &&
    location.pathname !== "/phone_confirm" &&
    location.pathname !== "/phone_confirm_code"
  ) {
    return <Navigate to="/phone_confirm" replace />;
  }

  if (location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }
  return children;
};
const AuthRoute = () => (
  <section>
    <main>
      <QueryClientProvider client={queryClient}>
        <Redirects>
          <Outlet />
        </Redirects>
      </QueryClientProvider>
    </main>
  </section>
);

export default AuthRoute;
