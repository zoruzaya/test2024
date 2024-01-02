import type { AuthTokenResponse, User as SupabaseUser } from "@supabase/supabase-js";

export interface AuthContextType {
  user: SupabaseUser | null;
  loading: boolean;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<AuthTokenResponse>;
  signOut: () => void;
  passwordReset: ({ email }: { email: string }) => void;
  updatePassword: ({ password }: { password: string }) => void;
}
