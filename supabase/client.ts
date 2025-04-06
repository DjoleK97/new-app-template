import { createBrowserClient } from "@supabase/ssr";
import { getSessionId } from "@/utils/session";

/**
 * Creates a Supabase client for browser usage with session ID header
 * @returns Supabase client instance
 */
export const createClient = () => {
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          "x-session-id": getSessionId(),
        },
      },
    },
  );

  return client;
};
