import type {
  AuthResponse,
  AuthTokenResponse,
  User as SupabaseUser,
  UserResponse,
} from "@supabase/supabase-js";

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
  signup: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<AuthResponse>;
  signOut: () => void;
  sendSms?: ({ phone }: { phone: string }) => Promise<UserResponse>;
  verifySms?: ({
    phone,
    token,
  }: {
    phone: string;
    token: string;
  }) => Promise<AuthResponse>;
  passwordReset: ({ email }: { email: string }) => void;
  updatePassword: ({ password }: { password: string }) => void;
}
