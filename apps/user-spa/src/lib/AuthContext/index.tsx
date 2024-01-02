import type { PropsWithChildren } from "react";
import { useEffect, useMemo, useState } from "react";

import { supabase } from "../supabase";

import { AuthContext } from "./context";

import type { usersRowSchema } from "@spec-team/db/types/schema";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { z } from "zod";

const passwordReset = ({ email }: { email: string }) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/update-password",
  });

const verifySms = ({ phone, token }: { phone: string; token: string }) =>
  supabase.auth.verifyOtp({
    phone,
    token,
    type: "phone_change",
  });
const sendSms = ({ phone }: { phone: string }) =>
  supabase.auth.updateUser({
    phone, // updating user phone number will send verification email via twilio_verify
  });
const signOut = () => supabase.auth.signOut();
const signup = ({ email, password }: { email: string; password: string }) =>
  supabase.auth.signUp({ email, password });
const login = ({ email, password }: { email: string; password: string }) =>
  supabase.auth.signInWithPassword({ email, password });
const updatePassword = ({ password }: { password: string }) =>
  supabase.auth.updateUser({ password });

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<
    | (SupabaseUser & {
        profile: z.infer<typeof usersRowSchema> | null;
      })
    | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      if (!currentUser) {
        setLoading(false);
        return;
      }
      const profileResult = await supabase
        .from("users")
        .select("*")
        .eq("id", currentUser?.id ?? "")
        .single();
      setUser({ ...currentUser, profile: profileResult.data });
      setLoading(false);
    };
    void getUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        if (!session?.user) {
          return;
        }
        void supabase
          .from("users")
          .select("*")
          .eq("id", session?.user?.id ?? "")
          .single()
          .then((profileResult) => {
            setUser({ ...session?.user, profile: profileResult.data });
          });
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
      sendSms,
      signOut,
      signup,
      updatePassword,
      user,
      verifySms,
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
