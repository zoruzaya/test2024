import { createContext } from "react";

import type { AuthContextType } from "./type";
import type { AuthTokenResponse } from "@supabase/supabase-js";

export const AuthContext = createContext<AuthContextType>({
  loading: true,
  login: () => new Promise<AuthTokenResponse>(() => {}),
  passwordReset: () => {},
  signOut: () => {},
  updatePassword: () => {},
  user: null,
});
