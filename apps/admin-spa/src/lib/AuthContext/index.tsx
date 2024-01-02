import type { PropsWithChildren} from "react";
import { useEffect, useMemo, useState } from "react";

import { supabase } from "../supabase";

import { AuthContext } from "./context";

import type { User as SupabaseUser } from "@supabase/supabase-js";

const passwordReset = ({ email }: { email: string }) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/update-password",
  });
const signOut = () => supabase.auth.signOut();
const login = ({ email, password }: { email: string; password: string }) =>
  supabase.auth.signInWithPassword({ email, password });
const updatePassword = ({ password }: { password: string }) =>
  supabase.auth.updateUser({ password });

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setLoading(false);
    };
    void getUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user ?? null);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const authContextValue = useMemo(
    () => ({
      loading,
      login,
      passwordReset,
      signOut,
      updatePassword,
      user,
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
