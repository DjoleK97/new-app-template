import { createBrowserClient } from "@supabase/ssr";
import { getSessionId } from "@/utils/session";

/**
 * Creates a Supabase client for browser usage with session ID header
 * @returns Supabase client instance
 */
export const createClient = () => {
  // Log the environment variables (without exposing actual values)
  console.log(
    "NEXT_PUBLIC_SUPABASE_URL available:",
    !!process.env.NEXT_PUBLIC_SUPABASE_URL,
  );
  console.log(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY available:",
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  // Get session ID
  const sessionId = getSessionId();
  console.log("Creating Supabase client with session ID:", sessionId);

  try {
    const client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            "x-session-id": sessionId,
          },
        },
      },
    );

    console.log("Supabase client created successfully");
    return client;
  } catch (error) {
    console.error("Error creating Supabase client:", error);
    throw error;
  }
};
