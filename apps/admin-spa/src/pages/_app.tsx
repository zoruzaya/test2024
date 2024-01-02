import { Navigate, Outlet, useLocation } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { Path } from "@/router";

import { useAuth } from "@/lib/AuthContext/useAuth";

const PUBLIC: Path[] = [
  "/login",
  "/forgot-password",
  "/forgot-password/email-sent",
];

const queryClient = new QueryClient();

const Redirects = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <div>loading...</div>;
  }
  if (!user) {
    if (PUBLIC.includes(location.pathname as Path)) {
      return children;
    }
    return <Navigate to="/login" replace />;
  }

  if (location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }
  return children;
};
const AuthRoute = () => (
  <section>
    <main className=" flex min-w-[1024px]  justify-center bg-gray-100">
      <QueryClientProvider client={queryClient}>
        <Redirects>
          <Outlet />
        </Redirects>
      </QueryClientProvider>
    </main>
  </section>
);

export default AuthRoute;
