// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod/mod.ts";

import { dataResponse } from "../_shared/dataResponse.ts";
import { errorResponse } from "../_shared/errorResponse.ts";
import { getSupabaseAdmin } from "../_shared/supabaseAdmin.ts";
import { getCurrentUser } from "../_shared/supabaseClient.ts";

const inputSchema = z.object({
  name: z.string(),
  email: z.string(),
  group_id: z.string().optional(),
  role: z.string().optional(),
});

serve(async (req) => {
  // 1. get current user id and validate args
  if (req.method === "OPTIONS") {
    return dataResponse("ok");
  }
  try {
    const supabaseAdmin = getSupabaseAdmin();

    const currentUserId = await getCurrentUser(req);
    const { name, email, group_id, role } = await req.json();
    const inputParseResult = inputSchema.safeParse({
      name,
      email,
      group_id,
      role,
    });
    if (!inputParseResult.success) {
      return errorResponse({
        displayMessage: inputParseResult.error.message,
        extra: inputParseResult.error,
      });
    }

    // 2. check current user is admin
    const checkRoleResult = await supabaseAdmin
      .from("users")
      .select("role")
      .eq("id", currentUserId)
      .single();
    if (checkRoleResult.error) {
      return errorResponse({
        displayMessage: checkRoleResult.error.message,
        extra: checkRoleResult.error,
      });
    }
    if (
      checkRoleResult.data?.role !== "super_admin" &&
      checkRoleResult.data?.role !== "company_admin"
    ) {
      return errorResponse({
        displayMessage: "Only admin can add users",
      });
    }

    // 3. create user in auth.users
    const supabaseUser =
      await supabaseAdmin.auth.admin.inviteUserByEmail(email);
    if (supabaseUser.error) {
      return errorResponse({
        displayMessage: supabaseUser.error.message,
        extra: supabaseUser.error,
      });
    }

    // 4. update user in public.users data
    const userUpdateResult = await supabaseAdmin
      .from("users")
      .update({
        name,
        email,
        group_id,
        role,
      })
      .eq("id", supabaseUser.data?.user.id);

    if (userUpdateResult.error) {
      return errorResponse({
        displayMessage: userUpdateResult.error.message,
        extra: userUpdateResult.error,
      });
    }

    return dataResponse({
      status: "ok2",
    });
  } catch (error) {
    return errorResponse({
      displayMessage: error.message,
      extra: error,
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
