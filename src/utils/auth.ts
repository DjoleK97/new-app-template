import { createClient } from "../../supabase/client";

/**
 * Checks if the current user is authenticated
 * @returns Promise that resolves to a boolean indicating if the user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error checking authentication status:", error);
      return false;
    }

    return !!data.session;
  } catch (error) {
    console.error("Failed to check authentication status:", error);
    return false;
  }
}

/**
 * Gets the current user's ID if authenticated
 * @returns Promise that resolves to the user ID or null if not authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return null;
    }

    return data.user.id;
  } catch (error) {
    console.error("Failed to get current user ID:", error);
    return null;
  }
}

/**
 * Merges a guest cart with a user cart after login
 * This should be called after a guest user logs in
 * @returns Promise that resolves when the carts are merged
 */
export async function mergeGuestCartWithUserCart(): Promise<void> {
  try {
    const supabase = createClient();

    // This is a server-side operation that would typically be handled by a Supabase function
    // For this example, we'll just call a hypothetical RPC function
    const { error } = await supabase.rpc("merge_guest_cart_with_user_cart");

    if (error) {
      console.error("Error merging carts:", error);
      throw error;
    }
  } catch (error) {
    console.error("Failed to merge carts:", error);
    throw error;
  }
}
