export const corsHeaders = {
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Origin": "*",
};

export const corsResponse = (response: Response) =>
  new Response(response.body, {
    ...response,
    headers: {
      ...response.headers,
      ...corsHeaders,
    },
  });
