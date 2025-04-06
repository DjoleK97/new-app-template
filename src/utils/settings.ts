import { createClient } from "../../supabase/client";

/**
 * Checks if orders are currently enabled in the system
 * @returns Promise that resolves to a boolean indicating if orders are enabled
 */
export const isOrdersEnabled = async (): Promise<boolean> => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "orders_enabled")
      .single();

    if (error) {
      console.error("Error checking if orders are enabled:", error);
      return true; // Default to enabled if there's an error
    }

    return data?.value === "true";
  } catch (error) {
    console.error("Failed to check if orders are enabled:", error);
    return true; // Default to enabled if there's an error
  }
};
