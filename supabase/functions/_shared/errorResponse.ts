import { corsResponse } from "./cors.ts";

export const errorResponse = ({
  displayMessage,
  extra,
}: {
  displayMessage: string;
  extra?: any;
}) =>
  corsResponse(
    new Response(
      JSON.stringify({
        error: {
          displayMessage,
          extra,
        },
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      },
    ),
  );
