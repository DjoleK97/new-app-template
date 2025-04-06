import { createClient } from "../../supabase/client";
import { getSessionId } from "@/utils/session";

/**
 * Interface for cart item data
 */
export interface CartItem {
  id?: string;
  product_id: string;
  quantity: number;
  unit: string;
  created_at?: string;
  user_id?: string;
  session_id?: string;
}

/**
 * Adds an item to the user's cart
 * Works for both authenticated and guest users
 *
 * @param productId - The ID of the product to add
 * @param quantity - The quantity of the product
 * @param unit - The unit of measurement (e.g., 'kg', 'piece')
 * @returns Promise that resolves when the item is added
 */
export async function addToCart(
  productId: string,
  quantity: number,
  unit: string,
): Promise<void> {
  console.log("addToCart function called with:", { productId, quantity, unit });

  try {
    // Initialize Supabase client
    console.log("Initializing Supabase client");
    const supabase = createClient();

    // Get current auth state for debugging
    const { data: authData } = await supabase.auth.getSession();
    console.log("Current auth state:", {
      isAuthenticated: !!authData.session,
      userId: authData.session?.user?.id || "Not authenticated",
    });

    // Get session ID for debugging
    const sessionId = getSessionId();
    console.log("Using session ID:", sessionId);

    // Create cart item object
    // Explicitly add session_id for debugging purposes
    const cartItem: CartItem = {
      product_id: productId,
      quantity,
      unit,
      // Don't explicitly set session_id, let Supabase handle it through headers
    };

    console.log("Cart item to insert:", cartItem);

    // Insert the item into the cart_items table
    console.log("Attempting to insert cart item...");

    // Use upsert with the unique constraint on product_id and session_id
    console.log("Using upsert to add or update cart item");

    // Add session_id to the cart item
    const cartItemWithSession = {
      ...cartItem,
      session_id: sessionId,
    };

    console.log("Cart item with session:", cartItemWithSession);

    // Use upsert with on_conflict parameter
    const result = await supabase
      .from("cart_items")
      .upsert(cartItemWithSession, {
        onConflict: "product_id,session_id",
        returning: "minimal",
      });

    const { data, error } = result;

    if (error) {
      console.error("Error adding item to cart:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      throw error;
    }

    console.log("Successfully added item to cart. Response data:", data);
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    } else {
      console.error("Unknown error type:", typeof error);
    }
    throw error;
  }
}

/**
 * Retrieves all items in the user's cart
 * @returns Promise that resolves to an array of cart items
 */
export async function getCartItems(): Promise<CartItem[]> {
  console.log("getCartItems function called");

  try {
    const supabase = createClient();
    console.log("Fetching cart items...");

    const { data, error } = await supabase.from("cart_items").select("*");

    if (error) {
      console.error("Error fetching cart items:", error);
      throw error;
    }

    console.log("Successfully fetched cart items:", data);
    return data || [];
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
    return [];
  }
}

/**
 * Updates the quantity of an item in the cart
 * @param cartItemId - The ID of the cart item to update
 * @param quantity - The new quantity
 * @returns Promise that resolves when the item is updated
 */
export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number,
): Promise<void> {
  console.log("updateCartItemQuantity called with:", { cartItemId, quantity });

  try {
    const supabase = createClient();

    // If quantity is 0 or less, remove the item
    if (quantity <= 0) {
      console.log("Quantity is 0 or less, removing item instead of updating");
      return removeCartItem(cartItemId);
    }

    console.log("Updating cart item quantity...");
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", cartItemId)
      .select();

    if (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }

    console.log("Successfully updated cart item:", data);
  } catch (error) {
    console.error("Failed to update cart item:", error);
    throw error;
  }
}

/**
 * Removes an item from the cart
 * @param cartItemId - The ID of the cart item to remove
 * @returns Promise that resolves when the item is removed
 */
export async function removeCartItem(cartItemId: string): Promise<void> {
  console.log("removeCartItem called with ID:", cartItemId);

  try {
    const supabase = createClient();

    console.log("Removing cart item...");
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", cartItemId);

    if (error) {
      console.error("Error removing cart item:", error);
      throw error;
    }

    console.log("Successfully removed cart item");
  } catch (error) {
    console.error("Failed to remove cart item:", error);
    throw error;
  }
}

/**
 * Clears all items from the user's cart
 * @returns Promise that resolves when the cart is cleared
 */
export async function clearCart(): Promise<void> {
  console.log("clearCart function called");

  try {
    const supabase = createClient();

    console.log("Clearing all cart items...");
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .not("id", "is", null); // Delete all items

    if (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }

    console.log("Successfully cleared cart");
  } catch (error) {
    console.error("Failed to clear cart:", error);
    throw error;
  }
}
