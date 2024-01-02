import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0";

import { Database } from "./database.d.ts";

// Create a Supabase client with the Auth context of the logged in user.
const getSupabaseClient = (req: Request) => {
  const supabaseClient = createClient<Database>(
    // Supabase API URL - env var exported by default.
    Deno.env.get("SUPABASE_URL") ?? "",
    // Supabase API ANON KEY - env var exported by default.
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    // Create client with Auth context of the user that called the function.
    // This way your row-level-security (RLS) policies are applied.
    {
      global: {
        headers: { Authorization: req.headers.get("Authorization")! },
      },
    },
  );
  return supabaseClient;
};

export const getRequestUser = async (req: Request) => {
  const supabaseClient = getSupabaseClient(req);
  // Now we can get the session or user object
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (!user) throw new Error("No user found");
  return user.id;
};
export async function getCurrentUser(req: Request) {
  const currentUserId = await getRequestUser(req);
  if (!currentUserId) {
    throw new Error("No user id found");
  }
  return currentUserId;
}
