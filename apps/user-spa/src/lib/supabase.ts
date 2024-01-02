// import "react-native-url-polyfill/auto";

import { createClient } from "@supabase/supabase-js";

import type { Database } from "@spec-team/db/types/src/database";

export const supabase = createClient<Database>(
  // App Throws if these are not defined, so we can safely cast
  import.meta.env?.VITE_SUPABASE_URL as string,
  import.meta.env?.VITE_SUPABASE_ANON_KEY as string,
);
