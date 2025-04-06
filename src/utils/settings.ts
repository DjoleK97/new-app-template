import { createClient } from "../../supabase/client";

/**
 * Checks if orders are currently enabled in the system
 * @returns Promise that resolves to a boolean indicating if orders are enabled
 */
export const isOrdersEnabled = async (): Promise<boolean> => {
  try {
    const supabase = createClient();
    console.log("Fetching orders_enabled setting from database...");

    // First, check if the settings table exists
    const { error: tableError } = await supabase
      .from("settings")
      .select("count")
      .limit(1);

    if (tableError) {
      console.error("Error accessing settings table:", tableError);
      return true; // Default to enabled if table doesn't exist
    }

    // Now try to get the specific setting
    const { data, error } = await supabase
      .from("settings")
      .select("key, value")
      .eq("key", "orders_enabled")
      .maybeSingle();

    console.log("Settings data received:", data);

    if (error) {
      console.error("Error checking if orders are enabled:", error);
      return true; // Default to enabled if there's an error
    }

    // If no data found, default to enabled
    if (!data) {
      console.log("No orders_enabled setting found, defaulting to enabled");
      return true;
    }

    // Check if the value is exactly the string "false"
    const isEnabled = data.value !== "false";
    console.log(
      `Orders enabled value: ${data.value}, interpreted as: ${isEnabled}`,
    );
    return isEnabled;
  } catch (error) {
    console.error("Failed to check if orders are enabled:", error);
    return true; // Default to enabled if there's an error
  }
};
