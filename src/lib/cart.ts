import { createClient } from "../../supabase/client";

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
  try {
    // Initialize Supabase client
    const supabase = createClient();

    // Create cart item object
    // Note: We don't need to manually add session_id or user_id
    // as RLS policies will handle this based on auth status and x-session-id header
    const cartItem: CartItem = {
      product_id: productId,
      quantity,
      unit,
    };

    // Insert the item into the cart_items table
    const { error } = await supabase.from("cart_items").upsert([cartItem], {
      // If the same product already exists in cart, update the quantity
      onConflict: "product_id",
      // Merge the new quantity with existing quantity
      ignoreDuplicates: false,
    });

    if (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    throw error;
  }
}

/**
 * Retrieves all items in the user's cart
 * @returns Promise that resolves to an array of cart items
 */
export async function getCartItems(): Promise<CartItem[]> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.from("cart_items").select("*");

    if (error) {
      console.error("Error fetching cart items:", error);
      throw error;
    }

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
  try {
    const supabase = createClient();

    // If quantity is 0 or less, remove the item
    if (quantity <= 0) {
      return removeCartItem(cartItemId);
    }

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", cartItemId);

    if (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
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
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", cartItemId);

    if (error) {
      console.error("Error removing cart item:", error);
      throw error;
    }
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
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .not("id", "is", null); // Delete all items

    if (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  } catch (error) {
    console.error("Failed to clear cart:", error);
    throw error;
  }
}
